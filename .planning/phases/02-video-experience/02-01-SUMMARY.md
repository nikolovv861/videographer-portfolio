---
phase: 02-video-experience
plan: 01
subsystem: ui
tags: [react, vimeo, parallax, hero, lucide-react]

requires:
  - phase: 02-video-experience
    provides: HeroContent type and heroContent data, Project.vimeoId field
  - phase: 01-foundation
    provides: Button component, layout structure, Tailwind config
provides:
  - Full-screen Hero section with Vimeo background video and parallax
  - Reusable VimeoEmbed component (background and player modes)
  - VideoPlaceholder component for dev use
affects: [02-02, 02-03]

tech-stack:
  added: []
  patterns: [VimeoEmbed background mode for full-bleed video, scroll-based parallax via passive scroll listener]

key-files:
  created: [components/sections/Hero.tsx, components/ui/VimeoEmbed.tsx, components/ui/VideoPlaceholder.tsx]
  modified: []

key-decisions:
  - "VimeoEmbed uses iframe with Vimeo background=1 param for autoplay muted loop"
  - "Parallax uses vanilla scroll listener with passive flag for performance"

patterns-established:
  - "VimeoEmbed background mode: absolute positioned iframe with min-w/h-full and translate centering"
  - "Scroll parallax: opacity fade (1 - scrollY/600) and translateY (scrollY * 0.3) with early-exit optimization"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04]

duration: 1min
completed: 2026-03-07
---

# Phase 2 Plan 01: Hero Video Background Summary

**Full-screen hero with Vimeo iframe background, gradient overlay, parallax fade+lift, and reusable VimeoEmbed component**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-07T23:27:56Z
- **Completed:** 2026-03-07T23:28:57Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- VimeoEmbed component supports background (autoplay muted loop) and player (controls, fullscreen) modes
- VideoPlaceholder component provides dark placeholder with play icon for dev use
- Hero section renders full-viewport video background with gradient overlay ensuring text readability
- Parallax effect fades and lifts content on scroll with passive listener optimization
- Animated scroll-down chevron indicator at bottom of hero

## Task Commits

Each task was committed atomically:

1. **Task 1: Create VimeoEmbed and VideoPlaceholder components** - `4e9250e` (feat)
2. **Task 2: Build Hero section with video background and parallax** - `c53c905` (feat)

## Files Created/Modified
- `components/ui/VimeoEmbed.tsx` - Reusable Vimeo iframe wrapper with background and player modes
- `components/ui/VideoPlaceholder.tsx` - Dark placeholder with Play icon for dev use
- `components/sections/Hero.tsx` - Full-screen hero with video background, overlay, parallax, CTAs

## Decisions Made
- Used vanilla scroll listener with passive flag instead of motion library for parallax (simpler, no dependency needed for this effect)
- VimeoEmbed background mode uses CSS translate centering with min-w/h-full for aspect-ratio-independent coverage

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Hero component ready to wire into page.tsx (Plan 03)
- VimeoEmbed reusable for Showreel section (Plan 03)
- VideoPlaceholder available for development without real Vimeo IDs

---
*Phase: 02-video-experience*
*Completed: 2026-03-07*
