export default function ServicesLoading() {
  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20 space-y-10">
        {/* Header skeleton */}
        <div className="space-y-3 max-w-2xl animate-pulse">
          <div className="h-3 w-24 rounded-full bg-(--color-bg-soft)" />
          <div className="h-7 w-3/4 rounded-full bg-(--color-bg-soft)" />
          <div className="h-4 w-full md:w-5/6 rounded-full bg-(--color-bg-soft)" />
        </div>

        {/* Services cards skeleton */}
        <div className="grid gap-6 md:gap-7 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-full rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 md:p-6 flex flex-col justify-between animate-pulse"
            >
              <div className="space-y-4">
                {/* Top: icon + title + pill */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="h-9 w-9 rounded-full bg-(--color-bg-soft)" />
                    <div className="h-4 w-24 rounded-full bg-(--color-bg-soft)" />
                    <div className="h-3 w-16 rounded-full bg-(--color-bg-soft)" />
                  </div>
                  <div className="h-6 w-20 rounded-full bg-(--color-bg-soft)" />
                </div>

                {/* Tagline / summary */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded-full bg-(--color-bg-soft)" />
                  <div className="h-3 w-5/6 rounded-full bg-(--color-bg-soft)" />
                </div>

                {/* Bullets */}
                <div className="space-y-1.5">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-2.5 w-3/4 rounded-full bg-(--color-bg-soft)"
                    />
                  ))}
                </div>
              </div>

              {/* Bottom row */}
              <div className="pt-4 mt-4 border-t border-(--color-border-subtle) flex items-center justify-between">
                <div className="h-3 w-28 rounded-full bg-(--color-bg-soft)" />
                <div className="h-3 w-16 rounded-full bg-(--color-bg-soft)" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
