import { siteConfig } from "@/data/navigation";
import { Button } from "@/components/ui/Button";

export function HeroPlaceholder() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center"
    >
      {/* Dark overlay gradient for future video background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 font-heading text-lg tracking-wide text-body md:text-xl">
          {siteConfig.tagline}
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="#work">View My Work</Button>
          <Button variant="cta" href="#contact">
            Start a Project
          </Button>
        </div>
      </div>
    </section>
  );
}
