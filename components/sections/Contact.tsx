"use client";

import { Calendar, FileText } from "lucide-react";
import { siteConfig } from "@/data/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";
import { RevealHeading } from "@/components/effects/RevealHeading";
import { openCalendlyPopup } from "@/components/ui/CalendlyEmbed";
import { openTallyPopup } from "@/components/ui/TallyEmbed";

const CALENDLY_URL = "https://calendly.com/kerezov12";
const TALLY_FORM_ID = "obKV6b";

export function Contact() {
  return (
    <SectionWrapper id="contact">
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <ScrollRevealItem>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-gold">
            Get in touch
          </p>
          <RevealHeading className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-heading md:text-6xl lg:text-7xl">
            Let&rsquo;s start a conversation.
          </RevealHeading>
          <p className="mt-6 text-base text-body md:text-lg">
            Pick the path that works best for you &mdash; jump on a quick call,
            or send over the details of your project.
          </p>
        </ScrollRevealItem>
      </ScrollReveal>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Book a Call → opens Calendly popup */}
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
            Book a Call
          </h3>
          <p className="mt-3 text-base text-body">
            Grab a 30-minute slot on the calendar &mdash; we&rsquo;ll walk
            through your goals and the right approach.
          </p>
          <span className="mt-6 inline-block font-heading text-xs uppercase tracking-[0.25em] text-gold">
            Open scheduler &rarr;
          </span>
        </button>

        {/* Start a Project → opens Tally popup */}
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
            Start a Project
          </h3>
          <p className="mt-3 text-base text-body">
            Tell us about your brand and timeline. We&rsquo;ll come back with a
            tailored proposal within 48 hours.
          </p>
          <span className="mt-6 inline-block font-heading text-xs uppercase tracking-[0.25em] text-gold">
            Open form &rarr;
          </span>
        </button>
      </div>

      <p className="mt-12 text-center text-sm text-body">
        Prefer email?{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-heading underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
        >
          {siteConfig.email}
        </a>
      </p>
    </SectionWrapper>
  );
}
