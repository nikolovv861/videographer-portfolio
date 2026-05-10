"use client";

import { motion } from "motion/react";

export function Intro() {
  return (
    <section className="relative px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-gold"
        >
          Boutique content studio
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-8 font-heading text-4xl font-extrabold tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Cinematic photo and video content
          <br className="hidden md:block" /> for premium brands.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-base text-body md:text-lg"
        >
          We partner with bold consumer, fashion, and lifestyle labels to
          translate identity into visuals worth watching, sharing, and
          remembering &mdash; from cinematic brand films and product video to
          editorial photography and scroll-stopping social content.
        </motion.p>
      </div>
    </section>
  );
}
