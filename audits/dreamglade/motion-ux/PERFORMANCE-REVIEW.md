# Dreamglade — Performance Review

**Phase 4 of 5.** Estimated cost of the three Phase 3 prototypes if ported into the
actual Next.js codebase. These are engineering estimates grounded in the real
`package.json` (no animation library, no new dependency needed for any of the three)
and the real prototype file sizes — not guesses.

Baseline context: `page.tsx` is already 678 lines with 12+ sections and ~25 images: it's
a heavy page. Whatever gets added should be additive in the single-digit KB range, not a
new framework.

## Method note

Production versions would **not** ship the raw prototype `.html` files. Each would
become a small `"use client"` React component: the demo-only note banner, inline
comments, and `<html>/<head>` boilerplate all disappear; the actual CSS moves into
`globals.css` (already the pattern for every other component on the site) instead of a
`<style>` tag. Estimates below are for that ported form, referencing the current raw
prototype size as an upper bound.

## Per-prototype estimate

### 1. Animated process stepper

| Metric | Estimate |
|---|---|
| Raw prototype size | 9.4 KB (HTML+CSS+JS combined, includes demo chrome) |
| Production JS added | ~1.0 KB minified (one `IntersectionObserver` + a stagger loop — no new component boundary needed beyond marking `Steps` as a client component, which `apply/page.tsx` doesn't currently need) |
| Production CSS added | ~0.8 KB (extends existing `.step`/`.step__connector` rules already in `globals.css`; mobile spine is new, everything else reuses current selectors) |
| New images/fonts | None |
| LCP impact | None — this section sits well below the fold on both `apply` and the homepage; not a candidate for LCP element |
| CLS impact | None — `.step` already has fixed padding/border; entrance animates `opacity`/`transform` only, both compositor properties that never affect layout box size |
| INP impact | Negligible — one `IntersectionObserver` callback firing 3–4 times total per page view, not on scroll/input |
| Mobile perf | No change to paint cost; the "connector" is a 1px-wide div, not an image or SVG |

**Verdict: negligible cost.** This is close to free from a performance standpoint.

### 2. Interactive availability timeline

| Metric | Estimate |
|---|---|
| Raw prototype size | 13.0 KB |
| Production JS added | ~2.5 KB minified (date math for 13 windows, DOM generation for month ticks/window buttons, one shared detail panel) — still no dependency, but more logic than the stepper |
| Production CSS added | ~1.2 KB |
| New images/fonts | None |
| LCP impact | None — availability section is far below the fold |
| CLS impact | **Requires care**: the current `.avail-grid` reserves its own height via 13 cards; a horizontal-scroll timeline changes the section's height. Must set an explicit `min-height` on the timeline container matching its rendered height so nothing shifts as the 13 window buttons are generated client-side. This is solvable but must not be skipped. |
| INP impact | Low — click-to-open-detail is a direct user-initiated interaction, response is synchronous (no fetch, no layout thrash); `max-height` transition on the detail panel is the same pattern the FAQ accordion already uses in production today at no measured cost |
| Mobile perf | Horizontal scroll needs `-webkit-overflow-scrolling: touch` (already in the prototype) and should be tested against real touch scroll on the smallest supported viewport; this is the one prototype where a real device pass matters more than a viewport-resize check |

**Verdict: small, manageable cost, but the CLS risk needs an explicit fix (reserve
height) before shipping, not just at prototype stage.**

### 3. Iquitos → Dreamglade journey map

| Metric | Estimate |
|---|---|
| Raw prototype size | 9.6 KB |
| Production JS added | ~1.2 KB minified (`getTotalLength`/`getPointAtLength` are native SVG DOM APIs, zero library cost) |
| Production CSS added | ~0.6 KB |
| New images/fonts | None — the "map" is a single inline `<path>`, not a raster image or a map-tile embed |
| LCP impact | None — page position is mid-page on `what-to-expect`, not the hero |
| CLS impact | None — SVG has a fixed `viewBox` with `width: 100%; height: auto`, which reserves aspect-ratio-based space immediately, before the path or dots render |
| INP impact | None — no user interaction on this component; animation runs once on scroll-into-view |
| Mobile perf | `stroke-dashoffset` and SVG circle `transform` are both compositor/paint operations, not layout — cheap even on low-end mobile GPUs. `getPointAtLength` runs 5 times once, not per-frame |

**Verdict: negligible cost, cleanest of the three from a performance standpoint** —
no dynamic layout, no scroll math, one-time SVG measurement.

## Cross-cutting checks (all three)

- **No new npm dependency** in any of the three — confirmed against `package.json`
  (`next`, `react`, `react-dom`, `@vercel/analytics` only). No GSAP, no Framer Motion,
  no scroll library.
- **`prefers-reduced-motion`** verified in headless Chromium with `reducedMotion: 'reduce'`
  emulation for all three — entrance state resolves to fully-visible with zero
  transition delay in every case (see Phase 3 verification notes).
- **No `will-change` abuse** — none of the three prematurely promote layers; only
  `transform`/`opacity` are animated, which the browser already composites efficiently
  without needing a `will-change` hint at this small a scale.
- **Total estimated production footprint across all three: ~7 KB JS + ~2.6 KB CSS**,
  against a homepage that already ships 25+ full-bleed photographs. This is immaterial
  next to existing image weight — image optimization (already handled by
  `next/image`/`SiteImage`) remains the dominant lever for this site's real-world
  performance, not any of this motion work.

## What would fail this review (for calibration, not because it's proposed here)

The rejected "ambient hero motion" idea from Phase 1 is the useful negative example:
a looping video or particle canvas behind the hero would (a) compete with the hero photo
for the LCP element or delay it, (b) run continuously rather than once, burning
battery/CPU indefinitely rather than a few hundred milliseconds on scroll-in, and
(c) very likely require either a video file (real weight) or `requestAnimationFrame`
particle simulation (real CPU cost) — the two performance costs the brief explicitly
asks to weigh against communication value. That's why it's scored lowest and not
prototyped, consistent with Phase 1.
