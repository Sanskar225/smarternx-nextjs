"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import DayNightToggle from "./DayNightToggle";
import ProductIcon from "./ProductIcon";
import { products, heroCallouts, type Product } from "@/lib/content";

// Types
interface HeroCalloutProps {
  callout: {
    code: string;
    icon: string;
    style: {
      left: string;
      top: string;
    };
  };
}

// Constants
const ACCENT: Record<Product["accentColor"], { bg: string; text: string }> = {
  accent: { bg: "bg-accent/15", text: "text-accent" },
  cyan: { bg: "bg-cyan/15", text: "text-cyan" },
  purple: { bg: "bg-purple/15", text: "text-purple" },
  orange: { bg: "bg-orange/15", text: "text-orange" },
};

// Hero Callout Component
const HeroCallout: React.FC<HeroCalloutProps> = ({ callout }) => {
  const product = products.find((p) => p.code === callout.code);
  if (!product) return null;
  
  const accent = ACCENT[product.accentColor];
  
  return (
    <Link
      href="#products"
      style={{ left: callout.style.left, top: callout.style.top }}
      className="group absolute z-10 hidden w-[190px] items-start gap-3 rounded-xl border border-line/70 bg-ink-900/80 p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-line hover:bg-ink-900/95 lg:flex"
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.bg} ${accent.text} transition-transform duration-300 group-hover:scale-110`}>
        <ProductIcon name={callout.icon as any} />
      </span>
      <span>
        <span className="block font-display text-[15px] leading-tight text-paper">
          {product.name}
        </span>
        <span className="mt-0.5 block font-mono text-[10.5px] leading-snug text-slate-dim">
          {product.category}
        </span>
      </span>
    </Link>
  );
};

// Main Hero Component
export default function Hero() {
  const { theme, setTheme } = useTheme();

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      {/* Day/Night Images - Clean, no effects */}
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
        alt="SmarterNX AI ecosystem campus, nighttime"
        fill
        priority={theme === "night"}
        className={`object-cover object-center transition-opacity duration-700 ease-out ${
          theme === "night" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* NO scrim, NO overlay effects */}

      {/* Theme Toggle */}
      <div className="absolute right-6 top-[110px] z-10 sm:right-8">
        <DayNightToggle mode={theme} onChange={setTheme} />
      </div>

      {/* Product Callouts - Only cards */}
      {heroCallouts.map((callout) => (
        <HeroCallout key={callout.code} callout={callout} />
      ))}

      {/* Minimal Branding - Bottom Left */}
      <div className="absolute bottom-12 left-8 z-10 sm:left-12 lg:left-16">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
            <span className="text-sm font-bold text-accent">S</span>
          </div>
          <div>
            <div className="font-display text-sm font-medium text-paper/80">
              SmarterNX
            </div>
            <div className="font-mono text-[9px] tracking-wider text-slate-dim/60">
              AI PRODUCT COMPANY
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue - Minimal */}
      <Link
        href="#intro"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-paper/40 transition-all duration-300 hover:text-accent hover:scale-110"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="flex h-6 w-4 items-start justify-center rounded-full border border-paper/20 p-1">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-paper/40" />
        </div>
      </Link>
    </section>
  );
}