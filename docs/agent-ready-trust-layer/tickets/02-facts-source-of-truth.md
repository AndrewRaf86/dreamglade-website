# Ticket 2 — Create the public facts source of truth

**Status: ✅ Complete.** `src/lib/facts.ts` implemented per schema, with
source-page references and a `volatileFacts` list added. `tsc --noEmit` and
`eslint` both clean.

## Objective
Add `src/lib/facts.ts`, a single typed module holding Dreamglade's verified
public facts, following the existing `src/lib/pricing.ts` pattern.

## Why it matters
Every other ticket in this epic (llms.txt, markdown mirrors, consistency
audit, prompt fixture) reads from this module. Getting the shape right once
avoids rework later.

## Files likely to change
- `src/lib/facts.ts` (new)

## Dependencies
Ticket 1 (confirmed facts to encode).

## Implementation tasks
- [ ] Create `src/lib/facts.ts` per the schema in `TECHNICAL-SPEC.md` §1.
- [ ] Do **not** duplicate pricing numbers — reference `pricing.ts` by import
      or comment, not by copying `$200/$210/$220`.
- [ ] Use `as const` for literal typing.
- [ ] Add a short top-of-file comment stating this is the source of truth for
      `/llms.txt`, the consistency audit, and any future markdown mirror —
      so a future editor understands why it exists before changing it.
- [ ] Do not import anything from `next`, `react`, or any JSX-requiring
      module — this file must be importable by a plain Node script
      (`scripts/audit-facts.ts`, ticket 5) without a bundler.

## Validation commands
```bash
npm run build
npm run lint
npx tsc --noEmit
```

## Browser checks
None — this file has no UI surface on its own.

## Edge cases
- If a fact has a caveat or exception (e.g. departure transport only for
  flights after 3 PM), encode the caveat in the value itself, not as a
  separate undocumented assumption — see the `transport.departureAirportDropoff`
  shape in the tech spec for the pattern to follow.

## Acceptance criteria
- [ ] `src/lib/facts.ts` exists, builds, lints clean, and matches the schema
      in `TECHNICAL-SPEC.md` §1.
- [ ] Every fact in it traces back to a specific line in an existing page,
      confirmed during ticket 1.
- [ ] No pricing numbers are duplicated outside `pricing.ts`.

## Out of scope
- Wiring this into `/llms.txt` or any page (tickets 3–6).
- Refactoring existing pages to import from `facts.ts` — pages keep their own
  prose; `facts.ts` is a reference module, not a replacement for page copy.
