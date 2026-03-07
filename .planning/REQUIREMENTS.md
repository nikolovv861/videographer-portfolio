# Requirements: Videographer Portfolio

**Defined:** 2026-03-07
**Core Value:** The site must immediately communicate cinematic quality and professionalism through visual design, smooth animations, and video-first presentation.

## v1 Requirements

### Navigation

- [ ] **NAV-01**: Fixed navbar is transparent on hero, transitions to solid dark background on scroll
- [ ] **NAV-02**: Nav links smooth-scroll to corresponding page sections with offset for fixed header
- [ ] **NAV-03**: Active section is highlighted in nav based on scroll position
- [ ] **NAV-04**: Mobile hamburger menu opens/closes with smooth animation
- [ ] **NAV-05**: Logo displayed on left, nav links center/right, CTA button "Start a Project" on right

### Hero

- [ ] **HERO-01**: Full-screen autoplay showreel video plays muted and looped as background
- [ ] **HERO-02**: Headline and subheadline text overlay on video with readable contrast
- [ ] **HERO-03**: Two CTA buttons: "View My Work" (scrolls to Featured Work) + "Start a Project" (scrolls to Contact)
- [ ] **HERO-04**: Parallax depth effect on hero content during scroll

### Featured Work

- [ ] **WORK-01**: Grid displays 6–9 project cards with video thumbnail, project title, and category tag
- [ ] **WORK-02**: Hovering a card plays a short video loop preview
- [ ] **WORK-03**: Clicking a card opens full-screen modal with backdrop blur
- [ ] **WORK-04**: Modal displays hero video, project metadata (Client, Year, Role, Type), The Challenge, The Approach, The Result, and photo gallery
- [ ] **WORK-05**: Modal can be closed via close button, backdrop click, or Escape key
- [ ] **WORK-06**: Background scroll is locked while modal is open without losing scroll position

### Showreel

- [ ] **REEL-01**: Large embedded video player with play controls
- [ ] **REEL-02**: Short description text below/beside player
- [ ] **REEL-03**: Two buttons: "Watch Showreel" + "See All Work" (scrolls to Featured Work)

### Services

- [ ] **SERV-01**: 3–5 service cards each with icon, title, short description, and CTA button
- [ ] **SERV-02**: Services include: Commercial Video Production, Brand Story Films, Social Media Content, Event & Corporate Films

### Clients

- [ ] **CLNT-01**: Logo strip or grid displaying placeholder brand logos
- [ ] **CLNT-02**: Section heading "Trusted By" or "Selected Collaborations"

### About

- [ ] **ABUT-01**: Photo of videographer with bio text and philosophy statement
- [ ] **ABUT-02**: Layout works on both mobile (stacked) and desktop (side-by-side)

### Process

- [ ] **PROC-01**: 4 process steps displayed visually: Discovery → Concept → Production → Post Production
- [ ] **PROC-02**: Each step has a title and one-line description

### Testimonials

- [ ] **TEST-01**: 2–3 testimonial cards with quote text, person name, and company
- [ ] **TEST-02**: Cards have placeholder content that is easily swappable

### Contact

- [ ] **CONT-01**: Contact form with fields: Name, Email, Company, Project Description, Budget dropdown (optional)
- [ ] **CONT-02**: Form validates inputs (required fields, email format) with inline error messages
- [ ] **CONT-03**: Direct email link displayed alongside form
- [ ] **CONT-04**: Two CTA buttons: "Start a Project" (submit) + "Book a Call"

### Footer

- [ ] **FOOT-01**: Footer displays email address, Instagram icon link, LinkedIn icon link
- [ ] **FOOT-02**: Copyright text and small logo in footer

### Cinematic Effects

- [ ] **FX-01**: Page load intro with percentage counter (0–100%) then smooth reveal of content
- [ ] **FX-02**: Loading intro skipped on return visits within same session (sessionStorage)
- [ ] **FX-03**: Custom cursor with small dot + larger ring follower on desktop only
- [ ] **FX-04**: Film grain texture overlay at low opacity on hero and dark section backgrounds
- [ ] **FX-05**: Scroll-triggered animations: staggered reveals, fade-ins, scale effects on all sections
- [ ] **FX-06**: Animated gold line dividers that draw themselves between sections on scroll
- [ ] **FX-07**: All animations respect `prefers-reduced-motion` (disabled for users who prefer it)

