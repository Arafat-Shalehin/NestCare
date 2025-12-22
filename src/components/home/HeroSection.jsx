import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-(--color-border-subtle) bg-linear-to-br from-(--color-primary-50) via-(--color-bg-base) to-(--color-secondary-50)">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left: Text content */}
          <div className="space-y-6">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-(--color-surface) px-3 py-1 text-[11px] font-medium text-(--color-text-muted) border border-(--color-border-subtle) shadow-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary-600) text-xs font-semibold">
                ✓
              </span>
              <span>Verified caregivers • Baby • Elderly • Sick care</span>
            </div>

            {/* Main heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-(--color-text-main)">
              Trusted home care when{" "}
              <span className="text-(--color-primary-600)">family</span> needs
              it most.
            </h1>

            {/* Sub text */}
            <p className="text-sm md:text-base text-(--color-text-muted) max-w-xl">
              Book reliable caregivers for your children, elderly parents, or
              sick family members — right at home, on your schedule. To make Caregiving
              Easy, Safe and Accessible NestCare is here।
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/services"
                className="btn btn-md border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
              >
                Book a Caregiver
              </Link>
              <Link
                href="/about"
                className="btn btn-md btn-ghost text-(--color-text-muted) hover:bg-(--color-bg-soft)"
              >
                Learn how it works
              </Link>
            </div>

            {/* Quick benefits */}
            <div className="grid grid-cols-2 gap-3 pt-4 max-w-sm text-xs md:text-sm">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-5 w-5 inline-flex items-center justify-center rounded-full bg-(--color-success-100) text-(--color-success-500) text-xs">
                  ✓
                </span>
                <p className="text-(--color-text-muted)">
                  Background-checked &amp; verified caregivers
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-5 w-5 inline-flex items-center justify-center rounded-full bg-(--color-info-100) text-(--color-info-500) text-xs">
                  ⌚
                </span>
                <p className="text-(--color-text-muted)">
                  Flexible hourly or daily bookings
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-5 w-5 inline-flex items-center justify-center rounded-full bg-(--color-accent-100) text-(--color-accent-500) text-xs">
                  ⛑
                </span>
                <p className="text-(--color-text-muted)">
                  Special care for sick &amp; elderly at home
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-5 w-5 inline-flex items-center justify-center rounded-full bg-(--color-bg-soft) text-(--color-primary-600) text-xs">
                  ★
                </span>
                <p className="text-(--color-text-muted)">
                  Transparent pricing &amp; live booking status
                </p>
              </div>
            </div>
          </div>

          {/* Right: Highlight card */}
          <div className="relative">
            {/* Decorative blob */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-(--color-primary-100) opacity-60 blur-3xl" />

            <div className="relative rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) shadow-xl shadow-black/5 p-5 md:p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-(--color-text-soft)">
                    Quick booking overview
                  </p>
                  <p className="text-sm font-semibold text-(--color-text-main)">
                    Dhaka • Chattogram • Sylhet &amp; more
                  </p>
                </div>
                <span className="inline-flex items-center justify-center h-9 px-3 rounded-full bg-(--color-primary-50) text-[11px] font-medium text-(--color-primary-600)">
                  Live availability
                </span>
              </div>

              {/* Service tags */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-3 py-1 rounded-full bg-(--color-bg-soft) text-(--color-text-muted)">
                  👶 Baby sitting
                </span>
                <span className="px-3 py-1 rounded-full bg-(--color-bg-soft) text-(--color-text-muted)">
                  👵 Elderly care
                </span>
                <span className="px-3 py-1 rounded-full bg-(--color-bg-soft) text-(--color-text-muted)">
                  🏥 Sick care
                </span>
              </div>

              {/* Mini "booking" card */}
              <div className="rounded-xl bg-(--color-bg-soft) border border-(--color-border-subtle) p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <p className="font-medium text-(--color-text-main)">
                      Today, 4:00 PM
                    </p>
                    <p className="text-(--color-text-muted)">
                      Banani, Dhaka • 4 hours
                    </p>
                  </div>
                  <p className="text-right">
                    <span className="block text-[11px] text-(--color-text-soft)">
                      Estimated
                    </span>
                    <span className="text-sm font-semibold text-(--color-primary-600)">
                      ৳ 1,600
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-(--color-success-100) px-2 py-1 text-(--color-success-500)">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--color-success-500)" />
                    98% on-time arrivals
                  </span>
                  <span className="text-(--color-text-soft)">
                    Cancel anytime before start
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-(--color-text-main)">
                    10K+
                  </p>
                  <p className="text-[11px] text-(--color-text-soft)">
                    Hours of care
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-(--color-text-main)">
                    4.9
                  </p>
                  <p className="text-[11px] text-(--color-text-soft)">
                    Average rating
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-(--color-text-main)">
                    24/7
                  </p>
                  <p className="text-[11px] text-(--color-text-soft)">
                    Support
                  </p>
                </div>
              </div>

              {/* Bottom note */}
              <p className="text-[11px] text-(--color-text-soft)">
                Start by creating an account and you can book baby sitting,
                elderly care, or special home care in just a few steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
