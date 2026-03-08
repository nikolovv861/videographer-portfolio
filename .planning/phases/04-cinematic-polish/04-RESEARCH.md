# Phase 4: Cinematic Polish - Research

**Researched:** 2026-03-08
**Domain:** Animation effects, custom cursor, film grain, scroll reveals, performance/SEO optimization
**Confidence:** HIGH

## Summary

Phase 4 transforms the static videographer portfolio into a cinematic, premium experience through five major feature areas: a letterbox-style loading intro, custom cursor with spring physics, film grain texture overlay, scroll-triggered section animations with staggering, and animated gold line dividers -- plus performance and SEO optimization (lazy loading, meta tags, Lighthouse > 80).

The project already uses `react-intersection-observer` for scroll detection (SectionObserver) and has a well-established component architecture with SectionWrapper, SectionObserver, and per-section components. The `motion` package (formerly Framer Motion) is NOT currently installed despite earlier notes -- it needs to be added. All animations must respect `prefers-reduced-motion`. The loading intro uses sessionStorage to distinguish first vs return visits.

**Primary recommendation:** Install `motion` (latest v12.x) for all animation orchestration -- loading intro sequencing, scroll-triggered reveals (whileInView), custom cursor spring physics (useSpring/useMotionValue), and AnimatePresence for transitions. Use CSS-only approach for film grain (SVG feTurbulence filter or CSS keyframe noise) to avoid JS overhead. Use Next.js built-in Metadata API for SEO.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Loading intro**: Cinema letterbox reveal (2.5-3s first visit), thin champagne gold line expands center-outward, letterbox frame at top/bottom third (2.39:1), logo fades in center, percentage counter bottom-right with fast ease-out, hero video visible through slit (desaturated + blurred), at 100% bars slide away + video snaps to full color/sharp focus. Return visits: 0.5s letterbox-open only via sessionStorage. Z-index 200.
- **Custom cursor**: Small off-white dot tracks directly, larger off-white ring follows with springy physics delay (~100-150ms). Hover: ring expands + fills semi-transparent champagne gold, dot shrinks/disappears. Desktop only, hidden on touch. Z-index 90. Native cursor hidden via `cursor: none`.
- **Scroll animations**: 20-30px translate-up, section-specific effects (cards stagger, text fades, full-bleed scales), 150-200ms stagger delay, animate once only on first scroll, all disabled when prefers-reduced-motion enabled.
- **Film grain**: Animated flickering like 35mm film, 5-8% opacity, hero section and dark backgrounds only, visible during loading intro.
- **Gold dividers**: Center-outward draw animation on scroll, champagne gold thin line.
- **Performance/SEO**: Videos lazy-loaded below fold with posters, meta + OG + JSON-LD tags, Lighthouse desktop > 80, all animations respect prefers-reduced-motion.

