"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ProjectModal } from "@/components/ui/ProjectModal";
import type { Project } from "@/lib/types";
import { RevealHeading } from "@/components/effects/RevealHeading";

export function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionWrapper id="work">
      <RevealHeading className="font-heading text-5xl font-extrabold tracking-tight text-heading md:text-6xl lg:text-7xl">
        Featured Work
      </RevealHeading>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Sticky left intro */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-gold">
              Selected projects
            </p>
            <h3
              className="mt-3 font-heading text-3xl font-extrabold text-heading md:text-4xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Cinematic work
              <br /> across categories.
            </h3>
            <p className="mt-6 max-w-sm text-base text-body">
              A curated cross-section of recent client work. Click any project
              to open the full case study.
            </p>
          </div>
        </div>

        {/* Right: scrolling rows */}
        <div className="lg:col-span-8">
          <div className="space-y-20">
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setSelectedProject(p)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group block w-full text-left"
              >
                <div className="relative aspect-video overflow-hidden rounded-sm">
                  <img
                    src={p.thumbnailUrl}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {(p.youtubeId || p.vimeoId || p.videoUrl) && (
                    <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold group-hover:text-background">
                      <svg viewBox="0 0 16 16" className="h-4 w-4 translate-x-[1px]" fill="currentColor">
                        <path d="M4 2.5v11l9-5.5z" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <span className="font-heading text-xs uppercase tracking-[0.3em] text-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4
                      className="mt-2 font-heading text-2xl font-extrabold text-heading transition-colors duration-300 group-hover:text-gold md:text-3xl"
                      style={{ letterSpacing: "-0.025em" }}
                    >
                      {p.title}
                    </h4>
                    <p className="mt-1 text-sm text-body">
                      {p.category} · {p.year}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-foreground/40 transition-all duration-300 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </SectionWrapper>
  );
}
