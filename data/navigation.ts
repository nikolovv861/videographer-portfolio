import type { NavItem, SiteConfig } from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Showreel", href: "#showreel", sectionId: "showreel" },
  { label: "Services", href: "#services", sectionId: "services" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const siteConfig: SiteConfig = {
  name: "Alex Rivera",
  tagline: "Cinematic Storytelling",
  email: "hello@alexrivera.com",
  instagram: "https://instagram.com/alexrivera",
  linkedin: "https://linkedin.com/in/alexrivera",
  copyright: "All rights reserved.",
  ctaText: "Start a Project",
  ctaHref: "#contact",
};
