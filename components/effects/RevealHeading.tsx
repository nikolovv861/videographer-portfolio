"use client";

import { motion } from "motion/react";

interface RevealHeadingProps {
  className?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}

export function RevealHeading({
  className,
  children,
  as = "h2",
  delay = 0,
}: RevealHeadingProps) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
