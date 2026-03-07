import { processSteps } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ProcessPlaceholder() {
  return (
    <SectionWrapper id="process">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        The Process
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step) => (
          <div key={step.id} className="rounded-sm border border-foreground/10 p-8">
            <span className="font-heading text-4xl font-bold text-foreground/10">
              {String(step.number).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-heading text-xl font-semibold text-heading">
              {step.title}
            </h3>
            <p className="mt-3 text-base text-body md:text-lg">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
