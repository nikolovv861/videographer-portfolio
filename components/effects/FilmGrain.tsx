"use client";

interface FilmGrainProps {
  className?: string;
}

export function FilmGrain({ className }: FilmGrainProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className ?? ""}`}
      style={{ opacity: 0.06 }}
    >
      <svg width="100%" height="100%">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          >
            <animate
              attributeName="seed"
              from="0"
              to="100"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </feTurbulence>
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </div>
  );
}
