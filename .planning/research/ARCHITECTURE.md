# Architecture Research: Videographer Portfolio

## System Overview

Single-page Next.js App Router application. One route (`/`), one page component, multiple sections rendered in scroll order. No API routes needed (contact form can use a serverless function or external service).

```
┌─────────────────────────────────────────────┐
│                  Layout                      │
│  ┌──────────────────────────────────────┐   │
│  │           Loading Screen              │   │
│  │         (counter intro)               │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │        Navigation (fixed)             │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │              Page                     │   │
│  │  ┌────────────────────────────────┐  │   │
│  │  │          Hero Section           │  │   │
│  │  ├────────────────────────────────┤  │   │
│  │  │      Featured Work Section      │  │   │
│  │  ├────────────────────────────────┤  │   │
│  │  │       Showreel Section          │  │   │
│  │  ├────────────────────────────────┤  │   │
│  │  │       Services Section          │  │   │
│  │  ├────────────────────────────────┤  │   │
│  │  │       Clients Section           │  │   │
│  │  ├────────────────────────────────┤  │   │
│  │  │        About Section            │  │   │
│  │  ├────────────────────────────────┤  │   │
│  │  │       Process Section           │  │   │
│  │  ├────────────────────────────────┤  │   │
│  │  │     Testimonials Section        │  │   │
│  │  ├────────────────────────────────┤  │   │
│  │  │       Contact Section           │  │   │
│  │  └────────────────────────────────┘  │   │
│  ┌──────────────────────────────────────┐   │
│  │              Footer                   │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │          Custom Cursor                │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │          Film Grain Overlay           │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │        Project Modal (portal)         │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## Component Architecture

### Layer 1: App Shell (Global)

| Component | Responsibility | Renders |
|-----------|---------------|---------|
| `layout.tsx` | Root layout, fonts, metadata, global providers | Children + global overlays |
| `LoadingScreen` | Counter intro (0-100%), controls initial reveal | Overlay, removed after animation |
| `Navigation` | Fixed header, scroll spy, hamburger menu | Nav bar + mobile drawer |
| `CustomCursor` | Dot + ring cursor follower (desktop only) | Fixed-position cursor elements |
| `FilmGrain` | Noise texture overlay | Fixed-position canvas/div |
| `Footer` | Site footer | Footer content |

### Layer 2: Page Sections

Each section is a self-contained component with its own scroll target `id`.

| Section | Key Internal Components | Data |
|---------|------------------------|------|
| `HeroSection` | Background video, headline, CTAs | Static content |
| `FeaturedWork` | `ProjectCard` (x6-9), `ProjectModal` | Project data array |
| `ShowreelSection` | Video embed, description, buttons | Static content |
| `ServicesSection` | `ServiceCard` (x4) | Services data array |
| `ClientsSection` | Logo grid | Client logos array |
| `AboutSection` | Photo, bio text | Static content |
| `ProcessSection` | `ProcessStep` (x4) | Process steps array |
| `TestimonialsSection` | `TestimonialCard` (x3) | Testimonials array |
| `ContactSection` | `ContactForm`, contact info | Form schema |

### Layer 3: Shared UI

| Component | Used By | Purpose |
|-----------|---------|---------|
| `SectionDivider` | Between all sections | Animated gold line |
| `AnimatedText` | Headlines across sections | Staggered text reveal |
| `Button` | CTAs everywhere | Consistent button styling |
| `VideoPlayer` | Hero, FeaturedWork, Showreel | Reusable video component |

## Data Flow

```
/data/projects.ts  ──→  FeaturedWork  ──→  ProjectCard  ──→  ProjectModal
/data/services.ts  ──→  ServicesSection  ──→  ServiceCard
/data/clients.ts   ──→  ClientsSection
/data/testimonials.ts ──→ TestimonialsSection ──→ TestimonialCard

Scroll Position ──→ Navigation (active link)
                ──→ HeroSection (parallax offset)
                ──→ All Sections (reveal triggers)

Mouse Position ──→ CustomCursor (dot + ring position)

Form State ──→ ContactForm (react-hook-form) ──→ Submit handler
```

All data is static TypeScript files with typed objects/arrays. No API calls, no database. Content is swapped by editing these data files.

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Single page, renders all sections
│   └── globals.css         # Tailwind imports, custom CSS
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── CustomCursor.tsx
│   │   └── FilmGrain.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── ShowreelSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ClientsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionDivider.tsx
│   │   ├── AnimatedText.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── ProcessStep.tsx
│   └── forms/
│       └── ContactForm.tsx
├── data/
│   ├── projects.ts         # Portfolio project data
│   ├── services.ts         # Service offerings
│   ├── clients.ts          # Client logos
│   ├── testimonials.ts     # Testimonial quotes
│   ├── process.ts          # Process steps
│   └── site.ts             # Site-wide content (hero text, about, etc.)
├── hooks/
│   ├── useScrollSpy.ts     # Active section detection
│   ├── useMediaQuery.ts    # Responsive breakpoint detection
│   └── useSmoothScroll.ts  # Scroll-to-section utility
├── lib/
│   └── utils.ts            # Shared utilities (cn, etc.)
└── types/
    └── index.ts            # TypeScript interfaces
```

## Build Order (Dependencies)

```
Phase 1: Foundation
  ├── Project setup (Tailwind config, fonts, colors, globals)
  ├── Data files (all placeholder content)
  ├── Layout shell (layout.tsx, page.tsx)
  ├── Navigation (fixed, transparent → solid, mobile menu)
  └── Footer

Phase 2: Core Sections
  ├── Hero (video background, headline, CTAs) — needs Navigation for scroll targets
  ├── Featured Work (grid, cards) — needs data/projects.ts
  ├── Project Modal — needs FeaturedWork
  ├── Showreel — standalone
  ├── Services — needs data/services.ts
  ├── Clients — needs data/clients.ts
  ├── About — standalone
  ├── Process — needs data/process.ts
  ├── Testimonials — needs data/testimonials.ts
  └── Contact Form — needs form libraries

Phase 3: Polish & Effects
  ├── Loading screen (counter intro)
  ├── Custom cursor
  ├── Film grain overlay
  ├── Scroll animations on all sections
  ├── Parallax on hero
  ├── Section divider animations
  ├── Hover video previews on portfolio grid
  └── Active nav highlighting (scroll spy)
```

## Key Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Client Components for interactive sections | Animations, scroll detection, video playback all require client-side JS |
| Server Component for layout/page shell | SEO benefits, faster initial HTML |
| Static data files (not CMS) | Simplest possible content management, zero backend, easy to swap |
| Portal for ProjectModal | Renders above everything, avoids z-index issues with fixed nav |
| CSS `scroll-behavior: smooth` + JS fallback | Native smooth scroll is performant; JS needed for offset calculation with fixed nav |
| `'use client'` boundary at section level | Each section manages its own animations; page.tsx can remain server component |

---
*Researched: 2026-03-07*
