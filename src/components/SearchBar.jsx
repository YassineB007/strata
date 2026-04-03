"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const q = (fd.get("q") ?? "").toString().trim();
      const params = new URLSearchParams(searchParams.toString());
      if (q) params.set("q", q);
      else params.delete("q");
      router.push(`/shop?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <form
      key={searchParams.toString()}
      onSubmit={onSubmit}
      className="relative w-full"
    >
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        defaultValue={searchParams.get("q") ?? ""}
        placeholder="Search collection…"
        className="h-11 w-full rounded-full border border-[var(--border)] bg-[var(--surface-2)]/60 py-2.5 pl-4 pr-11 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none ring-accent/0 transition-[box-shadow,border-color] focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:bg-white/[0.04]"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-accent"
        aria-label="Submit search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
}
