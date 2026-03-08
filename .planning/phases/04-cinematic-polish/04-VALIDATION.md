---
phase: 04
slug: cinematic-polish
status: draft
nyquist_compliant: true
wave_0_complete: false
wave_0_plan: "04-00"
created: 2026-03-08
---

# Phase 04 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright ^1.58.2 (e2e), Vitest ^4.0.18 (unit) |
| **Config file** | playwright.config.ts, vitest.config.ts |
| **Quick run command** | `npx playwright test --project=chromium tests/{relevant-spec}.spec.ts` |
| **Full suite command** | `npm run test:all` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test --project=chromium tests/{relevant-spec}.spec.ts`
- **After every plan wave:** Run `npm run test:all`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Wave 0 Plan

Wave 0 test stubs are created by **04-00-PLAN.md** (Wave 0). This plan creates all 8 Playwright spec files listed below before any Wave 1 plan executes.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Spec File | Status |
|---------|------|------|-------------|-----------|-------------------|-----------|--------|
| 04-01-01 | 01 | 1 | FX-04, FX-06, FX-07, FX-05 | e2e | `npx playwright test --project=chromium tests/film-grain.spec.ts tests/gold-dividers.spec.ts tests/scroll-animations.spec.ts tests/reduced-motion.spec.ts -x` | Created by 04-00 | ⬜ pending |
| 04-02-01 | 02 | 2 | FX-01, FX-02 | e2e | `npx playwright test --project=chromium tests/loading-intro.spec.ts -x` | Created by 04-00 | ⬜ pending |
| 04-03-01 | 03 | 2 | FX-03 | e2e | `npx playwright test --project=chromium tests/custom-cursor.spec.ts -x` | Created by 04-00 | ⬜ pending |
| 04-04-01 | 04 | 3 | PERF-01, PERF-02 | e2e | `npx playwright test --project=chromium tests/lazy-loading.spec.ts tests/seo-meta.spec.ts -x` | Created by 04-00 | ⬜ pending |
| 04-04-02 | 04 | 3 | PERF-03 | manual | Manual Lighthouse audit | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

All created by **04-00-PLAN.md**:

- [ ] `tests/loading-intro.spec.ts` — stubs for FX-01, FX-02
- [ ] `tests/custom-cursor.spec.ts` — stubs for FX-03
- [ ] `tests/film-grain.spec.ts` — stubs for FX-04
- [ ] `tests/scroll-animations.spec.ts` — stubs for FX-05
- [ ] `tests/gold-dividers.spec.ts` — stubs for FX-06
- [ ] `tests/reduced-motion.spec.ts` — stubs for FX-07
- [ ] `tests/lazy-loading.spec.ts` — stubs for PERF-01
- [ ] `tests/seo-meta.spec.ts` — stubs for PERF-02

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Lighthouse desktop score > 80 | PERF-03 | Playwright cannot run Lighthouse programmatically | Run `npx lighthouse http://localhost:3000 --only-categories=performance --output=json` or use Chrome DevTools Lighthouse panel |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (04-00-PLAN.md creates all 8 spec files)
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved
