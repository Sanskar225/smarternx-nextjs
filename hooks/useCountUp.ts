"use client";

import { useEffect, useRef, useState } from "react";

const formatValue = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}K+` : `${n}+`);

/**
 * Animates a number from 0 up to `target` once the element scrolls
 * into view, using an eased ramp so the count settles rather than
 * ticking linearly.
 */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(formatValue(Math.floor(target * eased)));
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(formatValue(target));
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, display };
}
