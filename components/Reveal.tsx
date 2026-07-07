"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    // @ts-expect-error — dynamic tag with a shared ref is intentional here
    <Tag ref={ref} className={`reveal ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
