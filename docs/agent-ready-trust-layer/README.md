# Agent-Ready Trust Layer — how this works

This is a plain-language guide to the system that helps AI assistants
(ChatGPT, Google AI Overviews, Claude, Perplexity, etc.) find and correctly
describe Dreamglade. Written so a non-developer can follow it. For the full
planning history, see `PRD.md`, `TECHNICAL-SPEC.md`, `EPIC.md`,
`DECISIONS.md`, and `OPEN-QUESTIONS.md` in this same folder.

## What this system does

When someone asks an AI assistant about Dreamglade, the AI usually reads the
public website to answer. This project adds a few extra, purpose-built
things for AI systems to read, on top of the normal website:

1. **A facts file** (`src/lib/facts.ts`) — one place in the code listing
   Dreamglade's core public facts (group size, owners, healers, schedule,
   transport policy, safety rules).
2. **`/llms.txt`** — a plain-text page at `dreamglade.com/llms.txt` that
   summarizes those facts and links to the real pages, in a format AI
   systems are designed to read.
3. **Two "clean" Markdown pages** — `dreamglade.com/md/safety-preparation`
   and `dreamglade.com/md/faq`, plain-text mirrors of the two pages most
   important to get right, easier for some AI systems to parse cleanly than
   full HTML.
4. **A consistency checker** (`npm run audit:facts`) — a script that reads
   through the website's code and confirms the facts file and the actual
   page text agree. It's not a person double-checking; it's a tool that
   catches an obvious mismatch before it ships.
5. **An AI-answer audit** — a list of test questions
   (`ai-prompt-audit/prompts.json`) you can manually ask AI systems, plus a
   place to write down what they say, so you can tell over time whether AI
   systems are describing Dreamglade accurately.

## What it cannot guarantee

- It cannot make an AI system recommend Dreamglade, rank it first, or
  mention it at all. That was never the goal — see the PRD's explicit
  non-goal on "ranking first in AI."
- It cannot stop an AI system from being wrong. It can only make the correct
  information easy to find, and give you a way to notice when an AI system
  gets something wrong anyway (the AI-answer audit).
- It cannot detect drift in real time. The consistency checker only runs
  when someone runs it (`npm run audit:facts`) — it is not a live monitor.

## Where facts are maintained

Everything traces back to one file: **`src/lib/facts.ts`**. It's a normal
TypeScript file, but you don't need to be a developer to read it — it's a
list of labeled facts in plain English, like:

```
groupSize: {
  max: 10,
  statement: "Maximum 10 guests per retreat",
  ...
```

Pricing is deliberately **not** in this file — it lives in
`src/lib/pricing.ts` (the same place the pricing shown on the homepage comes
from), so there's only ever one place a price can be wrong.

## How to update a fact

1. Confirm the fact is actually correct and current on the live website
   first — `facts.ts` should always match what's already published, not
   introduce something new.
2. Edit the value in `src/lib/facts.ts`.
3. Run `npm run audit:facts` — if the audit fails, it means the website's
   own page copy disagrees with what you just entered; fix whichever one is
   actually wrong.
4. Run `npm run build` to make sure nothing broke.
5. Deploy as normal (see "Deployment" below).

## How the generated files stay synchronized

`/llms.txt` and `/md/faq` are **generated**, not hand-written — every time
they're requested, the code builds their text fresh from `facts.ts` (and, for
the FAQ, from the same question/answer list the FAQ page uses for its
structured data). `/llms.txt`'s list of Markdown mirrors is itself generated
from `facts.ts`'s `markdownMirrors` list, so adding a third mirror later is a
one-line addition, not a hand-edit of the `/llms.txt` route. This means you
cannot accidentally let these go stale by forgetting to update a second copy
— there is no second copy.

`/md/safety-preparation` is the one exception: its content is hand-written,
in `src/lib/safety-markdown.ts` (a plain TypeScript string, imported by the
route handler like any other code — not a loose file read from disk at
runtime), because the Safety & Preparation page's language is too nuanced to
safely auto-generate. This file is included in the consistency checker's
scope, so if the real Safety & Preparation page changes and this file
doesn't get updated to match, the audit will catch it.

## How to run the consistency audit

```bash
npm run audit:facts   # or: npm run audit (same thing)
```

