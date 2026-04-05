import Link from "next/link";
import { Logo } from "@/components/logo";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  collections: [
    { name: "Seasonings & Spices", href: "/categories/seasonings-spices" },
    { name: "Sachets", href: "/categories/sachets" },
    { name: "Herbs & Mixes", href: "/categories/herbs-mixes" },
    { name: "Daily Ingredients", href: "/categories/daily-ingredients" },
    { name: "Mouth Fresheners", href: "/categories/mouth-fresheners" },
    { name: "Seeds", href: "/categories/seeds" },
  ],
  quickLinks: [
    { name: "About Us", href: "/about" },
    { name: "Service", href: "/service" },
    { name: "Shop Products", href: "/products" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="sm" />
            </div>
            <p className="text-sm text-gray-300 mb-6 max-w-xs leading-relaxed">
              Delivering authentic Indian spices with exceptional quality and perfect blends for your kitchen.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-300 hover:text-amber-300 transition-colors">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Naraina Village, Delhi</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300 hover:text-amber-300 transition-colors cursor-pointer">
                <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>9560226275</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300 hover:text-amber-300 transition-colors cursor-pointer">
                <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>larmindia12@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Collections Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-amber-300">
              Collections
            </h3>
            <ul className="space-y-2">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-amber-300 transition-colors font-medium"
                  >
                    → {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-amber-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-amber-300 transition-colors font-medium"
                  >
                    → {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} <span className="text-amber-300 font-semibold">Larm India</span>. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-amber-300 transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-amber-300 transition-colors font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
