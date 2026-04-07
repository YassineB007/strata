"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading: authLoading, signOut } = useAuth();
  const { count } = useCart();
  const { openCart } = useCartDrawer();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 overflow-x-clip border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-2xl transition-[box-shadow,background-color] duration-300 dark:bg-[#060607]/85 ${
        scrolled
          ? "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.55)]"
          : ""
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="mx-auto flex h-[4.25rem] min-w-0 max-w-[1600px] items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:h-[4.5rem] lg:gap-6 lg:px-10">
        <div className="flex min-w-0 shrink items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="group relative flex shrink-0 items-baseline gap-0.5"
          >
            <span className="font-[family-name:var(--font-display)] text-lg font-extrabold tracking-[0.1em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-accent sm:text-xl md:text-2xl">
              STRATA
            </span>
            <span className="font-[family-name:var(--font-display)] text-[10px] font-bold text-accent sm:text-xs">
              ®
            </span>
          </Link>
          <Link
            href="/shop"
            className="shrink-0 rounded-full px-2.5 py-1.5 text-[9px] font-bold tracking-[0.18em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--foreground)] sm:hidden"
          >
            Shop
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:gap-10 lg:gap-12 sm:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-full py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-200 ${
                  active
                    ? "bg-accent/18 px-3 text-[var(--foreground)] shadow-[0_0_24px_-4px_rgba(212,255,76,0.35)] dark:bg-accent/12"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2 md:gap-3">
          <div className="hidden min-w-0 flex-1 justify-end md:flex md:max-w-sm lg:max-w-md">
            <SearchBar />
          </div>
          <ThemeToggle />
          {authLoading ? (
            <span
              className="h-9 w-14 shrink-0 animate-pulse rounded-full bg-[var(--surface-2)]"
              aria-hidden
            />
          ) : user ? (
            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
              <Link
                href="/account"
                className="rounded-full px-2 py-2 text-[9px] font-bold tracking-[0.15em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--foreground)] sm:px-3 sm:text-[10px] sm:tracking-[0.18em]"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-full px-2 py-2 text-[9px] font-bold tracking-[0.15em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--foreground)] sm:px-3 sm:text-[10px] sm:tracking-[0.18em]"
              >
                Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)]/55 px-3 py-2 text-[9px] font-bold tracking-[0.18em] text-[var(--foreground)] uppercase transition-all hover:border-accent/35 hover:bg-accent/12 sm:px-4 sm:text-[10px] sm:tracking-[0.2em]"
            >
              Sign in
            </Link>
          )}
          <button
            type="button"
            onClick={openCart}
            className="group relative flex h-10 shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-2)]/55 px-3.5 text-[9px] font-bold tracking-[0.18em] text-[var(--foreground)] uppercase transition-all duration-300 hover:border-accent/35 hover:bg-accent/12 hover:shadow-[0_0_24px_-8px_rgba(212,255,76,0.25)] sm:h-11 sm:gap-2 sm:px-5 sm:text-[10px] sm:tracking-[0.2em] dark:bg-white/[0.04]"
            aria-label="Open cart"
          >
            <span>Bag</span>
            {count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-accent px-1 font-mono-nums text-[10px] font-bold text-[#070708] shadow-sm">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-4 py-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}
