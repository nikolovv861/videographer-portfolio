# Phase 3: Content Sections - Research

**Researched:** 2026-03-08
**Domain:** React component implementation, CSS animations, Tailwind CSS
**Confidence:** HIGH

## Summary

Phase 3 upgrades six placeholder sections (Services, Clients, About, Process, Testimonials, Contact) and enhances the Footer. The codebase is well-structured with established patterns from Phases 1-2: typed data files, SectionWrapper for layout, consistent Tailwind utility classes, and Lucide React icons. Most work involves replacing placeholder content with real Lucide icons, structured data imports, and polished layouts.

The one non-trivial technical piece is the infinite marquee animation for client logos, which requires a custom CSS keyframe animation since Tailwind does not ship one. The contact section has been deliberately simplified (no form, just CTAs and mailto links), removing significant complexity from this phase.

**Primary recommendation:** Implement sections in dependency order -- data files first, then components that consume them, then page.tsx wiring. Use pure CSS keyframes for the marquee rather than a JS animation library.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Service cards: minimal bordered style (thin border, no fill), Lucide icons in champagne gold (#c9a96e), no per-card CTA buttons, one section-level CTA at bottom scrolling to #contact, 2-column grid desktop / stacked mobile
- 4 services already defined in data/services.ts with icon names (Clapperboard, Film, Smartphone, Video)
- About section: side-by-side layout (4:5 portrait photo left, bio text right on desktop, stacked mobile), photo placeholder is dark gray box with silhouette icon, bio/philosophy text stored in data/about.ts
- Contact section SIMPLIFIED: no contact form, no form validation -- section has heading, short message, direct email link, "Start a Project" (mailto) button, "Book a Call" (placeholder link) button
- Client logos: auto-scrolling infinite marquee, 8-10 placeholder logo boxes, full-bleed section, "Trusted By" heading
- Testimonials: keep current 3-column bordered card style, data already in data/site.ts
- Footer: replace text abbreviations ("IG", "LI") with Lucide React icons (Instagram, Linkedin), keep current layout

### Claude's Discretion
- Service card hover treatment (gold border, background fill, or other -- consistent with Phase 2 card philosophy)
- Process section visual style (bordered cards vs timeline/connected steps vs other)
- About philosophy statement styling (pull quote vs inline flow)
- Testimonial card hover treatment (if any)
- Client logo marquee speed, direction, and hover-pause behavior
- Footer border/separator treatment

### Deferred Ideas (OUT OF SCOPE)
- Contact form with backend integration (Formspree/Resend) -- v2 requirement (FORM-01)
- Budget dropdown and form validation -- deferred with form removal
- Category filtering on portfolio -- out of scope per REQUIREMENTS.md
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SERV-01 | 3-5 service cards with icon, title, description, CTA | Data exists in data/services.ts (4 services). Lucide icons mapped by name. Section-level CTA replaces per-card CTAs per user decision |
| SERV-02 | Services: Commercial, Brand Story, Social Media, Event/Corporate | Already defined in data/services.ts |
| CLNT-01 | Logo strip/grid displaying placeholder brand logos | CSS marquee animation pattern; data/clients.ts needed |
| CLNT-02 | Section heading "Trusted By" or similar | Simple heading, already in placeholder |
| ABUT-01 | Photo + bio + philosophy statement | data/about.ts needed; photo placeholder with User icon from Lucide |
| ABUT-02 | Layout works mobile (stacked) and desktop (side-by-side) | Already established in placeholder with lg:grid-cols-2 |
| PROC-01 | 4 process steps displayed visually | Data exists in data/site.ts. Visual style at Claude's discretion |
| PROC-02 | Each step has title and one-line description | Data structure already includes number, title, description |
| TEST-01 | 2-3 testimonial cards with quote, name, company | Data exists in data/site.ts (3 testimonials) |
| TEST-02 | Cards have swappable placeholder content | Data already in separate file, easily swappable |
| CONT-01 | Contact form with fields | MODIFIED: No form per user decision. Replaced with heading + message + mailto CTA |
| CONT-02 | Form validation with inline errors | MODIFIED: Not applicable -- no form per user decision |
| CONT-03 | Direct email link displayed | Already in placeholder, keep as-is |
| CONT-04 | Two CTA buttons: Submit + Book a Call | "Start a Project" (mailto) + "Book a Call" (placeholder href) |
| FOOT-01 | Footer: email, Instagram icon, LinkedIn icon | Replace text with Lucide Instagram/Linkedin icons |
| FOOT-02 | Copyright text and small logo | Already implemented in Footer.tsx |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Framework | Project foundation |
| react | 19.2.3 | UI library | Project foundation |
| lucide-react | ^0.577.0 | Icons | Already used in project, provides Clapperboard, Film, Smartphone, Video, Instagram, Linkedin, User icons |
| tailwindcss | ^4 | Styling | Project styling system with @theme inline config |

### No New Dependencies Needed
This phase requires zero new npm packages. All functionality is achievable with existing dependencies:
- Icons: lucide-react (already installed)
- Marquee: pure CSS keyframes
- Layout: Tailwind CSS
- Data: static TypeScript files

## Architecture Patterns

### Recommended Project Structure
```
data/
  about.ts          # NEW: bio, philosophy, photoUrl
  clients.ts        # NEW: 8-10 placeholder client entries
  services.ts       # EXISTS: 4 services with icon names
  site.ts           # EXISTS: processSteps, testimonials
  navigation.ts     # EXISTS: siteConfig with email, social links
components/sections/
  Services.tsx      # NEW: replaces ServicesPlaceholder
  Clients.tsx       # NEW: replaces ClientsPlaceholder
  About.tsx         # NEW: replaces AboutPlaceholder
  Process.tsx       # NEW: replaces ProcessPlaceholder
  Testimonials.tsx  # NEW: replaces TestimonialsPlaceholder
  Contact.tsx       # NEW: replaces ContactPlaceholder
  Footer.tsx        # EXISTS: upgrade with Lucide icons
lib/types.ts        # UPDATE: add AboutContent, Client types
app/globals.css     # UPDATE: add marquee keyframes
app/page.tsx        # UPDATE: swap placeholder imports for real components
```

### Pattern 1: Dynamic Lucide Icon Rendering
**What:** Services data stores icon names as strings. To render the correct Lucide component, create a mapping object.
**When to use:** When icon selection is data-driven rather than hardcoded.
**Example:**
```typescript
import { Clapperboard, Film, Smartphone, Video, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Clapperboard,
  Film,
  Smartphone,
  Video,
};

// Usage in component
const IconComponent = iconMap[service.icon];
return <IconComponent className="h-8 w-8 text-gold" />;
```

### Pattern 2: CSS-Only Infinite Marquee
**What:** Pure CSS animation that scrolls logos continuously without JavaScript.
**When to use:** Client logo strip with auto-scrolling requirement.
**Example:**
```css
/* In app/globals.css */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```
```tsx
// Duplicate the logo list so content wraps seamlessly
<div className="overflow-hidden">
  <div className="flex animate-marquee hover:[animation-play-state:paused]">
    {/* Render logos twice for seamless loop */}
    {[...clients, ...clients].map((client, i) => (
      <div key={i} className="flex-shrink-0 mx-6">
        {/* logo placeholder */}
      </div>
    ))}
  </div>
</div>
```
**Key detail:** The content is duplicated so that when the first set scrolls off-screen left, the second set is visually seamless. The animation translates by exactly -50% (half the total width = one full set of logos).

### Pattern 3: Consistent Section Component Structure
**What:** Every section follows the same structure established in Phases 1-2.
**Example:**
```typescript
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function SectionName() {
  return (
    <SectionWrapper id="section-id">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        Section Title
      </h2>
      <div className="mt-16 ...">
        {/* content */}
      </div>
    </SectionWrapper>
  );
}
```

### Anti-Patterns to Avoid
- **Hardcoding text in components:** All text must come from data imports. No inline strings for bios, service descriptions, etc.
- **Using JS-based animation for marquee:** CSS keyframes are sufficient and more performant. No need for requestAnimationFrame or motion library here.
- **Importing icons dynamically via string interpolation:** Lucide does not support `import(iconName)`. Use a static mapping object instead.
- **Adding form libraries:** Contact section has no form. Do not install react-hook-form or zod (those were from early research before the user simplified contact).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon rendering | Custom SVG components | lucide-react icons | Consistent sizing, coloring, accessibility |
| Infinite scroll | requestAnimationFrame loop | CSS @keyframes marquee | GPU-accelerated, no JS overhead, simpler |
| Section layout/spacing | Custom wrapper divs | SectionWrapper component | Established py-32/48 editorial spacing, max-w-6xl |
| CTA buttons | Custom anchor/button elements | Button component | Consistent hover states, variant support |

## Common Pitfalls

### Pitfall 1: Marquee Animation Jank
**What goes wrong:** Logos visibly "jump" when the animation loops.
**Why it happens:** The duplicated content width doesn't exactly match the -50% translation target, or there's a gap between the two sets.
**How to avoid:** Ensure logos are rendered exactly twice with identical spacing. Use `flex-shrink-0` on each logo item. The translate percentage must be exactly -50%.
**Warning signs:** Visible gap or jump at the loop point.

### Pitfall 2: Lucide Icon String-to-Component Mismatch
**What goes wrong:** Icon doesn't render because the string name in data doesn't match the import name.
**Why it happens:** Lucide uses PascalCase for component names but some might have different casing in data.
**How to avoid:** Use an explicit mapping object (iconMap) rather than dynamic imports. TypeScript will catch missing keys at build time.
**Warning signs:** Blank space where icon should be, or runtime error.

### Pitfall 3: fullBleed Section Forgetting Inner Container
**What goes wrong:** Client logos section renders edge-to-edge without proper inner spacing.
**Why it happens:** When SectionWrapper has `fullBleed`, it does NOT wrap children in `max-w-6xl`. The component must add its own `mx-auto max-w-6xl px-6 md:px-8` wrapper where needed (heading), but let the marquee overflow.
**How to avoid:** Follow the ClientsPlaceholder pattern -- fullBleed outer section with inner container for heading, but marquee extends full width.

### Pitfall 4: Forgetting to Delete Placeholder Components
**What goes wrong:** Unused placeholder files remain in the codebase.
**Why it happens:** Developer creates new components but forgets to remove the old Placeholder files.
**How to avoid:** After updating page.tsx imports, delete all *Placeholder.tsx files that were replaced.

### Pitfall 5: Missing Type Definitions
**What goes wrong:** TypeScript errors when new data files don't have types.
**Why it happens:** New data files (about.ts, clients.ts) need corresponding types in lib/types.ts.
**How to avoid:** Add `AboutContent` and `Client` types to lib/types.ts before creating data files.

## Code Examples

### Service Card with Lucide Icon and Gold Accent
```typescript
import { Clapperboard, Film, Smartphone, Video, type LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, LucideIcon> = { Clapperboard, Film, Smartphone, Video };

export function Services() {
  return (
    <SectionWrapper id="services">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
        Services
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <div
              key={service.id}
              className="rounded-sm border border-foreground/10 p-8 transition-colors duration-300 hover:border-gold/40"
            >
              {Icon && <Icon className="h-8 w-8 text-gold" />}
              <h3 className="mt-4 font-heading text-xl font-semibold text-heading">
                {service.title}
              </h3>
              <p className="mt-3 text-base text-body md:text-lg">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <Button variant="cta" href="#contact">Start a Project</Button>
      </div>
    </SectionWrapper>
  );
}
```

### About Data File Structure
```typescript
// data/about.ts
import type { AboutContent } from "@/lib/types";

export const aboutContent: AboutContent = {
  photoUrl: "", // empty for placeholder
  bio: "Alex Rivera is a director and cinematographer specializing in cinematic brand films, commercials, and social content. With over a decade of experience, every project is approached with a focus on visual storytelling and emotional impact.",
  philosophy: "From concept to final delivery, the goal is always the same: create video content that moves people, builds brands, and delivers measurable results.",
};
```

### Client Data File Structure
```typescript
// data/clients.ts
import type { Client } from "@/lib/types";

export const clients: Client[] = Array.from({ length: 8 }, (_, i) => ({
  id: `client-${i + 1}`,
  name: `Client ${i + 1}`,
  logoUrl: "", // placeholder
}));
```

### Contact Section (Simplified, No Form)
```typescript
import { siteConfig } from "@/data/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-6 text-base text-body md:text-lg">
          Have a project in mind? Let&apos;s create something extraordinary together.
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-4 inline-block text-base text-heading transition-colors duration-300 hover:text-gold md:text-lg"
        >
          {siteConfig.email}
        </a>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="cta" href={`mailto:${siteConfig.email}`}>
            Start a Project
          </Button>
          <Button href="#">Book a Call</Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
```

### Footer with Lucide Icons
```typescript
import { Instagram, Linkedin } from "lucide-react";
// Replace text "IG" / "LI" with:
<Instagram className="h-5 w-5" />
<Linkedin className="h-5 w-5" />
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS-based marquee (jQuery plugins) | CSS @keyframes with transform | 2020+ | Zero JS overhead, GPU-accelerated |
| Individual SVG icon files | lucide-react tree-shakeable components | 2022+ | Only imported icons are bundled |
| Tailwind v3 config extends | Tailwind v4 @theme inline in CSS | 2024 | Custom animation keyframes go in globals.css, not tailwind.config |

**Important Tailwind v4 note:** This project uses Tailwind v4 with `@theme inline` in globals.css. Custom keyframes and animation utilities should be defined directly in globals.css using standard CSS `@keyframes`, not in a tailwind.config.js file (which does not exist in this project).

## Open Questions

1. **Marquee animation timing**
   - What we know: CSS marquee with `linear infinite` works well
   - What's unclear: Optimal speed for 8-10 logos (too fast = distracting, too slow = static-looking)
   - Recommendation: Start with 30s duration, adjust visually. Add `hover:[animation-play-state:paused]` for accessibility.

2. **Process section visual style**
   - What we know: User left this to Claude's discretion. Current placeholder uses bordered cards in a 4-column grid.
   - What's unclear: Whether cards or a timeline/connected-steps approach better fits the design
   - Recommendation: Keep the bordered card approach for consistency with other sections. Add the step number as a large faded numeral. The 4-column grid on desktop, 1-column on mobile works well. Add a subtle connecting element (gold line or arrow between cards on desktop) to convey progression.

3. **About philosophy statement treatment**
   - What we know: User left styling to Claude's discretion
   - What's unclear: Whether pull quote or inline flow better serves the design
   - Recommendation: Use a pull quote style with left gold border accent -- it creates visual hierarchy and breaks up the text block, aligning with the gold accent language.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest ^4.0.18 (unit) + Playwright ^1.58.2 (e2e) |
| Config file | vitest.config.ts, playwright.config.ts |
| Quick run command | `npm run test` |
| Full suite command | `npm run test:all` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SERV-01 | Service cards render with icons, titles, descriptions | e2e | `npx playwright test tests/services.spec.ts -x` | No - Wave 0 |
| SERV-02 | Four specific services displayed | unit | `npx vitest run tests/data.test.ts -t "services"` | Partial (data.test.ts exists) |
| CLNT-01 | Client logo marquee renders 8-10 logos | e2e | `npx playwright test tests/clients.spec.ts -x` | No - Wave 0 |
| CLNT-02 | "Trusted By" heading visible | e2e | `npx playwright test tests/clients.spec.ts -x` | No - Wave 0 |
| ABUT-01 | About section with photo placeholder, bio, philosophy | e2e | `npx playwright test tests/about.spec.ts -x` | No - Wave 0 |
| ABUT-02 | About layout responsive (stacked mobile, side-by-side desktop) | e2e | `npx playwright test tests/responsive.spec.ts` | Yes (may need extension) |
| PROC-01 | 4 process steps with visual display | e2e | `npx playwright test tests/process.spec.ts -x` | No - Wave 0 |
| PROC-02 | Steps have titles and descriptions | unit | `npx vitest run tests/data.test.ts -t "process"` | Partial |
| TEST-01 | Testimonial cards with quote, name, company | e2e | `npx playwright test tests/testimonials.spec.ts -x` | No - Wave 0 |
| TEST-02 | Placeholder content easily swappable | unit | `npx vitest run tests/data.test.ts -t "testimonials"` | Partial |
| CONT-01 | Contact section with heading and message (modified) | e2e | `npx playwright test tests/contact.spec.ts -x` | No - Wave 0 |
| CONT-02 | N/A (form removed) | manual-only | N/A | N/A |
| CONT-03 | Direct email link displayed | e2e | `npx playwright test tests/contact.spec.ts -x` | No - Wave 0 |
| CONT-04 | Two CTA buttons present | e2e | `npx playwright test tests/contact.spec.ts -x` | No - Wave 0 |
| FOOT-01 | Footer with email, Instagram icon, LinkedIn icon | e2e | `npx playwright test tests/footer.spec.ts -x` | No - Wave 0 |
| FOOT-02 | Copyright text and logo in footer | e2e | `npx playwright test tests/footer.spec.ts -x` | No - Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run test`
- **Per wave merge:** `npm run test:all`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/services.spec.ts` -- covers SERV-01
- [ ] `tests/clients.spec.ts` -- covers CLNT-01, CLNT-02
- [ ] `tests/about.spec.ts` -- covers ABUT-01
- [ ] `tests/process.spec.ts` -- covers PROC-01
- [ ] `tests/testimonials.spec.ts` -- covers TEST-01
- [ ] `tests/contact.spec.ts` -- covers CONT-01, CONT-03, CONT-04
- [ ] `tests/footer.spec.ts` -- covers FOOT-01, FOOT-02
- [ ] `tests/data.test.ts` -- extend for about and clients data validation

## Sources

### Primary (HIGH confidence)
- Project codebase -- all placeholder components, data files, types, and established patterns directly examined
- Tailwind v4 @theme inline pattern observed in app/globals.css

### Secondary (MEDIUM confidence)
- [Cruip - Infinite Horizontal Scroll with Tailwind CSS](https://cruip.com/create-an-infinite-horizontal-scroll-animation-with-tailwind-css/) - CSS marquee pattern
- [Builder.io - Scrolling Logo Animation with Tailwind](https://www.builder.io/blog/scrolling-logo-animation-tailwindcss) - CSS marquee pattern
- [Ryan Mulligan - The Infinite Marquee](https://ryanmulligan.dev/blog/css-marquee/) - CSS marquee pattern

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all dependencies already installed, no new packages needed
- Architecture: HIGH - patterns fully established in Phases 1-2, just replicating
- Pitfalls: HIGH - domain is straightforward component work; marquee is well-documented CSS pattern

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable domain, no fast-moving dependencies)
