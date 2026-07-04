"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "day" | "night";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
} | null>(null);

const STORAGE_KEY = "smarternx-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Server and first client render both assume "night" (matches the
  // blocking inline script in layout.tsx), then this syncs to whatever
  // was actually stored, if anything.
  const [theme, setThemeState] = useState<Theme>("night");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "day" || stored === "night") setThemeState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private browsing, etc.) — theme
      // switching still works for the session, it just won't persist.
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
