# Ticket 8 — Run final QA and prepare a deployment checklist

**Status: local QA complete, including fixes from independent review; preview
deployment verification tracked separately (see PR).** `npm run lint`,
`npx tsc --noEmit`, `npm run typecheck`, `npm run audit:facts`,
`npm run build` all pass. `npm run smoke-test` — 16/16 routes pass against a
real `next start` production build, including all `/md/[slug]` edge cases
(`toString`, `constructor`, `hasOwnProperty`, `proto`, `__proto__`, `valueOf`,
`does-not-exist` → clean `404`; `safety-preparation`/`faq` → `200`,
`text/markdown`). Browser checks on homepage, FAQ, safety-preparation, and
apply show no new console errors (one pre-existing, unrelated 404 for
`/_vercel/insights/script.js`, expected locally — that script only resolves
on real Vercel infrastructure). Secrets/privacy sweep clean.
`DEPLOYMENT-CHECKLIST.md` written and includes `npm run smoke-test`.
Production was not deployed. See the PR for preview-deployment verification.

## Objective
Confirm the whole MVP works end-to-end on a preview deployment before it
merges to `main`/production, and leave a short repeatable checklist behind.

## Why it matters
This is the gate between "builds locally" and "actually live and correct on
dreamglade.com." Given the site already gets real AI-referred traffic, a
broken `/llms.txt` shipped to production is a real (if low-severity) problem,
not just a local inconvenience.

## Files likely to change
- `docs/agent-ready-trust-layer/DEPLOYMENT-CHECKLIST.md` (new)
- No production code expected to change in this ticket — it's verification
  only, unless QA finds a bug, in which case fix it minimally and re-run.

## Dependencies
Tickets 3, 4, 5, 6, 7 (everything else must exist first).

## Implementation tasks
- [ ] On a Vercel preview deployment (normal PR flow — no special setup
      needed), verify:
  - [ ] `/llms.txt` returns `200`, correct `Content-Type`, correct content.
  - [ ] `/md/safety-preparation` and `/md/faq` return `200` with correct
        content.
  - [ ] Every link inside `/llms.txt` resolves (no 404, no redirect chain)
        on the preview URL.
  - [ ] `npm run build`, `npm run lint`, `npm run audit:facts` all pass in
        the deployment logs / locally against the same commit.
  - [ ] No private data (guest names, application details, health data,
        payment info) appears anywhere in `/llms.txt` or any markdown
        mirror — read the full generated output once, don't just spot-check.
  - [ ] Existing routes, redirects, sitemap, and robots.txt are unaffected
        (spot-check `/sitemap.xml` and `/robots.txt` still render correctly).
- [ ] Write `DEPLOYMENT-CHECKLIST.md` capturing the above as a reusable list
      for the next time facts change (e.g. a pricing update, a schedule
      change) — so this isn't a one-time verification but a repeatable
      pre-deploy habit.
- [ ] Get final sign-off per `EPIC.md`'s "what requires Andrew/Paul" list
      before merging to `main`.

## Validation commands
```bash
npm run build
npm run lint
npm run audit:facts
curl -sI https://<preview-url>/llms.txt
curl -sI https://<preview-url>/md/safety-preparation
curl -sI https://<preview-url>/md/faq
curl -sI https://<preview-url>/sitemap.xml
curl -sI https://<preview-url>/robots.txt
```

## Browser checks
- Load `/llms.txt`, `/md/safety-preparation`, `/md/faq` directly on the
  preview URL in the browser pane.
- Click through every link listed in `/llms.txt` from the preview URL to
  confirm they land on real pages.
- Resize/dark-mode checks not applicable (plain-text routes, no UI).

## Edge cases
- Preview-vs-production URL differences: `facts.ts`/`llms.txt` route hardcodes
  `https://dreamglade.com` per `TECHNICAL-SPEC.md` §2 (matching existing
  `sitemap.ts` behavior) — confirm this doesn't produce broken absolute links
  when checked on a `*.vercel.app` preview URL (expected: links will point to
  production even from preview, which is correct behavior, not a bug — note
  this explicitly in the checklist so it isn't misread as an error).

## Acceptance criteria
- [ ] All PRD §6 success metrics verified true on a real deployment, not just
      locally.
- [ ] `DEPLOYMENT-CHECKLIST.md` exists and is usable by a future session.
- [ ] Explicit sign-off recorded (in `DECISIONS.md` or the PR itself) before
      merge.

## Out of scope
- Post-deploy AI-visibility retesting (that's the ticket 6 fixture's job, on
  its own cadence, not a blocking step for this ticket).
