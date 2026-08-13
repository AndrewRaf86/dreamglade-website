# PRD — Agent-Ready Trust Layer (MVP)

**Status:** Draft for review
**Owner:** Andrew (eng) · Paul / Wade / Clarisa (fact approval)
**Repo:** dreamglade-website (Next.js 16 App Router, Vercel)

## 1. Problem statement

AI systems (Google AI Overviews, ChatGPT, Claude, Perplexity, etc.) already describe
Dreamglade to prospective guests, and mostly do so accurately — the
[2026-08-06 AI-visibility audit](../../reports/2026-08-06-dreamglade-search-ai-visibility-audit.md)
confirmed this directly. But there is no dedicated, machine-readable layer that tells
an AI system *"here are the facts, here is where to verify them, here is what we do
not do."* Today AI systems infer everything by crawling and interpreting normal HTML
pages. That works well now, but it is fragile: it depends on an AI correctly parsing
marketing copy, and it gives Dreamglade no direct way to correct a wrong citation
(the same audit found one real gap — Google's AI Overview didn't cite Dreamglade at
all for a safety/preparation-intent query, citing the U.S. Embassy, WebMD, and two
competitors instead).

Because Dreamglade's core value proposition is trust and safety (small group,
personal review by Paul, no automated screening, careful medication disclosure),
factual accuracy in AI-generated answers is not a nice-to-have SEO tactic — it is
part of guest safety. A prospective guest who is told the wrong ceremony schedule,
the wrong group size, or an incorrect medication policy by an AI assistant is a
safety and trust problem, not just a marketing one.

## 2. User and business context

- **Who benefits:** prospective guests researching Dreamglade through AI assistants
  before ever reaching the website directly; Paul, Wade, and Clarisa, whose personal,
  high-touch review process depends on applicants arriving with accurate
  expectations already set.
- **Business context:** small, owner-operated retreat (Wade Bucher & Clarisa
  Gutierrez), no marketing team, no dev team beyond Andrew working session-by-session
  with Claude Code. The site already has strong, consistent factual copy (verified in
  Phase 1 inspection — see Technical Specification §1) and an existing single-source-
  of-truth pattern for pricing (`src/lib/pricing.ts`). This project extends that
  existing discipline rather than inventing a new one.
- **Why now:** GA4 already shows real ChatGPT-referred traffic (48 users / 28 days),
  and the Aug 6 audit found a live, specific AI-citation gap. The infrastructure to
  fix and prevent this class of problem doesn't exist yet.

## 3. What the system will do

1. **Public facts source of truth** — a single typed data module holding the
   verified public facts about Dreamglade (group size, owners, healers, schedule,
   pricing reference, transport policy, disclosure requirements, medical-provider
   disclaimer). Existing pages and any new AI-facing surface both read from it.
2. **Root-level `/llms.txt`** — a machine-readable summary following the llms.txt
   convention: what Dreamglade is, key facts, links to the canonical pages AI
   systems should cite (home, safety-preparation, faq, what-to-expect,
   master-plants, terms-and-conditions).
3. **Optional clean Markdown mirrors** of the highest-value pages for AI citation
   (safety-preparation and faq, at minimum), generated from the same content the
   HTML pages render, not hand-duplicated.
4. **A consistency audit** — an automated, repeatable check that the facts source
   of truth and the live page copy agree, so drift is caught before it ships (the
   Aug 6 audit found one drifted, uncommitted local fix already — this replaces
   manual point-in-time audits with something repeatable).
5. **A starter AI prompt audit set** — a small, versioned fixture of realistic
   prompts (the same kind used in the Aug 6 audit) plus a place to record what AI
   systems say in response, so accuracy can be checked over time without a full
   manual audit each time.
6. **Automated validation and documentation** — build/lint/test hooks and docs so
   this stays correct as the site changes, without needing a person to remember to
   re-check it.

## 4. What the system will explicitly NOT do (MVP)

- No chatbot, on-site AI assistant, or conversational interface for guests.
- No automated booking, calendar-locking, or payment flow.
- No automated medical or psychological screening of any kind. Paul's manual,
  personal review of every inquiry is a stated safety feature, not a gap to
  automate away.
- No paid x402 API, pay-per-crawl monetization, or machine-payment integration.
- No automated guest communication (email, SMS, WhatsApp) of any kind.
- No attempt to manipulate AI rankings, "rank first in AI," astroturf reviews, or
  post to Reddit/forums. (Explicitly out of scope, per the Aug 6 audit's own
  boundary and per `AI_TOOLING.md`'s existing "no customer-facing automation"
  principle.)

## 5. MVP scope

