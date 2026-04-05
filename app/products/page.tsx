"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products, categories, Product } from "@/lib/data";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "featured") {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover our wide range of premium spices, seeds, herbs, and ingredients
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6 sticky top-20">
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-foreground">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === null
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      All Products ({products.length})
                    </button>
                    {categories.map((category) => {
                      const count = products.filter(
                        (p) => p.category === category.slug
                      ).length;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.slug)}
                          className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                            selectedCategory === category.slug
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {category.name} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sort Filter */}
                <div className="border-t border-border pt-6">
                  <h3 className="mb-3 font-semibold text-foreground">Sort By</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="featured"
                        checked={sortBy === "featured"}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded"
                      />
                      <span className="text-muted-foreground hover:text-foreground">
                        Featured
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="price-low"
                        checked={sortBy === "price-low"}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded"
                      />
                      <span className="text-muted-foreground hover:text-foreground">
                        Price: Low to High
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="price-high"
                        checked={sortBy === "price-high"}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded"
                      />
                      <span className="text-muted-foreground hover:text-foreground">
                        Price: High to Low
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="name"
                        checked={sortBy === "name"}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded"
                      />
                      <span className="text-muted-foreground hover:text-foreground">
                        Name: A-Z
                      </span>
                    </label>
                  </div>
                </div>

                {/* Reset Filters */}
                {(selectedCategory || searchQuery) && (
                  <Button
                    variant="outline"
                    className="w-full mt-6"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                  <p className="mb-2 text-lg font-medium text-foreground">
                    No products found
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-sm text-muted-foreground">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
