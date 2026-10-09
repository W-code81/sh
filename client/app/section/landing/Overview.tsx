import { CalendarDays, Clock3, House, WalletCards } from "lucide-react";

const details = [
  {
    label: "Schedule",
    title: "Dates & duration",
    description: "Arrival, departure, and the full camp schedule will be shared here.",
    icon: CalendarDays,
  },
  {
    label: "Stay",
    title: "Venue & lodging",
    description: "Venue, accommodation, and what to bring will be confirmed before camp.",
    icon: House,
  },
  {
    label: "Cost",
    title: "Registration fee",
    description: "Fee details and what registration includes will be added once confirmed.",
    icon: WalletCards,
  },
  {
    label: "Registration",
    title: "Important dates",
    description: "Registration deadlines and availability will be posted when finalized.",
    icon: Clock3,
  },
];

export default function Overview() {
  return (
    <section
      aria-labelledby="overview-title"
      className="w-full py-14 md:py-20"
      id="highlights"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-8 flex flex-col gap-3 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary sm:text-sm">
              Key details
            </p>
            <h2
              id="overview-title"
              className="mt-2 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl"
            >
              Camp at a glance
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-on-surface-variant sm:text-base">
            Everything arranged carefully so you can disconnect from daily distractions and reconnect with God.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {details.map(({ label, title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-outline-variant/35 bg-surface-container-low p-5 transition-colors hover:border-primary/40 sm:p-6"
            >
              <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary-container/20 text-primary">
                <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-outline">
                {label}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-on-surface">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
