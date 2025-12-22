import { getServiceBySlug } from "@/actions/server/services";
import Link from "next/link";
import { notFound } from "next/navigation";

function getAccentClasses(accent) {
  switch (accent) {
    case "secondary":
      return {
        chipBg: "bg-(--color-secondary-50)",
        chipText: "text-(--color-secondary-600)",
      };
    case "accent":
      return {
        chipBg: "bg-(--color-accent-50)",
        chipText: "text-(--color-accent-500)",
      };
    case "primary":
    default:
      return {
        chipBg: "bg-(--color-primary-50)",
        chipText: "text-(--color-primary-600)",
      };
  }
}

export async function generateMetadata(props) {
  const params = await props.params;
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service not found – NestCare",
    };
  }

  const descriptions = service.descriptions || {};
  const tagline =
    descriptions.tagline ||
    descriptions.short ||
    `Home-based ${service.label || "care"} service.`;

  return {
    title: `${service.name} – NestCare`,
    description: tagline,
  };
}

export default async function ServiceDetailPage(props) {
  const params = await props.params;
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return notFound();
  }

  const descriptions = service.descriptions || {};
  const tagline =
    descriptions.tagline ||
    descriptions.short ||
    `Home-based ${service.label || "care"} service.`;

  const longDescription = descriptions?.summary || "";

  const accentClasses = getAccentClasses(service.pricing?.accent);
  const pricing = service.pricing || {};
  const baseRate = Number(pricing.baseRate || 0);

  const priceText = `${
    pricing.currency === "BDT" ? "৳" : pricing.currency || ""
  } ${baseRate.toLocaleString("en-BD")} / ${pricing.unit || "hour"}`;

  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-(--color-text-soft)">
          <Link href="/" className="hover:text-(--color-text-main)">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-(--color-text-main)">
            Services
          </Link>
          <span>/</span>
          <span className="text-(--color-text-muted)">{service.name}</span>
        </div>

        {/* Header + booking card */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-start mb-8 md:mb-10">
          {/* Left header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-(--color-bg-soft) px-3 py-1 text-[11px] font-medium text-(--color-text-muted) border border-(--color-border-subtle)">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--color-bg-soft)">
                {service.icon || "🩺"}
              </span>
              {service.label && (
                <span className="text-(--color-text-muted)">
                  {service.label}
                </span>
              )}
              <span
                className={`${accentClasses.chipBg} ${accentClasses.chipText} rounded-full px-2 py-0.5 text-[10px]`}
              >
                {service.careType === "home-based"
                  ? "Home-based care"
                  : "Care service"}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-(--color-text-main)">
              {service.name}
            </h1>

            <p className="text-sm md:text-base text-(--color-text-muted) max-w-2xl">
              {tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
              <div className="inline-flex items-center gap-1 rounded-full bg-(--color-success-100) px-3 py-1 text-(--color-success-500)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-success-500)" />
                Verified NestCare service
              </div>
              <div className="flex items-center gap-2 text-(--color-text-muted)">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--color-bg-soft)">
                  ⭐
                </span>
                <span>Transparent pricing &amp; live booking status</span>
              </div>
            </div>
          </div>

          {/* Right: sticky booking overview */}
          <aside className="md:pl-6">
            <div className="md:sticky md:top-24 rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) shadow-lg shadow-black/5 p-5 md:p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-(--color-text-soft)">
                    Starting from
                  </p>
                  <p className="text-lg font-semibold text-(--color-text-main)">
                    {priceText}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-(--color-primary-50) px-3 py-1 text-[11px] font-medium text-(--color-primary-600)">
                  Duration‑based pricing
                </span>
              </div>

              <p className="text-xs text-(--color-text-muted)">
                Exact total cost is calculated on the booking page based on your
                selected duration and location.
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-(--color-bg-soft) flex items-center justify-center text-[10px] text-(--color-primary-600)">
                    1
                  </span>
                  <p className="text-(--color-text-muted)">
                    Choose duration in hours or days for this service.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-(--color-bg-soft) flex items-center justify-center text-[10px] text-(--color-primary-600)">
                    2
                  </span>
                  <p className="text-(--color-text-muted)">
                    Add your division, district, city, and exact address.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-(--color-bg-soft) flex items-center justify-center text-[10px] text-(--color-primary-600)">
                    3
                  </span>
                  <p className="text-(--color-text-muted)">
                    Review total cost and confirm your booking request.
                  </p>
                </div>
              </div>

              <Link
                href={`/booking/${service.slug}`}
                className="btn btn-md w-full border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
              >
                Book this service
              </Link>

              <p className="text-[11px] text-(--color-text-soft)">
                You&apos;ll sign in or create an account before confirming.
                Bookings start as{" "}
                <span className="font-medium text-(--color-warning-500)">
                  Pending
                </span>{" "}
                and can move to Confirmed, Completed, or Cancelled.
              </p>
            </div>
          </aside>
        </div>

        {/* Main content */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          {/* Left column */}
          <div className="space-y-8">
            {longDescription && (
              <section className="space-y-3">
                <h2 className="text-lg md:text-xl font-semibold text-(--color-text-main)">
                  Service overview
                </h2>
                <p className="text-sm md:text-base text-(--color-text-muted)">
                  {longDescription}
                </p>
              </section>
            )}

            {Array.isArray(service.features) && service.features.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-base md:text-lg font-semibold text-(--color-text-main)">
                  What you can expect
                </h3>
                <ul className="space-y-2 text-sm text-(--color-text-muted)">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-primary-200)" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6 md:pl-6">
            <section className="rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) p-5 space-y-3 text-xs text-(--color-text-muted)">
              <h3 className="text-sm font-semibold text-(--color-text-main)">
                Booking details at a glance
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-bg-soft)" />
                  <span>
                    Duration-based pricing using this service&apos;s base rate
                    and your selected time.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-bg-soft)" />
                  <span>
                    Location-aware booking with division, district, city, and
                    address.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-bg-soft)" />
                  <span>
                    All bookings appear in{" "}
                    <span className="font-medium text-(--color-text-main)">
                      My Bookings
                    </span>{" "}
                    with a clear status and cost summary.
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
