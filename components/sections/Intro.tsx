"use client";

import { motion } from "motion/react";
import { useT } from "@/lib/i18n";

export function Intro() {
  const t = useT();
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
          {t("intro.eyebrow")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-8 font-heading text-4xl font-extrabold tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("intro.headline.1")}
          <br className="hidden md:block" /> {t("intro.headline.2")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-base text-body md:text-lg"
        >
          {t("intro.body")}
        </motion.p>
      </div>
    </section>
  );
}
