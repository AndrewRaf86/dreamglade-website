# Dreamglade — Implementation Recommendations

**Phase 5 of 5.** Nothing in this document has been applied to production. `src/app/`
and `src/components/` are untouched — only new files exist under
`audits/dreamglade/motion-ux/`. Any of the below requires explicit sign-off before
touching a real page, and even then should land as its own reviewable change, not a
bundle.

---

## 1. Animated apply process stepper

**Existing problem.** `apply/page.tsx` has a 3-step process (`Apply → Review →
Conversation`) with a connector arrow between steps — but `.step__connector` is
`display: none` below 760px (`globals.css:1021`), so mobile visitors, who are most of
this site's traffic, see three disconnected boxes with no sense of sequence, at the
exact page where the single highest-leverage action on the site happens.

**Proposed visual solution.** Desktop keeps the existing connector but the arrow now
draws in (`scaleX` 0→1) as the row scrolls into view instead of appearing instantly.
Mobile gets a real vertical spine connecting numbered circles down the left edge —
new, not previously present in any form.

**Why it should improve comprehension/conversion.** It fixes an actual content gap
(mobile has zero sequence indicator today), not a purely decorative addition. Sequence
is one of the few things motion communicates better than a static layout — three boxes
in a column read as "three separate things," a connected spine reads as "one path, three
short stops," which lowers the perceived effort of applying.

**Prototype.** `prototypes/process-stepper.html` — open directly in a browser, resize to
mobile width, and toggle OS-level reduced-motion to see both states.

**Mobile behavior.** Verified in headless Chromium at 390×844: vertical spine draws in,
numbered circles replace the desktop `01/02/03` styling, each step still fades/lifts in
with an 80ms stagger. No horizontal scroll introduced.

**Performance cost.** ~1.0 KB JS + ~0.8 KB CSS estimated in production form (Phase 4).
No LCP/CLS impact — verified no layout-affecting properties are animated.

**Accessibility considerations.** No new interactive elements — this is a content
sequence, not a widget, so no new focus targets or ARIA roles are introduced. Reduced
motion verified: all steps render immediately visible with zero transition when
`prefers-reduced-motion: reduce` is set (tested via Playwright `reducedMotion: 'reduce'`
emulation — confirmed in Phase 3). Semantic HTML unchanged (still a heading + paragraph
per step).

**Recommendation: SHIP.** Lowest cost, clearest win, fixes a real (not cosmetic) mobile
gap, and directly touches the page where conversion actually happens. This is the one
item in this audit I'd implement first if only one is approved.

---

## 2. Interactive availability timeline

**Existing problem.** The "Availability — 2026–2027" section renders all 13 windows as
permanently-expanded cards. Your own `docs/dreamglade-analytics-guide.md` already flags
this as a live source of confusion ("people may be confused about whether it's open").
The structural fact that a "window" is not the same as a "stay" is currently explained
only in a repeated sentence per card.

**Proposed visual solution.** A single horizontal timeline spanning the full 18-month
range, with open windows shown as filled segments (closed periods as gaps), weekly
tick marks inside each window showing where a Monday/Friday start actually falls, and
one shared detail panel that opens on selection instead of 13 permanently-open cards.

**Why it should improve comprehension/conversion.** Visually encoding "window vs. gap
vs. weekly start inside the window" as a single continuous timeline directly represents
the relationship prose currently has to explain from scratch every time. This is the
opportunity scored highest on comprehension in Phase 1 (9/10) because it maps a spatial
relationship (time) onto a spatial visualization (a timeline) — motion here is
structural, not cosmetic.

**Prototype.** `prototypes/availability-timeline.html` — click or tab+Enter any gold
segment to open the detail panel; horizontal-scroll to see the full 18 months.

**Mobile behavior.** Verified: horizontal scroll with `-webkit-overflow-scrolling:
touch`; detail panel opens the same way as desktop (tap instead of click). Content
parity confirmed — the same "Available / dates / weekly cadence / Verify with Paul" info
that lives in today's cards is preserved, not reduced.

**Performance cost.** ~2.5 KB JS + ~1.2 KB CSS estimated. **One real risk flagged in
Phase 4**: switching from a fixed 13-card grid to a client-rendered timeline changes how
section height is determined, which is a CLS risk if not given an explicit reserved
height. This is fixable (set `min-height` on the timeline container) but must not be
skipped when this is actually implemented — it is not yet solved in the prototype file,
which doesn't need to care about surrounding page layout the way production does.

