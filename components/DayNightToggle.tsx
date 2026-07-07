"use client";

import { useCallback, useEffect, useState } from "react";

type Mode = "day" | "night";

interface DayNightToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
  className?: string;
}

// Icon Components with proper typing
const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    className="h-4 w-4" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.6"
    {...props}
  >
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
  </svg>
);

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    className="h-4 w-4" 
    fill="currentColor"
    {...props}
  >
    <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2z" />
  </svg>
);

export default function DayNightToggle({ 
  mode, 
  onChange, 
  className = "" 
}: DayNightToggleProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = useCallback((newMode: Mode) => {
    if (newMode !== mode) {
      onChange(newMode);
      
      // Apply theme to document
      document.documentElement.setAttribute("data-theme", newMode);
      
      // Store preference
      localStorage.setItem("theme", newMode);
    }
  }, [mode, onChange]);

  // Keyboard support
  const handleKeyDown = useCallback((e: React.KeyboardEvent, newMode: Mode) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(newMode);
    }
  }, [handleToggle]);

  // Apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Mode | null;
    if (savedTheme && savedTheme !== mode) {
      onChange(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className={`inline-flex items-center gap-1 rounded-full border border-line/30 bg-ink-850/50 p-1 backdrop-blur-sm transition-all duration-300 hover:border-accent/20 ${className}`}
    >
      {/* Day Button */}
      <button
        type="button"
        onClick={() => handleToggle("day")}
        onKeyDown={(e) => handleKeyDown(e, "day")}
        aria-pressed={mode === "day"}
        aria-label="Switch to day mode"
        className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 font-mono text-[11px] font-medium transition-all duration-300 ${
          mode === "day" 
            ? "bg-accent text-ink-900 shadow-lg shadow-accent/25" 
            : "text-slate hover:text-paper hover:bg-ink-800/50"
        }`}
      >
        <SunIcon className={mode === "day" ? "text-ink-900" : "text-current"} />
        <span>Day</span>
      </button>

      {/* Night Button */}
      <button
        type="button"
        onClick={() => handleToggle("night")}
        onKeyDown={(e) => handleKeyDown(e, "night")}
        aria-pressed={mode === "night"}
        aria-label="Switch to night mode"
        className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 font-mono text-[11px] font-medium transition-all duration-300 ${
          mode === "night" 
            ? "bg-cyan text-ink-900 shadow-lg shadow-cyan/25" 
            : "text-slate hover:text-paper hover:bg-ink-800/50"
        }`}
      >
        <MoonIcon className={mode === "night" ? "text-ink-900" : "text-current"} />
        <span>Night</span>
      </button>

      {/* Animated indicator */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none ${
          mode === "day" 
            ? "bg-accent/5" 
            : "bg-cyan/5"
        }`}
      />
    </div>
  );
}