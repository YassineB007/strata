import Link from "next/link";
import BrandMarquee from "@/components/BrandMarquee";
import Hero from "@/components/Hero";
import HomeValues from "@/components/HomeValues";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedProducts, getNewDrops } from "@/lib/products";

export default async function HomePage() {
  const [featured, newDrops] = await Promise.all([
    getFeaturedProducts(),
    getNewDrops(),
  ]);

  return (
    <>
      <Hero />
      <BrandMarquee />

      <section className="relative border-t border-[var(--border)] py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(212,255,76,0.07),transparent_55%)] dark:bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(212,255,76,0.045),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-10">
          <HomeValues />
        </div>
        <SectionHeading
          index={1}
          eyebrow="Curated"
          title="Featured"
          subtitle="Pieces we stand behind — limited runs, precise construction, zero noise."
        />
        <div className="relative mx-auto mt-16 grid max-w-[1600px] grid-cols-1 gap-x-8 gap-y-16 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-y-20 lg:px-10">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="relative mx-auto mt-24 max-w-[1600px] px-4 text-center sm:px-6 lg:px-10">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.3em] text-[var(--foreground)] uppercase"
          >
            <span className="h-px w-10 bg-accent transition-all duration-300 group-hover:w-14" />
            View all products
            <span className="h-px w-10 bg-accent transition-all duration-300 group-hover:w-14" />
          </Link>
        </div>
      </section>

      <section className="relative border-t border-[var(--border)] bg-[var(--surface)] py-20 lg:py-28 dark:bg-[#08080a]">
        <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent dark:via-white/10" />
        <SectionHeading
          index={2}
          eyebrow="Collections"
          title="New drops"
          subtitle="Fresh silhouettes and fabric experiments — move before they are gone."
        />
        <div className="relative mx-auto mt-16 grid max-w-[1600px] grid-cols-1 gap-x-8 gap-y-16 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-y-20 lg:px-10">
          {newDrops.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--border)] py-24 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,var(--surface-2)_0%,var(--background)_42%,var(--surface)_100%)] opacity-90 dark:opacity-100" />
        <div className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[100px] dark:bg-accent/[0.04]" />
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/90 p-10 text-center shadow-[0_32px_100px_-32px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#0e0e12]/95 dark:shadow-[0_32px_100px_-28px_rgba(0,0,0,0.65)] sm:p-12">
            <p className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase">
              Inner circle
            </p>
            <p className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em] text-[var(--foreground)]">
              Precision over hype.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
              Sign up for restocks and collection previews. No spam — only
              drops.
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Email address"
                className="min-h-[52px] min-w-0 flex-1 rounded-full border border-[var(--border)] bg-[var(--background)] px-6 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-[border-color,box-shadow] focus:border-accent/55 focus:ring-2 focus:ring-accent/25 sm:max-w-xs"
                readOnly
                aria-label="Email (demo)"
              />
              <button
                type="button"
                className="min-h-[52px] shrink-0 rounded-full bg-[var(--foreground)] px-12 text-[11px] font-bold tracking-[0.22em] text-[var(--background)] uppercase transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_0_40px_-12px_rgba(212,255,76,0.35)] active:scale-[0.98] dark:bg-white dark:text-[#070708]"
              >
                Join
              </button>
            </div>
            <p className="mt-8 font-mono-nums text-[10px] tracking-[0.15em] text-[var(--muted)]">
              Encrypted · Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
