import Reveal from "./Reveal";
import { impactColumns } from "@/lib/content";

export default function Impact() {
  return (
    <section id="impact" className="px-8 py-28">
      <div className="mx-auto max-w-container">
        <Reveal className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-4 before:bg-accent">
          Real Impact
        </Reveal>

        <Reveal
          as="p"
          className="mb-16 mt-6 max-w-[760px] font-display text-[clamp(22px,2.6vw,30px)] font-normal leading-[1.45]"
        >
          We do not measure success by raw stats or vanity metrics. We measure it by the{" "}
          <span className="font-light italic text-accent">confidence</span> of a student who
          finally grasps a complex concept, the efficiency of an educator who gains hours back in
          their day, and the growth of an organization that hires with absolute clarity.
        </Reveal>

        <Reveal className="grid gap-px border border-line bg-line md:grid-cols-3">
          {impactColumns.map((col) => (
            <div key={col.tag} className="bg-ink-900 p-8">
              <span className="mb-3.5 block font-mono text-[11px] text-slate-dim">{col.tag}</span>
              <h3 className="mb-3.5 font-display text-xl font-normal">{col.title}</h3>
              <p className="text-[14.5px] text-slate">{col.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
