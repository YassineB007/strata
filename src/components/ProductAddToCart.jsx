"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";

export default function ProductAddToCart({ product }) {
  const [size, setSize] = useState(null);
  const [error, setError] = useState(false);
  const { addItem } = useCart();
  const { openCart } = useCartDrawer();

  function onAdd() {
    if (!size) {
      setError(true);
      return;
    }
    setError(false);
    addItem(product, size, 1);
    openCart();
  }

  return (
    <div className="mt-12 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:py-8">
      <p className="text-[10px] font-bold tracking-[0.35em] text-accent uppercase">
        {product.collection}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.85rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--foreground)]">
        {product.name}
      </h1>
      <p className="mt-6 font-mono-nums text-3xl font-medium text-[var(--foreground)]">
        ${product.price}
      </p>
      <p className="mt-8 text-sm leading-[1.75] text-[var(--muted)]">
        {product.description}
      </p>

      <div className="mt-10 grid grid-cols-3 gap-2 border-y border-[var(--border)] py-6 sm:gap-4">
        {[
          ["Dispatch", "48h"],
          ["Returns", "14 days"],
          ["Packaging", "Recycled"],
        ].map(([a, b]) => (
          <div key={a} className="text-center">
            <p className="font-mono-nums text-[9px] font-medium tracking-[0.18em] text-[var(--muted)] uppercase">
              {a}
            </p>
            <p className="mt-1.5 text-xs font-bold text-[var(--foreground)]">
              {b}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <p className="text-[10px] font-bold tracking-[0.25em] text-[var(--muted)] uppercase">
          Size
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes.map((s) => {
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className={`min-h-12 min-w-12 rounded-xl border px-4 text-sm font-semibold transition-all ${
                  selected
                    ? "border-accent bg-accent/15 text-[var(--foreground)] shadow-[0_0_0_1px_rgba(212,255,76,0.4)]"
                    : "border-[var(--border)] text-[var(--foreground)] hover:border-accent/40"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {error && (
          <p className="mt-3 text-xs font-medium text-red-500" role="alert">
            Select a size to continue.
          </p>
        )}
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full bg-[var(--foreground)] text-[11px] font-bold tracking-[0.2em] text-[var(--background)] uppercase shadow-[0_0_40px_-12px_rgba(212,255,76,0.35)] transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_0_48px_-8px_rgba(212,255,76,0.45)] active:scale-[0.98] dark:bg-white dark:text-[#0a0a0a]"
        >
          Add to bag
        </button>
        <Link
          href="/shop"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[var(--border)] px-8 text-[11px] font-bold tracking-[0.18em] text-[var(--foreground)] uppercase transition-colors hover:border-accent/40"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}
