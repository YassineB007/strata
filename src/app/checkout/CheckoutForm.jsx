"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createOrder } from "@/app/actions/checkout";
import { useCart } from "@/context/CartContext";

const emptyShipping = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal: "",
  country: "",
};

export default function CheckoutForm() {
  const router = useRouter();
  const { items, hydrated, total, clearCart } = useCart();
  const [shipping, setShipping] = useState(emptyShipping);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const lineInputs = useMemo(
    () =>
      items.map((line) => ({
        productId: line.product.id,
        size: line.size,
        quantity: line.quantity,
      })),
    [items]
  );

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await createOrder(lineInputs, shipping);
      if (!result.ok) {
        setError(result.error ?? "Checkout failed.");
        return;
      }
      clearCart();
      router.push(`/account/orders/${result.orderId}`);
      router.refresh();
    } catch (err) {
      setError(err.message ?? "Checkout failed.");
    } finally {
      setSubmitting(false);
    }
  }

  function field(id, label, required = true, rest = {}) {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase"
        >
          {label}
        </label>
        <input
          id={id}
          name={id}
          required={required}
          value={shipping[id]}
          onChange={(e) =>
            setShipping((s) => ({ ...s, [id]: e.target.value }))
          }
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] focus:border-accent/55 focus:ring-2 focus:ring-accent/25"
          {...rest}
        />
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse space-y-6 px-4 py-12">
        <div className="h-12 rounded-2xl bg-[var(--surface-2)] dark:bg-white/5" />
        <div className="h-40 rounded-2xl bg-[var(--surface-2)] dark:bg-white/5" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-sm text-[var(--muted)]">Your bag is empty.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block text-[11px] font-bold tracking-[0.22em] text-accent uppercase underline-offset-8 hover:underline"
        >
          Browse shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5"
      >
        <div className="lg:col-span-2">
          <p className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase">
            Checkout
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-[-0.03em] text-[var(--foreground)]">
            Shipping
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Demo checkout — orders are stored on your account. Payment integration
            can replace this step later.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            {field("name", "Full name")}
            {field("line1", "Address line 1")}
            {field("line2", "Address line 2 (optional)", false)}
            <div className="grid gap-5 sm:grid-cols-2">
              {field("city", "City")}
              {field("state", "State / Region")}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("postal", "Postal code")}
              {field("country", "Country")}
            </div>

            {error && (
              <p className="rounded-2xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-[var(--foreground)] py-4 text-[11px] font-bold tracking-[0.22em] text-[var(--background)] uppercase transition-[opacity,transform] hover:opacity-95 active:scale-[0.99] disabled:opacity-50 dark:bg-white dark:text-[#070708]"
            >
              {submitting ? "Placing order…" : "Place order"}
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/80 p-8 dark:border-white/[0.08] lg:col-span-3">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--foreground)]">
            Order summary
          </h2>
          <ul className="mt-8 space-y-6 border-b border-[var(--border)] pb-8">
            {items.map((line) => (
              <li
                key={line.id}
                className="flex justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-medium text-[var(--foreground)]">
                    {line.product.name}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Size {line.size} × {line.quantity}
                  </p>
                </div>
                <p className="shrink-0 font-mono-nums text-[var(--foreground)]">
                  ${(line.product.price * line.quantity).toFixed(0)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">Total (USD)</span>
            <span className="font-mono-nums text-xl font-semibold text-[var(--foreground)]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
