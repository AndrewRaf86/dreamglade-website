# Production health watchdog

Deterministic checks of the **live site**. No LLM decides PASS/FAIL.

```bash
npm run health-check                                  # live https://dreamglade.com
HEALTH_BASE_URL=http://localhost:3000 npm run health-check
npm run health-check -- --json health-report.json     # also write a report
HEALTH_TODAY=2026-12-01 npm run health-check          # simulate a date (proves the freshness check can fail)
```
Exit code 1 if any check FAILs. WARN never fails the run.

## Checks
`PAGES_200` · `UNKNOWN_PAGE_404` · `CANONICALS` · `JSON_LD_PARSES` (also rejects rating/review markup) · `SITEMAP` · `SITEMAP_URLS_200` · `ROBOTS` · `LLMS_TXT` (text/plain, not HTML) · `LLMS_TXT_LINKS` · `MARKDOWN_MIRRORS` · `MARKDOWN_BAD_SLUG_404` · `INTERNAL_LINKS` · `IMAGES_LOAD` (page images + og:image return `image/*`) · `APPLY_CTA` · `BOOKING_EMAIL` · `NO_PLACEHOLDERS` · `WWW_REDIRECT` (production only) · `AVAILABILITY_DATE_FRESHNESS`.

`AVAILABILITY_DATE_FRESHNESS` parses the end date of every availability window on the
homepage and compares it with today's date in Lima. FAIL if any window has ended or a
label cannot be parsed; WARN if the last window ends in under 60 days.
"Verify with Paul" is currently allowed visible text (open question for Wade/Clarisa);
it is the only intentional exception to `NO_PLACEHOLDERS`.

## Schedule and issue behavior
`.github/workflows/site-health.yml` runs daily (11:17 UTC) and on demand. Issues are handled by
`scripts/health-issue.ts` using `GITHUB_TOKEN`; label `site-health`; fingerprint = hash of the sorted
failing check IDs, stored in the issue body.

| Situation | Action |
|---|---|
| FAIL, no open issue | create one |
| FAIL again, same checks | edit the body in place (last seen + run link), **no new comment** |
| FAIL, different checks | edit + one comment |
| FAIL, same checks as a previously closed issue | reopen + "Regressed" comment |
| PASS, issue open | "Recovered" comment + close |
| PASS, nothing open | nothing |

Preview-URL manual runs never touch issues. A crash before a report exists raises a `WATCHDOG_CRASHED` failure.

Dry-run the issue logic without touching GitHub:
`DRY_RUN=1 ISSUES_FIXTURE=issues.json node --experimental-strip-types scripts/health-issue.ts health-report.json`

## Browser tests
`npm run test:e2e` (Playwright; desktop 1280×800 and Pixel 7). It builds nothing — run `npm run build` first.
It never sends email: `mailto:` navigation is cancelled in `e2e/helpers.ts` and only the target and the
analytics event are asserted. `E2E_BASE_URL=<preview url>` tests a deployed preview instead.
