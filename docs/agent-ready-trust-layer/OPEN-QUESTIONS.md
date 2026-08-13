# Open Questions — Agent-Ready Trust Layer

Items that need a human decision (Andrew, Paul, Wade, or Clarisa) before or
during implementation. Move resolved items to `DECISIONS.md` with a dated
entry and remove them from here.

## Needs Wade / Clarisa (low priority — likely no action needed)

1. **Ownership-history framing, if it ever needs restating anywhere new.**
   Current facts (`Stacy Povey` founded 2013, `Wade Bucher` and `Clarisa
   Gutierrez` took over 2023) are already consistent across the live site and
   match what previous sessions confirmed with them. No new claim is being
   added by this project — flagged here only because the Aug 6 audit noted
   this history is now being publicly discussed (Reddit) and any *new*
   surface repeating it (like `/llms.txt`) should not say anything beyond
   what's already approved and live.

## Informational — not blocking, worth knowing

2. **Historical plant-count discrepancy** — see `DECISIONS.md`'s 2026-08-12
   entry. Current six-plant copy is internally consistent and treated as
   correct; a one-line confirmation of *why* it went from a proposed five
   back to six would close this out fully but isn't required to proceed.

3. **GA4 key events not configured** — unrelated to this project directly
   (surfaced by the Aug 6 audit, requires GA4 admin access Andrew already
   has). Not part of this epic's scope; noting so it isn't lost.

4. **Andrew's pre-production content check** — see `DECISIONS.md`'s
   2026-08-13 "Human review still required before production" entry. Not a
   blocking approval gate, just a recommended final read of
   `src/lib/facts.ts` and `src/lib/safety-markdown.ts` before deploying to
   production.
