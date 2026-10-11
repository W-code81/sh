"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
    { label: "About Camp", href: "/" },
    { label: "Camp Guide", href: "/camp-guide" },
    { label: "Check My Registration", href: "/check-registration" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const linkClass = (href: string) =>
        `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${pathname === href
            ? "bg-surface-container text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-outline-variant/70 bg-surface-container-lowest/95 shadow-[0_1px_6px_rgba(10,5,16,0.14)] backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5 md:px-8">

                {/* LOGO */}
                <Logo/>

                {/* DESKTOP NAVLINKS */}
                <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
                    {links.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            aria-current={pathname === href ? "page" : undefined}
                            className={linkClass(href)}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-1 sm:gap-3">
                    <ThemeToggle />
                    {/* REGISTER BTN */}
                    <Link
                        href="/register"
                        className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary-container px-2 py-2 text-xs font-semibold text-on-primary-container shadow-[0_4px_16px_rgba(139,44,245,0.24)] transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-sm max-[380px]:px-1.5"
                    >
                        Register <span className="hidden sm:inline px-1"> Now</span>
                    </Link>

                    {/* MOBILE MENU BAR */}
                    <button
                        type="button"
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex size-9 items-center justify-center rounded-xl border border-outline-variant/60 text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-11 md:hidden max-[380px]:size-8"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
                            {menuOpen ? (
                                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            ) : (
                                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* MOBILE NAV  */}
            {menuOpen && (
                <nav
                    id="mobile-navigation"
                    aria-label="Mobile navigation"
                    className="border-t border-outline-variant/30 bg-surface-container-lowest px-5 py-3 md:hidden"
                >
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">
                        {links.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                aria-current={pathname === href ? "page" : undefined}
                                onClick={() => setMenuOpen(false)}
                                className={linkClass(href)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
