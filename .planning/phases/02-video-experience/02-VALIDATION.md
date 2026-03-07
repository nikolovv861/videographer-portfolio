---
phase: 2
slug: video-experience
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 (unit) + Playwright 1.58.2 (e2e) |
| **Config file** | `vitest.config.ts` / `playwright.config.ts` |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm run test:all` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test tests/{relevant}.spec.ts --project=chromium -x`
- **After every plan wave:** Run `npm run test:all`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-00-01 | 00 | 1 | HERO-01 | e2e | `npx playwright test tests/hero-video.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-02 | 00 | 1 | HERO-02 | e2e | `npx playwright test tests/hero-video.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-03 | 00 | 1 | HERO-03 | e2e | `npx playwright test tests/hero-video.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-04 | 00 | 1 | HERO-04 | e2e | `npx playwright test tests/hero-video.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-05 | 00 | 1 | WORK-01 | e2e | `npx playwright test tests/work-grid.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-06 | 00 | 1 | WORK-02 | e2e | `npx playwright test tests/work-grid.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-07 | 00 | 1 | WORK-03 | e2e | `npx playwright test tests/project-modal.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-08 | 00 | 1 | WORK-04 | e2e | `npx playwright test tests/project-modal.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-09 | 00 | 1 | WORK-05 | e2e | `npx playwright test tests/project-modal.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-10 | 00 | 1 | WORK-06 | e2e | `npx playwright test tests/project-modal.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-11 | 00 | 1 | REEL-01 | e2e | `npx playwright test tests/showreel.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-12 | 00 | 1 | REEL-02 | e2e | `npx playwright test tests/showreel.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |
| 02-00-13 | 00 | 1 | REEL-03 | e2e | `npx playwright test tests/showreel.spec.ts --project=chromium -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/hero-video.spec.ts` — stubs for HERO-01, HERO-02, HERO-03, HERO-04
- [ ] `tests/work-grid.spec.ts` — stubs for WORK-01, WORK-02
- [ ] `tests/project-modal.spec.ts` — stubs for WORK-03, WORK-04, WORK-05, WORK-06
- [ ] `tests/showreel.spec.ts` — stubs for REEL-01, REEL-02, REEL-03

*Existing Phase 1 test infrastructure (Vitest + Playwright) covers framework setup.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero video autoplay with sound muted | HERO-01 | Browser autoplay policies vary; Vimeo iframe in test env may not autoplay | Load page in Chrome, verify video plays automatically without user interaction |
| Hover video preview plays instantly | WORK-02 | Mouse hover timing is difficult to assert reliably in e2e | Hover over project card in Chrome, verify video starts within 200ms |
| Parallax depth effect on hero scroll | HERO-04 | Visual effect quality is subjective | Scroll past hero section, verify content fades/moves with depth effect |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
