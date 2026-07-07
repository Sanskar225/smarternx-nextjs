# SmarterNX — Website (Next.js)

A redesign of the SmarterNX marketing site. Same content as the source brief.
The hero background is the actual generated artwork (day + night versions),
with a toggle to switch between them — cross-faded, no layout shift.

## The Vanta.js birds layer

Behind everything (including the mountains/trees) sits an animated
flocking-birds background, powered by [Vanta.js](https://www.vantajs.com/)'s
`BIRDS` effect (`components/VantaBirdsBackground.tsx`). It re-colors with
the day/night toggle — dark background at night, the light `0xdde8e8`
background by day — same two colorful bird flocks either way.

**Why this doesn't repeat the earlier React Three Fiber crash:** Vanta
creates and owns its own Three.js scene imperatively inside a plain `<div>`
— React never hands it a tree to reconcile. There's no host-config/renderer
bridge for a React-version mismatch to break, which is what caused the
`ReactCurrentOwner` crash with `@react-three/fiber`. React's job here stops
at mounting an empty `<div>` and calling `BIRDS({ el, THREE, ... })` on it in
`useEffect`; Vanta does the rest itself, exactly like it would on a
framework-free page.

Two extra things worth knowing:
- `three` is pinned to the exact `0.134.0` build Vanta's `BIRDS` effect
  documents needing — newer Three.js releases have removed APIs
  (`THREE.Geometry`, etc.) that this effect still uses internally.
- The import is a dynamic `import("vanta/dist/vanta.birds.min")` inside
  `useEffect`, not a top-level import — Vanta's bundle touches `window` as
  soon as it's evaluated, which would break Next's server render if it
  loaded eagerly.

To retune the flock (color, quantity, speed, wingspan, etc.), edit the
options object passed to `BIRDS(...)` in that file — every property maps
directly to Vanta's own documented `BIRDS` options.

## The environment backdrop

`components/EnvironmentBackdrop.tsx` is a fixed, full-viewport layer of pure
SVG + CSS — mountain ridgelines, a swaying tree line, a firefly/spark field,
a small car driving along the bottom edge on a loop, and two glowing pulses
drifting down a faint vertical line on the right (echoing the "energy
roads" in the campus artwork) — layered on top of the Vanta birds background
described above. It's rendered in `app/layout.tsx`, *behind* every section,
so scrolling through About/Domains/Products/Impact/Contact all happens over
the same living landscape — the site reads as one continuous environment,
not a hero image followed by plain panels.

It's deliberately dependency-free (no canvas, no WebGL, no animation
library) — after the earlier Three.js/R3F crash, this was rebuilt as
something that structurally cannot throw a runtime error: it's static SVG
markup animated with CSS `@keyframes` (see the "ENVIRONMENT BACKDROP"
section in `app/globals.css`). It also re-themes for free: every shape uses
the existing color tokens (`text-ink-700`, `bg-accent`, `bg-cyan`, ...), so
day/night switching restyles it exactly like everything else, no extra
logic needed.

To adjust density or layout, edit the `TREES` / `FIREFLIES` arrays at the
top of the component — each entry is a plain object (position, size, delay),
no randomness, so the layout is stable across renders and reloads.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS, with the entire color palette driven by CSS variables
  (`app/globals.css`) so one toggle can re-theme the whole site — see
  "Day/night theming" below.
- Plain `next/image` for the hero artwork — two images stacked with a CSS
  opacity cross-fade
- Scroll reveals / stat counters use native `IntersectionObserver` + CSS

## Hero

The hero is pure artwork now — no text or buttons on top of it, just the
day/night toggle in the corner and a scroll cue. Everything that used to be
overlaid on the image (headline, CTAs, overview blurb, stats) lives in
`components/Intro.tsx`, the section the visitor scrolls into right after
the hero.

## Day/night theming

The toggle in the hero does two things at once:

1. Cross-fades `public/images/hero-day.png` ↔ `hero-night.png`.
2. Sets a `data-theme="day" | "night"` attribute on `<html>`, which flips
   every color CSS variable in `app/globals.css` — background, text,
   borders, and the green/cyan/purple/orange accents all have day and night
   values defined once, there.

Because `tailwind.config.ts` maps every `bg-ink-900`, `text-slate`,
`border-line`, etc. to `rgb(var(--c-...))`, **no component needs theme
logic** — they just use the same utility classes and the variables resolve
differently depending on the attribute. `components/ThemeProvider.tsx`
holds the shared state (React context) and persists the choice to
`localStorage`; `app/layout.tsx` includes a small blocking inline script
so the correct theme paints on the very first frame (no flash of the
wrong theme on reload).

To add a third theme or retune colors, edit the two blocks in
`app/globals.css` (`:root` = night, `[data-theme="day"]` = day) — nothing
else needs to change.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
app/
  layout.tsx        Root layout: fonts, no-flash theme script, ThemeProvider
  page.tsx           Composes all sections in order
  globals.css        Day/night CSS variables, resets, grid backdrop, reveal utility

components/
  ThemeProvider.tsx    React context for the shared day/night state (+ localStorage)
  Header.tsx           Domain strip + sticky nav
  Hero.tsx              Full-bleed day/night artwork + toggle + scroll cue only
  Intro.tsx             Headline, CTAs, overview panel, stat strip, tech strip
  DayNightToggle.tsx    Day / Night pill switch used in the hero
  TechStrip.tsx         "Built with ..." badge row
  StatStrip.tsx         Animated count-up stats
  About.tsx            Vision / Mission
  Domains.tsx          5-domain grid
  DomainIcon.tsx        Icon set for the domain cards
  Products.tsx         6-product list (SmartPad, Go-Genius, AI Studio, FitLife, CodeX, Doer)
  Impact.tsx           "Real Impact" — students / educators / organizations
  Contact.tsx          Contact info + client-side demo form
  Footer.tsx           Sitemap + legal links
  CustomCursor.tsx      Dot + lagging ring cursor
  Reveal.tsx            Generic scroll-reveal wrapper

hooks/
  useInView.ts          Backs Reveal
  useCountUp.ts          Backs StatStrip

lib/
  content.ts             All site copy and structured data (nav, domains,
                          products, impact copy, contact info, footer links).
                          Edit text here, not inside components.

public/images/
  hero-day.png            Daytime hero artwork
  hero-night.png           Night hero artwork
```

## Editing content

Every piece of copy on the page — nav links, domain names, product
descriptions, contact details, footer columns — lives in `lib/content.ts`.
Components only render that data, so updating text never requires touching
markup or styling.

## Swapping the hero artwork

Replace `public/images/hero-day.png` / `hero-night.png` with new files of
the same name — no code changes needed.

## Wiring up the contact form

`components/Contact.tsx` currently simulates a submit (shows "Message Sent"
and resets the form). To make it real, add an API route at
`app/api/contact/route.ts` and `fetch` it from the form's `handleSubmit`.

## Notes

- This sandbox couldn't reach `fonts.googleapis.com` to verify the
  `next/font/google` fetch during `npm run build` (network here is
  allowlisted to package registries only) — the code is fully type-checked
  with `tsc --noEmit` (0 errors) and the build gets past webpack compilation,
  failing solely on that font fetch. It will build normally on your machine
  with regular internet access.
- Reduced-motion is respected globally (`globals.css`), and the custom
  cursor is disabled automatically on touch devices.
- Three.js/React Three Fiber were removed from this project entirely in an
  earlier iteration after a persistent, unreproducible dev-mode crash
  (`ReactCurrentOwner` reconciler error). The hero uses plain images now,
  so that whole dependency — and bug class — is gone.
