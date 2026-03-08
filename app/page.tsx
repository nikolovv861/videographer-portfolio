import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Showreel } from "@/components/sections/Showreel";
import { Services } from "@/components/sections/Services";
import { Clients } from "@/components/sections/Clients";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { SectionObserver } from "@/components/sections/SectionObserver";
import { GoldDivider } from "@/components/effects/GoldDivider";
import { LoadingIntro } from "@/components/effects/LoadingIntro";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Alex Rivera Videography",
  description:
    "Cinematic videography for brands, commercials, and social content.",
  url: "https://alexrivera.com",
  image: "/og-image.jpg",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
  },
  sameAs: [
    "https://instagram.com/alexrivera",
    "https://linkedin.com/in/alexrivera",
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
      <main>
      <LoadingIntro />
      <SectionObserver sectionId="hero">
        <Hero />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="work">
        <FeaturedWork />
      </SectionObserver>
      <SectionObserver sectionId="showreel">
        <Showreel />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="services">
        <Services />
      </SectionObserver>
      <SectionObserver sectionId="clients">
        <Clients />
      </SectionObserver>
      <SectionObserver sectionId="about">
        <About />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="process">
        <Process />
      </SectionObserver>
      <SectionObserver sectionId="testimonials">
        <Testimonials />
      </SectionObserver>
      <GoldDivider />
      <SectionObserver sectionId="faq">
        <FAQ />
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
