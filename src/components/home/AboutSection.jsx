export default function AboutSection() {
  return (
    <section className="border-b border-(--color-border-subtle) bg-(--color-surface)">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left: concise mission */}
          <div className="space-y-5 animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
              Our mission
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-(--color-text-main)">
              A simple, safe way to book trusted home care.
            </h2>

            <p className="text-sm md:text-base text-(--color-text-muted) max-w-xl">
              NestCare is built to help families quickly arrange reliable care
              for children, elderly parents, and sick family members — without
              phone calls, guesswork, or uncertainty.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-3">
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary-50) text-(--color-primary-600)">
                  👨‍👩‍👧
                </div>
                <h3 className="text-sm font-semibold text-(--color-text-main)">
                  For every family
                </h3>
                <p className="text-xs text-(--color-text-muted)">
                  Baby sitting, elderly support, and sick care — all in one
                  platform.
                </p>
              </div>

              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-secondary-50) text-(--color-secondary-600)">
                  📍
                </div>
                <h3 className="text-sm font-semibold text-(--color-text-main)">
                  Location‑aware
                </h3>
                <p className="text-xs text-(--color-text-muted)">
                  Book care based on your division, district, city, and exact
                  address.
                </p>
              </div>

              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-accent-50) text-(--color-accent-500)">
                  💳
                </div>
                <h3 className="text-sm font-semibold text-(--color-text-main)">
                  Clear pricing
                </h3>
                <p className="text-xs text-(--color-text-muted)">
                  See total cost calculated from duration and service charge
                  before you confirm.
                </p>
              </div>
            </div>
          </div>

          {/* Right: subtle animated stats card */}
          <div className="md:pl-8">
            <div className="relative animate-float-slow">
              <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-(--color-primary-100) opacity-60 blur-3xl" />

              <div className="relative rounded-2xl bg-(--color-bg-base) border border-(--color-border-subtle) shadow-lg shadow-black/5 p-5 md:p-6 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-(--color-text-soft)">
                      Platform snapshot
                    </p>
                    <p className="text-sm text-(--color-text-muted)">
                      Designed around safety and transparency.
                    </p>
                  </div>
                  <span className="inline-flex text-center items-center justify-center rounded-full bg-(--color-primary-50) px-3 py-1 text-[11px] font-medium text-(--color-primary-600)">
                    Live booking status
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-(--color-text-main)">
                      3
                    </p>
                    <p className="text-[11px] text-(--color-text-soft)">
                      Care types
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-(--color-text-main)">
                      100%
                    </p>
                    <p className="text-[11px] text-(--color-text-soft)">
                      Online booking
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-(--color-text-main)">
                      24/7
                    </p>
                    <p className="text-[11px] text-(--color-text-soft)">
                      Access
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-(--color-success-100) text-(--color-success-500) flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <p className="text-(--color-text-muted)">
                      Simple booking flow with duration, location, and pricing
                      in a single, clear interface.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-(--color-info-100) text-(--color-info-500) flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <p className="text-(--color-text-muted)">
                      Real‑time booking status: Pending, Confirmed, Completed,
                      or Cancelled — always visible to you.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-(--color-text-soft)">
                  NestCare focuses on what matters: safe caregivers, clear
                  information, and a booking process that respects your time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
