# GA4 funnel measurement-gap report

Date: 2026-10-05 · Scope: what the **current code** can and cannot answer. I had no GA4 or
Search Console access, so nothing below is a traffic number; items marked **[VERIFY IN GA4]**
need a person with access to confirm the setting.

## What is implemented today (from `src/lib/analytics.ts`, `src/app/layout.tsx`)
- GA4 (`gtag`, loaded `afterInteractive` when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set; it is set in production) + Vercel Analytics, same clicks sent to both.
- 13 click events (GA4 names): `apply_click`, `availability_click`, `email_click`, `whatsapp_click` (wired, **no WhatsApp link exists**), `safety_click`, `faq_click`, `experience_click`, `plants_click`, `pricing_click`, `about_click`, `youtube_click`, `instagram_click`, `google_reviews_click`.
- Every event carries only `location` (+ `destination`, and `retreat` on availability cards). No personal data.
- Page views come from GA4 itself (and Vercel). No consent mechanism was found. **[NEEDS HUMAN CONFIRMATION: cookie/consent obligations for EU visitors]**

## How the real visitor journey maps to events
```
traffic source → landing page → /safety-preparation → #availability → /apply → Terms gate → Continue → mailto: (leaves the site)
```
- `apply_click` fires in **two different situations**: nav/footer/pricing links that *navigate to* `/apply`, and the hero/apply buttons that *open the Terms gate*. They are distinguishable only by the `location` property.
- `email_click` (`location`, `destination=booking`) fires when the visitor presses **Continue** in the Terms gate — the last thing the site can see. It is a proxy: opening a mail client does not prove an email was sent.
- Availability cards are `mailto:` links that fire `availability_click` and bypass the Terms gate (a second, ungated route to Paul's inbox).
- **Footer `mailto:` and both `tel:` links are untracked** (`src/components/Footer.tsx:20-22`; they appear on every page).
- `/safety-preparation` is **one page** covering both Safety and Preparation, so those two audiences cannot be separated by page view.

## Step-by-step classification

| Step | Question | Classification | Notes |
|---|---|---|---|
| **Traffic source** | What sources produce visitors? | **ALREADY AVAILABLE** | GA4 records source/medium/referrer and `utm_*` (UTM links are documented in `docs/dreamglade-analytics-guide.md`). AI answer engines show up as referrals (e.g. chatgpt.com, perplexity.ai) when users click through. Grouping them as one "AI" channel needs a custom channel group → **REQUIRES GA4 configuration** (admin). |
| **Landing page** | Which landing pages produce visitors / Apply intent? | **ALREADY AVAILABLE** | Landing-page dimension exists. Joining it to `apply_click`/`email_click` is done in a GA4 Exploration; it works at DreamGlade's volume. **[VERIFY IN GA4]** event parameters are not usable until registered (next row). |
| (all steps) | Break events down by `location`/`destination`/`retreat` | **REQUIRES GA4 CONFIGURATION** | Custom parameters must be registered as **event-scoped custom dimensions** in GA4 Admin, otherwise they are collected but not reportable. Register: `location`, `destination`, `retreat`. |
| **Safety / Preparation** | Do readers progress to Apply? | **ALREADY AVAILABLE (page level)** | Funnel Exploration: step 1 `page_view` where path = `/safety-preparation`, step 2 `apply_click`/`page_view /apply`, step 3 `email_click`. `safety_click` measures *links to* the page, not reading it. GA4's built-in `scroll` (90%) event is a usable "read to the end" signal **[VERIFY IN GA4: Enhanced measurement → Scrolls is on]**. Safety vs Preparation cannot be separated (one page). |
| **Availability** | How many visitors reach it? | **REQUIRES GA4 EVENT** | The availability grid is a section of the one-page homepage. There is no page view or section-view signal, only `availability_click` (a click on a card — a stronger, rarer signal). One small event fixes this (see taxonomy). |
| **Apply** | How many reach Apply? | **ALREADY AVAILABLE** | `page_view` `/apply` + `apply_click` (split by `location` once registered). |
| **Email / application transition** | How many reach the final handoff? | **REQUIRES GA4 KEY EVENT CONFIGURATION** (+ one **DIFFICULT / UNRELIABLE** limit) | `email_click` exists but is not marked as a **key event** **[VERIFY IN GA4; OPEN-QUESTIONS item 2 says not configured]**. Footer mailto/tel clicks are not tracked at all (**REQUIRES GA4 EVENT**). Whether an email was actually *sent* is invisible to any web analytics (**DIFFICULT / UNRELIABLE**; PostHog would not see it either). |
| **Mobile vs desktop** | Does mobile perform worse? | **ALREADY AVAILABLE** | Device category is a standard dimension; compare `email_click` rate per device in an Exploration. |
| **Serious visitors** | Which sources send serious people? | **WOULD BENEFIT FROM POSTHOG (marginally)** | Needs source × device × multi-step conversion in one view with per-visitor paths. GA4 Explorations can do it; PostHog makes it easier and avoids thresholding. See `posthog-and-openseo-decisions.md`. |

## Your questions, answered with what exists today
| Question | Answerable today? |
|---|---|
| What sources produce serious visitors? | Yes, after registering custom dimensions + marking `email_click` a key event. "Serious" = a session with `email_click`. |
| Which landing pages produce Apply intent? | Yes (landing page × `apply_click`). |
| Do Safety readers progress toward Apply? | Yes, at page level. |
| Do Preparation readers progress toward Apply? | **No, separately** — same page as Safety. |
| How many reach Availability? | **No** (clicks only) until the section-view event is added. |
| How many reach Apply? | Yes. |
| How many reach the final email/application transition? | Partly: Terms-gate "Continue" and availability-card clicks yes; footer email/phone no; "email actually sent" never. |
| Does mobile perform worse? | Yes. |

## Smallest event taxonomy (no duplicates of existing events)
Existing events stay unchanged. Add only:

| # | Event | Params | Fired when | Why |
|---|---|---|---|---|
| 1 | `section_view` | `section` = `availability` \| `pricing` | Once per page load when ≥50% of `#availability` / `#pricing` enters the viewport (IntersectionObserver; the repo already uses it in `ProcessSteps`/`JourneyMap`) | Answers "how many reach Availability / Pricing". |
| 2 | existing `email_click` (new call site) | `location=footer`, `destination=booking` | Footer `booking@dreamglade.com` link | Closes the untracked contact path using the **existing** event name. |
| 3 | `phone_click` | `location=footer` | Footer `tel:` links | The only genuinely new name besides #1; phone numbers are a contact path. |

Optional, lower priority (P3): `faq_expand` with the question's *index* (not text) to learn which questions matter.
Deliberately **not** added: any form/answer capture, `application_start` (the application is an email, nothing to start on-site), per-section scroll depth.

## Exactly what you (account owner) must do in GA4 — I cannot do these
1. **Admin → Data display → Custom definitions → Create custom dimension** (scope: *Event*) for each parameter: `location`, `destination`, `retreat`.
2. **Admin → Data display → Events → mark as key event:** `email_click` (primary), `apply_click` (secondary), `availability_click` (secondary). After the optional events ship, add `phone_click`.
3. **Admin → Data collection → Data filters:** define your own IPs as *internal traffic* and activate the filter, so site testing doesn't count.
4. **Admin → Data streams → Enhanced measurement:** confirm *Page views*, *Scrolls*, *Outbound clicks* are on.
5. (Optional) **Admin → Channel groups:** add an "AI assistants" group matching sources chatgpt.com, perplexity.ai, gemini.google.com, claude.ai, copilot.microsoft.com.
6. Build one **Funnel exploration**: `session_start/landing` → `page_view /safety-preparation` → `page_view /apply` → `apply_click` → `email_click`, broken down by device category and source/medium.
7. Decide the consent/cookie question for EU visitors (legal/owner decision).
8. Connect **Search Console** to GA4 (Admin → Product links) and confirm Search Console ownership of `dreamglade.com` (both `www` and apex are now one host).

## Caveats
- Low-traffic sites: GA4 may apply thresholding to small segments; read funnels as directional, per `docs/change-ledger/README.md` rules.
- A `mailto:` click is intent, not a sent email. For true conversion, reconcile with Paul's inbox (human process) rather than inventing a metric.
