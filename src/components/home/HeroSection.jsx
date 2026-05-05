"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-slate-200 bg-linear-to-b from-slate-50 to-white">
      {/* --- Animated Gradient Mesh Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Blob 1: Soft Blue */}
        <motion.div
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.4, 0.8, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-[35rem] h-[35rem] bg-blue-200/30 rounded-full blur-[120px]"
        />

        {/* Blob 2: Soft Teal */}
        <motion.div
          animate={{
            x: [0, -120, 150, 0],
            y: [0, 150, -80, 0],
            scale: [1, 1.2, 1.3, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -right-48 w-[40rem] h-[40rem] bg-teal-100/40 rounded-full blur-[140px]"
        />

        {/* Blob 3: Subtle Slate/Navy */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-20%] left-1/3 w-[30rem] h-[30rem] bg-slate-200/50 rounded-full blur-[100px]"
        />

        {/* Blob 4: Deep Blue Accent (Very subtle) */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-[150px]"
        />
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm mx-auto">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600 text-xs font-bold">
              ✓
            </span>
            <span>Trusted by 5,000+ families nationwide</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.05] max-w-4xl mx-auto">
            Trusted home care when <br />
            <span className="text-blue-600">family</span> needs it most.
          </h1>

          {/* Sub text */}
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Book reliable caregivers for your children, elderly parents, or
            sick family members — right at home, on your schedule.
            Safe, verified, and accessible care for every home.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/services"
              className="btn btn-lg h-14 border-none bg-slate-950 text-white 
              hover:bg-slate-800 rounded-xl shadow-lg px-10 transition-all 
              duration-200 ease-out hover:scale-105"
            >
              Book a Caregiver
            </Link>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Link
                href="/find-match"
                className="btn btn-lg h-14 bg-blue-600 text-white border-none hover:bg-blue-500 rounded-xl shadow-lg px-10 transition-all duration-200 ease-out w-full sm:w-auto"
              >
                ✨ Find My Match
              </Link>
            </motion.div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <span className="text-teal-600 text-lg">★</span> 4.9 Rating
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <span className="text-blue-600 text-lg">🛡</span> Verified
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <span className="text-slate-900 text-lg">⌚</span> 24/7 Support
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
