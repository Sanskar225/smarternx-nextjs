"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import DayNightToggle from "./DayNightToggle";

export default function Hero() {
  const { theme, setTheme } = useTheme();

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      {/* Pure artwork — no copy on top of it. Two images cross-fade by
          opacity so switching never causes a layout shift or hard cut. */}
      <Image
        src="/images/hero-day.png"
        alt="SmarterNX AI ecosystem campus, daytime"
        fill
        priority={theme === "day"}
        className={`object-cover object-center transition-opacity duration-700 ease-out ${
          theme === "day" ? "opacity-100" : "opacity-0"
        }`}
      />
      <Image
        src="/images/hero-night.png"
        alt="SmarterNX AI ecosystem campus, night"
        fill
        priority={theme === "night"}
        className={`object-cover object-center transition-opacity duration-700 ease-out ${
          theme === "night" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Toggle — the only thing on top of the image */}
      <div className="absolute right-6 top-[110px] z-10 sm:right-8">
        <DayNightToggle mode={theme} onChange={setTheme} />
      </div>

      {/* Scroll cue */}
      <a
        href="#intro"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-paper/80 transition-colors hover:text-accent"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4v15M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
