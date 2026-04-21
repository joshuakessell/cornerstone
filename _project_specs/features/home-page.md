# Feature: home-page

**Blocked by:** global-foundation (palette, typography, `PageShell`, `SiteHeader`, `SiteFooter`, payment CTA, test infra, `site.config.ts`)

## Description

Redesigned Home page for the Cornerstone Law Group marketing site — the firm's primary marketing landing surface. The page leads with a hero that emphasizes the word **"Family"**, plays a looping, muted, decorative background video (no audio-player chrome), and renders an intro paragraph using the foundation's `.prose-body` (justified) utility. It consumes palette, typography, layout shell, nav, footer, and the site-wide lower-right payment CTA from `global-foundation`.

Rendered as a Next.js App Router **Server Component** at `app/page.tsx`. The page wraps its content in `<PageShell>` (from `global-foundation`) and owns its own `<main>` landmark. No interactivity — the `<video>` is declaratively configured; no client boundary required.

## Scope

**In scope**
- `app/page.tsx` replacement (currently a scaffold placeholder)
- New component files under `app/_components/home/`:
  - `Hero.tsx` – `<h1>` with "Family" emphasis, subhead, contains `<HeroVideo />`
  - `HeroVideo.tsx` – looping muted decorative `<video>` with poster fallback
  - `Intro.tsx` – intro paragraph using `.prose-body`
- `app/content/home.ts` – all strings and asset paths (headline, "Family" word, subhead, intro copy, videoSrc, posterSrc) exported as a typed object. Mirrors the `app/content/services.ts` pattern established by foundation. Components import from here; no hardcoded copy in JSX.
- `public/video/hero.mp4.placeholder` + `public/images/home-hero-poster.jpg.placeholder` markers (real assets supplied by stakeholders)
- Colocated tests: `*.test.tsx` next to each component, plus `app/page.test.tsx` integration test and one Playwright spec at `e2e/home.spec.ts`

