import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camp Registration",
  description: "Camp information and registration for our church community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-background text-on-surface antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
