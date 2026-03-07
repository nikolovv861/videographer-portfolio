import { HeroPlaceholder } from "@/components/sections/HeroPlaceholder";
import { WorkPlaceholder } from "@/components/sections/WorkPlaceholder";
import { ShowreelPlaceholder } from "@/components/sections/ShowreelPlaceholder";
import { ServicesPlaceholder } from "@/components/sections/ServicesPlaceholder";
import { ClientsPlaceholder } from "@/components/sections/ClientsPlaceholder";
import { AboutPlaceholder } from "@/components/sections/AboutPlaceholder";
import { ProcessPlaceholder } from "@/components/sections/ProcessPlaceholder";
import { TestimonialsPlaceholder } from "@/components/sections/TestimonialsPlaceholder";
import { ContactPlaceholder } from "@/components/sections/ContactPlaceholder";
import { Footer } from "@/components/sections/Footer";
import { SectionObserver } from "@/components/sections/SectionObserver";

export default function Home() {
  return (
    <main>
      <SectionObserver sectionId="hero">
        <HeroPlaceholder />
      </SectionObserver>
      <SectionObserver sectionId="work">
        <WorkPlaceholder />
      </SectionObserver>
      <SectionObserver sectionId="showreel">
        <ShowreelPlaceholder />
      </SectionObserver>
      <SectionObserver sectionId="services">
        <ServicesPlaceholder />
      </SectionObserver>
      <SectionObserver sectionId="clients">
        <ClientsPlaceholder />
      </SectionObserver>
      <SectionObserver sectionId="about">
        <AboutPlaceholder />
      </SectionObserver>
      <SectionObserver sectionId="process">
        <ProcessPlaceholder />
      </SectionObserver>
      <SectionObserver sectionId="testimonials">
        <TestimonialsPlaceholder />
      </SectionObserver>
      <SectionObserver sectionId="contact">
        <ContactPlaceholder />
      </SectionObserver>
      <Footer />
    </main>
  );
}
