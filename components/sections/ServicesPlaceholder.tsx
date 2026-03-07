import { services } from "@/data/services";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ServicesPlaceholder() {
  return (
    <SectionWrapper id="services">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        Services
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.id} className="rounded-sm border border-foreground/10 p-8">
            <p className="text-sm tracking-wide text-body">{service.icon}</p>
            <h3 className="mt-4 font-heading text-xl font-semibold text-heading">
              {service.title}
            </h3>
            <p className="mt-3 text-base text-body md:text-lg">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
