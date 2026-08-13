# Epic — Agent-Ready Trust Layer (MVP)

See `PRD.md` for why, `TECHNICAL-SPEC.md` for how. This is the ticket
breakdown and dependency order.

## Tickets

| # | Ticket | Depends on | Can start now? |
|---|---|---|---|
| 1 | [Inspect and document existing content architecture](tickets/01-inspect-content-architecture.md) | — | Yes — largely done by this session's Phase 1; ticket formalizes the output |
| 2 | [Create the public facts source of truth](tickets/02-facts-source-of-truth.md) | 1 | After 1 |
| 3 | [Generate and validate /llms.txt](tickets/03-llms-txt.md) | 2 | After 2 |
| 4 | [Add Markdown page mirrors](tickets/04-markdown-mirrors.md) | 2 | After 2; can run parallel to 3 |
| 5 | [Audit and correct factual inconsistencies on public pages](tickets/05-consistency-audit-fix.md) | 2 | After 2; can run parallel to 3/4 |
| 6 | [Create the AI prompt audit fixture and result format](tickets/06-ai-prompt-audit-fixture.md) | 2 | After 2; can run parallel to 3/4/5 |
| 7 | [Add automated tests and documentation](tickets/07-automated-checks-docs.md) | 2, 3, 5 | After 2, 3, 5 land |
| 8 | [Final QA and deployment checklist](tickets/08-final-qa-deployment.md) | 3, 4, 5, 6, 7 | Last |

## Dependency graph (text form)

```
1 (inspect) ──► 2 (facts source of truth) ──┬─► 3 (llms.txt) ──┐
                                             ├─► 4 (markdown)  ├─► 7 (checks+docs) ──► 8 (final QA)
                                             ├─► 5 (audit+fix) ─┘
                                             └─► 6 (prompt fixture) ───────────────────┘
```

Tickets 3, 4, 5, and 6 are independent of each other once ticket 2 lands —
they can be built in any order or in parallel sessions. Ticket 7 needs 3 and 5
specifically (it documents and wires up the llms.txt route and the audit
script). Ticket 8 needs everything.

## Recommended implementation order

1. **Ticket 1** first — it's nearly free (this session already did the
   research; ticket 1 is really "write it down properly" plus a final
   double-check pass).
2. **Ticket 2** next — nothing else can start without the facts module.
3. **Ticket 5** (consistency audit script) before 3/4/6 — running it early,
   even against the *current* site with no llms.txt yet, validates the facts
   module itself and catches any remaining copy drift before new
   AI-facing surfaces get built on top of possibly-wrong assumptions.
4. **Ticket 3** (`/llms.txt`) — the core MVP deliverable; ship this before 4
   and 6 since it's the highest-value, lowest-risk piece.
5. **Ticket 4** (Markdown mirrors) and **Ticket 6** (prompt fixture) — either
   order, both depend only on 2.
6. **Ticket 7** (tests/docs) once 3 and 5 exist to document.
7. **Ticket 8** (final QA) last, always.

## What requires Andrew, Wade, Clarisa, or Paul

Flagged inline in each ticket, summarized here:
- **Paul:** review the exact wording of the `/llms.txt` summary and any
  Markdown mirror of `/safety-preparation` (medical/safety language, his
  usual review scope per existing repo history).
- **Andrew:** approve Option A vs. Option B for Markdown mirrors (Technical
  Specification §4); approve whether the consistency check runs in CI now or
  stays local-only for this iteration; GA4 key-events decision is unrelated to
  this project but was flagged by the Aug 6 audit and sits in the same
  "Andrew, when you have a minute" bucket.
- **Wade / Clarisa:** no direct action needed for MVP scope — flagged only if
  ticket 1's re-verification pass finds anything to confirm about ownership
  history (unlikely; current copy is already consistent and matches what
  they've previously approved per session history).