In scope, this iteration:
- `src/lib/facts.ts` (or equivalent) as the single facts source of truth.
- `/llms.txt` served at the site root, generated from the facts module.
- Markdown mirrors for at least `/safety-preparation` and `/faq` (highest-value,
  currently-uncited pages per the Aug 6 audit's Test #2 finding).
- A repeatable facts-consistency check runnable locally and (manually, matching the
  existing gh-aw pattern) in CI.
- A versioned AI-prompt-audit fixture (prompts + a place to log results) covering
  group size, pricing, staff, safety/screening policy, and citation accuracy.
- Documentation of all of the above, following existing repo conventions
  (`docs/`, `AI_TOOLING.md`-style transparency).

Explicitly out of scope for this iteration (candidates for a later pass):
- `/llms-full.txt` (full concatenated site content) — the site is 7 pages;
  `/llms.txt` with good page summaries is sufficient at this scale.
- Markdown mirrors for every page (start with the two highest-value pages;
  expand only if the audit shows AI systems need more).
- Any scheduled/automated re-run of the AI-prompt audit (the audit is a fixture +
  manual process for now, not a cron job — matches the "no unattended actions"
  rule already established for this repo).
- Structured-data (JSON-LD) changes beyond what already exists, unless the
  consistency audit finds a real mismatch.

## 6. Success metrics

- `GET /llms.txt` returns `200` with `Content-Type: text/plain` (or
  `text/markdown`) at the production root, verified after every deploy.
- `/llms.txt` links only to real, live, canonical Dreamglade pages (no 404s, no
  redirect chains).
- The facts-consistency check passes on `main` (zero drift between
  `src/lib/facts.ts` and live page copy for every fact it covers).
- Safety language (medical disclaimers, "not a medical provider," disclosure
  requirements) is present and unweakened everywhere it currently appears —
  verified by the consistency check, not by memory.
- The AI-prompt audit fixture can be run against at least one AI system and
  correctly identifies at least one intentionally-seeded wrong answer during
  testing (proves the audit process actually catches errors, not just that it
  runs).
- `npm run build`, `npm run lint`, and the new facts-consistency check all pass
  on `main` before and after this work ships.
- No private guest, application, health, or payment data appears in `/llms.txt`,
  any Markdown mirror, or any committed audit fixture.

Explicitly not a metric: search ranking position, "AI visibility score," or any
proxy for "ranking first" in AI answers. Accuracy and citability are the goal;
ranking is not something this system controls or should try to game.

## 7. User stories

- As a prospective guest asking ChatGPT or Google "is Dreamglade safe, what
  should I prepare," I want the AI to find and cite Dreamglade's own safety page
  with accurate information, so I arrive with correct expectations instead of
  generic embassy/WebMD advice.
- As Paul, I want the facts an AI system repeats about screening and medical
  disclosure to never be softer or different than what I actually require, so
  guests don't arrive under-prepared or surprised.
- As Andrew, I want a single place to update a fact (e.g. a pricing change) and
  have confidence the whole site — including the AI-facing surface — stays
  consistent, instead of grepping six files by hand.
- As Wade or Clarisa, I want to know if an AI system is describing Dreamglade
  inaccurately (e.g. wrong owner names, wrong group size) before a guest brings
  it up, not after.

## 8. Acceptance criteria (MVP-level, ticket-level detail lives in `tickets/`)

- [ ] `src/lib/facts.ts` exists, is typed, and is the single import source for
      every fact it covers, used by at least `/llms.txt` generation.
- [ ] `/llms.txt` is live at the production root and passes a manual fetch check.
- [ ] At least two Markdown mirrors exist and are linked from `/llms.txt`.
- [ ] The facts-consistency check is runnable via an npm script, documented, and
      passes clean on `main`.
- [ ] The AI-prompt audit fixture exists as a committed file with a defined
      result-recording format (see Technical Specification §6).
- [ ] `npm run build`, `npm run lint`, and the consistency check all pass.
- [ ] No conflicting facts were shipped without being flagged in the Decision Log
      (`DECISIONS.md`) or Open Questions (`OPEN-QUESTIONS.md`).

## 9. Known risks

- **Drift risk (the core risk this project exists to reduce):** even with a facts
  module and a consistency check, someone could still hand-edit page copy without
  running the check. Mitigation: keep the check fast and cheap enough to run
  habitually, and document it clearly in `AI_TOOLING.md`-style docs.
- **False precision risk:** `/llms.txt` could imply more certainty than Dreamglade
  actually has on ambiguous items (e.g. departure transport policy has a specific
  cutoff time — 3 PM — that must be quoted exactly, not paraphrased loosely).
  Mitigation: facts module stores exact current wording/values, not summaries.
- **Reputation-adjacent content risk:** the Aug 6 audit surfaced a public Reddit
  thread about an ownership transition and a small number of critical reviews.
  This MVP does not touch reputation management, but `/llms.txt` and any
  Markdown mirror must not overstate or contradict what's publicly verifiable.
  Mitigation: keep facts module strictly to Dreamglade's own verified public
  claims; do not attempt to pre-empt or rebut third-party commentary.
- **Stale pricing risk:** pricing already lives in `src/lib/pricing.ts` and is
  partly dynamic (live PEN exchange rate). `/llms.txt` must reference the USD
  source values (stable) and link to the live pricing page for current PEN
  figures, not hardcode a snapshot that goes stale.
- **Scope creep risk:** "agent-ready" is a broad, trendy phrase. Mitigation: this
  PRD's §4 (explicit non-goals) is binding; any ticket that drifts toward
  chatbot/booking/automated-screening territory should be rejected or escalated,
  not built.

## 10. Open decisions

See `OPEN-QUESTIONS.md` for the full list. Headline items:
- Exact wording/scope of the `/llms.txt` summary paragraph (needs a human voice
  check, ideally Paul's, since it represents Dreamglade in a new surface).
- Whether Markdown mirrors are generated from a shared content module (more
  robust, more refactor) or hand-authored and covered by the consistency check
  instead (faster to ship, slightly higher drift risk) — see Technical
  Specification §4 for the trade-off and Andrew's call.
- Whether the facts-consistency check should be wired into CI now or stay a
  local/manual command for this iteration (gh-aw's existing `site-health-report`
  is manual-dispatch-only by design; this may want to follow the same pattern).
