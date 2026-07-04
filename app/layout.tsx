import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import EnvironmentBackdrop from "@/components/EnvironmentBackdrop";
import VantaBirdsBackground from "@/components/VantaBirdsBackground";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmarterNX — One Intelligence, Many Domains",
  description:
    "SmarternX is an AI-driven innovation company building intelligent, scalable products across education, healthcare, career, and wellness.",
};

// Runs before React hydrates so the correct theme is painted on the very
// first frame — without this, a stored "day" preference would flash
// night colors for a moment while ThemeProvider's effect catches up.
const noFlashThemeScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("smarternx-theme");
    document.documentElement.setAttribute("data-theme", stored === "day" ? "day" : "night");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "night");
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className="font-body">
        <ThemeProvider>
          <VantaBirdsBackground />
          <EnvironmentBackdrop />
          <div className="bg-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
          <CustomCursor />
          <div className="relative z-[1]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
