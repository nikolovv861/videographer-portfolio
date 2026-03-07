# Phase 2: Video Experience - Research

**Researched:** 2026-03-08
**Domain:** Video embedding (Vimeo + self-hosted mp4), modal dialogs, scroll locking, parallax effects
**Confidence:** HIGH

## Summary

Phase 2 transforms the structural skeleton from Phase 1 into a video-first cinematic experience. The three main areas are: (1) a hero section with full-screen Vimeo background video, (2) a featured work grid with self-hosted mp4 hover previews and a full-screen case study modal, and (3) a showreel section with an embedded Vimeo player with controls.

The approach uses Vimeo's `background=1` iframe parameter for the hero (autoplay, muted, looped, no controls) and a standard Vimeo iframe embed for the showreel player. Hover preview clips use self-hosted mp4 files via native `<video>` elements for instant playback without API overhead. The case study modal is a custom full-screen overlay with scroll locking, keyboard dismiss, and internal scrolling.

**Primary recommendation:** Use plain Vimeo iframes (no @vimeo/player SDK needed for this scope), native `<video>` elements for hover previews, and a custom React scroll-lock hook. No additional npm dependencies required.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- All primary videos (hero background, showreel player, project case study videos) hosted on **Vimeo** -- use Vimeo Player API for embedding
- Hover preview clips on project cards use **self-hosted mp4** files in `/public/videos/` -- instant playback, no Vimeo API overhead for 6 simultaneous potential hover targets
- Development placeholders: **static poster image + centered play icon** -- no external dependencies during dev, clean dark placeholder aesthetic
- Project data already has `videoUrl` and `thumbnailUrl` fields -- extend with Vimeo IDs where needed
- Center-aligned hero layout matching existing HeroPlaceholder: headline, tagline, two CTAs centered in viewport over video
- Dark gradient overlay between video and text (existing `bg-gradient-to-b from-background/80 via-background/60 to-background`)
- Full-viewport height (`min-h-screen`), video fills entire background
- Two CTAs: "View My Work" (scrolls to #work) + "Start a Project" (scrolls to #contact)
- **Instant autoplay on hover** for project cards -- video starts immediately on cursor enter, muted, looped; stops and reverts to thumbnail on mouse leave
- Minimal card at rest (flat, no border/shadow), bold hover treatment: subtle scale-up (~1.02), gold border or glow accent, title emphasis shift
- 3-column grid on desktop (1col mobile / 2col md / 3col lg), 6 projects = 2 clean rows
- Category tag + project title visible at rest below thumbnail
- Full-screen modal with backdrop blur
- Close via: close button (top-right), backdrop click, Escape key
- Background scroll locked while modal is open, scroll position preserved
- Modal content scrolls internally
- Modal data fields: hero video, metadata (client, year, role, type), challenge, approach, result, gallery

### Claude's Discretion
- Hero parallax depth effect approach (content fade+lift vs video parallax vs combination)
- Scroll-down indicator on hero (animated chevron, text, or none)
- Mobile card interaction pattern (tap-to-open-modal directly vs tap-to-preview-then-tap)
- Modal content layout (video-hero-then-narrative vs side-by-side on desktop)
- Modal open/close transition style (fade with blur vs slide-up vs combination)
- Gallery interaction level (static grid vs clickable lightbox)
- Inter-project navigation within modal (prev/next arrows vs close-and-pick)
- Vimeo player configuration (background mode for hero, controls for showreel)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Full-screen autoplay showreel video plays muted and looped as background | Vimeo `background=1` iframe parameter handles autoplay+muted+loop; dev placeholder pattern with poster image |
| HERO-02 | Headline and subheadline text overlay on video with readable contrast | Existing gradient overlay pattern from HeroPlaceholder; z-index layering |
| HERO-03 | Two CTA buttons: "View My Work" + "Start a Project" | Already built in HeroPlaceholder with Button component; anchor scroll pattern established |
| HERO-04 | Parallax depth effect on hero content during scroll | CSS transform + scroll event listener or IntersectionObserver; discretion area |
| WORK-01 | Grid displays 6-9 project cards with video thumbnail, project title, and category tag | Existing WorkPlaceholder grid layout (1/2/3 col); 6 projects in data/projects.ts |
| WORK-02 | Hovering a card plays a short video loop preview | Native `<video>` element with onMouseEnter play / onMouseLeave pause+reset |
| WORK-03 | Clicking a card opens full-screen modal with backdrop blur | Custom modal component with React state; backdrop-blur-sm CSS |
| WORK-04 | Modal displays hero video, metadata, challenge/approach/result, gallery | Project type already has all fields; modal layout pattern |
| WORK-05 | Modal can be closed via close button, backdrop click, or Escape key | onClick handler, onKeyDown listener, X button component |
| WORK-06 | Background scroll locked while modal is open without losing scroll position | Custom useScrollLock hook using body overflow + scrollbar width compensation |
| REEL-01 | Large embedded video player with play controls | Vimeo iframe with standard controls (no background=1) |
| REEL-02 | Short description text below/beside player | Already in ShowreelPlaceholder; data-driven text |
| REEL-03 | Two buttons: "Watch Showreel" + "See All Work" | Button component with anchor hrefs; scroll to sections |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vimeo iframe embed | N/A (URL params) | Video embedding for hero bg and showreel player | No npm dependency needed; `background=1` param for hero, standard embed for showreel |
| Native `<video>` element | Browser API | Hover preview clips on project cards | Zero overhead, instant playback for self-hosted mp4s, no library needed |
| React state + refs | React 19 | Modal open/close, video ref control, scroll lock | Built-in React primitives sufficient for this scope |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^0.577.0 | Icons (X close button, play icon, chevron) | Already installed; use for modal close, placeholder play icons |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vimeo iframe | @vimeo/player SDK | SDK adds npm dependency + JS bundle; iframe with URL params sufficient for background mode and standard playback |
| Native `<video>` | react-player | Unnecessary abstraction for simple play/pause on hover; adds bundle size |
| Custom scroll lock | body-scroll-lock npm | 3KB library for something achievable in ~15 lines; package is unmaintained (last update 2019) |
| Custom modal | @radix-ui/dialog | Would add dependency; custom modal is straightforward for this single use case |

**Installation:**
```bash
# No new dependencies needed for Phase 2
# All required packages already installed
```

## Architecture Patterns

### Recommended Project Structure
```
components/
  sections/
    Hero.tsx              # Replaces HeroPlaceholder -- Vimeo bg video + overlay content
    FeaturedWork.tsx       # Replaces WorkPlaceholder -- grid of ProjectCards
    Showreel.tsx           # Replaces ShowreelPlaceholder -- Vimeo embed + description
  ui/
    ProjectCard.tsx        # Individual card with hover video preview
    ProjectModal.tsx       # Full-screen case study modal
    VimeoEmbed.tsx         # Reusable Vimeo iframe wrapper (used by Hero and Showreel)
hooks/
  useScrollLock.ts         # Body scroll lock/unlock with scrollbar compensation
lib/
  types.ts                 # Extend Project type with vimeoId field
data/
  projects.ts              # Add vimeoId to each project entry
  hero.ts                  # Hero section content (headline, tagline) if not already in siteConfig
```

### Pattern 1: Vimeo Background Video (Hero)
**What:** Full-screen Vimeo iframe with `background=1` parameter that autoplays muted and looped with no visible controls.
**When to use:** Hero section background video.
**Example:**
```tsx
// Vimeo background mode -- autoplay, muted, looped, no controls
function VimeoBackground({ vimeoId }: { vimeoId: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&autopause=0`}
        className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
        style={{ border: 0 }}
        allow="autoplay; fullscreen"
        title="Hero background video"
      />
    </div>
  );
}
```

### Pattern 2: Self-Hosted Video Hover Preview (Project Card)
**What:** Native `<video>` element that plays on mouse enter and pauses/resets on mouse leave.
**When to use:** Project card hover previews with self-hosted mp4 files.
**Example:**
```tsx
// Instant hover video preview
function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative aspect-video overflow-hidden">
        {/* Poster image shown at rest */}
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Video plays on hover, hidden until playing */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
```

### Pattern 3: Scroll Lock Hook
**What:** Custom hook that locks body scroll when modal is open and preserves scroll position.
**When to use:** Any modal overlay that should prevent background scrolling.
**Example:**
```tsx
function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    // For iOS compatibility
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
```

### Pattern 4: Modal with Escape Key and Backdrop Click
**What:** Full-screen modal overlay with multiple close mechanisms.
**When to use:** Case study modal.
**Example:**
```tsx
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useScrollLock(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative z-[110] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={onClose} className="absolute right-4 top-4 z-10">
          <X className="h-6 w-6" />
        </button>
        {/* Modal content */}
      </div>
    </div>
  );
}
```

### Pattern 5: Development Placeholder (No External Dependencies)
**What:** Dark poster image with centered play icon overlay, used during development before real video URLs are configured.
**When to use:** All video embed points during development.
**Example:**
```tsx
function VideoPlaceholder({ label }: { label?: string }) {
  return (
    <div className="relative flex aspect-video items-center justify-center bg-foreground/5">
      <Play className="h-12 w-12 text-foreground/30" />
      {label && <span className="absolute bottom-4 text-sm text-body">{label}</span>}
    </div>
  );
}
```

### Anti-Patterns to Avoid
- **Loading @vimeo/player SDK for simple embeds:** The iframe with URL parameters handles background mode and standard playback without JS SDK overhead.
- **Preloading all 6 hover videos eagerly:** Use `preload="none"` on video elements; the browser will fetch on demand when play() is called.
- **Using `position: fixed` on body without storing scrollY:** iOS Safari will reset scroll position; must capture and restore scrollY.
- **Relying on `overflow: hidden` alone for iOS scroll lock:** Does not work on iOS Safari; must use the `position: fixed` + `top` technique.
- **Nesting click handlers without stopPropagation:** Backdrop click handler will fire when clicking modal content unless propagation is stopped.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Vimeo video embedding | Custom Vimeo API integration | iframe with URL parameters (`background=1`, `controls=0`) | Vimeo's iframe handles all browser autoplay policies, DRM, adaptive bitrate |
| Icon set | Custom SVG icons | lucide-react (already installed) | Consistent icon set, tree-shakeable, 1000+ icons |
| Responsive video aspect ratio | Custom JS resize handlers | CSS `aspect-video` (Tailwind) + absolute positioning | Pure CSS solution is simpler and more performant |

**Key insight:** This phase requires zero new npm dependencies. The browser's native `<video>` API and Vimeo's iframe parameters cover all video needs. React state and refs handle all interactivity.

## Common Pitfalls

### Pitfall 1: Vimeo Background Mode Requires Paid Plan
**What goes wrong:** `background=1` parameter only works for Vimeo Plus, PRO, or Business accounts. Free accounts get an error or fallback.
**Why it happens:** Vimeo restricts background/chromeless embedding to paid tiers.
**How to avoid:** Ensure the Vimeo account used has a paid plan. For development, use a placeholder image with play icon overlay (already decided). The `background=1` parameter will simply be ignored on free accounts.
**Warning signs:** Video shows Vimeo branding/controls instead of seamless background.

### Pitfall 2: Autoplay Blocked by Browsers
**What goes wrong:** Video doesn't autoplay on page load.
**Why it happens:** All modern browsers require videos to be muted for autoplay. Some browsers have additional restrictions.
**How to avoid:** Always include `muted` attribute for `<video>` elements and `allow="autoplay"` on Vimeo iframes. Vimeo's `background=1` already handles this by muting by default.
**Warning signs:** Hero appears as a still frame instead of playing video.

### Pitfall 3: iOS Safari Scroll Lock
**What goes wrong:** `overflow: hidden` on body doesn't prevent scrolling on iOS Safari. User can still scroll the background behind the modal.
**Why it happens:** iOS Safari has a unique scrolling implementation that ignores `overflow: hidden` on the body.
**How to avoid:** Use `position: fixed` + `top: -scrollY` + `width: 100%` technique (shown in Pattern 3 above).
**Warning signs:** Background scrolls behind modal on iPhone/iPad.

### Pitfall 4: Scrollbar Width Layout Shift
**What goes wrong:** When modal opens and body scroll is locked, the scrollbar disappears and content shifts right by ~15px.
**Why it happens:** Removing the scrollbar changes the viewport width.
**How to avoid:** Calculate scrollbar width (`window.innerWidth - document.documentElement.clientWidth`) and add as `padding-right` to body when locking scroll.
**Warning signs:** Content "jumps" horizontally when modal opens/closes.

### Pitfall 5: Multiple Videos Playing Simultaneously on Hover
**What goes wrong:** User quickly hovers over multiple cards, starting multiple video downloads/playback.
**Why it happens:** Each card independently calls `.play()` without coordination.
**How to avoid:** Use `preload="none"` so videos don't prefetch. The browser handles concurrent requests. Optionally, track which card is currently playing and pause others, but with `preload="none"` this is typically not a performance issue.
**Warning signs:** Audio leaks (not applicable since all muted), high bandwidth on slow connections.

### Pitfall 6: Modal Backdrop Click Fires on Content Click
**What goes wrong:** Clicking inside the modal content triggers the backdrop's onClick and closes the modal.
**Why it happens:** Click events bubble up from modal content to the backdrop container.
**How to avoid:** Use `e.stopPropagation()` on the modal content container, or check `e.target === e.currentTarget` on the backdrop click handler.
**Warning signs:** Modal closes when clicking any content inside it.

### Pitfall 7: Vimeo iframe Aspect Ratio on Full-Width
**What goes wrong:** Vimeo background iframe doesn't cover the full viewport, leaving black bars or gaps.
**Why it happens:** iframe maintains 16:9 aspect ratio but viewport may be wider or taller.
**How to avoid:** Use CSS to make the iframe larger than the container with `min-w-full min-h-full` and center with transforms. The container uses `overflow-hidden`.
**Warning signs:** Black bars visible on ultra-wide or tall viewports.

## Code Examples

### Vimeo Embed URL Formats
```
# Background mode (hero) -- autoplay, muted, looped, no controls
https://player.vimeo.com/video/{VIMEO_ID}?background=1&autopause=0

