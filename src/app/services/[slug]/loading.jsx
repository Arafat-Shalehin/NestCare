export default function ServiceDetailLoading() {
  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 h-3 w-44 rounded-full bg-(--color-bg-soft) animate-pulse" />

        {/* Header + sticky card skeleton */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-start mb-10">
          {/* Left header */}
          <div className="space-y-4 animate-pulse">
            <div className="h-6 w-52 rounded-full bg-(--color-bg-soft)" />
            <div className="h-8 w-3/4 rounded-full bg-(--color-bg-soft)" />
            <div className="h-4 w-full md:w-5/6 rounded-full bg-(--color-bg-soft)" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-6 w-32 rounded-full bg-(--color-bg-soft)" />
              <div className="h-6 w-44 rounded-full bg-(--color-bg-soft)" />
            </div>
          </div>

          {/* Right sticky booking card */}
          <div className="md:pl-6">
            <div className="rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) shadow-lg shadow-black/5 p-5 md:p-6 space-y-4 animate-pulse">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded-full bg-(--color-bg-soft)" />
                  <div className="h-6 w-32 rounded-full bg-(--color-bg-soft)" />
                </div>
                <div className="h-6 w-28 rounded-full bg-(--color-bg-soft)" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-(--color-bg-soft)" />
                <div className="h-3 w-5/6 rounded-full bg-(--color-bg-soft)" />
              </div>

              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="h-4 w-4 rounded-full bg-(--color-bg-soft)" />
                    <div className="h-3 w-full rounded-full bg-(--color-bg-soft)" />
                  </div>
                ))}
              </div>

              <div className="h-10 w-full rounded-full bg-(--color-primary-100)" />
              <div className="h-3 w-5/6 rounded-full bg-(--color-bg-soft)" />
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          {/* Left column: sections */}
          <div className="space-y-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 w-40 rounded-full bg-(--color-bg-soft)" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-3 w-full rounded-full bg-(--color-bg-soft)"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right column: quick facts */}
          <div className="space-y-4 md:pl-6 animate-pulse">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) p-5 space-y-3"
              >
                <div className="h-4 w-32 rounded-full bg-(--color-bg-soft)" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-3 w-full rounded-full bg-(--color-bg-soft)"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
