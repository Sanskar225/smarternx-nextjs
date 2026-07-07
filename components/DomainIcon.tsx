import { memo, useMemo } from "react";

type IconName = "cap" | "heart" | "briefcase" | "pulse" | "network";

interface DomainIconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  size?: number | string;
  color?: string;
}

// Path definitions with proper typing
const PATHS: Record<IconName, React.ReactNode> = {
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

// Color mapping with proper typing
const COLOR_MAP: Record<IconName, string> = {
  cap: "text-accent",
  heart: "text-cyan",
  briefcase: "text-purple",
  pulse: "text-orange",
  network: "text-accent",
};

// Individual icon components for better performance
const CapIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
    <path d="M2 8l10-5 10 5-10 5-10-5z" />
    <path d="M6 10.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-5.5" />
  </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
    <path d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.6 5 6.3 5c2 0 3.2 1 3.7 2 .5-1 1.7-2 3.7-2 3.7 0 5.6 3.9 3.8 7.5C19 16.65 12 21 12 21z" />
  </svg>
);

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
    <rect x="4" y="7" width="16" height="12" rx="1" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);

const PulseIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
    <path d="M6 20l4-8 3 4 2-3 3 7" />
    <circle cx="12" cy="12" r="9.5" />
  </svg>
);

const NetworkIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <circle cx="12" cy="18" r="2.4" />
    <path d="M8 7.2 10.5 16 M16 7.2 13.5 16 M8.4 6h7.2" />
  </svg>
);

// Icon component map
const ICON_COMPONENTS: Record<IconName, React.FC<{ className?: string }>> = {
  cap: CapIcon,
  heart: HeartIcon,
  briefcase: BriefcaseIcon,
  pulse: PulseIcon,
  network: NetworkIcon,
};

// Main DomainIcon component with memoization
const DomainIcon: React.FC<DomainIconProps> = memo(({ 
  name, 
  className = "", 
  strokeWidth = 1.4,
  size = 34,
  color 
}) => {
  const IconComponent = ICON_COMPONENTS[name];
  const colorClass = color || COLOR_MAP[name] || "text-current";
  
  const sizeClass = useMemo(() => {
    if (typeof size === "number") {
      return `h-[${size}px] w-[${size}px]`;
    }
    return size;
  }, [size]);

  return (
    <IconComponent 
      className={`${sizeClass} ${colorClass} ${className}`}
    />
  );
});

DomainIcon.displayName = "DomainIcon";

export default DomainIcon;

// Helper function to get icon color
export const getIconColor = (name: IconName): string => {
  return COLOR_MAP[name] || "text-current";
};

// Helper function to get all icon names
export const getIconNames = (): IconName[] => {
  return Object.keys(COLOR_MAP) as IconName[];
};