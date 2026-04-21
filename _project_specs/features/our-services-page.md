# Feature: our-services-page

**Blocked by:** global-foundation

## Description
Build `/our-services`. The spec calls out that the current site's Services page is already professional and organized and should preserve its structural layout. Since we don't have the current site scraped, we build a faithful Services page using the existing information architecture: a top-level heading, an intro paragraph, and a grid of service category cards. Each card has a heading, a short description, and (optionally) a list of sub-services. The structure is the contract — content is placeholder until the firm provides real copy.

## Acceptance Criteria
1. Route `/our-services` exists and renders inside `<PageShell>`.
2. Page has exactly one `<h1>` ("Our Services" or brand-appropriate variant).
3. An intro paragraph of at least one sentence appears above the services grid.
4. Services render as a grid (`<section data-testid="services-grid">`) with at least 4 `<article>` cards on viewports ≥ 768px (grid has ≥ 2 columns). On < 768px, cards stack (grid collapses to 1 column) — no horizontal overflow.
5. Each service card has: an `<h2>` or `<h3>` title, a description `<p>`, and either (a) nothing further OR (b) a `<ul>` of sub-services. No card has a truncated title (tests compute `offsetHeight < scrollHeight === false` for titles).
6. At least 4 default service categories rendered (data driven by `content/services.ts`). Default set (editable): "Divorce", "Child Custody", "Adoption", "Mediation". The list is an array so adding/removing cards is a one-line change.
7. All card images (if present) use `next/image` with explicit `width`/`height` or `fill` + aspect-ratio wrapper — no bare `<img>` without size.
8. Page `<title>` resolves to `"Our Services | Cornerstone Law Group"`.
9. axe-core clean.
10. Lighthouse mobile gates: Performance ≥ 90, SEO ≥ 95, A11y ≥ 95, CLS < 0.1.

## Test Cases
| ID | Test | Type | Assertion |
|----|------|------|-----------|
| OS-1 | Route renders | unit | `<PageShell>` + single `<h1>` |
| OS-2 | Intro present | unit | There is a `<p>` between `<h1>` and `services-grid` with ≥ 1 sentence (text length ≥ 30 chars) |
| OS-3 | Grid has ≥ 4 cards | unit | `within(servicesGrid).getAllByRole("article").length >= 4` |
| OS-4 | Grid ≥ 2 cols desktop | e2e | At 1024px, `getComputedStyle(servicesGrid).gridTemplateColumns` resolves to ≥ 2 tracks |
| OS-5 | Grid collapses mobile | e2e | At 375px, `gridTemplateColumns` resolves to 1 track; no body horizontal scroll |
| OS-6 | Card structure | unit | Each `<article>` has a heading (h2/h3) and a `<p>` |
| OS-7 | Default categories | unit | Card heading text set includes the 4 default categories |
| OS-8 | Title tag | unit | `<title>` === `"Our Services | Cornerstone Law Group"` |
| OS-9 | No untyped images | unit | Page source: no `<img>` without `width` + `height` attrs (allow `next/image` only) |
| OS-10 | axe clean | unit | `toHaveNoViolations()` |
| OS-11 | Lighthouse | e2e | gates on `/our-services` |

## Placeholder / Content Split
- **Placeholder now**: 4 service categories with 1-sentence descriptions (generic family-law phrasing). Firm can swap in their real copy by editing `content/services.ts`.
- **No real images required.**

## Out of Scope
- Per-service detail pages (`/our-services/[slug]`) — can be a follow-up feature once the firm confirms their IA
- Contact-form embedding on this page (Contact lives on `/contact`)
