export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  role: string;
  type: string;
  thumbnailUrl: string;
  videoUrl: string;
  vimeoId?: string;
  challenge: string;
  approach: string;
  result: string;
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string;
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface AboutContent {
  photoUrl: string;
  bio: string;
  philosophy: string;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  email: string;
  instagram: string;
  linkedin: string;
  copyright: string;
  ctaText: string;
  ctaHref: string;
}
