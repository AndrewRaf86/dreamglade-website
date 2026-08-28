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

2. **Five or six current master plant dietas?** PR #15 remains open and says
   Machinga should be removed, while current production and `main` publish six
   plants including Machinga. Neither side preserves direct current human
   confirmation. Paul, Wade, or Clarisa needs to confirm whether Dreamglade
   currently works with five or six before this fact is changed or repeated on
   any new surface. See the 2026-08-27 decision-log entry.

## Informational — not blocking, worth knowing

3. **GA4 key events not configured** — unrelated to this project directly
   (surfaced by the Aug 6 audit, requires GA4 admin access Andrew already
   has). Not part of this epic's scope; noting so it isn't lost.

4. **Andrew's pre-production content check** — see `DECISIONS.md`'s
   2026-08-13 "Human review still required before production" entry. Not a
   blocking approval gate, just a recommended final read of
   `src/lib/facts.ts` and `src/lib/safety-markdown.ts` before deploying to
   production.
