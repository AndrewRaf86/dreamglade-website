# Deployment Checklist — Agent-Ready Trust Layer

Run this before merging/deploying any change to `src/lib/facts.ts`,
`src/lib/safety-markdown.ts`, `src/lib/faq-data.ts`, `src/app/llms.txt/`,
`src/app/md/`, or `scripts/`. Reusable for every future fact update (pricing
change, schedule change, etc.), not just this initial build.

## 1. Local checks

```bash
npm run lint
npx tsc --noEmit
npm run typecheck      # type-checks scripts/ — a separate tsconfig, not covered by npx tsc --noEmit; see "Why two typechecks" below
npm run audit:facts    # alias: npm run audit
npm run build
```
All must pass (exit 0) before proceeding.

**Why two typecheck commands:** `scripts/` is deliberately excluded from the
root `tsconfig.json` (Next's build-time type-checker rejects the `.ts`
import extension Node's `--experimental-strip-types` loader requires for
`scripts/audit-facts.ts`'s import of `facts.ts`). `scripts/tsconfig.json`
type-checks that directory on its own settings. Neither `npm run build` nor
`npx tsc --noEmit` covers it — only `npm run typecheck` does.

## 2. Local route checks

With `npm run dev` running (or `npm run build && npm run start`):

```bash
npm run smoke-test
```
This checks `/`, `/faq`, `/safety-preparation`, `/apply`, `/llms.txt`,
`/md/faq`, `/md/safety-preparation`, `/robots.txt`, `/sitemap.xml`, and every
`/md/[slug]` edge case that matters (`does-not-exist`, `toString`,
`constructor`, `hasOwnProperty`, `proto`, `__proto__`, `valueOf` — all must
be `404`, not `200` with garbage content or a `500`; see `DECISIONS.md`
2026-08-13 for why those specific slugs matter). Point it at a different
server with `SMOKE_TEST_BASE_URL=<url> npm run smoke-test`.

```bash
curl -s http://localhost:3000/llms.txt | grep -c "^- \[" # expect 9 links (7 pages + 2 mirrors)
```

## 3. On a preview deployment (normal PR flow)

- [ ] `SMOKE_TEST_BASE_URL=<preview-url> npm run smoke-test` passes in full —
      this is the fastest way to confirm the safety Markdown loads without a
      filesystem error on Vercel (it's an imported TS string now, not a
      `fs.readFileSync` at module scope, but this is still the check that
      proves it end-to-end on real serverless infrastructure).
- [ ] Every link inside `/llms.txt` resolves on the preview URL (no 404, no
      redirect chain) — note: the links are hardcoded to
      `https://dreamglade.com`, matching `sitemap.ts`'s existing behavior,
      so on a `*.vercel.app` preview URL they will point to production, not
      the preview itself. That's expected, not a bug.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run typecheck`,
      `npm run audit:facts`, `npm run build` all pass against the same commit.
- [ ] Read the full generated `/llms.txt` and both `/md/*` outputs once —
      confirm no private data (guest names, application details, health
      data, payment info, internal emails) appears anywhere.
- [ ] Spot-check `/sitemap.xml` and `/robots.txt` still render correctly and
      are unaffected.
- [ ] Homepage, Safety & Preparation, FAQ, and Apply pages load with no
      console errors (FAQ's structured data now comes from
      `src/lib/faq-data.ts` — confirm the FAQ page still renders all
      sections and its JSON-LD block is present).

## 4. Sign-off

Record sign-off in `DECISIONS.md` or the PR description before merging to
`main`.

## 5. Post-deploy (production)

```bash
SMOKE_TEST_BASE_URL=https://dreamglade.com npm run smoke-test
```
- [ ] Above passes in full (all routes + all `/md/[slug]` edge cases).
- [ ] Open `/llms.txt` in a browser and click through each linked page once.

## Rollback

See `README.md`'s "How to roll back this feature" section — everything here
is additive; a `git revert` or Vercel rollback fully reverses it with no
data migration.
