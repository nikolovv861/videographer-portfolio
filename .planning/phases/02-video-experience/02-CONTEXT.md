# Phase 2: Video Experience - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Hero section with full-screen autoplay showreel video, featured work grid with hover video previews and click-to-open case study modals, and showreel section with embedded video player. This phase transforms the site from a structural skeleton into a video-first cinematic experience.

</domain>

<decisions>
## Implementation Decisions

### Video file strategy
- All primary videos (hero background, showreel player, project case study videos) hosted on **Vimeo** — use Vimeo Player API for embedding
- Hover preview clips on project cards use **self-hosted mp4** files in `/public/videos/` — instant playback, no Vimeo API overhead for 6 simultaneous potential hover targets
- Development placeholders: **static poster image + centered play icon** — no external dependencies during dev, clean dark placeholder aesthetic
- Project data already has `videoUrl` and `thumbnailUrl` fields — extend with Vimeo IDs where needed

### Hero section presentation
- Center-aligned layout (matches existing HeroPlaceholder): headline, tagline, and two CTAs centered in viewport over video
- Dark gradient overlay between video and text (existing `bg-gradient-to-b from-background/80 via-background/60 to-background`) — ensures text readability and smooth transition to next section
- Full-viewport height (`min-h-screen`), video fills entire background
- Two CTAs: "View My Work" (scrolls to #work) + "Start a Project" (scrolls to #contact) — already in HeroPlaceholder

### Project card interactions
- **Instant autoplay on hover** — video starts immediately when cursor enters card, muted, looped. Stops and reverts to thumbnail on mouse leave
- Minimal card at rest (flat, no border/shadow), **bold hover treatment**: subtle scale-up (~1.02), gold border or glow accent, title emphasis shift
- 3-column grid on desktop (current layout: 1col mobile / 2col md / 3col lg), 6 projects = 2 clean rows
- Category tag + project title visible at rest below thumbnail

### Case study modal
- Full-screen modal with backdrop blur (per PROJECT.md spec)
- Close via: close button (top-right), backdrop click, Escape key
- Background scroll locked while modal is open, scroll position preserved
- Modal content scrolls internally
- Project data fields for modal: hero video, metadata (client, year, role, type), challenge, approach, result, gallery — all already defined in data/projects.ts

### Claude's Discretion
- Hero parallax depth effect approach (content fade+lift vs video parallax vs combination)
- Scroll-down indicator on hero (animated chevron, text, or none)
- Mobile card interaction pattern (tap-to-open-modal directly vs tap-to-preview-then-tap)
- Modal content layout (video-hero-then-narrative vs side-by-side on desktop)
- Modal open/close transition style (fade with blur vs slide-up vs combination)
- Gallery interaction level (static grid vs clickable lightbox)
- Inter-project navigation within modal (prev/next arrows vs close-and-pick)
- Vimeo player configuration (background mode for hero, controls for showreel)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `HeroPlaceholder` (`components/sections/HeroPlaceholder.tsx`): Center-aligned layout with gradient overlay, two CTAs — upgrade to real video background
- `WorkPlaceholder` (`components/sections/WorkPlaceholder.tsx`): 3-column grid iterating over `projects` data — upgrade cards with hover video + click modal
- `ShowreelPlaceholder` (`components/sections/ShowreelPlaceholder.tsx`): Centered layout with aspect-video placeholder — upgrade with Vimeo embed
- `Button` (`components/ui/Button.tsx`): `default` and `cta` variants already built, used by hero and showreel
- `SectionWrapper` (`components/ui/SectionWrapper.tsx`): Section container with `fullBleed` option, py-32/py-48 editorial spacing

### Established Patterns
- All section content sourced from typed data imports in `data/` — zero hardcoded strings
- `Project` type defined in `lib/types.ts` with all case study fields (id, title, category, client, year, role, type, thumbnailUrl, videoUrl, challenge, approach, result, gallery)
- Native anchor hrefs for smooth scroll (not Next.js Link)
- Z-index scale: Content 0, Nav 50, Modal backdrop 100, Modal content 110

### Integration Points
- `data/projects.ts` — may need Vimeo ID field added to Project type alongside existing videoUrl
- Hero section replaces `HeroPlaceholder` in `app/page.tsx`
- Work section replaces `WorkPlaceholder` — needs new modal component
- Showreel section replaces `ShowreelPlaceholder` — needs Vimeo embed component
- Modal needs scroll-lock mechanism (body overflow hidden toggle)

</code_context>

<specifics>
## Specific Ideas

- Hero video via Vimeo background mode — no player controls visible, seamless full-bleed autoplay
- Card hover should feel immediate and responsive — no delay, instant video swap
- Gold accent on hover cards matches the "gold at key interaction points" design principle from Phase 1
- Development placeholders should look intentional, not broken — dark poster + play icon, not empty boxes

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-video-experience*
*Context gathered: 2026-03-08*
