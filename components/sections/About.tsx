"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { aboutContent } from "@/data/about";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";
import { RevealHeading } from "@/components/effects/RevealHeading";

export function About() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.0, 1.06]);

  return (
    <SectionWrapper id="about">
      <RevealHeading className="font-heading text-5xl font-extrabold tracking-tight text-heading md:text-6xl lg:text-7xl">
        About
      </RevealHeading>
      <ScrollReveal className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollRevealItem>
          <div
            ref={photoRef}
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
          >
            <motion.div
              style={{ y: photoY, scale: photoScale }}
              className="absolute inset-0"
            >
              <Image
                src="/images/founder.jpg"
                alt="Niki Kerezov, founder of Viper Media"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
                priority={false}
              />
            </motion.div>
          </div>
        </ScrollRevealItem>
        <ScrollRevealItem>
          <div className="flex h-full flex-col justify-center">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-gold">
              Founder &mdash; Niki Kerezov
            </p>
            <p className="mt-6 text-base text-body md:text-lg">
              {aboutContent.bio}
            </p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 text-base text-heading/80 italic md:text-lg">
              {aboutContent.philosophy}
            </blockquote>
          </div>
        </ScrollRevealItem>
      </ScrollReveal>
    </SectionWrapper>
  );
}
