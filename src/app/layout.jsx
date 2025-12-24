import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <NextAuthProvider session={session}>
      <html lang="en" data-theme="light">
        <body
          className={`${inter.variable} min-h-screen bg-(--color-bg-base) text-(--color-text-main) flex flex-col`}
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </NextAuthProvider>
  );
}
