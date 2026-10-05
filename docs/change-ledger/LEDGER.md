# Ledger

Newest first. Field definitions and rules: [README.md](README.md).

---

### DG-2026-006 — Production health watchdog + browser tests
- **DATE:** PROPOSED (on merge of the site-health PR)
- **CHANGE:** Daily deterministic production check (`scripts/health-check.ts`, `.github/workflows/site-health.yml`) that opens/updates one `site-health` GitHub issue; Playwright desktop + mobile suite in CI.
- **CATEGORY:** engineering
- **HYPOTHESIS:** If a deterministic watchdog runs daily, a defect like an expired availability window is detected within 24h instead of by a person noticing.
- **WHY:** The expired Aug 31 – Sept 26 window stayed live on 2026-09-30 and was found by manual audit; CI only tested localhost.
- **BASELINE:** No scheduled production monitoring existed (2026-10-05).
- **EXPECTED_OUTCOME:** Any watchdog FAIL on production produces exactly one open issue within 24h; recovery closes it.
- **PRIMARY_METRIC:** Time from defect appearing to issue opened (target ≤ 24h).
- **SECONDARY_METRIC:** False-alarm count (target 0 per 28 days).
- **MEASUREMENT_WINDOW:** 28 days from first scheduled run
- **7_DAY_RESULT / 28_DAY_RESULT / ACTUAL_RESULT:** —
- **STATUS:** PENDING
- **NOTES:** Verify the issue behavior once with a manual `workflow_dispatch` after merge (see docs/site-health/README.md).

### DG-2026-005 — Redirect www.dreamglade.com to dreamglade.com
- **DATE:** 2026-10-05 (PR #25)
- **CHANGE:** Permanent 308 redirect from `www` to the apex host, path and query preserved.
- **CATEGORY:** seo
- **HYPOTHESIS:** If only one host serves content, Google consolidates signals on `dreamglade.com` and duplicate-host URLs leave the index.
- **WHY:** Run D audit (2026-09-04) found `www` serving 200 as a duplicate host.
- **BASELINE:** `www` returned 200 (2026-09-04). Search Console duplicate/"alternate page" counts for www: UNKNOWN (needs Search Console).
- **EXPECTED_OUTCOME:** `www/*` → 308 → apex; www URLs fall out of Search Console reports.
- **PRIMARY_METRIC:** Watchdog `WWW_REDIRECT` = PASS.
- **SECONDARY_METRIC:** Number of www URLs indexed (Search Console → Pages).
- **MEASUREMENT_WINDOW:** primary: continuous (daily); secondary: 28 days
- **ACTUAL_RESULT:** Primary verified on production 2026-10-05 (308, `/faq?health=1` preserved).
- **STATUS:** SUPPORTED (primary). Secondary PENDING Search Console baseline.

### DG-2026-004 — Single source for the Google review count ("180+")
- **DATE:** 2026-10-05 (PR #25)
- **CHANGE:** Review rating/count moved to `FACTS.reputation.google`; displayed conservatively as "180+".
- **CATEGORY:** content-integrity
- **HYPOTHESIS:** If the number lives in one place and is rounded down, it cannot drift between pages or overstate reviews.
- **WHY:** "182" was hard-coded in several places; a newer audit saw ~192 but it was unverified.
- **BASELINE:** 3 hard-coded copies of "182" in page components.
- **EXPECTED_OUTCOME:** Zero hard-coded copies; every page shows the same value.
- **PRIMARY_METRIC:** Occurrences of the old hard-coded count on production = 0.
- **ACTUAL_RESULT:** 0 (production crawl 2026-10-05; "180+" shown 4× on `/`, and on `/apply`).
- **STATUS:** SUPPORTED
- **NOTES:** The exact current Google count still needs owner confirmation. No rating/review schema was added.

### DG-2026-003 — FAQ: separate "travel alone" from "show up unannounced"
- **DATE:** 2026-10-05 (PR #25)
- **CHANGE:** "Can I come on my own? — No" → "Can I just show up without applying first?" (page, FAQPage JSON-LD, `/md/faq`).
- **CATEGORY:** ai-visibility
- **HYPOTHESIS:** If the question no longer reads as an exclusion, AI answers stop implying DreamGlade refuses solo travelers.
- **WHY:** The old Q/A pair contradicted the solo-women FAQ when extracted out of context.
- **BASELINE:** UNKNOWN — no AI-visibility run has measured this specific misreading yet.
- **EXPECTED_OUTCOME:** In the next AI-visibility run, 0 of N answers state or imply solo travelers are not accepted.
- **PRIMARY_METRIC:** Count of answers implying solo travel is not allowed (from a solo-travel prompt, to be added to the fixture).
- **MEASUREMENT_WINDOW:** 28 days (engines re-crawl slowly)
- **STATUS:** PENDING
- **NOTES:** Needs a solo-travel prompt added to `prompts.json` before it can be measured. Do not claim success from a single run.

### DG-2026-002 — Next.js 16.3.8 security patch
- **DATE:** 2026-10-05 (PR #25)
- **CHANGE:** `next` 16.3.1 → 16.3.8, `sharp` and lockfile refreshed; CI now blocks on production-dependency audit and reports dev-only audit non-blocking.
- **CATEGORY:** security
- **HYPOTHESIS:** n/a (engineering fix). Expectation: no high/critical advisory in production dependencies.
- **WHY:** `npm audit --omit=dev` reported a critical Next.js RCE advisory range and a high `sharp` advisory.
- **BASELINE:** 1 critical + 1 high + 1 moderate production findings (2026-09-30).
- **EXPECTED_OUTCOME:** `npm audit --omit=dev --audit-level=high` exits 0.
- **PRIMARY_METRIC:** that command's exit code, in CI on every PR/push.
- **ACTUAL_RESULT:** 0 vulnerabilities (CI run 37320392643; main 2026-10-05).
- **STATUS:** SUPPORTED
- **NOTES:** 5 dev-only highs remain (`braces` chain via eslint-config-next); no patched `braces` exists. Fix when one ships.

### DG-2026-001 — Remove expired availability window and protect against recurrence
- **DATE:** 2026-10-05 (PR #25; protection ships with DG-2026-006)
- **CHANGE:** Removed the "Aug 31 – Sept 26, 2026" card; first displayed window is now Oct 19 – Nov 14, 2026.
- **CATEGORY:** content-integrity
- **HYPOTHESIS:** n/a (bug fix). Expectation: no expired availability window is ever displayed.
- **WHY:** The window was past (today 2026-09-30) but still presented as a retreat window.
- **BASELINE:** 1 expired window displayed (production, 2026-09-30).
- **EXPECTED_OUTCOME:** 0 expired windows displayed.
- **PRIMARY_METRIC:** Watchdog `AVAILABILITY_DATE_FRESHNESS` stays PASS.
- **SECONDARY_METRIC:** Runway: days until the last displayed window ends (WARN below 60).
- **MEASUREMENT_WINDOW:** continuous (daily)
- **ACTUAL_RESULT:** PASS on production 2026-10-05 (11 windows; last ends in 432 days).
- **STATUS:** SUPPORTED
- **NOTES:** Dates themselves still come from Wade/Clarisa; nothing was invented.
