import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-(--color-border-subtle) bg-(--color-surface) mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand / about */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={"/favicon.ico"}
                alt="Web Logo"
                width={50}
                height={50}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight text-(--color-text-main)">
                  NestCare
                </span>
                <span className="text-[11px] md:text-xs text-(--color-text-muted)">
                  Reliable care for your loved ones
                </span>
              </div>
            </div>
            <p className="text-sm text-(--color-text-muted) max-w-md">
              NestCare connects you with verified caregivers for babies,
              elderly, and sick family members — making home caregiving simple,
              safe, and accessible.
            </p>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-sm font-semibold text-(--color-text-main) mb-3">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-(--color-text-muted)">
              <li>
                <Link
                  href="/services/baby-care"
                  className="hover:text-(--color-text-main)"
                >
                  Baby Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services/elderly-care"
                  className="hover:text-(--color-text-main)"
                >
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sick-care"
                  className="hover:text-(--color-text-main)"
                >
                  Sick People Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links / contact */}
          <div>
            <h3 className="text-sm font-semibold text-(--color-text-main) mb-3">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-(--color-text-muted)">
              <li>
                <Link href="/about" className="hover:text-(--color-text-main)">
                  About NestCare
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-(--color-text-main)"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-(--color-text-main)">
                  Help &amp; FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-(--color-border-subtle) pt-4">
          <p className="text-xs text-(--color-text-soft)">
            © {new Date().getFullYear()} NestCare. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-(--color-text-soft)">
            <Link href="/terms" className="hover:text-(--color-text-main)">
              Terms
            </Link>
            <span className="h-1 w-1 rounded-full bg-(--color-border-strong)" />
            <Link href="/privacy" className="hover:text-(--color-text-main)">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
