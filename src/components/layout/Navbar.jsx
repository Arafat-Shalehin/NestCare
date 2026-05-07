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
  { href: "/users/my-bookings", label: "My Bookings" },
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
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
              <span className="text-base md:text-lg font-bold tracking-tight text-slate-950">
                NestCare
              </span>
              <span className="text-[11px] md:text-xs text-slate-500">
                Trusted care, right at home
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Nav links (desktop) */}
        <div className="hidden lg:flex items-center gap-6 mr-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-200 ease-out ${isActive(link.href)
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-950"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth actions (desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-9 w-24 rounded-xl bg-slate-100 animate-pulse" />
          ) : (
            <>
              {status === "authenticated" && user ? (
                <div className="flex items-center gap-3">
                  {/* User dropdown */}
                  <div className="dropdown dropdown-end">
                    <button
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        {getInitials(user?.name, user?.email)}
                      </div>
                    </button>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 w-56 rounded-3xl bg-white p-2 shadow-lg border border-slate-200"
                    >
                      <li className="py-2 border-b border-slate-100 mb-1">
                        <p className="text-sm font-bold text-slate-950">
                          {user.name || "Account"}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {user.email}
                        </p>
                      </li>
                      {user.role === "admin" && (
                        <li>
                          <Link href="/admin" className="font-bold text-primary">
                            Admin Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <button
                          type="button"
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="text-red-500"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn btn-ghost btn-sm text-slate-500 hover:bg-slate-100 rounded-xl"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="btn btn-sm border-none bg-slate-950 text-white hover:bg-slate-800 rounded-xl shadow-sm px-4"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile: Menu button */}
        <div className="lg:hidden flex-none">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-square btn-sm"
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-950"
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
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-3xl bg-white p-2 shadow-lg border border-slate-200"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href) ? "text-blue-600 font-bold" : "text-slate-600"
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
                  {user.role === "admin" && (
                    <li>
                      <Link href="/admin" className="font-bold text-primary">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-red-500"
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
                      className="font-bold text-blue-600"
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
