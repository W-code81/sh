"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const slides = [
  "SnapInsta.to_470894385_18051297458083916_6668743153985156241_s.jpg",
  "SnapInsta.to_470902127_18051326513083916_7932194874535138474_n.jpg",
  "SnapInsta.to_470913149_18051295376083916_5866380154927866568_b.jpg",
  "SnapInsta.to_470920573_18051295295083916_1265948126164485032_s.jpg",
  "SnapInsta.to_470920943_18051326603083916_2547790152555239395_a.jpg",
  "SnapInsta.to_470935363_18051296759083916_9107396001718742107_n.jpg",
  "SnapInsta.to_470936916_18051326594083916_6748922682150194734_n.jpg",
  "SnapInsta.to_470938538_18051326552083916_8033387690002409612_n.jpg",
  "SnapInsta.to_470941251_18051294611083916_2805886060725538496_n.jpg",
  "SnapInsta.to_470942512_18051296783083916_4161120068654524250_a.jpg",
  "SnapInsta.to_470944089_18051299759083916_2274343539210694017_sab.jpg",
  "SnapInsta.to_470944240_18051326570083916_6135480089820474733_ns.jpg",
  "SnapInsta.to_470944795_18051296750083916_6789565088162452524_na.jpg",
  "SnapInsta.to_470945659_18051295367083916_7832167661017983624_naaa.jpg",
  "SnapInsta.to_470945797_18051295331083916_356714171111540243_naaa.jpg",
  "SnapInsta.to_470946413_18051294596083916_2725292345034257406_n.jpg",
  "SnapInsta.to_470951693_18051296774083916_3299234432376767732_na.jpg",
].map((filename) => `/images/slideshow/${filename}`);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionPreference() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerReducedMotionPreference() {
  return false;
}

export default function HeroSlideshow() {
  const slideFrameRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
  const [playOverride, setPlayOverride] = useState(false);
  const hasRenderedFirstSlide = useRef(false);

  useEffect(() => {
    const nearbySlides = [
      slides[(activeSlide + 1) % slides.length],
      slides[(activeSlide - 1 + slides.length) % slides.length],
    ];
    nearbySlides.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, [activeSlide]);

  useEffect(() => {
    if (paused || interacting || (reducedMotion && !playOverride)) return;

    const interval = window.setInterval(() => {
      setSlideDirection(1);
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5_000);

    return () => window.clearInterval(interval);
  }, [paused, interacting, reducedMotion, playOverride]);

  useEffect(() => {
    const frame = slideFrameRef.current;
    if (!frame || reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!hasRenderedFirstSlide.current) {
      hasRenderedFirstSlide.current = true;
      return;
    }

    const reveal = gsap.fromTo(
      frame,
      {
        clipPath: slideDirection > 0 ? "inset(0 10% 0 0)" : "inset(0 0 0 10%)",
        x: slideDirection * 14,
        scale: 1.025,
        autoAlpha: 0.82,
      },
      { clipPath: "inset(0)", x: 0, scale: 1, autoAlpha: 1, duration: 0.68, ease: "power3.out" },
    );

    return () => {
      reveal.kill();
    };
  }, [activeSlide, slideDirection, reducedMotion]);

  const goTo = (direction: -1 | 1) => {
    setSlideDirection(direction);
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  const autoplayEnabled = !paused && (!reducedMotion || playOverride);

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        role="region"
        aria-label="SHIFT Camp photo slideshow"
        aria-roledescription="carousel"
        className="group relative aspect-16/10 overflow-hidden rounded-xl bg-surface-container-low shadow-[0_24px_60px_rgba(10,5,16,0.38)] sm:aspect-4/3"
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocus={() => setInteracting(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setInteracting(false);
          }
        }}
      >
        <div ref={slideFrameRef} className="absolute inset-0" aria-live="off">
          <Image
            key={slides[activeSlide]}
            src={slides[activeSlide]}
            alt={`SHIFT Camp community photo ${activeSlide + 1} of ${slides.length}`}
            fill
            priority={activeSlide === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 48vw"
            className="object-cover"
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/25 to-transparent px-5 pb-5 pt-24 text-white sm:px-8 sm:pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/85">SHIFT Camp</p>
          <p className="mt-2 max-w-sm text-xl font-semibold leading-tight sm:text-2xl">A little space to grow together.</p>
        </div>
        <div className="absolute right-3 top-3 bottom-auto flex items-center gap-1 rounded-full border border-white/55 bg-background/55 p-1 text-foreground shadow-[0_8px_28px_rgba(10,5,16,0.32)] backdrop-blur-xl sm:right-4 sm:top-auto sm:bottom-4">
          <button
            type="button"
            aria-label="Previous camp photo"
            onClick={() => goTo(-1)}
            className="flex size-9 items-center justify-center rounded-full transition-[background-color,transform] duration-200 hover:bg-white/55 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <span role="group" aria-label={`Photo ${activeSlide + 1} of ${slides.length}`} className="min-w-12 text-center font-mono text-xs tabular-nums">
            {String(activeSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Next camp photo"
            onClick={() => goTo(1)}
            className="flex size-9 items-center justify-center rounded-full transition-[background-color,transform] duration-200 hover:bg-white/55 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronRight aria-hidden="true" size={18} />
          </button>
          <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-white/65" />
          <button
            type="button"
            aria-label={autoplayEnabled ? "Pause slideshow" : "Play slideshow"}
            onClick={() => {
              setPaused(autoplayEnabled);
              setPlayOverride(!autoplayEnabled);
            }}
            className="flex size-9 items-center justify-center rounded-full transition-[background-color,transform] duration-200 hover:bg-white/55 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {autoplayEnabled ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
