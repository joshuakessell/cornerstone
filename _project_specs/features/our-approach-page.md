# Feature: our-approach-page

**Blocked by:** global-foundation

## Description
Redesign `/our-approach`. Replace the old hero photo with a new placeholder image. Redesign the testimonial section to feature longer, in-depth quotes (not one-liners). Five named testimonials are included by default (Jennifer, Joshua, Elizabeth, Cameron, Catherine). The string "Cornerstone Law Group, P.C." must not appear inside any testimonial block.

## Acceptance Criteria
1. Route `/our-approach` exists and renders inside `<PageShell>`.
2. A single hero image `<img>` / `next/image` is rendered in the top section; its `src` is a placeholder distinct from any previous asset (use `/public/approach/hero-placeholder.jpg` — dimensions ≥ 1200×600).
3. A testimonials section (`<section data-testid="testimonials">`) renders exactly 5 `<blockquote>` elements on initial load.
4. Each testimonial has: a quote body ≥ 200 characters, a `<cite>` with the author's first name, and a distinct surrounding card element. Test asserts length ≥ 200 to enforce "in-depth" vs one-liner.
5. The five authors (by first name) present: **Jennifer, Joshua, Elizabeth, Cameron, Catherine**. Each author appears exactly once.
6. The exact string `"Cornerstone Law Group, P.C."` does NOT appear anywhere inside the testimonials section DOM subtree (case-sensitive check, plus a case-insensitive check on the substring without punctuation).
7. Testimonials use the body typography scale; no inline styles.
8. Page `<title>` resolves to `"Our Approach | Cornerstone Law Group"`.
9. axe-core clean.
10. Lighthouse on `/our-approach` mobile: Performance ≥ 90, SEO ≥ 95, A11y ≥ 95, CLS < 0.1.

## Test Cases
| ID | Test | Type | Assertion |
|----|------|------|-----------|
| OA-1 | Route renders | unit | `<PageShell>` present, `<h1>` for "Our Approach" |
| OA-2 | Hero image present | unit | A single `<img>` in hero section with non-empty `src` and `alt` |
| OA-3 | Hero src is placeholder path | unit | Hero `src` matches `/approach/hero-placeholder` |
| OA-4 | 5 blockquotes | unit | `within(testimonialsSection).getAllByRole("blockquote").length === 5` |
| OA-5 | Each quote ≥ 200 chars | unit | For each blockquote: `textContent.trim().length >= 200` |
| OA-6 | Authors list | unit | Set of `<cite>` text equals `{ "Jennifer", "Joshua", "Elizabeth", "Cameron", "Catherine" }` |
| OA-7 | Forbidden firm string | unit | `testimonialsSection.textContent.includes("Cornerstone Law Group, P.C.") === false` AND case-insensitive regex `/cornerstone law group/i` does not match |
| OA-8 | Title | unit | `<title>` === `"Our Approach | Cornerstone Law Group"` |
| OA-9 | axe clean | unit | `toHaveNoViolations()` |
| OA-10 | Lighthouse gates | e2e | on `/our-approach` |

## Placeholder / Content Split
- Hero image → placeholder file committed to `/public/approach/hero-placeholder.jpg` (stock-style, ≥ 1200×600). Real asset later.
- Testimonial quote bodies → lorem-style placeholder text ≥ 200 chars, each starting `"[PLACEHOLDER_TESTIMONIAL:<first-name>] "` so we can grep-replace when real quotes arrive. Test enforces structure, not real content.
- Tracked content-swap todo: replace 5 placeholders with real quotes from Jennifer/Joshua/Elizabeth/Cameron/Catherine.

## Out of Scope
- Audio/video testimonials
- Pagination or carousel behavior (single column stacked cards is sufficient)
- "Read more" expansions
