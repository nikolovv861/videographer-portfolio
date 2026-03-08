"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { FilmGrain } from "@/components/effects/FilmGrain";

// Timing constants (seconds)
const GOLD_LINE_DURATION = 0.6;
const TEXT_FADE_IN_START = 0.9;
const TEXT_FADE_OUT_START = 3.0;
const REVEAL_START = 3.5;
const REVEAL_DURATION = 0.8;
const TOTAL_DURATION = 4.3;
const RETURN_VISIT_DURATION = 0.5;

export function LoadingIntro() {
  const [isComplete, setIsComplete] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [stage, setStage] = useState<
    "idle" | "line" | "text" | "text-out" | "reveal" | "done"
  >("idle");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Mark main as ready so CSS visibility:hidden is lifted
    const main = document.querySelector("main");
    if (main) main.classList.add("intro-ready");

    // Reduced motion: skip everything
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsComplete(true);
      return;
    }

    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setIsFirstVisit(false);
      setStage("done");
      setTimeout(() => {
        if (mountedRef.current) setIsComplete(true);
      }, RETURN_VISIT_DURATION * 1000);
    } else {
      sessionStorage.setItem("hasVisited", "true");
      setIsFirstVisit(true);
      runSequence();
    }

    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runSequence = useCallback(() => {
    // Gold line draws across center
    setStage("line");

    // Text fades in gently
    setTimeout(() => {
      if (mountedRef.current) setStage("text");
    }, TEXT_FADE_IN_START * 1000);

    // Text fades out
    setTimeout(() => {
      if (mountedRef.current) setStage("text-out");
    }, TEXT_FADE_OUT_START * 1000);

    // Background fades to reveal content
    setTimeout(() => {
      if (mountedRef.current) setStage("reveal");
    }, REVEAL_START * 1000);

    // Done
    setTimeout(() => {
      if (mountedRef.current) setIsComplete(true);
    }, TOTAL_DURATION * 1000);
  }, []);

  if (isComplete) return null;

  // Return visit: fade out solid background
  if (!isFirstVisit) {
    return (
      <div
        className="fixed inset-0 z-[200] pointer-events-none"
        data-testid="loading-intro"
      >
        <motion.div
          className="absolute inset-0 bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: RETURN_VISIT_DURATION, ease: "easeInOut" }}
        />
      </div>
    );
  }

  const showLine = stage === "line";
  const showText = stage === "text";
  const isRevealing = stage === "reveal";

  return (
    <div
      className="fixed inset-0 z-[200] pointer-events-none"
      data-testid="loading-intro"
    >
      {/* Solid black background — fades out at reveal */}
      <motion.div
        className="absolute inset-0 bg-[#0a0a0a]"
        animate={{ opacity: isRevealing ? 0 : 1 }}
        transition={{ duration: REVEAL_DURATION, ease: "easeInOut" }}
      />

      {/* Gold line — draws from center, fades before text */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #c9a96e 20%, #c9a96e 80%, transparent 100%)",
          transformOrigin: "center",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: showLine ? 1 : 1,
          opacity: showLine ? 1 : 0,
        }}
        transition={{
          scaleX: { duration: GOLD_LINE_DURATION, ease: "easeOut" },
          opacity: { duration: showLine ? GOLD_LINE_DURATION : 0.3, ease: "easeOut" },
        }}
      />

      {/* "Nikolay Kerezov presents..." — gentle fade in, then out */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: showText ? 1 : 0,
        }}
        transition={{
          duration: showText ? 1.2 : 0.4,
          ease: "easeInOut",
        }}
      >
        <span
          className="font-heading text-lg md:text-xl tracking-[0.25em] uppercase"
          style={{
            color: "#c9a96e",
            textShadow: "0 0 30px rgba(201,169,110,0.3)",
          }}
        >
          Nikolay Kerezov presents&hellip;
        </span>
      </motion.div>

      {/* Film grain texture */}
      <FilmGrain className="z-[201]" />
    </div>
  );
}
