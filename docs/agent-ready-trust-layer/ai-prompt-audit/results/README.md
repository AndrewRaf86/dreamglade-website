# AI-answer audit — how to run and record results

This is a **manual, human-run** process. Nothing here queries an AI system
automatically or on a schedule — that's intentional (see
`docs/agent-ready-trust-layer/PRD.md` §4 and `TECHNICAL-SPEC.md` §6). You,
not a script, ask the questions and read the answers.

## How to run an audit round

1. Open `../prompts.json`.
2. For each prompt (or a chosen subset — you don't have to run all of them
   every time), ask it to an AI system (Google AI Overview, ChatGPT, Claude,
   Perplexity, etc.) in a fresh/new chat, with web search enabled where the
   platform supports it.
3. Read the answer against that prompt's `expectedFacts` and `watchFor`
   lists.
4. Judge accuracy by fact, not by exact wording — AI phrasing varies; what
   matters is whether the substance is correct.
5. Record what you found in a new dated file in this folder (see format
   below).

## What to measure per response

- **Factual accuracy** — does it match `expectedFacts`?
- **First-party citation** — did it cite dreamglade.com (or a specific
  Dreamglade page) as a source?
- **Outdated information** — does it repeat something no longer true?
- **Invented prices or availability** — did it state a specific price or
  date Dreamglade hasn't published, or that contradicts the live site?
- **Staff/healer accuracy** — correct names, correct roles?
- **Safety-language fidelity** — does it preserve (not soften or drop) the
  screening/disclosure/medical-disclaimer facts?
- **Application handoff** — does it correctly describe the human-led,
  email-based process, not something automated?
- **Unsupported superlatives** — does it (or does Dreamglade's own content,
  if quoted) claim "safest," "best," or "medically approved" without
  support? Flag this even if it's the AI system's own editorializing, not
  something Dreamglade said.

## Result file format

Create `YYYY-MM-DD.md` in this folder. Match the table shape already used in
`reports/2026-08-06-dreamglade-search-ai-visibility-audit.md` §10, so results
stay comparable across rounds:

```markdown
# AI-answer audit — YYYY-MM-DD

| Prompt ID | Platform | Appeared / cited? | Accuracy notes | Issues found |
|---|---|---|---|---|
| safety-screening | Google AI Overview | No | — | Dreamglade not cited for this intent (matches known historical gap) |
| facts-overview | ChatGPT (web search) | Yes | Correct owners, correct group size | None |

## Summary
One or two sentences: anything that needs a content fix, and anything that's
fine as-is.

## Follow-ups
Anything to feed back into `src/lib/facts.ts`, `/llms.txt`, or a Markdown
mirror, if the audit found a real gap — not a ranking complaint.
```

## What this audit is not

- Not automated, not scheduled, not wired to any API or credentials.
- Not a tool for improving AI *rankings* — see `PRD.md`'s explicit
  non-goal ("rank first in AI" is not a success metric).
- Not a substitute for the factual consistency check
  (`npm run audit:facts`), which checks the website itself, not what AI
  systems say about it.
