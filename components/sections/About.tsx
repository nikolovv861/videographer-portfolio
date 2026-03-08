import { aboutContent } from "@/data/about";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { User } from "lucide-react";

export function About() {
  return (
    <SectionWrapper id="about">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        About
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[4/5] flex items-center justify-center rounded bg-foreground/5">
          <User className="h-16 w-16 text-foreground/20" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-base text-body md:text-lg">
            {aboutContent.bio}
          </p>
          <blockquote className="mt-8 border-l-2 border-gold pl-6 text-base text-heading/80 italic md:text-lg">
            {aboutContent.philosophy}
          </blockquote>
        </div>
      </div>
    </SectionWrapper>
  );
}
