# Pitfalls Research: Videographer Portfolio

## Critical Pitfalls

### 1. Video Performance Kills Mobile Experience

**The Problem:** Auto-playing background videos on mobile drain battery, consume data, and often stutter. Many mobile browsers restrict autoplay or throttle video performance. A video-heavy portfolio that works beautifully on desktop can be unusable on mobile.

**Warning Signs:**
- Hero video stutters or doesn't play on mobile Safari/Chrome
- Page takes 10+ seconds to become interactive on 4G
- Lighthouse performance score drops below 50 on mobile
- Large Contentful Paint (LCP) exceeds 4 seconds

**Prevention:**
- Use poster images on mobile instead of autoplay video (detect via media query or `matchMedia`)
- Compress videos aggressively: 720p max for background video, target < 5MB
- Use `loading="lazy"` on all non-hero videos
- Hover preview videos: only load when user hovers (intersection observer + preload on hover)
- Consider serving WebM (smaller) with MP4 fallback
- Set `preload="none"` on videos below the fold

**Phase:** Foundation setup + Hero section

---

### 2. Framer Motion Bundle Size & Hydration Jank

**The Problem:** motion (framer-motion) is ~45KB gzipped. If every section imports the full library, you get a large JS bundle. Additionally, scroll-triggered animations can cause layout shifts during hydration if initial states don't match server-rendered HTML.

**Warning Signs:**
- Total JS bundle exceeds 200KB gzipped
- Elements "flash" or jump on page load (hydration mismatch)
- Scroll position resets on hydration
- Loading screen animation stutters

