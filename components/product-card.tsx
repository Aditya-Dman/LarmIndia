"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";
import { getResolvedProductImage } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className={cn(
      "h-full flex flex-col rounded-xl border border-border/50 bg-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/30",
      className
    )}>
      {/* Product Image */}
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center group">
        <Image
          src={getResolvedProductImage(product)}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        {product.featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ★ Featured
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-base text-foreground hover:text-primary transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        {product.weight && (
          <p className="text-xs text-muted-foreground font-medium mb-2">📦 {product.weight}</p>
        )}

        <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{product.price}</span>
        </div>

        {/* Quantity and Add to Cart */}
        {product.inStock ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-7 w-7 rounded border border-gray-300 hover:bg-gray-200 text-sm font-semibold"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-7 flex-1 rounded border-0 text-center text-sm font-semibold bg-white"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-7 w-7 rounded border border-gray-300 hover:bg-gray-200 text-sm font-semibold"
              >
                +
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className={cn(
                "w-full transition-all font-semibold",
                isAdded ? "bg-green-600 hover:bg-green-600 shadow-lg" : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
              )}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isAdded ? "✓ Added to Cart!" : "Add to Cart"}
            </Button>
          </div>
        ) : (
          <Button disabled className="w-full">
            Out of Stock
          </Button>
        )}
      </div>
    </div>
  );
}
