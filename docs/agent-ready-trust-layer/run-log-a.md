# Run A log — fact reconciliation

Date: 2026-08-27 (America/Lima)

Branch: `chore/fact-reconciliation`

Base SHA: `33ece229d8f81b3e365e0a2ecca0878832e71962`

## Scope and boundaries

- Run A only: reconcile public facts and improve the existing AI source of truth where evidence supports a change.
- No push, PR, merge, deployment, DNS, Vercel production configuration, production data, or unrelated-file changes.
- `AGENTS.md` was already modified before this run (an uncommitted Claude memory stub). It is preserved as user-owned work and excluded from Run A commits.
- Paul remains the human decision layer. This run does not automate screening, eligibility, medical advice, booking, payment, or guest communication.

## Preconditions and synchronization

Commands executed:

```text
git status --short --branch
git branch --show-current
git rev-parse HEAD
git remote -v
git log --oneline --decorate -8
command -v git
command -v gh
gh auth status
command -v node
node --version
command -v npm
npm --version
git fetch --prune origin
git rev-parse origin/main
git rev-list --left-right --count HEAD...origin/main
git branch --list 'chore/fact-reconciliation*'
git ls-remote --heads origin 'chore/fact-reconciliation*'
git switch -c chore/fact-reconciliation
```

Important observed outputs:

- Git: `/usr/bin/git`
- GitHub CLI: `/opt/homebrew/bin/gh`; authenticated to `github.com` as `AndrewRaf86` with repository access.
- Node: `v24.18.0`
- npm: `11.16.0`
- Remote: `origin https://github.com/AndrewRaf86/dreamglade-website.git`
- Freshly fetched `origin/main`: `33ece229d8f81b3e365e0a2ecca0878832e71962`
- Before branching, local `main` and `origin/main` were `0` behind and `0` ahead.
- No local or remote branch matching `chore/fact-reconciliation*` existed.
- Created `chore/fact-reconciliation` at the base SHA above.

## Evidence log

### GitHub state

Commands executed:

```text
gh repo view AndrewRaf86/dreamglade-website --json nameWithOwner,defaultBranchRef,url
gh pr list --repo AndrewRaf86/dreamglade-website --state open --limit 100 --json ...
gh pr list --repo AndrewRaf86/dreamglade-website --state merged --limit 30 --json ...
gh pr list --repo AndrewRaf86/dreamglade-website --state closed --limit 100 --json ...
gh issue list --repo AndrewRaf86/dreamglade-website --state open --limit 100 --json ...
gh issue list --repo AndrewRaf86/dreamglade-website --state closed --limit 30 --json ...
gh pr view 15 --repo AndrewRaf86/dreamglade-website --json ...
gh pr diff 15 --repo AndrewRaf86/dreamglade-website
```

Observed:

