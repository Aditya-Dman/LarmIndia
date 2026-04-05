"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, CircleUserRound, Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { createClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderUser = {
  email: string;
  fullName: string;
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [currentUser, setCurrentUser] = useState<HeaderUser | null>(null);
  const { getItemCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useMemo(() => createClient(), []);
  const itemCount = getItemCount();

  useEffect(() => {
    let isMounted = true;

    const syncAuthState = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        const sessionUser = data.session?.user;
        setIsAuthenticated(Boolean(sessionUser));
        if (sessionUser) {
          setCurrentUser({
            email: sessionUser.email ?? "",
            fullName: (sessionUser.user_metadata?.full_name as string | undefined) ?? "My Account",
          });
        } else {
          setCurrentUser(null);
        }
      }
    };

    syncAuthState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setIsAuthenticated(Boolean(session));
        if (session?.user) {
          setCurrentUser({
            email: session.user.email ?? "",
            fullName: (session.user.user_metadata?.full_name as string | undefined) ?? "My Account",
          });
        } else {
          setCurrentUser(null);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    document.cookie = "demo_bypass=; path=/; max-age=0";
    setIsSigningOut(false);
    router.replace("/auth");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-[0_1px_0_0_rgba(15,23,42,0.05)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex lg:flex-1 hover:opacity-80 transition-opacity">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-9">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-[15px] font-semibold transition-colors relative group",
                pathname === item.href ? "text-primary" : "text-foreground/75 hover:text-primary",
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                )}
              ></span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          {isAuthenticated && (
            <Link href="/admin">
              <Button variant="outline" className="font-semibold h-9">Admin Dashboard</Button>
            </Link>
          )}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Open account menu">
                  <CircleUserRound className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="space-y-1">
                  <p className="font-semibold text-sm leading-none">{currentUser?.fullName || "My Account"}</p>
                  <p className="text-xs text-muted-foreground break-all">{currentUser?.email || ""}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account#orders" className="cursor-pointer">
                    <Package className="h-4 w-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(event) => {
                    event.preventDefault();
                    void handleSignOut();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping cart" className="relative hover:bg-primary/10 h-9 w-9">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-xs font-bold text-white shadow-lg">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          {isAuthenticated ? null : (
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg">
                Login / Signup
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden gap-x-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="space-y-1 px-4 pb-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                pathname === item.href
                  ? "bg-secondary text-primary"
                  : "text-foreground/80 hover:bg-secondary hover:text-primary",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            {isAuthenticated && (
              <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-2" variant="secondary">Profile</Button>
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/account#orders" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-2" variant="secondary">Orders</Button>
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-2" variant="secondary">Admin Dashboard</Button>
              </Link>
            )}
            {isAuthenticated ? (
              <Button className="w-full" variant="outline" onClick={handleSignOut} disabled={isSigningOut}>
                {isSigningOut ? "Signing out..." : "Logout"}
              </Button>
            ) : (
              <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Login / Signup</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
