"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    slug: "baby-care",
    name: "Baby Care",
    icon: "👶",
    shortDescription:
      "Gentle, attentive care for infants and young children in the comfort of your home.",
    points: ["Part-time or full-day support", "Safe playtime & feeding", "Flexible scheduling"],
    tagBg: "bg-(--color-primary-50)",
    tagText: "text-(--color-primary-600)",
  },
  {
    slug: "elderly-care",
    name: "Elderly Care",
    icon: "👵",
    shortDescription:
      "Supportive home care for seniors, focused on dignity, safety, and companionship.",
    points: ["Medication reminders", "Daily routine assistance", "Companionship at home"],
    tagBg: "bg-(--color-secondary-50)",
    tagText: "text-(--color-secondary-600)",
  },
  {
    slug: "sick-care",
    name: "Sick People Care",
    icon: "🏥",
    shortDescription:
      "Extra help for family members recovering from illness or needing special attention.",
    points: ["Monitoring & basic support", "Help with meals & rest", "Short-term and ongoing care"],
    tagBg: "bg-(--color-accent-50)",
    tagText: "text-(--color-accent-500)",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ServicesSection() {
  return (
    <section className="border-b border-(--color-border-subtle) bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
              Our services
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-(--color-text-main)">
              One platform for every type of home care.
            </h2>
            <p className="text-sm md:text-base text-(--color-text-muted)">
              Choose the care your family needs — from babysitting to elderly and special
              sick care — and book directly based on time and location.
            </p>
          </div>

          <div className="flex md:justify-end">
            <Link
              href="/services"
              className="btn btn-sm md:btn-md btn-ghost text-(--color-text-muted) hover:bg-(--color-bg-soft)"
            >
              View all services
            </Link>
          </div>
        </motion.div>

        {/* Service cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <motion.article
              key={service.slug}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(15,23,42,0.10)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group h-full rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 md:p-6 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-4">
                {/* Icon + label */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-bg-soft) text-lg">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-(--color-text-main)">
                        {service.name}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-(--color-text-soft)">
                        Home-based support
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex text-center items-center rounded-full px-3 py-1 text-[11px] font-medium ${service.tagBg} ${service.tagText}`}
                  >
                    Trusted care
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-(--color-text-muted)">
                  {service.shortDescription}
                </p>

                {/* Bulleted highlights */}
                <ul className="space-y-1.5 text-xs">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-(--color-primary-200)" />
                      <span className="text-(--color-text-muted)">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action */}
              <div className="pt-4 mt-4 border-t border-(--color-border-subtle) flex items-center justify-between">
                <div className="text-[11px] text-(--color-text-soft)">
                  Duration-based pricing • Live booking status
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}