### Claude's Discretion
- Film grain implementation approach (CSS noise animation vs canvas vs SVG filter)
- Exact spring physics parameters for cursor follower
- Which sections get film grain overlay vs which stay clean
- Gold divider placement between sections
- Section-specific animation choices (which effect for which section type)
- Scroll animation easing curves and duration
- SEO structured data schema choices (LocalBusiness, CreativeWork, etc.)
- Lazy loading implementation approach

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FX-01 | Page load intro with percentage counter (0-100%) then smooth reveal | Motion AnimatePresence + sequenced animations, sessionStorage for visit detection |
| FX-02 | Loading intro skipped on return visits within same session | sessionStorage check, shortened 0.5s animation variant |
| FX-03 | Custom cursor with small dot + larger ring follower on desktop only | Motion useMotionValue + useSpring, pointer event listeners, media query for touch detection |
| FX-04 | Film grain texture overlay at low opacity on hero and dark sections | CSS/SVG feTurbulence filter approach or CSS keyframe noise animation |
| FX-05 | Scroll-triggered animations: staggered reveals, fade-ins, scale effects | Motion whileInView + variants with staggerChildren |
| FX-06 | Animated gold line dividers that draw between sections on scroll | Motion whileInView with scaleX transform from center |
| FX-07 | All animations respect prefers-reduced-motion | CSS media query + Motion reducedMotion prop |
| PERF-01 | Videos lazy-loaded below fold with poster images | Intersection Observer for Vimeo iframes, poster images as placeholders |
| PERF-02 | Meta tags, Open Graph tags, JSON-LD structured data | Next.js Metadata API (static export), JSON-LD via script tag |
| PERF-03 | Lighthouse performance score above 80 on desktop | Lazy loading, code splitting, minimal JS bundle, optimized images |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | ^12.x | All animations: scroll reveals, loading intro, cursor spring physics | Industry standard React animation library, declarative API, hardware-accelerated, built-in scroll triggers |
| next (existing) | 16.1.6 | Metadata API for SEO, image optimization | Already in project, native SEO support |
| react-intersection-observer (existing) | ^10.0.3 | Already used in SectionObserver | Already integrated for active nav tracking |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | ^1.1.2 | TypeScript types for JSON-LD structured data | Optional -- provides type safety for schema.org types |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion for cursor | Raw requestAnimationFrame + lerp | Simpler, fewer deps, but motion already needed for other animations |
| SVG feTurbulence for grain | CSS keyframe + noise PNG | PNG needs an image file, SVG is self-contained but slightly heavier on GPU |
| motion whileInView | react-intersection-observer + CSS classes | Already have RIO, but motion provides coordinated stagger + spring physics |

**Installation:**
```bash
npm install motion
```

## Architecture Patterns

### Recommended Component Structure
```
components/
  effects/
    LoadingIntro.tsx       # Full-screen letterbox loading overlay (z-200)
    CustomCursor.tsx       # Dot + ring follower (z-90, desktop only)
    FilmGrain.tsx          # Animated grain overlay component
    GoldDivider.tsx        # Animated center-outward gold line
    ScrollReveal.tsx       # Reusable scroll-triggered animation wrapper
  sections/
    [existing sections]    # Wrap children in ScrollReveal
  ui/
    VimeoEmbed.tsx         # Add lazy loading support (poster + IO)
    [existing ui]
app/
  layout.tsx               # Mount CustomCursor here (global), enhanced Metadata
  page.tsx                 # Mount LoadingIntro here (overlay sibling)
  globals.css              # Film grain keyframes, reduced-motion media query
```

### Pattern 1: Loading Intro with Sequenced Animations
**What:** A full-screen overlay component that orchestrates a multi-step animation sequence using Motion's `animate` controls or variants with `when: "beforeChildren"`.
**When to use:** Page load intro (FX-01, FX-02).
**Example:**
```typescript
// Source: motion.dev docs + project CONTEXT decisions
"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export function LoadingIntro() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("visited")) {
      setIsFirstVisit(false);
    }
    sessionStorage.setItem("visited", "true");
  }, []);

  // Orchestrate sequence: line expand -> letterbox form -> logo -> counter -> reveal
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#0a0a0a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Letterbox bars, logo, counter rendered here */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Pattern 2: Custom Cursor with Spring Physics
**What:** Two elements (dot + ring) track mouse position. Dot follows directly, ring follows with spring delay.
**When to use:** Custom cursor (FX-03).
**Example:**
```typescript
// Source: motion.dev tutorials/react-follow-pointer-with-spring
"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  // Spring-delayed ring follower
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 15 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 15 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot: follows directly */}
      <motion.div
        className="pointer-events-none fixed z-[90] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        style={{ left: cursorX, top: cursorY }}
      />
      {/* Ring: follows with spring delay */}
      <motion.div
        className="pointer-events-none fixed z-[90] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/60"
        style={{ left: ringX, top: ringY }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
      />
    </>
  );
}
```

### Pattern 3: Scroll-Triggered Stagger Reveal
**What:** Section content fades/slides in when scrolled into view, with children staggered.
**When to use:** All section animations (FX-05).
**Example:**
```typescript
// Source: motion.dev docs -- whileInView + staggerChildren
"use client";
import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Usage: wrap each child in motion.div with itemVariants
// <ScrollReveal>
//   <motion.div variants={itemVariants}>Card 1</motion.div>
//   <motion.div variants={itemVariants}>Card 2</motion.div>
// </ScrollReveal>
```

### Pattern 4: Gold Divider Draw Animation
**What:** A thin gold line that expands from center outward when scrolled into view.
**When to use:** Between sections (FX-06).
**Example:**
```typescript
"use client";
import { motion } from "motion/react";

