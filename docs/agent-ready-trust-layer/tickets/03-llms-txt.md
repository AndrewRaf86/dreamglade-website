# Ticket 3 — Generate and validate /llms.txt

**Status: ✅ Complete.** `src/app/llms.txt/route.ts` live, statically
generated, `200`/`text/plain`, all content sourced from `facts.ts`, including
the "Markdown mirrors" section, now generated from `FACTS.markdownMirrors`
(previously two hardcoded link lines — fixed after independent review flagged
the inconsistency; see `DECISIONS.md` 2026-08-13). No pricing numbers
embedded — explicit "do not infer prices" guidance used instead, per
implementation-time instructions. Paul-review line removed (not required —
see `DECISIONS.md`).

## Objective
Serve a correct, live `/llms.txt` at the site root, generated from
`src/lib/facts.ts` and `src/lib/pricing.ts`.

## Why it matters
This is the primary MVP deliverable — the direct, addressable answer to "what
does an AI system read to get Dreamglade's facts right."

## Files likely to change
- `src/app/llms.txt/route.ts` (new)

## Dependencies
Ticket 2.

## Implementation tasks
- [ ] Create the Route Handler per `TECHNICAL-SPEC.md` §2.
- [ ] Return `Content-Type: text/plain; charset=utf-8`.
- [ ] Include: site name, one-paragraph summary, key-facts list, and links to
      all 6 canonical pages from `facts.ts`, each with a one-line purpose.
- [ ] Use `https://dreamglade.com` absolute URLs (matching `metadataBase` in
      `layout.tsx` and the pattern in `sitemap.ts`).

## Validation commands
```bash
npm run build
npm run lint
npm run dev &
curl -s http://localhost:3000/llms.txt
```
Confirm the curl output is well-formed Markdown, has no `undefined`/`NaN`
values (would indicate a bad import or a pricing fetch failure), and every
linked path is one of the 6 canonical pages.

## Browser checks
- Navigate to `http://localhost:3000/llms.txt` directly in the browser pane —
  confirm it renders as plain text, not a 404, not wrapped in the site's HTML
  chrome.
- Confirm response headers show `Content-Type: text/plain` (via
  `read_network_requests` or browser devtools).

## Edge cases
- If the live PEN exchange-rate fetch in `getPricing()` fails (network
  issue), `/llms.txt` should still render using the USD figures — don't let a
  third-party API outage break this route. Verify `getPricing()`'s existing
  try/catch (already returns `null` rates gracefully) is sufficient, or fall
  back to USD-only wording if it isn't.
- Confirm `/llms.txt` doesn't get caught by any existing redirect rule in
  `next.config.ts` (95 rules currently — confirmed no `llms` match during
  Phase 1, but re-check if redirects change before this ships).

## Acceptance criteria
- [ ] `GET https://dreamglade.com/llms.txt` returns `200` with correct
      content after deploy.
- [ ] All linked paths resolve without redirect or 404.
- [ ] Content matches `facts.ts` exactly (no hand-typed duplicate values).

## Out of scope
- `/llms-full.txt` — not built this iteration (see Technical Specification §2).
- Any caching/revalidation tuning beyond Next's defaults, unless load becomes
  an actual observed issue.