**Out of scope**
- `<SiteHeader>`, `<SiteFooter>`, `<PageShell>`, payment CTA — **owned by `global-foundation`**
- Palette tokens, typography scale, `.prose-body` utility — owned by `global-foundation`
- Test infra (Vitest, RTL, jsdom, axe, Playwright config) — owned by `global-foundation` (task #18)
- Other pages, media asset final selection, final copy sign-off

## Dependencies

- **`global-foundation` implementation (task #12)** – `PageShell`, `SiteHeader`, `SiteFooter`, payment CTA (GF-6, GF-8, GF-9), `.prose-body` utility (GF-5), brand palette tokens (GF-1), typography scale (GF-3) must all be in place before home-page implementation (task #40) can complete. Reflected in the task graph (#40 blocked by #12, #17, #19).
- **`global-foundation` test infra (task #18)** – Vitest + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom` + `jest-axe` + Playwright must be installed and configured before home-page RED tests (task #30) can run.
- **`global-foundation` conventions publication (task #19)** – content-split pattern (`site.config.ts`), axe-test helper, and Playwright viewport defaults must be documented so this feature can mirror the pattern in `app/content/home.ts`.

## Payment CTA — explicit non-ownership

The site-wide Make-a-Payment CTA is **owned by `global-foundation`** and rendered by `<PageShell>` in the lower-right (GF-6, GF-8, GF-9). This feature does **not** render a payment button. Home-page tests that count elements inside `<main>` (e.g. "exactly one h1") scope assertions using `within(screen.getByRole('main'))` to avoid coupling to the PageShell-rendered CTA or the SiteHeader nav links.

## Assumptions & Open Questions

1. **Video source** – `app/content/home.ts` default is `/video/hero.mp4`; stakeholder supplies final.
2. **Poster image** – `/images/home-hero-poster.jpg` default; stakeholder supplies final.
3. **"Family" emphasis treatment** – overview allows "different font OR underline." This spec commits to an underline rendered via a `<span class="home-hero-family">` wrapper. Designer may later swap visual treatment (alternate font, different underline style) without breaking tests as long as the class and text stay.
4. **Intro copy** – placeholder string in `app/content/home.ts`; stakeholder supplies final copy (content edit, not a code change).

## Acceptance Criteria (test-observable)

All DOM assertions are scoped to `within(screen.getByRole('main'))` unless otherwise noted, so that PageShell / SiteHeader content does not couple home-page tests.

| ID    | Criterion                                                                                                              |
|-------|------------------------------------------------------------------------------------------------------------------------|
| AC-1  | `<main>` contains exactly one `<h1>`.                                                                                  |
| AC-2  | The `<h1>` text content contains the word "Family".                                                                    |
| AC-3  | The word "Family" inside the `<h1>` is wrapped in a `<span>` with class `home-hero-family` (the emphasis contract).    |
| AC-4  | `<main>` contains exactly one `<video>`.                                                                               |
| AC-5  | The `<video>` has `loop`, `muted`, `autoPlay`, `playsInline` properties all true.                                      |
| AC-6  | The `<video>` has a non-empty `poster` attribute.                                                                      |
| AC-7  | The `<video>` contains at least one `<source>` with a non-empty `src`.                                                 |
| AC-8  | The full page render (`<PageShell>` + `<main>`) contains zero `<audio>` elements.                                      |
| AC-9  | The full page render text does not contain the phrase "Exemplary Representation from a Dallas Legal Firm".             |
| AC-10 | `<main>` is wrapped inside `<PageShell>` in `app/page.tsx` (import + JSX composition contract — verified by source inspection or a rendered-tree test). |
| AC-11 | The intro paragraph element carries the class `prose-body` (foundation-owned justified-body utility, per GF-5).        |
| AC-12 | `<main>` landmark exists and is rendered by the page (not by PageShell).                                               |
| AC-13 | Every `<img>` inside `<main>` has a non-empty `alt`. The `<video>` is **decorative**: `aria-hidden="true"` and `tabIndex={-1}`. |
| AC-14 | `axe-core` finds zero serious/critical violations on the rendered page.                                                |
| AC-15 | When `prefers-reduced-motion: reduce` is active, the hero video is paused (does not auto-play motion).                 |

## Test Cases (HP-1 … HP-13)

Unit tests use Vitest + RTL + jsdom + jest-axe (foundation-supplied). E2E tests use Playwright (foundation-supplied).

| ID    | Covers         | Type | Assertion sketch                                                                                                           |
|-------|----------------|------|----------------------------------------------------------------------------------------------------------------------------|
| HP-1  | AC-1, AC-2     | unit | `within(main).getAllByRole('heading', {level: 1}).length === 1`; `h1.textContent` matches `/Family/`.                      |
| HP-2  | AC-3           | unit | `h1.querySelector('.home-hero-family')` not null; its text content === `"Family"`.                                         |
| HP-3  | AC-4, AC-5     | unit | `within(main).getAllByTestId('hero-video').length === 1`; element `.loop`, `.muted`, `.autoplay`, `.playsInline` all true. |
| HP-4  | AC-6, AC-7     | unit | `video.poster` non-empty; first `<source>.src` non-empty.                                                                  |
| HP-5  | AC-8           | unit | `container.querySelectorAll('audio').length === 0`.                                                                        |
| HP-6  | AC-9           | unit | `expect(container.textContent).not.toMatch(/Exemplary Representation from a Dallas Legal Firm/)`.                          |
| HP-7  | AC-10          | unit | Rendered tree: the `<main>` element's parent chain includes a node rendered by `PageShell` (asserted via a `data-testid="page-shell"` on the shell's outer element, set by foundation). |
| HP-8  | AC-11          | unit | Intro `<p>` class list includes `prose-body`.                                                                              |
| HP-9  | AC-12          | unit | `screen.getByRole('main')` resolves; it is the element rendered by `app/page.tsx` (not the PageShell).                     |
| HP-10 | AC-13 (images) | unit | `within(main).queryAllByRole('img')` — every element has non-empty `alt`. Note: vacuously true when no images render (home page uses video only). Intentional guard-rail against future regressions. |
| HP-11 | AC-13 (video)  | unit | `video.getAttribute('aria-hidden') === 'true'`; `video.tabIndex === -1`.                                                   |
| HP-12 | AC-14          | unit | `expect(await axe(container)).toHaveNoViolations()` on the full rendered page with `impact: ['serious','critical']` filter. |
| HP-13 | AC-15          | e2e  | Playwright: `page.emulateMedia({ reducedMotion: 'reduce' })`; navigate to `/`; assert `video.paused === true` after load.  |

**Unit vs e2e summary:** HP-1 through HP-12 are unit (Vitest + RTL + jsdom + jest-axe). HP-13 is e2e (Playwright) — `prefers-reduced-motion` cannot be emulated in jsdom.

## Component Decomposition (file / function budget)

Each file stays ≤ 200 lines / ≤ 10 functions; each function ≤ 20 lines / ≤ 3 params.

| File                                       | Purpose                                                                                   | Est. lines |
|--------------------------------------------|-------------------------------------------------------------------------------------------|-----------:|
| `app/page.tsx`                             | Server component. `<PageShell><main className="...">...</main></PageShell>`. Composes `<Hero />` + `<Intro />`. Imports copy from `app/content/home.ts`. | ~25 |
| `app/_components/home/Hero.tsx`            | `<section>` with `<h1>` + `.home-hero-family` span + subhead (marked `data-testid="hero-subhead"`), containing `<HeroVideo />`. | ~40 |
| `app/_components/home/HeroVideo.tsx`       | `<video loop muted autoPlay playsInline preload="metadata" poster aria-hidden="true" tabIndex={-1} data-testid="hero-video">` with `<source>`. | ~30 |
| `app/_components/home/Intro.tsx`           | `<p className="prose-body">` intro paragraph.                                             | ~20 |
| `app/content/home.ts`                          | Typed object export: `{ headline, familyWord, subhead, intro, videoSrc, posterSrc }`.      | ~20 |
| `app/_components/home/*.test.tsx`          | Unit tests colocated next to each component.                                              | varies |
| `app/page.test.tsx`                        | Integration test: renders full page, asserts composition + a11y.                          | ~100 |
| `e2e/home.spec.ts`                         | Playwright: HP-13 reduced-motion test.                                                    | ~25 |

## Non-Functional Requirements

- **Accessibility**: single `<h1>` in `<main>`, semantic `<main>` landmark, non-empty `alt` on images, decorative video `aria-hidden="true"` + `tabIndex={-1}`, axe clean (HP-12).
- **Reduced motion**: `HeroVideo` must honor `@media (prefers-reduced-motion: reduce)`. Implementation choice — when the query matches, suppress autoplay so the video renders paused on the poster frame. Verified by HP-13 in Playwright.
- **Performance**: video `preload="metadata"`, poster image renders synchronously to avoid CLS; no client bundle weight for home-page components (all Server Components).
- **Contrast**: inherits from foundation palette tokens; home-page tests verify class application, not computed contrast.
- **SEO**: page inherits metadata from `app/layout.tsx`; no page-level override needed.

## Test Scoping Note

Because foundation-owned `<SiteHeader>` renders a nav link to `/` and `<PageShell>` renders a site-wide payment CTA, unit tests for this page **must** scope element queries with `within(screen.getByRole('main'))` wherever a count-based assertion is made (e.g. "exactly one h1"). Full-page assertions (axe, no-audio, no-banned-phrase) can use the full `container`. Quality-agent should reject tests that assert element counts against the full `container` without scoping.

## Definition of Done

- Spec approved by quality-agent (#25)
- RED tests HP-1…HP-13 exist and fail (#30)
- RED verified (#35)
- Implementation passes all tests (#40)
- GREEN verified (#45)
- Lint, typecheck, full suite pass; coverage on home-page files ≥ 80% (#50)
- Code review approved (#55)
- Security scan clean (#60)
- Branch + PR created (#65)
