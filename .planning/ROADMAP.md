# Roadmap: Videographer Portfolio

## Overview

This roadmap delivers a cinematic videographer portfolio in four phases: first the structural foundation (navigation, design system, data layer), then the video-heavy hero experience, then all supporting content sections, and finally the cinematic effects and performance polish that elevate it from functional to premium.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Navigation, design system, typography, data architecture (completed 2026-03-07)
- [x] **Phase 2: Video Experience** - Hero showreel, featured work grid with modals, showreel section (completed 2026-03-07)
- [x] **Phase 3: Content Sections** - Services, clients, about, process, testimonials, contact, footer (completed 2026-03-08)
- [ ] **Phase 4: Cinematic Polish** - Page load intro, custom cursor, film grain, scroll animations, performance, SEO

## Phase Details

### Phase 1: Foundation
**Goal**: The site has a working navigation shell, consistent visual design system, and placeholder data architecture that all future sections build on
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, VIS-01, VIS-02, VIS-03, VIS-04, DATA-01, DATA-02
**Success Criteria** (what must be TRUE):
  1. User sees a fixed navbar that transitions from transparent to solid dark background when scrolling down
  2. Clicking nav links smooth-scrolls to the correct section with proper offset for the fixed header
  3. The active section is visually highlighted in the navbar as the user scrolls
  4. On mobile, a hamburger menu opens and closes with smooth animation
  5. The site renders with the correct dark charcoal background, off-white headings, warm gray body text, champagne gold accents, and Syne heading font across all breakpoints
**Plans:** 5/5 plans complete

Plans:
- [ ] 01-00-PLAN.md — Test infrastructure (Playwright + Vitest) and test stubs
- [ ] 01-01-PLAN.md — Design tokens, fonts, types, and data files
- [ ] 01-04-PLAN.md — UI components, placeholder sections, layout, and page
- [ ] 01-02-PLAN.md — Navigation shell with scroll behavior, active section, mobile menu
- [ ] 01-03-PLAN.md — Human verification of complete Phase 1 foundation

### Phase 2: Video Experience
**Goal**: Users experience the cinematic video-first portfolio -- full-screen hero showreel, browsable project grid with hover previews, and detailed project case study modals
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, WORK-01, WORK-02, WORK-03, WORK-04, WORK-05, WORK-06, REEL-01, REEL-02, REEL-03
**Success Criteria** (what must be TRUE):
  1. The hero section fills the viewport with an autoplaying muted looped video, headline overlay with readable contrast, and two functional CTA buttons
  2. The featured work grid displays 6-9 project cards that play video previews on hover
  3. Clicking a project card opens a full-screen modal with case study details (video, metadata, narrative sections, gallery) that can be closed via button, backdrop click, or Escape
  4. Background scroll is locked while a modal is open without losing the user's scroll position
  5. The showreel section displays a large video player with description text and two navigation buttons
**Plans:** 4/4 plans complete

Plans:
- [ ] 02-00-PLAN.md — Test stubs and data contracts (Project type extension, hero data, Playwright stubs)
- [ ] 02-01-PLAN.md — Hero section with Vimeo background video, parallax, and VimeoEmbed component
- [ ] 02-02-PLAN.md — Featured work grid with hover video previews and case study modal
- [ ] 02-03-PLAN.md — Showreel section, page wiring, and human verification

### Phase 3: Content Sections
**Goal**: All remaining content sections are built -- services, client logos, about, process, testimonials, contact (simplified, no form), and footer -- completing the full single-page layout
**Depends on**: Phase 2
**Requirements**: SERV-01, SERV-02, CLNT-01, CLNT-02, ABUT-01, ABUT-02, PROC-01, PROC-02, TEST-01, TEST-02, CONT-01, CONT-02, CONT-03, CONT-04, FOOT-01, FOOT-02
**Success Criteria** (what must be TRUE):
  1. Services section displays 4 cards each with gold Lucide icon, title, description, and a section-level CTA
  2. Client logos section shows an auto-scrolling infinite marquee of placeholder brand logos with a "Trusted By" heading
  3. About section displays a photo placeholder, bio, and philosophy pull quote in a side-by-side layout on desktop, stacked on mobile
  4. Process section shows 4 visual steps (Discovery through Post Production) with step numbers, titles, and descriptions
  5. Contact section displays a heading, message, direct email link, and two CTA buttons (Start a Project mailto + Book a Call placeholder)
**Plans:** 3/3 plans complete

Plans:
- [ ] 03-01-PLAN.md — Data contracts, types, new data files, marquee CSS, Services and Process components
- [ ] 03-02-PLAN.md — Clients marquee, About, Testimonials, and Contact section components
- [ ] 03-03-PLAN.md — Footer Lucide icon upgrade, page wiring, placeholder cleanup, and visual verification

### Phase 4: Cinematic Polish
**Goal**: The site feels premium and cinematic -- page load intro, custom cursor, film grain, scroll-triggered animations, animated dividers, and performance/SEO optimization
**Depends on**: Phase 3
**Requirements**: FX-01, FX-02, FX-03, FX-04, FX-05, FX-06, FX-07, PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. On first visit, a percentage counter (0-100%) plays before revealing the site content; on return visits within the same session, the intro is skipped
  2. On desktop, a custom cursor (dot + ring follower) replaces the default cursor and tracks mouse movement smoothly
  3. Film grain texture is visible at low opacity on hero and dark section backgrounds
  4. All sections animate in with scroll-triggered staggered reveals, fade-ins, and scale effects, with animated gold line dividers drawing between sections
  5. All animations are disabled when the user has prefers-reduced-motion enabled, and Lighthouse desktop performance score is above 80
**Plans:** 5 plans

Plans:
- [ ] 04-00-PLAN.md — Wave 0 test stubs (8 Playwright spec files for all Phase 4 requirements)
- [ ] 04-01-PLAN.md — Install motion, create effect components (FilmGrain, GoldDivider, ScrollReveal), reduced-motion CSS, wire into sections
- [ ] 04-02-PLAN.md — Cinema letterbox loading intro with percentage counter and sessionStorage return visit detection
- [ ] 04-03-PLAN.md — Custom cursor with dot + spring ring follower, hover states, desktop-only detection
- [ ] 04-04-PLAN.md — Lazy-load Vimeo iframes, SEO metadata (OG/Twitter/JSON-LD), visual verification checkpoint

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 5/5 | Complete   | 2026-03-07 |
| 2. Video Experience | 4/4 | Complete   | 2026-03-07 |
| 3. Content Sections | 3/3 | Complete   | 2026-03-08 |
| 4. Cinematic Polish | 0/5 | Not started | - |
