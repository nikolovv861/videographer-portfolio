import {
  Clapperboard,
  Film,
  Smartphone,
  Video,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, LucideIcon> = {
  Clapperboard,
  Film,
  Smartphone,
  Video,
};

export function Services() {
  return (
    <SectionWrapper id="services">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        Services
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <div
              key={service.id}
              className="rounded-sm border border-foreground/10 p-8 transition-colors duration-300 hover:border-gold/40"
            >
              {Icon && <Icon className="h-8 w-8 text-gold" />}
              <h3 className="mt-4 font-heading text-xl font-semibold text-heading">
                {service.title}
              </h3>
              <p className="mt-3 text-base text-body md:text-lg">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Button variant="cta" href="#contact">
          Start a Project
        </Button>
      </div>
    </SectionWrapper>
  );
}
