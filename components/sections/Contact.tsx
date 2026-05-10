"use client";

import { Calendar, FileText } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";
import { RevealHeading } from "@/components/effects/RevealHeading";
import { openCalendlyPopup } from "@/components/ui/CalendlyEmbed";
import { openTallyPopup } from "@/components/ui/TallyEmbed";
import { useT } from "@/lib/i18n";

const CALENDLY_URL = "https://calendly.com/kerezov12";
const TALLY_FORM_ID = "obKV6b";

export function Contact() {
  const t = useT();
  return (
    <SectionWrapper id="contact">
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <ScrollRevealItem>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-gold">
            {t("contact.eyebrow")}
          </p>
          <RevealHeading className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl">
            {t("contact.title")}
          </RevealHeading>
          <p className="mt-6 text-base text-body md:text-lg">
            {t("contact.body")}
          </p>
        </ScrollRevealItem>
      </ScrollReveal>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Book a Call → Calendly popup */}
        <button
          type="button"
          onClick={() => openCalendlyPopup(CALENDLY_URL)}
          className="group flex h-full flex-col rounded-sm border border-foreground/10 bg-foreground/[0.02] p-8 text-left transition-all duration-300 hover:border-gold/40 hover:bg-foreground/[0.04]"
        >
          <Calendar
            className="h-8 w-8 text-gold transition-transform duration-300 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
          <h3
            className="mt-6 font-heading text-3xl font-extrabold text-heading md:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("contact.bookCall.title")}
          </h3>
          <p className="mt-3 text-base text-body">
            {t("contact.bookCall.desc")}
          </p>
          <span className="mt-6 inline-block font-heading text-xs uppercase tracking-[0.25em] text-gold">
            {t("contact.bookCall.cta")}
          </span>
        </button>

        {/* Start a Project → Tally popup */}
        <button
          type="button"
          onClick={() => openTallyPopup(TALLY_FORM_ID)}
          className="group flex h-full flex-col rounded-sm border border-foreground/10 bg-foreground/[0.02] p-8 text-left transition-all duration-300 hover:border-gold/40 hover:bg-foreground/[0.04]"
        >
          <FileText
            className="h-8 w-8 text-gold transition-transform duration-300 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
          <h3
            className="mt-6 font-heading text-3xl font-extrabold text-heading md:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("contact.startProject.title")}
          </h3>
          <p className="mt-3 text-base text-body">
            {t("contact.startProject.desc")}
          </p>
          <span className="mt-6 inline-block font-heading text-xs uppercase tracking-[0.25em] text-gold">
            {t("contact.startProject.cta")}
          </span>
        </button>
      </div>
    </SectionWrapper>
  );
}
