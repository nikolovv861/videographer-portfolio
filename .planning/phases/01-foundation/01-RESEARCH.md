# Phase 1: Foundation - Research

**Researched:** 2026-03-07
**Domain:** Next.js App Router + Tailwind v4 design system, navigation shell, scroll spy, data architecture
**Confidence:** HIGH

## Summary

Phase 1 establishes the navigation shell (fixed header with transparent-to-solid transition, smooth scroll, active section highlighting, mobile hamburger menu), the visual design system (dark theme, Syne + DM Sans typography, champagne gold accent), and placeholder data architecture for a single-page videographer portfolio.

The project is a fresh Next.js 16.1.6 scaffold with Tailwind v4 (CSS-based `@theme inline` config, no `tailwind.config.ts`). All fonts are loaded via `next/font/google` for zero layout shift. Scroll spy uses `react-intersection-observer` (the standard React library for Intersection Observer). Smooth scrolling uses native CSS `scroll-behavior: smooth` with `scroll-padding-top` for fixed header offset.

**Primary recommendation:** Build a lean component architecture: layout.tsx sets global fonts and dark background, a Navbar client component handles scroll state and mobile menu, sections are server components with IDs, and a single `data/` directory holds all placeholder content as typed TypeScript objects.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Navbar: transparent on hero, transitions to solid dark background once hero scrolled past. No backdrop blur intermediate state.
- Mobile menu: full-screen overlay, dark background, nav links centered vertically, cinematic feel
- Text logo in Syne font (left), nav links center/right (Work, Showreel, Services, About, Contact), CTA "Start a Project" far right
- CTA button: white/subtle at rest, fills champagne gold on hover (progressive reveal)
- Section spacing: py-32 to py-48, content max-w-6xl (~72rem), single bold heading per section
- Full-bleed sections: Hero (full viewport) and Client logos (edge-to-edge). Others contained.
- Gold animated line dividers between sections (Phase 4, but spacing accounts for them)
- Typography: Syne (headings, nav), DM Sans (body) via next/font/google
- Colors: #0a0a0a background, #f5f5f5 headings, #a0a0a0 body, #c9a96e accent
- Z-index scale: Content 0, Dividers 10, Nav 50, Cursor 90, Modal backdrop 100, Modal content 110, Loading screen 200

### Claude's Discretion
- Data file structure and organization (single file vs per-section)
- Exact font sizes and responsive type scale
- Letter spacing and line height values
- Tailwind config structure and custom theme setup
- Button component variants and hover transition timing
- Scroll spy implementation approach (intersection observer vs scroll position)
- Section ID naming conventions

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Fixed navbar transparent on hero, solid dark on scroll | Scroll event listener or Intersection Observer on hero section; CSS transition on background |
| NAV-02 | Nav links smooth-scroll to sections with offset for fixed header | CSS `scroll-behavior: smooth` + `scroll-padding-top` on html element |
| NAV-03 | Active section highlighted in nav based on scroll position | `react-intersection-observer` useInView per section, context or callback to update active state |
| NAV-04 | Mobile hamburger menu opens/closes with smooth animation | Client component with state toggle, CSS transitions or motion for overlay |
| NAV-05 | Logo left, nav links center/right, CTA button right | Flexbox layout with Syne font, responsive hiding for mobile |
| VIS-01 | Dark charcoal background with off-white headings and warm gray body | Tailwind @theme inline custom colors, applied globally via globals.css |
| VIS-02 | Champagne gold accent used sparingly | Custom color token `--color-gold: #c9a96e` in @theme |
| VIS-03 | Syne headings, DM Sans body, loaded via next/font | next/font/google with CSS variables, @theme inline font mapping |
| VIS-04 | Fully responsive mobile-first design | Tailwind breakpoints (sm/md/lg/xl), mobile-first classes |
| DATA-01 | All content is placeholder stored in static data files | TypeScript data files in `data/` directory with typed interfaces |
| DATA-02 | Content organized in clearly named, easy-to-modify data files | One file per content domain (navigation, projects, services, etc.) |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Framework | Already scaffolded, App Router |
| react | 19.2.3 | UI library | Already installed |
| tailwindcss | ^4 | Styling | CSS-first config via @theme inline, already configured |
| typescript | ^5 | Type safety | Already configured with path aliases |

