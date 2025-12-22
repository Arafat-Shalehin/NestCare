import Link from "next/link";
import { notFound } from "next/navigation";

const SERVICES = {
  "baby-care": {
    id: "baby-care",
    name: "Baby Care",
    tagline:
      "Gentle, attentive support for infants and young children at home.",
    categoryLabel: "Child care",
    basePriceText: "From ৳ 400 / hour",
    pricingNote:
      "Final cost is calculated automatically during booking based on your selected duration and location.",
    overview: [
      "NestCare Baby Care is designed for parents who need safe, short‑term or ongoing support caring for their children at home.",
      "Caregivers can help with feeding, supervised play, nap routines, and light child‑related tasks, so you can step away with confidence.",
    ],
    includes: [
      "Age‑appropriate supervision and engagement",
      "Support with feeding, snacks, and hydration",
      "Nap routines and bedtime support based on your guidance",
      "Basic hygiene support (diaper changes, hand washing, etc.)",
    ],
    suitableFor: [
      "Infants and toddlers who require close supervision",
      "Working parents who need reliable support at home",
      "Occasional date nights or events",
    ],
    durations: [
      "By the hour",
      "Half‑day or full‑day",
      "Recurring weekly bookings",
    ],
    accentBg: "bg-(--color-primary-50)",
    accentText: "text-(--color-primary-600)",
  },
  "elderly-care": {
    id: "elderly-care",
    name: "Elderly Care",
    tagline: "Respectful, home‑based support for seniors and aging parents.",
    categoryLabel: "Senior care",
    basePriceText: "From ৳ 450 / hour",
    pricingNote:
      "Your exact cost depends on the total duration and your location. The platform calculates this for you before you confirm.",
    overview: [
      "NestCare Elderly Care supports seniors with daily routines while helping them stay safe and comfortable at home.",
      "Caregivers can assist with movement, meals, medication reminders, and companionship, based on your family’s needs.",
    ],
    includes: [
      "Companionship and conversation",
      "Light assistance with mobility and daily routines",
      "Medication reminders (as instructed by family)",
      "Support with meals, hydration, and general supervision",
    ],
    suitableFor: [
      "Elderly parents living alone or with family",
      "Families who need extra support during work hours",
      "Short‑term or ongoing elderly care at home",
    ],
    durations: [
      "By the hour",
      "Day‑time blocks",
      "Flexible recurring schedules",
    ],
    accentBg: "bg-(--color-secondary-50)",
    accentText: "text-(--color-secondary-600)",
  },
  "sick-care": {
    id: "sick-care",
    name: "Sick People Care",
    tagline:
      "Extra support for family members recovering or needing close attention.",
    categoryLabel: "Recovery & special care",
    basePriceText: "From ৳ 500 / hour",
    pricingNote:
      "Complex care needs may require custom pricing. Standard bookings are calculated instantly from duration and location.",
    overview: [
      "NestCare Sick People Care is built for non‑emergency support when a family member is ill or recovering at home.",
      "Caregivers can help monitor basic comfort, assist with movement, and provide practical support according to your instructions.",
    ],
    includes: [
      "Regular check‑ins on comfort and rest",
      "Light assistance with movement around the home",
      "Support with meals, fluids, and basic routines",
      "Coordination with family members for updates",
    ],
    suitableFor: [
      "Short‑term recovery after minor procedures (non‑critical)",
      "Family members who need extra support during illness at home",
      "Situations where hospital care is not required but help is needed",
    ],
    durations: [
      "Short‑term blocks",
      "Full‑day sessions",
      "Flexible arrangements",
    ],
    accentBg: "bg-(--color-accent-50)",
    accentText: "text-(--color-accent-500)",
  },
};

export async function generateMetadata({ params }) {
  const service = SERVICES[params.serviceId];

  if (!service) {
    return {
      title: "Service not found – NestCare",
    };
  }

  return {
    title: `${service.name} – NestCare`,
    description: service.tagline,
  };
}

