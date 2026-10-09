import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Royal+Girls+Academy%2C+Ozuoba%2C+Obio-Akpor%2C+Port+Harcourt%2C+Rivers+State%2C+Nigeria";

export default function Venue() {
  return (
    <section aria-labelledby="venue-title" className="mx-auto w-full max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
      <div className="group relative isolate min-h-100 overflow-hidden rounded-3xl border border-outline-variant/35 bg-surface-container-low sm:min-h-120">
        <Image
          src="/images/venue.png"
          alt="Royal Girls Academy grounds in Ozuoba"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/55 to-background/5" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-9 md:p-10">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-on-surface backdrop-blur-sm">
              <MapPin aria-hidden="true" size={14} /> Camp venue
            </p>
            <h2 id="venue-title" className="text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              Royal Girls Academy
            </h2>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant sm:text-base">
              Ozuoba, Obio-Akpor, Port Harcourt, Rivers State, Nigeria
            </p>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View on map
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
