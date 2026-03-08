"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { heroContent } from "@/data/hero";
import { Button } from "@/components/ui/Button";
import { VimeoEmbed } from "@/components/ui/VimeoEmbed";
import { FilmGrain } from "@/components/effects/FilmGrain";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY < window.innerHeight) {
        setScrollY(window.scrollY);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const translateY = scrollY * 0.3;

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Layer 1: Video background with parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.15}px) scale(1.1)` }}
      >
        <VimeoEmbed vimeoId={heroContent.vimeoId} mode="background" />
      </div>

      {/* Layer 1.5: Film grain texture */}
      <FilmGrain className="z-[1]" />

      {/* Layer 2: Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Layer 3: Content with parallax */}
      <div
        className="relative z-10 flex min-h-screen items-center justify-center"
        style={{ opacity, transform: `translateY(${translateY}px)` }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
            {heroContent.headline}
          </h1>
          <p className="mt-6 font-heading text-lg tracking-wide text-body md:text-xl">
            {heroContent.tagline}
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={heroContent.ctaWork.href}>
              {heroContent.ctaWork.label}
            </Button>
            <Button variant="cta" href={heroContent.ctaContact.href}>
              {heroContent.ctaContact.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <a
        href="#work"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll to work section"
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-foreground/40" />
      </a>
    </section>
  );
}
