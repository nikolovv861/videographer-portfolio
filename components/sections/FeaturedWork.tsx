"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import type { Project } from "@/lib/types";
import { ScrollReveal, ScrollRevealItem } from "@/components/effects/ScrollReveal";

export function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionWrapper id="work">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        Featured Work
      </h2>
      <ScrollReveal className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ScrollRevealItem key={project.id}>
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </ScrollRevealItem>
        ))}
      </ScrollReveal>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </SectionWrapper>
  );
}
