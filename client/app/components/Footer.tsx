import Link from "next/link";
import Logo from "./Logo";

const footerLinks = [
    { label: "About camp", href: "/about-camp" },
    { label: "Camp guide", href: "/camp-guide" },
    { label: "Check registration", href: "/check-registration" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-outline-variant/30 bg-surface-container-lowest">
            <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-start">
                    <div className="space-y-3">
                        <Logo />
                        <p className="max-w-sm text-sm leading-6 text-on-surface-variant">
                            Camp details, registration, and practical information for the SHIFT Camp community.
                        </p>
                    </div>

                    <nav aria-label="Footer navigation" className="flex flex-col items-start gap-2">
                        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-outline">
                            Explore
                        </h2>
                        {footerLinks.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="rounded text-sm text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="space-y-2 text-sm">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-outline">
                            Camp location
                        </h2>
                        <Link href='https://maps.google.com/maps?vet=10CAAQoqAOahcKEwig4vW97ayXAxUAAAAAHQAAAAAQCg..i&udm&fvr=1&pvq=Cg0vZy8xMWI2aHo3anZw&cs=1&um=1&ie=UTF-8&fb=1&gl=nl&sa=X&ftid=0x1069d175251b79b1:0xc9f30ae3912263d7'
                            className="max-w-56 not-italic leading-6 text-on-surface-variant cursor-pointer transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                            Ozuoba, Obio-Akpor<br />
                            Port Harcourt, Rivers State 500102<br />
                            Nigeria
                        </Link >
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-2 border-t border-outline-variant/30 pt-4 text-xs text-outline sm:flex-row sm:items-center sm:justify-between">
                    <p>© {year} SHIFT Camp</p>
                    <p>Made for our camp community.</p>
                </div>
            </div>
        </footer>
    );
}
