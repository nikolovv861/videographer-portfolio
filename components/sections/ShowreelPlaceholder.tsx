import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export function ShowreelPlaceholder() {
  return (
    <SectionWrapper id="showreel">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
          Showreel
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-body md:text-lg">
          A curated selection of my best work across commercials, brand films,
          and social content.
        </p>
      </div>
      <div className="mt-16 aspect-video rounded bg-foreground/5" />
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="#work">Explore Projects</Button>
        <Button variant="cta" href="#contact">
          Work With Me
        </Button>
      </div>
    </SectionWrapper>
  );
}
