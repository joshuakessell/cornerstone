# Feature: home-page

**Blocked by:** global-foundation

## Description
Redesign the home page (`/`). Hero emphasizes the word "Family" with distinct treatment (different font weight + underline, not a subtle bold). A looping muted background video plays behind the hero. The audio player bar is removed; any audio is music only. Boilerplate copy "Exemplary Representation from a Dallas Legal Firm" is absent. The only "Make a Payment" CTA on the page is the global bottom-right one from `<PageShell>` — no duplicate top-right button.

## Acceptance Criteria
1. Route `/` renders using `<PageShell>` (inherits header, footer, bottom-right payment CTA from global-foundation).
2. Hero section exposes the word **"Family"** inside a dedicated element (`<span data-testid="hero-family">`) with a visibly different treatment from surrounding hero text: computed font-weight ≥ 700 **AND** one of: non-default `font-family`, visible `text-decoration: underline`, or both. A sibling word in the hero does NOT have these.
3. A `<video>` element is present in the hero with `loop`, `autoplay`, `muted`, and `playsinline` attributes set. It has `preload="metadata"` to avoid blocking LCP.
4. No `<audio controls>` element anywhere on the page; no visible audio player bar (Playwright checks absence).
5. The exact string "Exemplary Representation from a Dallas Legal Firm" appears **nowhere** in the rendered HTML.
6. Exactly **one** "Make a Payment" link exists on `/` (the global one from `<PageShell>`). No second payment button inside the hero or top-right.
7. Hero has `<h1>` as the primary heading and uses the global typography scale (no inline font-size overrides).
8. LCP element is an image or video poster, `priority` set, with explicit `width`/`height` or aspect-ratio to prevent CLS.
9. `<title>` resolves to the `default` metadata from `layout.tsx` (i.e., `"Cornerstone Law Group"`); page-level metadata can override description but `robots` remains indexable.
10. Lighthouse `/` on mobile: Performance ≥ 85 (lower bar here because of the video), SEO ≥ 95, Accessibility ≥ 95, CLS < 0.1.

## Test Cases
| ID | Test | Type | Assertion |
|----|------|------|-----------|
| HP-1 | Page renders inside PageShell | unit | `render(<HomePage/>)` contains `data-testid="page-shell"` |
| HP-2 | Hero "Family" distinct treatment | unit | `hero-family` computed `font-weight` ≥ 700 AND (`text-decoration` includes `underline` OR `font-family` differs from sibling word) |
| HP-3 | Background video attributes | unit | `<video>` present with `loop`, `muted`, `autoPlay`, `playsInline` as boolean props |
| HP-4 | No audio controls | unit | `container.querySelector("audio[controls]")` is null |
| HP-5 | No visible audio bar | e2e | Playwright: `page.locator('audio, [role="audiobar"]')` has count 0 |
| HP-6 | Forbidden boilerplate absent | unit | Rendered HTML does NOT include `"Exemplary Representation from a Dallas Legal Firm"` |
| HP-7 | Single payment CTA | unit | `getAllByRole("link", { name: /make a payment/i })` length === 1 |
| HP-8 | Payment CTA not in top-right | unit | The payment link's closest fixed/absolute ancestor has class including `right-*` and `bottom-*`, not `top-*` |
| HP-9 | h1 present | unit | `getByRole("heading", { level: 1 })` matches |
| HP-10 | Video doesn't cause CLS | e2e | Playwright metric: `layoutShiftScore < 0.1` across load |
| HP-11 | LCP has explicit size | unit | LCP element (video poster or img) has non-zero `width`/`height` attrs |
| HP-12 | axe-core clean | unit | `expect(await axe(container)).toHaveNoViolations()` |
| HP-13 | Lighthouse SEO/A11y | e2e | `lhci` gate on `/`: SEO ≥ 0.95, Accessibility ≥ 0.95, CLS < 0.1 |

## Placeholder / Content Split
- Hero headline copy → placeholder: `"Family is our foundation."` (editable in `content/home.ts`)
- Background video → placeholder MP4 in `/public/home/hero-placeholder.mp4` (a short muted loop of appropriate aspect ratio; replace with real asset later). Tests assert the `<video>` element and attrs, **not** the specific src.
- Background music → deferred (not required for tests; add a silent track or leave omitted; spec forbids a visible audio control regardless).

## Out of Scope
- Team/approach/services/contact content (owned by other features)
- Real firm imagery
- Stripe / payment provider integration — payment CTA just links to `NEXT_PUBLIC_PAYMENT_URL`
