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
              ? "text-teal-600"
              : "text-slate-200"
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
    border-slate-200 bg-white 
    p-6 shadow-sm transition-all 
    duration-200 ease-out hover:-translate-y-1.5 
    hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-950 border border-slate-100 font-bold text-sm">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-950 truncate">
            {testimonial.name}
          </p>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
            {testimonial.role} • {testimonial.location}
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4 line-clamp-4 leading-relaxed">
        {testimonial.text}
      </p>

      <div className="flex items-center justify-between gap-3 text-[11px] pt-4 border-t border-slate-50">
        <StarRating value={testimonial.rating} />
        <span className="rounded-full bg-teal-50 px-2 py-1 text-teal-600 font-bold border border-teal-100">
          Verified
        </span>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  // Duplicate testimonials to create a seamless marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
            Families who trust NestCare.
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed">
            Real experiences from parents and family members who used NestCare
            to arrange baby care, elderly care, and sick care at home.
          </p>
        </div>

        {/* Marquee rows */}
        <div className="relative mt-8">
          {/* linear fades on edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-linear-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-linear-to-l from-white to-transparent z-10" />

          <div className="space-y-6">
            {/* Row 1 */}
            <div className="overflow-hidden">
              <div className="flex gap-6 animate-marquee">
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
              <div className="flex gap-6 animate-marquee-reverse">
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