**Accessibility considerations.** Each window is a real `<button>` with
`aria-pressed` and a descriptive `aria-label` (verified reachable and activatable via
Tab + Enter in Phase 3 testing — not simulated, actually driven through a headless
browser). Detail panel reuses the `max-height` accordion pattern already shipped in
`FAQItem.tsx`, so it introduces no new interaction pattern to learn. Reduced motion
verified: windows and the timeline spine render fully visible immediately with
`prefers-reduced-motion: reduce`.

**Recommendation: TEST.** Not SHIP outright — the underlying idea is sound and the
comprehension case is the strongest of the three, but the CLS fix needs to be designed
against the real page layout (not just this isolated prototype) before it goes live, and
a 13-window horizontal-scroll interaction on mobile deserves a real-device check, not
only a viewport-resize check in a headless browser. Worth a build-and-verify pass before
shipping, not a straight ship.

---

## 3. Iquitos → Dreamglade journey map

**Existing problem.** `what-to-expect/page.tsx` and the FAQ both carry the arrival/
departure logistics — meeting point, 1pm cutoff, ~1hr drive, cash-for-taxis advice,
3pm departure cutoff — as dense paragraphs spread across two pages. This is genuine
pre-booking anxiety content (people are asking "how do I actually get there") buried in
prose.

**Proposed visual solution.** A schematic (explicitly labeled as such, not a literal
geographic map) SVG line connecting five stages — fly in, meeting point, the drive,
arrival, departure — with the line drawing in on scroll and each stage getting a short
label beneath, in the same numbered-caption style already used elsewhere on the site
(`.col-item__num`).

**Why it should improve comprehension/conversion.** Turns "read four paragraphs across
two pages to piece together the whole trip" into "see the whole trip in one glance, then
read the paragraph for whichever step you still have a question about." It previews the
existing prose rather than replacing it — the detailed text stays exactly where it is
for anyone who wants the full detail (cash amounts, visa notes, etc.).

**Prototype.** `prototypes/journey-map.html` — scroll into view to see the path draw,
verified via `path.getTotalLength()`/`stroke-dashoffset`, both native SVG APIs.

**Mobile behavior.** Verified at 390×844: SVG scales via `viewBox` + `width: 100%`, text
cards stack to a single column below it. No separate mobile-only code path needed —
same markup, CSS handles the reflow.

**Performance cost.** Cleanest of the three per Phase 4 — no dynamic layout
recalculation, fixed aspect-ratio reserves space immediately (no CLS), animation is
paint-only (`stroke-dashoffset`, `transform` on circles), runs once.

**Accessibility considerations.** SVG carries `role="img"` and a descriptive
`aria-label` summarizing the route for screen reader users, since the visual path itself
conveys no information a screen reader can traverse meaningfully. The real stage detail
(the parts that matter) lives in ordinary HTML text below the SVG, not inside it, so nothing
is screen-reader-inaccessible. Reduced motion verified: path renders with
`strokeDashoffset: 0` (fully drawn) immediately when `prefers-reduced-motion: reduce` is
set.

**Recommendation: SHIP**, with one caveat: before this goes live, get one line of
confirmation from whoever owns the copy (Wade/Clarisa, or Paul if it touches anything
he'd normally clarify by email) that condensing the logistics into 5 short labels
doesn't drop a nuance that matters — e.g., the cash-in-soles advice or the exact 3pm
departure cutoff should still be reachable, either in the stage text or via a "full
details" link back into the existing prose. The mechanism is low-risk; the content
compression is the only thing worth a human check before publishing.

---

## Summary table

| # | Prototype | Verdict | Why |
|---|---|---|---|
| 1 | Process stepper | **SHIP** | Fixes a real mobile gap, near-zero cost, touches the highest-leverage page |
| 2 | Availability timeline | **TEST** | Strongest comprehension case, but needs a CLS fix against real page layout and a real-device mobile check first |
| 3 | Journey map | **SHIP** (with a content-accuracy check) | Cleanest performance profile, previews existing content without replacing it |

## What's explicitly not included here

Opportunity #4 from Phase 1 (progressive-reveal medication/contraindication screening)
scored well on comprehension but touches the site's most legally/medically sensitive
content — it was intentionally left unprototyped in this pass rather than rushed,
pending a separate decision on whether and how to touch that content at all.

## Before anything here goes live

- No production file has been modified as part of this audit.
- Implementing any of the above should be its own change, reviewed on its own, not
  bundled with the others.
- None of this touches the inquiry form, the `mailto:booking@dreamglade.com` flow, or
  anything Paul handles — confirmed by inspection of `TermsGateCTA.tsx` and
  `apply/page.tsx`, neither of which any prototype here modifies or wraps.
- No chatbot is proposed or implied anywhere in this document.