This prints a pass/fail line for each fact it checks (group size, owners,
healers, ceremony schedule, stay length, plant dietas, transport/airport
policy, pricing references, application process, and medical/safety
disclaimers) and exits with an error if anything looks wrong. Most checks
confirm a fact appears *somewhere* on the site and that known-wrong phrasing
appears *nowhere*; a handful of "page-scoped" checks additionally confirm
specific high-stakes facts (group size, the medical disclaimer, screening
language, arrival-pickup policy, ceremony schedule) appear on their specific
canonical page, not just somewhere. This is regex-based, targeted coverage
of known-important facts and known-wrong phrasings — it is not a general
fact-checker and cannot catch every possible wrong wording. It is a local
command — it is not currently wired into `.github/workflows/ci.yml` (the
repo's one PR-triggered CI check, which currently only runs
`npm run build`); see `DECISIONS.md` for why. Run it by hand before
deploying any change that touches facts or public-page copy.

Two related commands:
```bash
npm run typecheck     # type-checks the scripts/ directory (not covered by npm run build)
npm run smoke-test    # fetches every AI-facing route against a running server and checks status/content-type
```
`npm run smoke-test` needs a server running first (`npm run dev`, or
`npm run build && npm run start`). It's what verifies the `/md/[slug]`
route's edge cases — see "What requires human review" below.

## How to perform the AI-answer audit

This one is manual, on purpose — see
`ai-prompt-audit/results/README.md` for the full walkthrough. Short version:
open `ai-prompt-audit/prompts.json`, ask a few of the questions to an AI
system yourself, and write down what it says in a new dated file under
`ai-prompt-audit/results/`. There's no automation and no API keys involved.

## How to interpret results

- **Consistency audit (`npm run audit:facts`):** every line should say
  `PASS`. A `FAIL` line names exactly which fact and which file disagree —
  read the message, decide whether the code is wrong or the check itself
  needs updating (e.g. because a fact genuinely, intentionally changed), and
  fix accordingly.
- **AI-answer audit:** there's no pass/fail score. Read each AI response
  against that prompt's `expectedFacts` and `watchFor` list in
  `prompts.json`, and use judgment. One AI system giving one imperfect
  answer isn't an emergency; a *pattern* of the same wrong fact across
  multiple systems is worth fixing on the site.

## How to run validation (full checklist)

```bash
npm run lint           # no lint errors
npx tsc --noEmit       # app code type-checks
npm run typecheck      # scripts/ type-checks (separate tsconfig — see DEPLOYMENT-CHECKLIST.md)
npm run audit:facts    # facts and page copy agree
npm run build          # production build succeeds
npm run smoke-test     # route-level check (needs a running server — see above)
```

See `tickets/08-final-qa-deployment.md` and `DEPLOYMENT-CHECKLIST.md` for the
complete pre-deploy checklist, including manual route checks.

## How to roll back this feature

Everything in this project is additive — no existing page, route, or
redirect was removed or changed in a way that affects visitors. To roll
back:

- Remove `src/app/llms.txt/`, `src/app/md/`, `src/lib/facts.ts`,
  `src/lib/safety-markdown.ts`, `scripts/audit-facts.ts`, and
  `scripts/smoke-test-routes.ts` (and the `audit:facts`/`audit`/`typecheck`/
  `smoke-test` lines in `package.json`).
- `src/lib/faq-data.ts` is used by the live FAQ page itself (its structured
  data now reads from this file) — if rolling back, either keep this file or
  restore the FAQ page's previous inline data block from git history.
- A normal `git revert` of the relevant commit(s), or a Vercel rollback to
  the prior deployment, achieves the same result with no data migration.

## What requires human review before deployment

- Anyone changing `src/lib/facts.ts` should confirm the new value is
  actually correct and currently true — the file only reflects what's
  already published; it doesn't decide policy.
- Read `src/lib/safety-markdown.ts` against the live `/safety-preparation`
  page once before deploying any change near it — it's hand-written and the
  audit only catches missing/wrong known phrases, not every possible drift.
- Run `npm run audit:facts`, `npm run typecheck`, `npm run build`, and
  `npm run smoke-test` before every deploy that touches this system.
- After deploying, spot-check `/llms.txt`, `/md/safety-preparation`, and
  `/md/faq` on the live site once (see `DEPLOYMENT-CHECKLIST.md`).
