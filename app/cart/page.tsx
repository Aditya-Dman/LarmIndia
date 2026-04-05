"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getResolvedProductImage } from "@/lib/data";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert("Thank you for your order! This is a demo checkout.");
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
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
                      className="flex gap-4 rounded-lg border border-border bg-card p-4"
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
                <div className="rounded-lg border border-border bg-card p-6 sticky top-20">
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-3 border-b border-border pb-4 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
                      </span>
                      <span className="text-foreground font-medium">
                        ₹{getTotal()}
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
                        ₹{Math.round(getTotal() * 0.18)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 flex justify-between">
                    <span className="text-lg font-semibold text-foreground">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{Math.round(getTotal() * 1.18)}
                    </span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full mb-3"
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
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
