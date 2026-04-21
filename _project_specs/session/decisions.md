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

## [2026-04-20] Initial stack selection

**Decision**: TypeScript + Vite + React, no DB, deploy to Vercel, AI-first (Anthropic SDK).
**Context**: `/initialize-project` at scaffold time.
**Options Considered**: Next.js vs Vite; Supabase vs none.
**Choice**: Vite (simpler SPA), no DB for now.
**Reasoning**: Start lean; revisit SSR and DB if features require.
**Trade-offs**: No server-side rendering; add DB later if needed.
**References**: `CLAUDE.md` Tech Stack section.
