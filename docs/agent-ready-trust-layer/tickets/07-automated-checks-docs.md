# Ticket 7 — Add automated tests and documentation

**Status: ✅ Complete.** `docs/agent-ready-trust-layer/README.md` (non-developer-
friendly) and `AI_TOOLING.md` §5 written. CI decision: kept local/manual
rather than added to the repo's existing PR-triggered `ci.yml` (which
currently only runs `npm run build`) — see `DECISIONS.md`, 2026-08-13, which
also corrects an earlier, inaccurate claim in this ticket's original
implementation that no CI pipeline existed at all. Docs updated post-review
to also cover `npm run typecheck` and `npm run smoke-test`, added alongside
`audit:facts`.

## Objective
Wire the consistency audit into the project's normal workflow (at minimum
documented, at most CI-enforced per Andrew's call) and document the whole
system the way `AI_TOOLING.md` documents existing tooling.

## Why it matters
A check nobody runs, or a system nobody understands how to update, doesn't
actually prevent drift — it just adds a file. This ticket is what makes the
rest of the epic durable past the session that built it.

## Files likely to change
- `AI_TOOLING.md` (add a section — or a new sibling doc if it's getting long)
- `docs/agent-ready-trust-layer/README.md` (new — index into PRD, tech spec,
  and how to run things day to day)
- Possibly `.github/workflows/` (only if Andrew opts into CI enforcement —
  see decision below)

## Dependencies
Tickets 2, 3, 5 (documents what actually shipped, not what was planned).

## Implementation tasks
- [ ] Write `docs/agent-ready-trust-layer/README.md`: what this system is,
      where each piece lives (`facts.ts`, `/llms.txt` route, markdown
      mirrors, audit script, prompt fixture), and the three commands a future
      session needs (`npm run audit:facts`, how to preview `/llms.txt`
      locally, how to add a new fact).
- [ ] Add a short section to `AI_TOOLING.md` describing `audit:facts` as a
      developer-facing check — matching that doc's existing tone and
      boundary-listing style (no AI talks to guests, etc.).
- [ ] **Decision (Andrew):** should `npm run audit:facts` run in CI on every
      PR, or stay a local/manual command for now, matching the gh-aw
      site-health-report's existing manual-dispatch-only pattern? If CI:
      add it as a step in a new or existing workflow, `contents: read`-only,
      no write permissions, matching existing security posture. If manual:
      just document the command clearly and move on — no workflow file
      needed.
- [ ] Confirm `npm run build`, `npm run lint`, and `npm run audit:facts` all
      pass together as the "is this epic done" bar.

## Validation commands
```bash
npm run build
npm run lint
npm run audit:facts
```

## Browser checks
None specific to this ticket — it's documentation and (optionally) CI config.

## Edge cases
- If CI is chosen: confirm the workflow can't accidentally get write/PR-
  comment permissions or a schedule trigger — re-read the near-miss note in
  `AI_TOOLING.md` (`gh aw compile` auto-generating a scheduled companion
  workflow) before adding anything to `.github/workflows/`.

## Acceptance criteria
- [ ] `docs/agent-ready-trust-layer/README.md` exists and is accurate.
- [ ] `AI_TOOLING.md` reflects the new `audit:facts` tooling.
- [ ] CI decision made and either implemented (read-only, manual-dispatch or
      PR-check only) or explicitly deferred with a note in
      `OPEN-QUESTIONS.md`.

## Out of scope
- Any workflow with write access, auto-comment, auto-PR, or scheduled
  (cron) triggers — none of that fits this repo's existing "no unattended
  actions" posture.
