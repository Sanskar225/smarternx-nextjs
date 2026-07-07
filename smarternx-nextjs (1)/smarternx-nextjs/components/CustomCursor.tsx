"use client";

import { useEffect, useRef, useCallback } from "react";

interface CustomCursorProps {
  /**
   * Speed of the ring following the cursor (0-1)
   * Higher = faster following
   * @default 0.18
   */
  followSpeed?: number;
  
  /**
   * Size of the dot in pixels
   * @default 5
   */
  dotSize?: number;
  
  /**
   * Size of the ring in pixels
   * @default 30
   */
  ringSize?: number;
  
  /**
   * Whether to show cursor on all devices
   * @default false (only shows on devices with hover capability)
   */
  forceShow?: boolean;
}

interface Position {
  x: number;
  y: number;
}

export default function CustomCursor({ 
  followSpeed = 0.18, 
  dotSize = 5, 
  ringSize = 30,
  forceShow = false 
}: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const mousePosition = useRef<Position>({ x: 0, y: 0 });
  const ringPosition = useRef<Position>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const isHovering = useRef(false);

  // Check if device supports hover
  const hasHover = useCallback(() => {
    if (forceShow) return true;
    return window.matchMedia("(hover: hover)").matches;
  }, [forceShow]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dot = dotRef.current;
    if (!dot) return;

    mousePosition.current.x = e.clientX;
    mousePosition.current.y = e.clientY;

    // Update dot position immediately
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  }, []);

  // Animation loop for smooth ring following
  const animateRing = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const dx = mousePosition.current.x - ringPosition.current.x;
    const dy = mousePosition.current.y - ringPosition.current.y;

    ringPosition.current.x += dx * followSpeed;
    ringPosition.current.y += dy * followSpeed;

    ring.style.left = `${ringPosition.current.x}px`;
    ring.style.top = `${ringPosition.current.y}px`;

    animationFrame.current = requestAnimationFrame(animateRing);
  }, [followSpeed]);

  // Handle hover states on interactive elements
  const handleInteractiveHover = useCallback((ring: HTMLDivElement) => {
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button'], [data-cursor-hover]"
    );

    const onEnter = () => {
      isHovering.current = true;
      ring.classList.add("scale-150", "border-accent", "bg-accent/10");
      ring.style.width = `${ringSize * 1.5}px`;
      ring.style.height = `${ringSize * 1.5}px`;
    };

    const onLeave = () => {
      isHovering.current = false;
      ring.classList.remove("scale-150", "border-accent", "bg-accent/10");
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [ringSize]);

  // Handle visibility based on hover capability
  const handleVisibility = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const showCursor = hasHover();
    const action = showCursor ? "add" : "remove";
    dot.classList[action]("md:block");
    ring.classList[action]("md:block");
  }, [hasHover]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initialize positions
    ringPosition.current.x = window.innerWidth / 2;
    ringPosition.current.y = window.innerHeight / 2;

    // Set initial positions
    dot.style.left = `${ringPosition.current.x}px`;
    dot.style.top = `${ringPosition.current.y}px`;
    ring.style.left = `${ringPosition.current.x}px`;
    ring.style.top = `${ringPosition.current.y}px`;

    // Set initial sizes
    dot.style.width = `${dotSize}px`;
    dot.style.height = `${dotSize}px`;
    ring.style.width = `${ringSize}px`;
    ring.style.height = `${ringSize}px`;

    // Show/hide cursor based on device
    handleVisibility();

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleVisibility);

    // Start animation loop
    animationFrame.current = requestAnimationFrame(animateRing);

    // Setup hover effects
    const cleanupHover = handleInteractiveHover(ring);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleVisibility);
      
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      
      cleanupHover();
    };
  }, [
    handleMouseMove, 
    animateRing, 
    handleInteractiveHover, 
    handleVisibility, 
    dotSize, 
    ringSize
  ]);

  return (
    <>
      {/* Dot - follows cursor instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
        style={{
          width: dotSize,
          height: dotSize,
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
      
      {/* Ring - follows with delay */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate/50 transition-all duration-200 ease-out md:block"
        style={{
          width: ringSize,
          height: ringSize,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
        }}
      />
    </>
  );
}