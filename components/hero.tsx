import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="spice-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#spice-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-36 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium tracking-widest text-amber-300 uppercase mb-4 drop-shadow-lg">
              Premium Quality Since 1985
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-lg">
              Authentic Indian{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Spices</span> for Your Kitchen
            </h1>
            <p className="mt-6 text-lg text-gray-100 max-w-xl mx-auto lg:mx-0 text-pretty drop-shadow-lg">
              Discover the rich heritage of Indian flavors with our carefully sourced and expertly blended spices. From everyday essentials to exotic seasonings, we bring you the best of India.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600 font-semibold shadow-lg" asChild>
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-white hover:bg-white/10" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-amber-300">50+</p>
                <p className="text-sm text-gray-200">Products</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-amber-300">38+</p>
                <p className="text-sm text-gray-200">Years</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-amber-300">10K+</p>
                <p className="text-sm text-gray-200">Customers</p>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=320"
                    alt="Premium spices"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Fresh herbs"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Spice collection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=320"
                    alt="Traditional spices"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 bg-card rounded-xl shadow-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground">Certified</p>
              <p className="font-semibold text-foreground">100% Pure</p>
              <p className="text-xs text-primary">No Additives</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
