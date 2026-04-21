# Feature: our-team-page

**Blocked by:** global-foundation

## Description
Redesign `/our-team`. Each team member is a row with image on the left and description on the right, separated by clear horizontal dividers. Images are rectangular (no diamond / rhombus overlay clip-path) and sized so the subject's head is never cropped at the top. Each member has a clear title block (name + role). Two members are included by default: Clint C. Brown (Managing Partner and Founder) and Tyra Miller (Board Certified Paralegal). Bios are concise.

## Acceptance Criteria
1. Route `/our-team` exists and renders inside `<PageShell>`.
2. Each team member row uses a 2-column layout on ≥ 768px viewports (image left, bio right) via CSS Grid (`grid-cols-[auto_1fr]` or equivalent). On < 768px it collapses to stacked (image on top, bio below) — no horizontal overflow.
3. A horizontal divider is present **between** each team member (e.g., `<hr>` or `border-t`), but NOT before the first or after the last member (test via DOM count: `n_members - 1` dividers).
4. No element on the page has CSS `clip-path` or a class name containing `diamond`/`rhombus`.
5. Each team member image uses `object-fit: cover` AND `object-position` of `top` or `center top` so the subject's head is not cropped. Test asserts the computed style.
6. Each team member has an `<h2>` or `<h3>` name heading and a separate role element (`<p class="role">` or similar). The two headings for Clint C. Brown and Tyra Miller are present by default.
7. Default data includes two entries:
   - **Clint C. Brown** — role: `"Managing Partner and Founder"`, bio text: placeholder string marked `[UPDATED_BIO_TBD]` that tests accept as non-empty (length ≥ 50) until the real bio lands.
   - **Tyra Miller** — role: `"Board Certified Paralegal"`, bio text: placeholder (length ≥ 50).
8. Page `<title>` resolves to `"Our Team | Cornerstone Law Group"`.
9. axe-core clean on the page container.
10. Lighthouse on `/our-team` mobile: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95, CLS < 0.1.

## Test Cases
| ID | Test | Type | Assertion |
|----|------|------|-----------|
| OT-1 | Route renders | unit | `GET /our-team` → 200, `<PageShell>` present |
| OT-2 | Grid layout at desktop | e2e | At 1024px, each `.team-member` has `display: grid` and `grid-template-columns` resolves to 2 tracks |
| OT-3 | Stacked at mobile | e2e | At 375px, each `.team-member` is single-column; no horizontal scroll on `<body>` |
| OT-4 | Dividers between members | unit | `querySelectorAll(".team-member + hr, [data-role='divider']").length === members.length - 1` |
| OT-5 | No diamond overlay | unit | Source grep: no `clip-path`, no class name `/diamond|rhombus/i` in team page subtree; DOM audit: no element has non-`none` `clip-path` |
| OT-6 | Image object-position | unit | Each `.team-member img` computed `object-position` starts with `top` or `center top` (not `center` or `bottom`) |
| OT-7 | Clint Brown entry | unit | `getByRole("heading", { name: /Clint C\. Brown/ })` exists; nearest role element text matches `"Managing Partner and Founder"` |
| OT-8 | Tyra Miller entry | unit | `getByRole("heading", { name: /Tyra Miller/ })` exists; nearest role element text matches `"Board Certified Paralegal"` |
| OT-9 | Bio length minimum | unit | Each bio `<p>` text length ≥ 50 chars (allows placeholder, enforces non-empty) |
| OT-10 | Title tag | unit | `<title>` text === `"Our Team | Cornerstone Law Group"` |
| OT-11 | axe clean | unit | `toHaveNoViolations()` |
| OT-12 | Lighthouse gates | e2e | SEO ≥ 0.95, A11y ≥ 0.95, CLS < 0.1 on `/our-team` |

## Placeholder / Content Split
- **Placeholder now**: bios for both members (≥ 50 chars each, marked `[UPDATED_BIO_TBD]`). Real bios blocked on user providing them.
- **Placeholder now**: headshot images (`/public/team/clint-brown.placeholder.jpg`, `/public/team/tyra-miller.placeholder.jpg`). Must have the correct aspect ratio to exercise the `object-position: top` test.
- **Content-swap todo** tracked in `_project_specs/todos/backlog.md`: replace placeholders with real bios + photos.

## Out of Scope
- Adding additional team members beyond the two named
- Team member individual detail pages
- Contact form per person
