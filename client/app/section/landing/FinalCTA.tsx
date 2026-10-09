import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
    return (
        <section
            aria-labelledby="final-cta-title"
            className="mx-auto w-full max-w-7xl px-5 pb-14 md:px-8 md:pb-20"
            id="final-cta"
        >
            <div className="relative isolate overflow-hidden rounded-3xl border border-outline-variant/40 bg-surface-container-low px-6 py-10 text-center sm:px-10 md:py-14">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary-container/25 blur-[100px]"
                />

                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-secondary-container/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Sparkles aria-hidden="true" className="size-3.5" />
                    SHIFT Camp
                </span>

                <h2
                    className="mx-auto mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-on-surface sm:text-4xl md:text-5xl"
                    id="final-cta-title"
                >
                    Ready to join us at camp?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-on-surface-variant sm:text-lg">
                    Take the next step and register. The camp team will share practical details as they’re confirmed.
                </p>

                <div className="mt-7 flex flex-col items-center gap-4">
                    <Link
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-3 font-semibold text-on-primary-container shadow-[0_4px_20px_rgba(139,44,245,0.3)] transition hover:bg-secondary-container focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98]"
                        href="/register"
                    >
                        Register for camp
                        <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>

                    <div>
                        <span>Already registered? </span>
                        <Link
                            className="rounded text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
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