- Default branch: `main`.
- Open PRs: only [#15](https://github.com/AndrewRaf86/dreamglade-website/pull/15), "Correct plant-dieta count to five, add explicit pricing, strengthen disclaimer."
- PR #15 head: `content/five-plants-pricing-disclaimer`, commit `2aeaba2e93d6619610f48438c8d80d4bd890e0d6`.
- PR #15 was last updated 2026-08-06, has no reviews, is `CONFLICTING` / `DIRTY`, is one commit ahead and ten commits behind current `main`, and cites no owner/operator source for the five-plant claim.
- PR #15 also adds unmentioned claims that Dominga and Raúl are married, are from Vista Alegre, and have more than 40 years of life/family/service in their community. No source is cited for those claims.
- Relevant merged PRs inspected: #7 (medical/safety content), #9–#12 (Clarisa-approved business, pricing, CTA, and logistics changes), #17 (agent-ready trust layer), and #18–#20 (redirects/security).
- Open issues: none. Closed issues: none.
- No retrieved content attempted to override the mission or request secrets/actions.

### Repository and production comparison

Commands executed included targeted `rg`, `git log`, `git show`, `git blame`, and direct HTTPS fetches of:

```text
https://dreamglade.com/
https://dreamglade.com/faq
https://dreamglade.com/safety-preparation
https://dreamglade.com/apply
https://dreamglade.com/what-to-expect
https://dreamglade.com/master-plants
https://dreamglade.com/llms.txt
https://dreamglade.com/md/faq
https://dreamglade.com/md/safety-preparation
```

All nine production routes returned HTTP 200 with the expected content type.
Production matched `main` on the compared facts. The homepage response was a
Vercel cache hit with a response `Date` of 2026-08-25; it still labelled the
already-ended July 27–August 22, 2026 window "Available."

### Fact Conflict Report

| Fact | `main` | Production | Open PR | Canonical source | Evidence | Likely correct | Action |
|---|---|---|---|---|---|---|---|
| Owners / management | Wade Bucher and Clarisa Gutierrez; founder Stacy Povey; transition in 2023 | Same | No conflicting change | `src/lib/facts.ts`, homepage | Current implementation/production; Clarisa-approved PR #9; trust-layer PR #17 | Settled at current published wording | No fact change |
| Ceremony leaders | Maestra Dominga and Maestro Raúl; Shipibo tradition | Same | Keeps names but adds uncited married/Vista Alegre/40-year biography | `src/lib/facts.ts`, homepage/FAQ | Current implementation/production; PR #15 diff has no source for additions | Names/tradition settled; added biography **UNRESOLVED** | Keep current facts; require Paul/Wade/Clarisa before adding biography |
| Group size | Maximum 10 | Same | No conflict | `src/lib/facts.ts` | Homepage, FAQ, safety page, `/llms.txt`, production | Settled | No change |
| Plant dietas | Six, including Machinga | Same | Five; removes Machinga | `src/lib/facts.ts`, `/master-plants` | Commit `32ba7a9` says six were confirmed; PR #15 later says five but cites no human source; no review | **UNRESOLVED** | Preserve approved production state; record decision/open question; do not propagate five |
| Retreat structure | Ceremonies Monday/Wednesday/Friday; five-night minimum/three ceremonies; two-week maximum/up to six; arrivals normally Monday/Friday | Same | No conflict | `src/lib/facts.ts`, FAQ | Current implementation, structured FAQ, Markdown, production | Settled | No change |
| Pricing | USD 200 communal / 210 two-person / 220 private per person/day | Same | Same figures, hardcoded into FAQ | `src/lib/pricing.ts` | PRs #9–#12; live pricing cards; production values observed | Settled | Generate visible FAQ, JSON-LD, and Markdown answer from `USD_PRICES`; no duplicated constants |
| Availability | Hardcoded windows labelled "Available," including July 27–August 22 after it ended | Same | No change | Homepage; stable policy now in `src/lib/facts.ts` | Current date 2026-08-27; direct production fetch; mission forbids guarantees | Specific spaces **UNRESOLVED** and human-confirmed only | Remove elapsed window; label every card "Verify with Paul"; add no-guarantee policy to homepage and `/llms.txt` |
| Application flow | Short Stage 1 inquiry; Paul replies; private Stage 2 later; no upfront payment/online booking | Same | No conflict | `src/lib/facts.ts`, `/apply`, Terms gate | Current implementation/production; Clarisa-approved PR #11; trust-layer PR #17 | Settled | No flow change; verified Terms gate remains functional |
| Paul's role / medical boundary | Human review, but safety copy incorrectly said medication/condition decisions come from Paul together with a clinician | Same | Proposes clearer hosting-only boundary | Mission constitution, safety page, `src/lib/safety-markdown.ts` | Direct human mission is authoritative; existing wording conflicts | Settled: Paul makes human hosting decisions only, never medical decisions | Correct visible/Markdown disclaimer; remove static FAQ eligibility/safety determinations |
| Transport | Guest reaches Iquitos; group transport from city meeting point; no arrival airport pickup; conditional departure airport drop-off | Same | No conflict | `src/lib/facts.ts`, FAQ | Current implementation, FAQ JSON-LD/Markdown, production | Settled | No change |

### Resolved implementation

- Added a canonical availability policy to `src/lib/facts.ts` and generated it into `/llms.txt`.
- Removed the elapsed July 27–August 22, 2026 window and replaced asserted availability statuses with "Verify with Paul."
- Generated the FAQ price answer from `USD_PRICES`, so visible FAQ, FAQPage JSON-LD, and `/md/faq` now expose the settled prices without a second price store.
- Reconciled the visible safety disclaimer and Markdown mirror: medical decisions belong only to the guest and their qualified healthcare professional; Paul's human review is not medical advice, clearance, or a suitability/safety guarantee.
- Replaced four static FAQ safety/eligibility answers (first-time guests, menstrual cycle, regular cannabis use, and women travelling alone) with deterministic human-review boundaries. The shared data feeds visible FAQ copy, JSON-LD, and `/md/faq`.
- Expanded `audit:facts` from 41 pre-run checks / 48 after this run's additions. New checks enforce canonical FAQ pricing, reject the old Paul-medication-decision wording, require the human-review boundary, and prevent hardcoded availability assertions.
- Updated `DECISIONS.md` and `OPEN-QUESTIONS.md` to supersede the earlier assumption that the plant-count conflict was no longer live.

Implementation commit:

```text
9d016853bdbfe112ad6ff5452fed9ee4c1772301 fix: reconcile public facts and human review boundaries
```

### Verification

Commands executed after the final implementation changes:

| Command/check | Observed result |
|---|---|
| `npm ci` | PASS — 368 packages installed; 369 audited; 0 vulnerabilities. npm emitted a non-failing `allow-scripts` notice for `unrs-resolver@1.12.2`. |
| `npm run lint` | PASS — exit 0, no findings. |
| `npx tsc --noEmit` | PASS — exit 0, no findings. |
| `npm run typecheck` | PASS — scripts TypeScript check, exit 0. |
| `npm run audit:facts` | PASS — 48/48. Node emitted the pre-existing documented `MODULE_TYPELESS_PACKAGE_JSON` warning for `facts.ts`. |
| `npm run build` | PASS — Next.js 16.3.1 production build, 13 routes generated. |
| `SMOKE_TEST_BASE_URL=http://localhost:3187 npm run smoke-test` | PASS — 16/16 routes. |
| Rendered-content assertions | PASS — homepage, FAQ, `/llms.txt`, `/md/faq`, and `/md/safety-preparation` contain the new canonical price, availability, and human-review wording. |
| `npm audit` | PASS — 0 vulnerabilities. |
| `git diff --check` | PASS. |
| Placeholder scan on changed implementation/docs | PASS — no TODO, TBD, placeholder, lorem, or ipsum markers found. |

Local browser verification used the production build at `http://localhost:3187`:

- Desktop 1280×720: homepage/availability and FAQ pricing accordion rendered correctly; no horizontal overflow.
- Mobile 390×844: homepage/availability and FAQ pricing accordion rendered correctly; no horizontal overflow.
- All 12 remaining window cards displayed "Verify with Paul."
- The Terms gate opened, linked to `/terms-and-conditions`, kept Continue disabled until its checkbox was selected, and then enabled Continue. The final `mailto:` action was deliberately not triggered.
- Browser console warnings/errors: none.
- One initial browser harness wait using `networkidle` was rejected as unsupported by that harness; the test was rerun with the supported `load` state and passed. This was not an application failure.

### NOT RUN

- Vercel preview deployment / remote workflow: **NOT RUN — requires pushing a branch, which is prohibited at STOP A.**
- Production verification of these changes: **NOT RUN — changes are local only and were not deployed.**
- Live AI-system answer audit: **NOT RUN — not required to verify Run A's deterministic source changes and not performed.**
- ChatGPT Site Tools / WebMCP: **NOT RUN — Run C scope.**
- Run B: **NOT STARTED — STOP A requires separate human authorization.**

### STOP A state

- Branch: `chore/fact-reconciliation`
- Base SHA: `33ece229d8f81b3e365e0a2ecca0878832e71962`
- Implementation SHA: `9d016853bdbfe112ad6ff5452fed9ee4c1772301`
- Pre-existing user-owned change still present and excluded: `AGENTS.md`
- No push, PR, merge, or deployment occurred.

## Authorized continuation — confirmed facts and delivery

The earlier `STOP A` snapshot above records the state before Andrew supplied
direct human confirmation. On 2026-08-27, Andrew explicitly authorized the
mission to continue through Run A, Run B, and Run C, including focused pushes,
pull requests, merges after successful checks, normal Vercel production
deployment, and production verification. That authorization supersedes the
earlier no-push boundary for this mission; the human-led safety constitution
remains unchanged.

### Human-confirmed resolutions

- Dreamglade currently offers **five** master plant dietas: Marosa, Ajo Sacha,
  Bobinsana, Clavo Huasca, and Planta de Vida.
- Machinga is not currently offered and must not appear in current public or
  AI-facing source material.
- The Dominga/Raúl biography from PR #15 is approved: they are a married
  Shipibo ceremonial couple from Vista Alegre, a small village upriver from
  Pucallpa, and have shared more than 40 years of life, family, and service to
  their community.

These direct human confirmations replace the `UNRESOLVED` and `HOLD` statuses
in the earlier Fact Conflict Report.

### Continuation implementation

- Centralized the approved healer relationship, community, shared history, and
  full biography in `src/lib/facts.ts`; the homepage and FAQ-derived structured
  surfaces now use that source.
- Changed the canonical plant count from six to five, removed Machinga from the
  canonical list, removed its public plant card, and generated plant copy from
  the canonical facts where appropriate.
- Updated current AI-answer fixtures and trust-layer tickets to expect five
  plants and flag the superseded six-plant/Machinga claims.
- Expanded `audit:facts` from 48 to 51 checks. It now requires the approved
  healer facts and rejects both the six-plant claim and Machinga in current
  application/component/library source.
- Added a dated decision entry and removed the resolved plant-count question
  from `OPEN-QUESTIONS.md`.

### Continuation verification

| Command/check | Observed result |
|---|---|
| `npm ci` | PASS — 368 packages installed; 369 audited; 0 vulnerabilities. The existing non-failing allow-scripts notice for `unrs-resolver@1.12.2` remained. |
| `npm run lint` | PASS — exit 0, no findings. |
| `npx tsc --noEmit` | PASS — application TypeScript check, exit 0. |
| `npm run typecheck` | PASS — scripts TypeScript check, exit 0. |
| `npm run audit:facts` | PASS — 51/51. The pre-existing non-failing `MODULE_TYPELESS_PACKAGE_JSON` warning remained. |
| `npm run build` | PASS — Next.js 16.3.1 production build; 13 routes generated. |
| `SMOKE_TEST_BASE_URL=http://localhost:3188 npm run smoke-test` | PASS — 16/16 routes. |
| Rendered-source assertions | PASS — `/faq`, `/master-plants`, `/what-to-expect`, `/llms.txt`, and `/md/faq` expose the five-plant facts; Machinga is absent from all checked current routes; the homepage, FAQ, and `/md/faq` expose the approved healer facts. |
| `npm audit --audit-level=high` | PASS — 0 vulnerabilities. |

Local browser verification used the production build at
`http://localhost:3188`:

- Desktop 1280×720: homepage rendered correctly, included the approved healer
  biography, and had no horizontal overflow.
- Mobile 390×844: homepage, FAQ, master-plants, and what-to-expect rendered
  without horizontal overflow.
- The master-plants page contained exactly the five approved plant headings:
  Marosa, Ajo Sacha, Bobinsana, Clavo Huasca, and Planta de Vida; Machinga was
  absent.
- Browser console warnings/errors: none.

### Continuation verdict before remote delivery

**GO.** The previously unresolved facts now have direct human confirmation,
the current public and AI-facing sources agree, the human-only medical,
screening, booking, payment, and communication boundaries remain intact, and
all local checks pass. Remote PR/CI, merge, and production evidence is recorded
below once completed.

### Remote delivery and production evidence

- Pull request: [#21](https://github.com/AndrewRaf86/dreamglade-website/pull/21)
- PR head: `3049dfa0b6f5ebd95cdb9dfc11908b446aa9a0d2`
- Merge commit: `e4c938ddff606ad5e0a5170c5a921041308c8e23`
- GitHub CI `build`: PASS (29 seconds).
- Vercel preview: PASS.
- Production deployment: `dpl_BAKEQhwL7N75wiJshAGeSm5WnCMN`, target
  `production`, status `Ready`, aliased to `dreamglade.com` and
  `www.dreamglade.com`.
- Direct production checks returned HTTP 200 with expected content types for
  `/`, `/faq`, `/master-plants`, `/what-to-expect`, `/llms.txt`, and `/md/faq`.
  The five-plant facts were live, Machinga was absent, and the approved healer
  biography was live on the intended surfaces.
- Production browser checks at 1280×720 and 390×844 found no horizontal
  overflow or console warnings/errors. The live master-plants page contained
  exactly the five approved plant headings.
- Vercel error-log scan for the production deployment over the prior hour:
  no logs found; no runtime errors observed during verification requests.

**Final Run A verdict: GO — merged and verified in production.**
