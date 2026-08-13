# Ticket 4 — Add or generate clean Markdown page versions

**Status: ✅ Complete, including fixes from independent review.**
`/md/safety-preparation` is served from `src/lib/safety-markdown.ts` (a
plain TS string constant, imported normally — not read from disk, so it
can't hit a Vercel file-bundling gap; the earlier `content/markdown/*.md` +
`fs.readFileSync` approach was replaced after review flagged its production
bundling as unverified). `/md/faq` continues to generate from
`src/lib/faq-data.ts`, also the FAQ page's own JSON-LD source. Both return
`200`/`text/markdown`.

Unknown slugs now 404 cleanly, verified against the specific edge cases
independent review found broken: an initial `Record<string, ...>` lookup let
`Object.prototype` property names (`toString`, `constructor`,
`hasOwnProperty`, `__proto__`, `valueOf`) return `200` with garbage or crash
with `500` instead of `404`. Fixed by switching to a `Map`; all six of those
slugs plus `/md/does-not-exist` now verified `404` via
`npm run smoke-test` (`scripts/smoke-test-routes.ts`).

Both mirrors are linked from `/llms.txt`, generated from
`FACTS.markdownMirrors` in `src/lib/facts.ts` (not hardcoded, per a further
review finding). `safety-markdown.ts` is in `scripts/audit-facts.ts`'s
scanned corpus (`src/lib/**`), so it can't silently drift from the live page
it mirrors.

## Objective
Provide clean Markdown versions of `/safety-preparation` and `/faq` — the two
pages most valuable for AI citation accuracy (per the Aug 6 audit's specific
finding that the safety-intent query didn't cite Dreamglade at all).

## Why it matters
HTML pages are harder for some AI crawlers/parsers to extract clean prose
from than Markdown. This directly targets the one concrete AI-visibility gap
already found in production data, rather than a hypothetical one.

## Files that changed
- `src/app/md/[slug]/route.ts` — route handler, uses a `Map` lookup
- `src/lib/safety-markdown.ts` — canonical safety-preparation Markdown (TS string export)
- `src/lib/faq-data.ts` — shared FAQ question/answer data (also used by `src/app/faq/page.tsx`'s JSON-LD)
- `src/lib/facts.ts` — `markdownMirrors` array, source for `/llms.txt`'s mirror links
- `scripts/audit-facts.ts` — scans `src/lib/**`, covering `safety-markdown.ts`
- `scripts/smoke-test-routes.ts` — automated route-level check for all slug edge cases
- (`content/markdown/safety-preparation.md` was created, then removed after review — see `DECISIONS.md` 2026-08-13)

## Dependencies
Ticket 2. Decision made and implemented — see `DECISIONS.md`.

## Implementation tasks
- [x] **Decision (Andrew):** hand-authored Markdown for safety-preparation
      (as a TS string constant, not a loose `.md` file — see
      `DECISIONS.md` 2026-08-13), generated Markdown for FAQ from
      `src/lib/faq-data.ts`.
- [x] Build `src/app/md/[slug]/route.ts` returning `text/markdown` for known
      slugs (`safety-preparation`, `faq`), 404 for anything else — including
      inherited `Object.prototype` property names as slugs.
- [x] Safety-preparation Markdown matches the live page's actual claims
      exactly — not paraphrased.
- [x] FAQ Markdown imports the shared `FAQ_ITEMS` array rather than
      hand-duplicating question/answer text.
- [x] Link both from `/llms.txt`, generated from `FACTS.markdownMirrors`.

## Validation commands
```bash
npm run build
npm run lint
npm run typecheck
npm run audit:facts
npm run smoke-test   # covers every slug edge case below
```

## Browser checks
- Load `/md/safety-preparation` and `/md/faq` directly — confirm plain
  Markdown text renders, not the site's styled HTML page.
- Spot-check that no private/internal data (e.g. `booking@dreamglade.com`'s
  surrounding context, if reproduced, should match what's already public on
  the live page — nothing new should leak).

## Edge cases
- The live page copy changing later without `safety-markdown.ts` being
  updated to match — caught by `scripts/audit-facts.ts`, which scans
  `src/lib/**`.
- Unknown `[slug]` values must 404 cleanly, not throw a 500 — verified for
  `does-not-exist`, `toString`, `constructor`, `hasOwnProperty`, `proto`,
  `__proto__`, and `valueOf` via `npm run smoke-test`.

## Acceptance criteria
- [x] `/md/safety-preparation` and `/md/faq` are live and accurate.
- [x] Both are linked from `/llms.txt` (generated from `facts.ts`, not hardcoded).
- [x] `safety-markdown.ts` is included in the consistency audit's scope.
- [x] Unknown/inherited-property slugs return a clean 404, not 200 or 500.

## Out of scope
- Markdown mirrors for `/`, `/what-to-expect`, `/master-plants`,
  `/terms-and-conditions`, or `/apply` this iteration — expand only if a
  future AI-prompt audit run shows a specific gap on one of those pages.
