# Videographer Portfolio

## What This Is

A single-page portfolio landing page template for a videographer/filmmaker. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS, deployed on Vercel. All content is placeholder — text, videos, images, and logos are swappable. The site is a polished, production-ready dark cinematic portfolio that feels like a high-end film studio, not a student project.

## Core Value

The site must immediately communicate cinematic quality and professionalism through its visual design, smooth animations, and video-first presentation — making the videographer's work the focal point.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Fixed navbar with transparent-to-solid scroll transition, smooth scroll to sections, active section highlighting
- [ ] Hero section with full-screen autoplay showreel video (muted, looped), headline overlay, two CTAs
- [ ] Featured Work grid (6–9 cards) with hover video preview, click opens full-screen modal with case study
- [ ] Showreel section with large embedded video player, description, and two buttons
- [ ] Services section with 3–5 service cards (icon, title, description, CTA)
- [ ] Selected Clients logo strip/grid with placeholder logos
- [ ] About section with photo, bio, and philosophy statement
- [ ] Process section with 4 visual steps (Discovery → Concept → Production → Post Production)
- [ ] Testimonials section with 2–3 quote cards
- [ ] Contact form (Name, Email, Company, Project Description, Budget dropdown) + direct email + CTA buttons
- [ ] Footer with email, social icons (Instagram, LinkedIn), copyright, small logo
- [ ] Hamburger menu on mobile with smooth transitions
- [ ] Cinematic bold animations: heavy parallax, staggered reveals, scale effects (Framer Motion)
- [ ] Film grain texture overlay on hero and dark section backgrounds
- [ ] Cinematic page load intro with percentage counter (0–100%) then reveal
- [ ] Custom cursor: dot + ring follower (desktop only)
- [ ] Gold line animations that draw themselves as section dividers
- [ ] Fully responsive / mobile-first design
- [ ] SEO-friendly: meta tags, Open Graph, structured data
- [ ] Fast loading: compressed video, poster images, lazy loading
- [ ] All content is placeholder and easily swappable

### Out of Scope

- Multiple pages or client-side routing — single page only
- CMS or admin panel — static content, swap files manually
- Blog — not needed for portfolio template
- E-commerce — no transactions
- Authentication — no user accounts
- Database — no server-side data
- Analytics — can be added later by site owner

## Context

This is a template portfolio site. The site owner (videographer) will replace all placeholder content — videos, images, text, logos — with their own. The design should make this easy by keeping content well-organized and clearly marked.

The existing codebase is a fresh Next.js project from Create Next App. We are building on top of this scaffold.

**Design Direction:**
- Dark charcoal background (#0a0a0a), primarily monochromatic
- Off-white (#f5f5f5) headings, warm gray (#a0a0a0) body text
- Champagne gold (#c9a96e) accent — used very sparingly: CTA buttons, hover states, thin section divider lines only
- 95% black and white, gold at key interaction points only
- Film grain texture overlay at low opacity for cinematic depth (hero + dark sections, not content-heavy areas)
- Typography: Syne (bold, distinctive, slightly brutalist) for headings, clean sans-serif for body
- Cinematic page load: percentage counter (0–100%) then reveal
- Custom cursor: small dot with larger circle ring follower (desktop only)
- Gold line animations that draw themselves as dividers between sections
- Featured Work modal: full-screen overlay with backdrop blur, scroll inside modal, close button
- Animation intensity: cinematic bold — heavy parallax, staggered reveals, text animations, scale effects

## Constraints

- **Hosting**: Must work on Vercel free tier — no heavy server-side processing
- **Backend**: No external backend — purely front-end
- **Videos**: Self-hosted mp4 or Vimeo/YouTube embeds
- **Dependencies**: Keep minimal — Next.js, Tailwind, Framer Motion, and only what's essential
- **Tech Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single page, no routing | Portfolio is a landing page — all content visible on one scroll | — Pending |
| Syne for typography | Bold, distinctive, slightly brutalist — stands out from typical portfolio fonts | — Pending |
| Full-screen modal for projects | Maximum impact for case studies, keeps user on page | — Pending |
| Champagne gold (#c9a96e) accent | Luxury feel without overwhelming the monochromatic base | — Pending |
| Film grain on hero + sections only | Cinematic depth where it matters, clean on content-heavy areas | — Pending |
| Counter intro page load | Editorial feel, builds anticipation before hero reveal | — Pending |
| Dot + ring custom cursor | Classic high-end creative portfolio interaction pattern | — Pending |

---
*Last updated: 2026-03-07 after initialization*
