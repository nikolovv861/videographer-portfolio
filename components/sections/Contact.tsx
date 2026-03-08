"use client";

import { siteConfig } from "@/data/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";

export function Contact() {
  return (
    <SectionWrapper id="contact">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <ScrollRevealItem>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-6 text-base text-body md:text-lg">
            Have a project in mind? Let&apos;s create something extraordinary
            together.
          </p>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-block text-base text-heading transition-colors duration-300 hover:text-gold md:text-lg"
          >
            {siteConfig.email}
          </a>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="cta" href={`mailto:${siteConfig.email}`}>
              Start a Project
            </Button>
            <Button href="#">Book a Call</Button>
          </div>
        </ScrollRevealItem>
      </ScrollReveal>
    </SectionWrapper>
  );
}
