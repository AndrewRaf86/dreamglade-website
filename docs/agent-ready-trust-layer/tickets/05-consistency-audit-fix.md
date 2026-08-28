# Ticket 5 — Audit and correct factual inconsistencies on public pages

**Status: ✅ Complete, including improvements from independent review.**
`scripts/audit-facts.ts` + `npm run audit:facts` (alias: `npm run audit`),
41 checks, 41/41 passing — no real drift found, confirming Phase 1's
findings. One false positive caught and fixed during implementation (a
"cure claim" check was matching the site's own correct negated disclaimer
text — rewritten to require an affirmative subject+claim pattern).

Independent review found the original checks were all corpus-wide ("does
this fact appear *somewhere*?"), which would miss a regression on one
specific page if the fact survived elsewhere. Added six **page-scoped**
checks that verify a fact against its specific canonical page (group size on
the homepage, medical disclaimer + no-automated-screening on the safety
page, human-led application language on the apply page, arrival-pickup
policy + ceremony schedule on the FAQ page). The script's header comment now
explains this corpus-wide vs. page-scoped distinction and states plainly
that regex checks give targeted, not exhaustive, coverage. Also added
`npm run typecheck` (type-checks the script itself, previously unwired) and
`npm run smoke-test` (route-level check covering the `/md/[slug]` edge cases
from finding #1 above).

## Objective
Build `scripts/audit-facts.ts`, run it against the live site, and fix any
real drift it finds between `src/lib/facts.ts` and actual page copy.

## Why it matters
This is the repeatable version of what the Aug 6 audit did manually. It also
directly protects PRD success metric "key factual claims are consistent
across the website" and "safety language is not contradicted or weakened."

## Files likely to change
- `scripts/audit-facts.ts` (new)
- `package.json` (add `"audit:facts"` script)
- Any `src/app/**/*.tsx` file the audit finds genuinely drifted (expected to
  be few-to-none, based on Phase 1 findings — the site is already highly
  consistent)

## Dependencies
Ticket 2.

## Implementation tasks
- [ ] Build the script per `TECHNICAL-SPEC.md` §5: presence checks, banned-
      phrase checks, pricing parity, markdown-mirror parity (once ticket 4
      exists — stub this check gracefully if the mirrors don't exist yet).
- [x] Seed the banned-phrase denylist from confirmed fact changes. As of
      2026-08-27, the superseded six-plant list and Machinga are banned from
      current public/AI-facing source; see `DECISIONS.md`.
- [ ] Add `"audit:facts": "node --experimental-strip-types scripts/audit-facts.ts"`
      to `package.json`.
- [ ] Run it. If it finds real drift (not expected, but possible if something
      changed between Phase 1 inspection and this ticket), fix the drifted
      page copy directly — small, targeted edits only, no rewrites.
- [ ] Document the script's purpose and usage in a short section of
      `AI_TOOLING.md` or a new `docs/agent-ready-trust-layer/` doc (ticket 7
      owns the final documentation pass, but note it here too).

## Validation commands
```bash
npm run audit:facts    # must exit 0
npm run build
npm run lint
```

## Browser checks
None required for the script itself. If any page copy is fixed as a result,
spot-check that page renders correctly (no broken JSX from the edit).

## Edge cases
- False positives: a phrase like "six" or a healer name appearing in an
  unrelated context (e.g. a testimonial quote) could trigger a false match —
  keep checks scoped to known fact-bearing sections/pages, not a blind
  site-wide regex, to avoid noisy failures that erode trust in the tool.
- If the script finds a **conflict it can't resolve automatically** (e.g. two
  pages state genuinely different values, not just one being outdated), stop
  and log it in `DECISIONS.md` rather than guessing which one is correct —
  per the project brief's explicit instruction.

## Acceptance criteria
- [ ] `npm run audit:facts` exists, runs, and exits 0 on `main`.
- [ ] The banned-phrase list includes at minimum: outdated plant count,
      outdated pricing figures, wrong ceremony days, wrong group-size number,
      any reintroduced "yoga" mention (removed sitewide previously).
- [ ] Any real drift found is fixed with a minimal, targeted diff.
- [ ] Any unresolved conflict is logged in `DECISIONS.md`, not silently
      guessed at.

## Out of scope
- CI wiring (ticket 7 decides/documents; this ticket only needs the script to
  work locally).
- Semantic or AI-based fact-checking — string/regex matching only.
