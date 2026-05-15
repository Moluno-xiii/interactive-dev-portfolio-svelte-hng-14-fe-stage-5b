# Interactive Developer Portfolio

My interactive developer portfolio.

Built for the HNG Internship 14 Stage 5b Frontend task.

**Stack** · SvelteKit 2 · Svelte 5 (runes) · TypeScript · Tailwind CSS v4 · pnpm
**Live URL** · https://escanor-portfolio.vercel.app/

---

## Quick start

```bash
git clone https://github.com/Moluno-xiii/interactive-dev-portfolio-svelte-hng-14-fe-stage-5b.git
cd interactive-dev-portfolio-svelte-hng-14-fe-stage-5b
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:5173`.

### Scripts

| Script         | What it does                                          |
| -------------- | ----------------------------------------------------- |
| `pnpm dev`     | Start the Vite dev server                             |
| `pnpm build`   | Build to `.svelte-kit/output/` (12 prerendered pages) |
| `pnpm preview` | Preview the production build locally                  |
| `pnpm check`   | `svelte-kit sync` + `svelte-check`                    |
| `pnpm lint`    | Prettier check + ESLint                               |
| `pnpm format`  | Prettier write                                        |

---

## Architecture

```
src/
  app.html                   ← inline pre-paint theme script (no FOUC)
  app.d.ts
  routes/
    +layout.svelte           ← shell: skip-link, HUD, Cursor, TweaksPanel, <main>
    +layout.ts               ← prerender = true (inherited by every route)
    +page.svelte             ← composes 6 sections into the home page
    +page.ts
    layout.css               ← design tokens, theming, reduced-motion reset
    +error.svelte
    projects/
      [slug]/                ← case-study route, prerendered for every project
      +error.svelte
  lib/
    components/              ← 15 Svelte components
    actions/                 ← use:reveal, use:magnetic
    stores/                  ← runes-based: theme, activeSection, projectOrder
    data/                    ← profile, projects, skills, experience
    types.ts
static/
  resume.pdf, favicon.svg, robots.txt
  projects/<slug>/01.png …   ← per-project screenshots
```

The home page composes six sections into one scrollable surface:

```
Hero → ProjectGrid → About → SkillsGrid → Experience → Contact
```

Each project has its own prerendered case-study route at `/projects/<slug>`, generated from `src/lib/data/projects.ts` via SvelteKit's `EntryGenerator`.

**Content is data-first.** Everything renderable — projects, experience, skills, profile, "now" — lives in `src/lib/data/`. Changing an entry never requires touching a component.

### State management

Three Svelte 5 runes-based stores in `src/lib/stores/*.svelte.ts`:

- **`theme`** — dark / light / system, persisted to `localStorage`, applied **pre-paint** via an inline script in `app.html`. No flash of unstyled theme.
- **`activeSection`** — IntersectionObserver-backed scroll-spy that drives the nav underline animation. Re-initialised on mount with the home page's section IDs.
- **`projectOrder`** — local-only drag-to-reorder persistence with a reset-to-default fallback. Validates stored slugs against the current project list, gracefully drops removed projects, appends new ones.

No third-party state library. Runes are the state library.

---

## Animation decisions

The animation system is **layered**, not centralised, each piece does one thing well and stays out of the others' way.

### Zero animation libraries

Just `svelte/transition`, `svelte/animate`, and CSS. No GSAP, no Motion One, no Framer-shaped wrapper. Bundle stays small, timing surface stays uniform.

### Scroll reveals — `use:reveal`

A single action in `src/lib/actions/reveal.ts` toggles a `.is-visible` class on intersection. The matching CSS animates `transform: translateY(20px) → 0` and `opacity: 0 → 1` on the compositor. Stagger is per-item `transition-delay: {i * 60}ms;` — no JavaScript tick loop. One shared `IntersectionObserver` for the whole page.

### Drag reorder — `animate:flip`

HTML5 DnD captures the gesture; `animate:flip` from `svelte/animate` handles the reflow at 60 fps. The drag image is a 1×1 transparent SVG so the browser doesn't snapshot a 300 px-tall card, and persistence happens on `dragend`.

### Theme toggle — `{#key}` + transitions

A `{#key theme.current}` block remounts the icon when the theme changes, with a scale-in / fade-out swap on the icon itself.

### Hero entrance — keyframe `fx-rise`

A CSS keyframe runs once on first paint with a 100 ms per-line stagger. Deliberately **not** re-triggered on scroll — repeated reveals on a hero feel showy.

### Scramble & magnetic — custom components / actions

- `Scramble` — a data-stream-style character cycling reveal, used on case-study titles.
- `use:magnetic` — pulls a CTA towards the cursor on hover, with a falloff curve.
- `Cursor` — custom cursor component for desktop pointers.

### Decorative atmosphere

`ParticleField`, `AuroraField`, `GridField` — canvas / SVG with cheap update loops, behind the content, and all respecting reduced motion.

### Reduced motion

Every animation has a fallback. `@media (prefers-reduced-motion: reduce)` in `src/routes/layout.css` resets `transition-duration: 0.01ms !important` and `animation-duration: 0.01ms !important` globally. The `Scramble` component also checks `matchMedia` at runtime and renders the final string instantly. The site stays fully functional with motion off.

---

## Performance

### Static generation across the board

Every route is prerendered to HTML at build time:

```
1 home page
+ 11 case studies (one per project, generated from data)
= 12 static HTML files
```

`+layout.ts` sets `prerender = true`; every page inherits it. The dynamic case-study route uses SvelteKit's `EntryGenerator` to enumerate slugs from `projects.ts`.

