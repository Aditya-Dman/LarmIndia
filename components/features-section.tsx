import { Leaf, Shield, Truck, Award } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "All our spices are sourced naturally without any artificial additives or preservatives.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every batch undergoes rigorous quality testing to ensure purity and freshness.",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    description: "Fast and reliable delivery to every corner of India with secure packaging.",
  },
  {
    icon: Award,
    title: "FSSAI Certified",
    description: "All products are certified by FSSAI for food safety and quality standards.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-green-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest text-green-600 uppercase mb-2">
            💪 Why Choose Us
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            The Larm India Difference
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300 mb-6 shadow-lg">
                <feature.icon className="h-10 w-10 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground text-pretty">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
