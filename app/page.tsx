import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Showreel } from "@/components/sections/Showreel";
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
        <Hero />
      </SectionObserver>
      <SectionObserver sectionId="work">
        <FeaturedWork />
      </SectionObserver>
      <SectionObserver sectionId="showreel">
        <Showreel />
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
