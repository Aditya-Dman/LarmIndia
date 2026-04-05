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
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-xl border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Larm India</CardTitle>
          <CardDescription>
            Login or sign up to continue shopping.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4">
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
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Please wait..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-4">
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="Your full name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
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
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Please wait..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

          </Tabs>

          {message && (
            <p
              className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}
            >
              {message.text}
            </p>
          )}

          <div className="mt-8 pt-4 border-t border-border/60 text-center">
            <button
              type="button"
              onClick={handleDemoBypass}
              className="text-[10px] tracking-wide text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
            >
              presentation bypass
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
