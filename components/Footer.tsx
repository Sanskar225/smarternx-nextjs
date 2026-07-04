import Link from "next/link";
import { footerColumns, legalLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-8 pb-8 pt-20">
      <div className="mx-auto max-w-container">
        <div className="mb-14 grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Link href="#top" className="font-display text-xl font-semibold">
              SmarterNX
            </Link>
            <p className="mt-3.5 max-w-[260px] text-sm text-slate">
              Democratizing Intelligence. One Domain at a Time.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4.5 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-dim">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-slate transition-colors hover:text-accent">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-line pt-6 font-mono text-xs text-slate-dim">
          <span>© 2026 SmarterNX. All rights reserved.</span>
          <div className="flex gap-5">
            {legalLinks.map((link) => (
              <Link key={link} href="#" className="transition-colors hover:text-cyan">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
