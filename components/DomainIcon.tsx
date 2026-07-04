type IconName = "cap" | "heart" | "briefcase" | "pulse" | "network";

const paths: Record<IconName, JSX.Element> = {
  cap: (
    <>
      <path d="M2 8l10-5 10 5-10 5-10-5z" />
      <path d="M6 10.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-5.5" />
    </>
  ),
  heart: (
    <path d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.6 5 6.3 5c2 0 3.2 1 3.7 2 .5-1 1.7-2 3.7-2 3.7 0 5.6 3.9 3.8 7.5C19 16.65 12 21 12 21z" />
  ),
  briefcase: (
    <>
      <rect x="4" y="7" width="16" height="12" rx="1" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </>
  ),
  pulse: (
    <>
      <path d="M6 20l4-8 3 4 2-3 3 7" />
      <circle cx="12" cy="12" r="9.5" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M8 7.2 10.5 16 M16 7.2 13.5 16 M8.4 6h7.2" />
    </>
  ),
};

export default function DomainIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="h-[34px] w-[34px] text-cyan"
    >
      {paths[name]}
    </svg>
  );
}
