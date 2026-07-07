"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { domainLinks, navLinks } from "@/lib/content";
import { Menu, X, Sparkles } from "lucide-react";

// Types
interface NavLink {
  label: string;
  href: string;
}

// Logo Component
const LogoMark: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 26 26" className={`h-[26px] w-[26px] ${className}`}>
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

// Domain Links Component
const DomainLinks: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="hidden md:block">
    <div className="mx-auto flex max-w-container px-8 pt-5 font-mono text-[11px]">
      {domainLinks.map((label, i) => (
        <Link
          key={label}
          href="#domains"
          onClick={onClose}
          className={`group relative py-[7px] pr-4 text-slate-dim transition-all duration-300 hover:text-cyan ${
            i !== domainLinks.length - 1 ? "mr-4 border-r border-line/60 pr-4" : ""
          }`}
        >
          {label}
          <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
    </div>
  </div>
);

// Navigation Links Component
const NavLinks: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12.5px] tracking-wide">
    {navLinks.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          onClick={onClose}
          className="group relative pb-1 text-slate transition-colors duration-300 hover:text-paper"
        >
          {link.label}
          <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent to-cyan transition-all duration-300 group-hover:w-full" />
        </Link>
      </li>
    ))}
  </ul>
);

// Main Header Component
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        const toggleButton = document.getElementById("menu-toggle");
        if (toggleButton && !toggleButton.contains(e.target as Node)) {
          closeMenu();
        }
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeMenu]);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        id="menu-toggle"
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="site-nav-panel"
        className="group fixed right-6 top-6 z-[600] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-accent to-cyan text-ink-900 shadow-[0_6px_24px_rgba(0,0,0,0.4)] ring-2 ring-ink-900/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_32px_rgba(52,224,152,0.3)] active:scale-95"
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        {isOpen ? (
          <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <Menu className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        )}
      </button>

      {/* Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-[580] bg-ink-900/60 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Navigation Panel */}
      <div
        ref={panelRef}
        id="site-nav-panel"
        className={`fixed inset-x-0 top-0 z-[590] border-b border-line/30 bg-ink-900/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        {/* Domain Links - Desktop */}
        <DomainLinks onClose={closeMenu} />

        {/* Main Navigation */}
        <div className="mx-auto max-w-container px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Logo */}
            <Link
              href="#top"
              onClick={closeMenu}
              className="group flex items-center gap-3 font-display text-xl font-semibold transition-all duration-300 hover:text-accent"
            >
              <div className="relative">
                <LogoMark />
                <div className="absolute -inset-2 rounded-full bg-accent/0 opacity-0 blur-xl transition-all duration-500 group-hover:bg-accent/20 group-hover:opacity-100" />
              </div>
              <div>
                <span className="relative">
                  SmarterNX
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </span>
                <small className="mt-0.5 block font-mono text-[9px] font-normal tracking-[0.14em] text-slate-dim">
                  AI PRODUCT COMPANY
                </small>
              </div>
            </Link>

            {/* Navigation Links */}
            <NavLinks onClose={closeMenu} />

            {/* CTA Button */}
            <Link
              href="#products"
              onClick={closeMenu}
              className="group relative overflow-hidden rounded-full px-6 py-3 font-mono text-[13px] font-medium text-ink-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Ecosystem
                <Sparkles className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-[#5eebae] to-accent bg-[length:200%_auto] animate-gradient" />
              <span className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </div>
        </div>

        {/* Mobile Domain Links */}
        <div className="border-t border-line/30 px-8 py-4 md:hidden">
          <div className="flex flex-wrap gap-3 font-mono text-[10px]">
            {domainLinks.map((label) => (
              <Link
                key={label}
                href="#domains"
                onClick={closeMenu}
                className="rounded-full border border-line/30 px-3 py-1.5 text-slate-dim transition-all duration-300 hover:border-accent/30 hover:text-accent hover:shadow-lg hover:shadow-accent/5"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}