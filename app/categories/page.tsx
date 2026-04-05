import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-secondary py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <p className="text-sm font-medium tracking-widest text-primary uppercase mb-2">
              Browse By Category
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Product Categories
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Explore our carefully curated selection of premium spices and ingredients across all categories.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-medium text-primary-foreground/70 mb-1">
                    {category.productCount} Products
                  </p>
                  <h2 className="font-serif text-2xl font-semibold text-primary-foreground mb-2">
                    {category.name}
                  </h2>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground group-hover:text-accent transition-colors">
                    View Products
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Index Number */}
                <div className="absolute top-4 right-4">
                  <span className="font-serif text-6xl font-bold text-primary-foreground/10">
                    0{index + 1}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
