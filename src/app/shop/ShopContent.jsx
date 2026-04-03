"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function ShopContent({ products: allProducts, categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").toLowerCase().trim();
  const category = searchParams.get("category") ?? "all";

  const products = useMemo(() => {
    let list = allProducts;
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allProducts, q, category]);

  const setCategory = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("category");
    else params.set("category", id);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-6 py-12 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.15)] sm:px-10 sm:py-16 dark:bg-[linear-gradient(145deg,#0c0c10_0%,#08080a_100%)] dark:shadow-[0_28px_90px_-40px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/[0.12] blur-[90px] dark:bg-accent/[0.08]" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-violet-500/[0.06] blur-[70px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[linear-gradient(105deg,transparent_40%,rgba(212,255,76,0.04)_100%)]" />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-accent to-transparent" />
            <p className="text-[10px] font-bold tracking-[0.45em] text-accent uppercase">
              Shop
            </p>
          </div>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.65rem,6.5vw,4.25rem)] font-extrabold tracking-[-0.045em] text-[var(--foreground)]">
            All pieces
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
            Filter by category. Hover cards for detail — every piece is
            photographed in-house.
          </p>
        </motion.div>
      </div>

      <div className="sticky top-[4.25rem] z-20 -mx-4 mt-10 border-y border-[var(--border)] bg-[var(--background)]/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:mt-14 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active =
                cat.id === "all"
                  ? category === "all"
                  : category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`rounded-full px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] uppercase transition-all ${
                    active
                      ? "bg-[var(--foreground)] text-[var(--background)] shadow-lg dark:bg-white dark:text-[#0a0a0a]"
                      : "border border-[var(--border)] bg-[var(--surface)]/80 text-[var(--muted)] hover:border-accent/30 hover:text-[var(--foreground)] dark:bg-white/[0.03]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          {q ? (
            <p className="text-sm text-[var(--muted)]">
              Results for &ldquo;{searchParams.get("q")}&rdquo; —{" "}
              <span className="font-mono-nums font-medium text-[var(--foreground)]">
                {products.length}
              </span>{" "}
              items
            </p>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              <span className="font-mono-nums font-medium text-[var(--foreground)]">
                {products.length}
              </span>{" "}
              items
            </p>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-24 text-center text-sm text-[var(--muted)]"
        >
          No products match your filters.{" "}
          <button
            type="button"
            onClick={() => router.push("/shop")}
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        </motion.p>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