export function GoldDivider() {
  return (
    <div className="flex justify-center py-8">
      <motion.div
        className="h-px w-full max-w-md bg-gold"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
}
```

### Pattern 5: Film Grain Overlay (CSS/SVG approach)
**What:** An animated noise texture using SVG feTurbulence, no external images needed.
**When to use:** Hero and dark section backgrounds (FX-04).
**Example:**
```typescript
// FilmGrain.tsx -- SVG filter approach (self-contained, no image needed)
export function FilmGrain({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} style={{ opacity: 0.06 }}>
      <svg className="h-full w-full">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch">
            <animate attributeName="seed" from="0" to="100" dur="0.5s" repeatCount="indefinite" />
          </feTurbulence>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
```

**Alternative CSS approach (lighter on GPU for large areas):**
```css
/* Animated grain via CSS keyframes + tiny noise PNG (base64 encoded) */
.film-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,..."); /* inline SVG noise */
  animation: grain 8s steps(10) infinite;
  pointer-events: none;
}
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  30% { transform: translate(7%, -25%); }
  50% { transform: translate(-15%, 10%); }
  70% { transform: translate(0%, 15%); }
  90% { transform: translate(-10%, 10%); }
}
```

### Anti-Patterns to Avoid
- **Animating layout properties (width/height) instead of transforms:** Use scaleX/scaleY for divider draw animations, not width transitions. Transforms are GPU-accelerated.
- **Re-triggering scroll animations on scroll back:** Use `viewport={{ once: true }}` on all whileInView animations per user decision.
- **Canvas-based film grain on large areas:** Canvas grain that redraws every frame is expensive. SVG feTurbulence with seed animation or CSS translate-shifting is more performant.
- **Blocking render with loading intro:** The loading intro must not prevent the hero video from buffering -- video should load behind the overlay.
- **Forgetting prefers-reduced-motion:** Every animation must check this. Use a global CSS media query AND Motion's built-in support.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Spring physics for cursor | Manual lerp + requestAnimationFrame loop | Motion useSpring + useMotionValue | Handles edge cases (tab switch, rapid movement), GPU-accelerated |
| Scroll-triggered reveals | Manual IntersectionObserver + CSS class toggling | Motion whileInView + variants | Handles staggering, easing, coordination natively |
| Animation sequencing (loading intro) | setTimeout chains | Motion animate() controls or variant sequencing | Cancellable, interruptible, chainable with proper cleanup |
| SEO meta tags | Manual head tag injection | Next.js Metadata API (static export) | Automatic deduplication, SSR-safe, handles OG/Twitter cards |
| Touch device detection | navigator.maxTouchPoints only | matchMedia("(hover: hover) and (pointer: fine)") | More reliable than touch point detection, covers all cases |

**Key insight:** Motion already handles the hard parts of animation -- GPU acceleration, spring physics, scroll triggers, reduced motion, unmount animations. Using it consistently across all effects keeps the codebase uniform and avoids subtle timing/cleanup bugs.

## Common Pitfalls

### Pitfall 1: Loading Intro Blocks Content
**What goes wrong:** Hero video doesn't start loading until intro completes, causing visible buffering after reveal.
**Why it happens:** Video iframe not rendered until overlay dismissed.
**How to avoid:** Render the hero video behind the overlay from the start. The overlay sits at z-200, hero at z-0. Video loads and plays (muted) during the intro sequence.
**Warning signs:** Blank/black hero area visible after intro animation completes.

### Pitfall 2: Custom Cursor Flicker on Page Load
**What goes wrong:** Default cursor visible briefly before custom cursor mounts, or custom cursor appears at (0,0).
**Why it happens:** React hydration delay, cursor position unknown until first mousemove.
**How to avoid:** Hide custom cursor elements until first mousemove event. Apply `cursor: none` on body via CSS (not JS) so native cursor is hidden immediately. Start custom cursor as invisible, show on first mousemove.
**Warning signs:** Brief cursor flash in top-left corner on page load.

### Pitfall 3: Film Grain Performance on Mobile
**What goes wrong:** SVG feTurbulence with seed animation causes frame drops on lower-powered devices.
**Why it happens:** SVG filters are CPU-rendered, animated filters recalculate every frame.
**How to avoid:** Only apply film grain on sections that are currently visible (not all at once). Keep numOctaves at 3 or below. Consider disabling grain animation on mobile (static grain only) or reducing opacity further.
**Warning signs:** Scroll jank when grain overlay is present, especially on mobile.

### Pitfall 4: Z-Index Conflicts with Existing Components
**What goes wrong:** Loading intro appears behind modal, or cursor appears above everything.
**Why it happens:** Not respecting established z-index scale.
**How to avoid:** Follow established scale: Content 0, Dividers 10, Nav 50, Cursor 90, Modal 100/110, Loader 200. Loading intro is 200 (above everything). Cursor is 90 (above nav, below modal).
**Warning signs:** Elements overlapping incorrectly during animations.

### Pitfall 5: Lighthouse Score Killed by Vimeo Iframes
**What goes wrong:** Loading multiple Vimeo iframes eagerly tanks Lighthouse performance score.
**Why it happens:** Each iframe loads ~500KB+ of Vimeo player JS/CSS, even for background videos.
**How to avoid:** Lazy load all Vimeo iframes below the fold. Show poster images initially, swap in iframe when section enters viewport. Hero iframe can load eagerly since it's above fold.
**Warning signs:** Lighthouse flagging "Reduce unused JavaScript" and "Avoid enormous network payloads".

### Pitfall 6: prefers-reduced-motion Not Comprehensive
**What goes wrong:** Some animations still play for users with reduced motion preference.
**Why it happens:** Only some animations checked, CSS animations not covered.
**How to avoid:** Add global CSS rule `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`. Also use Motion's built-in reducedMotion support. Loading intro should skip entirely (or show instant reveal) for reduced motion users.
**Warning signs:** Any visible motion when OS-level "reduce motion" is enabled.

## Code Examples

### Next.js Metadata with Open Graph (PERF-02)
```typescript
// Source: nextjs.org/docs/app/getting-started/metadata-and-og-images (v16.1.6)
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alex Rivera | Cinematic Videographer",
  description: "Cinematic videography portfolio showcasing brand films, commercials, and social content.",
  keywords: ["videographer", "cinematographer", "brand films", "commercial video", "portfolio"],
  authors: [{ name: "Alex Rivera" }],
  openGraph: {
    title: "Alex Rivera | Cinematic Videographer",
    description: "Cinematic videography portfolio showcasing brand films, commercials, and social content.",
    url: "https://alexrivera.com",
    siteName: "Alex Rivera",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Alex Rivera Videography" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Rivera | Cinematic Videographer",
    description: "Cinematic videography portfolio.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};
```

### JSON-LD Structured Data (PERF-02)
```typescript
// Source: nextjs.org/docs/app/guides/json-ld (v16.1.6)
// In app/page.tsx or app/layout.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Alex Rivera Videography",
  description: "Cinematic videography for brands, commercials, and social content.",
  url: "https://alexrivera.com",
  image: "/og-image.jpg",
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA" },
  sameAs: ["https://instagram.com/alexrivera", "https://linkedin.com/in/alexrivera"],
};

