"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollMotion() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context: gsap.Context | undefined;
    let refreshFrame = 0;

    const clearMotion = () => {
      window.cancelAnimationFrame(refreshFrame);
      context?.revert();
      context = undefined;
    };

    const setupMotion = () => {
      clearMotion();
      if (motionPreference.matches) return;

      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.68,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-scroll-stagger]").forEach((group) => {
          const items = Array.from(group.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement,
          );
          if (items.length === 0) return;

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.09,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      });

      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    setupMotion();
    motionPreference.addEventListener("change", setupMotion);

    return () => {
      motionPreference.removeEventListener("change", setupMotion);
      clearMotion();
    };
  }, []);

  return null;
}
