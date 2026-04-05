"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type ProfileRow = {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
};

type OrderRow = {
  id: string;
  status: string;
  total_amount: number;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  created_at: string;
};

export default function AccountPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setMessage(null);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth");
        return;
      }

      setUserId(user.id);
      setEmail(user.email ?? "");

      const fallbackName = (user.user_metadata?.full_name as string | undefined) ?? "";
      const fallbackPhone = (user.user_metadata?.phone as string | undefined) ?? "";
      const fallbackAddress = (user.user_metadata?.address as string | undefined) ?? "";

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, phone, address, created_at, updated_at")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        setMessage(`Could not load profile: ${profileError.message}`);
      }

      if (!profileData) {
        const { error: createProfileError } = await supabase.from("profiles").upsert(
          {
            id: user.id,
            full_name: fallbackName || "Customer",
            phone: fallbackPhone || "",
            address: fallbackAddress || "",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" },
        );

        if (createProfileError) {
          setMessage(`Could not initialize profile: ${createProfileError.message}`);
        }
      }

      const { data: refreshedProfile } = await supabase
        .from("profiles")
        .select("id, full_name, phone, address, created_at, updated_at")
        .eq("id", user.id)
        .maybeSingle<ProfileRow>();

      setFullName(refreshedProfile?.full_name ?? fallbackName);
      setPhone(refreshedProfile?.phone ?? fallbackPhone);
      setAddress(refreshedProfile?.address ?? fallbackAddress);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("id, status, total_amount, items, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (orderError) {
        setMessage((prev) => prev ?? `Could not load order history: ${orderError.message}`);
      }

      setOrders((orderData as OrderRow[] | null) ?? []);
      setIsLoading(false);
    };

    void loadData();
  }, [router, supabase]);

  const handleSaveProfile = async () => {
    if (!userId) {
      return;
    }

    setIsSaving(true);
    setMessage(null);

    const { error } = await supabase.from("profiles").upsert(
      {
        id: userId,
        full_name: fullName,
        phone,
        address,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    if (error) {
      setMessage(`Could not save profile: ${error.message}`);
      setIsSaving(false);
      return;
    }

    setMessage("Profile updated successfully.");
    setIsSaving(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 space-y-6">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-gradient-to-r from-amber-100/80 via-background to-emerald-100/70 p-6 shadow-sm animate-fade-up">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
              <p className="text-sm text-muted-foreground">
                Manage your profile and view your recent orders.
              </p>
            </div>
            <Link href="/products" className="text-sm font-medium text-primary hover:underline">
              Continue Shopping
            </Link>
          </div>

          {message && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {message}
            </div>
          )}

          <Card className="shadow-sm animate-fade-up">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>
                This information is saved per email account for faster checkout.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="account-email">Email</Label>
                <Input id="account-email" value={email} disabled />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="account-name">Full Name</Label>
                <Input
                  id="account-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="account-phone">Phone Number</Label>
                <Input
                  id="account-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+9198XXXXXXXX"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="account-address">Delivery Address</Label>
                <Textarea
                  id="account-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House no, street, city, pin code"
                  disabled={isLoading}
                />
              </div>
              <div className="sm:col-span-2">
                <Button onClick={handleSaveProfile} disabled={isLoading || isSaving}>
                  {isSaving ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card id="orders" className="shadow-sm animate-fade-up">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Your order history is listed here, newest first.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border p-4 bg-card/90 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                        <span className="text-xs rounded-full bg-secondary px-2 py-1 font-medium capitalize">
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Placed on {new Date(order.created_at).toLocaleString()}
                      </p>
                      <p className="mt-2 text-base font-bold">₹{Number(order.total_amount).toFixed(2)}</p>
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm text-primary">View items</summary>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          {(order.items ?? []).map((item) => (
                            <li key={`${order.id}-${item.id}`}>
                              {item.name} x {item.quantity} - ₹{item.price}
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
