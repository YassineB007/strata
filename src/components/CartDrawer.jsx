"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { resolveImageSrc } from "@/lib/imageUrls";

export default function CartDrawer() {
  const { open, closeCart } = useCartDrawer();
  const { user, loading: authLoading } = useAuth();
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
            onClick={closeCart}
            aria-label="Close cart overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 340 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-[var(--border)] bg-[var(--surface)] shadow-[-24px_0_80px_rgba(0,0,0,0.25)] dark:bg-[#0a0a0c]"
          >
            <div className="relative overflow-hidden border-b border-[var(--border)] px-6 py-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/15 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.35em] text-[var(--muted)] uppercase">
                    Your bag
                  </p>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[var(--foreground)]">
                    Cart
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="rounded-full p-2.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
                  aria-label="Close cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-sm text-[var(--muted)]">Your bag is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-8 text-[11px] font-bold tracking-[0.22em] text-accent uppercase underline-offset-8 hover:underline"
                  >
                    Browse shop
                  </Link>
                </div>
              ) : (
                <ul className="space-y-8">
                  {items.map((line) => (
                    <li
                      key={line.id}
                      className="flex gap-4 border-b border-[var(--border)] pb-8 last:border-0"
                    >
                      <div className="relative h-32 w-[5.5rem] shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)] dark:bg-white/[0.04]">
                        <Image
                          src={resolveImageSrc(line.product.images[0])}
                          alt={line.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-snug text-[var(--foreground)]">
                          {line.product.name}
                        </p>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          Size {line.size}
                        </p>
                        <p className="mt-2 font-mono-nums text-sm font-medium text-[var(--foreground)]">
                          ${line.product.price}
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)]">
                            <button
                              type="button"
                              className="px-3.5 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                              onClick={() =>
                                updateQuantity(line.id, line.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="min-w-7 text-center font-mono-nums text-xs text-[var(--foreground)]">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              className="px-3.5 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                              onClick={() =>
                                updateQuantity(line.id, line.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(line.id)}
                            className="text-[10px] font-bold tracking-[0.15em] text-[var(--muted)] uppercase underline-offset-2 hover:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[var(--border)] bg-[var(--surface-2)]/60 px-6 py-7 dark:bg-black/40">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">Subtotal</span>
                  <span className="font-mono-nums text-lg font-semibold text-[var(--foreground)]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  Shipping and taxes calculated at checkout.
                </p>
                {authLoading ? (
                  <div
                    className="mt-6 h-12 w-full animate-pulse rounded-full bg-[var(--surface-2)] dark:bg-white/10"
                    aria-hidden
                  />
                ) : (
                  <Link
                    href={user ? "/checkout" : "/login?next=/checkout"}
                    onClick={closeCart}
                    className="mt-6 flex w-full items-center justify-center rounded-full bg-accent py-4 text-[11px] font-bold tracking-[0.22em] text-[#0a0a0a] uppercase shadow-lg shadow-accent/25 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {user ? "Checkout" : "Sign in to checkout"}
                  </Link>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
