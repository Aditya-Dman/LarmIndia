import Link from "next/link";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function CategoriesSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest text-green-600 uppercase mb-2">
            ✨ Our Catalogue
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Explore Our Categories
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            From everyday essentials to specialty ingredients, discover our complete range of premium quality products.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-green-500 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold text-green-300 mb-2">
                      {category.productCount} Products
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-primary-foreground/70 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <ArrowRight className="h-5 w-5 text-primary-foreground group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Index Number */}
              <div className="absolute top-4 right-4">
                <span className="font-serif text-5xl font-bold text-primary-foreground/10">
                  0{index + 1}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
