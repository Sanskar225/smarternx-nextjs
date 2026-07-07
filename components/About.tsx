import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="px-8 py-28">
      <div className="mx-auto max-w-container">
        <Reveal className="mb-16 max-w-[640px]">
          <span className="font-mono text-[11px] text-slate-dim">{"// VISION & MISSION"}</span>
          <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,42px)] font-normal tracking-tight">
            Two statements. One direction.
          </h2>
        </Reveal>

        <Reveal className="mb-14 border-l-2 border-accent bg-ink-850 px-6 py-5">
          <span className="mb-2.5 block font-mono text-[11px] text-slate-dim">{"// OVERVIEW"}</span>
          <p className="max-w-3xl text-[14.5px] leading-relaxed text-slate">
            SmarternX is a next-generation AI product company building intelligent solutions
            across multiple industries. We design and develop practical, secure, and scalable AI
            products that solve real-world challenges through intelligent technology and
            user-focused experiences. Our approach goes beyond creating software — we build
            ecosystems that help people learn better, work smarter, and make more informed
            decisions. While our current flagship focus is education through SmartPad, our vision
            extends across Education, Healthcare, Enterprise Solutions, Productivity, and emerging
            digital experiences.
          </p>
        </Reveal>

        <Reveal className="grid gap-px border border-line bg-line md:grid-cols-3">
          <div className="bg-ink-900 p-8">
            <span className="font-mono text-[11px] text-slate-dim">VISION</span>
            <h3 className="mt-3.5 font-display text-xl font-normal">
              Smarter generations, by design.
            </h3>
            <p className="mt-3.5 text-[14.5px] text-slate">
              Creating smarter generations of organizations through AI-integrated intelligence
              that drives innovation, efficiency, and lasting impact.
            </p>
          </div>
          <div className="bg-ink-900 p-8 md:col-span-2">
            <span className="font-mono text-[11px] text-slate-dim">MISSION</span>
            <h3 className="mt-3.5 font-display text-xl font-normal">
              Intelligence that augments human potential.
            </h3>
            <p className="mt-3.5 text-[14.5px] text-slate">
              To create intelligent, personalized AI solutions across education, healthcare,
              hiring, sports, and wellness — augmenting human potential, optimizing performance,
              and delivering meaningful, real-world impact.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
