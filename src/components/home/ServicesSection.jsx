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
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Our services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
              One platform for every type of home care.
            </h2>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed">
              Choose the care your family needs — from babysitting to elderly and special
              sick care — and book directly based on time and location.
            </p>
          </div>

          <div className="flex md:justify-end">
            <Link
              href="/services"
              className="btn btn-ghost text-slate-500 hover:bg-slate-100 hover:text-slate-950 rounded-xl font-bold transition-all duration-200 ease-out"
            >
              View all services
            </Link>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group h-full rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 ease-out cursor-pointer"
            >
              <div className="space-y-6">
                {/* Icon + label */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl border border-slate-100 shadow-sm">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">
                        {service.name}
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                        Home support
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Bulleted highlights */}
                <ul className="space-y-3 text-sm">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                      <span className="text-slate-600 font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action */}
              <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Live booking status
                </div>
                <span className="text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform duration-200">
                  Book now →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}