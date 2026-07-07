import type { Config } from "tailwindcss";

// Design tokens for the "signal console" visual identity.
// Colors resolve through CSS variables (see app/globals.css) instead of
// fixed hex values, so the whole palette can swap between the "night"
// and "day" themes via a single `data-theme` attribute — no component
// needs to know which theme is active.
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: withOpacity("--c-ink-900"),
          850: withOpacity("--c-ink-850"),
          800: withOpacity("--c-ink-800"),
          700: withOpacity("--c-ink-700"),
          600: withOpacity("--c-ink-600"),
        },
        line: withOpacity("--c-line"),
        paper: withOpacity("--c-paper"),
        slate: {
          DEFAULT: withOpacity("--c-slate"),
          dim: withOpacity("--c-slate-dim"),
        },
        accent: withOpacity("--c-accent"),
        cyan: withOpacity("--c-cyan"),
        purple: withOpacity("--c-purple"),
        orange: withOpacity("--c-orange"),
        ok: withOpacity("--c-ok"),
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      maxWidth: {
        container: "1180px",
      },
      spacing: {
        4.5: "1.125rem",
      },
    },
  },
  plugins: [],
};

export default config;
