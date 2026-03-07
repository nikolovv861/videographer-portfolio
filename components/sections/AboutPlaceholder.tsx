import { siteConfig } from "@/data/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function AboutPlaceholder() {
  return (
    <SectionWrapper id="about">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        About
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Placeholder image area */}
        <div className="aspect-[4/5] rounded bg-foreground/5" />

        <div className="flex flex-col justify-center">
          <p className="text-base text-body md:text-lg">
            {siteConfig.name} is a director and cinematographer specializing in
            cinematic brand films, commercials, and social content. With over a
            decade of experience, every project is approached with a focus on
            visual storytelling and emotional impact.
          </p>
          <p className="mt-6 text-base text-body md:text-lg">
            From concept to final delivery, the goal is always the same: create
            video content that moves people, builds brands, and delivers
            measurable results.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
