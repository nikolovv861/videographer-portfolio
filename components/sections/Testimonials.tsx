"use client";

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealHeading } from "@/components/effects/RevealHeading";
import { useT } from "@/lib/i18n";

const FAST_PX_PER_SEC = 60;
const SLOW_PX_PER_SEC = 12;
const EASE = 0.08;

interface MarqueeRowProps {
  items: typeof testimonials;
  direction?: "left" | "right";
  maskAngle?: number; // angle of the diagonal edge fade, in degrees off vertical
}

function MarqueeRow({
  items,
  direction = "left",
  maskAngle = 8,
}: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(FAST_PX_PER_SEC);
  const targetSpeedRef = useRef(FAST_PX_PER_SEC);
  const halfWidthRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const reel = [...items, ...items, ...items];
  const dir = direction === "left" ? -1 : 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 3;
      // Start the right-moving row partly offset so it doesn't snap on first wrap
      if (direction === "right" && offsetRef.current === 0) {
        offsetRef.current = -halfWidthRef.current;
      }
    };
    measure();
    window.addEventListener("resize", measure);

    let raf = 0;
    const tick = (t: number) => {
      const last = lastTimeRef.current ?? t;
      const dt = (t - last) / 1000;
      lastTimeRef.current = t;

      speedRef.current += (targetSpeedRef.current - speedRef.current) * EASE;
      offsetRef.current += dir * speedRef.current * dt;

      const half = halfWidthRef.current;
      if (half > 0) {
        if (offsetRef.current <= -half) offsetRef.current += half;
        else if (offsetRef.current >= 0) offsetRef.current -= half;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [dir, direction]);

  const onEnter = () => (targetSpeedRef.current = SLOW_PX_PER_SEC);
  const onLeave = () => (targetSpeedRef.current = FAST_PX_PER_SEC);

  // Slanted feathered fade applied as a CSS mask — content stays
  // horizontal, but the in/out edges are diagonal and softly blur to nothing.
  const angle = 90 - maskAngle; // 0deg=horizontal, 90deg=vertical
  const mask = `linear-gradient(${angle}deg, transparent 0%, rgba(0,0,0,0.45) 10%, #000 22%, #000 78%, rgba(0,0,0,0.45) 90%, transparent 100%)`;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative overflow-hidden"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-6 py-4 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {reel.map((t, i) => (
          <figure
            key={`${t.id}-${i}`}
            className="flex h-full w-[26rem] flex-shrink-0 flex-col rounded-md border border-foreground/10 bg-foreground/[0.02] p-7 transition-colors duration-300 hover:border-gold/40"
          >
            <Quote className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <blockquote className="mt-4 text-base leading-relaxed text-body">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-foreground/10 pt-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 font-heading text-xs font-bold uppercase text-gold ring-1 ring-gold/30">
                {t.name.slice(0, 1)}
              </span>
              <div className="leading-tight">
                <p className="font-heading text-xs font-bold uppercase tracking-wider text-heading">
                  {t.name}
                </p>
                <p className="mt-0.5 text-xs text-body">{t.company}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = useT();
  return (
    <SectionWrapper id="testimonials" fullBleed>
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-gold">
          {t("testimonials.eyebrow")}
        </p>
        <RevealHeading className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl">
          {t("testimonials.title")}
        </RevealHeading>
      </div>

      <div className="relative mt-16 space-y-5 py-10">
        {/* Rows stay horizontal; each row has its own slanted feathered mask
            so the cards "appear/disappear" through diagonal soft borders. */}
        <MarqueeRow items={testimonials} direction="left" maskAngle={10} />
        <MarqueeRow items={testimonials} direction="right" maskAngle={-10} />
      </div>
    </SectionWrapper>
  );
}