# Standard player with controls (showreel)
https://player.vimeo.com/video/{VIMEO_ID}?color=c9a96e&title=0&byline=0&portrait=0

# Chromeless (no controls but not forced mute/autoplay)
https://player.vimeo.com/video/{VIMEO_ID}?controls=0
```

### Extended Project Type
```typescript
// lib/types.ts -- extend with Vimeo ID
export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  role: string;
  type: string;
  thumbnailUrl: string;
  videoUrl: string;        // Self-hosted mp4 for hover preview
  vimeoId?: string;        // Vimeo video ID for modal case study embed
  challenge: string;
  approach: string;
  result: string;
  gallery: string[];
}
```

### Z-Index Scale (Established in Phase 1)
```
Content:       0 (default)
Nav:          50 (z-50)
Modal backdrop: 100 (z-[100])
Modal content:  110 (z-[110])
```

### Hero Section Parallax (Discretion Recommendation)
```tsx
// Simple CSS-based parallax using scroll-driven transforms
// Recommend: content fade+lift on scroll (simpler, performant)
function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const translateY = scrollY * 0.3;

  return (
    <section className="relative min-h-screen">
      {/* Video background stays fixed */}
      {/* Content fades and lifts */}
      <div style={{ opacity, transform: `translateY(${translateY}px)` }}>
        {/* headline, tagline, CTAs */}
      </div>
    </section>
  );
}
```

## Discretion Recommendations

Based on research, here are recommendations for areas left to Claude's discretion:

| Area | Recommendation | Rationale |
|------|---------------|-----------|
| Hero parallax | Content fade+lift (content opacity decreases and translates up as user scrolls) | Simpler than video parallax; avoids iframe z-index complexity; cinematic fade-out effect |
| Scroll-down indicator | Animated chevron (ChevronDown from lucide-react with CSS bounce animation) | Subtle visual cue without text clutter; common pattern for full-screen heroes |
| Mobile card interaction | Tap opens modal directly (no preview step) | Hover preview is desktop-only; tap-to-preview adds friction on mobile; simpler UX |
| Modal content layout | Video hero at top, then linear narrative (metadata, challenge, approach, result, gallery) | Single-column scroll is mobile-first; avoids complex responsive layout; reads like a case study |
| Modal transition | Fade in with slight scale-up (opacity 0->1 + scale 0.95->1, 300ms) + backdrop blur fade | Smooth, cinematic; no jarring slide; matches the premium aesthetic |
| Gallery | Static grid (2-3 columns) with rounded corners | Lightbox adds complexity; gallery images are supplementary, not primary content |
| Inter-project navigation | Close and pick from grid (no prev/next) | Simpler implementation; grid is visible and fast to re-access; prev/next adds state complexity |
| Vimeo config | `background=1` for hero; standard embed with `title=0&byline=0&portrait=0&color=c9a96e` for showreel | Clean look; gold accent color matches brand |

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @vimeo/player JS SDK for all embeds | iframe with URL params for simple cases | Always available | No JS dependency needed for background/standard playback |
| body-scroll-lock npm package | Custom useScrollLock hook (position:fixed technique) | body-scroll-lock unmaintained since 2019 | Zero dependency; ~15 lines of code; handles iOS |
| Custom video.js player | Native `<video>` element | HTML5 spec stable | No library needed for simple play/pause/mute operations |

## Open Questions

1. **Vimeo account plan level**
   - What we know: `background=1` requires Plus/PRO/Business
   - What's unclear: Which Vimeo plan will be used for production
   - Recommendation: Build with placeholder images for dev; the iframe embed works the same regardless -- if the account doesn't support background mode, it falls back gracefully

2. **Actual Vimeo video IDs**
   - What we know: Placeholder data uses self-hosted mp4 paths
   - What's unclear: Real Vimeo IDs for hero showreel and project case studies
   - Recommendation: Use placeholder video IDs in data files; the component accepts any valid Vimeo ID

3. **Video file sizes for hover previews**
   - What we know: Self-hosted mp4s in `/public/videos/` for hover previews
   - What's unclear: Target file size and duration for hover clips
   - Recommendation: Keep clips under 5 seconds, compress to ~500KB-1MB each; total page weight manageable with `preload="none"`

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 (unit) + Playwright 1.58.2 (e2e) |
| Config file | `vitest.config.ts` / `playwright.config.ts` |
| Quick run command | `npm test` |
| Full suite command | `npm run test:all` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | Hero section has video/iframe element with autoplay attributes | e2e | `npx playwright test tests/hero-video.spec.ts --project=chromium -x` | No - Wave 0 |
| HERO-02 | Headline and subheadline visible over video background | e2e | `npx playwright test tests/hero-video.spec.ts --project=chromium -x` | No - Wave 0 |
| HERO-03 | Two CTA buttons present and scroll to correct sections | e2e | `npx playwright test tests/hero-video.spec.ts --project=chromium -x` | No - Wave 0 |
| HERO-04 | Hero content changes opacity/position on scroll | e2e | `npx playwright test tests/hero-video.spec.ts --project=chromium -x` | No - Wave 0 |
| WORK-01 | Grid displays 6 project cards with thumbnail, title, category | e2e | `npx playwright test tests/work-grid.spec.ts --project=chromium -x` | No - Wave 0 |
| WORK-02 | Hovering card shows video element playing | e2e | `npx playwright test tests/work-grid.spec.ts --project=chromium -x` | No - Wave 0 |
| WORK-03 | Clicking card opens full-screen modal with backdrop | e2e | `npx playwright test tests/project-modal.spec.ts --project=chromium -x` | No - Wave 0 |
| WORK-04 | Modal contains video, metadata, narrative sections, gallery | e2e | `npx playwright test tests/project-modal.spec.ts --project=chromium -x` | No - Wave 0 |
| WORK-05 | Modal closes via button, backdrop click, Escape | e2e | `npx playwright test tests/project-modal.spec.ts --project=chromium -x` | No - Wave 0 |
| WORK-06 | Body scroll locked when modal open, position preserved on close | e2e | `npx playwright test tests/project-modal.spec.ts --project=chromium -x` | No - Wave 0 |
| REEL-01 | Showreel section has Vimeo iframe embed | e2e | `npx playwright test tests/showreel.spec.ts --project=chromium -x` | No - Wave 0 |
| REEL-02 | Description text displayed near player | e2e | `npx playwright test tests/showreel.spec.ts --project=chromium -x` | No - Wave 0 |
| REEL-03 | Two navigation buttons present and functional | e2e | `npx playwright test tests/showreel.spec.ts --project=chromium -x` | No - Wave 0 |

### Sampling Rate
- **Per task commit:** `npx playwright test tests/{relevant}.spec.ts --project=chromium -x`
- **Per wave merge:** `npm run test:all`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/hero-video.spec.ts` -- covers HERO-01, HERO-02, HERO-03, HERO-04
- [ ] `tests/work-grid.spec.ts` -- covers WORK-01, WORK-02
- [ ] `tests/project-modal.spec.ts` -- covers WORK-03, WORK-04, WORK-05, WORK-06
- [ ] `tests/showreel.spec.ts` -- covers REEL-01, REEL-02, REEL-03

