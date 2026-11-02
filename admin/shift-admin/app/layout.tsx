import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import ThemeToggle from "@/app/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHIFT Admin",
  description: "Administration tools for SHIFT Camp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {`try { const saved = localStorage.getItem("shift-admin-theme"); const theme = saved === "dark" || saved === "light" ? saved : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); document.documentElement.dataset.theme = theme; } catch { document.documentElement.dataset.theme = "light"; }`}
        </Script>
        <ClerkProvider>
          <ThemeToggle />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
