import { getServices } from "@/actions/server/services";
import Link from "next/link";

function getAccentClasses(accent) {
  switch (accent) {
    case "secondary":
      return {
        pillBg: "bg-(--color-secondary-50)",
        pillText: "text-(--color-secondary-600)",
      };
    case "accent":
      return {
        pillBg: "bg-(--color-accent-50)",
        pillText: "text-(--color-accent-500)",
      };
    case "primary":
    default:
      return {
        pillBg: "bg-(--color-primary-50)",
        pillText: "text-(--color-primary-600)",
      };
  }
}

export const metadata = {
  title: "Services – NestCare",
  description:
    "Explore NestCare services for baby care, elderly care, and sick care at home. Book trusted caregivers with clear pricing and live booking status.",
};

export default async function ServicesPage() {
  const services = await getServices(); 

  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20 space-y-12 md:space-y-16">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
            Services
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-(--color-text-main)">
            Choose the right NestCare service for your family.
          </h1>
          <p className="text-sm md:text-base text-(--color-text-muted)">
            All services follow the same clear steps: select duration, add your
            location, review automatic pricing, and confirm your booking
            request.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 md:gap-7 md:grid-cols-3">
          {services.map((service) => {
            const accentClasses = getAccentClasses(service.pricing?.accent);
            const descriptions = service.descriptions || {};
            const tagline =
              descriptions.tagline ||
              descriptions.short ||
              `Home-based ${service.label || "care"} service.`;

            return (
              <article
                key={service._id}
                className="group h-full rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 md:p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 transition-transform duration-300 ease-out"
              >
                <div className="space-y-4">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-bg-soft) text-lg">
                        {service.icon || "🩺"}
                      </div>
                      <h2 className="text-base md:text-lg font-semibold text-(--color-text-main)">
                        {service.name}
                      </h2>
                      {service.label && (
                        <p className="text-[11px] uppercase tracking-[0.16em] text-(--color-text-soft)">
                          {service.label}
                        </p>
                      )}
                    </div>
                    <span
                      className={`inline-flex text-center items-center rounded-full px-3 py-1 text-[11px] font-medium ${accentClasses.pillBg} ${accentClasses.pillText}`}
                    >
                      {service.careType === "home-based"
                        ? "Home-based care"
                        : "Care service"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-(--color-text-muted)">{tagline}</p>

                  {/* Features */}
                  {Array.isArray(service.features) &&
                    service.features.length > 0 && (
                      <ul className="space-y-1.5 text-xs pt-1">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-primary-200)" />
                            <span className="text-(--color-text-muted)">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                  {/* Pricing */}
                  {service.pricing && (
                    <p className="text-xs text-(--color-text-soft) pt-1">
                      Starting from{" "}
                      <span className="font-medium text-(--color-text-main)">
                        {service.pricing.currency === "BDT"
                          ? "৳"
                          : service.pricing.currency}{" "}
                        {Number(service.pricing.baseRate || 0).toLocaleString(
                          "en-BD"
                        )}{" "}
                        / {service.pricing.unit || "hour"}
                      </span>
                    </p>
                  )}
                </div>

                {/* Bottom row */}
                <div className="pt-4 mt-4 border-t border-(--color-border-subtle) flex items-center justify-between">
                  <p className="text-[11px] text-(--color-text-soft)">
                    Duration-based pricing • Live status tracking
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-medium text-(--color-primary-600) group-hover:text-(--color-primary-700) inline-flex items-center gap-1"
                  >
                    View details
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
