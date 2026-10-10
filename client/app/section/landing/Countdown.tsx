"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CAMP_START = new Date("2026-12-17T00:00:00+01:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const totalSeconds = Math.max(0, Math.floor((CAMP_START - Date.now()) / 1000));

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

const units: { label: string; key: keyof TimeLeft }[] = [
  { label: "Days", key: "days" },
  { label: "Hours", key: "hours" },
  { label: "Minutes", key: "minutes" },
  { label: "Seconds", key: "seconds" },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const secondsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const seconds = secondsRef.current;
    if (!seconds || !timeLeft || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = gsap.fromTo(
      seconds,
      { y: -2, autoAlpha: 0.72 },
      { y: 0, autoAlpha: 1, duration: 0.18, ease: "power1.out" },
    );
    return () => tick.kill();
  }, [timeLeft]);

  return (
    <div className="mt-8 w-full max-w-xl">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm font-semibold text-foreground">Camp begins in</p>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-container sm:text-sm">17–20 December 2026</p>
      </div>
      <div
        role="group"
        aria-label="Countdown to SHIFT Camp"
        aria-live="off"
        className="grid grid-cols-4 divide-x divide-outline-variant border-y border-outline-variant py-3"
      >
        {units.map(({ label, key }) => (
          <div key={key} className="px-2 first:pl-0 last:pr-0 sm:px-4">
            <span ref={key === "seconds" ? secondsRef : undefined} className="block font-mono text-2xl font-semibold tabular-nums tracking-tight text-foreground sm:text-3xl">
              {timeLeft ? String(timeLeft[key]).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-on-surface-variant sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
