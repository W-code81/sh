import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./components/Navbar";
import LenisScroll from "./components/LenisScroll";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Camp Registration",
  description: "Camp information and registration for our church community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-on-surface antialiased" suppressHydrationWarning>
        {/* <LenisScroll /> */}
        <Navbar />
        {children}
        <Footer />
        <Script id="shift-theme-init" strategy="beforeInteractive">
          {`try { const saved = localStorage.getItem("shift-theme"); const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches; document.documentElement.dataset.theme = saved || (systemLight ? "light" : "dark"); } catch { document.documentElement.dataset.theme = "dark"; }`}
        </Script>
      </body>
    </html>
  );
}
