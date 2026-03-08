"use client";

import { heroContent } from "@/data/hero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { VimeoEmbed } from "@/components/ui/VimeoEmbed";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";

export function Showreel() {
  return (
    <SectionWrapper id="showreel">
      <ScrollReveal className="text-center">
        <ScrollRevealItem>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
            Showreel
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-body md:text-lg">
            A curated selection of my best work across commercials, brand films,
            and social content.
          </p>
        </ScrollRevealItem>
      </ScrollReveal>

      {/* Vimeo player embed */}
      <ScrollReveal className="mt-16">
        <ScrollRevealItem>
          <VimeoEmbed vimeoId={heroContent.vimeoId} mode="player" />
        </ScrollRevealItem>
      </ScrollReveal>

      {/* Navigation buttons */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="#showreel">Watch Showreel</Button>
        <Button variant="cta" href="#work">
          See All Work
        </Button>
      </div>
    </SectionWrapper>
  );
}
