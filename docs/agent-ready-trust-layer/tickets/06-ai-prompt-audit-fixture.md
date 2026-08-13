# Ticket 6 — Create the AI prompt audit fixture and result format

**Status: ✅ Complete.** `prompts.json` (11 prompts across all 7 requested
categories), `results/README.md`, and `results/EXAMPLE.md` template. No live
AI systems queried — not automated, no credentials used, per implementation
instructions.

## Objective
Commit a small, versioned set of test prompts (and a place to log results)
that formalizes the manual process the Aug 6 audit already used.

## Why it matters
Without a fixture, verifying "does AI describe Dreamglade correctly" stays a
one-off manual exercise that depends on someone remembering to do it and
which prompts to use. This makes it repeatable and comparable over time.

## Files likely to change
- `docs/agent-ready-trust-layer/ai-prompt-audit/prompts.json` (new)
- `docs/agent-ready-trust-layer/ai-prompt-audit/results/README.md` (new —
  explains the result-recording format)

## Dependencies
Ticket 2 (prompts' `expectedFacts` should reference real values from
`facts.ts`, not be invented independently).

## Implementation tasks
- [ ] Create `prompts.json` per the schema in `TECHNICAL-SPEC.md` §6, with at
      minimum one prompt per category: facts (group size, staff, pricing),
      safety (screening, medication disclosure), and citation (does the AI
      cite dreamglade.com at all for a relevant query).
- [ ] Include the exact safety/preparation-intent prompt the Aug 6 audit used
      ("is an ayahuasca retreat in Peru safe what should I prepare") as a
      standing regression prompt, since that's the one confirmed gap.
- [ ] Write `results/README.md` describing the expected format for a dated
      result file (mirroring the structure of
      `reports/2026-08-06-dreamglade-search-ai-visibility-audit.md`'s §10
      table: platform, prompt, appeared?, how described, source cited).
- [ ] Do **not** run the prompts against live AI systems as part of this
      ticket unless doing so manually and recording one real result is useful
      to prove the fixture works end-to-end — if so, keep it to 1-2 prompts,
      manual, human-triggered, matching the existing audit's own boundaries
      (no scraping, no automation, no posting anywhere).

## Validation commands
```bash
cat docs/agent-ready-trust-layer/ai-prompt-audit/prompts.json | node -e "JSON.parse(require('fs').readFileSync(0,'utf8'))"
```
(Confirms the fixture is valid JSON — no other automated validation applies,
since this ticket doesn't add code.)

## Browser checks
None required, unless the optional manual test run in the implementation
tasks is performed — in that case, follow the same browser-based verification
approach as the Aug 6 audit (manual queries in Google/ChatGPT/Claude,
recorded by hand, no automation).

## Edge cases
- Keep `expectedFacts` phrased as facts to check for, not exact strings an AI
  must repeat verbatim — AI phrasing varies; the fixture should support human
  judgment on "does this response reflect the fact," not exact-string
  matching.

## Acceptance criteria
- [ ] `prompts.json` exists, is valid JSON, and covers facts/safety/citation
      categories.
- [ ] `results/README.md` defines a clear, reusable result format.
- [ ] No automated or scheduled execution against third-party AI systems was
      added.

## Out of scope
- Any automated pipeline that queries AI systems programmatically (API
  credentials, scraping, or otherwise) — this is a human-run fixture, not a
  service.
