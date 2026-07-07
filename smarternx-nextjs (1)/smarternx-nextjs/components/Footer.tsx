import Link from "next/link";
import { footerColumns, legalLinks } from "@/lib/content";

interface FooterColumnProps {
  heading: string;
  links: string[];
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, className = "" }) => (
  <Link 
    href={href} 
    className={`text-sm text-slate transition-all duration-300 hover:text-accent hover:translate-x-0.5 ${className}`}
  >
    {children}
  </Link>
);

const FooterColumn: React.FC<FooterColumnProps> = ({ heading, links }) => (
  <div>
    <h4 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-slate-dim">
      {heading}
    </h4>
    <ul className="flex flex-col gap-2.5">
      {links.map((link) => (
        <li key={link}>
          <FooterLink href="#">{link}</FooterLink>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line/50 bg-ink-900/50 backdrop-blur-sm px-8 pt-20 pb-8">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-accent/[0.02] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-purple/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-container">
        {/* Main footer grid */}
        <div className="mb-14 grid gap-12 md:grid-cols-6">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link 
              href="#top" 
              className="group inline-block font-display text-2xl font-semibold tracking-tight transition-all duration-300 hover:text-accent"
            >
              SmarterNX
              <span className="block h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
            <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-slate/80">
              Democratizing Intelligence. One Domain at a Time.
            </p>
            
            {/* Social links (optional) */}
            <div className="mt-6 flex gap-3">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="rounded-full border border-line/30 p-2.5 text-slate-dim transition-all duration-300 hover:border-accent/30 hover:text-accent hover:shadow-lg hover:shadow-accent/5"
                  aria-label={social}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer columns */}
          {footerColumns.map((col) => (
            <FooterColumn key={col.heading} heading={col.heading} links={col.links} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/30 pt-6 font-mono text-xs text-slate-dim">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/50" />
            © {currentYear} SmarterNX. All rights reserved.
          </span>
          
          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="transition-all duration-300 hover:text-accent hover:translate-y-[-1px]"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}