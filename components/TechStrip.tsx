const stack = ["Next.js", "TypeScript", "Tailwind CSS"];

export default function TechStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] text-slate-dim">
      <span className="text-slate-dim/70">Built with</span>
      {stack.map((item) => (
        <span key={item} className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-slate-dim" />
          {item}
        </span>
      ))}
    </div>
  );
}
