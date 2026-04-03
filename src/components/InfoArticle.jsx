import Link from "next/link";

export default function InfoArticle({ eyebrow, title, children }) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <Link
        href="/"
        className="text-[10px] font-bold tracking-[0.25em] text-[var(--muted)] uppercase transition-colors hover:text-accent"
      >
        ← Home
      </Link>
      <div className="relative mx-auto mt-10 max-w-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/[0.06] blur-[90px]" />
        <p className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-[-0.03em] text-[var(--foreground)]">
          {title}
        </h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-[var(--muted)] [&_strong]:font-semibold [&_strong]:text-[var(--foreground)] [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </div>
  );
}
