"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

type VantaEffect = {
  destroy: () => void;
  setOptions?: (options: Record<string, unknown>) => void;
};

// Vanta creates and manages its own Three.js scene imperatively inside the
// given DOM node — it never touches React's render tree or a reconciler,
// which is exactly why this is safe to use after the earlier
// React-Three-Fiber crash: there's no host-config/renderer bridge here for
// a React version mismatch to break. React just mounts a plain <div> and
// hands it off; Vanta does the rest itself, same as it would in a
// framework-free page.
const nightColors = { backgroundColor: 0x0a0f1c };
const dayColors = { backgroundColor: 0xdde8e8 };

export default function VantaBirdsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    // Dynamically imported (rather than imported at the top of the file)
    // because Vanta's bundle touches `window` as soon as it's evaluated —
    // fine in the browser, fatal during Next.js's server render.
    import("vanta/dist/vanta.birds.min").then(({ default: BIRDS }) => {
      if (cancelled || !containerRef.current) return;
      effectRef.current = BIRDS({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundAlpha: 1.0,
        color1: 0xff0000,
        color2: 0x0dd1ff,
        colorMode: "varianceGradient",
        quantity: 3,
        birdSize: 1.0,
        wingSpan: 26,
        speedLimit: 4,
        separation: 20,
        alignment: 20,
        cohesion: 20,
        ...(theme === "day" ? dayColors : nightColors),
      });
    });

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
    // Only re-run on mount/unmount — theme changes are handled below via
    // setOptions instead of tearing down and rebuilding the whole effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    effectRef.current?.setOptions?.(theme === "day" ? dayColors : nightColors);
  }, [theme]);

  return <div ref={containerRef} aria-hidden="true" className="fixed inset-0 -z-10" />;
}
