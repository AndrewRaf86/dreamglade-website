# Dreamglade — Motion & UX Audit

**Phase 1 of 5.** Audit only — nothing in this document changes the live site.
Scope: `src/app/page.tsx` (home), `what-to-expect`, `faq`, `apply`, `safety-preparation`,
`terms-and-conditions`, `src/components/*`, `src/app/globals.css`.

## What this site actually is

Dreamglade is a small-group ayahuasca retreat in the Peruvian Amazon. The audience is
mostly first-time or cautious visitors doing real research before a serious, personal,
health-sensitive commitment — not comparison-shopping a commodity product. The existing
copy leans hard into "not a corporate retreat brand," "no automated screening, no funnel,"
"Paul reads every inquiry personally." That framing is a conversion asset. **Any motion
recommendation that makes the site feel slicker at the cost of feeling more corporate or
more like a SaaS funnel is a net loss for this business, even if it scores well on
generic UX metrics.** This constraint shaped every recommendation below.

Two hard boundaries carried over from the client conversation, restated here so this
document stands on its own:
1. Nothing changes the inquiry form, the `mailto:booking@dreamglade.com` flow, or
   anything Paul handles by email.
2. No chatbot, anywhere.

## Current state — what's already there

The site is Next.js 16 / React 19, no animation library, no client-side router
transitions. Custom CSS design tokens in `globals.css` (not default Tailwind). Existing
interactivity is minimal but well-executed:

- `FAQItem.tsx` — accordion via `max-height` transition (380ms ease), used on 30+ FAQ
  entries and the homepage FAQ preview.
- `Nav.tsx` — scroll-state class toggle (background/blur on scroll), mobile menu
  open/close.
- `TermsGateCTA.tsx` — a focus-trapped, keyboard-accessible modal gating every "Apply"
  CTA behind a Terms & Conditions checkbox before handing off to `mailto:`.
- Hover states throughout: image `scale(1.02–1.04)` on portraits/gallery, `translateX`
  arrow nudges on links, border-color transitions on cards.
- Zero scroll-triggered animation, zero SVG illustration, zero data visualization,
  zero count-up/reveal effects anywhere on the site today.

So the brand voice is "quiet, editorial, warm, unhurried" — Cormorant Garamond italic
serif headings, generous whitespace, muted forest/gold/cream palette, photography-led.
Motion added on top of this needs to read as an extension of that calm, not a jolt of
"modern SaaS" energy.

## Where users actually get confused or hesitate (grounded in the codebase + your own analytics doc)

- **Availability windows.** `docs/dreamglade-analytics-guide.md` already flags this
  directly: *"A date range with a lot of Availability Clicks may be popular, or people
  may be confused about whether it's open."* The current `.avail-grid` renders 13 flat
  cards, each showing one multi-week window with copy like *"A new retreat begins every
  week... guests join Monday or Friday and stay 5 nights up to 2 weeks, not the whole
  window."* That's a genuinely confusing structure (window ≠ stay length) explained only
  in prose, repeated per-card.