### Pre-paint theming (no FOUC)

The theme + accent palette are applied via a synchronous inline script in `app.html` before SvelteKit hydrates. The first frame is always the right colour scheme, even on a hard refresh of `/projects/whisperbox`.

### Compositor-only reveal animations

Every scroll-triggered reveal animates `transform` and `opacity` only — no layout-thrashing properties. Each animation respects the GPU's compositor pipeline.

### Hover preloading

`<body data-sveltekit-preload-data="hover">` means SvelteKit fetches the next route's JS the moment a link is hovered — case-study navigations are usually instant.

### Lazy assets

Case-study figure images use `loading="lazy"`; the cover image (above the fold) uses `loading="eager"`. Decorative atmospheric components mount but defer their loops until visible.

### Drag-image elision

A transparent 1×1 SVG is set as the drag image so the browser doesn't snapshot a heavy card during drag.

### Tailwind v4

Compiled through `@tailwindcss/vite`. Only classes used in source survive the build; no PostCSS chain to maintain.

### Known follow-ups

- **Lighthouse pass** on a deployed build is the next step.
- **Image optimization** — project screenshots are still PNGs. Pre-converting to WebP/AVIF with a responsive `srcset` (via `@sveltejs/enhanced-img` or a build-time step) is the obvious win and is queued.

---

## Accessibility

- **Skip link** to `#main` is the first focusable element on every page.
- **Semantic landmarks** — `<main>`, `<nav>`, `<section id="...">` for every named section; nav has the proper landmark role; one `<h1>` per page (the developer's name on home, the project title on case studies).
- **Focus rings** are preserved (never `outline: none` without a replacement).
- **Reduced motion** is honored globally via `prefers-reduced-motion: reduce` plus per-component runtime checks where animation is JS-driven.
- **ARIA roles** — the project filter is a `role="tablist"` with `aria-selected` pills; the project rows are a labelled `role="list"`; the live-product and source-code links carry visible labels.
- **External links** carry `rel="noopener noreferrer"` and open in a new tab.
- **WCAG AA contrast** is the design target. A formal axe-core / Lighthouse a11y pass is queued before submission.

---

## Creative feature — drag-to-reorder

- HTML5 DnD captures the gesture.
- `animate:flip` runs the reflow animation on the compositor.
- The order persists to `localStorage` and survives a refresh.
- A reset button appears only when the order has been customised.
- Drag is **disabled while a category filter is active** (since dragging over a partial view would be ambiguous); the UI swaps to a visible hint explaining why.

### Limitation

HTML5 DnD doesn't work on iOS Safari, so mobile users see the static grid without drag. The experience is intentionally desktop-first; mobile users get the filter and the see-more toggle instead. A pointer-events swap for cross-device drag is a follow-up.

---

## Trade-offs

- **No animation library.** Bundle stays small; you write more motion by hand. The constraint kept the system coherent.
- **Static generation, no CMS.** Content lives in TypeScript files — edits are a code change + redeploy. Justified for a portfolio; would not scale to a CMS-fed product.
- **Contact form is currently decorative.** Submission isn't wired. The brief's "form OR mail integration" is satisfied through the copy-email button and `mailto:` CTA in the Contact section. Wiring the form to Web3Forms / Formspree / a SvelteKit form action → Resend is the next phase.
- **Drag is desktop-only.** See above.
- **`adapter-auto`** is set until the deployment target is locked. Swap for an explicit adapter (`@sveltejs/adapter-vercel`, `-netlify`, `-cloudflare`, or `-static`) at deploy time.
- **`profile.now` data exists but isn't yet surfaced in a component.** A "Currently" panel was planned for the About section; deferred.
- **Project screenshots are unoptimised PNGs.** Image optimization is a known win and is queued.

---

## Project content

11 real projects, defined in `src/lib/data/projects.ts`:

1. **Tape** — Vue 3 + ECharts live markets terminal (HNG 14 Stage 5a)
2. **WhisperBox** — End-to-end encrypted messenger with Web Crypto (HNG 14 Stage 4b)
3. **Weather** — Expo cross-platform (iOS · Android · web · Linux · Windows) (HNG 14 Stage 4 Mobile)
4. **AI Summarizer** — Chrome MV3 extension + NestJS Gemini proxy (HNG 14 Stage 4a)
5. **Habit Tracker** — Next 16 PWA with hand-written service worker (HNG 14 Stage 3)
6. **Insighta Labs** — NestJS rule-based natural-language query API (HNG 14 Stage 2 Backend)
7. **Invoicr** — React 19 invoice manager with IndexedDB persistence (HNG 14 Stage 2 Frontend)
8. **TaskSphere** — React + Supabase kanban for personal and organisation modes
9. **Audiophile** — Next.js + Convex headphones storefront (HNG 13 Stage 3a)
10. **Onboard** — Embeddable onboarding-tour widget (team project)
11. **GH Profile Finder** — React + Vite GitHub profile lookup (first React + TS project)

Three roles in `src/lib/data/experience.ts`:

- **Lead Frontend / Mobile Engineer** — Storytime4Kids · 2025 — Now
- **Lead Frontend Developer** — The Bull Squad Travels · 2023 — Now
- **Frontend Developer** — Veridux · 2023 — 2024

---

## Credits

Designed and built by **Yours truly** for the HNG Internship 14 Stage 5b frontend task.

- GitHub — [moluno-xiii](https://github.com/moluno-xiii)
- LinkedIn — [progress-moluno](https://www.linkedin.com/in/progress-moluno)
- X — [moluno_cp](https://x.com/moluno_cp)
- Email — molunoprogress@gmail.com
