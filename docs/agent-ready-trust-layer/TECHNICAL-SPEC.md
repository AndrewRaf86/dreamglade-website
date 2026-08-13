# Technical Specification — Agent-Ready Trust Layer (MVP)

Companion to `PRD.md`. Covers how, not why.

## 0. Constraints from Phase 1 inspection

- **Stack:** Next.js 16.2.6 (App Router), React 19.2.4, TypeScript, Tailwind (via
  PostCSS plugin), ESLint 9. No test framework installed. No database — the site is
  static/content-driven with one dynamic bit (live PEN exchange rate in
  `src/lib/pricing.ts`, revalidated hourly).
- **Package manager:** npm (`package-lock.json` present).
- **Commands:** `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
  No `test` script exists.
- **Routes today (7, all in `src/app/`):** `/`, `/faq`, `/master-plants`,
  `/safety-preparation`, `/terms-and-conditions`, `/what-to-expect`, `/apply`.
  `robots.ts` and `sitemap.ts` already use Next's native `MetadataRoute`
  convention — no static `public/robots.txt`.
- **Existing single-source-of-truth precedent:** `src/lib/pricing.ts` exports
  `USD_PRICES` (communal $200 / two-person tambo $210 / single $220, per person
  per day) and `getPricing()`, consumed by `PricingSection.tsx`. This is the
  pattern to extend, not replace.
- **No chatbot, booking system, automated screening, or guest-communication
  automation exists anywhere in `src/` today** (confirmed by repo-wide search).
  `TermsGateCTA.tsx` gates the "Begin Your Application" CTA behind a Terms &
  Conditions checkbox, then opens a `mailto:booking@dreamglade.com` link — fully
  manual, matches PRD §4.
- **Analytics:** GA4 (env-var-gated `gtag.js`) + Vercel Analytics, both wired in
  `layout.tsx`, event tracking via `src/lib/analytics.ts` / `TrackedLink.tsx`.
  No changes needed for this project, but new AI-facing surfaces (llms.txt,
  markdown mirrors) are **not** page views and won't appear in GA4 by default —
  see §7.
- **Deployment:** Vercel, project `dreamglade-website`, production domain
  `dreamglade.com`. No preview-vs-prod gating beyond normal Vercel PR previews.
- **Existing dev tooling (from `AI_TOOLING.md`, all developer-facing only):**
  OpenSpec (scaffolded, unused so far — `openspec/config.yaml` has no project
  context filled in), Hallmark (design-QA, audit-only), Codex review plugin,
  and a **manual-dispatch-only, read-only** `gh-aw` site-health-report workflow
  that already greps for medical/cure-claim language on `npm run build`. This
  project's consistency check is a natural sibling to that workflow, not a
  replacement.

## 1. Facts source of truth

**Location:** `src/lib/facts.ts` — same directory as `pricing.ts` and
`analytics.ts`, following the repo's existing convention for shared data
modules.

**Format:** a single typed, plain-TypeScript `const` object (no JSX, no
Next.js-specific imports), so it can be imported both by the Next.js app *and*
by a standalone Node script (see §5) without any bundler.

```ts
// src/lib/facts.ts
export const FACTS = {
  name: "Dreamglade",
  location: {
    summary: "Near Moralillo, under an hour's drive from Iquitos, Peru",
    hectares: 25,
  },
  groupSize: {
    max: 10,
    statement: "Maximum 10 guests",
  },
  ownership: {
    founder: "Stacy Povey",
    foundedYear: 2013,
    owners: ["Wade Bucher", "Clarisa Gutierrez"],
    transitionYear: 2023,
  },
  healers: {
    names: ["Maestra Dominga", "Maestro Raúl"],
    tradition: "Shipibo",
  },
  screening: {
    reviewer: "Paul",
    automated: false,
    statement: "Paul reviews every inquiry personally. There is no automated screening.",
  },
  ceremonies: {
    days: ["Monday", "Wednesday", "Friday"],
    minStayNights: 5,
    minStayCeremonies: 3,
    maxStayWeeks: 2,
    maxStayCeremonies: 6,
  },
  transport: {
    guestArranges: "own travel to Iquitos",
    pickup: "Group transport departs the designated Iquitos city meeting point at 1 PM on the first retreat day",
    arrivalAirportPickup: false,
    departureAirportDropoff: {
      included: true,
      condition: "flights departing after 3 PM on the last day",
    },
  },
  healthDisclosure: {
    required: true,
    categories: ["medications", "supplements", "physical health history", "mental health history", "substance use"],
  },
  medicalDisclaimer: "Dreamglade is not a medical provider and does not provide medical treatment, therapy, detox, cures, or medical clearance.",
  pricingRef: "see src/lib/pricing.ts USD_PRICES for current per-person-per-day rates",
  canonicalPages: [
    { path: "/", purpose: "Overview, pricing, availability" },
    { path: "/safety-preparation", purpose: "Screening, medication disclosure, preparation" },
    { path: "/what-to-expect", purpose: "Daily rhythm, logistics" },
    { path: "/master-plants", purpose: "Plant dieta descriptions" },
    { path: "/faq", purpose: "Structured Q&A, also emitted as FAQPage JSON-LD" },
    { path: "/terms-and-conditions", purpose: "Binding terms (signed at Stage 2, not on this page)" },
  ],
} as const;
```

Notes:
- Pricing stays in `pricing.ts` (it has a live network dependency the facts
  module shouldn't have); `facts.ts` only references it, doesn't duplicate the
  numbers, to avoid a second place for pricing to drift.
- `as const` gives literal types for free, useful for the consistency check.
- This does **not** require refactoring existing page copy to import from
  `facts.ts` — pages keep their natural prose. `facts.ts` is the *reference*
  the consistency check compares prose against, and the *source* `/llms.txt`
  generates from. See §4 for why full extraction is out of scope.

## 2. `/llms.txt` generation

**Convention:** [llmstxt.org](https://llmstxt.org) — H1 site name, one-line
blockquote summary, then H2-grouped Markdown links to canonical pages with a
one-line description each.

**Implementation — Next.js Route Handler**, mirroring how `sitemap.ts` and
`robots.ts` already work (both are generated, not static files):

```
src/app/llms.txt/route.ts
```

```ts
import { FACTS } from "@/lib/facts";
import { getPricing } from "@/lib/pricing";

