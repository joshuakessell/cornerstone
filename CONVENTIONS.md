# Cornerstone Conventions

Locked-in decisions that every feature agent must follow. Do not deviate without
updating this file and messaging the team.

## Path alias
- `@/*` maps to the repo root (`./*`), e.g. `@/app/components/SiteHeader`.
- No `src/` directory. Everything lives under `app/`.
- Configured in `tsconfig.json` (`paths`) and mirrored in `vitest.config.ts`.

## Directory layout
- Components: `app/components/` (shared) and `app/<route>/_components/` (route-scoped)
- Pages: `app/<route>/page.tsx` (default export only)
- Configuration: `app/config/site.config.ts`
- Content (copy, data): `app/content/<topic>.ts`
- Unit tests: colocated next to the file under test (`Foo.tsx` -> `Foo.test.tsx`)
- Playwright specs: `e2e/<feature>.spec.ts`

## Exports
- Components: named exports (`export function SiteHeader()`)
- Pages: default export (Next.js App Router requirement)
- Config/content modules: named exports (`export const siteConfig`, `export const services`)

## Test file naming
- Unit test files: `<name>.test.ts` or `<name>.test.tsx`
- Playwright specs: `<feature>.spec.ts`

## `data-testid` convention
- Kebab-case
- Component-scoped, no nested scopes
- Examples: `site-header`, `site-footer`, `page-shell`, `payment-button`, `clio-embed`, `testimonials`
- Only add when a role-based query would be brittle or ambiguous

## Imports
- Prefer path-alias imports (`@/app/components/SiteHeader`) over deep relative paths
- Named imports first, default imports last

## Tailwind 4
- Config lives inside `@theme` block of `app/globals.css` — there is **no `tailwind.config.ts`**
- Brand tokens: `--color-brand-navy-{50,100,500,700,900}`, `--color-brand-gold-{50,100,500,700,900}`
- Utility classes like `text-brand-navy-700` / `bg-brand-gold-500` are auto-generated from those tokens

## Environment variables
- Client-side: must be prefixed `NEXT_PUBLIC_`
- `NEXT_PUBLIC_SITE_URL` — canonical base URL
- `NEXT_PUBLIC_PAYMENT_URL` — destination of the global "Make a Payment" CTA
- `NEXT_PUBLIC_CLIO_EMBED_URL` — iframe src for the Clio intake widget (set during Contact/Client Area feature)

## Tests infrastructure
- Unit: Vitest + @testing-library/react + jsdom + jest-axe (`npm test`)
- E2E: Playwright, mobile 390x844 + desktop 1280x800 (`npm run test:e2e`)
- Coverage threshold: ≥ 80% lines/branches/functions/statements

## Quality gates (hard limits per file/function)
- 20 lines per function
- 3 parameters per function
- 2 levels of nesting
- 200 lines per file
- 10 functions per file
