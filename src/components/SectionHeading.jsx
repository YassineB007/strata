export default function SectionHeading({ eyebrow, title, subtitle, index }) {
  const num = index != null ? String(index).padStart(2, "0") : null;

  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        {num && (
          <span className="stagger-in hidden font-[family-name:var(--font-display)] text-[clamp(4.5rem,14vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.07em] text-[var(--foreground)]/[0.055] md:block dark:text-white/[0.06]">
            {num}
          </span>
        )}
        <div className={num ? "lg:max-w-xl lg:text-right" : ""}>
          {eyebrow && (
            <div
              className={`stagger-in flex items-center gap-4 ${num ? "lg:justify-end" : ""}`}
            >
              <span
                className={`hidden h-px w-10 shrink-0 bg-gradient-to-r from-accent to-transparent sm:block ${num ? "lg:order-2 lg:bg-gradient-to-l" : ""}`}
                aria-hidden
              />
              <p className="text-[10px] font-bold tracking-[0.42em] text-accent uppercase sm:text-[11px]">
                {eyebrow}
              </p>
            </div>
          )}
          <h2 className="hero-motion section-heading-delay-1 mt-4 font-[family-name:var(--font-display)] text-[clamp(2.1rem,5.5vw,3.75rem)] font-extrabold tracking-[-0.035em] text-[var(--foreground)]">
            {title}
          </h2>
          {subtitle && (
            <p className="hero-motion section-heading-delay-2 mt-6 max-w-md text-sm leading-[1.75] text-[var(--muted)] lg:ml-auto lg:text-right">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
