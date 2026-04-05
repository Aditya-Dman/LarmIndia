import { Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";

const trustItems = [
  {
    icon: Leaf,
    title: "Authentic Blends",
    subtitle: "Traditional Indian taste",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    subtitle: "FSSAI-grade sourcing",
  },
  {
    icon: Sparkles,
    title: "Freshly Packed",
    subtitle: "Aroma locked for longer",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    subtitle: "Fast PAN India dispatch",
  },
];

export function TrustStrip() {
  return (
    <section className="relative border-y border-border/70 bg-gradient-to-r from-amber-50 via-white to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className="animate-fade-up rounded-xl border border-border/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
