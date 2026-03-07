import { testimonials } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function TestimonialsPlaceholder() {
  return (
    <SectionWrapper id="testimonials">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        Testimonials
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-sm border border-foreground/10 p-8"
          >
            <blockquote className="text-base text-body md:text-lg">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-heading text-sm font-semibold text-heading">
                {testimonial.name}
              </p>
              <p className="mt-1 text-sm text-body">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
