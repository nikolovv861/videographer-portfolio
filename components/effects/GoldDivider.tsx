"use client";

import { motion } from "motion/react";

export function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-14">
      <motion.div
        className="h-px w-full max-w-[28rem]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(158,237,30,0.5), transparent)",
          transformOrigin: "center",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-[#9eed1e] shadow-[0_0_12px_rgba(158,237,30,0.7)]"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.div
        className="h-px w-full max-w-[28rem]"
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(158,237,30,0.5), transparent)",
          transformOrigin: "center",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
