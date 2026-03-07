# Research Summary: Videographer Portfolio

## Stack Recommendation

**Core:** Next.js 16 (App Router) + TypeScript + Tailwind CSS (decided)

**Complementary:**
- `motion` (^12.x) — scroll animations, parallax, page transitions, modal animations
- `react-hook-form` (^7.x) + `zod` (^3.x) — contact form validation
- `lucide-react` — tree-shakeable icons
- `react-intersection-observer` (^9.x) — scroll spy, lazy loading triggers
- `next/font/google` — Syne font loading (built-in)

**No extra library needed for:** video playback (native `<video>`), SEO (Next.js metadata API), embeds (native `<iframe>`)

**Total added bundle:** ~70KB gzipped

## Table Stakes Features

1. Full-screen showreel with autoplay video
2. Portfolio grid with video thumbnails and hover previews
3. Project case studies (modal with details)
4. Dark theme with professional typography
5. Contact form with validation
6. Services listing
7. Client logos (social proof)
8. Testimonials
9. About section
10. Sticky navigation with smooth scroll
11. Mobile responsive with hamburger menu
12. SEO meta tags and Open Graph

## Differentiators (What Makes This Premium)

1. Cinematic page load intro (counter 0-100%)
2. Custom cursor (dot + ring)
3. Heavy parallax and scroll-triggered animations
4. Film grain texture overlay
5. Animated gold section dividers
6. Full-screen project modals with case studies
7. Video hover previews on portfolio grid

## Critical Pitfalls to Watch

| # | Pitfall | Impact | Phase to Address |
|---|---------|--------|-----------------|
| 1 | Video kills mobile performance | High | Foundation + Hero |
| 2 | Motion bundle size & hydration jank | High | All animation phases |
| 3 | Custom cursor accessibility | Medium | Polish |
| 4 | Scroll spy vs smooth scroll conflicts | Medium | Navigation |
| 5 | Modal scroll lock breaks page | Medium | Featured Work |
| 6 | Loading screen blocks SEO | Medium | Polish |
| 7 | Parallax jank on low-end devices | Medium | Hero + Polish |
| 8 | Contact form needs backend | Low | Contact section |

## Architecture Highlights

- **Single page, no routing** — one `page.tsx` renders all sections in scroll order
- **Client components at section level** — each section manages its own animations
- **Static data files** — all content in `/data/*.ts` files, easy to swap
- **Portal for modals** — avoids z-index conflicts
- **Build order:** Foundation (config, layout, nav) → Core sections → Polish (animations, effects)

## Key Recommendations

1. **Mobile-first video strategy:** Poster images on mobile, autoplay only on desktop. Compress to < 5MB.
2. **Loading screen as hydration mask:** The counter intro naturally covers any animation initialization jank. Keep it under 2 seconds. Skip on return visits (sessionStorage).
3. **Z-index scale:** Establish early — Content(0), Nav(50), Cursor(90), Modal(100-110), Loader(200).
4. **Respect `prefers-reduced-motion`:** Disable parallax and heavy animations for users who prefer it.
5. **Form handler abstraction:** Build the form UI now, make the submit handler easily swappable for any email service.

---
*Synthesized: 2026-03-07*
