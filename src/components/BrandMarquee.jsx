const SEGMENTS = [
  "STRATA",
  "SS26",
  "VOID",
  "LIMITED RUN",
  "BERLIN",
  "ARCHIVE",
  "NO RESTOCK",
  "CRAFT FIRST",
];

export default function BrandMarquee() {
  const line = `${SEGMENTS.join(" · ")} · `;

  return (
    <div className="relative w-full min-w-0 overflow-hidden border-y border-[var(--border)] bg-[var(--foreground)] py-3.5 text-[var(--background)] dark:bg-[#0a0a0c] dark:text-zinc-200">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(212,255,76,0.07)_50%,transparent_100%)]" />
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee-track">
          <span className="inline-block shrink-0 whitespace-nowrap px-8 font-mono-nums text-[10px] font-bold tracking-[0.42em] uppercase">
            {line}
          </span>
          <span
            className="inline-block shrink-0 whitespace-nowrap px-8 font-mono-nums text-[10px] font-bold tracking-[0.42em] uppercase"
            aria-hidden
          >
            {line}
          </span>
        </div>
      </div>
    </div>
  );
}
