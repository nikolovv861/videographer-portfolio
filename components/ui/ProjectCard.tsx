"use client";

import { useRef, useState } from "react";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleMouseEnter() {
    setIsHovered(true);
    videoRef.current?.play();
  }

  function handleMouseLeave() {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:ring-1 hover:ring-gold/50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-video overflow-hidden rounded-sm">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Info area */}
      <div className="p-6">
        <p className="text-sm uppercase tracking-wide text-body">
          {project.category}
        </p>
        <h3
          className={`mt-2 font-heading text-lg font-semibold transition-colors duration-300 ${
            isHovered ? "text-heading" : "text-heading"
          }`}
        >
          {project.title}
        </h3>
      </div>
    </div>
  );
}
