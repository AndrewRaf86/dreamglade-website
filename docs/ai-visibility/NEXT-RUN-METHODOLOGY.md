# AI visibility — next run methodology

Reuses, does **not** replace, the existing system in
`docs/agent-ready-trust-layer/ai-prompt-audit/` (`prompts.json`, `results/README.md`).
Run C tested only the site's own `/llms.txt` and `/md/*` corpus; **real engine behavior has
not been systematically measured.** This is the plan for that. No external tests have been run.

## Design
- **Prompts:** ~20. `prompts.json` has 20 corpus-answerability prompts. For engine testing, select the
  ones whose answer an engine could plausibly give from the open web (discovery, facts-overview, facts-healers,
  safety-screening, logistics, pricing-current, application-process, comparison-generic) and **add** the market
  prompts from the project brief (e.g. "What are reputable small ayahuasca retreats near Iquitos?", "…small ayahuasca
  retreats in Peru?", "Which retreats near Iquitos emphasize small groups?", "Which Iquitos retreats use traditional Shipibo
  practices?") plus one solo-travel prompt (needed by ledger DG-2026-003). New prompts are added as new entries with a
  `visibility` category in a separate, reviewed PR — existing entries are not edited.
- **Repeats:** 3 runs per prompt per engine, each in a **fresh chat**, web search on, logged out where possible.
  AI answers vary run to run; one run proves nothing.
- **Engines:** ChatGPT, Gemini, Perplexity, Claude, Google AI Overviews where testable — only those already available to
  you without new spend. Record engine + model/mode + date.
- **Cadence:** a baseline now, then monthly and after major content/entity changes. Manual and human-read, consistent with
  the existing audit README. No scheduled scraping.
- **Volume:** 20 prompts × 3 runs × N engines (N=4 → 240 answers). A reduced first pass of 10 prompts × 3 runs × 2 engines is acceptable.

## Record per run (CSV: `docs/ai-visibility/runs/YYYY-MM-DD.csv`, header in `run-template.csv`)
`PROMPT_ID, PROMPT, ENGINE, DATE, RUN, DREAMGLADE_MENTIONED, DREAMGLADE_CITED, FACTS_ACCURATE, CONTEXT_POSITION, COMPETITORS_MENTIONED, SOURCE_URLS, MISSING_INFORMATION, INCORRECT_INFORMATION, ACTIONABLE_REMEDIATION`

## Metrics — reported separately, with n; no combined "AI SEO score"
| Metric | Definition | Denominator |
|---|---|---|
| Mention rate | runs naming DreamGlade ÷ runs | runs of discovery-type prompts |
| Citation rate | runs listing a dreamglade.com URL as a source ÷ runs | runs on engines that show sources |
| Factual accuracy | facts correct ÷ facts checked against that prompt's `expectedFacts` | runs that mention DreamGlade |
| Description consistency | share of mentions whose description matches the canonical four attributes: small group (max 10) · Shipibo-led · near Iquitos · human-led application | runs that mention DreamGlade |
| Competitor share | DreamGlade mentions ÷ all retreat-brand mentions | discovery-type runs |

Also flag: invented prices/dates/availability, wrong staff roles (especially anyone naming Paul as owner), and softened
safety language. A change in any metric over runs is "supported" only per `docs/change-ledger/README.md`
rules (small n ⇒ INCONCLUSIVE).

## Not part of this
Fabricating citations, seeding content on third-party platforms, hidden instructions to models, and any paid
tool. Stale third-party listings (AyaAdvisors, The Third Wave) are tracked in the Run D evidence, separately.
