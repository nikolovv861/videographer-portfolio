---
phase: 3
slug: content-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest ^4.0.18 (unit) + Playwright ^1.58.2 (e2e) |
| **Config file** | vitest.config.ts, playwright.config.ts |
| **Quick run command** | `npm run test` |
| **Full suite command** | `npm run test:all` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test`
- **After every plan wave:** Run `npm run test:all`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-00-01 | 00 | 0 | SERV-01 | e2e | `npx playwright test tests/services.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-00-02 | 00 | 0 | CLNT-01, CLNT-02 | e2e | `npx playwright test tests/clients.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-00-03 | 00 | 0 | ABUT-01 | e2e | `npx playwright test tests/about.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-00-04 | 00 | 0 | PROC-01 | e2e | `npx playwright test tests/process.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-00-05 | 00 | 0 | TEST-01 | e2e | `npx playwright test tests/testimonials.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-00-06 | 00 | 0 | CONT-01, CONT-03, CONT-04 | e2e | `npx playwright test tests/contact.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-00-07 | 00 | 0 | FOOT-01, FOOT-02 | e2e | `npx playwright test tests/footer.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-00-08 | 00 | 0 | SERV-02, PROC-02, TEST-02 | unit | `npx vitest run tests/data.test.ts` | Partial | ⬜ pending |
| 03-01-xx | 01 | 1 | SERV-01, SERV-02 | e2e | `npx playwright test tests/services.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-01-xx | 01 | 1 | CLNT-01, CLNT-02 | e2e | `npx playwright test tests/clients.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-01-xx | 01 | 1 | ABUT-01, ABUT-02 | e2e | `npx playwright test tests/about.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-02-xx | 02 | 1 | PROC-01, PROC-02 | e2e | `npx playwright test tests/process.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-02-xx | 02 | 1 | TEST-01, TEST-02 | e2e | `npx playwright test tests/testimonials.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-02-xx | 02 | 1 | CONT-01, CONT-03, CONT-04 | e2e | `npx playwright test tests/contact.spec.ts -x` | ❌ W0 | ⬜ pending |
| 03-02-xx | 02 | 1 | FOOT-01, FOOT-02 | e2e | `npx playwright test tests/footer.spec.ts -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/services.spec.ts` — stubs for SERV-01
- [ ] `tests/clients.spec.ts` — stubs for CLNT-01, CLNT-02
- [ ] `tests/about.spec.ts` — stubs for ABUT-01
- [ ] `tests/process.spec.ts` — stubs for PROC-01
- [ ] `tests/testimonials.spec.ts` — stubs for TEST-01
- [ ] `tests/contact.spec.ts` — stubs for CONT-01, CONT-03, CONT-04
- [ ] `tests/footer.spec.ts` — stubs for FOOT-01, FOOT-02
- [ ] `tests/data.test.ts` — extend for about and clients data validation

*Existing infrastructure (vitest + Playwright) covers framework needs.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| CONT-02 form validation | CONT-02 | Form removed per user decision — N/A | N/A — requirement superseded |
| About responsive layout | ABUT-02 | Responsive layout needs visual check at breakpoints | Resize browser: mobile (375px) stacked, desktop (1024px+) side-by-side |
| Marquee animation smoothness | CLNT-01 | CSS animation quality is visual | Open page, observe logo marquee auto-scrolling continuously |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
