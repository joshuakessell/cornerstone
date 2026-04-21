# Feature: contact-and-client-area

**Blocked by:** global-foundation

## Description
Build `/contact` and `/client-area`. Both pages currently feel bland; integrate client testimonials and welcoming imagery to elevate the design. The Client Area is a container for a third-party Clio intake widget — **no custom intake form is built**. The page flow first collects the user's basic information (name + contact method) in a lightweight pre-intake step, then hands off to the Clio widget in an iframe. Layout must support a seamless iframe or script embed without CLS.

## Acceptance Criteria (Contact)
C1. Route `/contact` exists and renders inside `<PageShell>`.
C2. Page has exactly one `<h1>` ("Contact" or similar).
C3. At least 2 testimonial snippets (`<blockquote>` with `<cite>`) appear in a sidebar or below-the-fold section. Tests assert count ≥ 2.
C4. At least one welcoming photograph is rendered via `next/image` (placeholder acceptable).
C5. Primary contact information displayed: phone, email, and office address. Each uses the correct semantic element (`<a href="tel:...">`, `<a href="mailto:...">`, `<address>`). All three values are driven by `site.config.ts`.
C6. `<title>` === `"Contact | Cornerstone Law Group"`.
C7. axe clean; Lighthouse mobile gates (Perf ≥ 90, SEO ≥ 95, A11y ≥ 95, CLS < 0.1).

## Acceptance Criteria (Client Area)
CA1. Route `/client-area` exists and renders inside `<PageShell>`. Page label rendered as the heading text "Client Area".
CA2. A two-step flow. Step 1 is a pre-intake form with exactly three fields: `fullName` (text, required), `preferredContact` (radio: email | phone, required), and one of `emailAddress` (email, required if preferredContact === email) OR `phoneNumber` (tel, required if preferredContact === phone). Form uses HTML5 validation + Zod schema for runtime validation (`@hookform/resolvers` optional). On valid submit, Step 2 reveals the Clio widget container.
CA3. Step 2 renders an `<iframe data-testid="clio-embed">` whose `src` comes from `process.env.NEXT_PUBLIC_CLIO_EMBED_URL`. When the env var is missing or empty, the iframe is **not** rendered; instead a labeled placeholder appears: `<div role="status" data-testid="clio-placeholder">`. Tests assert both branches.
CA4. The iframe has `loading="lazy"`, `title` attribute set to `"Clio intake form"`, `referrerPolicy="strict-origin-when-cross-origin"`, and is wrapped in a fixed-aspect-ratio container (e.g., `aspect-[4/5]` or `min-h-[700px]`) to prevent CLS.
CA5. **No custom full intake form** (beyond the 3-field pre-intake) is present. Test asserts no more than 3 form controls in Step 1; no additional form controls outside `.clio-embed-wrapper`.
CA6. Pre-intake data is NOT sent to any backend by this codebase; it is held in component state and optionally passed as query parameters to the Clio iframe `src` if the env var includes a template placeholder (`{name}`, `{contact}`). Document this in a comment; test asserts no `fetch`/`XMLHttpRequest` call is issued on submit.
CA7. The Client Area includes at least 1 testimonial snippet and 1 welcoming image above or beside the flow to match the Contact elevation criterion.
CA8. `<title>` === `"Client Area | Cornerstone Law Group"`.
CA9. axe clean; Lighthouse mobile gates (Perf ≥ 85 when widget present — lower bar for iframe, SEO ≥ 95, A11y ≥ 95, CLS < 0.1).

## Test Cases
| ID | Test | Type | Assertion |
|----|------|------|-----------|
| CT-1 | Contact renders | unit | `<PageShell>` + `<h1>` + ≥ 2 blockquotes |
| CT-2 | tel/mailto links | unit | Presence of `a[href^="tel:"]` and `a[href^="mailto:"]` |
| CT-3 | `<address>` semantic | unit | Exactly one `<address>` element |
| CT-4 | Welcome image | unit | At least one `next/image` in the page body |
| CT-5 | Contact title | unit | `"Contact | Cornerstone Law Group"` |
| CT-6 | Contact Lighthouse | e2e | gates on `/contact` |
| CA-1 | Client Area heading | unit | Heading text === `"Client Area"` |
| CA-2 | Step 1 has 3 fields | unit | `within(step1).getAllByRole("textbox").length + radioCount === 3` |
| CA-3 | Required validation | unit | Submit empty → `fullName` input has `aria-invalid="true"` |
| CA-4 | Email branch | unit | preferredContact=email → email input present and required |
| CA-5 | Phone branch | unit | preferredContact=phone → tel input present and required |
| CA-6 | No network on submit | unit | Mock `global.fetch`; expect not called after valid submit |
| CA-7 | Reveal Step 2 | unit | After valid submit, `data-testid="clio-embed"` or `clio-placeholder` appears |
| CA-8 | Iframe when env set | unit | Render with `NEXT_PUBLIC_CLIO_EMBED_URL="https://example.com/clio"`: `iframe` rendered with that `src`, `loading="lazy"`, `title="Clio intake form"`, `referrerPolicy="strict-origin-when-cross-origin"` |
| CA-9 | Placeholder when env missing | unit | Render without env var: `clio-placeholder` rendered, `clio-embed` not in DOM |
| CA-10 | No custom intake form | unit | Total form control count on page ≤ 3 |
| CA-11 | CLS-safe iframe | unit | Iframe wrapper has CSS `aspect-ratio` or explicit `min-height` ≥ 500px |
| CA-12 | Client Area title | unit | `"Client Area | Cornerstone Law Group"` |
| CA-13 | axe clean (both pages) | unit | `toHaveNoViolations()` |
| CA-14 | Lighthouse gates | e2e | on `/client-area` and `/contact` |

## Placeholder / Content Split
- **Placeholder now**: testimonial snippets (can reuse 1-2 from `our-approach-page` feature), welcome image placeholders in `/public/contact/` and `/public/client-area/`, site.config values (phone/email/address) as TBD strings.
- **Env var `NEXT_PUBLIC_CLIO_EMBED_URL`**: not set in `.env.example` until the firm provides the real Clio embed URL — the placeholder fallback branch covers the interim state.
- **CSP follow-up**: once `NEXT_PUBLIC_CLIO_EMBED_URL` is confirmed, add a follow-up feature to wire a Content-Security-Policy in `next.config.ts` with `frame-src` including the Clio origin.

## Out of Scope
- Server-side persistence of pre-intake form data
- OAuth / authentication for the Client Area
- Any integration with Clio's API beyond the embed (Clio handles intake end-to-end)
- Custom intake form beyond the 3-field pre-intake handoff
