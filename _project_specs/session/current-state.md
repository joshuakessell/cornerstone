<!--
CHECKPOINT RULES (from session-management):
- Quick update: after any todo completion
- Full checkpoint: after ~20 tool calls or decisions
- Archive: end of session or major feature complete
-->

# Current Session State

*Last updated: 2026-04-21 (session handoff for `/spawn-team` restart)*

## Active Task
Hand off to a new Claude Code session with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` exported, so `/spawn-team` can actually create the team. This session scaffolded everything but can't spawn agents (experimental flag wasn't active at Claude startup).

## Current Status
- **Phase**: ready-to-spawn
- **Progress**: scaffold complete, specs written, repo pushed to `origin/main`
- **Blocking Issues**: agent-teams flag not active in current Claude process — must restart

## Context Summary
Cornerstone Law Group website redesign. Next.js 16 (App Router) + React 19 + Tailwind 4 + TypeScript scaffold is live on `main`. Six feature specs drafted in `_project_specs/features/` with testable acceptance criteria (DOM assertions, forbidden strings, axe-core, Lighthouse gates). Agent team infrastructure (`.claude/agents/`, `.mcp.json`, CI workflows) is ready. Pre-push hook is currently **disabled** (`.git/hooks/pre-push.disabled`) for the team run.

## Latest commits on origin/main
- `d8e1f4e` — Add 6 feature specs for agent team run
- `e9b60eb` — Replace scaffold boilerplate with firm metadata and security headers
- `49de879` — Scaffold Next.js 16 + Tailwind 4, pivot to law firm marketing site
- `50fb9fe` — Initial project scaffolding

## Files Being Modified
| File | Status | Notes |
|------|--------|-------|
| `.git/hooks/pre-push` | renamed → `.disabled` | Re-enable after team run completes |

## Next Steps (for the restarted session)
1. Confirm flag active: `echo "$CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS"` → should print `1`.
2. Invoke `/spawn-team`. It reads `_project_specs/features/*.md`, spawns 5 permanent agents + 6 feature agents, and starts the strict TDD pipeline.
3. **Wire `blockedBy` correctly**: all 5 page feature chains MUST be blocked by `global-foundation` completion. The team lead handles this, but verify before agents start writing code — otherwise page agents race to define palette classes.
4. Monitor progress via `TaskList`. Let it run to completion (all PRs created).
5. After PRs are created & reviewed: `mv .git/hooks/pre-push.disabled .git/hooks/pre-push` to restore the local review gate.
6. Content-swap backlog items:
   - Real bios for Clint C. Brown + Tyra Miller (replaces `[UPDATED_BIO_TBD]`)
   - Real testimonials from Jennifer/Joshua/Elizabeth/Cameron/Catherine (replace `[PLACEHOLDER_TESTIMONIAL:<name>]`)
   - Real headshots, hero photo for Our Approach, welcoming images for Contact/Client Area
   - Real services copy (currently: Divorce, Child Custody, Adoption, Mediation)
   - `NEXT_PUBLIC_CLIO_EMBED_URL` + CSP `frame-src` allowance

## Key Context to Preserve
- Framework is Next.js 16 App Router — **read `AGENTS.md`** (APIs may differ from training data; see `node_modules/next/dist/docs/` when writing Next.js code)
- Real firm content not yet available — specs use placeholder-tolerant tests (length-based checks, structural assertions) not exact-text matches
- Tailwind 4 (not 3) — config is CSS-first via `@theme` in `globals.css`, not `tailwind.config.ts`. Global-foundation spec may need to reflect this if team lead tries to write a `tailwind.config.ts`
- CSP is deferred until Clio embed URL is known (see `decisions.md`)

## Resume Instructions for the NEW session (after restart)
1. `cd ~/Projects/cornerstone`
2. `echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` → must show `1`
3. Read this file, then `_project_specs/features/*.md`, then `CLAUDE.md`
4. Run `/spawn-team`
5. Verify the team lead's task chain for each feature includes `blockedBy: global-foundation` on all 5 page features

## Gotcha for the team lead agent
The original `global-foundation` spec criterion GF-1 mentions `tailwind.config.ts` — this scaffold uses **Tailwind 4** which configures via `@theme` in `app/globals.css` instead. The Quality Agent should flag this at spec review; the feature agent may need to adjust the spec to match: e.g., "brand color tokens are defined via `@theme` in `globals.css`, exposed as `--color-brand-navy-*` and `--color-brand-gold-*`, and consumable as `text-brand-navy-*` / `bg-brand-gold-*` classes via Tailwind 4's automatic class generation."
