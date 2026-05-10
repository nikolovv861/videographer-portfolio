"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { clients } from "@/data/clients";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealHeading } from "@/components/effects/RevealHeading";
import { useT } from "@/lib/i18n";

const FAST_PX_PER_SEC = 180;  // base scroll speed
const SLOW_PX_PER_SEC = 28;   // when hovered
const EASE = 0.08;            // how quickly current speed eases toward target (0–1)

export function Clients() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);          // current translateX
  const speedRef = useRef(FAST_PX_PER_SEC);
  const targetSpeedRef = useRef(FAST_PX_PER_SEC);
  const halfWidthRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Duplicate list so the marquee can loop seamlessly
  const reel = [...clients, ...clients];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure half-width once (width of the first copy of the list)
    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    let raf = 0;
    const tick = (t: number) => {
      const last = lastTimeRef.current ?? t;
      const dt = (t - last) / 1000;
      lastTimeRef.current = t;

      // Ease current speed toward target speed (no jump)
      speedRef.current += (targetSpeedRef.current - speedRef.current) * EASE;

      offsetRef.current -= speedRef.current * dt;

      const half = halfWidthRef.current;
      if (half > 0 && offsetRef.current <= -half) {
        offsetRef.current += half;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const onEnter = () => {
    targetSpeedRef.current = SLOW_PX_PER_SEC;
  };
  const onLeave = () => {
    targetSpeedRef.current = FAST_PX_PER_SEC;
  };

  const t = useT();

  return (
    <SectionWrapper id="clients" fullBleed>
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-center font-heading text-[0.7rem] uppercase tracking-[0.3em] text-gold">
          {t("clients.eyebrow")}
        </p>
        <RevealHeading className="mt-3 text-center font-heading text-4xl font-extrabold tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl">
          {t("clients.title")}
        </RevealHeading>
      </div>

      <div
        ref={wrapRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="relative mt-16 overflow-hidden border-y border-foreground/10"
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {reel.map((client, i) => {
            const Cell = (
              <div className="flex h-32 min-w-[260px] flex-shrink-0 items-center justify-center border-r border-foreground/10 px-12 transition-opacity duration-300 md:h-40 md:min-w-[320px] md:px-16">
                {client.logoUrl ? (
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    width={240}
                    height={120}
                    className="max-h-16 w-auto object-contain opacity-70 transition-all duration-300 hover:opacity-100 md:max-h-20"
                  />
                ) : (
                  <span className="font-heading text-xl tracking-wide text-heading/80 whitespace-nowrap">
                    {client.name}
                  </span>
                )}
              </div>
            );

            return client.website ? (
              <a
                key={`${client.id}-${i}`}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                title={client.name}
                aria-label={client.name}
                className="block"
              >
                {Cell}
              </a>
            ) : (
              <div
                key={`${client.id}-${i}`}
                className="block"
                title={client.name}
                aria-label={client.name}
              >
                {Cell}
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
