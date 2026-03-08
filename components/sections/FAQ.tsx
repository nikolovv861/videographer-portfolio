"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { faqItems } from "@/data/faq";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq">
      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Frequently Asked Questions
      </h2>
      <ScrollReveal className="mx-auto mt-12 max-w-3xl divide-y divide-white/10">
        {faqItems.map((item, index) => (
          <ScrollRevealItem key={index}>
            <div className="py-5">
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-base font-medium text-foreground md:text-lg">
                  {item.question}
                </span>
                <span
                  className="ml-4 flex-shrink-0 text-gold transition-transform duration-300"
                  style={{
                    transform:
                      openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? "200px" : "0px",
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <p className="pt-3 text-sm leading-relaxed text-body md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollReveal>
    </SectionWrapper>
  );
}
