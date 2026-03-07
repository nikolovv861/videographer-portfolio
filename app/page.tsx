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

export default function Home() {
  return (
    <main>
      <HeroPlaceholder />
      <WorkPlaceholder />
      <ShowreelPlaceholder />
      <ServicesPlaceholder />
      <ClientsPlaceholder />
      <AboutPlaceholder />
      <ProcessPlaceholder />
      <TestimonialsPlaceholder />
      <ContactPlaceholder />
      <Footer />
    </main>
  );
}