export async function GET() {
  const { usd } = await getPricing();
  const body = `# ${FACTS.name}

> ${FACTS.groupSize.statement}. ${FACTS.healers.tradition}-led ayahuasca and
plant dieta retreat near Iquitos, Peru, owned and managed by
${FACTS.ownership.owners.join(" & ")}. ${FACTS.screening.statement}

## Key facts

- Group size: max ${FACTS.groupSize.max} guests
- Ceremonies: ${FACTS.ceremonies.days.join(", ")}
- Stay length: ${FACTS.ceremonies.minStayNights} nights (${FACTS.ceremonies.minStayCeremonies} ceremonies) up to ${FACTS.ceremonies.maxStayWeeks} weeks (${FACTS.ceremonies.maxStayCeremonies} ceremonies)
- Pricing: from $${usd.communal}/person/day (communal tambo) — see /#pricing for current rates
- Screening: manual, by Paul. No automated screening.
- Medical: ${FACTS.medicalDisclaimer}

## Pages

${FACTS.canonicalPages.map(p => `- [${p.path}](https://dreamglade.com${p.path}): ${p.purpose}`).join("\n")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

This runs at request time by default; add `export const revalidate = 3600` (or
`dynamic = "force-static"` if the live pricing fetch is dropped from this file)
if request-time cost becomes a concern — not needed at this traffic level.

**Why a Route Handler, not a static `public/llms.txt` file:** a static file
is simpler but becomes a second place pricing/facts can drift from `facts.ts`.
Generating it — like `sitemap.ts`/`robots.ts` already do — keeps one source of
truth. This is the "smallest solution that still can't drift," not the
smallest file count.

**`/llms-full.txt`:** not needed for MVP. The site has 7 pages; a well-written
`/llms.txt` with accurate summaries is within the convention's intended scope.
Revisit only if an AI-audit result shows systems need full page text inline.

## 3. Route/content conflict check

`/llms.txt` as a literal folder-with-dot name is valid in Next.js App Router
(same mechanism Next uses internally for `/robots.txt` and `/sitemap.xml`
generation) — verified against Next's file-convention docs pattern used by
this repo's own `robots.ts`/`sitemap.ts`. No existing route or redirect in
`next.config.ts` touches `/llms.txt` (confirmed: 95 redirect rules audited,
zero matches for "llms").

## 4. Markdown page mirrors

**As implemented (2026-08-13):** Option A for `/safety-preparation`, Option B
for `/faq` — as recommended below — with one change from the original plan:
Option A's content lives in **`src/lib/safety-markdown.ts`** (a plain TS
string export, imported normally) instead of a loose
`content/markdown/safety-preparation.md` file read via `fs.readFileSync`.
Independent review flagged the loose-file approach's Vercel serverless
bundling as unverified and risky (a module-scope `readFileSync` failure
would break both Markdown routes, not just the affected one); moving the
content into an importable module removes the risk entirely rather than
mitigating it. See `DECISIONS.md`, 2026-08-13.

**Original decision needed (see `OPEN-QUESTIONS.md`, now resolved):** two
viable approaches were considered.

**Option A — hand-authored Markdown, covered by the consistency check.**
Write `content/markdown/safety-preparation.md` and `faq.md` by hand (or have
Claude draft them from the current page copy), commit them, and add them to
the consistency check's scope (§5) so drift between the `.md` file and the
live page is caught, not silently tolerated. Serve via:

```
src/app/md/[slug]/route.ts
```

reading the matching file from `content/markdown/` and returning it as
`text/markdown`. Simple, ships fast, zero refactor of existing pages.

**Option B — generate from a shared content module.**
Extract the prose paragraphs that matter (safety copy, FAQ answers) into a
data module both the `.tsx` page and the Markdown route import, guaranteeing
byte-for-byte parity. More robust, meaningfully larger refactor of
`safety-preparation/page.tsx` and `faq/page.tsx` (FAQ content is already
semi-structured as a JS array for the JSON-LD block — see
`src/app/faq/page.tsx`'s existing `faqData`-style array, which is good news:
FAQ is closer to Option B already than Safety & Preparation is).

**Recommendation:** Option A for `/safety-preparation` (prose-heavy, low
refactor appetite), Option B for `/faq` (already structured, refactor is
small — likely just importing the existing JSON-LD array instead of adding a
new file). Ticket 4 should implement per-page as appropriate rather than
forcing one pattern site-wide. Final call is Andrew's — flagged in
`OPEN-QUESTIONS.md`.

## 5. Consistency audit

**As implemented (2026-08-13):** the checks below shipped largely as
described, scanning `src/app/**`, `src/components/**`, and `src/lib/**`
(widened from just `src/app` so `src/lib/safety-markdown.ts` is covered).
Independent review found the original design — "does this fact appear
*somewhere*?" — would miss a regression on one specific page if the fact
happened to survive elsewhere in the corpus. Added a second tier of
**page-scoped checks** (group size on the homepage; medical disclaimer and
"no automated screening" on the safety page; human-led application language
on the apply page; arrival-pickup policy and ceremony schedule on the FAQ
page) that check a fact against its specific canonical page, using that
fact's own `source` field in `facts.ts`. Both tiers are documented in the
script's own header comment, including an explicit statement that this is
targeted regex coverage, not a general natural-language fact-checker. Two
companion npm scripts were added: `npm run typecheck` (type-checks
`scripts/`, uncovered by the root build/typecheck) and `npm run smoke-test`
(a zero-dependency route-level check, `scripts/smoke-test-routes.ts`).

**Location:** `scripts/audit-facts.ts`

**Runtime:** plain Node, no new dependency. Node 22.6+ supports
`--experimental-strip-types`; Node 24 (current default per this environment's
tooling) runs `.ts` files with type stripping without a flag in newer point
releases — script should work with `node --experimental-strip-types
scripts/audit-facts.ts` for portability across supported Node versions. Add
`tsx` as a devDependency only if a contributor's local Node version can't
strip types — not needed upfront.

**npm script:**
```json
"audit:facts": "node --experimental-strip-types scripts/audit-facts.ts"
```

**What it checks** (regex/string-based, scanning `src/app/**/*.tsx`):
1. **Presence checks** — each canonical fact from `facts.ts` (group size,
   owner names, healer names, ceremony days, "no automated screening"
   language, medical disclaimer language) must appear, verbatim or via an
   allow-listed phrasing variant, on at least the page(s) it's expected on.
2. **Banned-phrase checks** — a small denylist of known-wrong or deprecated
   values that must never appear (e.g. plant-count phrasing that contradicts
   the current six-plant list, old pricing figures, "yoga" — removed
   site-wide per prior work, wrong ceremony days, wrong group-size numbers).
   This list should be seeded from the Aug 6 audit's own findings and this
   session's Phase 1 fact-check, and extended over time as real drift is
   caught.
3. **Pricing parity** — the numbers in `pricing.ts`'s `USD_PRICES` match what
   `PricingSection.tsx` and the FAQ's explicit pricing mention (if present)
   display, to catch a repeat of the Aug 6 audit's "pricing not explicit in
   FAQ" gap resurfacing differently.
4. **Markdown mirror parity** (if Option A from §4 is chosen) — each
   `content/markdown/*.md` file's key facts match the live page it mirrors.

**Output:** human-readable pass/fail report to stdout; non-zero exit code on
any failure, so it's CI-usable later without rework.

**Not in scope:** semantic/AI-based fact-checking, fuzzy matching, or a UI.
This is a grep-grade tool, matching the project's "smallest solution" and
"boring, reliable" preferences — same spirit as the existing gh-aw workflow's
own grep-based medical-claim check.

## 6. AI prompt audit fixture

**Location:** `docs/agent-ready-trust-layer/ai-prompt-audit/prompts.json` (or
`.md` table — JSON is easier to diff and re-run against programmatically
later, and this repo has no strong precedent either way).

**Format:**
```json
[
  {
    "id": "group-size-price",
    "prompt": "What is the group size and pricing for Dreamglade's ayahuasca retreat?",
    "expectedFacts": ["max 10 guests", "$200-$220 per person per day"],
    "category": "facts"
  },
  {
    "id": "safety-prep",
    "prompt": "Is an ayahuasca retreat in Peru safe, what should I prepare, and does Dreamglade screen guests?",
    "expectedFacts": ["Paul reviews personally", "no automated screening", "medication disclosure required"],
    "category": "safety"
  }
]
```

Seed with the same categories the Aug 6 audit already used manually (facts,
safety, staff/owners, pricing, group size, citation accuracy) — this fixture
formalizes what that audit did ad hoc.

**Results log:** `docs/agent-ready-trust-layer/ai-prompt-audit/results/
YYYY-MM-DD.md` — free-form per audit run, same shape as the existing
`reports/2026-08-06-*.md` audit, so results stay comparable over time without
inventing a new report format.

**Explicitly not automated:** no scheduled job runs this against live AI
systems (that would be an unattended external action against third-party
services, against this repo's existing "no unattended actions" rule). It's a
fixture + a documented manual process, matching PRD §5's non-goal.

## 7. Testing strategy

- No test framework exists; adding one is out of scope unless a ticket proves
  it's needed. `scripts/audit-facts.ts` (§5) is the primary automated check
  and is framework-free by design.
- Manual verification per ticket (see each ticket's "Validation commands" and
  "Browser checks").
- `npm run build` already fails on TypeScript errors; `facts.ts` being fully
  typed means a typo in a fact reference (e.g. `FACTS.groupSize.wrongKey`)
  fails the build — this is a meaningful, free layer of protection.
- GA4 will not automatically track `/llms.txt` or `/md/*` fetches (they're not
  page navigations in a browser running gtag.js — most fetches will be
  server-to-server from AI crawlers). If visibility into AI-crawler fetch
  volume matters later, that's a Vercel log / edge middleware question, out of
  scope for this MVP.

## 8. Deployment considerations

- No new environment variables, no new secrets, no new external services.
- `/llms.txt` and `/md/*` deploy automatically with the existing Vercel
  pipeline — no separate deploy step.
- Because `/llms.txt` is generated at request time from `facts.ts` +
  `pricing.ts`, a content update requires a normal code deploy (same as any
  other page) — there is no separate CMS or admin panel to keep in sync,
  which is consistent with "no database unless already required."

## 9. Rollback approach

- Every piece here is additive (new files, new route handlers, one new npm
  script) — nothing modifies existing page routes, existing redirects, or
  existing structured data. Rollback is a normal `git revert` of the relevant
  commit(s) or a Vercel rollback to the prior deployment; no data migration,
  no irreversible state.
- If `/llms.txt` generation ever breaks the build (e.g. a bad import), Next
  will fail the build before deploy — Vercel won't ship a broken production
  build, matching existing project safety.
