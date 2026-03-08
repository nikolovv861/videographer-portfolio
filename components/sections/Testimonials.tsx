"use client";

import { testimonials } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        Testimonials
      </h2>
      <ScrollReveal className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <ScrollRevealItem key={testimonial.id}>
            <div
              className="rounded-sm border border-foreground/10 p-8 transition-colors duration-300 hover:border-gold/40"
            >
              <blockquote className="text-base text-body md:text-lg">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="font-heading text-sm font-semibold text-heading">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-body">{testimonial.company}</p>
              </div>
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollReveal>
    </SectionWrapper>
  );
}
