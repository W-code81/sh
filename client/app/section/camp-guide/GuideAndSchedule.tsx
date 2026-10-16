"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarDays, ClipboardCheck, Clock3 } from "lucide-react";

type CampData = {
    id: string,
    weekday: string,
    date: string,
    title: string
}

type CampDataArray = CampData[]

const campDays: CampDataArray = [
  { id: "day-1", weekday: "TUE", date: "15 DEC", title: "Arrival & opening" },
  { id: "day-2", weekday: "WED", date: "16 DEC", title: "Encounter" },
  { id: "day-3", weekday: "THU", date: "17 DEC", title: "Adventure & campfire" },
  { id: "day-4", weekday: "FRI", date: "18 DEC", title: "Commissioning & departure" },
] as const;

type CampDayId = (typeof campDays)[number]["id"];

/** Shows the four-day camp outline until session times and activities are confirmed. */
export default function GuideAndSchedule() {
  const [activeDayId, setActiveDayId] = useState<CampDayId>(campDays[0].id); //default is the first id
  const activeDay = campDays.find((day) => day.id === activeDayId) ?? campDays[0];

  return (
    <main className="relative isolate min-h-[calc(100vh-9rem)] overflow-hidden px-5 pb-14 pt-6 sm:px-8 sm:pb-16 sm:pt-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full bg-primary-container/12 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl">

        <section className="mt-5 flex flex-col gap-6 rounded-[1.75rem] border border-outline-variant/70 bg-surface-container-lowest/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.12)] sm:mt-7 sm:p-7 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              SHIFT Camp <span className="px-1 text-outline">/</span> 15–18 December 2026
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Camp guide &amp; schedule
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant sm:text-base sm:leading-7">
              A quick look at the four days together. We’ll add session times and the full programme as soon as they’re confirmed.
            </p>
          </div>

          <Link
            href="/camp-guide?guide=check-list"
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-primary/35 bg-primary-container/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary-container/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:self-auto"
          >
            <ClipboardCheck aria-hidden="true" size={17} />
           Camp Checklist Guide
            <ArrowUpRight aria-hidden="true" size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </section>

        <section aria-labelledby="schedule-title" className="mt-8 sm:mt-10">
          <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-on-surface-variant">The week at a glance</p>
              <h2 id="schedule-title" className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Four days together
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant">Choose a day to see its current focus.</p>
          </div>

          <div aria-label="Camp days" className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {campDays.map((day, index) => {
              const isActive = day.id === activeDayId;

              return (
                <button
                  key={day.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveDayId(day.id)}
                  className={`group min-h-24 rounded-2xl border p-3 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-28 sm:p-4 ${
                    isActive
                      ? "border-primary-container bg-primary-container text-on-primary-container shadow-[0_8px_24px_rgba(139,44,245,0.2)]"
                      : "border-outline-variant/70 bg-surface-container-lowest text-on-surface-variant hover:border-primary/45 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className={`text-[0.68rem] font-bold uppercase tracking-[0.16em] ${isActive ? "text-on-primary-container/75" : "text-primary"}`}>
                      Day 0{index + 1}
                    </span>
                    <span className={`text-xs font-medium ${isActive ? "text-on-primary-container/80" : "text-on-surface-variant"}`}>
                      {day.weekday}
                    </span>
                  </span>
                  <span className={`mt-2 block text-lg font-bold tracking-tight sm:text-xl ${isActive ? "text-on-primary-container" : "text-foreground"}`}>
                    {day.date}
                  </span>
                  <span className={`mt-1 block text-xs font-medium sm:text-sm ${isActive ? "text-on-primary-container/85" : "text-on-surface-variant"}`}>
                    {day.title}
                  </span>
                </button>
              );
            })}
          </div>

          <article
            aria-live="polite"
            className="mt-3 flex flex-col gap-5 rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-5 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {activeDay.weekday} <span className="px-1 text-outline">/</span> {activeDay.date} 2026
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{activeDay.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
                The detailed plan for this day is still being prepared. Check back for confirmed session times and updates.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 border-t border-outline-variant/60 pt-4 text-sm sm:min-w-52 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <span className="inline-flex items-center gap-2 font-medium text-on-surface-variant">
                <CalendarDays aria-hidden="true" size={16} className="text-primary" />
                {activeDay.weekday}, {activeDay.date} 2026
              </span>
              <span className="inline-flex items-center gap-2 font-medium text-on-surface-variant">
                <Clock3 aria-hidden="true" size={16} className="text-primary" />
                Session times to follow
              </span>
            </div>
          </article>
        </section>
      </div>
    </main>
  );

}
