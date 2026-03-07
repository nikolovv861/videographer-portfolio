import type { ProcessStep, Testimonial } from "@/lib/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: 1,
    title: "Discovery",
    description:
      "We start with a deep dive into your brand, goals, and audience to align on a clear creative direction.",
  },
  {
    id: "concept",
    number: 2,
    title: "Concept",
    description:
      "From mood boards to shot lists, we craft a detailed production plan that brings your vision to life.",
  },
  {
    id: "production",
    number: 3,
    title: "Production",
    description:
      "Lights, camera, action. Professional crews and cinema-grade equipment capture every moment with precision.",
  },
  {
    id: "post-production",
    number: 4,
    title: "Post Production",
    description:
      "Expert editing, color grading, sound design, and motion graphics transform raw footage into a polished final product.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Alex transformed our brand story into a cinematic experience that resonated deeply with our audience. The quality and attention to detail exceeded all expectations.",
    name: "Sarah Chen",
    company: "Aurora Distillery",
  },
  {
    id: "testimonial-2",
    quote:
      "Working with Alex was seamless from concept to delivery. The final film captured the energy of our conference perfectly and became our most-shared content of the year.",
    name: "Marcus Thompson",
    company: "Nexus Technologies",
  },
  {
    id: "testimonial-3",
    quote:
      "The social content strategy and execution was phenomenal. Our engagement tripled within the first month of launching the new video series.",
    name: "Elena Rodriguez",
    company: "Solstice Cosmetics",
  },
];
