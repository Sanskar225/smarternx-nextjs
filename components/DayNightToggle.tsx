"use client";

type Mode = "day" | "night";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2z" />
    </svg>
  );
}

export default function DayNightToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Hero scene time of day"
      className="inline-flex items-center gap-1 rounded-full border border-line bg-ink-900/70 p-1 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={() => onChange("day")}
        aria-pressed={mode === "day"}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[11px] transition-colors ${
          mode === "day" ? "bg-accent text-ink-900" : "text-slate hover:text-paper"
        }`}
      >
        <SunIcon /> Day
      </button>
      <button
        type="button"
        onClick={() => onChange("night")}
        aria-pressed={mode === "night"}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[11px] transition-colors ${
          mode === "night" ? "bg-cyan text-ink-900" : "text-slate hover:text-paper"
        }`}
      >
        <MoonIcon /> Night
      </button>
    </div>
  );
}
