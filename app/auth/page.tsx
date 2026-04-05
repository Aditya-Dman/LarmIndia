"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";

type MessageState = { type: "error" | "success"; text: string } | null;

async function saveProfile(
  userId: string,
  profile: { full_name: string; phone: string; address: string },
) {
  const supabase = createClient();

  // This is best-effort. If profiles table is not ready yet, auth flow still works.
  await supabase.from("profiles").upsert(
    {
      id: userId,
      full_name: profile.full_name,
      phone: profile.phone,
      address: profile.address,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
}

export default function AuthPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<MessageState>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("+91");
  const [signupAddress, setSignupAddress] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    setIsLoading(false);

    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }

    document.cookie = "demo_bypass=; path=/; max-age=0";
    router.replace("/");
    router.refresh();
  };

  const handleEmailSignup = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: {
          full_name: signupName,
          phone: signupPhone,
          address: signupAddress,
        },
      },
    });

    if (error) {
      setIsLoading(false);
      setMessage({ type: "error", text: error.message });
      return;
    }

    if (data.user?.id) {
      try {
        await saveProfile(data.user.id, {
          full_name: signupName,
          phone: signupPhone,
          address: signupAddress,
        });
      } catch {
        // Ignore profile insert errors so signup still succeeds.
      }
    }

    setIsLoading(false);

    if (data.session) {
      document.cookie = "demo_bypass=; path=/; max-age=0";
      router.replace("/");
      router.refresh();
      return;
    }

    setMessage({
      type: "success",
      text: "Signup successful. Check your email for a confirmation link, then sign in.",
    });
  };

  const handleDemoBypass = () => {
    document.cookie = "demo_bypass=1; path=/; max-age=86400";
    router.replace("/");
    router.refresh();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-100/60 via-[#f8f4ec] to-emerald-100/40 px-4 py-10 lg:py-14">
      <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />

      <Card className="mx-auto grid w-full max-w-5xl overflow-hidden border-primary/20 shadow-2xl lg:grid-cols-[1.15fr_1fr] animate-fade-up">
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-8 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, #f59e0b 0, transparent 42%), radial-gradient(circle at 82% 70%, #10b981 0, transparent 46%)" }} />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Premium Spices Platform
            </div>
            <h2 className="font-serif text-3xl leading-tight">Taste The Aroma Of Authentic India</h2>
            <p className="mt-3 text-sm text-white/80">
              Sign in to track orders, manage your address, and shop from curated, farm-sourced spice collections.
            </p>
          </div>

          <div className="relative space-y-3 text-sm">
            <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-3 py-2">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Secure checkout with trusted payment flow
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-3 py-2">
              <Truck className="h-4 w-4 text-amber-300" />
              Quick dispatch on confirmed orders
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-3 py-2">
              <Leaf className="h-4 w-4 text-emerald-300" />
              Freshly packed, quality checked ingredients
            </div>
          </div>
        </div>

        <div className="bg-card/90 backdrop-blur p-5 sm:p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl sm:text-3xl">Welcome to Larm India</CardTitle>
            <CardDescription>
              Login or sign up to continue shopping.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pb-0">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-secondary/80 p-1">
                <TabsTrigger value="login" className="rounded-lg">Login</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg">Signup</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-5">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <Button type="submit" className="h-11 w-full text-base font-semibold" disabled={isLoading}>
                    {isLoading ? "Please wait..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-5">
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="Your full name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      placeholder="+9198XXXXXXXX"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-address">Delivery Address</Label>
                    <Textarea
                      id="signup-address"
                      placeholder="House no, street, city, pin code"
                      value={signupAddress}
                      onChange={(e) => setSignupAddress(e.target.value)}
                      required
                      className="min-h-[90px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      minLength={6}
                      className="h-11"
                    />
                  </div>
                  <Button type="submit" className="h-11 w-full text-base font-semibold" disabled={isLoading}>
                    {isLoading ? "Please wait..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {message && (
              <p
                className={`mt-4 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${message.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
              >
                <CheckCircle2 className="h-4 w-4" />
                {message.text}
              </p>
            )}

            <div className="mt-8 border-t border-border/60 pt-4 text-center">
              <button
                type="button"
                onClick={handleDemoBypass}
                className="text-[10px] tracking-wide text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
              >
                presentation bypass
              </button>
            </div>
          </CardContent>
        </div>
      </Card>
    </main>
  );
}
