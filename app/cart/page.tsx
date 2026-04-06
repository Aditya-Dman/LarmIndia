"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { getResolvedProductImage } from "@/lib/data";
import { createClient } from "@/lib/supabase/client";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function buildRazorpayMeLink(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "");
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getTotal();
  const tax = Math.round(subtotal * 0.18);
  const total = Math.round(subtotal * 1.18);
  const razorpayMeBaseUrl = process.env.NEXT_PUBLIC_RAZORPAY_ME_LINK ?? "https://razorpay.me/@adityadhiman";

  const openRazorpayMeFallback = () => {
    const paymentLink = buildRazorpayMeLink(razorpayMeBaseUrl);
    window.open(paymentLink, "_blank", "noopener,noreferrer");
    setCheckoutMessage(
      "Opened Razorpay payment page. Complete payment there, then share transaction details to confirm your order.",
    );
    setIsCheckingOut(false);
  };

  const handleCheckout = async () => {
    setCheckoutMessage(null);
    setIsCheckingOut(true);

    const isSdkLoaded = await loadRazorpayScript();
    if (!isSdkLoaded || !window.Razorpay) {
      openRazorpayMeFallback();
      return;
    }

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
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total * 100,
          currency: "INR",
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        const errorText = String(orderData.error ?? "").toLowerCase();
        if (errorText.includes("key") || errorText.includes("configured")) {
          openRazorpayMeFallback();
          return;
        }

        setCheckoutMessage(orderData.error ?? "Failed to start payment.");
        setIsCheckingOut(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Larm India",
        description: `Order payment for ${itemCount} item(s)`,
        order_id: orderData.orderId,
        prefill: {
          name: customer.full_name,
          email: customer.email,
          contact: customer.phone,
        },
        notes: {
          address: customer.address,
        },
        theme: {
          color: "#c15512",
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              totalAmount: total,
              items: itemPayload,
              customer,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok) {
            setCheckoutMessage(verifyData.error ?? "Payment completed but order verification failed.");
            setIsCheckingOut(false);
            return;
          }

          clearCart();
          const shortOrderId = String(verifyData.orderId ?? "").slice(0, 8).toUpperCase();
          setCheckoutMessage(
            shortOrderId
              ? `Yay! Order placed successfully. Order #${shortOrderId}. Track it in My Account > Recent Orders.`
              : "Yay! Order placed successfully. Track it in My Account > Recent Orders.",
          );
          setIsCheckingOut(false);
        },
        modal: {
          ondismiss: () => {
            setIsCheckingOut(false);
          },
        },
      });

      razorpay.open();
    } catch (error) {
      setCheckoutMessage(error instanceof Error ? error.message : "Checkout failed.");
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

                  {checkoutMessage && (
                    <p className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
                      {checkoutMessage}
                    </p>
                  )}

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full mb-3"
                  >
                    {isCheckingOut ? "Opening Razorpay..." : "Proceed to Checkout"}
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
