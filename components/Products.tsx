import Link from "next/link";
import Reveal from "./Reveal";
import { products, type Product } from "@/lib/content";

// Tailwind's JIT compiler only picks up class names it can see as full
// static strings in source — building "text-" + color at runtime would
// get purged from the production CSS. This lookup keeps every class name
// literal while still letting each product declare its color as data.
const ACCENT_CLASSES: Record<Product["accentColor"], { 
  dot: string; 
  text: string; 
  border: string; 
  bg: string;
  gradient: string;
  icon: string;
}> = {
  accent: { 
    dot: "bg-accent", 
    text: "text-accent", 
    border: "hover:border-accent",
    bg: "bg-accent/10",
    gradient: "from-accent to-accent/50",
    icon: "✦"
  },
  cyan: { 
    dot: "bg-cyan", 
    text: "text-cyan", 
    border: "hover:border-cyan",
    bg: "bg-cyan/10",
    gradient: "from-cyan to-cyan/50",
    icon: "⚡"
  },
  purple: { 
    dot: "bg-purple", 
    text: "text-purple", 
    border: "hover:border-purple",
    bg: "bg-purple/10",
    gradient: "from-purple to-purple/50",
    icon: "🚀"
  },
  orange: { 
    dot: "bg-orange", 
    text: "text-orange", 
    border: "hover:border-orange",
    bg: "bg-orange/10",
    gradient: "from-orange to-orange/50",
    icon: "❤️"
  },
};

// Map product IDs to icons
const PRODUCT_ICONS = {
  smartpad: "📚",
  gogenius: "🧠",
  aistudio: "🤖",
  fitlife: "💪",
  codex: "💻",
  doer: "🌐",
};

export default function Products() {
  return (
    <section id="products" className="relative overflow-hidden px-8 py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      
      <div className="relative mx-auto max-w-container">
        <Reveal className="mb-20 max-w-[720px]">
          <div className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent before:block before:h-px before:w-8 before:bg-accent/50">
            The Platform
          </div>
          <h2 className="mt-6 font-display text-[clamp(36px,4.2vw,52px)] font-light tracking-tight leading-[1.1]">
            Six Products.
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              One Ecosystem.
            </span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate">
            SmarterNX operates across six interconnected product categories, each with its own
            signature color across the ecosystem — matching the SmarterNX campus map.
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          {products.map((product, index) => {
            const accent = ACCENT_CLASSES[product.accentColor];
            const isLive = product.status === "live";
            
            return (
              <Reveal
                key={product.id}
                className="group relative rounded-2xl border border-line bg-background/50 p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 md:p-8"
              >
                {/* Status indicator */}
                <div className="absolute -top-px left-8 h-[2px] w-12 rounded-full bg-gradient-to-r from-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="grid gap-6 md:grid-cols-[240px_1fr_200px] md:gap-8">
                  {/* Left: Product info */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${accent.bg}`}>
                        <span className={accent.text}>
                          {PRODUCT_ICONS[product.id as keyof typeof PRODUCT_ICONS] || accent.icon}
                        </span>
                      </div>
                      <div>
                        <div className="font-display text-[22px] font-medium leading-tight">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-mono font-medium uppercase tracking-[0.1em] ${accent.text}`}>
                            {product.category}
                          </span>
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${isLive ? accent.dot : "bg-slate-dim"}`} />
                          <span className="text-[10px] font-mono uppercase text-slate-dim">
                            {isLive ? "Live" : "Coming Soon"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 font-mono text-xs text-slate-dim">
                      {product.id}
                    </div>
                  </div>

                  {/* Center: Description */}
                  <div className="flex items-center">
                    <p className="text-[15px] leading-relaxed text-slate">
                      {product.description}
                    </p>
                  </div>

                  {/* Right: CTA */}
                  <div className="flex items-center justify-start md:justify-end">
                    <Link
                      href="#contact"
                      className={`group/btn relative flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-sm ${accent.text}`}
                    >
                      {product.cta}
                      <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                        ↗
                      </span>
                      <span className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 ${accent.bg}`} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        
        {/* Bottom note */}
        <Reveal className="mt-12 text-center">
          <p className="text-sm text-slate-dim">
            Each product is designed to work independently while integrating seamlessly with the 
            <span className="text-accent"> SmarterNX ecosystem</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}