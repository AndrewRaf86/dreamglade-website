# PostHog and OpenSEO decisions

Date: 2026-10-05. Nothing is installed. These are recommendations for human decision.
Facts about the products come from their official GitHub READMEs and PostHog docs fetched
2026-09-30; DreamGlade's actual traffic volume is **unknown** to me (no GA4 access).

## 1. Does DreamGlade actually need PostHog?

**Recommendation: No, not now.** (This revises my earlier "strong candidate" note, which
was written before the GA4 audit showed how much GA4 already covers.)

| | GA4 + Vercel Analytics | + PostHog Cloud |
|---|---|---|
| Sources, landing pages, device split | Yes (already collected) | Yes (duplicate) |
| Page-level funnel Safety → Apply → email | Yes, in a GA4 Funnel Exploration | Yes, easier UI |
| Per-event breakdown by `location`/`retreat` | Yes **once custom dimensions are registered** | Works immediately, no registration |
| "Reached Availability" | After adding `section_view` | After adding the same event |
| Final "email actually sent" | **Impossible** | **Impossible** (off-site mailto) |
| Session replay / heatmaps | No | Yes — but replaying a *retreat applicant's* browsing is the sensitive part; we would mask everything |
| A/B tests of CTAs | No | Yes — but DreamGlade's traffic is unlikely to give a statistically useful result |
| Cost / burden | none extra | free tier (1M events, 5K recordings/mo) but a second tracker, second consent surface, extra JS on a performance-sensitive page |

What PostHog would let us see that GA4 makes **difficult**: per-visitor paths without thresholding,
instant ad-hoc breakdowns, and replay of *where mobile visitors get stuck*. The practical value is
real only if (a) GA4 is configured per `ga4-funnel-gap-report.md` and still can't answer the
questions, or (b) mobile friction can't be diagnosed with the Playwright mobile suite and Search Console.

**Revisit trigger:** after 28 days of correctly configured GA4 (custom dimensions + key events +
`section_view`), if the funnel questions are still unanswerable or traffic is large enough for
experiments. Please check GA4 for monthly users first — if it is only a few hundred, PostHog adds little.

**If approved later — limited 28-day pilot:** PostHog Cloud; explicit `capture()` calls only
(reuse the events in `src/lib/analytics.ts`, same properties); **no autocapture; no session
replay; no forms; no application answers; no health information; no private messages**;
`person_profiles: "identified_only"` / cookieless memory persistence; load `async`; measure
JS added and LCP before/after (current mobile lab baseline: LCP ≈ 0.75 s, JS ≈ 174 KB, CLS 0).
Add a ledger entry before starting. Show the diff for approval first.

## 2. OpenSEO

**Recommendation: defer; evaluate after a 28-day Search Console baseline.** Do not install it
into the website; if used, run it as a separate internal tool.

Search Console already gives the authoritative first-party data: DreamGlade's real queries,
impressions, clicks, positions, indexing status. Our own audits (`npm run audit`, `health-check`)
cover facts, schema and technical health. The manual AI-visibility process covers how engines describe us.

OpenSEO (`every-app/open-seo`, MIT, v0.1.10 — young; MCP server + agent skills; needs a paid
DataForSEO key; hosted $10/mo + 28% on requests, or self-host on Cloudflare/Docker) would add what
those three **cannot**:
- keyword volume / difficulty for queries DreamGlade does **not yet** appear for;
- competitor ranking and keyword-gap data;
- backlink data;
- agent/MCP access so Claude can pull this into reports.
It adds nothing about DreamGlade's own traffic, conversions, or factual accuracy, and I have **not
verified** whether its "AI visibility" feature measures real engine answers or something proxied.

**Preconditions (you):** Search Console verified for `dreamglade.com` and linked to GA4; a
named question that Search Console cannot answer (e.g. "which keywords do competitors rank for that we don't?");
a monthly DataForSEO budget cap. Cost: unverified — check DataForSEO pricing before committing.