**Prevention:**
- Import only what you need: `import { motion, useScroll, useTransform } from 'motion/react'`
- Set `initial` states that match the server-rendered appearance (e.g., `opacity: 0` for elements that fade in — this is fine because they're hidden anyway)
- Use `useReducedMotion()` hook to disable animations for users who prefer it
- Loading screen should mask hydration — the counter intro naturally covers any initial jank
- Don't animate layout properties (width, height) — stick to transforms and opacity

**Phase:** Animation implementation (Polish phase)

---

### 3. Custom Cursor Accessibility & Mobile Issues

**The Problem:** Custom cursors that replace the native cursor can break accessibility (screen readers, keyboard navigation), cause performance issues (re-rendering on every mouse move), and confuse mobile users where there's no cursor.

**Warning Signs:**
- Cursor component causes janky performance (re-renders 60fps)
- Tab navigation doesn't show focus indicators
- Mobile shows a phantom cursor or weird touch interactions
- Cursor gets "stuck" when leaving/entering the browser window

**Prevention:**
- Desktop only — detect with `matchMedia('(pointer: fine)')`, don't render on touch devices
- Use CSS `cursor: none` on body only when custom cursor is active
- Throttle position updates with `requestAnimationFrame`, not React state on every mousemove
- Use CSS transforms (GPU-accelerated) for cursor position, not top/left
- Maintain native focus indicators for keyboard navigation
- Handle `mouseenter`/`mouseleave` on window to show/hide cursor

**Phase:** Polish phase

---

### 4. Scroll Spy Active State Fights with Smooth Scroll

**The Problem:** When using intersection observer to highlight the active nav link AND smooth scrolling to sections, they fight each other. During a smooth scroll to section 5, sections 2, 3, 4 all briefly become "active" as they pass through the viewport, causing the nav highlight to flicker.

**Warning Signs:**
- Nav active state flickers through multiple sections during smooth scroll
- Active section doesn't match the section user clicked
- Scroll spy triggers animations on sections the user is scrolling past

**Prevention:**
- Disable scroll spy during programmatic smooth scrolling (set a flag, re-enable after scroll settles)
- Use a debounce/threshold on intersection observer (e.g., `threshold: 0.5` — section must be 50% visible)
- Alternatively, use scroll position calculation instead of intersection observer for nav state
- Set `rootMargin` to account for fixed nav height

**Phase:** Navigation implementation

---

### 5. Modal Scroll Lock Breaks Page State

**The Problem:** When opening a full-screen project modal, you need to prevent background scrolling. Naive implementations (`overflow: hidden` on body) cause the page to jump to top, lose scroll position, or create a visible scrollbar shift.

**Warning Signs:**
- Page jumps when modal opens/closes
- Background content shifts sideways when scrollbar disappears
- User loses their scroll position after closing modal
- Modal content can't be scrolled on mobile

**Prevention:**
- Save scroll position before opening modal, restore on close
- Use `position: fixed` on body with `top: -scrollY` to lock scroll without jumping
- Add `padding-right` equal to scrollbar width to prevent content shift
- On mobile, ensure modal itself is scrollable (touch events)
- Use `AnimatePresence` for smooth modal enter/exit animations
- Consider `document.body.style.overflow = 'hidden'` + scrollbar compensation

**Phase:** Featured Work / Modal implementation

---

### 6. Loading Screen Blocks Content & Hurts SEO

**The Problem:** A loading screen that takes too long annoys users and can hurt SEO if search engines see an empty page. If the counter animation runs for 3+ seconds every visit, returning visitors will abandon the site.

**Warning Signs:**
- Users see loading screen on every page visit (including back-button navigation)
- Search engines index the loading screen instead of content
- Loading screen animation takes > 2.5 seconds
- Content is not server-rendered behind the loading screen

**Prevention:**
- Keep the counter animation fast: 1.5-2 seconds maximum
- Content MUST be server-rendered behind the loading screen (not lazy-loaded after)
- Use `sessionStorage` to skip the intro on subsequent visits within a session
- The loading screen is purely visual overlay — actual page content renders underneath
- Don't block rendering — use CSS overlay that fades out, not conditional rendering

**Phase:** Loading screen implementation (Polish phase)

---

### 7. Parallax Scroll Jank on Lower-End Devices

**The Problem:** Parallax effects that use JavaScript to translate elements on scroll can cause jank (dropped frames) on lower-end devices. The scroll handler fires frequently and moving elements triggers repaints.

**Warning Signs:**
- Scrolling feels "heavy" or stuttery
- Parallax elements visibly lag behind scroll
- CPU usage spikes during scrolling
- Mobile devices get hot

**Prevention:**
- Use CSS `transform: translate3d()` (GPU-accelerated) — never use `top`/`margin-top`
- motion's `useScroll` + `useTransform` handles this well with requestAnimationFrame
- Limit parallax to 2-3 elements max (hero section primarily)
- Respect `prefers-reduced-motion` — disable parallax entirely for those users
- Test on throttled CPU (Chrome DevTools → Performance → 4x slowdown)

**Phase:** Hero section + Polish phase

---

### 8. Contact Form Without Backend

**The Problem:** A contact form needs somewhere to send data. Without a backend, the form is decorative. Common solutions each have tradeoffs.

**Warning Signs:**
- Form submits but data goes nowhere
- Using `mailto:` links (terrible UX, opens email client)
- Relying on a service that has strict free-tier limits

**Prevention:**
- For the template: implement the form UI with validation, but make the submit handler configurable
- Document integration options: Formspree (free tier: 50 submissions/month), Resend, or a Next.js API route with nodemailer
- For now: show a success toast after "submission" with a note that backend integration is needed
- Keep the form handler abstract — easy to swap in any email service

**Phase:** Contact section implementation

---

## Medium-Risk Pitfalls

### 9. Font Loading Flash (FOUT/FOIT)

**Prevention:** Use `next/font/google` with `display: 'swap'`. Syne is a Google Font — Next.js will self-host it and prevent layout shift.

### 10. Z-Index Wars

**Prevention:** Establish a z-index scale early:
- Content: 0
- Section dividers: 10
- Navigation: 50
- Custom cursor: 90
- Modal backdrop: 100
- Modal content: 110
- Loading screen: 200

### 11. Inconsistent Section Spacing

**Prevention:** Define section padding as a Tailwind utility or CSS variable. Use consistently: `py-24 md:py-32 lg:py-40` on all sections.

---
*Researched: 2026-03-07*