- **Getting from Iquitos to the property.** `what-to-expect/page.tsx` and the FAQ both
  carry dense paragraphs about: meet at a city point at 1pm → ~1hr by 4x4 past Moralillo
  → no public route → cash-in-soles advice for taxis → drop-off timing on departure.
  This is exactly the kind of real, practical anxiety ("how do I actually get there and
  back") that a wall of text handles worse than a simple visual.
- **The apply/inquiry process.** `apply/page.tsx` already has a 3-step `.steps` grid
  (Apply → Review → Conversation) with a `.step__connector` arrow — but the connector is
  `display: none` below 760px, so mobile visitors (the majority, on a site like this) see
  three disconnected boxes with no sense of sequence. This sits directly on top of the
  single highest-leverage moment on the site.
- **Medication/contraindication screening.** `safety-preparation/page.tsx` and the FAQ
  carry the heaviest, most legally/medically sensitive content on the site (SSRI/MAOI
  interactions, psychiatric history, etc.) as long undifferentiated bullet lists. This is
  also plausibly where anxious first-timers bounce — not because the content is wrong,
  but because it arrives as a wall of clinical text with no pacing.
- **Pricing.** Three tambo tiers (communal/two-person/private) differ mainly on privacy
  and price, already laid out as three cards — reasonably clear already, lower priority.

## Opportunity scoring

Scored 1–10. Conversion Impact and Comprehension: higher is better. Performance Risk and
Implementation Difficulty: **higher is worse**. Mobile Suitability: higher is better.

| # | Opportunity | Category | Conversion | Comprehension | Perf risk | Impl. difficulty | Mobile |
|---|---|---|:-:|:-:|:-:|:-:|:-:|
| 1 | Animated apply process stepper (Apply→Review→Conversation, with a real mobile connector) | Animated process explanation | 9 | 7 | 1 | 2 | 9 |
| 2 | Interactive availability timeline (replaces the 13 flat cards) | Interactive timeline | 8 | 9 | 3 | 5 | 8 |
| 3 | Iquitos→Dreamglade journey map | Maps / journey visualization | 7 | 9 | 2 | 4 | 8 |
| 4 | Progressive-reveal medication/contraindication screening | Progressive-reveal education | 6 | 8 | 2 | 3 | 8 |
| 5 | Pricing comparison (3 tambo tiers) as an interactive compare view | Interactive comparison graphic | 6 | 6 | 2 | 4 | 7 |
| 6 | Count-up trust stats (5.0★/182 reviews, 25 hectares, max 10 guests, 40 yrs lineage) | Animated statistics | 6 | 4 | 1 | 2 | 9 |
| 7 | Scroll-driven "rhythm of the week" narrative (ceremony nights → off-days → the land) | Scroll-driven storytelling | 5 | 6 | 4 | 6 | 6 |
| 8 | Gallery hover/lightbox motion polish | Progressive reveal (minor) | 2 | 1 | 3 | 3 | 7 |
| 9 | Subtle ambient hero motion (rain/mist loop on the existing hero photo) | Lightweight hero animation | 3 | 1 | 6 | 5 | 5 |

Two of the prompt's categories are deliberately **not** represented above:

- **UI/product simulation** — there's no product/software UI to simulate; forcing this
  in (e.g., a fake "booking calendar" widget) would misrepresent the actual process,
  which is explicitly manual and personal ("no automated screening, no funnel"). Rejected
  as inapplicable rather than scored low.
- **Literal before/after explanations** — nothing on the site is naturally a before/after
  comparison (it's not a visual transformation product like fitness/dental). Forcing a
  before/after slider would feel borrowed from an unrelated industry. Rejected as
  inapplicable.

## Ranking by expected business impact

1. **Animated apply process stepper** — highest conversion leverage, lowest cost. Fixes
   a real mobile gap (missing connector) at the exact moment someone decides to apply.
2. **Interactive availability timeline** — directly answers a confusion your own
   analytics doc already named. Second-highest expected impact, moderate cost.
3. **Iquitos→Dreamglade journey map** — reduces genuine pre-booking logistics anxiety
   using content that already exists in prose; just needs a clearer shape.
4. **Progressive-reveal medication screening** — high comprehension value, but must be
   handled carefully given medical/legal sensitivity (see Phase 5 accessibility notes).
5. **Pricing comparison** — solid but the current 3-card layout already works reasonably
   well; smaller marginal gain.
6. **Count-up trust stats** — cheap and safe, but low comprehension value; a "nice to
   have," not a priority.
7. **Scroll-driven weekly-rhythm narrative** — appealing but higher implementation cost
   and moderate performance risk (multiple pinned/scroll-linked sections) for a
   comprehension gain the current 3-card layout already delivers adequately.
8. **Gallery motion polish** — decorative, minimal value either way.
9. **Ambient hero motion** — the one candidate that risks doing net harm: any looping
   video/particle effect on a full-viewport hero has real LCP/battery cost, and constant
   motion behind large italic serif type is more likely to feel "trying too hard" than
   atmospheric on a brand built around stillness and quiet. Recommend **against**
   pursuing this further even at prototype stage.

**Phase 3 will prototype opportunities #1, #2, and #3** — the top three by impact, and a
deliberately varied set (a CTA-moment fix, a comprehension fix on a page already flagged
as confusing, and an anxiety-reduction fix on existing but under-visualized content).
