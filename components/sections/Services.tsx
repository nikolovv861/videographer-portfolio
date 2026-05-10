"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Camera,
  Clapperboard,
  Film,
  Smartphone,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealHeading } from "@/components/effects/RevealHeading";
import { useT, dict } from "@/lib/i18n";

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Clapperboard,
  Film,
  Smartphone,
  Sparkles,
  Video,
};

const titleKeyById: Record<string, keyof typeof dict> = {
  photography: "services.photography.title",
  "product-video": "services.productVideo.title",
  "short-form": "services.shortForm.title",
  "social-content": "services.socialContent.title",
};
const descKeyById: Record<string, keyof typeof dict> = {
  photography: "services.photography.desc",
  "product-video": "services.productVideo.desc",
  "short-form": "services.shortForm.desc",
  "social-content": "services.socialContent.desc",
};

export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = iconMap[current.icon];
  const t = useT();

  return (
    <SectionWrapper id="services">
      <RevealHeading className="font-heading text-4xl font-extrabold tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl">
        {t("services.title")}
      </RevealHeading>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: nav */}
        <div className="lg:col-span-4">
          <ul className="space-y-1">
            {services.map((sv, i) => (
              <li key={sv.id}>
                <button
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-baseline gap-4 border-l-2 py-3 pl-5 text-left font-heading text-2xl font-bold transition-all md:text-3xl ${
                    active === i
                      ? "border-gold text-heading"
                      : "border-foreground/10 text-body hover:text-heading"
                  }`}
                  style={{ letterSpacing: "-0.025em" }}
                >
                  <span className="text-xs text-foreground/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {titleKeyById[sv.id] ? t(titleKeyById[sv.id]) : sv.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: detail */}
        <div className="lg:col-span-8">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-sm border border-foreground/10 p-8 md:p-10"
          >
            {Icon && <Icon className="h-10 w-10 text-gold" strokeWidth={1.5} />}
            <h3
              className="mt-6 font-heading text-4xl font-extrabold text-heading md:text-5xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              {titleKeyById[current.id] ? t(titleKeyById[current.id]) : current.title}
            </h3>
            <p className="mt-6 max-w-xl text-base text-body md:text-lg">
              {descKeyById[current.id] ? t(descKeyById[current.id]) : current.description}
            </p>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
