import {
    Backpack,
    BedDouble,
    BusFront,
    ChevronDown,
    HeartPulse,
    ShieldCheck,
    Utensils,
} from "lucide-react";

const information = [
    {
        icon: BedDouble,
        title: "Accommodation",
        summary: "Rooming details will be confirmed with registered campers",
        details:
            "Room assignments depend on the venue and camper needs. Add roommate or accessibility requests during registration; the camp team will confirm arrangements before departure.",
    },
    {
        icon: Utensils,
        title: "Meals & dietary needs",
        summary: "Tell the organizers about allergies and dietary needs",
        details:
            "Include each allergy or dietary requirement on your registration. The camp team can follow up with you about available meal options.",
    },
    {
        icon: BusFront,
        title: "Getting to camp",
        summary: "Departure and pickup information will be shared before camp",
        details:
            "Watch church announcements for confirmed times and the meeting location. If your travel plans change, let the camp organizers know before departure.",
    },
    {
        icon: Backpack,
        title: "What to bring",
        summary: "Pack personal essentials and any medication you need",
        details:
            "Bring clothing for the camp schedule, toiletries, a towel, your Bible or devotional, and any prescribed medication. Organizers will share the final packing list before camp.",
    },
    {
        icon: ShieldCheck,
        title: "Health & safety",
        summary: "Share important health information with the camp team",
        details:
            "Add emergency contacts and relevant health information during registration. Follow the organizers’ instructions at the venue, and speak with a leader if you feel unwell or need help.",
    },
];

export default function EssentialInfo() {
    return (
        <section
            aria-labelledby="essential-info-title"
            className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8 md:py-20"
            id="essential-info"
        >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
                
                {/* left side */}
                <div className="self-start lg:sticky lg:top-28">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Camp essentials
                    </p>
                    <h2
                        className="mt-3 max-w-lg text-3xl font-bold leading-tight tracking-tight text-on-surface sm:text-4xl"
                        id="essential-info-title"
                    >
                        The details that help you feel ready
                    </h2>
                    <p className="mt-4 max-w-lg text-base leading-7 text-on-surface-variant">
                        A quick guide to planning, packing, and sharing anything the camp team
                        should know.
                    </p>

                    <aside className="mt-7 flex gap-4 rounded-2xl border border-outline-variant/40 bg-surface-container-low p-4 sm:p-5">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-container/20 text-primary">
                            <HeartPulse aria-hidden="true" className="size-5" />
                        </span>
                        <div>
                            <h3 className="text-sm font-semibold text-on-surface">
                                Have a health or access need?
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                                Include it in your registration so the organizers can follow up
                                with you privately.
                            </p>
                        </div>
                    </aside>
                </div>

                <div className="space-y-3">
                    {information.map(({ icon: Icon, title, summary, details }, index) => (
                        <details
                            className="group overflow-hidden rounded-2xl border border-outline-variant/45 bg-surface-container-low transition-colors open:border-primary/35"
                            key={title}
                            open={index === 0}
                        >
                            <summary className="flex cursor-pointer list-none items-center gap-4 p-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:p-5 [&::-webkit-details-marker]:hidden">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-primary">
                                    <Icon aria-hidden="true" className="size-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block font-semibold text-on-surface">
                                        {title}
                                    </span>
                                    <span className="mt-1 block text-sm leading-5 text-on-surface-variant">
                                        {summary}
                                    </span>
                                </span>
                                <ChevronDown
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-outline transition-transform duration-200 group-open:rotate-180"
                                />
                            </summary>
                            <div className="border-t border-outline-variant/30 px-4 pb-5 pt-4 text-sm leading-6 text-on-surface-variant sm:px-5">
                                <p>{details}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
