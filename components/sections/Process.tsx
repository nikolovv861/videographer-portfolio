"use client";

import { motion } from "motion/react";
import { processSteps } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealHeading } from "@/components/effects/RevealHeading";
import { useT, dict } from "@/lib/i18n";

const titleKeyById: Record<string, keyof typeof dict> = {
  discovery: "process.discovery.title",
  concept: "process.concept.title",
  production: "process.production.title",
  delivery: "process.delivery.title",
};
const descKeyById: Record<string, keyof typeof dict> = {
  discovery: "process.discovery.desc",
  concept: "process.concept.desc",
  production: "process.production.desc",
  delivery: "process.delivery.desc",
};

export function Process() {
  const t = useT();
  return (
    <SectionWrapper id="process">
      <RevealHeading className="font-heading text-4xl font-extrabold tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl">
        {t("process.title")}
      </RevealHeading>

      <div className="mt-20 space-y-24 md:space-y-32">
        {processSteps.map((step, i) => {
          const reverse = i % 2 === 1;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${
                reverse ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span
                  className="block font-heading text-[5rem] font-black leading-[0.85] text-heading/95 sm:text-[8rem] md:text-[12rem] lg:text-[14rem]"
                  style={{ letterSpacing: "-0.06em" }}
                >
                  {String(step.number).padStart(2, "0")}
                </span>
              </div>

              <div className={reverse ? "md:text-right" : ""}>
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-gold">
                  {t("process.step")} {step.number}
                </p>
                <h3
                  className="mt-3 font-heading text-3xl font-extrabold text-heading md:text-4xl lg:text-5xl"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {titleKeyById[step.id] ? t(titleKeyById[step.id]) : step.title}
                </h3>
                <p
                  className={`mt-4 max-w-md text-base text-body md:text-lg ${
                    reverse ? "md:ml-auto" : ""
                  }`}
                >
                  {descKeyById[step.id] ? t(descKeyById[step.id]) : step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
