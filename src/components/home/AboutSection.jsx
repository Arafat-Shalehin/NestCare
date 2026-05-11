export default function AboutSection() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          {/* Left: concise mission */}
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Our mission
            </p>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
              A simple, safe way to book trusted home care.
            </h2>

            <p className="text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
              NestCare is built to help families quickly arrange reliable care
              for children, elderly parents, and sick family members — without
              phone calls, guesswork, or uncertainty.
            </p>

            <div className="grid gap-8 sm:grid-cols-3 pt-6">
              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-950 border border-slate-100 shadow-sm">
                  👨‍👩‍👧
                </div>
                <h3 className="text-sm font-bold text-slate-950">
                  For every family
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Baby sitting, elderly support, and sick care — all in one
                  platform.
                </p>
              </div>

              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-950 border border-slate-100 shadow-sm">
                  📍
                </div>
                <h3 className="text-sm font-bold text-slate-950">
                  Location‑aware
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Book care based on your division, district, city, and exact
                  address.
                </p>
              </div>

              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-950 border border-slate-100 shadow-sm">
                  💳
                </div>
                <h3 className="text-sm font-bold text-slate-950">
                  Clear pricing
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  See total cost calculated from duration and service charge
                  before you confirm.
                </p>
              </div>
            </div>
          </div>

          {/* Right: subtle snapshot card */}
          <div className="md:pl-12">
            <div className="relative">
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-slate-50 blur-3xl opacity-50" />

              <div className="relative rounded-2xl bg-slate-50 border border-slate-200 shadow-md p-8 md:p-10 space-y-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Platform snapshot
                    </p>
                    <p className="text-sm font-bold text-slate-950 mt-1">
                      Designed for safety & transparency.
                    </p>
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-blue-600 border border-blue-100">
                    Live booking status
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-slate-950">
                      3
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Care types
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-slate-950">
                      100%
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Online
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-slate-950">
                      24/7
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Access
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 h-5 w-5 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-teal-50 text-teal-600 text-[10px] font-bold border border-teal-100">
                      ✓
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Simple booking flow with duration, location, and pricing
                      in a single, clear interface.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 h-5 w-5 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-teal-50 text-teal-600 text-[10px] font-bold border border-teal-100">
                      ✓
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Real‑time booking status: Pending, Confirmed, Completed,
                      or Cancelled — always visible to you.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed italic border-t border-slate-200 pt-6">
                  NestCare focuses on what matters: safe caregivers, clear
                  information, and a booking process that respects your time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
