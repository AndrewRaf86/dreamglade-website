# Decision Log — Agent-Ready Trust Layer

Chronological. Add an entry whenever a real decision is made or a conflict is
resolved (or deliberately left unresolved with a reason).

## 2026-08-12 — Facts source of truth location and format
**Decision:** `src/lib/facts.ts`, plain typed TS object, following the
existing `src/lib/pricing.ts` convention rather than introducing a new
`src/content/` directory or a JSON/CMS-backed source.
**Why:** repo already has exactly one precedent for "single source of truth
for a fact that must stay consistent across pages" (pricing). Reusing it is
smaller than inventing a new pattern, and keeps the file plain-Node-importable
for the standalone audit script.
**Who:** Andrew (via this planning session) — not yet reviewed by Paul/Wade/Clarisa.

## 2026-08-12 — `/llms.txt` implementation approach
**Decision:** Next.js Route Handler (`src/app/llms.txt/route.ts`) generated
from `facts.ts` + `pricing.ts`, not a static `public/llms.txt` file.
**Why:** matches the existing `robots.ts`/`sitemap.ts` generated-file
convention already in this repo; a static file would be a second place
pricing/facts could drift from the source of truth.
**Who:** Andrew (via this planning session).

## 2026-08-12 — No test framework introduced
**Decision:** consistency audit is a plain Node script
(`scripts/audit-facts.ts`, `node --experimental-strip-types`), not a Vitest/
Jest suite.
**Why:** repo has zero existing test infrastructure; adding a framework for
one script is disproportionate. Matches "avoid unnecessary dependencies" and
"boring, reliable solutions" preferences already established for this repo.
**Who:** Andrew (via this planning session). **Revisit if:** a future ticket
needs assertions complex enough that regex/string matching genuinely can't
express them.

## 2026-08-12 — Historical "five plants" proposal did not ship; six is current
**Context/conflict found:** the 2026-08-06 AI-visibility audit
(`reports/2026-08-06-dreamglade-search-ai-visibility-audit.md`, §3, §14, §15)
described an *uncommitted* local diff that would have removed "Machinga" from
the master-plant list, reducing it from six to five plants, and recommended
shipping it ("DO NOW").
**Current repo state (confirmed 2026-08-12):** `master-plants/page.tsx` and
`faq/page.tsx` both currently and consistently describe **six** master
plants, explicitly including Machinga, and this matches the commit history
(`32ba7a9 Add Master Plants page with all six confirmed plant dietas`).
**Resolution:** treated as **not a live conflict** — the six-plant version is
the current, intentional, shipped state, and it's internally consistent
across both pages that mention it. The audit's proposed change was either
superseded by later research or a different decision was made after that
audit ran. `facts.ts` (ticket 2) should encode **six plants including
Machinga** as current fact, not the audit's proposed five.
**Needs confirmation:** if Andrew/Paul/Wade/Clarisa know why the plant count
went from a proposed "five" back to a shipped "six," a one-line note here
would close this out fully. Not blocking — current live copy is internally
consistent, which is what matters for `facts.ts` accuracy.

## 2026-08-12 — No Paul-approval gate on this implementation
**Decision:** Andrew confirmed Paul does not need to review or approve any
wording produced by this project (llms.txt summary, Markdown mirrors, or
otherwise). The "Needs Paul" review gates originally proposed in
`OPEN-QUESTIONS.md` and tickets 3/4 are removed. Facts must still match the
live site exactly (that's a correctness requirement, not a review-approval
one) — only the human-sign-off step is removed.
**Why:** direct instruction from Andrew during implementation kickoff.
**Who:** Andrew.

## 2026-08-13 — Independent review findings fixed; Markdown mirror architecture finalized
**Decision/Context:** an independent code review of the uncommitted implementation
found two High-severity issues, which are now fixed:
1. `src/app/md/[slug]/route.ts` used a plain object as a slug→content lookup
   table, so requests for inherited `Object.prototype` property names
   (`toString`, `constructor`, `hasOwnProperty`, `__proto__`, `valueOf`)
   returned `200` with garbage content or a `500` instead of a clean `404`.
   Fixed by switching to a real `Map`. Verified with a new zero-dependency
   route smoke test (`scripts/smoke-test-routes.ts`, `npm run smoke-test`)
   that specifically exercises all of these slugs, plus the pre-existing
   `next.config.ts`/routing behavior for `/`, `/faq`, `/safety-preparation`,
   `/apply`, `/llms.txt`, `/robots.txt`, `/sitemap.xml`.
2. `content/markdown/safety-preparation.md` was read via `fs.readFileSync` at
   module scope, with correct Vercel serverless bundling unverified. Resolved
   by removing the loose file entirely and moving its content into
   **`src/lib/safety-markdown.ts`**, exported as a plain TS string constant
   and imported normally by the route handler — this is bundled by the
   ordinary module graph, with no dependency on Next/Vercel output-file
   tracing. `outputFileTracingIncludes` was deliberately not used, per the
   preference for the plain-import solution when it's available (it is).
