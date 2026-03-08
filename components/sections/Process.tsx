"use client";

import { processSteps } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";

export function Process() {
  return (
    <SectionWrapper id="process">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        The Process
      </h2>

      <ScrollReveal className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step) => (
          <ScrollRevealItem key={step.id}>
            <div
              className="rounded-sm border border-foreground/10 p-8 transition-colors duration-300 hover:border-gold/40"
            >
              <span className="font-heading text-4xl font-bold text-foreground/10">
                {String(step.number).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-heading">
                {step.title}
              </h3>
              <p className="mt-3 text-base text-body md:text-lg">
                {step.description}
              </p>
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollReveal>
    </SectionWrapper>
  );
}
