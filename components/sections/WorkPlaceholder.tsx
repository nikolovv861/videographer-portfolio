import { projects } from "@/data/projects";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function WorkPlaceholder() {
  return (
    <SectionWrapper id="work">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        Featured Work
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group overflow-hidden rounded-sm bg-foreground/5"
          >
            <div className="aspect-video bg-foreground/10" />
            <div className="p-6">
              <p className="text-sm tracking-wide text-body">
                {project.category}
              </p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-heading">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
