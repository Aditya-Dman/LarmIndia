"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter signup logic here
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left text-white">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white">
              Subscribe to Our Newsletter
            </h3>
            <p className="mt-2 text-gray-300">
              Get updates on new products, exclusive recipes, and special offers delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2 flex-col sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white border-0 rounded-lg"
            />
            <Button type="submit" disabled={isSubmitted} className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold hover:from-amber-500 hover:to-orange-600 rounded-lg w-full sm:w-auto">
              {isSubmitted ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Subscribed
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