// Render in component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
/>
```

### Lazy-Loaded Vimeo Embed (PERF-01)
```typescript
// Enhanced VimeoEmbed with lazy loading
"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

interface LazyVimeoProps {
  vimeoId: string;
  mode: "background" | "player";
  posterUrl?: string;
}

export function LazyVimeoEmbed({ vimeoId, mode, posterUrl }: LazyVimeoProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  return (
    <div ref={ref} className="relative aspect-video w-full">
      {inView ? (
        <iframe /* existing iframe code */ />
      ) : posterUrl ? (
        <img src={posterUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-background" />
      )}
    </div>
  );
}
```

### Reduced Motion Global CSS (FX-07)
```css
/* app/globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Touch Device Detection for Cursor (FX-03)
```typescript
// Detect if device supports fine pointer (mouse) vs touch
function useIsDesktopPointer(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package name | `motion` package, import from `motion/react` | 2024 (v11+) | Same API, new package name and import path |
| CSS `@keyframes` for all animations | Motion declarative + CSS for simple loops | Ongoing | Motion handles orchestration, CSS for simple repeating animations |
| `navigator.maxTouchPoints` for touch detection | `matchMedia("(hover: hover)")` | 2023+ | More reliable, covers hybrid devices |
| Manual `<meta>` tags in `<Head>` | Next.js Metadata API (static export object) | Next.js 13+ App Router | Automatic deduplication, type-safe, SSR-correct |

**Deprecated/outdated:**
- `framer-motion` package: Renamed to `motion`, import path changed from `framer-motion` to `motion/react`
- `next/head` for metadata: Replaced by Metadata API in App Router

## Open Questions

1. **Film grain approach: SVG feTurbulence vs CSS keyframe noise**
   - What we know: SVG feTurbulence is self-contained (no image needed), CSS approach needs a noise image but may be lighter on GPU for large areas. SVG seed animation can cause performance issues on mobile.
   - What's unclear: Exact performance difference on this specific site with hero-sized overlays.
   - Recommendation: Start with SVG feTurbulence (simpler, no asset needed). If performance issues arise on mobile, fall back to CSS keyframe approach or disable animation on mobile. Keep numOctaves <= 3.

2. **Loading intro timing precision**
   - What we know: User wants precise 2.5-3s sequence with multiple stages (line, letterbox, logo, counter, reveal).
   - What's unclear: Exact breakpoints for each stage within the 2.5-3s window.
   - Recommendation: Use Motion's `animate()` sequence API or chained variants with `when: "afterChildren"`. Define timing constants for easy tuning.

3. **Interaction between SectionObserver and scroll animations**
   - What we know: SectionObserver already wraps every section with IntersectionObserver for active nav. Adding Motion whileInView creates a second observer per section.
   - What's unclear: Whether dual observers cause any measurable overhead.
   - Recommendation: Keep them separate -- IntersectionObserver is very lightweight, and mixing concerns (nav tracking + animation) would create tight coupling. Two observers per section is fine.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright ^1.58.2 (e2e), Vitest ^4.0.18 (unit) |
| Config file | playwright.config.ts, vitest.config.ts |
| Quick run command | `npx playwright test --project=chromium tests/cinematic-effects.spec.ts` |
| Full suite command | `npm run test:all` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FX-01 | Loading intro overlay visible on page load with counter | e2e | `npx playwright test --project=chromium tests/loading-intro.spec.ts -x` | No -- Wave 0 |
| FX-02 | Return visit skips full intro (sessionStorage) | e2e | `npx playwright test --project=chromium tests/loading-intro.spec.ts -x` | No -- Wave 0 |
| FX-03 | Custom cursor visible on desktop, hidden on touch | e2e | `npx playwright test --project=chromium tests/custom-cursor.spec.ts -x` | No -- Wave 0 |
| FX-04 | Film grain overlay present on hero/dark sections | e2e | `npx playwright test --project=chromium tests/film-grain.spec.ts -x` | No -- Wave 0 |
| FX-05 | Sections animate in on scroll (opacity/transform change) | e2e | `npx playwright test --project=chromium tests/scroll-animations.spec.ts -x` | No -- Wave 0 |
| FX-06 | Gold divider lines visible between sections | e2e | `npx playwright test --project=chromium tests/gold-dividers.spec.ts -x` | No -- Wave 0 |
| FX-07 | Animations disabled with prefers-reduced-motion | e2e | `npx playwright test --project=chromium tests/reduced-motion.spec.ts -x` | No -- Wave 0 |
| PERF-01 | Videos below fold lazy-loaded (no iframe until scroll) | e2e | `npx playwright test --project=chromium tests/lazy-loading.spec.ts -x` | No -- Wave 0 |
| PERF-02 | Meta tags, OG tags, JSON-LD present in HTML | e2e | `npx playwright test --project=chromium tests/seo-meta.spec.ts -x` | No -- Wave 0 |
| PERF-03 | Lighthouse desktop score > 80 | manual-only | Manual Lighthouse audit (Playwright cannot run Lighthouse) | N/A |

### Sampling Rate
- **Per task commit:** `npx playwright test --project=chromium tests/{relevant-spec}.spec.ts`
- **Per wave merge:** `npm run test:all`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/loading-intro.spec.ts` -- covers FX-01, FX-02
- [ ] `tests/custom-cursor.spec.ts` -- covers FX-03
- [ ] `tests/film-grain.spec.ts` -- covers FX-04
- [ ] `tests/scroll-animations.spec.ts` -- covers FX-05
- [ ] `tests/gold-dividers.spec.ts` -- covers FX-06
- [ ] `tests/reduced-motion.spec.ts` -- covers FX-07
- [ ] `tests/lazy-loading.spec.ts` -- covers PERF-01
- [ ] `tests/seo-meta.spec.ts` -- covers PERF-02
- [ ] Framework install: `npm install motion` -- motion package not yet installed

## Sources

### Primary (HIGH confidence)
- [Next.js Metadata & OG images docs](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - v16.1.6, metadata export pattern, OG configuration
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) - v16.1.6, script tag approach with sanitization
- [Motion.dev official site](https://motion.dev/docs/react) - Import path `motion/react`, package name `motion`
- Project codebase analysis - layout.tsx, page.tsx, SectionObserver, SectionWrapper, globals.css, package.json

### Secondary (MEDIUM confidence)
- [Motion scroll animations](https://motion.dev/docs/react-scroll-animations) - whileInView, viewport options (site renders client-side, verified patterns via WebSearch)
- [Motion follow pointer tutorial](https://motion.dev/tutorials/react-follow-pointer-with-spring) - useMotionValue + useSpring pattern for cursor
- [Motion stagger docs](https://motion.dev/docs/stagger) - staggerChildren variant pattern
- [CSS-Tricks animated grainy texture](https://css-tricks.com/snippets/css/animated-grainy-texture/) - CSS keyframe grain approach
- [Codrops SVG feTurbulence](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/) - SVG noise filter performance notes

### Tertiary (LOW confidence)
- Film grain: SVG feTurbulence performance on large viewport areas -- needs real-device testing

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - motion is the clear industry standard for React animation, Next.js Metadata API is documented
- Architecture: HIGH - Component structure follows existing project patterns, integration points well understood
- Pitfalls: HIGH - Common issues well-documented across community, verified with project codebase analysis
- Film grain approach: MEDIUM - Both SVG and CSS approaches work, performance comparison needs real testing

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable libraries, no fast-moving dependencies)
