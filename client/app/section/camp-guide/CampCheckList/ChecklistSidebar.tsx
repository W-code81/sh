import { Backpack, CalendarDays, MapPin, MessageCircle } from "lucide-react";

const reminders = [
  "Pack for four days, and check the weather before you leave.",
  "Bring prescribed medication if needed (camp officials must be informed).",
  "Wait for the organizers’ final message before packing venue-specific items.",
];

export default function ChecklistSidebar() {
  return (
    <aside aria-label="Camp planning details" className="flex flex-col gap-4 lg:sticky lg:top-24">
      <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tertiary-container/35 text-tertiary"><Backpack aria-hidden="true" size={19} /></span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">A few reminders</p>
            <h2 className="mt-1 text-lg font-semibold text-foreground">Pack with care</h2>
          </div>
        </div>
        <ul className="mt-5 space-y-3">
          {reminders.map((reminder) => (
            <li key={reminder} className="flex gap-3 text-sm leading-6 text-on-surface-variant">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{reminder}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Camp details</p>
        <div className="mt-4 space-y-3">
          <p className="flex items-start gap-3 text-sm leading-5 text-foreground"><CalendarDays aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={17} />15-18th December 2026</p>
          <p className="flex items-start gap-3 text-sm leading-5 text-foreground"><MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={17} />Royal Girls Academy, Ozuoba</p>
        </div>
        <p className="mt-4 flex gap-2 border-t border-outline-variant/50 pt-4 text-xs leading-5 text-on-surface-variant"><MessageCircle aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={15} />Check organizer messages for final travel, accommodation, and packing instructions.</p>
      </section>
    </aside>
  );
}
