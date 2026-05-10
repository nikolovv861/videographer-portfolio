"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
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
        {project.videoUrl && (
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
        )}

        {(project.youtubeId || project.vimeoId || project.videoUrl) && (
          <>
            {/* Subtle dark gradient so the play icon stays readable on bright thumbnails */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Play badge */}
            <div
              className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-300 ${
                  isHovered
                    ? "bg-gold/90 text-background"
                    : "bg-black/55 text-white ring-1 ring-white/30"
                }`}
              >
                <Play className="h-6 w-6 translate-x-[2px]" fill="currentColor" strokeWidth={0} />
              </span>
            </div>
          </>
        )}
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
