"use client";

import { CartProvider } from '@/context/cart-context';
import { SiteEnhancers } from '@/components/site-enhancers';
import { PageTransition } from '@/components/page-transition';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PageTransition>{children}</PageTransition>
      <SiteEnhancers />
    </CartProvider>
  );
}
