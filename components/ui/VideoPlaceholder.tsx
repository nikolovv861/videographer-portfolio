import { Play } from "lucide-react";

interface VideoPlaceholderProps {
  label?: string;
  className?: string;
}

export function VideoPlaceholder({ label, className = "" }: VideoPlaceholderProps) {
  return (
    <div
      className={`relative flex aspect-video items-center justify-center bg-foreground/5 ${className}`}
    >
      <Play className="h-12 w-12 text-foreground/30" />
      {label && (
        <span className="absolute bottom-4 left-0 right-0 text-center text-sm text-body">
          {label}
        </span>
      )}
    </div>
  );
}
