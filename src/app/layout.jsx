import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "NestCare – Trusted Baby & Elderly Care Services",
  description:
    "Book reliable, secure, and compassionate caregivers for children, elderly, and sick family members.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${inter.variable} min-h-screen bg-(--color-bg-base) text-(--color-text-main) flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
