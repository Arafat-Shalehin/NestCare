export default function BookingLoading() {
  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="h-3 w-14 rounded-full bg-(--color-bg-soft) animate-pulse" />
          <span className="text-(--color-border-strong)">/</span>
          <div className="h-3 w-16 rounded-full bg-(--color-bg-soft) animate-pulse" />
          <span className="text-(--color-border-strong)">/</span>
          <div className="h-3 w-20 rounded-full bg-(--color-bg-soft) animate-pulse" />
          <span className="text-(--color-border-strong)">/</span>
          <div className="h-3 w-10 rounded-full bg-(--color-bg-soft) animate-pulse" />
        </div>

        {/* Header skeleton */}
        <div className="space-y-4 animate-pulse">
          <div className="inline-flex items-center gap-2 rounded-full bg-(--color-surface) px-3 py-1 border border-(--color-border-subtle)">
            <div className="h-7 w-7 rounded-full bg-(--color-bg-soft)" />
            <div className="h-3 w-24 rounded-full bg-(--color-bg-soft)" />
            <div className="h-1 w-1 rounded-full bg-(--color-border-strong)" />
            <div className="h-3 w-16 rounded-full bg-(--color-bg-soft)" />
          </div>

          <div className="space-y-2">
            <div className="h-7 w-64 md:w-80 rounded-full bg-(--color-bg-soft)" />
            <div className="h-4 w-full md:w-3/4 rounded-full bg-(--color-bg-soft)" />
            <div className="h-4 w-5/6 md:w-2/3 rounded-full bg-(--color-bg-soft)" />
          </div>
        </div>

        {/* Form + summary skeleton */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          {/* Left: form skeleton */}
          <div className="space-y-8">
            {/* Step 1: Duration */}
            <div className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 md:p-6 space-y-4 animate-pulse">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="h-3 w-14 rounded-full bg-(--color-bg-soft)" />
                  <div className="h-4 w-32 rounded-full bg-(--color-bg-soft)" />
                </div>
                <div className="h-3 w-32 rounded-full bg-(--color-bg-soft)" />
              </div>

              <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded-full bg-(--color-bg-soft)" />
                  <div className="h-10 w-full rounded-lg bg-(--color-bg-soft)" />
                  <div className="h-3 w-40 rounded-full bg-(--color-bg-soft)" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded-full bg-(--color-bg-soft)" />
                  <div className="h-10 w-full rounded-lg bg-(--color-bg-soft)" />
                  <div className="h-3 w-44 rounded-full bg-(--color-bg-soft)" />
                </div>
              </div>
            </div>

            {/* Step 2: Location */}
            <div className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 md:p-6 space-y-4 animate-pulse">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="h-3 w-14 rounded-full bg-(--color-bg-soft)" />
                  <div className="h-4 w-32 rounded-full bg-(--color-bg-soft)" />
                </div>
                <div className="h-3 w-40 rounded-full bg-(--color-bg-soft)" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-3 w-24 rounded-full bg-(--color-bg-soft)" />
                    <div className="h-10 w-full rounded-lg bg-(--color-bg-soft)" />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="h-3 w-28 rounded-full bg-(--color-bg-soft)" />
                <div className="h-20 w-full rounded-lg bg-(--color-bg-soft)" />
              </div>
            </div>
          </div>

          {/* Right: summary skeleton */}
          <aside className="md:pl-4 lg:pl-8">
            <div className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) shadow-lg shadow-black/5 p-5 md:p-6 space-y-5 animate-pulse">
              <div className="space-y-2">
                <div className="h-3 w-20 rounded-full bg-(--color-bg-soft)" />
                <div className="h-4 w-40 rounded-full bg-(--color-bg-soft)" />
                <div className="h-3 w-full rounded-full bg-(--color-bg-soft)" />
              </div>

              <div className="rounded-xl bg-(--color-bg-soft) border border-(--color-border-subtle) p-4 space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="h-3 w-20 rounded-full bg-(--color-surface)" />
                    <div className="h-3 w-24 rounded-full bg-(--color-surface)" />
                  </div>
                ))}
                <div className="border-t border-(--color-border-subtle) pt-3 flex items-center justify-between gap-3">
                  <div className="h-3 w-24 rounded-full bg-(--color-surface)" />
                  <div className="h-5 w-28 rounded-full bg-(--color-surface)" />
                </div>
              </div>

              <div className="h-3 w-full rounded-full bg-(--color-bg-soft)" />
              <div className="h-10 w-full rounded-full bg-(--color-primary-100)" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}