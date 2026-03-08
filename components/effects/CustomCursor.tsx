"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function useIsDesktopPointer(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]";

export function CustomCursor() {
  const isDesktop = useIsDesktopPointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const ringX = useSpring(cursorX, { stiffness: 400, damping: 28 });
  const ringY = useSpring(cursorY, { stiffness: 400, damping: 28 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const hovering = !!target?.closest?.(INTERACTIVE_SELECTOR);
      setIsHovering(hovering);
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, prefersReducedMotion, handleMouseMove]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <>
      {/* Ring cursor */}
      <motion.div
        className="pointer-events-none fixed z-[90] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/60"
        style={{
          left: ringX,
          top: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering
            ? "rgba(201,169,110,0.3)"
            : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
