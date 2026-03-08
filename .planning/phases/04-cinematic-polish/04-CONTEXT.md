# Phase 4: Cinematic Polish - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Page load intro sequence, custom cursor (desktop only), film grain texture overlay, scroll-triggered section animations with staggered reveals, animated gold line dividers between sections, prefers-reduced-motion support, and performance/SEO optimization (lazy loading, meta tags, Lighthouse >80). This phase transforms the static page into a cinematic, premium experience.

</domain>

<decisions>
## Implementation Decisions

### Loading intro sequence
- **Cinema letterbox reveal** (2.5-3 seconds on first visit):
  1. Pure dark charcoal screen (#0a0a0a)
  2. Single thin champagne gold (#c9a96e) horizontal line appears dead center, expands outward from middle to full viewport width — like a film projector warming up
  3. Line becomes a slim letterbox frame: two horizontal gold bars positioned at top and bottom third, mimicking a cinematic 2.39:1 aspect ratio
  4. Inside the letterbox frame, videographer's wordmark/logo fades in at center in off-white (#f5f5f5), very subtle
  5. Percentage counter sits small and minimal in bottom-right corner in warm gray (#a0a0a0), counting quietly with fast ease-out curve (accelerates through middle, slows near 100%)
  6. Hero video is already playing behind — visible ONLY through the narrow gap between the two letterbox bars (like looking through a cinema screen slit). During this peek phase, video is desaturated and slightly blurred
  7. At 100%: letterbox bars slide away (top bar up, bottom bar down), logo scales up slightly and fades out, video simultaneously snaps to full color and sharp focus — a "coming into focus" moment like adjusting a camera lens
  8. Subtle film grain visible throughout the intro sequence
- **Return visits** (sessionStorage): Quick 0.5s letterbox-open animation only — no counter, no logo. Brief nod that you're "back in the cinema"
- Z-index: 200 (per established z-index scale from Phase 1)

### Custom cursor
- **Dot**: small, off-white (#f5f5f5), tracks mouse position directly
- **Ring follower**: off-white (#f5f5f5) outline, larger circle, follows with springy physics delay (~100-150ms). Feels alive and responsive
- **Hover reaction**: ring expands and fills with semi-transparent champagne gold (#c9a96e). Dot shrinks or disappears. Clear "this is clickable" signal
- No text labels or icons inside cursor — size/fill change is enough signal
- Desktop only — hidden on touch devices
- Z-index: 90 (per established scale)
- Native cursor hidden via `cursor: none` on body (desktop only)

### Scroll animations
- **Travel distance**: Subtle 20-30px translate-up. Sections "appear" rather than "fly in" — refined, editorial
- **Reveal style**: Section-specific effects — different section types get distinct animations (e.g., cards stagger individually, text sections fade, full-bleed sections scale)
- **Stagger timing**: 150-200ms delay between child elements (cards in grids, process steps). 4 cards animate in ~0.8s
- **Trigger**: Animate once only on first scroll into view. No re-triggering on scroll-back
- **Reduced motion**: All animations disabled when `prefers-reduced-motion` is enabled — content appears immediately without any motion

### Film grain texture
- Animated film grain — subtle flickering/shifting like real 35mm film stock
- Opacity: 5-8% — clearly present as a texture layer, gives obvious cinematic film stock feel
- Applied to: hero section and dark section backgrounds (not content-heavy light areas)
- Grain visible during loading intro sequence as well

### Gold line dividers
- Draw animation: center-outward expansion (mirrors the loading intro's expanding line for visual consistency)
- Triggered on scroll — line draws when it enters viewport
- Placement: Claude's discretion — place where they make the most visual sense based on section flow and spacing
- Color: champagne gold (#c9a96e), thin line

### Performance & SEO
- Videos lazy-loaded below the fold with poster images (PERF-01)
- Meta tags, Open Graph tags, JSON-LD structured data (PERF-02)
- Lighthouse desktop performance score above 80 (PERF-03)
- All animations respect prefers-reduced-motion (FX-07)

### Claude's Discretion
- Film grain implementation approach (CSS noise animation vs canvas vs SVG filter)
- Exact spring physics parameters for cursor follower
- Which sections get film grain overlay vs which stay clean
- Gold divider placement between sections (editorial judgment on visual rhythm)
- Section-specific animation choices (which effect for which section type)
- Scroll animation easing curves and duration
- SEO structured data schema choices (LocalBusiness, CreativeWork, etc.)
- Lazy loading implementation approach

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Hero` (components/sections/Hero.tsx): Already has vanilla parallax with scroll listener + passive flag — may need to integrate with Framer Motion or keep separate
- `VimeoEmbed` (components/ui/VimeoEmbed.tsx): Background mode for hero video — loading intro needs to work with this
- `SectionObserver` (components/sections/SectionObserver.tsx): Already wraps every section for scroll-based active nav — could integrate scroll-triggered animations here
- `SectionWrapper` (components/ui/SectionWrapper.tsx): Wraps all content sections with consistent padding — natural place for animation wrapper
- `Button` (components/ui/Button.tsx): Has `default` and `cta` variants with hover states — cursor needs to detect these as interactive elements
- `ProjectCard` (components/ui/ProjectCard.tsx): Already references `cursor` in its code — integration point for custom cursor hover states

### Established Patterns
- All animations currently use vanilla JS/CSS (no Framer Motion yet) — Phase 4 will be the first to introduce `motion` package patterns
- `motion` (^12.x) already in package.json dependencies but unused
- Z-index scale established: Content 0, Dividers 10, Nav 50, Cursor 90, Modal 100/110, Loader 200
- CSS theme tokens in globals.css via `@theme inline` (Tailwind v4) — gold, background, foreground, heading, body colors all available
- Marquee keyframe animation already in globals.css — precedent for CSS @keyframes approach

### Integration Points
- `app/page.tsx`: Loading intro wraps entire page (or is a sibling component that overlays)
- `app/layout.tsx`: Custom cursor component likely mounts here (global, not per-page)
- `app/globals.css`: Film grain keyframes, cursor styles, reduced-motion media query
- `app/layout.tsx`: Meta tags, Open Graph, JSON-LD structured data via Next.js Metadata API
- Every section component: Needs scroll-triggered animation wrapper
- `components/sections/SectionObserver.tsx`: Potential integration point for scroll animations (already observes sections)

</code_context>

<specifics>
## Specific Ideas

- Loading intro should feel like "sitting down in a cinema as the lights dim and the screen opens up" — precision and timing, no flashy effects
- The "coming into focus" moment (desaturated/blurred → full color/sharp) ties the loading experience to the craft of filmmaking itself
- The letterbox expanding line mirrors gold dividers drawing center-outward — visual motif consistency throughout the page
- Gold only appears at interaction points (cursor hover fill, dividers, loading intro line) — 95% monochromatic principle preserved
- Film grain throughout reinforces the cinema theme — present in loading intro and page sections

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-cinematic-polish*
*Context gathered: 2026-03-08*
