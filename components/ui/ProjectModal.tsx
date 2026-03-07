"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Project } from "@/lib/types";
import { useScrollLock } from "@/hooks/useScrollLock";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-body/60">{label}</p>
      <p className="mt-1 text-sm text-heading">{value}</p>
    </div>
  );
}

function NarrativeSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div>
      <h3 className="font-heading text-xl font-semibold text-heading">
        {title}
      </h3>
      <p className="mt-3 text-body leading-relaxed">{content}</p>
    </div>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useScrollLock(true);

  // Animate in
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Escape key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-y-auto bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal content container */}
      <div
        className={`relative z-[110] mx-auto my-8 w-full max-w-5xl px-4 transition-transform duration-300 sm:px-6 ${
          mounted ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-0 z-20 p-2 text-foreground/60 transition-colors hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Hero video area */}
        <div className="aspect-video overflow-hidden rounded bg-foreground/5">
          {project.vimeoId ? (
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=0&title=0&byline=0&portrait=0`}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={project.title}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-body/40">
              Video coming soon
            </div>
          )}
        </div>

        {/* Metadata bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetadataItem label="Client" value={project.client} />
          <MetadataItem label="Year" value={project.year} />
          <MetadataItem label="Role" value={project.role} />
          <MetadataItem label="Type" value={project.type} />
        </div>

        {/* Narrative sections */}
        <div className="mt-12 space-y-12">
          <NarrativeSection
            title="The Challenge"
            content={project.challenge}
          />
          <NarrativeSection title="The Approach" content={project.approach} />
          <NarrativeSection title="The Result" content={project.result} />
        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-4 pb-8 md:grid-cols-3">
            {project.gallery.map((url, index) => (
              <img
                key={url}
                src={url}
                alt={`${project.title} gallery image ${index + 1}`}
                className="aspect-video rounded bg-foreground/5 object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
