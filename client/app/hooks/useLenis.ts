"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const previousPathname = useRef(pathname);

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
        stopInertiaOnNavigate: true,
      });
      lenisRef.current = lenis;
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
      lenisRef.current = null;
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

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    // Let Next.js finish its route scroll handling before syncing Lenis to it.
    let syncFrame = 0;
    let refreshFrame = 0;
    syncFrame = window.requestAnimationFrame(() => {
      refreshFrame = window.requestAnimationFrame(() => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        // Stop clears any in-flight animation; resize then reads the browser's
        // final restored position before Lenis starts handling input again.
        lenis.stop();
        lenis.resize();
        lenis.start();
        ScrollTrigger.refresh();
      });
    });

    return () => {
      window.cancelAnimationFrame(syncFrame);
      window.cancelAnimationFrame(refreshFrame);
    };
  }, [pathname]);
}
