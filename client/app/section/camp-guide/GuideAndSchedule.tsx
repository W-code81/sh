"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link";


export default function GuideAndSchedule() {
    return (
        <>
            Guide And Schedule BASE

            <Link
                href="/camp-guide/?guide=check-list"
                className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
                <ArrowLeft aria-hidden="true" size={16} />
                Back to camp checklist
            </Link>
        </>
    )
}