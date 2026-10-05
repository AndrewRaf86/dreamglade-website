# Change / outcome ledger

Purpose: record **what we changed, why, what we expected, and what actually
happened** — so recommendations get checked against results instead of piling up.
The key habit: **write the hypothesis and baseline *before* the outcome is known.**

## When to add an entry
Any significant SEO, AI-visibility, content, CTA, UX, performance, or measurement
change — and any engineering/security fix worth being able to point back to.

## Fields
| Field | Meaning |
|---|---|
| `CHANGE_ID` | `DG-YYYY-NNN`, never reused |
| `DATE` | Date the change went live (or `PROPOSED`) |
| `CHANGE` | One sentence: what changed (link the PR) |
| `CATEGORY` | `engineering`, `security`, `content-integrity`, `seo`, `ai-visibility`, `cta`, `ux`, `performance`, `measurement` |
| `HYPOTHESIS` | "If we X then Y" |
| `WHY` | Evidence that motivated it |
| `BASELINE` | Measured value *before*, with source and date. Say `UNKNOWN (needs <source>)` rather than guessing |
| `EXPECTED_OUTCOME` | What should be true afterward, stated so it can be checked |
| `PRIMARY_METRIC` | The one metric that decides the result |
| `SECONDARY_METRIC` | Supporting metric (optional) |
| `MEASUREMENT_WINDOW` | How long we wait (e.g. `28 days`, or `continuous (daily)`) |
| `7_DAY_RESULT` / `28_DAY_RESULT` | Measured values at those checkpoints |
| `ACTUAL_RESULT` | Final measured value |
| `STATUS` | `SUPPORTED`, `UNSUPPORTED`, or `INCONCLUSIVE` (see below) |
| `NOTES` | Caveats, confounders, follow-ups |

## Statuses
- **SUPPORTED** — the primary metric moved as expected (or the check passes) and nothing contradicts it.
- **UNSUPPORTED** — the metric did not move, or moved the wrong way.
- **INCONCLUSIVE** — not enough data, too many confounders, or the metric can't be measured yet.
- `PENDING` is *not* a verdict: it only means the measurement window is still open.

## Rules
- **Do not force a marketing hypothesis onto an engineering fix.** A bug fix or
  security patch has an engineering expectation and a deterministic check
  (e.g. `AVAILABILITY_DATE_FRESHNESS` stays PASS; `npm audit --omit=dev` stays clean).
- Small traffic means small samples. Mark results `INCONCLUSIVE` rather than
  over-reading a handful of sessions, and never claim an AI-visibility change
  from a single run (AI answers vary; see `docs/ai-visibility/`).
- Baselines that need an external account (Search Console, GA4) must be captured
  *before* the change ships, by a person with access.
- No private applicant data in this file, ever.
