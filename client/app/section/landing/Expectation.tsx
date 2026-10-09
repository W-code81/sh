import { BookOpenText, Flame, Users, Volleyball } from "lucide-react";
import Image from "next/image";

const expectations = [
  {
    title: "Worship & Prayer",
    description:
      "Unplug with open-air worship beneath the stars and take a guided prayer walk through the pines.",
    focus: "Spiritual focus",
    icon: Flame,
    imageSrc: "/images/worship.jpg",
    imageAlt: "Campers gathered for outdoor worship at dusk",
    highlight: "Evening worship",
  },
  {
    title: "Biblical Teaching & Workshops",
    description:
      "Explore how faith meets everyday life through teaching, interactive workshops, and Q&A.",
    focus: "Faith & purpose",
    icon: BookOpenText,
    imageSrc: "/images/workshop.jpg",
    imageAlt: "A speaker teaching a group of young people",
    highlight: "Teaching & Q&A",
  },
  {
    title: "Community & Fellowship",
    description:
      "Share stories, take part in cabin groups, and build friendships that continue beyond camp.",
    focus: "Together at camp",
    icon: Users,
    imageSrc: "/images/community.jpg",
    imageAlt: "Campers laughing together outdoors",
    highlight: "Cabin groups",
  },
  {
    title: "Outdoor Recreation & Games",
    description:
      "Make room for adventure, friendly team challenges, and time to enjoy the outdoors.",
    focus: "Adventure & play",
    icon: Volleyball,
    imageSrc: "/images/recreation.jpg",
    imageAlt: "Campers enjoying outdoor recreation",
    highlight: "Games & activities",
  },
];

export default function Expectation() {
  return (
    <section
      aria-labelledby="expectations-title"
      className="w-full bg-surface-container-lowest/60 py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mx-auto mb-9 max-w-2xl text-center md:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary sm:text-sm">
            The retreat journey
          </p>
          <h2
            id="expectations-title"
            className="mt-2 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl"
          >
            What to expect at camp
          </h2>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant sm:text-base">
            Worship, fresh perspectives, and time to grow together.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {expectations.map(({ title, description, focus, icon: Icon, imageSrc, imageAlt, highlight }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-2xl border border-outline-variant/35 bg-surface-container-low transition-colors hover:border-primary/40"
            >
              <div className="relative h-65 overflow-hidden sm:h-80">
                
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                  className="size-full h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface-container-low/80 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-primary-container px-3 py-1 text-xs font-semibold text-on-primary-container">
                  {focus}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-2 flex items-center gap-2 text-secondary">
                  <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                  <span className="text-xs font-semibold sm:text-sm">{highlight}</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
