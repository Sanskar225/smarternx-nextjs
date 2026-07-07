// Single source of truth for site copy and structured content.
// Keeping this separate from components means editing site text
// never requires touching markup or styling.

export const domainLinks = ["Academic", "Healthcare", "Career", "Fitness", "Sports"];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#domains" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { label: "AI Products", value: "6+", isNumeric: false },
  { label: "Domains", value: "5+", isNumeric: false },
  { label: "Students Impacted", value: 50000, isNumeric: true },
  { label: "Institutions", value: 100, isNumeric: true },
  { label: "Possibilities", value: "∞", isNumeric: false },
] as const;

export const domains = [
  {
    id: "DM · 01",
    name: "Education",
    icon: "cap",
  },
  {
    id: "DM · 02",
    name: "Healthcare",
    icon: "heart",
  },
  {
    id: "DM · 03",
    name: "Career",
    icon: "briefcase",
  },
  {
    id: "DM · 04",
    name: "Sports & Fitness",
    icon: "pulse",
  },
  {
    id: "DM · 05",
    name: "Others",
    icon: "network",
  },
] as const;

export type ProductStatus = "live" | "soon";

export const products = [
  {
    id: "SP · 01",
    accentColor: "accent" as const,
    code: "SP",
    name: "SmartPad",
    category: "Academic Growth Ecosystem",
    description:
      "SmartPad is SmarternX's intelligent academic ecosystem built to help students stay consistent, schools stay informed, and learning become measurable — creating a connected environment of structured learning, assessments, and performance insights.",
    cta: "Explore SmartPad ↗",
    status: "live" as ProductStatus,
  },
  {
    id: "GG · 02",
    accentColor: "cyan" as const,
    code: "GG",
    name: "Go-Genius",
    category: "AI Learning Engine",
    description:
      "Go-Genius is SmarternX's long-term learning intelligence platform built to strengthen foundational understanding. Through personalized AI-guided journeys and consistent daily practice, it helps students build lasting academic confidence.",
    cta: "Coming Soon",
    status: "soon" as ProductStatus,
  },
  {
    id: "AI · 03",
    accentColor: "purple" as const,
    code: "AI",
    name: "AI Studio",
    category: "AI Creation Platform",
    description:
      "AI Studio is SmarternX's hands-on AI creation environment — transforming students from technology users into technology creators through visual creation, structured workflows, and real-world exposure.",
    cta: "Explore AI Studio ↗",
    status: "live" as ProductStatus,
  },
  {
    id: "FL · 04",
    accentColor: "orange" as const,
    code: "FL",
    name: "FitLife",
    category: "Intelligent Wellness",
    description:
      "FitLife brings SmarternX's intelligent wellness vision to life — personalized fitness tracking, mood-based workout recommendations, and adaptive routines designed to make healthier living more sustainable.",
    cta: "Explore FitLife ↗",
    status: "live" as ProductStatus,
  },
  {
    id: "CX · 05",
    accentColor: "accent" as const,
    code: "CX",
    name: "CodeX",
    category: "Automated HR Platform",
    description:
      "CodeX explores SmarternX's workforce intelligence vision — combining software skill development with AI-driven hiring support, helping organizations focus on human potential over administrative complexity.",
    cta: "Coming Soon",
    status: "soon" as ProductStatus,
  },
  {
    id: "DR · 06",
    accentColor: "cyan" as const,
    code: "DR",
    name: "Doer",
    category: "Connected Services Platform",
    description:
      "Doer is SmarternX's hyperlocal services ecosystem, connecting people with trusted local providers — bringing the same principle of intelligent, accessible systems to everyday services.",
    cta: "Coming Soon",
    status: "soon" as ProductStatus,
  },
];

export type Product = (typeof products)[number];

export const impactColumns = [
  {
    tag: "FOR STUDENTS",
    title: "Built around the learner",
    body: "Empowering individual learners to find their unique capabilities, bridge foundational gaps in real-time, and build career-ready skills with direct mentorship from intelligent ecosystems.",
  },
  {
    tag: "FOR EDUCATORS",
    title: "Time back for teaching",
    body: "Providing schools and teachers with profound learning visibility and automated administrative relief, so they can focus on what they do best: inspire and cultivate human growth.",
  },
  {
    tag: "FOR ORGANIZATIONS",
    title: "Clarity in every hire",
    body: "Reimagining workforce intelligence with objective candidate sourcing, skill verification platforms, and data-driven hiring support that unblocks latent corporate potential.",
  },
];

export const contactInfo = [
  { tag: "EMAIL", value: "info@smarternx.com" },
  { tag: "PHONE", value: "+91 85805 66749" },
  { tag: "ADDRESS", value: "New Delhi, NCR, India" },
];

export const footerColumns = [
  {
    heading: "About",
    links: ["Our Story", "Mission & Vision", "Founder Message", "Core Values", "Careers"],
  },
  {
    heading: "Products",
    links: ["SmartPad", "Go-Genius", "AI Studio", "FitLife", "CodeX", "Doer"],
  },
  {
    heading: "Solutions",
    links: ["Education", "Healthcare", "Career", "Fitness", "Sports"],
  },
  {
    heading: "Resources",
    links: ["Blog", "Research", "Industry Reports", "Product Updates", "News"],
  },
];

export const legalLinks = ["Privacy Policy", "Terms of Use", "Cookie Policy", "Responsible AI Policy"];
export const heroCopy = {
  badge: "AI-Powered Ecosystem",
  heading: ["One AI.", "Infinite", "Possibilities."],
  paragraph:
    "SmarternX is building intelligent products that empower education, healthcare, career, fitness, sports and everyday life.",
  primaryCta: { label: "Explore Ecosystem", href: "#products" },
  secondaryCta: { label: "Watch Vision", href: "#intro" },
  himalayaTag: {
    title: "Built in the Himalayas",
    subtitle: "Inspired by Himachal Pradesh",
  },
  headquarters: {
    tag: "Our Headquarters",
    place: "Himachal Pradesh, India",
    body: "Inspired by the Mountains. Built for the World.",
  },
};

// left/top are % positions over the hero artwork, matched to where each
// building sits in hero-day.png / hero-night.png. `code` must match a
// product's `code` field above.
export const heroCallouts = [
  { code: "SP", icon: "cap" as const, style: { left: "30%", top: "20%" } },
  { code: "GG", icon: "brain" as const, style: { left: "63%", top: "18.5%" } },
  { code: "AI", icon: "sparkles" as const, style: { left: "83%", top: "38%" } },
  { code: "FL", icon: "heart" as const, style: { left: "80%", top: "60%" } },
  { code: "CX", icon: "code" as const, style: { left: "15%", top: "59%" } },
  { code: "DR", icon: "pin" as const, style: { left: "38%", top: "76%" } },
] as const;