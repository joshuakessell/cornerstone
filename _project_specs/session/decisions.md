<!--
LOG DECISIONS WHEN:
- Choosing between architectural approaches
- Selecting libraries or tools
- Making security-related choices
- Deviating from standard patterns

Append-only. Never delete entries.
-->

# Decision Log

## Format
```
## [YYYY-MM-DD] Decision Title

**Decision**: What was decided
**Context**: Why this decision was needed
**Options Considered**: What alternatives existed
**Choice**: Which option was chosen
**Reasoning**: Why this choice was made
**Trade-offs**: What we gave up
**References**: Related code/docs
```

---

## [2026-04-21] Framework pivot: Vite → Next.js; drop AI-first framing

**Decision**: Switch from Vite to Next.js 16 (App Router). Drop llm-patterns skill and `ANTHROPIC_API_KEY` from `.env.example`. Swap to `next-best-practices` skill.
**Context**: Real scope revealed as a Cornerstone Law Group marketing-site redesign + Clio CRM embed. SEO/OG tags matter for a law firm; SPA would need extra tooling for those. LLM tooling isn't load-bearing.
**Options Considered**: Keep Vite + add prerender/react-helmet; Next.js Pages Router; Next.js App Router.
**Choice**: Next.js App Router.
**Reasoning**: Best SEO/metadata story out of the box; matches our Lighthouse ≥ 95 SEO goal; no backend needed (Clio handles intake).
**Trade-offs**: More framework surface area than a Vite SPA.
**References**: commit `49de879`, `CLAUDE.md`, `AGENTS.md`.

## [2026-04-21] CSP deferred until Clio embed is known

**Decision**: Ship baseline security headers in `next.config.ts` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS) but **not** a Content-Security-Policy yet.
**Context**: A strict CSP would need `frame-src` / `script-src` allowances for the Clio widget origin, which we don't have yet. Shipping a CSP now risks either being too permissive (defeats the purpose) or blocking Clio later.
**Choice**: Defer CSP to the Client Area feature when we have the Clio embed URL.
**Trade-offs**: We ship without CSP for the initial public routes. Still protected by HSTS + frame-ancestors via X-Frame-Options.
**References**: `next.config.ts`, Clio integration in Client Area feature.

## [2026-04-20] Initial stack selection

**Decision**: TypeScript + Vite + React, no DB, deploy to Vercel, AI-first (Anthropic SDK).
**Context**: `/initialize-project` at scaffold time.
**Options Considered**: Next.js vs Vite; Supabase vs none.
**Choice**: Vite (simpler SPA), no DB for now.
**Reasoning**: Start lean; revisit SSR and DB if features require.
**Trade-offs**: No server-side rendering; add DB later if needed.
**References**: `CLAUDE.md` Tech Stack section.
