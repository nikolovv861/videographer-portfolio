import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ClientsPlaceholder() {
  return (
    <SectionWrapper id="clients" fullBleed>
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
          Trusted By
        </h2>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded bg-foreground/5"
            >
              <span className="text-xs text-body">Logo {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
