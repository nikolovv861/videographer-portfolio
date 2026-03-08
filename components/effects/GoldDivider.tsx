"use client";

import { motion } from "motion/react";

export function GoldDivider() {
  return (
    <div className="flex justify-center py-8">
      <motion.div
        className="h-px max-w-md w-full bg-gold"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
}
