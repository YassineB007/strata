import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#020203] text-white">
      <div
        className="pointer-events-none absolute -left-1/3 top-[-10%] h-[85%] w-[75%] rounded-full bg-accent/[0.11] blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-[-5%] h-[65%] w-[55%] rounded-full bg-violet-500/[0.09] blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_120%,rgba(0,0,0,0.15),transparent_55%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.94)_100%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-4 top-24 h-16 w-16 border-l-2 border-t-2 border-white/15 sm:left-6 sm:top-28 lg:left-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-28 right-4 h-16 w-16 border-b-2 border-r-2 border-white/10 sm:bottom-32 sm:right-6 lg:right-10"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col justify-end px-4 pb-20 pt-32 sm:px-6 sm:pb-28 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-32">
        <div className="max-w-4xl lg:max-w-[min(56vw,52rem)]">
          <div className="hero-x-in mb-7 inline-flex items-center gap-3 border border-white/12 bg-gradient-to-r from-white/[0.07] to-transparent px-4 py-2.5 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_16px_var(--accent)]" />
            <span className="text-[10px] font-bold tracking-[0.38em] text-zinc-300 uppercase sm:text-[11px]">
              SS26 — New arrivals
            </span>
          </div>

          <h1 className="hero-motion hero-motion-delay-1 font-[family-name:var(--font-display)] text-[clamp(3rem,11.5vw,6.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
            <span className="block text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.45)]">
              Form follows
            </span>
            <span className="mt-2 block bg-gradient-to-br from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
              attitude.
            </span>
          </h1>

          <p className="hero-motion hero-motion-delay-2 mt-9 max-w-lg text-base leading-[1.7] text-zinc-400 sm:text-[17px]">
            Architectural silhouettes, industrial textures, and uncompromising
            craft — built for the city, not the algorithm.
          </p>

          <div className="hero-motion hero-motion-delay-3 mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="group relative inline-flex min-h-[54px] items-center justify-center overflow-hidden rounded-full bg-accent px-11 text-[11px] font-bold tracking-[0.26em] text-[#070708] uppercase shadow-[0_0_40px_-8px_var(--glow)] transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_0_48px_-6px_var(--glow)] active:scale-[0.98]"
            >
              <span className="relative z-10">Shop now</span>
              <span className="absolute inset-0 translate-y-full bg-white/30 transition-transform duration-300 group-hover:translate-y-0" />
            </Link>
            <Link
              href="/shop?category=hoodies"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-9 text-[11px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur-md transition-all hover:border-accent/45 hover:bg-white/[0.09]"
            >
              Hoodies
            </Link>
          </div>

          <p className="hero-motion hero-motion-delay-5 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-nums text-[11px] tracking-wide text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="h-px w-6 bg-accent/60" />
              EU shipping €200+
            </span>
            <span className="hidden sm:inline">·</span>
            <span>Secure checkout</span>
          </p>

          <div className="hero-motion hero-motion-delay-4 mt-10 flex flex-wrap gap-2 lg:hidden">
            {[
              ["Est.", "2026"],
              ["Drop", "Limited"],
            ].map(([a, b]) => (
              <div
                key={a}
                className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 backdrop-blur-md"
              >
                <p className="font-mono-nums text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                  {a}
                </p>
                <p className="mt-0.5 font-[family-name:var(--font-display)] text-sm font-bold text-white">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-x-in mt-14 hidden w-60 shrink-0 flex-col gap-8 border-l border-white/12 pl-10 lg:mt-0 lg:flex">
          <div>
            <p className="font-mono-nums text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
              Est.
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-white">
              2026
            </p>
          </div>
          <div>
            <p className="font-mono-nums text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
              Drop policy
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Limited units on core styles. No restock on select pieces.
            </p>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-accent/50 to-transparent" />
          <p className="font-mono-nums text-[10px] leading-relaxed tracking-[0.08em] text-zinc-500">
            STRATA / VOID DIVISION
          </p>
        </div>
      </div>

      <div
        className="hero-scroll-hint absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        aria-hidden
      >
        <div className="flex h-14 w-9 flex-col items-center justify-start rounded-full border border-white/14 bg-white/[0.04] pt-2.5 backdrop-blur-md">
          <span className="hero-scroll-line h-7 w-px rounded-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
