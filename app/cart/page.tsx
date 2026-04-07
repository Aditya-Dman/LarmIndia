"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Trash2, ArrowLeft, CheckCircle2, Flame, Info, ShieldCheck, Leaf, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getResolvedProductImage } from "@/lib/data";
import { createClient } from "@/lib/supabase/client";

const CHECKOUT_NOTICE_STORAGE_KEY = "larm_checkout_notice";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState<{
    kind: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const supabase = useMemo(() => createClient(), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getTotal();
  const tax = Math.round(subtotal * 0.18);
  const total = Math.round(subtotal * 1.18);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(CHECKOUT_NOTICE_STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as { kind: "success" | "error" | "info"; text: string };
      if (parsed?.kind && parsed?.text) {
        setCheckoutNotice(parsed);
      }
    } catch {
      // Ignore malformed stored notice payload.
    } finally {
      window.sessionStorage.removeItem(CHECKOUT_NOTICE_STORAGE_KEY);
    }
  }, []);

  const handleCheckout = async () => {
    setCheckoutNotice(null);
    setIsCheckingOut(true);

    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    const customer = {
      full_name: (user?.user_metadata?.full_name as string | undefined) ?? "Customer",
      phone: (user?.user_metadata?.phone as string | undefined) ?? "",
      address: (user?.user_metadata?.address as string | undefined) ?? "",
      email: user?.email ?? "",
    };

    const itemPayload = items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));

      const orderRes = await fetch("/api/demo/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount: total,
          items: itemPayload,
          customer,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        setCheckoutNotice({ kind: "error", text: orderData.error ?? "Failed to start payment." });
        setIsCheckingOut(false);
        return;
      }

      clearCart();
      const shortOrderId = String(orderData.orderId ?? "").slice(0, 8).toUpperCase();
      const successNotice = {
        kind: "success",
        text: shortOrderId
          ? `Yay! Demo Razorpay checkout successful. Order #${shortOrderId} is now cooking in our kitchen. Track it in My Account > Recent Orders.`
          : "Yay! Demo Razorpay checkout successful. Track it in My Account > Recent Orders.",
      } as const;

      setCheckoutNotice(successNotice);
      window.sessionStorage.setItem(CHECKOUT_NOTICE_STORAGE_KEY, JSON.stringify(successNotice));
      setIsCheckingOut(false);
    } catch (error) {
      setCheckoutNotice({
        kind: "error",
        text: error instanceof Error ? error.message : "Checkout failed.",
      });
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 rounded-2xl border border-border/70 bg-gradient-to-r from-amber-100/80 via-background to-emerald-100/70 p-6 shadow-sm animate-fade-up">
            <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center shadow-sm">
              {checkoutNotice && (
                <div
                  className={`mb-4 rounded-lg border px-3 py-3 text-sm animate-fade-up text-left ${
                    checkoutNotice.kind === "success"
                      ? "border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-emerald-50 text-amber-900"
                      : checkoutNotice.kind === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-blue-200 bg-blue-50 text-blue-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {checkoutNotice.kind === "success" ? (
                      <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                        <Flame className="h-3.5 w-3.5" />
                        Spicy Success
                      </span>
                    ) : checkoutNotice.kind === "error" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-red-600" />
                    ) : (
                      <Info className="mt-0.5 h-4 w-4 text-blue-700" />
                    )}
                    <p className="leading-relaxed">{checkoutNotice.text}</p>
                  </div>
                </div>
              )}
              <p className="mb-4 text-lg text-muted-foreground">Your cart is empty</p>
              <Link href="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Product Image */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-muted">
                        <Image
                          src={getResolvedProductImage(item.product)}
                          alt={item.product.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link href={`/products/${item.product.id}`}>
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.weight}
                          </p>
                          <p className="mt-1 text-lg font-bold text-primary">
                            ₹{item.product.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 rounded border border-border bg-muted">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="h-8 w-8 flex items-center justify-center hover:bg-background text-sm font-semibold"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="h-8 w-8 flex items-center justify-center hover:bg-background text-sm font-semibold"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="flex flex-col items-end justify-between">
                        <span className="text-right">
                          <span className="block text-sm text-muted-foreground mb-1">
                            Subtotal
                          </span>
                          <span className="text-xl font-bold text-foreground">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="rounded-xl border border-border bg-card p-6 sticky top-24 shadow-lg">
                  <p className="mb-2 inline-flex items-center rounded-full border border-amber-300/60 bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    Demo Razorpay Checkout
                  </p>
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-3 border-b border-border pb-4 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Items ({itemCount})
                      </span>
                      <span className="text-foreground font-medium">
                        ₹{subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground font-medium">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground font-medium">
                        ₹{tax}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 flex justify-between">
                    <span className="text-lg font-semibold text-foreground">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{total}
                    </span>
                  </div>

                  {checkoutNotice && (
                    <div
                      className={`mb-4 rounded-lg border px-3 py-3 text-sm animate-fade-up ${
                        checkoutNotice.kind === "success"
                          ? "border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-emerald-50 text-amber-900"
                          : checkoutNotice.kind === "error"
                            ? "border-red-200 bg-red-50 text-red-700"
                            : "border-blue-200 bg-blue-50 text-blue-800"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {checkoutNotice.kind === "success" ? (
                          <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                            <Flame className="h-3.5 w-3.5" />
                            Spicy Success
                          </span>
                        ) : checkoutNotice.kind === "error" ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-red-600" />
                        ) : (
                          <Info className="mt-0.5 h-4 w-4 text-blue-700" />
                        )}
                        <p className="leading-relaxed">{checkoutNotice.text}</p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full mb-3"
                  >
                    {isCheckingOut ? "Processing Demo Checkout..." : "Proceed with Demo Razorpay"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/products">
                      Continue Shopping
                    </Link>
                  </Button>

                  <div className="mt-4 grid gap-2 rounded-lg border border-border/70 bg-muted/40 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Leaf className="h-4 w-4 text-emerald-600" />
                      <span>Freshness guarantee on every batch</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="h-4 w-4 text-emerald-600" />
                      <span>Fast dispatch after confirmation</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Need Help?
                      </summary>
                      <div className="mt-3 text-xs text-muted-foreground space-y-2">
                        <p>📞 Call us at 9560226275</p>
                        <p>📧 Email: larmindia12@gmail.com</p>
                        <p>📍 Naraina Village, Delhi</p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
