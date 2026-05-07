import "./globals.css";
import { Lato } from "next/font/google";
import NextAuthProvider from "@/provider/NextAuthProvider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${lato.variable} font-sans min-h-screen bg-slate-50 text-slate-950`}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
