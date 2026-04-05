import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-white via-amber-50/40 to-white">
      <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16 animate-fade-up">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-100 px-3 py-1 text-xs font-bold tracking-widest text-amber-700 uppercase mb-3">
              ⭐ Best Sellers
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg text-lg">
              Our most popular spices and ingredients loved by customers across India.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} className="animate-fade-up" />
          ))}
        </div>
      </div>
    </section>
  );
}
