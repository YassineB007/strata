const items = [
  {
    title: "Precision craft",
    copy: "Pattern-led cuts, taped seams, and fabric that breaks in — not out.",
  },
  {
    title: "Small batches",
    copy: "Runs are capped. When a silhouette sells through, it may not return.",
  },
  {
    title: "Archive mindset",
    copy: "Designed to layer and age — pieces that stay in rotation for years.",
  },
];

const delayClass = ["", "stagger-in-delay-1", "stagger-in-delay-2"];

export default function HomeValues() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`stagger-in ${delayClass[i] ?? ""} group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] backdrop-blur-sm transition-colors hover:border-accent/25 dark:bg-[#0c0c0f]/80 dark:shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]`}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-opacity group-hover:opacity-100" />
            <p className="text-[10px] font-bold tracking-[0.28em] text-accent uppercase">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--foreground)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {item.copy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
