"use client";

import Link from "next/link";
import { ArrowLeft, CheckCheck, RotateCcw } from "lucide-react";

type HeaderProps = {
  completedCount: number;
  totalCount: number;
  onMarkAll: () => void;
  onReset: () => void;
};

/** Introduces the packing checklist and exposes its mark-all and reset actions. */
export default function Header({ completedCount, totalCount, onMarkAll, onReset }: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-5 pt-7 sm:mb-10 sm:pt-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Link
          href="/camp-guide"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to camp guide
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Get ready for camp</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Let&apos;s get you camp-ready.</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant sm:text-base sm:leading-7">
          Use this checklist to plan what to bring. Your progress is saved in this browser.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:pb-1">
        <button
          type="button"
          onClick={onMarkAll}
          disabled={completedCount === totalCount}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary-container transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-55"
        >
          <CheckCheck aria-hidden="true" size={17} />Mark all
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={completedCount === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container-high hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-55"
        >
          <RotateCcw aria-hidden="true" size={16} />Reset
        </button>
      </div>
    </header>
  );
}
