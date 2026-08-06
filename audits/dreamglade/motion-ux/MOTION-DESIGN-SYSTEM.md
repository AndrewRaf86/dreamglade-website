# Dreamglade — Motion Design System

**Phase 2 of 5.** This extracts the *existing* visual language from `src/app/globals.css`
and formalizes it into motion tokens, rather than importing a generic "SaaS motion kit."
Every value below is either lifted directly from the current CSS or chosen to sit inside
the range the current CSS already uses. Nothing here is a new dependency — it's all
native CSS custom properties plus vanilla JS (`IntersectionObserver`).

## 1. Existing visual language (as-is, unchanged)

**Color** (`:root` in `globals.css`):

| Token | Value | Use |
|---|---|---|
| `--forest` / `--forest-deep` / `--forest-mid` | `#1F3A2E` / `#16291F` / `#2A4A3B` | dark sections, ink |
| `--beige` / `--beige-warm` | `#E8D9BE` / `#DCCA9A` | warm section backgrounds |
| `--cream` / `--cream-warm` | `#FAF7F0` / `#F4EDDB` | primary backgrounds |
| `--brown` / `--brown-dark` | `#6B5444` / `#4A3A2E` | muted text |
| `--gold` / `--gold-deep` | `#C99A3A` / `#7F5614` | accent, CTAs, rules |

Motion should only ever animate **existing** tokens — no new colors introduced for
motion states (no bright "success green," no UI-kit blue focus rings beyond the existing
gold `:focus-visible` outline).

**Typography:** Cormorant Garamond (display/italic, serif) for headings and "lede" text,
Inter for body, JetBrains Mono for small numeric/label accents (`.col-item__num`,
`.step__num` uses display italic instead, `.avail-card` uses display serif for dates).
Any new numerals introduced by motion (timeline dates, count-ups) should use
`var(--font-mono)` to match `.col-item__num`, not invent a new numeral style.

**Spacing:** `--gutter: clamp(20px, 4vw, 56px)`, section padding
`clamp(72px, 9vw, 140px)`. Grids use `clamp()`-based gaps, not fixed breakpoint jumps.

**Radius:** the site is almost entirely **square-cornered** — `.cta-button` and
`.pricing-card` use 1px or 0, `.terms-gate-modal` uses 2px, only small internal callouts
(`border-radius: 4px`) round at all. This is a deliberate editorial/print-like choice.
**New components must not introduce 8–16px "SaaS card" rounding** — stay at 0–4px.

**Imagery:** full-bleed photography with a warm dark gradient overlay on hero/CTA
sections (`.hero__media::after`, `.bleed-cta__media::after`), `object-fit: cover`,
consistent `aspect-ratio` per placement. No illustration, no icon set beyond CSS
pseudo-element glyphs (arrows, dots, plus/minus for FAQ).

## 2. Existing motion values already in production

Pulled directly from `globals.css` — these are the *real* current values, not invented:

| Property | Values already in use |
|---|---|
| Duration | 220ms, 240ms, 280ms, 320ms, 380ms, 800ms, 900ms |
| Easing | `ease` everywhere (no cubic-bezier anywhere in the codebase today) |
| Hover transform | `scale(1.02)`–`scale(1.04)` on images, `translateX(4px)` on link arrows, `translateY(-2px)` on `.video-card` |
| Accordion | `max-height` transition, 380ms, on `.faq-item__panel` |
| Header | `background-color`, `padding`, `border-color` transition, 320ms |

## 3. Motion tokens (proposed, extending the above — not replacing it)

```css
:root {
  /* Duration — reuses the existing scale, adds one micro tier */
  --motion-instant: 120ms;   /* new: focus/press feedback only */
  --motion-fast: 220ms;      /* existing */
  --motion-base: 320ms;      /* existing */
  --motion-slow: 600ms;      /* new: scroll-reveal entrances */
  --motion-ambient: 900ms;   /* existing, for hover image drift */

  /* Easing — one new curve for entrances, everything else stays `ease` */
  --ease-standard: ease;                              /* existing default, unchanged */
  --ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);      /* new: "settle," no bounce/overshoot */

  /* Stagger — for sequences (stepper, timeline items) */
  --motion-stagger: 80ms;
}
```

No spring/bounce easing anywhere. The brand is "grounded," "quiet," "unhurried" by its
own copy — overshoot/bounce easing reads as playful/consumer-app, which actively
contradicts that voice. `--ease-entrance` settles smoothly with no overshoot.

## 4. Behavior rules

**Entrance (scroll into view):** `opacity 0→1` + `translateY(12px)→0` over
`--motion-slow`, `--ease-entrance`. Triggered by `IntersectionObserver` at ~20% visible,
`threshold: 0.2`, fires once (`unobserve` after triggering — content shouldn't
re-animate every time someone scrolls past it, that reads as gimmicky on a second pass).
Sequences (stepper steps, timeline windows) stagger by `--motion-stagger` per item,
capped at 4 items staggered — beyond that, remaining items appear together to avoid a
long, sluggish reveal on content-heavy pages like the FAQ.

**Exit:** Nothing on this site removes content from view on scroll (no page transitions,
no route animation). Exit motion is limited to closing states — FAQ accordion collapse,
modal close — both already implemented in the codebase; new components should reuse the
same `max-height`/`opacity` pattern rather than inventing a new one.

**Hover (desktop, pointer: fine only):** transform/opacity only, `--motion-fast` or
`--motion-ambient` depending on scale (matches existing split between quick link nudges
and slow image drift). Never trigger hover-driven layout shift.

**Touch (mobile/pointer: coarse):** no hover-dependent affordances — anything that
reveals information on hover must also be reachable by tap, matching the existing
`FAQItem` pattern (click/tap toggles state; there is no hover-only content anywhere in
the current codebase, and new components must preserve that).

**Scroll behavior:** entrance-on-scroll only, via `IntersectionObserver`. No
scroll-jacking, no pinned/sticky scroll sections, no scroll-linked video scrubbing —
all of which risk both performance issues and a "trying too hard" feeling on a brand
built around unhurried pacing.

**Mobile behavior:** same entrance animation, shorter travel distance
(`translateY(8px)` instead of `12px`) since viewport height is smaller and large
translate distances feel more abrupt on mobile. Anything currently `display: none` below
a breakpoint for a *connective* element (see `.step__connector`) should get a mobile
equivalent instead of simply disappearing — that's a comprehension gap, not a
simplification.

**`prefers-reduced-motion: reduce`:** every entrance/scroll animation collapses to an
instant, fully-visible state — no fade, no transform, `transition: none`. Hover states
keep their color/border transitions (informational, not motion-for-motion's-sake) but
drop transform-based hover drift. This is a hard requirement enforced in every prototype
in Phase 3, not a nice-to-have:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 5. What this rules out

- Particle effects, animated gradients, glassmorphism blur-heavy panels — all read as
  "generic AI/SaaS template," which is explicitly what this project must avoid.
- Bounce/spring/elastic easing anywhere.
- Autoplaying video or Lottie/After-Effects-style hero animation.
- Any animation that runs continuously/infinitely off-screen-trigger (drains battery,
  adds nothing once the visitor has already seen it).
