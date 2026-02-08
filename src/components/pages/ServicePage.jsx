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
                className="group relative h-full rounded-3xl border border-(--color-border-subtle) bg-(--color-surface) overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 ease-out"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-linear-to-br from-primary/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative p-6 md:p-8 flex flex-col h-full space-y-6">
                  {/* Top: Icon & Badges */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-(--color-bg-soft) flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                      {service.icon || "🩺"}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${accentClasses.pillBg} ${accentClasses.pillText}`}>
                        {service.careType === "home-based" ? "Home Based" : "Care Service"}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                        {service.label || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-(--color-text-main) group-hover:text-primary transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-[10px] font-mono text-(--color-text-soft) opacity-60">
                      ID: {service.slug}
                    </p>
                    <p className="text-sm text-(--color-text-muted) leading-relaxed">
                      {tagline}
                    </p>
                  </div>

                  {/* Features */}
                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <ul className="grid grid-cols-1 gap-2 pt-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-(--color-text-soft)">
                          <div className="w-1 h-1 rounded-full bg-primary/40" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Price & Action */}
                  <div className="mt-auto pt-6 border-t border-(--color-border-subtle) flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-(--color-text-soft) mb-1">Starting Rate</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-primary">
                          {service.pricing?.currency === "BDT" ? "৳" : "$"}
                          {Number(service.pricing?.baseRate || 0).toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-(--color-text-soft)">/{service.pricing?.unit || "hr"}</span>
                      </div>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn btn-sm btn-primary rounded-xl font-bold px-4"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
