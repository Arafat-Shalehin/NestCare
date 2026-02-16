import Link from "next/link";

export const metadata = {
  title: "About NestCare – Trusted Home Care Services",
  description:
    "Learn how NestCare makes caregiving simple, safe, and accessible for families needing baby care, elderly care, and sick care at home.",
};

export default function AboutPage() {
  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 lg:py-16 space-y-12 md:space-y-16">
        {/* Top: Hero / intro */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
              About NestCare
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-(--color-text-main)">
              Making home caregiving simple, safe, and accessible.
            </h1>
            <p className="text-sm md:text-base text-(--color-text-muted) max-w-2xl">
              NestCare is a digital platform created for families who need
              trusted caregivers at home. Whether it is baby sitting, elderly
              support, or care for a sick family member, NestCare helps you book
              reliable services with clear steps and transparent pricing.
            </p>
            <p className="text-sm md:text-base text-(--color-text-muted) max-w-2xl">
              Instead of making calls, searching endlessly, or relying on
              uncertain recommendations, you can use NestCare to view services,
              see starting prices, and submit booking requests directly from
              your phone or laptop.
            </p>
          </div>

          {/* Right: highlight card */}
          <div className="md:pl-6">
            <div className="relative rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) shadow-lg shadow-black/5 p-5 md:p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-(--color-text-soft)">
                  What NestCare focuses on
                </p>
                <p className="text-sm text-(--color-text-muted)">
                  Every feature is built around a few simple ideas — clarity,
                  trust, and ease of use.
                </p>
              </div>
              <ul className="space-y-2 text-xs md:text-sm text-(--color-text-muted)">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-primary-200)" />
                  <span>
                    A clear flow for booking — choose a service, set duration,
                    add your location, and see the estimated total before
                    confirming.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-secondary-200)" />
                  <span>
                    Live booking status so you always know if your request is
                    Pending, Confirmed, Completed, or Cancelled.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-accent-200)" />
                  <span>
                    Simple, responsive design that works on mobile, tablet, and
                    desktop for every family member.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mission & values */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <h2 className="text-xl md:text-2xl font-semibold text-(--color-text-main)">
              Our mission and values.
            </h2>
            <p className="text-sm md:text-base text-(--color-text-muted)">
              Caring for children, elderly parents, or sick relatives can be
              stressful. Finding help should not add more pressure. NestCare
              exists to make that process smoother. Our mission is to give
              families a simple way to arrange home care while staying informed
              and in control.
            </p>
            <p className="text-sm md:text-base text-(--color-text-muted)">
              We believe caregiving should be:
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary-50) text-(--color-primary-600)">
                  ✓
                </div>
                <h3 className="text-sm font-semibold text-(--color-text-main)">
                  Trustworthy
                </h3>
                <p className="text-xs text-(--color-text-muted)">
                  Clear information, transparent pricing, and service options
                  you can review before booking.
                </p>
              </div>
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-secondary-50) text-(--color-secondary-600)">
                  💬
                </div>
                <h3 className="text-sm font-semibold text-(--color-text-main)">
                  Transparent
                </h3>
                <p className="text-xs text-(--color-text-muted)">
                  Duration, location, and total cost are visible up front so
                  there are no hidden surprises.
                </p>
              </div>
              <div className="space-y-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-accent-50) text-(--color-accent-500)">
                  🏠
                </div>
                <h3 className="text-sm font-semibold text-(--color-text-main)">
                  Home‑focused
                </h3>
                <p className="text-xs text-(--color-text-muted)">
                  Every service is designed for care at home, where your loved
                  ones feel most comfortable.
                </p>
              </div>
            </div>
          </div>

          {/* Side metrics */}
          <div className="md:pl-6">
            <div className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 space-y-4">
              <p className="text-sm font-semibold text-(--color-text-main)">
                A simple structure for every booking.
              </p>
              <ul className="space-y-2 text-xs text-(--color-text-muted)">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-success-200)" />
                  <span>
                    Three main care types: Baby Care, Elderly Care, and Sick
                    People Care.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-info-200)" />
                  <span>
                    Duration-based pricing so you can book support for hours or
                    days, depending on what you need.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-bg-soft)" />
                  <span>
                    Location-aware details, including division, district, city,
                    area, and full address.
                  </span>
                </li>
              </ul>

              <div className="grid grid-cols-3 gap-3 pt-3 text-center text-xs text-(--color-text-soft)">
                <div className="rounded-2xl bg-(--color-bg-soft) px-3 py-2">
                  <p className="text-lg font-semibold text-(--color-text-main)">
                    3
                  </p>
                  <p>Care categories</p>
                </div>
                <div className="rounded-2xl bg-(--color-bg-soft) px-3 py-2">
                  <p className="text-lg font-semibold text-(--color-text-main)">
                    100%
                  </p>
                  <p>Online booking</p>
                </div>
                <div className="rounded-2xl bg-(--color-bg-soft) px-3 py-2">
                  <p className="text-lg font-semibold text-(--color-text-main)">
                    24/7
                  </p>
                  <p>Access to history</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-3xl border border-(--color-border-subtle) bg-(--color-surface) px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 space-y-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
              How NestCare works
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-(--color-text-main)">
              From choosing a service to tracking your booking.
            </h2>
            <p className="text-sm md:text-base text-(--color-text-muted)">
              Every NestCare service follows the same simple pattern so you
              always know what to expect.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4 text-sm">
            <div className="space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary-50) text-(--color-primary-600) text-xs font-semibold">
                1
              </div>
              <h3 className="text-sm font-semibold text-(--color-text-main)">
                Explore services
              </h3>
              <p className="text-xs text-(--color-text-muted)">
                Start from the Services page and choose Baby Care, Elderly Care,
                or Sick People Care based on your family’s needs.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary-50) text-(--color-primary-600) text-xs font-semibold">
                2
              </div>
              <h3 className="text-sm font-semibold text-(--color-text-main)">
                View details
              </h3>
              <p className="text-xs text-(--color-text-muted)">
                On each service detail page, see what is included, recommended
                durations, and starting price information.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary-50) text-(--color-primary-600) text-xs font-semibold">
                3
              </div>
              <h3 className="text-sm font-semibold text-(--color-text-main)">
                Book your slot
              </h3>
              <p className="text-xs text-(--color-text-muted)">
                On the booking page, choose duration, add your location, and
                review the estimated total cost before confirming your request.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary-50) text-(--color-primary-600) text-xs font-semibold">
                4
              </div>
              <h3 className="text-sm font-semibold text-(--color-text-main)">
                Track and manage
              </h3>
              <p className="text-xs text-(--color-text-muted)">
                Use the My Bookings page to see all your requests with live
                status, total cost, and options to view details or cancel.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-(--color-border-subtle) bg-linear-to-r from-(--color-primary-50) via-(--color-bg-base) to-(--color-secondary-50) px-5 py-6 md:px-8 md:py-7">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-semibold text-(--color-text-main)">
              Ready to arrange care at home?
            </h2>
            <p className="text-xs md:text-sm text-(--color-text-muted)">
              Explore our services and create your first booking request in just
              a few steps.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/services"
              className="btn btn-sm md:btn-md border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
            >
              View services
            </Link>
            <a
              href="/help"
              className="btn btn-sm md:btn-md btn-ghost text-(--color-text-muted) hover:bg-(--color-bg-soft)"
            >
              Get support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