### To Install
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-intersection-observer | ^9.x | Scroll spy / section visibility detection | NAV-01 (hero visibility), NAV-03 (active section) |
| lucide-react | latest | Icons (hamburger, close, social) | NAV-04 (menu icon), future phases |

### Not Needed Yet (Phase 1)
| Library | Phase | Purpose |
|---------|-------|---------|
| motion | Phase 4 | Scroll-triggered animations, loading screen |
| react-hook-form | Phase 3 | Contact form |
| zod | Phase 3 | Form validation |

**Installation:**
```bash
npm install react-intersection-observer lucide-react
```

## Architecture Patterns

### Recommended Project Structure
```
app/
  layout.tsx          # Root layout: fonts, metadata, global styles
  page.tsx            # Single page: all sections composed here
  globals.css         # Tailwind import + @theme inline tokens
components/
  navbar/
    Navbar.tsx        # Client component: scroll state, mobile menu
    NavLink.tsx       # Individual nav link with active state
    MobileMenu.tsx    # Full-screen overlay menu
  sections/
    HeroPlaceholder.tsx   # Placeholder for Phase 2
    WorkPlaceholder.tsx   # Placeholder for Phase 2
    ShowreelPlaceholder.tsx
    ServicesPlaceholder.tsx
    ClientsPlaceholder.tsx
    AboutPlaceholder.tsx
    ProcessPlaceholder.tsx
    TestimonialsPlaceholder.tsx
    ContactPlaceholder.tsx
    Footer.tsx
  ui/
    Button.tsx        # Reusable button with variants (default, cta)
    SectionWrapper.tsx # Consistent section padding, max-width, ID
data/
  navigation.ts      # Nav links, section IDs, CTA config
  projects.ts         # Placeholder project data (for Phase 2)
  services.ts         # Placeholder service cards
  site.ts             # Site metadata, social links, copyright
lib/
  fonts.ts            # Syne + DM Sans font configuration
  types.ts            # Shared TypeScript interfaces
```

### Pattern 1: Font Setup with next/font/google + Tailwind v4
**What:** Define fonts in a dedicated file, apply CSS variables on html, map in @theme inline
**When to use:** Always for this project

```typescript
// lib/fonts.ts
import { Syne, DM_Sans } from "next/font/google";

export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
```

```tsx
// app/layout.tsx
import { syne, dmSans } from "@/lib/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-background text-body font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-background: #0a0a0a;
  --color-foreground: #f5f5f5;
  --color-heading: #f5f5f5;
  --color-body: #a0a0a0;
  --color-gold: #c9a96e;
  --color-nav-solid: #0a0a0a;

  --font-heading: var(--font-syne);
  --font-body: var(--font-dm-sans);
  --font-nav: var(--font-syne);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; /* offset for fixed navbar height */
}
```

**Why @theme inline:** The font variables (`--font-syne`, `--font-dm-sans`) are set by next/font as CSS variables on the html element at runtime. Using `@theme inline` ensures Tailwind resolves them where they are used in the DOM, not at build time.

### Pattern 2: Scroll Spy with react-intersection-observer
**What:** Each section observed independently, active section tracked in shared state
**When to use:** NAV-01 (hero visibility for transparent/solid toggle) and NAV-03 (active section highlighting)

```typescript
// In each section or SectionWrapper
import { useInView } from "react-intersection-observer";

// For scroll spy: threshold 0.3 means 30% visible to count as "active"
// rootMargin "-80px 0px -50% 0px" creates activation zone in top half of viewport
const { ref, inView } = useInView({
  threshold: 0.3,
  rootMargin: "-80px 0px -50% 0px",
});
```

**Recommended approach:** Use a callback pattern where each section reports its visibility to a parent context or callback, and the navbar reads the currently active section ID. This avoids prop drilling and works with server component sections that wrap a thin client observer.

### Pattern 3: Navbar Scroll Transparency
**What:** Observe the hero section; when it leaves viewport, navbar background becomes solid
**When to use:** NAV-01

```typescript
// Inside Navbar component
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Or use Intersection Observer on hero section for more precise control
```

