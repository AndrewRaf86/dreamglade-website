# Follow-up: Migrate images to `next/image`

**Status:** Not started. Logged as a follow-up, not implemented in this pass (out of scope — this pass was image cleanup + CTA fix only).

## Why this still matters

This was originally flagged as DG-011 in the audit backlog (`data/prioritized-backlog.csv`). Running `npm run lint` (added in this pass) now surfaces it directly and repeatedly:

```
37 problems (0 errors, 37 warnings)
```

All 37 warnings are `@next/next/no-img-element` — one for every plain `<img>` tag on the site. Confirmed via `grep -rn "from 'next/image'" src/` → zero results. The site currently gets none of Next's automatic responsive `srcset`, automatic WebP/AVIF format negotiation, or built-in lazy-loading below the fold.

## Why it's a real risk, not just a lint nag

The image-cleanup pass in this same session removed 467MB of unused photos and fixed one specific oversized hero image, but the structural cause is still in place: **any new photo added to the site in a plain `<img>` tag ships at its raw upload size with no automatic optimization.** Without `next/image`, the next content update is one dropped-in photo away from repeating the exact 5MB-hero-image problem this project already had to fix by hand.

## Where the warnings are (from `npm run lint`)

- `src/app/page.tsx` — hero image, healer portraits, gallery strip (12 images), pricing-adjacent photos (13 occurrences)
- `src/app/safety-preparation/page.tsx` (2)
- `src/app/what-to-expect/page.tsx` (6)
- `src/components/Footer.tsx` — logo (1)
- `src/components/Nav.tsx` — logo (1)
- `src/components/PricingSection.tsx` — tambo tier photos (3)

## Recommended approach (for a future pass)

1. Start with the highest-traffic, highest-byte-weight images first: the homepage hero and the 12-image gallery strip (`src/app/page.tsx`) — these already correctly use `loading="lazy"` on the gallery, so migrating them to `<Image>` is mostly adding explicit `width`/`height`/`sizes` rather than a behavior change.
2. Migrate the two page-specific heroes (`/apply`'s `lake-from-bighouse.jpg`, `/what-to-expect`'s `sauna.jpg`) next — same treatment previously applied manually to `maloka-exterior.jpg`.
3. Logo/icon images (`Nav.tsx`, `Footer.tsx`) are small and low-risk — fine to do last or skip if `next/image`'s overhead isn't worth it for a already-small SVG/PNG.
4. After migrating, re-run `npm run lint` — the warning count should drop to 0 as each file is converted, giving a clean, verifiable completion signal.
5. Re-run Lighthouse on `/`, `/apply`, and `/what-to-expect` afterward to confirm the LCP improvement (these three pages had the worst measured load times in `PERFORMANCE-AUDIT.md`).

## Not done in this pass because

This is a genuine code-structure change (every `<img>` touched, `width`/`height` need to be sourced or measured for each asset) — larger and riskier than the image-cleanup and CTA fixes actually requested, and the user's instructions for this pass were explicit: "Do not redesign unrelated parts of the website." Logged here as requested instead.
