"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteEnhancers() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setShowTopButton(scrollTop > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        <Link href="/contact">
          <Button className="h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-4 text-white shadow-xl hover:from-amber-600 hover:to-orange-700">
            <MessageCircle className="mr-2 h-4 w-4" />
            Need Help?
          </Button>
        </Link>

        {showTopButton && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-10 w-10 rounded-full border-border/80 bg-background/95 shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );
}
