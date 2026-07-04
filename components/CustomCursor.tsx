"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a two-part cursor (a fixed dot + a lagging ring) and
 * enlarges the ring whenever the pointer is over an interactive
 * element. No-op on touch devices — see the CSS `cursor: none`
 * override in globals.css, which is also touch-guarded.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame: number;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMove);
    frame = requestAnimationFrame(loop);

    const interactive = document.querySelectorAll(
      "a, button, input, textarea, [data-cursor-hover]"
    );
    const onEnter = () => ring.classList.add("scale-150", "border-accent");
    const onLeave = () => ring.classList.remove("scale-150", "border-accent");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate transition-all duration-200 ease-out md:block"
      />
    </>
  );
}
