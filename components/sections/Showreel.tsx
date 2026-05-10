"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";
import { RevealHeading } from "@/components/effects/RevealHeading";

export function Showreel() {
  return (
    <SectionWrapper id="showreel">
      <ScrollReveal className="text-center">
        <ScrollRevealItem>
          <RevealHeading className="font-heading text-5xl font-extrabold tracking-tight text-heading md:text-6xl lg:text-7xl">
            Showreel
          </RevealHeading>
          <p className="mx-auto mt-6 max-w-2xl text-base text-body md:text-lg">
            A curated selection of recent work across commercials, brand films,
            and social content.
          </p>
        </ScrollRevealItem>
      </ScrollReveal>

      <ScrollReveal className="mt-16">
        <ScrollRevealItem>
          <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-sm border border-foreground/10">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] via-transparent to-foreground/[0.03]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40"
              >
                <Play className="h-7 w-7 text-gold" strokeWidth={1.5} />
              </motion.div>
              <p className="font-heading text-xs uppercase tracking-[0.3em] text-gold">
                Reel arriving soon
              </p>
              <p className="max-w-md px-6 text-center text-sm text-body">
                A new showreel is in production. In the meantime, see the
                Featured Work below.
              </p>
            </div>
          </div>
        </ScrollRevealItem>
      </ScrollReveal>
    </SectionWrapper>
  );
}
