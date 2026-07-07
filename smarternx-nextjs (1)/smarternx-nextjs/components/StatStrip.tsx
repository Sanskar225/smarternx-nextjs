"use client";

import { stats } from "@/lib/content";
import { useCountUp } from "@/hooks/useCountUp";

function StatValue({ stat }: { stat: (typeof stats)[number] }) {
  const { ref, display } = useCountUp(stat.isNumeric ? (stat.value as number) : 0);

  if (!stat.isNumeric) {
    return <div className="font-display text-3xl text-accent">{stat.value}</div>;
  }

  return (
    <div ref={ref} className="font-display text-3xl text-paper">
      {display}
    </div>
  );
}

export default function StatStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`py-6 ${
            i !== stats.length - 1 ? "border-r border-line" : ""
          } ${i % 2 === 0 ? "" : "md:border-r"}`}
        >
          <StatValue stat={stat} />
          <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-slate-dim">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
