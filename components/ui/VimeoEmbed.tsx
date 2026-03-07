interface VimeoEmbedProps {
  vimeoId: string;
  mode: "background" | "player";
  className?: string;
}

export function VimeoEmbed({ vimeoId, mode, className = "" }: VimeoEmbedProps) {
  if (mode === "background") {
    const src = `https://player.vimeo.com/video/${vimeoId}?background=1&autopause=0`;
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <iframe
          src={src}
          title="Background video"
          allow="autoplay; fullscreen"
          style={{ border: 0 }}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    );
  }

  const src = `https://player.vimeo.com/video/${vimeoId}?color=c9a96e&title=0&byline=0&portrait=0`;
  return (
    <div className={`aspect-video w-full ${className}`}>
      <iframe
        src={src}
        title="Video player"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ border: 0 }}
        className="h-full w-full"
      />
    </div>
  );
}
