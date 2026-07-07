type IconName = "cap" | "brain" | "sparkles" | "heart" | "code" | "pin";

const paths: Record<IconName, JSX.Element> = {
  cap: (
    <>
      <path d="M2 8l10-5 10 5-10 5-10-5z" />
      <path d="M6 10.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-5.5" />
    </>
  ),
  brain: (
    <path d="M12 3c-1.7 0-3 1.3-3 3v.3C7.3 6.8 6 8.3 6 10.1c0 .9.3 1.7.9 2.4-.6.7-.9 1.6-.9 2.5 0 2.2 1.8 4 4 4h.5v1.5a1.5 1.5 0 0 0 3 0V19h.5c2.2 0 4-1.8 4-4 0-.9-.3-1.8-.9-2.5.6-.7.9-1.5.9-2.4 0-1.8-1.3-3.3-3-3.8V6c0-1.7-1.3-3-3-3z" />
  ),
  sparkles: (
    <>
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" />
      <path d="M18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
    </>
  ),
  heart: (
    <path d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.6 5 6.3 5c2 0 3.2 1 3.7 2 .5-1 1.7-2 3.7-2 3.7 0 5.6 3.9 3.8 7.5C19 16.65 12 21 12 21z" />
  ),
  code: <path d="M9 8l-5 4 5 4M15 8l5 4-5 4" />,
  pin: (
    <>
      <path d="M12 21s7-7.6 7-12.4A7 7 0 0 0 5 8.6C5 13.4 12 21 12 21z" />
      <circle cx="12" cy="8.6" r="2.4" />
    </>
  ),
};

export default function ProductIcon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName as ProductIconName };