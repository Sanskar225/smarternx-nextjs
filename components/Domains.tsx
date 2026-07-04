import Link from "next/link";
import Reveal from "./Reveal";
import DomainIcon from "./DomainIcon";
import { domains } from "@/lib/content";

export default function Domains() {
  return (
    <section id="domains" className="px-8 py-28">
      <div className="mx-auto max-w-container">
        <Reveal className="mb-16 max-w-[640px]">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-4 before:bg-accent">
            Our Domains
          </div>
          <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,42px)] font-normal tracking-tight">
            Multiple domains. One ecosystem.
          </h2>
          <p className="mt-3.5 text-[15.5px] text-slate">
            SmarternX builds intelligent solutions across five critical human domains — each
            powered by AI and designed to create measurable, lasting impact.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {domains.map((domain) => (
            <Link
              key={domain.id}
              href="#products"
              className="group flex min-h-[230px] flex-col gap-4.5 bg-ink-900 p-7 pb-6 transition-colors hover:bg-ink-850"
            >
              <span className="font-mono text-[11px] text-slate-dim">{domain.id}</span>
              <DomainIcon name={domain.icon} />
              <h3 className="mt-auto font-display text-[19px] font-normal">{domain.name}</h3>
              <span className="flex items-center gap-1.5 font-mono text-[11.5px] text-slate transition-all group-hover:gap-2.5 group-hover:text-accent">
                Explore Ecosystem →
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
