import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/cta-section";
import { Award, Users, Clock, MapPin } from "lucide-react";

const stats = [
  { icon: Clock, label: "Years of Experience", value: "38+" },
  { icon: Users, label: "Happy Customers", value: "10,000+" },
  { icon: Award, label: "Quality Products", value: "50+" },
  { icon: MapPin, label: "Cities Served", value: "100+" },
];

const values = [
  {
    title: "Quality First",
    description: "We source only the finest ingredients and maintain strict quality control at every step.",
  },
  {
    title: "Authenticity",
    description: "Our recipes and blends are rooted in traditional Indian culinary heritage.",
  },
  {
    title: "Sustainability",
    description: "We work with farmers who practice sustainable agriculture and fair trade.",
  },
  {
    title: "Innovation",
    description: "While respecting tradition, we continuously innovate our processes and products.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-medium tracking-widest text-primary uppercase mb-4">
                  Our Story
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground text-balance">
                  Bringing India&apos;s Finest Flavors to Your Kitchen
                </h1>
                <p className="mt-6 text-lg text-muted-foreground text-pretty">
                  Since 1985, Larm India has been on a mission to bring the authentic taste of Indian spices to kitchens across the nation. What started as a small family business in Mumbai has grown into one of India&apos;s most trusted spice brands.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Our founder, inspired by his grandmother&apos;s traditional recipes, began blending spices with the same care and precision that had been passed down through generations. Today, we continue that legacy with modern facilities while never compromising on the authenticity that made us who we are.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-border p-4">
                  <img
                    src="/larmindia-about.png"
                    alt="Larm India facility"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                  <p className="font-serif text-4xl font-bold">1985</p>
                  <p className="text-sm text-primary-foreground/80">Established</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="story" className="py-16 lg:py-24 bg-secondary/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-medium tracking-widest text-primary uppercase mb-4">
                Our Mission
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Preserving Tradition, Ensuring Quality
              </h2>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                Our mission is to provide every Indian household with access to pure, unadulterated spices that bring out the authentic flavors of traditional recipes. We believe that quality spices are the foundation of great cooking, and we&apos;re committed to making premium ingredients accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="quality" className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-medium tracking-widest text-primary uppercase mb-2">
                What We Stand For
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Our Core Values
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-card border border-border">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-serif font-bold text-lg mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-16 lg:py-24 bg-secondary/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-medium tracking-widest text-primary uppercase mb-2">
                Quality Assurance
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Our Certifications
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We maintain the highest standards of quality and safety, certified by leading regulatory bodies.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {["FSSAI Certified", "ISO 22000", "HACCP", "Organic Certified"].map((cert, index) => (
                <div key={index} className="flex items-center justify-center w-40 h-40 rounded-full bg-card border-2 border-primary/20 text-center p-4">
                  <span className="font-semibold text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
