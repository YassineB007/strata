import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)] dark:bg-[#050506]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="mx-auto grid max-w-[1600px] gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-10 lg:px-10">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-[0.06em] text-[var(--foreground)]">
            STRATA
            <span className="text-accent">®</span>
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            Contemporary streetwear with an architectural edge. Limited runs
            and uncompromising detail.
          </p>
          <div className="mt-8 flex gap-3">
            {["IG", "TW", "TK"].map((s) => (
              <span
                key={s}
                className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-[var(--border)] text-[10px] font-bold tracking-wider text-[var(--muted)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--muted)] uppercase">
            Shop
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
            <li>
              <Link
                href="/shop"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                All pieces
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=hoodies"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Hoodies
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=tees"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Tees
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=pants"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Pants
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--muted)] uppercase">
            Info
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
            <li>
              <Link
                href="/shipping"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Shipping
              </Link>
            </li>
            <li>
              <Link
                href="/returns"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Returns
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] bg-[var(--surface-2)]/50 dark:bg-black/40">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-4 py-8 text-[11px] text-[var(--muted)] sm:flex-row sm:px-6 lg:px-10">
          <span>© {new Date().getFullYear()} STRATA. All rights reserved.</span>
          <span className="font-mono-nums tracking-[0.25em] uppercase">
            Est. 2026 — Berlin
          </span>
        </div>
      </div>
    </footer>
  );
}
