---
phase: 02-video-experience
plan: 00
subsystem: data, testing
tags: [typescript, playwright, vimeo, types]

requires:
  - phase: 01-foundation
    provides: Project type, data/projects.ts, Playwright infrastructure
provides:
  - Extended Project type with vimeoId field
  - Hero content data file (data/hero.ts) with HeroContent type
  - Playwright test stubs for all 13 Phase 2 requirements
affects: [02-01, 02-02, 02-03]

tech-stack:
  added: []
  patterns: [vimeoId on Project for Vimeo embeds, self-contained hero data separate from siteConfig]

key-files:
  created: [data/hero.ts, tests/hero-video.spec.ts, tests/work-grid.spec.ts, tests/project-modal.spec.ts, tests/showreel.spec.ts]
  modified: [lib/types.ts, data/projects.ts]

key-decisions:
  - "Hero data self-contained in data/hero.ts, not importing from siteConfig"
  - "Placeholder Vimeo IDs used for all projects and hero showreel"

patterns-established:
  - "vimeoId as optional string on Project for progressive Vimeo adoption"
  - "Test stubs use test.skip() with requirement ID prefix for traceability"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, WORK-01, WORK-02, WORK-03, WORK-04, WORK-05, WORK-06, REEL-01, REEL-02, REEL-03]

duration: 1min
completed: 2026-03-07
---

# Phase 2 Plan 00: Data Contracts and Test Infrastructure Summary

**Extended Project type with vimeoId, created hero content data file, and 15 Playwright test stubs covering all 13 Phase 2 requirements**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-07T23:24:02Z
- **Completed:** 2026-03-07T23:25:25Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Project type extended with optional vimeoId field, all 6 projects given placeholder IDs
- Hero content data file created with typed HeroContent export (headline, tagline, vimeoId, CTAs)
- 4 Playwright test files with 15 skipped stubs covering HERO-01 through HERO-04, WORK-01 through WORK-06, REEL-01 through REEL-03

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend Project type and data with vimeoId, create hero data file** - `4230b40` (feat)
2. **Task 2: Create Playwright test stubs for all Phase 2 requirements** - `ce99a7a` (test)

## Files Created/Modified
- `lib/types.ts` - Added optional vimeoId field to Project interface
- `data/projects.ts` - Added placeholder vimeoId to all 6 projects
- `data/hero.ts` - New hero content data file with HeroContent type and heroContent export
- `tests/hero-video.spec.ts` - HERO-01 through HERO-04 test stubs
- `tests/work-grid.spec.ts` - WORK-01, WORK-02 test stubs
- `tests/project-modal.spec.ts` - WORK-03 through WORK-06 test stubs (including 05b, 05c)
- `tests/showreel.spec.ts` - REEL-01 through REEL-03 test stubs

## Decisions Made
- Hero data kept self-contained (no import from siteConfig) for independent customization
- Placeholder Vimeo IDs are realistic 9-digit strings, ready to swap for real IDs later

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Types and data contracts ready for hero section implementation (02-01)
- Test stubs ready to be fleshed out as components are built in subsequent plans
- All 13 Phase 2 requirements have traceable test coverage stubs

---
*Phase: 02-video-experience*
*Completed: 2026-03-07*
