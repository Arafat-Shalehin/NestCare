"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/find-match", label: "Find My Match" },
  { href: "/live-map", label: "Live Map" },
  { href: "/about", label: "About" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;
  // console.log(user);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const getInitials = (name, email) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    if (email) return email[0].toUpperCase();
    return "N";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border-subtle) bg-(--color-surface)/80 backdrop-blur">
      <nav className="navbar max-w-7xl mx-auto px-4">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src={"/favicon.ico"}
              alt="Web Logo"
              width={50}
              height={50}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base md:text-lg font-semibold tracking-tight text-(--color-text-main)">
                NestCare
              </span>
              <span className="text-[11px] md:text-xs text-(--color-text-muted)">
                Trusted care, right at home
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6 mr-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${isActive(link.href)
                  ? "text-(--color-primary-600)"
                  : "text-(--color-text-muted) hover:text-(--color-text-main)"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth actions (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {status === "loading" && (
            <div className="h-9 w-9 rounded-full bg-(--color-bg-soft) animate-pulse" />
          )}

          {status === "authenticated" && user && (
            <div className="flex items-center gap-3">
              {/* User dropdown */}
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 rounded-full bg-(--color-primary-600) text-(--color-text-invert) flex items-center justify-center text-xs font-semibold">
                    {getInitials(user?.name, user?.email)}
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-(--color-surface) p-2 shadow-lg border border-(--color-border-subtle)"
                >
                  <li className="py-2 border-b border-(--color-border-subtle) mb-1">
                    <p className="text-sm font-semibold text-(--color-text-main)">
                      Name: {user.name || "Account"}
                    </p>
                    <p className="text-[11px] text-(--color-text-soft) truncate">
                      Email: {user.email}
                    </p>
                  </li>
                  {/* You can add /profile later */}
                  <li>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-(--color-error-500)"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {status !== "authenticated" && (
            <>
              <Link
                href="/login"
                className="btn btn-outline btn-sm text-(--color-text-muted) hover:bg-(--color-bg-soft)"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="btn btn-sm border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
          {/* <Link
            href="/login"
            className="btn btn-outline btn-sm text-(--color-text-muted) hover:bg-(--color-bg-soft)"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="btn btn-sm border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
          >
            Get Started
          </Link> */}
        </div>

        {/* Mobile: Menu button */}
        <div className="md:hidden flex-none">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-square btn-sm"
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-(--color-text-main)"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.6"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-(--color-surface) p-2 shadow-lg border border-(--color-border-subtle)"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href) ? "text-(--color-primary-600)" : ""
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <div className="divider my-2" />
              {status === "authenticated" && user ? (
                <>
                  <li className="py-2 border-b border-(--color-border-subtle) mb-1">
                    <p className="text-sm font-semibold text-(--color-text-main)">
                      Name: {user.name || "Account"}
                    </p>
                    <p className="text-[11px] text-(--color-text-soft) truncate">
                      Email: {user.email}
                    </p>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-(--color-error-500)"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Log in</Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="font-medium text-(--color-primary-600)"
                    >
                      Get Started
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
