const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Working parent",
    location: "Dhaka",
    text: "NestCare made it easy to arrange verified babysitting on busy weekdays. The booking flow is clear and I always know the status of each request.",
    rating: 5,
  },
  {
    name: "Abdul Karim",
    role: "Son & caregiver",
    location: "Chattogram",
    text: "The elderly care service helped my father stay comfortable at home. I appreciated the clear pricing and the ability to cancel if our plans changed.",
    rating: 5,
  },
  {
    name: "Nadia Islam",
    role: "New mother",
    location: "Sylhet",
    text: "Being able to book a trusted caregiver for a few hours gave me time to rest. The platform feels safe and very easy to use.",
    rating: 4,
  },
  {
    name: "Rahim Uddin",
    role: "Older brother",
    location: "Khulna",
    text: "We used NestCare for sick care after a minor surgery at home. Communication was smooth and everything was handled professionally.",
    rating: 5,
  },
  {
    name: "Mariam Hasan",
    role: "Parent of two",
    location: "Rajshahi",
    text: "I like seeing the total cost before confirming a booking. The combination of baby and elderly care services in one place is very helpful.",
    rating: 4,
  },
  {
    name: "Imran Chowdhury",
    role: "Frequent traveler",
    location: "Barishal",
    text: "When I travel for work, NestCare gives me peace of mind knowing I can arrange support at home quickly if needed.",
    rating: 5,
  },
  {
    name: "Farzana Akter",
    role: "Office professional",
    location: "Dhaka",
    text: "Managing work and family became easier with NestCare. The caregivers arrived on time and were very respectful.",
    rating: 5,
  },
  {
    name: "Mahmud Hossain",
    role: "Caregiver coordinator",
    location: "Gazipur",
    text: "The ability to track booking status and communicate clearly with caregivers makes NestCare reliable for our family.",
    rating: 4,
  },
  {
    name: "Sabrina Rahman",
    role: "Single parent",
    location: "Narayanganj",
    text: "Finding trusted help was always stressful before. NestCare’s verification system gave me confidence right away.",
    rating: 5,
  },
  {
    name: "Anisur Rahman",
    role: "Retired government officer",
    location: "Cumilla",
    text: "The caregiver assigned to us was polite and attentive. My wife felt comfortable throughout the service.",
    rating: 4,
  },
  {
    name: "Tasnim Jahan",
    role: "Graduate student",
    location: "Mymensingh",
    text: "I booked short-term elderly care for my grandmother during exams. The process was fast and hassle-free.",
    rating: 5,
  },
  {
    name: "Shafiq Ahmed",
    role: "Small business owner",
    location: "Bogura",
    text: "Clear service descriptions and fair pricing made it easy to choose the right care option for my family.",
    rating: 4,
  },
  {
    name: "Nusrat Khan",
    role: "Stay-at-home mother",
    location: "Rangpur",
    text: "Having access to both babysitting and sick care services on one platform saves a lot of time.",
    rating: 5,
  },
  {
    name: "Kamal Uddin",
    role: "Family caregiver",
    location: "Noakhali",
    text: "Customer support was responsive and helpful when we needed to reschedule a booking at short notice.",
    rating: 4,
  },
  {
    name: "Ayesha Siddika",
    role: "First-time parent",
    location: "Pabna",
    text: "As a new parent, safety was my top concern. NestCare’s system and caregivers felt trustworthy from the start.",
    rating: 5,
  },
];

function StarRating({ value }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-0.5 text-[11px]">
      {stars.map((star) => (
        <span
          key={star}
          className={
            star <= value
              ? "text-(--color-accent-500)"
              : "text-(--color-border-strong)"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <article
      className="group min-w-65 max-w-xs 
    shrink-0 rounded-2xl border 
    border-(--color-border-subtle) bg-(--color-surface) 
    p-4 md:p-5 shadow-sm transition-transform 
    duration-300 ease-out hover:-translate-y-1.5 
    hover:border-(--color-primary-200)"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary-50) text-(--color-primary-600) text-sm font-semibold">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-(--color-text-main) truncate">
            {testimonial.name}
          </p>
          <p className="text-[11px] text-(--color-text-muted) truncate">
            {testimonial.role} • {testimonial.location}
          </p>
        </div>
      </div>

      <p className="text-xs md:text-sm text-(--color-text-muted) mb-3 line-clamp-4">
        {testimonial.text}
      </p>

      <div className="flex items-center justify-between gap-3 text-[11px]">
        <StarRating value={testimonial.rating} />
        <span className="rounded-full bg-(--color-bg-soft) px-2 py-1 text-(--color-text-soft)">
          Verified booking
        </span>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  // Duplicate testimonials to create a seamless marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="border-b border-(--color-border-subtle) bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 space-y-8">
        {/* Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
            Testimonials
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-(--color-text-main)">
            Families who trust NestCare.
          </h2>
          <p className="text-sm md:text-base text-(--color-text-muted)">
            Real experiences from parents and family members who used NestCare
            to arrange baby care, elderly care, and sick care at home.
          </p>
        </div>

        {/* Marquee rows */}
        <div className="relative mt-4">
          {/* linear fades on edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 bg-linear-to-r from-(--color-bg-base) to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 bg-linear-to-l from-(--color-bg-base) to-transparent" />

          <div className="space-y-4">
            {/* Row 1 */}
            <div className="overflow-hidden">
              <div className="flex gap-4 md:gap-6 animate-marquee">
                {marqueeItems.map((t, index) => (
                  <TestimonialCard
                    key={`row1-${index}-${t.name}`}
                    testimonial={t}
                  />
                ))}
              </div>
            </div>

            {/* Row 2 (reverse direction, hidden on very small screens) */}
            <div className="hidden sm:block overflow-hidden">
              <div className="flex gap-4 md:gap-6 animate-marquee-reverse">
                {marqueeItems
                  .slice()
                  .reverse()
                  .map((t, index) => (
                    <TestimonialCard
                      key={`row2-${index}-${t.name}`}
                      testimonial={t}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
