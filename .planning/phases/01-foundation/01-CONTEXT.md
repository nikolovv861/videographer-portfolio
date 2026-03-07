# Phase 1: Foundation - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Navigation shell (fixed header with smooth scroll, active section highlighting, mobile hamburger menu), visual design system (colors, typography, spacing, gold accent), and placeholder data architecture. This establishes everything that all future sections build on.

</domain>

<decisions>
## Implementation Decisions

### Navbar behavior
- Stays transparent while hero section is visible, transitions to solid dark background once hero is scrolled past
- No backdrop blur intermediate state — clean cut from transparent to solid
- Full-screen overlay for mobile hamburger menu — dark background, nav links centered vertically, cinematic feel
- Text logo in Syne font (left side) — no image logo, just stylized text (e.g., filmmaker's name)
- Nav links: Work, Showreel, Services, About, Contact — in Syne font
- CTA button "Start a Project": white/subtle at rest, fills champagne gold on hover — progressive reveal
- Logo + nav links + CTA layout: logo left, links center/right, CTA far right

### Section spacing & layout
- Generous vertical padding between sections: py-32 to py-48 — editorial, breathing room, sections feel like distinct chapters
- Content max-width: max-w-6xl (~72rem) — balanced, good for mixed content
- Section headings: single bold heading only, no subtitle/tagline — minimal
- Full-bleed sections: Hero (full viewport) and Client logos (edge-to-edge). All other sections contained within max-w-6xl
- Gold animated line dividers between sections (implemented in Phase 4, but spacing should account for them)

### Typography
- Headings: Syne — Bold (700) for main headings, Semibold (600) for sub-headings
- Body text: DM Sans — clean, geometric, slightly warm, pairs well with Syne
- Nav links: Syne — consistent with heading font, bold nav presence
- Both fonts loaded via next/font/google for zero layout shift

### Colors (from PROJECT.md — locked)
- Background: #0a0a0a (dark charcoal)
- Headings: #f5f5f5 (off-white)
- Body text: #a0a0a0 (warm gray)
- Accent: #c9a96e (champagne gold) — CTA hover states, section divider lines only
- 95% monochromatic, gold at key interaction points

### Z-index scale (from research — locked)
- Content: 0
- Section dividers: 10
- Navigation: 50
- Custom cursor: 90
- Modal backdrop: 100
- Modal content: 110
- Loading screen: 200

### Claude's Discretion
- Data file structure and organization (single file vs per-section)
- Exact font sizes and responsive type scale
- Letter spacing and line height values
- Tailwind config structure and custom theme setup
- Button component variants and hover transition timing
- Scroll spy implementation approach (intersection observer vs scroll position)
- Section ID naming conventions

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — fresh Create Next App scaffold. All components built from scratch.

### Established Patterns
- Next.js 16.1.6 App Router with Tailwind v4 (CSS-based config via `@theme inline`)
- Current globals.css already uses `--background: #0a0a0a` in dark mode — aligns with design
- Geist fonts currently loaded in layout.tsx — will be replaced with Syne + DM Sans

### Integration Points
- `app/layout.tsx` — replace font setup, add global providers
- `app/page.tsx` — replace scaffold with section components
- `app/globals.css` — replace with project design tokens and custom styles
- `package.json` — add motion, react-hook-form, zod, lucide-react, react-intersection-observer

</code_context>

<specifics>
## Specific Ideas

- Nav should feel like high-end film studio sites — minimal, confident, not cluttered
- Mobile menu full-screen overlay should feel cinematic — the whole screen becomes navigation
- CTA progressive reveal (white to gold on hover) — don't show gold by default, let it appear at interaction points

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-07*
