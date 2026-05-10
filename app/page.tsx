import { LogoHeader } from "@/components/sections/LogoHeader";
import { Intro } from "@/components/sections/Intro";
import { Stats } from "@/components/sections/Stats";
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
import { GoldDivider } from "@/components/effects/GoldDivider";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vipermedia",
  description:
    "Content creation and visual storytelling — photography, product video and social content that elevates your brand.",
  url: "https://vipermedia.co",
  image: "/og-image.jpg",
  priceRange: "$$",
  sameAs: [
    "https://instagram.com/vipermedia",
    "https://linkedin.com/company/vipermedia",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="intro-ready">
      <LogoHeader />
      <Intro />
      <Stats />
      <GoldDivider />
      <SectionObserver sectionId="work">
        <FeaturedWork />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="showreel">
        <Showreel />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="services">
        <Services />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="clients">
        <Clients />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="about">
        <About />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="process">
        <Process />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="testimonials">
        <Testimonials />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="contact">
        <Contact />
      </SectionObserver>
      <Footer />
    </main>
    </>
  );
}