**FAQ Markdown** continues to generate from `src/lib/faq-data.ts` (unchanged
by this pass) — only the safety-preparation mirror's storage mechanism changed.
**Consistency audit:** `scripts/audit-facts.ts` now scans `src/lib/**`
(previously `content/markdown/`, which no longer exists), so
`safety-markdown.ts` is covered by every existing check, the same as before.
**Who:** Andrew (via independent review + this implementation pass).

## 2026-08-13 — Markdown mirrors centralized in facts.ts
**Decision:** added a typed `FACTS.markdownMirrors` array to `src/lib/facts.ts`
(slug, mirrored page, purpose). `/llms.txt`'s "Markdown mirrors" section now
generates from this array instead of two hardcoded link lines in
`src/app/llms.txt/route.ts`.
**Why:** the independent review flagged this section as the one place in
`/llms.txt` not sourced from `facts.ts`, inconsistent with the rest of the
file. Adding a third mirror in the future now only requires a route entry
plus one array item, not a route.ts edit.
**Who:** Andrew.

## 2026-08-13 — Audit gained page-scoped checks; corpus-wide limitation documented
**Decision:** `scripts/audit-facts.ts` previously only checked whether a fact
appeared *somewhere* in the scanned files ("corpus-wide") — a regression on
one specific page could pass undetected if the correct fact still existed
elsewhere (e.g. group size stated correctly in the FAQ but wrong on the
homepage). Added six **page-scoped** checks that verify a fact against its
specific canonical page (the same page recorded in that fact's `source`
field in `facts.ts`): group size on the homepage, the medical-provider
disclaimer and "no automated screening" language on the safety page,
human-led application language on the apply page, and the arrival-pickup
policy and ceremony schedule on the FAQ page.
**Why:** raised directly by independent review as a real gap between the
script's documented purpose ("checks that facts.ts and the live page copy
agree") and its actual guarantee. The corpus-wide checks are kept (still
useful for catching banned/outdated phrases anywhere and confirming a fact
exists at all) — page-scoped checks are additive, not a replacement.
**Also documented:** the script's header comment and its `cure-claim` check's
inline comment now explicitly state that this is targeted regex coverage,
not a general natural-language fact-checker, and name specific phrasings it
would miss. This is intentional scope, not an oversight — see the "No test
framework introduced" decision above.
**Who:** Andrew.

