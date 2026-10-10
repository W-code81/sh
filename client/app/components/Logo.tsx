import Link from "next/link";

export default function Logo() {
    return (

        <Link
            href="/"
            aria-label="SHIFT Camp home"
            className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:gap-3"
        >
            <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-lg bg-primary-container text-sm font-bold tracking-tight text-on-primary-container shadow-[0_3px_10px_rgba(139,44,245,0.26)] sm:size-9"
            >
                S
            </span>
            <span className="text-sm font-semibold tracking-tight text-on-surface sm:text-lg">
                SHIFT <span className="text-primary max-[340px]:hidden">Camp</span>
            </span>
        </Link>
    )
}
