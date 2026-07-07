import Link from "next/link";
import Reveal from "./Reveal";
import StatStrip from "./StatStrip";
import TechStrip from "./TechStrip";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color }) => (
  <div className={`rounded-xl border border-line/30 bg-ink-850/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5`}>
    <div className="flex items-center gap-3">
      <div className={`rounded-lg bg-${color}/10 p-2.5`}>
        <div className={`h-5 w-5 text-${color}`}>{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-display font-light text-paper">{value}</div>
        <div className="text-xs text-slate-dim">{label}</div>
      </div>
    </div>
  </div>
);

export default function Intro() {
  const stats = [
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      value: "5+",
      label: "Domains",
      color: "accent"
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      value: "6",
      label: "Products",
      color: "purple"
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
      ),
      value: "AI-Powered",
      label: "Every Solution",
      color: "cyan"
    }
  ];

  return (
    <section className="relative overflow-hidden px-8 py-32">
      {/* Professional background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple/[0.03] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.02] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left column - Main content */}
          <div className="max-w-[680px]">
            {/* Badge */}
            <Reveal>
              <div className="group inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-ink-850/50 backdrop-blur-sm px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-all duration-300 hover:border-accent/40 hover:bg-ink-850/80">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Why SmarterNX Exists
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal as="h1" className="mt-8 font-display text-[clamp(40px,5vw,64px)] font-light leading-[1.08] tracking-tight">
              Intelligence should create{" "}
              <span className="bg-gradient-to-r from-accent via-purple to-cyan bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                impact
              </span>
              , not just advancement.
            </Reveal>

            {/* Description */}
            <Reveal as="p" className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-slate/90">
              SmarternX is an AI-driven innovation company building intelligent, scalable, and
              innovative products across education, healthcare, talent acquisition, sports, and
              wellness — leveraging cutting-edge technologies.
            </Reveal>

            {/* CTA Buttons */}
            <Reveal className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#products"
                className="group relative overflow-hidden rounded-full px-8 py-4 font-mono text-[13px] font-medium text-ink-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Ecosystem
                  <svg 
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-[#5eebae] to-accent bg-[length:200%_auto] animate-gradient" />
                <span className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
              
              <Link
                href="#about"
                className="group flex items-center gap-3 rounded-full border border-line/50 bg-ink-850/30 backdrop-blur-sm py-3 pl-3 pr-6 font-mono text-[13px] text-paper transition-all duration-300 hover:border-accent/30 hover:bg-ink-850/60 hover:shadow-lg hover:shadow-accent/5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:rotate-12">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </span>
                Vision &amp; Mission
              </Link>
            </Reveal>

            {/* Info Box */}
            <Reveal className="mt-10">
              <div className="group relative rounded-xl p-[1px] bg-gradient-to-r from-accent/30 via-purple/30 to-cyan/30">
                <div className="relative rounded-xl bg-ink-850/50 backdrop-blur-sm p-6 transition-all duration-300 group-hover:bg-ink-850/70">
                  {/* Corner accents */}
                  <div className="absolute -top-px -left-px h-6 w-6 rounded-tl-xl border-t-2 border-l-2 border-accent/20 transition-all duration-300 group-hover:border-accent/40" />
                  <div className="absolute -top-px -right-px h-6 w-6 rounded-tr-xl border-t-2 border-r-2 border-accent/20 transition-all duration-300 group-hover:border-accent/40" />
                  <div className="absolute -bottom-px -left-px h-6 w-6 rounded-bl-xl border-b-2 border-l-2 border-accent/20 transition-all duration-300 group-hover:border-accent/40" />
                  <div className="absolute -bottom-px -right-px h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-accent/20 transition-all duration-300 group-hover:border-accent/40" />
                  
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-[11px] font-medium tracking-wider text-accent/60">
                      {"// OVERVIEW"}
                    </span>
                    <div className="flex-1">
                      <p className="text-[14.5px] leading-relaxed text-slate/90">
                        SmarternX is a next-generation AI product company building intelligent solutions
                        across multiple industries. We design and develop practical, secure, and scalable
                        AI products that solve real-world challenges through intelligent technology and
                        user-focused experiences. Our approach goes beyond creating software — we build
                        ecosystems that help people learn better, work smarter, and make more informed
                        decisions. While our current flagship focus is education through SmartPad, our
                        vision extends across Education, Healthcare, Enterprise Solutions, Productivity,
                        and emerging digital experiences.
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-1000 group-hover:w-full" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column - Stats sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={(index + 1) * 0.1}>
                  <StatCard {...stat} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Stats and Tech strips */}
        <div className="mt-20">
          <Reveal className="relative rounded-xl border border-line/30 bg-ink-850/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-accent/20">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />
            <StatStrip />
          </Reveal>

          <Reveal className="mt-6">
            <div className="relative rounded-xl border border-line/20 bg-ink-850/20 backdrop-blur-sm px-6 py-4 transition-all duration-300 hover:border-accent/10">
              <TechStrip />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}