## 2026-08-13 — `scripts/package.json` is functionally necessary; not removed
**Context:** independent review questioned whether `scripts/package.json`
(`{"type":"module"}`) serves any real purpose beyond silencing a cosmetic
Node warning, since `npm run audit:facts` runs identically with or without
it. Tested by removing it: `node --experimental-strip-types
scripts/audit-facts.ts` did still work (confirming the file has no effect on
the *runtime* script). However, once `npm run typecheck` (`tsc --noEmit -p
scripts/tsconfig.json`) was added this session, removing the file broke it —
TypeScript's `"module": "nodenext"` mode determines ESM vs. CommonJS from
the nearest `package.json`, and without it, `import.meta.url` in
`audit-facts.ts` fails to type-check under CommonJS rules.
**Decision:** kept `scripts/package.json` — it has a genuine functional
purpose for the new `typecheck` script, not just cosmetic. The root
`package.json` was NOT given `"type": "module"` (would affect the whole
project's tooling for no benefit here). One residual, harmless warning
remains: `npm run audit:facts` still prints a `MODULE_TYPELESS_PACKAGE_JSON`
notice for `src/lib/facts.ts` specifically, since that file lives outside
`scripts/`'s package.json boundary. Documented inline in
`scripts/audit-facts.ts`'s header rather than worked around further.
**Who:** Andrew.

## 2026-08-13 — Facts audit stays local/manual; not added to CI
**Decision:** `npm run audit:facts` (and `npm run typecheck`,
`npm run smoke-test`) remain local/manual commands, documented in
`README.md` and `DEPLOYMENT-CHECKLIST.md`, not wired into `.github/workflows/ci.yml`.
**Why:** while implementing this feature on a local `main` that turned out to
be one commit behind `origin/main`, this decision was originally recorded as
"the repo has no conventional CI pipeline at all." That was **inaccurate** —
`origin/main` already has `.github/workflows/ci.yml` (PR-triggered, runs
`npm run build` on every PR to `main`), added in a commit
(`446a59b`) that predates this branch but wasn't in the local checkout this
work started from. Correcting the record here: a real, PR-triggered CI
pipeline does exist; it currently only runs `npm run build`. The decision to
**not** add `audit:facts`/`typecheck`/`smoke-test` to it stands, but for a
different reason than originally written: doing so is a small, reasonable
follow-up (not "building CI from scratch"), just out of scope for this PR —
it touches shared CI config that deserves its own explicit request rather
than being bundled into this feature. The separate `site-health-report`
gh-aw workflow remains manual-dispatch-only, unrelated to `ci.yml`. Closes
`OPEN-QUESTIONS.md` item 2.
**Who:** Andrew.

## 2026-08-13 — `/llms-full.txt` deferred
**Decision:** not building `/llms-full.txt` for this MVP.
**Why:** the site has 7 pages; `/llms.txt` with accurate summaries plus two
Markdown mirrors is within the llms.txt convention's intended scope at this
scale. Revisit only if a future AI-answer audit round (see
`ai-prompt-audit/`) shows AI systems need full page text inline rather than
summaries + links. Closes `OPEN-QUESTIONS.md` item 3.
**Who:** Andrew.

## 2026-08-13 — Human review still required before production, despite no Paul gate
**Decision:** the earlier "No Paul-approval gate" decision (2026-08-12, above)
removes the *approval* requirement, not verification. Before this ships to
production, Andrew should still personally read `src/lib/facts.ts` in full
and `src/lib/safety-markdown.ts` against the live `/safety-preparation` page
once, the same way any other content change to this repo would get a final
look before deploy. This is a lightweight self-check, not a sign-off gate
blocking a specific person's calendar.
**Who:** Andrew.

## 2026-08-27 — Plant count remains a live unresolved conflict
**Context/conflict found:** the 2026-08-12 entry above treated the historical
five-plant proposal as no longer live. A fresh GitHub inspection found that
PR #15 (`content/five-plants-pricing-disclaimer`, commit `2aeaba2`) is still
open. It removes Machinga and changes six plants to five, while current
`main`, production, `facts.ts`, the FAQ JSON-LD/Markdown mirror, and
`/llms.txt` all publish six. PR #15 has no human reviews, is ten commits
behind `main`, conflicts with `main`, and provides no cited owner or operator
confirmation for the five-plant claim. Conversely, the July 27 commit that
introduced six calls them "confirmed" but does not preserve the underlying
human-source evidence.

**Decision:** classify five versus six as **UNRESOLVED** pending confirmation
from Paul, Wade, or Clarisa. Do not merge or reproduce PR #15's five-plant
claim. Preserve the current approved production value (six) and its existing
audit coverage until a human confirms a change; this is preservation of the
published state, not a conclusion that the disputed business fact has been
re-proven. If the answer is five, update `facts.ts`, all visible surfaces,
FAQ structured data/Markdown, `/llms.txt`, and the audit together.

**Who:** requires Paul, Wade, or Clarisa confirmation.

## 2026-08-27 — Paul is the human hosting decision layer, not a medical decision-maker
**Decision / Context:** the safety page and its Markdown mirror said that a
decision about medication or a medical condition must come from Paul together
with a healthcare professional. That wording incorrectly assigned Paul a role
in medical decisions. It now states that medication, diagnosis, and medical-
care decisions belong to the guest and their qualified healthcare
professional. Paul's personal review is a human hosting decision only, not a
medical opinion, medical clearance, or guarantee of suitability or safety.
Static FAQ answers that previously answered individual safety/eligibility
questions with "Yes" now return the same human-review boundary.

**Why:** Dreamglade may explain its human-led intake process, but its software
must not decide eligibility, provide individualized medical advice, or present
Paul as a medical authority.

**Who:** direct mission constitution supplied by Andrew.

## 2026-08-27 — Website availability is never a guarantee
**Decision:** availability cards describe published inquiry windows and use
"Verify with Paul" instead of "Available" or "Limited availability." The
elapsed July 27–August 22, 2026 window was removed on August 27, 2026. A stable
policy in `facts.ts` states that only Paul confirms dates and spaces; specific
windows remain volatile and are not copied into AI summaries.

**Why:** the prior production page labelled an already-ended window
"Available," and the website must never guarantee a date or space.

**Who:** direct mission constitution supplied by Andrew; current date verified
in the run environment.

## 2026-08-27 — Human confirmation resolves plant count and healer biography
**Decision / Context:** Andrew explicitly confirmed that Dreamglade currently
offers **five** master plant dietas and that Machinga is not currently offered.
He also approved the Dominga/Raúl biography details from PR #15: they are a
married Shipibo ceremonial couple from Vista Alegre, upriver from Pucallpa,
and have shared more than 40 years of life, family, and service to their
community. This supersedes the unresolved classification recorded earlier on
2026-08-27 and the older six-plant decision from 2026-08-12.

**Implementation:** `facts.ts` is the canonical source. Visible plant pages,
FAQ copy, FAQPage JSON-LD, `/llms.txt`, `/md/faq`, the AI-answer fixture, and
the fact audit must all derive from or agree with the five-plant list. Machinga
may remain in historical decision/run documentation only, not in current
public or AI-facing source.

**Who:** Andrew, by direct human authorization.

## Template for new entries
```
## YYYY-MM-DD — <short title>
**Decision / Context:** ...
**Why:** ...
**Who:** ...
```
