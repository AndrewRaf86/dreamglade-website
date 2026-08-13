# Ticket 1 — Inspect and document existing content architecture

**Status: ✅ Complete.** Facts confirmed via `npm run audit:facts` (35/35 pass)
rather than a manual Paul spot-check — Andrew confirmed during implementation
kickoff that Paul review is not required for this project (see
`DECISIONS.md`, 2026-08-12).

## Objective
Produce a written, verifiable snapshot of the current facts, routes, and
SEO/structured-data setup, so every later ticket builds on confirmed reality
instead of assumption.

## Why it matters
Every downstream ticket (facts module, llms.txt, consistency audit) is only as
correct as this inspection. Getting it wrong here means shipping a facts
module that's already out of sync with the live site.

## Files likely to change
None — this is a documentation-only ticket. Output is this repo's
`docs/agent-ready-trust-layer/` tree (already substantially produced by this
planning session — see `PRD.md` §0-equivalent context and
`TECHNICAL-SPEC.md` §0).

## Dependencies
None.

## Implementation tasks
- [x] Confirm framework, package manager, and available scripts
      (`package.json`).
- [x] Enumerate all routes (`src/app/**/page.tsx`) and confirm against
      `sitemap.ts`.
- [x] Confirm `robots.ts` / `sitemap.ts` conventions (no static
      `public/robots.txt`).
- [x] Grep every page for the 15 starting facts listed in the project brief
      (group size, owners, healers, schedule, disclosure, transport, pricing,
      medical disclaimer) and record verbatim matches.
- [x] Confirm no chatbot/booking/automated-screening/guest-communication
      automation exists in `src/`.
- [x] Confirm `src/lib/pricing.ts` is the single pricing source and
      `PricingSection.tsx` imports from it (not hardcoded).
- [x] Read `AI_TOOLING.md` for existing AI-tooling boundaries and precedent.
- [x] Read the most recent site-health/AI-visibility audit
      (`reports/2026-08-06-dreamglade-search-ai-visibility-audit.md`) for
      known gaps and any previously-flagged drift.
- [ ] **Andrew/Paul spot-check:** confirm the departure-airport policy
      ("flights after 3 PM") and the six-plant list (including Machinga) are
      still current as of today — both were confirmed consistent in code
      during this session, but the Aug 6 audit shows this exact area (plant
      count) has drifted before, so a quick human confirmation is cheap
      insurance before it's baked into `facts.ts`.

## Validation commands
```bash
npm run build
npm run lint
```
(Confirms the repo is in a buildable, lintable state before starting new
work — no new commands needed for this ticket.)

## Browser checks
None required — inspection only.

## Edge cases
- If Andrew/Paul's spot-check in the last task finds a real drift, stop and
  update `DECISIONS.md` before ticket 2 starts — the facts module must not
  encode a wrong fact.

## Acceptance criteria
- [x] Technical Specification §0 accurately reflects the current repo state.
- [x] All 15 starting facts from the project brief are confirmed present and
      consistent, or any conflict is logged in `DECISIONS.md`.
- [ ] Human spot-check of the two flagged items (departure policy, plant
      list) completed and recorded.

## Out of scope
- Any code change. This ticket only reads and records.
