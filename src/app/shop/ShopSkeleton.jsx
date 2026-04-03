export default function ShopSkeleton() {
  return (
    <div className="mx-auto max-w-[1600px] animate-pulse px-4 py-14 sm:px-6 lg:px-10">
      <div className="h-40 rounded-3xl bg-[var(--surface-2)] dark:bg-white/5" />
      <div className="mt-10 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-11 w-24 rounded-full bg-[var(--surface-2)] dark:bg-white/5"
          />
        ))}
      </div>
      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <div className="aspect-[3/4] rounded-2xl bg-[var(--surface-2)] dark:bg-white/5" />
            <div className="mt-5 h-4 w-2/3 rounded bg-[var(--surface-2)] dark:bg-white/5" />
            <div className="mt-2 h-3 w-1/3 rounded bg-[var(--surface-2)] dark:bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
