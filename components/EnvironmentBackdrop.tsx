// A fixed, full-viewport decorative layer that sits behind every section.
// It's pure SVG + CSS (no canvas/WebGL), so it's cheap, has no runtime
// dependencies, and can't crash — the whole point after the earlier
// Three.js/R3F trouble. Because it's `fixed`, it stays in place as the
// page scrolls, so every section reads as "floating over the same living
// environment" instead of the environment being hero-only.
//
// All colors come from the existing design tokens (bg-ink-700, bg-accent,
// bg-cyan, ...), so this automatically re-themes with the day/night toggle
// exactly like everything else on the site — no extra logic needed here.

const TREES = [
  { left: 3, height: 46, delay: 0 },
  { left: 9, height: 64, delay: 0.4 },
  { left: 15, height: 38, delay: 1.1 },
  { left: 22, height: 58, delay: 0.2 },
  { left: 29, height: 42, delay: 1.6 },
  { left: 36, height: 70, delay: 0.8 },
  { left: 44, height: 50, delay: 1.3 },
  { left: 52, height: 40, delay: 0.5 },
  { left: 60, height: 62, delay: 1.8 },
  { left: 68, height: 46, delay: 0.9 },
  { left: 76, height: 56, delay: 0.1 },
  { left: 84, height: 38, delay: 1.4 },
  { left: 91, height: 60, delay: 0.6 },
  { left: 97, height: 44, delay: 1.0 },
];

const FIREFLIES = [
  { x: 8, y: 22, size: 3, delay: 0 },
  { x: 18, y: 68, size: 2, delay: 1.2 },
  { x: 27, y: 40, size: 3, delay: 2.1 },
  { x: 35, y: 78, size: 2, delay: 0.6 },
  { x: 46, y: 15, size: 2, delay: 1.8 },
  { x: 58, y: 55, size: 3, delay: 0.3 },
  { x: 67, y: 30, size: 2, delay: 2.4 },
  { x: 74, y: 72, size: 3, delay: 1.0 },
  { x: 83, y: 48, size: 2, delay: 1.6 },
  { x: 90, y: 20, size: 3, delay: 0.9 },
  { x: 12, y: 88, size: 2, delay: 2.0 },
  { x: 62, y: 90, size: 2, delay: 0.4 },
];

export default function EnvironmentBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* mist / depth gradients, top and bottom */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-900 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent" />

      {/* distant mountain ridgelines */}
      <svg
        className="absolute inset-x-0 bottom-28 h-44 w-full text-ink-700 opacity-60"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,220 L0,130 L140,55 L280,150 L430,35 L600,160 L760,70 L930,170 L1100,50 L1280,140 L1440,90 L1440,220 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute inset-x-0 bottom-16 h-32 w-full text-ink-800 opacity-80"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 L0,100 L180,60 L360,110 L520,50 L700,120 L880,65 L1060,125 L1240,55 L1440,100 L1440,160 Z"
          fill="currentColor"
        />
      </svg>

      {/* firefly / spark field */}
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className="env-firefly absolute rounded-full bg-accent"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}

      {/* tree line along the bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        {TREES.map((t, i) => (
          <svg
            key={i}
            className="env-tree absolute bottom-0 text-ink-700"
            style={{ left: `${t.left}%`, height: t.height, animationDelay: `${t.delay}s` }}
            viewBox="0 0 40 60"
            fill="currentColor"
          >
            <polygon points="20,0 4,34 14,34 0,60 40,60 26,34 36,34" />
          </svg>
        ))}
      </div>

      {/* a small car making its way along the road at the bottom */}
      <svg
        className="env-car absolute bottom-3 h-4 w-9 text-accent opacity-80"
        viewBox="0 0 36 16"
        fill="currentColor"
      >
        <rect x="2" y="5" width="26" height="7" rx="2.5" />
        <rect x="8" y="1" width="12" height="6" rx="2" />
        <circle cx="9" cy="13" r="2.6" />
        <circle cx="23" cy="13" r="2.6" />
      </svg>

      {/* two energy pulses drifting down a faint vertical line, echoing
          the glowing "roads" from the SmarterNX campus artwork */}
      <div className="absolute bottom-24 right-6 top-24 hidden w-px bg-line/50 lg:block" />
      <span className="env-pulse-v absolute right-6 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_10px_2px_rgb(var(--c-cyan)/0.6)] lg:block" />
      <span
        className="env-pulse-v absolute right-6 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(var(--c-accent)/0.6)] lg:block"
        style={{ animationDelay: "4.5s" }}
      />
    </div>
  );
}
