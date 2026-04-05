import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-r from-slate-900 via-green-900 to-slate-900">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl animate-float-slow [animation-delay:1.2s]" />
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="animate-fade-up font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance drop-shadow-lg">
            Ready to Spice Up Your Business?
          </h2>
          <p className="animate-fade-up [animation-delay:120ms] mt-6 text-lg text-gray-100 max-w-2xl mx-auto text-pretty drop-shadow-lg">
            Whether you&apos;re a restaurant, retailer, or distributor, we offer competitive bulk pricing and reliable supply. Let&apos;s discuss how we can partner together.
          </p>
          <div className="animate-fade-up [animation-delay:240ms] mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600 font-semibold shadow-lg" asChild>
              <Link href="/contact">
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" className="border-2 border-white text-white hover:bg-white/10 font-semibold" variant="outline" asChild>
              <Link href="tel:+919560226275">
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
