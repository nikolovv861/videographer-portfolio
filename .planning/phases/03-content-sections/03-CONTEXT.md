# Phase 3: Content Sections - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

All remaining content sections are built — services, client logos, about, process, testimonials, contact, and footer — completing the full single-page layout. Each section replaces its existing placeholder component.

</domain>

<decisions>
## Implementation Decisions

### Service cards
- Keep current minimal bordered card style (thin border, no fill) — consistent with flat-at-rest philosophy
- Lucide React icons rendered in champagne gold (#c9a96e) — gold as visual accent on monochromatic cards
- No per-card CTA buttons — one section-level CTA at bottom scrolling to #contact
- 2-column grid on desktop (current layout), stacked on mobile
- 4 services already defined in data/services.ts with icon names (Clapperboard, Film, Smartphone, Video)

### About section
- Side-by-side layout: 4:5 portrait photo left, bio text right on desktop, stacked on mobile (keep current placeholder layout)
- Photo placeholder: dark gray box with silhouette icon — looks intentional, clearly a swap-out spot
- Bio and philosophy text stored in data/about.ts — follows zero-hardcoded-strings pattern from Phase 1
- Philosophy statement treatment at Claude's discretion (pull quote vs inline)

### Contact section (SIMPLIFIED)
- **No contact form** — removed form entirely (CONT-01 form fields and CONT-02 validation no longer apply)
- Section has: heading, short message, direct email link, two CTA buttons
- "Start a Project" button: mailto link to siteConfig.email
- "Book a Call" button: placeholder link (Calendly or similar, swappable)
- Direct email address displayed as clickable link (already in current placeholder)

### Client logos
- Auto-scrolling infinite marquee — logos continuously slide so all are visible
- 8-10 placeholder logo boxes
- Full-bleed section (already set in current placeholder with fullBleed prop)
- Section heading: "Trusted By" or similar

### Testimonials
- Keep current card style — 3-column grid with bordered quote cards
- Data already exists in data/site.ts with 3 testimonials
- No changes from placeholder needed beyond consistent styling with other cards

### Footer
- Replace text abbreviations ("IG", "LI") with actual Lucide React icons (Instagram, Linkedin)
- Keep current layout: logo left, email center, social icons right on desktop, stacked on mobile

### Claude's Discretion
- Service card hover treatment (gold border, background fill, or other — consistent with Phase 2 card philosophy)
- Process section visual style (bordered cards vs timeline/connected steps vs other)
- About philosophy statement styling (pull quote vs inline flow)
- Testimonial card hover treatment (if any)
- Client logo marquee speed, direction, and hover-pause behavior
- Footer border/separator treatment

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SectionWrapper` (components/ui/SectionWrapper.tsx): Section container with `fullBleed` option, py-32/py-48 editorial spacing — used by all sections
- `Button` (components/ui/Button.tsx): `default` and `cta` variants — reuse for service CTA, contact CTAs, and Book a Call
- All placeholder components exist and render correctly — upgrade in place
- `siteConfig` (data/navigation.ts): email, social links, name — used by contact and footer
- `services` (data/services.ts): 4 services with id, title, description, icon fields
- `processSteps` (data/site.ts): 4 steps with number, title, description
- `testimonials` (data/site.ts): 3 testimonials with quote, name, company

### Established Patterns
- All section content sourced from typed data imports — zero hardcoded strings
- Native anchor hrefs for smooth scroll (not Next.js Link)
- Heading style: `font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl`
- Card style: `rounded-sm border border-foreground/10 p-8`
- Body text: `text-base text-body md:text-lg`
- Color palette: heading=#f5f5f5, body=#a0a0a0, gold=#c9a96e, bg=#0a0a0a

### Integration Points
- Each section replaces its `*Placeholder` component in app/page.tsx
- New data file needed: data/about.ts (bio, philosophy, photo URL)
- New data file needed: data/clients.ts (8-10 placeholder client entries)
- lucide-react already in project dependencies — import icons directly
- Footer component already exists (not a placeholder) — upgrade with Lucide icons

</code_context>

<specifics>
## Specific Ideas

- Client logos should be moving/auto-scrolling — user wants all logos visible without interaction
- Contact section deliberately simplified to mailto approach — no form validation complexity
- Gold Lucide icons on service cards are the main visual accent for this section
- Footer already functional, just needs icon upgrade from text to Lucide components

</specifics>

<deferred>
## Deferred Ideas

- Contact form with backend integration (Formspree/Resend) — v2 requirement (FORM-01)
- Budget dropdown and form validation — deferred with form removal
- Category filtering on portfolio — out of scope per REQUIREMENTS.md

</deferred>

---

*Phase: 03-content-sections*
*Context gathered: 2026-03-08*
