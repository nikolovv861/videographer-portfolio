export interface HeroContent {
  headline: string;
  tagline: string;
  vimeoId: string;
  ctaWork: { label: string; href: string };
  ctaContact: { label: string; href: string };
}

export const heroContent: HeroContent = {
  headline: "Alex Rivera",
  tagline: "Cinematic Storytelling",
  vimeoId: "987654321",
  ctaWork: { label: "View My Work", href: "#work" },
  ctaContact: { label: "Start a Project", href: "#contact" },
};
