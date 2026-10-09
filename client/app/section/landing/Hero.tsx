import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-20 text-center sm:py-28 md:px-8 md:py-25">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-120 max-w-5xl bg-[radial-gradient(ellipse_at_top,var(--color-primary-container)/18%,transparent_68%)]"
      />

      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
          Beyond the ordinary
        </p>
        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-on-surface sm:text-5xl md:text-6xl">
          Grow in faith. Find your people. Make camp count.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-on-surface-variant sm:text-lg sm:leading-8">
          Make room for worship, meaningful conversations, new friendships, and time together.
        </p>

        <Countdown />

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-3.5 text-sm font-semibold text-on-primary-container transition-colors hover:bg-secondary-container sm:w-auto"
          >
            Register for camp
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <Link
            href="#highlights"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant/50 bg-surface-container-low/70 px-6 py-3.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container sm:w-auto"
          >
            Explore camp details
            <ArrowDown aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