```tsx
<header
  className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
    isScrolled ? "bg-background" : "bg-transparent"
  }`}
>
```

### Pattern 4: SectionWrapper for Consistent Layout
**What:** Reusable wrapper that enforces section spacing, max-width, and section ID
**When to use:** Every section except full-bleed (Hero, Clients)

```tsx
interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  fullBleed?: boolean;
  className?: string;
}

export function SectionWrapper({ id, children, fullBleed, className }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-32 md:py-48 ${className ?? ""}`}>
      {fullBleed ? children : (
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {children}
        </div>
      )}
    </section>
  );
}
```

### Anti-Patterns to Avoid
- **Using scroll event for active section detection:** Calculating section offsets manually is fragile, breaks on dynamic content. Use Intersection Observer instead.
- **Putting fonts in globals.css as @font-face:** Bypasses next/font optimization, causes layout shift. Always use next/font/google.
- **Using Tailwind v3 config format:** No `tailwind.config.ts` exists in v4. All theming is in CSS via `@theme` / `@theme inline`.
- **Dark mode toggle logic:** This site is always dark. Do not use `dark:` variants or media queries. Set colors directly.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Intersection observation | Custom scroll position math | `react-intersection-observer` | Handles threshold, rootMargin, cleanup, SSR safety |
| Icon SVGs | Inline SVG elements | `lucide-react` | Consistent sizing, tree-shakeable, accessible defaults |
| Font loading | @font-face in CSS | `next/font/google` | Zero layout shift, self-hosted, subset optimization |
| Smooth scrolling | JS scrollTo with easing | CSS `scroll-behavior: smooth` | Native, performant, respects user preferences |
| Scroll offset for fixed header | JS offset calculations | CSS `scroll-padding-top` | Pure CSS, no JS needed |

**Key insight:** CSS-native scroll behavior (smooth scrolling + scroll-padding) is more reliable than JavaScript scroll libraries. The only JS needed is for scroll spy (Intersection Observer) and navbar state management.

## Common Pitfalls

### Pitfall 1: Tailwind v4 @theme vs @theme inline confusion
**What goes wrong:** Font utility classes (font-heading, font-body) don't resolve to correct fonts
**Why it happens:** `@theme` without `inline` tries to resolve `var(--font-syne)` at build time, but next/font sets the variable at runtime on the DOM
**How to avoid:** Always use `@theme inline` when referencing CSS variables set by next/font
**Warning signs:** Font classes generate but render as fallback system fonts

### Pitfall 2: Scroll-padding not working with Next.js Link
**What goes wrong:** Clicking nav links scrolls to section but content hidden behind fixed header
**Why it happens:** Known Next.js issue where Link component doesn't respect scroll-padding CSS
**How to avoid:** Use native `<a href="#section-id">` for same-page anchor links, not Next.js `<Link>`. For a single-page site, native anchors are correct anyway.
**Warning signs:** Sections scroll to correct position but top is obscured by navbar

### Pitfall 3: Mobile menu scroll lock
**What goes wrong:** Background scrolls behind full-screen mobile menu overlay
**Why it happens:** Overlay is just positioned fixed but body still scrollable
**How to avoid:** Toggle `overflow-hidden` on body when mobile menu is open
**Warning signs:** Can scroll page content while menu is visible

### Pitfall 4: Z-index conflicts
**What goes wrong:** Mobile menu appears behind content, or navbar behind hero
**Why it happens:** No systematic z-index scale
**How to avoid:** Use the locked z-index scale from CONTEXT.md (nav: 50, modal: 100-110)
**Warning signs:** Elements visually stacking incorrectly

### Pitfall 5: DM_Sans import name
**What goes wrong:** Import error from next/font/google
**Why it happens:** Google Font names with spaces use underscores in next/font imports
**How to avoid:** Import as `DM_Sans` not `DMSans` or `DM Sans`
**Warning signs:** Build error on font import

### Pitfall 6: Forgetting passive scroll listeners
**What goes wrong:** Scroll performance degrades, janky navbar transitions
**Why it happens:** Non-passive scroll listeners block the main thread
**How to avoid:** Always add `{ passive: true }` to scroll event listeners
**Warning signs:** Choppy scrolling, especially on mobile

## Code Examples

### Complete globals.css for Phase 1
```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  /* Colors */
  --color-background: #0a0a0a;
  --color-foreground: #f5f5f5;
  --color-heading: #f5f5f5;
  --color-body: #a0a0a0;
  --color-gold: #c9a96e;

  /* Fonts — use inline because next/font sets vars at runtime */
  --font-heading: var(--font-syne);
  --font-body: var(--font-dm-sans);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

body {
  background-color: #0a0a0a;
  color: #a0a0a0;
  font-family: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-syne), ui-sans-serif, system-ui, sans-serif;
  color: #f5f5f5;
}
```

### Responsive Type Scale (Recommendation)
```
Text sizes (mobile-first):
  h1: text-4xl md:text-5xl lg:text-6xl (2.25rem -> 3rem -> 3.75rem)
  h2: text-3xl md:text-4xl (1.875rem -> 2.25rem) — section headings
  h3: text-xl md:text-2xl (1.25rem -> 1.5rem) — sub-headings
  body: text-base md:text-lg (1rem -> 1.125rem)
  nav: text-sm md:text-base (0.875rem -> 1rem)

Letter spacing:
  Headings: tracking-tight (-0.025em)
  Nav links: tracking-wide (0.025em) — for Syne at small sizes
  Body: tracking-normal (0)

Line height:
  Headings: leading-tight (1.25)
  Body: leading-relaxed (1.625)
```

### CTA Button Pattern
```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: "default" | "cta";
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function Button({ variant = "default", children, href, className }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-heading text-sm tracking-wide transition-all duration-300";
  const variants = {
    default: "border border-foreground/20 text-foreground px-6 py-3 hover:border-foreground/40",
    cta: "border border-foreground/30 text-foreground px-6 py-3 hover:bg-gold hover:text-background hover:border-gold",
  };

  const classes = `${base} ${variants[variant]} ${className ?? ""}`;

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }
  return <button className={classes}>{children}</button>;
}
```

### Data File Pattern
```typescript
// data/navigation.ts
export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export const navItems: NavItem[] = [
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Showreel", href: "#showreel", sectionId: "showreel" },
  { label: "Services", href: "#services", sectionId: "services" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const siteConfig = {
  name: "Alex Rivera",
  tagline: "Cinematic Storytelling",
  ctaText: "Start a Project",
  ctaHref: "#contact",
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | CSS @theme / @theme inline | Tailwind v4 (Jan 2025) | No JS config file, all in globals.css |
| @next/font package | next/font/google (built-in) | Next.js 13.2+ | No separate package install needed |
| JS scroll libraries (smooth-scroll) | CSS scroll-behavior: smooth | Widely supported since 2020 | No JS dependency for basic smooth scrolling |
| Media query dark mode | Direct dark colors (no toggle) | N/A (design decision) | Simpler, no dark: prefix needed |

**Deprecated/outdated:**
- `tailwind.config.ts`: Does not exist in Tailwind v4. Use `@theme` in CSS.
- `@next/font`: Merged into `next/font` in Next.js 13.2. Import from `next/font/google`.
- `next/font` weight parameter for variable fonts: DM Sans and Syne are variable fonts in current Google Fonts. Do not specify `weight` array -- omit it and the full range is included.

## Open Questions

1. **Exact navbar height**
   - What we know: scroll-padding-top needs to match navbar height; typical is 4rem-5rem
   - What's unclear: Final height depends on logo size and padding choices
   - Recommendation: Use 5rem (80px) as default, adjust during implementation. Set as CSS variable `--navbar-height` for single source of truth.

2. **Scroll spy rootMargin tuning**
   - What we know: rootMargin and threshold affect when a section becomes "active"
   - What's unclear: Exact values depend on section heights and desired feel
   - Recommendation: Start with `rootMargin: "-80px 0px -50% 0px"` and `threshold: 0.1`, tune during testing.

3. **Mobile menu animation approach**
   - What we know: User wants smooth animation for open/close
   - What's unclear: Whether CSS transitions suffice or motion library is needed
   - Recommendation: Use CSS transitions (transform + opacity) for Phase 1. This avoids installing motion early. Can upgrade in Phase 4 if more complex animations needed.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- needs setup in Wave 0 |
| Config file | none -- see Wave 0 |
| Quick run command | `npx playwright test --project=chromium` |
| Full suite command | `npx playwright test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Navbar transparent on hero, solid on scroll | e2e | `npx playwright test tests/nav-scroll.spec.ts` | No -- Wave 0 |
| NAV-02 | Smooth scroll to sections with header offset | e2e | `npx playwright test tests/nav-scroll.spec.ts` | No -- Wave 0 |
| NAV-03 | Active section highlighted on scroll | e2e | `npx playwright test tests/nav-active.spec.ts` | No -- Wave 0 |
| NAV-04 | Mobile hamburger menu opens/closes | e2e | `npx playwright test tests/mobile-menu.spec.ts` | No -- Wave 0 |
| NAV-05 | Logo left, links center, CTA right layout | e2e | `npx playwright test tests/nav-layout.spec.ts` | No -- Wave 0 |
| VIS-01 | Correct colors applied | e2e | `npx playwright test tests/visual-design.spec.ts` | No -- Wave 0 |
| VIS-02 | Gold accent on CTA hover | e2e | `npx playwright test tests/visual-design.spec.ts` | No -- Wave 0 |
| VIS-03 | Syne + DM Sans fonts loaded | e2e | `npx playwright test tests/visual-design.spec.ts` | No -- Wave 0 |
| VIS-04 | Responsive across breakpoints | e2e | `npx playwright test tests/responsive.spec.ts` | No -- Wave 0 |
| DATA-01 | Content from static data files | unit | `npx vitest run tests/data.test.ts` | No -- Wave 0 |
| DATA-02 | Data files well-organized | manual-only | N/A -- code review | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (catches type errors and build failures)
- **Per wave merge:** `npx playwright test` (full e2e suite)
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Install Playwright: `npm init playwright@latest`
- [ ] `tests/nav-scroll.spec.ts` -- covers NAV-01, NAV-02
- [ ] `tests/nav-active.spec.ts` -- covers NAV-03
- [ ] `tests/mobile-menu.spec.ts` -- covers NAV-04
- [ ] `tests/nav-layout.spec.ts` -- covers NAV-05
- [ ] `tests/visual-design.spec.ts` -- covers VIS-01, VIS-02, VIS-03
- [ ] `tests/responsive.spec.ts` -- covers VIS-04
- [ ] Install Vitest for unit tests: `npm install -D vitest`
- [ ] `tests/data.test.ts` -- covers DATA-01

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Theme Docs](https://tailwindcss.com/docs/theme) - @theme and @theme inline directives, namespaces, variable resolution
- [Next.js Font Optimization Docs](https://nextjs.org/docs/app/getting-started/fonts) - next/font/google API, CSS variable approach
- Existing project files: package.json (Next.js 16.1.6, React 19.2.3, Tailwind ^4), app/globals.css (@theme inline already used)

### Secondary (MEDIUM confidence)
- [Build with Matija - Google Fonts in Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) - Complete setup pattern verified against official docs
- [react-intersection-observer GitHub](https://github.com/thebuilder/react-intersection-observer) - useInView API, threshold/rootMargin options
- [Thomas Ledoux - Highlighting nav on scroll](https://www.thomasledoux.be/blog/highlighting-navigation-items-on-scroll) - Scroll spy pattern with Intersection Observer
- [Next.js docs - Missing data-scroll-behavior](https://nextjs.org/docs/messages/missing-data-scroll-behavior) - Smooth scroll configuration
- [Next.js Issue #49612](https://github.com/vercel/next.js/issues/49612) - Link component doesn't respect scroll-padding (use native anchor tags)

### Tertiary (LOW confidence)
- None -- all findings verified against primary or secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - verified against existing package.json and official Tailwind v4 / Next.js docs
- Architecture: HIGH - patterns based on official Next.js App Router conventions and Tailwind v4 theming docs
- Pitfalls: HIGH - scroll-padding issue confirmed via Next.js GitHub issue; @theme inline behavior confirmed via official Tailwind docs
- Data architecture: MEDIUM - recommended pattern based on standard practices, discretionary per CONTEXT.md

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (30 days -- stable stack, no rapid changes expected)
