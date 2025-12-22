"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    id: "baby-care",
    name: "Baby Care",
    icon: "👶",
    label: "Child care",
    tagline: "Gentle, attentive support for infants and young children at home.",
    summary:
      "Ideal for parents who need trusted help with feeding, nap routines, playtime, and supervision.",
    bullets: ["Flexible hourly or daily bookings", "Home-based, family-aligned routines"],
    accentBg: "bg-(--color-primary-50)",
    accentText: "text-(--color-primary-600)",
  },
  {
    id: "elderly-care",
    name: "Elderly Care",
    icon: "👵",
    label: "Senior care",
    tagline: "Respectful, home-based assistance for seniors and aging parents.",
    summary:
      "Support with daily routines, light mobility assistance, companionship, and medication reminders.",
    bullets: ["Family updates and coordination", "Designed to maintain dignity and independence"],
    accentBg: "bg-(--color-secondary-50)",
    accentText: "text-(--color-secondary-600)",
  },
  {
    id: "sick-care",
    name: "Sick People Care",
    icon: "🏥",
    label: "Recovery & support",
    tagline: "Extra help for family members recovering or needing close attention.",
    summary:
      "Non-emergency assistance with comfort, meals, movement, and check-ins during recovery at home.",
    bullets: ["Short-term or extended support", "Clear boundaries for non-medical care"],
    accentBg: "bg-(--color-accent-50)",
    accentText: "text-(--color-accent-500)",
  },
];

const benefits = [
  {
    title: "Simple, guided bookings",
    description:
      "Each service follows the same clear steps: choose duration, set your location, review pricing, and confirm.",
    icon: "🧭",
  },
  {
    title: "Clear status tracking",
    description:
      "Every booking shows a live status: Pending, Confirmed, Completed, or Cancelled — visible at any time in My Bookings.",
    icon: "📡",
  },
  {
    title: "Transparent pricing",
    description:
      "Total cost is calculated automatically from service charge × duration before you confirm your request.",
    icon: "💰",
  },
  {
    title: "Secure and account-based",
    description:
      "Use email or Google login so your bookings, invoices, and history stay organized and accessible.",
    icon: "🔒",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardsVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ServicesPage() {
  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20 space-y-12 md:space-y-16">
        {/* Top: Services header */}
        <motion.div
          className="space-y-3 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
            Services
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-(--color-text-main)">
            Choose the right NestCare service for your family.
          </h1>
          <p className="text-sm md:text-base text-(--color-text-muted)">
            All services share the same simple structure: clear duration selection,
            location details, and automatic total cost calculation before you confirm a
            booking.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid gap-6 md:gap-7 md:grid-cols-3"
          variants={cardsVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(15,23,42,0.10)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group h-full rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 md:p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-bg-soft) text-lg">
                      {service.icon}
                    </div>
                    <h2 className="text-base md:text-lg font-semibold text-(--color-text-main)">
                      {service.name}
                    </h2>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-(--color-text-soft)">
                      {service.label}
                    </p>
                  </div>
                  <span
                    className={`inline-flex text-center items-center rounded-full px-3 py-1 text-[11px] font-medium ${service.accentBg} ${service.accentText}`}
                  >
                    Home-based care
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-(--color-text-muted)">{service.tagline}</p>
                <p className="text-xs text-(--color-text-muted)">{service.summary}</p>

                <ul className="space-y-1.5 text-xs pt-1">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-primary-200)" />
                      <span className="text-(--color-text-muted)">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-4 mt-4 border-t border-(--color-border-subtle) flex items-center justify-between">
                <p className="text-[11px] text-(--color-text-soft)">
                  Duration-based pricing • Live status tracking
                </p>
                <Link
                  href={`/services/${service.id}`}
                  className="text-xs font-medium text-(--color-primary-600) group-hover:text-(--color-primary-700) inline-flex items-center gap-1"
                >
                  View details
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Benefits section */}
        <section className="rounded-3xl border border-(--color-border-subtle) bg-(--color-surface) px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10 mb-6 md:mb-8">
            <div className="space-y-3 max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
                Why book with NestCare
              </p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-(--color-text-main)">
                Benefits of choosing NestCare for your home care services.
              </h2>
              <p className="text-sm md:text-base text-(--color-text-muted)">
                Every service on NestCare is built around trust, clarity, and control —
                so you always know who is coming, how long they stay, and what it will
                cost.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center text-xs text-(--color-text-soft) max-w-xs">
              <div className="rounded-2xl bg-(--color-bg-soft) px-4 py-3">
                <p className="text-lg font-semibold text-(--color-text-main)">24/7</p>
                <p>Access to your bookings</p>
              </div>
              <div className="rounded-2xl bg-(--color-bg-soft) px-4 py-3">
                <p className="text-lg font-semibold text-(--color-text-main)">100%</p>
                <p>Online and trackable</p>
              </div>
              <div className="rounded-2xl bg-(--color-bg-soft) px-4 py-3">
                <p className="text-lg font-semibold text-(--color-text-main)">3</p>
                <p>Main care categories</p>
              </div>
              <div className="rounded-2xl bg-(--color-bg-soft) px-4 py-3">
                <p className="text-lg font-semibold text-(--color-text-main)">1</p>
                <p>Unified booking flow</p>
              </div>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-(--color-border-subtle) bg-(--color-bg-base) p-4 md:p-5 space-y-2"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-bg-soft) text-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-sm font-semibold text-(--color-text-main)">
                  {benefit.title}
                </h3>
                <p className="text-xs text-(--color-text-muted)">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}