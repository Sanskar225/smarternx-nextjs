import Link from "next/link";
import { domainLinks, navLinks } from "@/lib/content";

function LogoMark() {
  return (
    <svg viewBox="0 0 26 26" className="h-[26px] w-[26px]">
      <polygon
        points="13,1 24,7 24,19 13,25 2,19 2,7"
        fill="none"
        stroke="#34e098"
        strokeWidth="1.3"
      />
      <polygon
        points="13,7 19,10.5 19,15.5 13,19 7,15.5 7,10.5"
        fill="none"
        stroke="#5fd3f3"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[500] [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
      {/* Domain quick-nav strip */}
      <div className="hidden md:block">
        <div className="mx-auto flex max-w-container px-8 font-mono text-[11px]">
          {domainLinks.map((label, i) => (
            <Link
              key={label}
              href="#domains"
              className={`py-[7px] pr-4 text-slate-dim transition-colors hover:text-cyan ${
                i !== domainLinks.length - 1 ? "mr-4 border-r border-line/60" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-container px-8">
        <nav className="flex items-center justify-between py-4">
          <Link href="#top" className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <LogoMark />
            <span>
              SmarterNX
              <small className="mt-0.5 block font-mono text-[9px] font-normal tracking-[0.14em] text-slate-dim">
                AI PRODUCT COMPANY
              </small>
            </span>
          </Link>

          <ul className="hidden gap-8 font-mono text-[12.5px] tracking-wide md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative pb-1 text-slate transition-colors hover:text-paper"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#products"
            className="rounded-sm border border-accent bg-accent px-5 py-3 font-mono text-[13px] font-medium text-ink-900 shadow-[0_1px_8px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#5eebae]"
          >
            Explore Ecosystem
          </Link>
        </nav>
      </div>
    </header>
  );
}
