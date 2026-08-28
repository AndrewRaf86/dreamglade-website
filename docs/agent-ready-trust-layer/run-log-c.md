# Run C log — AI discoverability and agent readiness

Date: 2026-08-27 (America/Lima)

Branch: `experiment/webmcp-agent-readiness`

Base SHA: `35023bf61373629deb3f36173bf3d6ae5ddd477c`

## Scope and constitutional boundary

Run C improves search discovery, entity clarity, machine-readable content,
AI answerability, and deterministic safety enforcement. Paul remains the human
decision layer. No code may make medical, screening, eligibility, booking,
payment, availability, or guest-communication decisions.

`AGENTS.md` remains pre-existing user-owned work and is excluded.

## Run B closure carried into this branch

- Run B primary PR: [#22](https://github.com/AndrewRaf86/dreamglade-website/pull/22),
  merge `33d5a0cc4c37b4d18c47f4e73c7fb5ea01ccf65e`.
- Node 24 action-runtime follow-up: [#23](https://github.com/AndrewRaf86/dreamglade-website/pull/23),
  merge `35023bf61373629deb3f36173bf3d6ae5ddd477c`.
- Final push-to-main workflow `33136789509`: PASS in 38 seconds, all gates,
  no annotations.

## Baseline

The baseline site already had strong titles/descriptions, canonical URLs,
semantic page headings, descriptive image alt text, permissive robots, a
sitemap, FAQPage JSON-LD, `/llms.txt`, and two Markdown routes.

Observed gaps:

- Organization/LocalBusiness JSON-LD existed only on the homepage and had no
  stable entity IDs or page/entity relationships.
- Other pages had no WebPage/Breadcrumb graph.
- Only FAQ and safety had clean Markdown routes.
- `/llms.txt` pointed to live pricing but did not state the canonical USD
  values. Run C separates the stable values into `pricing-data.ts` so both
  browser and Node audit code can consume them without importing Next APIs.
- Sitemap `lastModified` used `new Date()` for every URL on every build,
  claiming changes that were not evidenced.
- The homepage H1 and several navigation labels were atmospheric rather than
  maximally descriptive.
- The manual AI prompt fixture did not include the full required boundary and
  transaction set.

### Baseline performance/build evidence

- Next.js 16.3.1 build: PASS; 13 routes generated.
- Total `.next/static/chunks/**/*.js`: 13 files, 645,260 raw bytes, 200,918
  bytes when each file was gzip-compressed and summed.
- Production HTML response sizes captured before Run C: homepage 170,803
  bytes; FAQ 91,230; master plants 48,713; what to expect 71,007; apply 32,937;
  safety/preparation 44,741.
- Desktop 1280×720 and mobile 390×844 baseline homepage: no horizontal
  overflow and no browser console warnings/errors.
- The in-app browser's read-only page sandbox did not expose reliable
  Navigation Timing, LCP, or CLS entries. Those metrics are **NOT MEASURED**;
  no inferred values will be reported. INP is also **NOT MEASURED** because a
  meaningful field interaction sample was unavailable.

## Implemented non-WebMCP improvements

- Central entity graph with stable IDs for Dreamglade's WebSite, Organization,
  physical Place, retreat Service, verified people, and canonical USD offers.
- Page-level WebPage/FAQPage and BreadcrumbList graphs tied back to the same
  site and organization IDs.
- Generated AI content with canonical USD pricing and explicit human/medical/
  transaction boundaries.
- Six clean Markdown guides: overview, FAQ, safety/preparation,
  what-to-expect, apply, and master plants.
- `rel=alternate` Markdown discovery from the corresponding canonical HTML
  pages.
- More descriptive homepage/page headings, navigation labels, internal-link
  text, Open Graph image alt text, and default Twitter card metadata.
- Sitemap no longer fabricates a current modification date on every build;
  robots now identifies the canonical host.
- Deterministic AI-readiness/schema audit and stronger route content checks,
  added to required CI.
- Manual AI fixture expanded with the full boundary and transaction prompt set.

## WebMCP decision

See `webmcp-upstream-snapshot.md`.

- Implementation status: **NOT BUILT**.
- Experimental evidence: **UNTESTABLE**.
- Product verdict: **HOLD — experimental arm unavailable and no current tool
  demonstrates incremental value within the existing architecture.**

## Paired agent evidence

No Arm B implementation exists, so no paired improvement is inferred.

| Task ID | Capability | Test task | Existing baseline result | WebMCP result | Measured improvement | Added cost/risk | Verdict |
|---|---|---|---|---|---|---|---|
| DG-AGENT-001 | Public fact discovery | Identify Dreamglade, its location, people, group size, and retreat format | DOM, `/llms.txt`, and Markdown corpus were served and read successfully; no paired score was run | UNTESTABLE | NOT MEASURED | Experimental API and duplicate public-fact surface | HOLD |
| DG-AGENT-002 | Human contact | Hand an interested user into Paul's existing process | Terms gate opened; acknowledgement changed Continue from disabled to enabled; final `mailto:` launch was intentionally not triggered | UNTESTABLE | NOT MEASURED | A reliable transmitting action needs new privacy, delivery, abuse, retention, and consent infrastructure | HOLD |

## Local verification

Fresh dependency install and final branch checks:

| Check | Result | Observed time |
|---|---|---:|
| `npm ci` | PASS; 368 packages; 0 vulnerabilities | 5.05 s |
| `npm run lint` | PASS | 2.96 s |
| `npx tsc --noEmit` | PASS | 1.34 s |
| `npm run typecheck` | PASS | 0.61 s |
| `npm run audit:facts` | PASS, 51/51 | 0.24 s |
| `npm run audit:agent` | PASS, 43/43 | 0.23 s |
| `npm run build` | PASS, 13 routes | 6.37 s |
| `npm run smoke-test` | PASS, 22/22 | 0.47 s |
| `npm audit` | PASS, 0 vulnerabilities | 0.89 s |

Additional checks:

- All emitted JSON-LD scripts on the six tested content pages parsed as JSON.
- Canonical URLs, descriptions, Markdown alternates, Open Graph image alt
  text, robots host/sitemap directives, and sitemap URLs were inspected from
  final local responses.
- Desktop 1280×720 and mobile 390×844 homepage checks showed no horizontal
  overflow. The revised heading and navigation rendered correctly.
- The Apply Terms gate opened at mobile width, Continue was disabled before
  acknowledgement and enabled after acknowledgement. The final `mailto:`
  launch was not triggered, so no external application was opened and no data
  was sent.
- Controlled corpus evaluation: 20/20 answerability/boundary/transaction
  prompts and 7/7 applicable adversarial tests passed. See
  `ai-prompt-audit/results/2026-08-27-run-c.md`.
- Unknown/prototype-like Markdown slugs returned predictable 404 responses.
  JSON-LD `<` escaping is enforced. Because no input-processing tool or new
  backend exists, missing/extra fields, oversized inputs, cancellation, and
  duplicate execution are NOT APPLICABLE / NOT RUN.

## Final performance delta

- Client JavaScript: 13 chunks, 645,385 raw bytes, 200,997 summed individual
  gzip bytes. Delta from baseline: **+125 raw bytes (+0.02%)** and **+79 gzip
  bytes (+0.04%)**.
- Final local HTML response deltas: homepage −2,763 bytes (−1.62%); FAQ
  +16,133 (+17.68%); master plants −127 (−0.26%); what to expect −2,012
  (−2.83%); apply +1,149 (+3.49%); safety/preparation +874 (+1.95%). The FAQ
  increase is server-rendered FAQPage/WebPage/Breadcrumb structured data, not
  added client JavaScript.
- The full site entity graph is emitted once on the homepage. Secondary page
  graphs reference its stable IDs instead of repeating it, removing an
  avoidable roughly 9 KB raw-HTML repetition per page from the first draft.
- Hydration showed no visible regression in desktop/mobile interaction checks.
- LCP, CLS, and INP remain **NOT MEASURED** because the available browser
  sandbox did not expose reliable performance entries; no values are inferred.

## Remote delivery

PR, GitHub CI, merge SHA, Vercel deployment, and production verification are
recorded after the branch is pushed and the real remote gates complete.
