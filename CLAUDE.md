# CLAUDE.md

## Skills
Read and follow these skills before writing any code:
- .claude/skills/base/SKILL.md
- .claude/skills/security/SKILL.md
- .claude/skills/project-tooling/SKILL.md
- .claude/skills/session-management/SKILL.md
- .claude/skills/code-graph/SKILL.md
- .claude/skills/typescript/SKILL.md
- .claude/skills/react-web/SKILL.md
- .claude/skills/llm-patterns/SKILL.md
- .claude/skills/agent-teams/SKILL.md

## Project Overview
[Project description — fill in later]

## Tech Stack
- Language: TypeScript
- Framework: React + Vite
- Database: None / SQLite (local)
- Deployment: Vercel
- AI: Anthropic SDK (AI-first app)
- Testing: Vitest + React Testing Library (recommended; confirm when adding tests)

## Key Commands
```bash
# Verify CLI tooling
./scripts/verify-tooling.sh

# Install dependencies
npm install

# Dev server
npm run dev

# Run tests
npm test

# Lint & type check
npm run lint
npm run typecheck

# Pre-commit hooks (after clone)
npx husky init

# Deploy
vercel          # preview
vercel --prod   # production
```

## Documentation
- `docs/` - Technical documentation
- `_project_specs/` - Project specifications, todos, session state

## Atomic Todos
All work tracked in `_project_specs/todos/`:
- `active.md` - Current work
- `backlog.md` - Future work
- `completed.md` - Done (for reference)

Every todo has validation criteria and test cases. See `base/SKILL.md`.

## Session Management

### State Tracking
Maintain session state in `_project_specs/session/`:
- `current-state.md` - Live session state (update every 15–20 tool calls)
- `decisions.md` - Architectural/implementation decisions (append-only)
- `code-landmarks.md` - Important code locations
- `archive/` - Past session summaries

### Automatic Updates
Update `current-state.md`:
- After completing any todo
- Every 15–20 tool calls during active work
- Before significant context shifts
- When encountering blockers

### Decision Logging
Log to `decisions.md` when:
- Choosing between architectural approaches
- Selecting libraries/tools
- Making security-related choices
- Deviating from standard patterns

### Resuming Work
When starting a new session:
1. Read `_project_specs/session/current-state.md`
2. Check `_project_specs/todos/active.md`
3. Review recent `decisions.md` entries
4. Continue from "Next Steps" in current-state.md

## Code Graph (MCP)

This project uses MCP-based code graph (Tier 1: codebase-memory-mcp).

### Usage Priority
1. **Graph first** – Use MCP graph tools for symbol search, dependency tracing, impact analysis.
2. **File read second** – Only read full files when modifying code or needing full context.
3. **Grep last** – Avoid grep when graph tools can answer faster.

### Configuration
- MCP config: `.mcp.json`
- Graph data: `.code-graph/` (gitignored)
- Post-commit hook auto-updates graph

## Agent Teams (Default Workflow)

This project uses Claude Code Agent Teams as the default development workflow.
Every feature is implemented by a dedicated agent following a strict TDD pipeline.

### Strict Pipeline (per feature)
Spec → Spec Review → Tests → RED Verify → Implement → GREEN Verify → Validate → Code Review → Security Scan → Branch + PR

### Team Roster
- **Team Lead** – Orchestrates, breaks work into features, assigns tasks (NEVER writes code)
- **Quality Agent** – Verifies TDD discipline (RED/GREEN, coverage ≥ 80%)
- **Security Agent** – OWASP scanning, secrets detection, dependency audit
- **Code Review Agent** – Multi-engine code reviews (Claude/Codex/Gemini)
- **Merger Agent** – Creates feature branches and PRs via `gh`
- **Feature Agents** – One per feature, follows the strict TDD pipeline

### Commands
- `/spawn-team` – Spawn the agent team

### Required Environment
```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

## Project-Specific Patterns
[Add patterns specific to this project as they emerge]
