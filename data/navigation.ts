import type { NavItem, SiteConfig } from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "Portfolio", href: "#work", sectionId: "work" },
  { label: "Showreel", href: "#showreel", sectionId: "showreel" },
  { label: "Services", href: "#services", sectionId: "services" },
  { label: "About", href: "#about", sectionId: "about" },
];

export const siteConfig: SiteConfig = {
  name: "Vipermedia",
  tagline: "Unleash Your Story, Amplify Your Reach",
  email: "hello@vipermedia.co",
  instagram: "https://instagram.com/vipermedia",
  linkedin: "https://linkedin.com/company/vipermedia",
  copyright: "All rights reserved.",
  ctaText: "Contact Us",
  ctaHref: "#contact",
};
