import { clients } from "@/data/clients";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Clients() {
  return (
    <SectionWrapper id="clients" fullBleed>
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
          Trusted By
        </h2>
      </div>
      <div className="mt-16 overflow-hidden">
        <div
          className="flex hover:[animation-play-state:paused]"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="mx-6 flex h-16 w-32 flex-shrink-0 items-center justify-center rounded bg-foreground/5"
            >
              <span className="text-xs text-body">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