export default function ServiceDetailPage({ params }) {
  const service = SERVICES[params.serviceId];

  if (!service) {
    return notFound();
  }

  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Breadcrumb + badge */}
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

        {/* Header */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-start mb-8 md:mb-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-(--color-bg-soft) px-3 py-1 text-[11px] font-medium text-(--color-text-muted) border border-(--color-border-subtle)">
              <span
                className={
                  service.accentBg +
                  " rounded-full px-2 py-0.5 text-[10px] " +
                  service.accentText
                }
              >
                {service.categoryLabel}
              </span>
              <span>Part of NestCare home services</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-(--color-text-main)">
              {service.name}
            </h1>

            <p className="text-sm md:text-base text-(--color-text-muted) max-w-2xl">
              {service.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
              <div className="inline-flex items-center gap-1 rounded-full bg-(--color-success-100) px-3 py-1 text-(--color-success-500)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-success-500)" />
                Verified home care service
              </div>
              <div className="flex items-center gap-2 text-(--color-text-muted)">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--color-bg-soft)">
                  ⭐
                </span>
                <span>Highly rated by NestCare families</span>
              </div>
            </div>
          </div>

          {/* Sticky booking summary */}
          <aside className="md:pl-6">
            <div className="md:sticky md:top-24 rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) shadow-lg shadow-black/5 p-5 md:p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-(--color-text-soft)">
                    Starting from
                  </p>
                  <p className="text-lg font-semibold text-(--color-text-main)">
                    {service.basePriceText}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-(--color-primary-50) px-3 py-1 text-[11px] font-medium text-(--color-primary-600)">
                  Duration‑based pricing
                </span>
              </div>

              <p className="text-xs text-(--color-text-muted)">
                {service.pricingNote}
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-(--color-bg-soft) flex items-center justify-center text-[10px] text-(--color-primary-600)">
                    1
                  </span>
                  <p className="text-(--color-text-muted)">
                    Choose your duration (hours or days) on the booking page.
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
                href={`/booking/${service.id}`}
                className="btn btn-md w-full border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
              >
                Book this service
              </Link>

              <p className="text-[11px] text-(--color-text-soft)">
                You’ll be asked to sign in or create an account before
                confirming your booking. Your booking will start as{" "}
                <span className="font-medium text-(--color-warning-500)">
                  Pending
                </span>{" "}
                and can be updated to Confirmed or Completed.
              </p>
            </div>
          </aside>
        </div>

        {/* Main content */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          {/* Left column: details */}
          <div className="space-y-8">
            {/* Overview */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-(--color-text-main)">
                Service overview
              </h2>
              <div className="space-y-3 text-sm md:text-base text-(--color-text-muted)">
                {service.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* What’s included */}
            <section className="space-y-3">
              <h3 className="text-base md:text-lg font-semibold text-(--color-text-main)">
                What&apos;s included
              </h3>
              <ul className="space-y-2 text-sm text-(--color-text-muted)">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-primary-200)" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Suitable for */}
            <section className="space-y-3">
              <h3 className="text-base md:text-lg font-semibold text-(--color-text-main)">
                Who this service is ideal for
              </h3>
              <ul className="space-y-2 text-sm text-(--color-text-muted)">
                {service.suitableFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-secondary-200)" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right column: quick facts */}
          <div className="space-y-6 md:pl-6">
            <section className="rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) p-5 space-y-3">
              <h3 className="text-sm font-semibold text-(--color-text-main)">
                Recommended durations
              </h3>
              <ul className="space-y-2 text-xs text-(--color-text-muted)">
                {service.durations.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-accent-200)" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-(--color-bg-soft) border border-(--color-border-subtle) p-5 space-y-3 text-xs text-(--color-text-muted)">
              <h3 className="text-sm font-semibold text-(--color-text-main)">
                Safety & platform details
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-success-200)" />
                  <span>
                    All bookings are tracked within your NestCare account under{" "}
                    <span className="font-medium text-(--color-text-main)">
                      My Bookings
                    </span>
                    .
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-info-200)" />
                  <span>
                    Each booking has a clear status: Pending, Confirmed,
                    Completed, or Cancelled.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-bg-soft)" />
                  <span>
                    You will receive a booking summary and invoice by email
                    after each confirmed booking.
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
