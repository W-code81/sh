import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
    return (
        <section
            aria-labelledby="final-cta-title"
            className="mx-auto w-full max-w-7xl px-5 pb-14 md:px-8 md:pb-20"
            id="final-cta"
        >
            <div data-scroll-reveal className="relative overflow-hidden rounded-xl bg-secondary-container px-6 py-10 text-left text-on-secondary-container sm:px-10 md:py-14">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-outline">
                    SHIFT Camp · 17–20 December 2026
                </span>

                <h2
                    className="mt-5 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl"
                    id="final-cta-title"
                >
                    Ready to join us at camp?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-on-secondary-container/75 sm:text-lg">
                    Take the next step and register. The camp team will share practical details as they’re confirmed.
                </p>

                <div className="mt-7 flex flex-col items-start gap-4">
                    <Link
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary-container px-6 py-3 font-semibold text-on-primary-container shadow-[0_4px_16px_rgba(139,44,245,0.24)] transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98]"
                        href="/register"
                    >
                        Register for camp
                        <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>

                    <div>
                        <span className="text-on-secondary-container/75">Already registered? </span>
                        <Link
                            className="rounded text-sm font-semibold text-on-secondary-container underline transition-colors  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tertiary-container"
                            href="/check-registration"
                        >
                            Check your registration
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
