import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Showreel } from "@/components/sections/Showreel";
import { Services } from "@/components/sections/Services";
import { Clients } from "@/components/sections/Clients";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
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
        <Services />
      </SectionObserver>
      <SectionObserver sectionId="clients">
        <Clients />
      </SectionObserver>
      <SectionObserver sectionId="about">
        <About />
      </SectionObserver>
      <SectionObserver sectionId="process">
        <Process />
      </SectionObserver>
      <SectionObserver sectionId="testimonials">
        <Testimonials />
      </SectionObserver>
      <SectionObserver sectionId="contact">
        <Contact />
      </SectionObserver>
      <Footer />
    </main>
  );
}
