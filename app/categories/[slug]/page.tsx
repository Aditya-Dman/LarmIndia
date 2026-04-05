import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { categories, getProductsByCategory, getCategoryBySlug } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-secondary py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/categories">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Categories
              </Link>
            </Button>
            <p className="text-sm font-medium tracking-widest text-primary uppercase mb-2">
              {products.length} Products
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {category.name}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No products available in this category yet.
              </p>
              <Button asChild>
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
