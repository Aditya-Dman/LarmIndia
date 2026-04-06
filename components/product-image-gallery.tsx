"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
        return;
      }

      if (!canSlide) {
        return;
      }

      if (event.key === "ArrowLeft") {
        goTo(activeIndex - 1);
      } else if (event.key === "ArrowRight") {
        goTo(activeIndex + 1);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, canSlide, isLightboxOpen]);

  return (
    <>
      <div className="relative">
      <div
        className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="h-full w-full"
          aria-label="Open fullscreen gallery"
        >
          <img
            src={galleryImages[activeIndex]}
            alt={`${name} image ${activeIndex + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </button>

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
        <>
          <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-4">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-thumb-${index}`}
                type="button"
                onClick={() => goTo(index)}
                className={`group relative overflow-hidden rounded-lg border bg-card transition-all ${
                  index === activeIndex
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border/80 hover:border-primary/50"
                }`}
                aria-label={`Open image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  className="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
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
        </>
      )}

      <p className="mt-2 text-center text-xs text-muted-foreground sm:hidden">
        Swipe left or right to browse images
      </p>
      </div>

      {isMounted &&
        isLightboxOpen &&
        createPortal(
        <div
          className="fixed inset-0 z-[90] bg-black/90"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Product image lightbox"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-black/70"
            aria-label="Close fullscreen gallery"
          >
            <X className="h-5 w-5" />
          </button>

          {canSlide && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(activeIndex - 1);
                }}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white hover:bg-black/60"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(activeIndex + 1);
                }}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white hover:bg-black/60"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="mx-auto flex h-full w-full items-center justify-center p-4 sm:p-8">
            <img
              src={galleryImages[activeIndex]}
              alt={`${name} fullscreen image ${activeIndex + 1}`}
              className="h-auto w-auto max-h-[82vh] max-w-[92vw] rounded-xl object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
