export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-[1600px] animate-pulse px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[3/4] rounded-3xl bg-[var(--surface-2)] dark:bg-white/5" />
        <div className="mt-10 space-y-6 lg:mt-0 lg:py-8">
          <div className="h-4 w-24 rounded bg-[var(--surface-2)] dark:bg-white/5" />
          <div className="h-12 max-w-lg rounded bg-[var(--surface-2)] dark:bg-white/5" />
          <div className="h-10 w-32 rounded bg-[var(--surface-2)] dark:bg-white/5" />
          <div className="space-y-2 pt-4">
            <div className="h-3 rounded bg-[var(--surface-2)] dark:bg-white/5" />
            <div className="h-3 rounded bg-[var(--surface-2)] dark:bg-white/5" />
            <div className="h-3 w-4/5 rounded bg-[var(--surface-2)] dark:bg-white/5" />
          </div>
          <div className="flex gap-2 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 w-12 rounded-xl bg-[var(--surface-2)] dark:bg-white/5"
              />
            ))}
          </div>
          <div className="h-14 max-w-md rounded-full bg-[var(--surface-2)] dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
}
