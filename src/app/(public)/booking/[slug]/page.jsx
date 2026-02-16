import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";
import { getServiceBySlug } from "@/actions/server/services";

// Important: in Next 13.5+ / 14, params is a Promise in generateMetadata
export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

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
    title: `Book ${service.name} – NestCare`,
    description: `Book ${service.name} with clear duration, location, and pricing. ${tagline}`,
  };
}

export default async function BookingPage(props) {
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

  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-(--color-text-soft)">
          <Link href="/" className="hover:text-(--color-text-main)">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-(--color-text-main)">
            Services
          </Link>
          <span>/</span>
          <Link
            href={`/services/${service.slug}`}
            className="hover:text-(--color-text-main)"
          >
            {service.name}
          </Link>
          <span>/</span>
          <span className="text-(--color-text-muted)">Book</span>
        </div>

        {/* Header summary */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-(--color-surface) px-3 py-1 text-[11px] font-medium text-(--color-text-muted) border border-(--color-border-subtle)">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--color-bg-soft)">
              {service.icon || "🩺"}
            </span>
            <span>{service.name}</span>
            <span className="h-1 w-1 rounded-full bg-(--color-border-strong)" />
            <span>Booking request</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-(--color-text-main)">
            Book {service.name}
          </h1>
          <p className="text-sm md:text-base text-(--color-text-muted) max-w-2xl">
            {tagline} Follow the steps below to select your duration, add your
            location, and review the estimated total before confirming your
            request.
          </p>
        </div>

        {/* Booking form + summary */}
        <BookingForm service={service} />
      </div>
    </section>
  );
}
