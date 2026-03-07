# Features Research: Videographer Portfolio

## Table Stakes (Must Have or Users Leave)

Features that professional videographer portfolios are expected to have. Missing these signals amateur.

### Video Showcase
- **Showreel/demo reel** — The single most important element. Full-screen, autoplay, immediately visible. | Complexity: Medium | Dependencies: Video hosting
- **Portfolio grid with video thumbnails** — Visitors need to browse work quickly. Grid layout with category filtering or tags. | Complexity: Medium | Dependencies: None
- **Video hover previews** — Thumbnail plays short loop on hover. Expected on modern creative portfolios. | Complexity: Medium | Dependencies: Video files
- **Project case studies** — Beyond just showing video, explain the work: client, challenge, approach, result. | Complexity: Medium | Dependencies: Modal/expand UI

### Professional Presentation
- **Dark theme** — Industry standard for video/film portfolios. Dark backgrounds make video content pop. | Complexity: Low | Dependencies: None
- **Responsive design** — Must work on mobile. Many clients browse on phones. | Complexity: Medium | Dependencies: None
- **Fast loading** — Video-heavy sites that load slowly lose visitors immediately. | Complexity: Medium | Dependencies: Lazy loading, compression
- **Professional typography** — Clean, bold, readable. Communicates quality. | Complexity: Low | Dependencies: Font loading

### Contact & Conversion
- **Contact form** — Clients need a clear way to reach out. Name, email, project description minimum. | Complexity: Low | Dependencies: Form handling
- **Clear CTAs** — "Start a Project", "Get in Touch", "Book a Call" — multiple touchpoints throughout the page. | Complexity: Low | Dependencies: None
- **Services listing** — What do you offer? Clients need to know before reaching out. | Complexity: Low | Dependencies: None

### Trust & Credibility
- **Client logos** — Social proof. "Trusted by" section with recognizable brands. | Complexity: Low | Dependencies: Logo assets
- **Testimonials** — Quotes from past clients. 2-3 is sufficient. | Complexity: Low | Dependencies: None
- **About section** — Who is behind the camera? Photo, bio, philosophy. | Complexity: Low | Dependencies: None

### Navigation
- **Sticky/fixed navigation** — Always accessible, especially on long single-page sites. | Complexity: Medium | Dependencies: Scroll detection
- **Smooth scroll** — Nav links scroll to sections smoothly. Expected on single-page sites. | Complexity: Low | Dependencies: CSS/JS
- **Mobile hamburger menu** — Standard mobile navigation pattern. | Complexity: Medium | Dependencies: Animation

### SEO & Meta
- **Meta tags & Open Graph** — Portfolio links shared on social media must preview well. | Complexity: Low | Dependencies: Next.js metadata
- **Semantic HTML** — Accessibility and SEO baseline. | Complexity: Low | Dependencies: None

## Differentiators (Competitive Advantage)

Features that set a portfolio apart from the typical filmmaker website.

### Cinematic Experience
- **Page load intro animation** — Counter, curtain reveal, or logo animation. Builds anticipation. | Complexity: Medium | Dependencies: Animation library
- **Custom cursor** — Dot + ring, blend mode, or contextual cursor. Signals attention to detail. | Complexity: Medium | Dependencies: Mouse tracking
- **Parallax effects** — Depth and movement on scroll. Creates cinematic depth. | Complexity: Medium | Dependencies: Animation library
- **Film grain overlay** — Subtle texture that reinforces the film/cinema aesthetic. | Complexity: Low | Dependencies: CSS/canvas
- **Scroll-triggered animations** — Elements reveal as you scroll. Staggered, scaled, faded. | Complexity: Medium | Dependencies: Animation library
- **Animated section dividers** — Lines that draw themselves. Gold accent lines between sections. | Complexity: Medium | Dependencies: SVG animation

### Interactive Portfolio
- **Full-screen project modals** — Immersive case study experience without leaving the page. | Complexity: High | Dependencies: Modal system, scroll lock
- **Video preview on hover** — Grid thumbnails play short video loops on hover. | Complexity: Medium | Dependencies: Video preloading

### Process Visualization
- **Visual process/workflow** — Steps shown as timeline or connected cards. Shows professionalism. | Complexity: Medium | Dependencies: None

## Anti-Features (Deliberately NOT Building)

| Feature | Why Not |
|---------|---------|
| Blog | Adds routing complexity, content management burden. Portfolio is the focus. |
| CMS integration | Adds backend dependency. Template should be static and simple to modify. |
| E-commerce / booking system | Scope creep. Contact form is sufficient for lead generation. |
| User accounts / authentication | No user-generated content needed. |
| Real-time chat widget | Distracting, requires backend. Email/form is sufficient. |
| Multi-page routing | Single-page is the design intent. All content on one scroll. |
| Category filtering on portfolio | With 6-9 projects, filtering adds complexity without value. Tags on cards are sufficient. |
| Music/audio player | Auto-playing audio is universally disliked. Videos handle their own audio. |
| Analytics dashboard | Can be added later with Google Analytics or Vercel Analytics. Not part of template. |
| Dark/light mode toggle | Dark is the brand. A light mode would dilute the cinematic aesthetic. |

## Feature Dependencies

```
Video Hosting → Hero Showreel → Portfolio Grid → Hover Previews
                                               → Project Modals
Font Loading → Typography → Page Layout → All Sections
Animation Library → Parallax → Scroll Reveals → Page Intro
                             → Section Dividers
                             → Custom Cursor
Form Handling → Contact Form → CTA Buttons (scroll targets)
Scroll Detection → Sticky Nav → Active Section Highlighting
                              → Smooth Scroll
```

---
*Researched: 2026-03-07*
