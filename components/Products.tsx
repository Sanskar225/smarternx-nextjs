import Link from "next/link";
import Reveal from "./Reveal";
import { products, type Product } from "@/lib/content";

// Tailwind's JIT compiler only picks up class names it can see as full
// static strings in source — building "text-" + color at runtime would
// get purged from the production CSS. This lookup keeps every class name
// literal while still letting each product declare its color as data.
const ACCENT_CLASSES: Record<Product["accentColor"], { dot: string; text: string; border: string }> = {
  accent: { dot: "bg-accent", text: "text-accent", border: "hover:border-accent" },
  cyan: { dot: "bg-cyan", text: "text-cyan", border: "hover:border-cyan" },
  purple: { dot: "bg-purple", text: "text-purple", border: "hover:border-purple" },
  orange: { dot: "bg-orange", text: "text-orange", border: "hover:border-orange" },
};

export default function Products() {
  return (
    <section id="products" className="px-8 py-28">
      <div className="mx-auto max-w-container">
        <Reveal className="mb-16 max-w-[640px]">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-4 before:bg-accent">
            The Platform
          </div>
          <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,42px)] font-normal tracking-tight">
            Six products. One ecosystem.
          </h2>
          <p className="mt-3.5 text-[15.5px] text-slate">
            SmarterNX operates across six interconnected product categories, each with its own
            signature color across the ecosystem — matching the SmarterNX campus map.
          </p>
        </Reveal>

        <div className="flex flex-col">
          {products.map((product) => {
            const accent = ACCENT_CLASSES[product.accentColor];
            return (
              <Reveal
                key={product.id}
                className="grid gap-6 border-t border-line py-10 last:border-b md:grid-cols-[220px_1fr_260px] md:gap-10"
              >
                <div>
                  <div className="font-mono text-xs text-slate-dim">
                    <span
                      className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${
                        product.status === "live" ? accent.dot : "bg-slate-dim"
                      }`}
                    />
                    {product.id}
                  </div>
                  <div className="mt-2 font-display text-[26px] font-normal">{product.name}</div>
                  <span className={`mt-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] ${accent.text}`}>
                    {product.category}
                  </span>
                </div>

                <div>
                  <p className="max-w-[520px] text-[15px] text-slate">{product.description}</p>
                </div>

                <div className="flex justify-start md:justify-end">
                  <Link
                    href="#contact"
                    className={`rounded-sm border border-line px-5 py-3.5 font-mono text-[13px] text-paper transition-all hover:-translate-y-0.5 hover:text-paper ${accent.border}`}
                  >
                    {product.cta}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
