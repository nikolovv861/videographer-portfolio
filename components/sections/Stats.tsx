"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  description: string;
};

const stats: Stat[] = [
  {
    value: 30,
    suffix: "+",
    label: "Brands worked with",
    description: "Premium consumer, fashion and lifestyle labels.",
  },
  {
    value: 200,
    suffix: "M+",
    label: "Views generated",
    description: "Across Instagram, TikTok and YouTube combined.",
  },
  {
    value: 4,
    suffix: "",
    label: "Years of experience",
    description: "Crafting cinematic content with measurable results.",
  },
  {
    value: 50,
    suffix: "+",
    label: "Campaigns shipped",
    description: "From single-spot promos to ongoing content programs.",
  },
];

function CountUp({
  to,
  inView,
  duration = 2200,
}: {
  to: number;
  inView: boolean;
  duration?: number;
}) {
  const [n, setN] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return <>{n.toLocaleString()}</>;
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  });

  return (
    <section ref={ref} className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.12,
              }}
              className={
                i > 0
                  ? "lg:border-l lg:border-foreground/10 lg:pl-12"
                  : "lg:pl-2"
              }
            >
              <p
                className="font-heading text-6xl font-extrabold leading-[0.95] text-heading md:text-7xl lg:text-[5.25rem]"
                style={{ letterSpacing: "-0.04em" }}
              >
                <CountUp to={s.value} inView={inView} />
                {s.suffix}
              </p>
              <p className="mt-5 font-heading text-base font-semibold tracking-tight text-heading">
                {s.label}
              </p>
              <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-body">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