### Visual Design

- [ ] **VIS-01**: Dark charcoal background (#0a0a0a) with off-white headings (#f5f5f5) and warm gray body text (#a0a0a0)
- [ ] **VIS-02**: Champagne gold (#c9a96e) accent used sparingly: CTA buttons, hover states, section divider lines only
- [ ] **VIS-03**: Syne font for headings, clean sans-serif for body text, loaded via next/font
- [ ] **VIS-04**: Fully responsive mobile-first design with appropriate breakpoints

### Performance & SEO

- [ ] **PERF-01**: Videos lazy-loaded below the fold with poster images
- [ ] **PERF-02**: Meta tags, Open Graph tags, and JSON-LD structured data for SEO
- [ ] **PERF-03**: Lighthouse performance score above 80 on desktop

### Content

- [ ] **DATA-01**: All text, videos, images, and logos are placeholder content stored in static data files
- [ ] **DATA-02**: Content is organized in clearly named data files that are easy to find and modify

## v2 Requirements

### Enhanced Mobile

- **MOB-01**: Static poster image on mobile instead of autoplay hero video (battery/data optimization)

### Analytics

- **ANLY-01**: Vercel Analytics or Google Analytics integration

### Form Backend

- **FORM-01**: Contact form connected to email service (Formspree, Resend, or API route)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multiple pages / routing | Single-page design intent |
| CMS / admin panel | Static template, content swapped manually |
| Blog | Not needed for portfolio template |
| E-commerce | No transactions |
| Authentication | No user accounts |
| Database | No server-side data |
| Dark/light mode toggle | Dark is the brand identity |
| Category filtering on portfolio | With 6-9 projects, tags on cards suffice |
| Real-time chat | Contact form is sufficient |
| Audio/music player | Videos handle their own audio |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 1 | Pending |
| NAV-03 | Phase 1 | Pending |
| NAV-04 | Phase 1 | Pending |
| NAV-05 | Phase 1 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| HERO-04 | Phase 2 | Pending |
| WORK-01 | Phase 2 | Pending |
| WORK-02 | Phase 2 | Pending |
| WORK-03 | Phase 2 | Pending |
| WORK-04 | Phase 2 | Pending |
| WORK-05 | Phase 2 | Pending |
| WORK-06 | Phase 2 | Pending |
| REEL-01 | Phase 2 | Pending |
| REEL-02 | Phase 2 | Pending |
| REEL-03 | Phase 2 | Pending |
| SERV-01 | Phase 3 | Pending |
| SERV-02 | Phase 3 | Pending |
| CLNT-01 | Phase 3 | Pending |
| CLNT-02 | Phase 3 | Pending |
| ABUT-01 | Phase 3 | Pending |
| ABUT-02 | Phase 3 | Pending |
| PROC-01 | Phase 3 | Pending |
| PROC-02 | Phase 3 | Pending |
| TEST-01 | Phase 3 | Pending |
| TEST-02 | Phase 3 | Pending |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| FOOT-01 | Phase 3 | Pending |
| FOOT-02 | Phase 3 | Pending |
| FX-01 | Phase 4 | Pending |
| FX-02 | Phase 4 | Pending |
| FX-03 | Phase 4 | Pending |
| FX-04 | Phase 4 | Pending |
| FX-05 | Phase 4 | Pending |
| FX-06 | Phase 4 | Pending |
| FX-07 | Phase 4 | Pending |
| VIS-01 | Phase 1 | Pending |
| VIS-02 | Phase 1 | Pending |
| VIS-03 | Phase 1 | Pending |
| VIS-04 | Phase 1 | Pending |
| PERF-01 | Phase 4 | Pending |
| PERF-02 | Phase 4 | Pending |
| PERF-03 | Phase 4 | Pending |
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 50 total
- Mapped to phases: 50
- Unmapped: 0

---
*Requirements defined: 2026-03-07*
*Last updated: 2026-03-07 after roadmap creation*
