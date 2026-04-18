import "./globals.css";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${inter.variable} min-h-screen bg-(--color-bg-base) text-(--color-text-main)`}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
