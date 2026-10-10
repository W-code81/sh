"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import Countdown from "./Countdown";
import HeroSlideshow from "./HeroSlideshow";

export default function Hero() {
  return (
    <section className="camp-hero relative overflow-hidden px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-x-14">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-primary/70" />
            Beyond the ordinary
          </p>
          <h1 className="hero-display max-w-2xl text-[2.25rem] leading-[0.98] text-foreground min-[360px]:text-[2.65rem] min-[420px]:text-[3.15rem] sm:text-6xl md:text-7xl lg:text-[3.8rem] xl:text-[4.25rem]">
            <span className="block">Grow in faith.</span>
            <span className="block">Find your people.</span>
            <span className="block whitespace-nowrap text-[0.9em] text-primary">Make camp count.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-on-surface-variant sm:text-lg sm:leading-8">
            Make room for worship, meaningful conversations, new friendships, and time together.
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <HeroSlideshow />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <Countdown />
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary-container px-6 py-3 text-sm font-semibold text-on-primary-container transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Register for camp
              <ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
            <Link
              href="#highlights"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-outline-variant px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-container-lowest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Explore camp details
              <ArrowDown aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
