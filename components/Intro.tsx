import Link from "next/link";
import Reveal from "./Reveal";
import StatStrip from "./StatStrip";
import TechStrip from "./TechStrip";

// Everything that used to sit as an overlay on top of the hero image now
// lives here instead, as a normal section the visitor scrolls into — the
// hero itself is pure artwork.
export default function Intro() {
  return (
    <section id="intro" className="px-8 py-28">
      <div className="mx-auto max-w-container">
        <div className="max-w-[620px]">
          <Reveal className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-850 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Why SmarterNX Exists
          </Reveal>

          <Reveal as="h1" className="mt-6 font-display text-[clamp(34px,4.6vw,54px)] font-normal leading-[1.12] tracking-tight">
            Intelligence should create <em className="font-light not-italic italic text-accent">impact</em>, not just advancement.
          </Reveal>

          <Reveal as="p" className="mt-6 max-w-[520px] text-[17px] text-slate">
            SmarternX is an AI-driven innovation company building intelligent, scalable, and
            innovative products across education, healthcare, talent acquisition, sports, and
            wellness — leveraging cutting-edge technologies.
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="#products"
              className="rounded-full border border-accent bg-accent px-6 py-3.5 font-mono text-[13px] font-medium text-ink-900 transition-transform hover:-translate-y-0.5 hover:bg-[#5eebae]"
            >
              Explore Ecosystem →
            </Link>
            <Link
              href="#about"
              className="flex items-center gap-2.5 rounded-full border border-line py-2.5 pl-2.5 pr-5 font-mono text-[13px] text-paper transition-all hover:border-accent hover:text-accent"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              Vision &amp; Mission
            </Link>
          </Reveal>

          <Reveal className="mt-5 max-w-[520px] rounded-sm border-l-2 border-accent bg-ink-850 px-6 py-5">
            <span className="mb-2.5 block font-mono text-[11px] text-slate-dim">{"// OVERVIEW"}</span>
            <p className="text-[14.5px] leading-relaxed text-slate">
              SmarternX is a next-generation AI product company building intelligent solutions
              across multiple industries. We design and develop practical, secure, and scalable
              AI products that solve real-world challenges through intelligent technology and
              user-focused experiences. Our approach goes beyond creating software — we build
              ecosystems that help people learn better, work smarter, and make more informed
              decisions. While our current flagship focus is education through SmartPad, our
              vision extends across Education, Healthcare, Enterprise Solutions, Productivity,
              and emerging digital experiences.
            </p>
          </Reveal>
        </div>

        <Reveal className="relative mt-[70px] rounded-sm border border-line bg-ink-850">
          <StatStrip />
        </Reveal>

        <Reveal className="mt-6">
          <TechStrip />
        </Reveal>
      </div>
    </section>
  );
}
