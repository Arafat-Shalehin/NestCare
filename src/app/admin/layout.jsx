"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaChartBar,
  FaCalendarCheck,
  FaHandsHelping,
  FaUsers,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { motion } from "framer-motion";

const menuItems = [
  { label: "Overview", href: "/admin", icon: <FaChartBar /> },
  { label: "Bookings", href: "/admin/bookings", icon: <FaCalendarCheck /> },
  { label: "Services", href: "/admin/services", icon: <FaHandsHelping /> },
  { label: "Users", href: "/admin/users", icon: <FaUsers /> },
];

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-bg-base)">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Redirect if not admin
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-(--color-bg-base)">
      {/* Sidebar */}
      <aside className="w-64 bg-(--color-surface) border-r border-(--color-border-subtle) flex flex-col fixed inset-y-0 z-50">
        <div className="p-6">
          <Link
            href="/"
            className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-(--color-primary-600) flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="text-xl font-bold tracking-tight text-(--color-text-main)">
              NestCare <span className="text-xs text-primary">Admin</span>
            </span>
          </Link>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? "bg-(--color-primary-50) text-(--color-primary-600)"
                      : "text-(--color-text-muted) hover:bg-(--color-bg-soft) hover:text-(--color-text-main)"
                  }`}
                >
                  <span
                    className={`text-lg ${isActive ? "text-(--color-primary-600)" : "text-(--color-text-soft) group-hover:text-(--color-text-muted)"}`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-(--color-primary-600)"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-2 border-t border-(--color-border-subtle)">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-(--color-text-muted) hover:bg-(--color-bg-soft) hover:text-(--color-text-main) transition-all"
          >
            <FaHome /> Main Website
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-error/80 hover:bg-error/5 hover:text-error transition-all">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-(--color-text-main)">
              Admin Control Panel
            </h2>
            <p className="text-sm text-(--color-text-muted)">
              Manage your caregiving network with precision.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-(--color-text-main)">
                {session.user.name}
              </p>
              <p className="text-xs text-(--color-text-soft)">Supreme Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold">
              {session.user.name?.[0]}
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
