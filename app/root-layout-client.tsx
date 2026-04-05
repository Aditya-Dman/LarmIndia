"use client";

import { CartProvider } from '@/context/cart-context';
import { SiteEnhancers } from '@/components/site-enhancers';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <SiteEnhancers />
    </CartProvider>
  );
}
