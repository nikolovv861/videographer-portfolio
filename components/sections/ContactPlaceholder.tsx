import { siteConfig } from "@/data/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export function ContactPlaceholder() {
  return (
    <SectionWrapper id="contact">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-6 text-base text-body md:text-lg">
            Have a project in mind? Let&apos;s create something extraordinary
            together.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-block text-base text-heading transition-colors duration-300 hover:text-gold md:text-lg"
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Placeholder form layout - real form in Phase 3 */}
        <div className="space-y-6">
          <div className="h-12 rounded bg-foreground/5" aria-label="Name field placeholder" />
          <div className="h-12 rounded bg-foreground/5" aria-label="Email field placeholder" />
          <div className="h-12 rounded bg-foreground/5" aria-label="Company field placeholder" />
          <div className="h-32 rounded bg-foreground/5" aria-label="Description field placeholder" />
          <div className="flex gap-4">
            <Button variant="cta" href={`mailto:${siteConfig.email}`}>
              Send Message
            </Button>
            <Button href="#work">View Work</Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