## Sources

### Primary (HIGH confidence)
- Vimeo Help Center: [Background and Chromeless videos](https://help.vimeo.com/hc/en-us/articles/12426285089681-About-embedding-background-and-Chromeless-videos) -- background=1 parameter documentation
- Vimeo Help Center: [Player Parameters](https://help.vimeo.com/hc/en-us/articles/12426260232977-About-Player-Parameters) -- all iframe URL parameters
- Vimeo Help Center: [Autoplay restrictions](https://help.vimeo.com/hc/en-us/articles/29677068222737-Troubleshooting-Autoplay-restrictions) -- browser autoplay policy guidance
- [@vimeo/player npm](https://www.npmjs.com/package/@vimeo/player) -- SDK docs (evaluated but not needed)
- [vimeo/player.js GitHub](https://github.com/vimeo/player.js/) -- constructor options reference
- Existing codebase: `lib/types.ts`, `data/projects.ts`, `components/sections/HeroPlaceholder.tsx`, `components/sections/WorkPlaceholder.tsx`, `components/sections/ShowreelPlaceholder.tsx`

### Secondary (MEDIUM confidence)
- CSS-Tricks: [Prevent Page Scrolling When Modal is Open](https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/) -- scroll lock patterns
- LogRocket: [Advanced Scroll Lock React Hook](https://blog.logrocket.com/create-advanced-scroll-lock-react-hook/) -- iOS compatibility techniques

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- Vimeo iframe params well-documented; native video API is stable browser standard
- Architecture: HIGH -- component structure follows established Phase 1 patterns; clear placeholder-to-real upgrade path
- Pitfalls: HIGH -- scroll lock and autoplay gotchas are well-documented across multiple sources; iOS issues verified by multiple references

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable domain; Vimeo embed API rarely changes)
