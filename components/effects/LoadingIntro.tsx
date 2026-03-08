"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/data/navigation";
import { FilmGrain } from "@/components/effects/FilmGrain";

// Timing constants (seconds) -- easy to tune
const LINE_EXPAND_DURATION = 0.4;
const BARS_SPLIT_DURATION = 0.6;
const LOGO_FADE_IN_DELAY = 0.8;
const LOGO_FADE_IN_DURATION = 0.5;
const COUNTER_START_DELAY = 0.3;
const COUNTER_DURATION = 2.2;
const REVEAL_START = 2.5;
const REVEAL_DURATION = 0.5;
const RETURN_VISIT_DURATION = 0.5;
const REDUCED_MOTION_DELAY = 100;

// Bar height in pixels
const BAR_HEIGHT = 100;

export function LoadingIntro() {
  const [isComplete, setIsComplete] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [stage, setStage] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const rafRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  // Check reduced motion and session storage
  useEffect(() => {
    mountedRef.current = true;

    // Reduced motion: skip everything
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsComplete(true);
      return;
    }

    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setIsFirstVisit(false);
      // Return visit: quick open
      setStage(5);
      setTimeout(() => {
        if (mountedRef.current) setIsComplete(true);
      }, RETURN_VISIT_DURATION * 1000);
    } else {
      sessionStorage.setItem("hasVisited", "true");
      setIsFirstVisit(true);
      // Start the full sequence
      runFirstVisitSequence();
    }

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runFirstVisitSequence = useCallback(() => {
    // Stage 1: Line expansion
    setStage(1);

    // Stage 2: Bars split
    setTimeout(() => {
      if (mountedRef.current) setStage(2);
    }, LINE_EXPAND_DURATION * 1000);

    // Stage 3: Logo appears
    setTimeout(() => {
      if (mountedRef.current) setStage(3);
    }, LOGO_FADE_IN_DELAY * 1000);

    // Stage 4: Counter starts
    setTimeout(() => {
      if (mountedRef.current) {
        setStage(4);
        animateCounter();
      }
    }, COUNTER_START_DELAY * 1000);

    // Stage 5: Reveal
    setTimeout(() => {
      if (mountedRef.current) {
        setIsRevealing(true);
        setStage(5);
      }
    }, REVEAL_START * 1000);

    // Complete
    setTimeout(() => {
      if (mountedRef.current) setIsComplete(true);
    }, (REVEAL_START + REVEAL_DURATION) * 1000);
  }, []);

  const animateCounter = useCallback(() => {
    const startTime = performance.now();
    const duration = (COUNTER_DURATION - COUNTER_START_DELAY) * 1000;

    const tick = (now: number) => {
      if (!mountedRef.current) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve: fast through middle, slows near 100
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounter(Math.round(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  if (isComplete) return null;

  // Return visit: just the bars sliding away
  if (!isFirstVisit) {
    return (
      <div className="fixed inset-0 z-[200] pointer-events-none" data-testid="loading-intro">
        {/* Top bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-[#0a0a0a]"
          style={{ height: `calc(50% - ${BAR_HEIGHT / 2}px)` }}
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: RETURN_VISIT_DURATION, ease: "easeInOut" }}
        />
        {/* Bottom bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]"
          style={{ height: `calc(50% - ${BAR_HEIGHT / 2}px)` }}
          initial={{ y: 0 }}
          animate={{ y: "100%" }}
          transition={{ duration: RETURN_VISIT_DURATION, ease: "easeInOut" }}
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <div
          className="fixed inset-0 z-[200] pointer-events-none"
          data-testid="loading-intro"
        >
          {/* Stage 1: Expanding center line */}
          {stage === 1 && (
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#c9a96e]"
              style={{ transformOrigin: "center" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: LINE_EXPAND_DURATION, ease: "easeOut" }}
            />
          )}

          {/* Stages 2-5: Letterbox bars */}
          {stage >= 2 && (
            <>
              {/* Top bar */}
              <motion.div
                className="absolute left-0 right-0 bg-[#0a0a0a]"
                style={{ height: BAR_HEIGHT }}
                initial={{ top: "calc(50% - 1px)", height: 2 }}
                animate={
                  stage >= 5
                    ? { top: 0, height: `calc(50% - ${BAR_HEIGHT / 2}px)`, y: "-100%" }
                    : { top: 0, height: `calc(50% - ${BAR_HEIGHT / 2}px)`, y: 0 }
                }
                transition={
                  stage >= 5
                    ? { duration: REVEAL_DURATION, ease: "easeInOut" }
                    : { duration: BARS_SPLIT_DURATION, ease: "easeInOut" }
                }
              />
              {/* Bottom bar */}
              <motion.div
                className="absolute left-0 right-0 bg-[#0a0a0a]"
                style={{ height: BAR_HEIGHT }}
                initial={{ bottom: "calc(50% - 1px)", height: 2 }}
                animate={
                  stage >= 5
                    ? { bottom: 0, height: `calc(50% - ${BAR_HEIGHT / 2}px)`, y: "100%" }
                    : { bottom: 0, height: `calc(50% - ${BAR_HEIGHT / 2}px)`, y: 0 }
                }
                transition={
                  stage >= 5
                    ? { duration: REVEAL_DURATION, ease: "easeInOut" }
                    : { duration: BARS_SPLIT_DURATION, ease: "easeInOut" }
                }
              />

              {/* Desaturation/blur overlay in the slit between bars */}
              {stage >= 2 && stage < 5 && (
                <motion.div
                  className="absolute left-0 right-0"
                  style={{
                    top: `calc(50% - ${BAR_HEIGHT / 2}px)`,
                    height: BAR_HEIGHT,
                    backdropFilter: "blur(2px) grayscale(0.8)",
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                />
              )}
              {/* Focus transition -- blur/grayscale animating to clear */}
              {isRevealing && (
                <motion.div
                  className="absolute left-0 right-0"
                  style={{
                    top: `calc(50% - ${BAR_HEIGHT / 2}px)`,
                    height: BAR_HEIGHT,
                  }}
                  initial={{
                    backdropFilter: "blur(2px) grayscale(0.8)",
                  }}
                  animate={{
                    backdropFilter: "blur(0px) grayscale(0)",
                  }}
                  transition={{ duration: REVEAL_DURATION * 0.6, ease: "easeOut" }}
                />
              )}
            </>
          )}

          {/* Stage 3: Logo/wordmark */}
          {stage >= 3 && stage < 5 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={
                isRevealing
                  ? { opacity: 0, scale: 1.05 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{
                duration: isRevealing ? REVEAL_DURATION * 0.5 : LOGO_FADE_IN_DURATION,
                ease: "easeOut",
              }}
            >
              <span className="font-heading text-2xl tracking-[0.2em] text-[#f5f5f5] uppercase">
                {siteConfig.name}
              </span>
            </motion.div>
          )}

          {/* Stage 4: Percentage counter */}
          {stage >= 4 && stage < 5 && (
            <motion.div
              className="absolute bottom-8 right-8"
              initial={{ opacity: 0 }}
              animate={isRevealing ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-mono text-sm text-[#a0a0a0] tabular-nums">
                {counter}%
              </span>
            </motion.div>
          )}

          {/* Film grain overlay throughout intro */}
          <FilmGrain className="z-[201]" />
        </div>
      )}
    </AnimatePresence>
  );
}
