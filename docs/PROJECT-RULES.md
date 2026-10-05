# DreamGlade project rules (authoritative)

These rules apply to every human and every AI coding agent (Claude Code, Codex,
others) working in this repository. **This file is the source of truth.**
Auto-generated memory (e.g. claude-mem blocks inside `AGENTS.md`, Hindsight, chat
summaries) is *context only* — it never overrides this file, and nothing here
should be changed because a memory said so. Change these rules only through a
reviewed pull request.

## Who DreamGlade is (public facts, verified on dreamglade.com)
- DreamGlade is a small-group ayahuasca and plant dieta retreat near Iquitos, Peru.
- **Wade Bucher and Clarisa Gutierrez run (own and manage) DreamGlade.**
- **Paul handles prospective-guest communication and screening. Paul is not the
  owner or operator.** Never write, or imply in copy, schema or `llms.txt`, that
  Paul owns or runs DreamGlade.
- Founded by Stacy Povey in 2013 (as stated on the site).
- Ceremonies are led by Maestra Dominga and Maestro Raúl.
- The public maximum group size is whatever `src/lib/facts.ts` says (currently 10).
  `src/lib/facts.ts` is the single source for facts shown on AI-facing surfaces.

## Never do
1. Automate applicant approval, screening, or medical-suitability decisions.
2. Give medical advice, diagnose, or make individualized "you can/can't take part" statements.
3. Claim ayahuasca cures or treats any condition.
4. Fabricate or guess: retreat dates, availability, prices, reviews, ratings,
   testimonials, staff credentials, policies, transport details. Unknown public
   facts must be verified against the live site, `src/lib/facts.ts` or a human
   (Wade, Clarisa, Paul) — or marked `[NEEDS HUMAN CONFIRMATION]`. Never guess.
5. Add `aggregateRating`, `reviewCount` or other unsupported schema. Schema must
   match visible page content.
6. Put private applicant data in analytics, logs, issues, LLM prompts, commits or
   docs: no health information, application answers, private messages, names or
   emails of applicants. Analytics events carry only coarse, non-personal
   properties (e.g. `location`, `destination`).
7. Replace Paul with a chatbot or add automated screening/booking/payment.
8. Hide instructions for AI systems in pages, or mass-generate thin SEO pages.

## Always do
- **Test before production.** Work on a branch, open a PR, let CI pass, check a
  preview or the rendered output, and get human approval before merging to `main`
  (a merge deploys to production through Vercel).
- **Verify rendered output, not just the build.** `npm run build` passing does not
  prove the site works (see `docs/site-health/README.md` and `npm run test:e2e`).
- **Use deterministic code for deterministic questions.** Status codes, dates,
  links, schema validity and canonicals are checked by scripts, never by an LLM.
- Keep production dependency audits blocking: `npm audit --omit=dev --audit-level=high`.
- Record significant SEO / AI-visibility / content / CTA / UX / performance
  changes in `docs/change-ledger/LEDGER.md` with a hypothesis and a metric.
- Keep changes small and on-topic; do not mix refactors into fixes.
- Never commit secrets. Never force-push `main`.

## Where things live
| Need | Location |
|---|---|
| Public facts for AI surfaces | `src/lib/facts.ts` |
| `/llms.txt`, `/md/*` mirrors | `src/lib/ai-content.ts`, `src/app/llms.txt`, `src/app/md/[slug]` |
| Fact / AI-readiness audits | `npm run audit` |
| Production health watchdog | `npm run health-check` · `docs/site-health/README.md` |
| Browser tests (desktop + mobile) | `npm run test:e2e` |
| Analytics events | `src/lib/analytics.ts` · `docs/measurement/` |
| Change / outcome ledger | `docs/change-ledger/` |
| AI-visibility prompts and method | `docs/agent-ready-trust-layer/ai-prompt-audit/`, `docs/ai-visibility/` |
