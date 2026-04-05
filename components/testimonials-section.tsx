"use client";

import { useState } from "react";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Home Chef, Mumbai",
    content: "The quality of Larm India spices is unmatched. The garam masala brings out authentic flavors in every dish I make. My family loves the difference!",
    rating: 5,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Restaurant Owner, Delhi",
    content: "As a restaurant owner, consistency is key. Larm India delivers the same premium quality every time. Their bulk ordering process is seamless.",
    rating: 5,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 3,
    name: "Anita Patel",
    role: "Food Blogger, Bangalore",
    content: "I&apos;ve tried many spice brands, but Larm India stands out. The freshness and aroma are exceptional. Highly recommended for food enthusiasts!",
    rating: 5,
    image: "/placeholder.svg?height=64&width=64",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50">
      <div className="pointer-events-none absolute left-0 top-12 h-60 w-60 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-12 h-60 w-60 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-2">
            💬 What Customers Say
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Customer Testimonials
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto animate-fade-up [animation-delay:120ms]">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white/75 backdrop-blur rounded-2xl p-8 lg:p-12 text-center border border-border shadow-lg">
                    {/* Quote Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-lg lg:text-xl text-foreground mb-8 text-pretty">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-6 bg-primary" : "w-2 bg-border"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
