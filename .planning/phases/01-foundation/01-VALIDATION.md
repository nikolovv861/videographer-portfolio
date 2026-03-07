---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright (e2e) + Vitest (unit) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npx playwright test --project=chromium` |
| **Full suite command** | `npx playwright test && npx vitest run` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npx playwright test && npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 0 | NAV-01 | e2e stub | `npx playwright test tests/nav-scroll.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 0 | NAV-02 | e2e stub | `npx playwright test tests/nav-scroll.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 0 | NAV-03 | e2e stub | `npx playwright test tests/nav-active.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-04 | 01 | 0 | NAV-04 | e2e stub | `npx playwright test tests/mobile-menu.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-05 | 01 | 0 | NAV-05 | e2e stub | `npx playwright test tests/nav-layout.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-06 | 01 | 0 | VIS-01 | e2e stub | `npx playwright test tests/visual-design.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-07 | 01 | 0 | VIS-02 | e2e stub | `npx playwright test tests/visual-design.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-08 | 01 | 0 | VIS-03 | e2e stub | `npx playwright test tests/visual-design.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-09 | 01 | 0 | VIS-04 | e2e stub | `npx playwright test tests/responsive.spec.ts` | ❌ W0 | ⬜ pending |
| 01-01-10 | 01 | 0 | DATA-01 | unit stub | `npx vitest run tests/data.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-11 | 01 | 0 | DATA-02 | manual | N/A — code review | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Install Playwright: `npm init playwright@latest`
- [ ] Install Vitest: `npm install -D vitest`
- [ ] `tests/nav-scroll.spec.ts` — stubs for NAV-01, NAV-02
- [ ] `tests/nav-active.spec.ts` — stubs for NAV-03
- [ ] `tests/mobile-menu.spec.ts` — stubs for NAV-04
- [ ] `tests/nav-layout.spec.ts` — stubs for NAV-05
- [ ] `tests/visual-design.spec.ts` — stubs for VIS-01, VIS-02, VIS-03
- [ ] `tests/responsive.spec.ts` — stubs for VIS-04
- [ ] `tests/data.test.ts` — stubs for DATA-01

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Data files well-organized in data/ directory | DATA-02 | Structural/organizational quality | Review data/ directory: each concern in separate file, typed exports, no duplication |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
