import type { ProcessStep, Testimonial } from "@/lib/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: 1,
    title: "Discovery",
    description:
      "We take the time to understand your brand's unique voice, values, and audience so the content we create truly fits.",
  },
  {
    id: "concept",
    number: 2,
    title: "Concept",
    description:
      "From mood boards to shot lists, we craft a detailed creative plan tailored to your platforms — Instagram, TikTok, YouTube and beyond.",
  },
  {
    id: "production",
    number: 3,
    title: "Production",
    description:
      "Professional photography and videography, captured with care and an eye for the details that elevate your brand.",
  },
  {
    id: "delivery",
    number: 4,
    title: "Delivery & Revisions",
    description:
      "Polished edits, tailored cutdowns and unlimited revisions until the content is absolutely perfect — backed by our 100% satisfaction guarantee.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "hypeclub",
    quote:
      "Consistently on time and full of creative flair, they've put together a range of videos that truly reflect our brand's essence and capture the lively atmosphere of our club.",
    name: "Hype Club Promo",
    company: "@adhd",
  },
  {
    id: "nerone",
    quote:
      "Vipermedia provided me with the content of my products unlike anyone before — eye-catching and cinematic while keeping it clean.",
    name: "Nerone",
    company: "Streetwear Brand · @nerone",
  },
  {
    id: "after",
    quote:
      "Simply a pleasure to work with — incredibly professionally done photos and videos for our socials.",
    name: "After",
    company: "Designer Brand · @after.the.store",
  },
  {
    id: "logoto",
    quote:
      "Very punctual and creative — fully developed multiple portfolio pieces following our brand values.",
    name: "Logoto Clothing",
    company: "Streetwear Brand · @logoto_clothing",
  },
];
