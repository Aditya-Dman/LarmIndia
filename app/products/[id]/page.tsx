import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { products, getProductById, getProductsByCategory, getCategoryBySlug, getResolvedProductImage } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Truck, Shield, Leaf, Minus, Plus } from "lucide-react";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="bg-secondary py-4">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              <span>/</span>
              {category && (
                <>
                  <Link href={`/categories/${category.slug}`} className="hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={getResolvedProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <Button variant="ghost" size="sm" asChild className="mb-4">
                  <Link href="/products">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                  </Link>
                </Button>

                {category && (
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {category.name}
                  </Link>
                )}

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>

                {product.weight && (
                  <p className="text-muted-foreground mt-2">Weight: {product.weight}</p>
                )}

                <p className="font-serif text-4xl font-bold text-primary mt-4">
                  ₹{product.price}
                </p>

                <p className="text-muted-foreground mt-6 text-lg">
                  {product.description}
                </p>

                {/* Quantity Selector */}
                <div className="mt-8">
                  <label className="text-sm font-medium text-foreground">Quantity</label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button variant="ghost" size="icon" className="rounded-r-none">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">1</span>
                      <Button variant="ghost" size="icon" className="rounded-l-none">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="flex gap-4 mt-8">
                  <Button size="lg" className="flex-1" disabled={!product.inStock}>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline">
                    Get Quote
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">100% Natural</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Quality Assured</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Fast Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 lg:py-16 bg-secondary/50">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
