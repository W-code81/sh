"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let unsubscribe: (() => void) | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (motionPreference.matches || lenis) return;

      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      unsubscribe = lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (!lenis) return;

      gsap.ticker.remove(tick);
      unsubscribe?.();
      lenis.destroy();
      lenis = null;
      unsubscribe = undefined;
    };

    const updateMotion = () => (motionPreference.matches ? stop() : start());
    start();
    motionPreference.addEventListener("change", updateMotion);

    return () => {
      motionPreference.removeEventListener("change", updateMotion);
      stop();
    };
  }, []);
}
