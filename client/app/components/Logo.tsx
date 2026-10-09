import Link from "next/link";

export default function Logo() {
    return (

        <Link
            href="/"
            aria-label="SHIFT Camp home"
            className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
            <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-xl bg-primary-container text-sm font-bold tracking-tight text-on-primary-container shadow-[0_0_18px_rgba(139,44,245,0.3)]"
            >
                S
            </span>
            <span className="text-lg font-semibold tracking-tight text-on-surface">
                SHIFT <span className="text-primary">Camp</span>
            </span>
        </Link>
    )
}