# Stack Research: Videographer Portfolio

## Core Stack (Decided)

| Technology | Version | Role | Confidence |
|-----------|---------|------|------------|
| Next.js 16 | 16.x | Framework (App Router) | Decided |
| TypeScript | 5.x | Type safety | Decided |
| Tailwind CSS | 4.x | Styling | Decided |

## Complementary Libraries

### Animation & Motion

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| **motion** (formerly framer-motion) | ^12.x | Scroll animations, parallax, staggered reveals, page transitions, modal animations | High |

**Why motion:** The de facto standard for React animations. Handles scroll-triggered animations (`useScroll`, `useTransform`), layout animations, `AnimatePresence` for mount/unmount, and spring physics. Covers all cinematic animation needs: parallax, fade-ins, scale effects, staggered text reveals, and the loading counter intro.

**Not GSAP:** GSAP is powerful but heavier, imperative API doesn't integrate as cleanly with React's declarative model. motion's `useScroll` and `useTransform` hooks are purpose-built for scroll-driven effects.

**Not anime.js:** Less React-native, smaller community, fewer scroll-driven features.

### Form Handling

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| **react-hook-form** | ^7.x | Contact form state management | High |
| **zod** | ^3.x | Form validation schemas | High |
| **@hookform/resolvers** | ^3.x | Connects zod to react-hook-form | High |

**Why react-hook-form + zod:** Minimal re-renders, small bundle size, excellent TypeScript support. Zod provides runtime type validation that doubles as schema definition. The contact form (Name, Email, Company, Description, Budget) needs validation without a heavy form library.

**Not Formik:** Larger bundle, more re-renders, less idiomatic with modern React.

### Icons

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| **lucide-react** | ^0.460+ | Service card icons, social icons, UI icons | High |

**Why lucide-react:** Tree-shakeable, consistent style, large icon set, tiny per-icon bundle. Covers service icons, social media icons (Instagram, LinkedIn), nav icons (menu, close, play, arrow).

**Not react-icons:** Bundles entire icon packs, larger bundle size.
**Not heroicons:** Fewer icons, less flexibility in style.

### Scroll & Intersection

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| **react-intersection-observer** | ^9.x | Detect section visibility for active nav highlighting and lazy loading triggers | Medium |

**Why:** Lightweight hook for detecting when sections enter viewport. Powers active nav link highlighting and triggers for lazy-loading video content. motion's `whileInView` handles most animation triggers, but this is cleaner for non-animation intersection needs.

**Alternative:** Could use motion's `whileInView` for everything, but `react-intersection-observer` gives more control for nav state management.

### Video (No Extra Library Needed)

Native HTML5 `<video>` element handles all video needs:
- Autoplay muted loop for hero and hover previews
- Poster images for loading states
- Lazy loading via `loading="lazy"` and intersection observer

For YouTube/Vimeo embeds: use `<iframe>` with `loading="lazy"`. No embed library needed — keeps bundle small.

**Not react-player:** Adds 40KB+ for functionality we don't need. Native `<video>` + `<iframe>` covers all use cases.

### SEO

No extra library needed. Next.js App Router provides:
- `metadata` export for meta tags and Open Graph
- `generateMetadata` for dynamic metadata
- Built-in `<Script>` component for structured data (JSON-LD)

### Font Loading

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| **next/font/google** | built-in | Load Syne + fallback sans-serif | High |

Built into Next.js. Handles font optimization, self-hosting, and zero layout shift.

## What NOT to Use

| Library | Reason |
|---------|--------|
| GSAP | Imperative API, less React-native, motion covers all needs |
| react-player | Heavyweight for simple video playback — native `<video>` suffices |
| react-icons | Bundles entire icon packs, large bundle |
| styled-components / emotion | Tailwind handles all styling needs |
| next-seo | Redundant — Next.js App Router metadata API covers this |
| lenis / locomotive-scroll | Smooth scroll libraries add complexity; CSS `scroll-behavior: smooth` + motion handles this |
| swiper / embla | No carousels needed in this design |
| three.js / react-three-fiber | Massive overkill for 2D portfolio |
| Formik | Heavier than react-hook-form, more re-renders |

## Installation

```bash
npm install motion react-hook-form zod @hookform/resolvers lucide-react react-intersection-observer
```

## Bundle Size Estimates

| Library | Gzipped Size |
|---------|-------------|
| motion | ~45KB (tree-shakes well) |
| react-hook-form | ~9KB |
| zod | ~13KB |
| lucide-react (per icon) | ~1KB each |
| react-intersection-observer | ~3KB |
| **Total added** | **~70KB** |

---
*Researched: 2026-03-07*
