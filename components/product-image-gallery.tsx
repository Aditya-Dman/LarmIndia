"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
  featured?: boolean;
}

export function ProductImageGallery({ images, name, featured }: ProductImageGalleryProps) {
  const galleryImages = useMemo(() => {
    const cleaned = images.map((img) => img.trim()).filter(Boolean);
    return Array.from(new Set(cleaned));
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const canSlide = galleryImages.length > 1;

  const goTo = (index: number) => {
    if (!canSlide) {
      return;
    }

    const next = (index + galleryImages.length) % galleryImages.length;
    setActiveIndex(next);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!canSlide || touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;

    if (Math.abs(delta) > 40) {
      goTo(activeIndex + (delta < 0 ? 1 : -1));
    }

    touchStartX.current = null;
  };

  return (
    <div className="relative">
      <div
        className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={galleryImages[activeIndex]}
          alt={`${name} image ${activeIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {featured && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
              Featured
            </span>
          </div>
        )}

        {canSlide && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 sm:flex"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 sm:flex"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {canSlide && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-primary" : "w-2.5 bg-border"
              }`}
              aria-label={`Open image ${index + 1}`}
            />
          ))}
        </div>
      )}

      <p className="mt-2 text-center text-xs text-muted-foreground sm:hidden">
        Swipe left or right to browse images
      </p>
    </div>
  );
}
