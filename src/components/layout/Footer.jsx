import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand / about */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={"/favicon.ico"}
                alt="Web Logo"
                width={50}
                height={50}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-tight text-slate-950">
                  NestCare
                </span>
                <span className="text-[11px] md:text-xs text-slate-500">
                  Reliable care for your loved ones
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              NestCare connects you with verified caregivers for babies,
              elderly, and sick family members — making home caregiving simple,
              safe, and accessible.
            </p>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wide mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <Link
                  href="/services/baby-care"
                  className="hover:text-blue-600 transition-colors"
                >
                  Baby Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services/elderly-care"
                  className="hover:text-blue-600 transition-colors"
                >
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sick-care"
                  className="hover:text-blue-600 transition-colors"
                >
                  Sick People Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links / contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wide mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About NestCare
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/live-map" className="hover:text-blue-600 transition-colors">
                  Live Network Map
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-blue-600 transition-colors">
                  Help &amp; FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} NestCare. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/terms" className="hover:text-slate-950 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-slate-950 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
