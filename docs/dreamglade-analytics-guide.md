# Dreamglade Website Analytics — A Guide for Andrew, Wade & Clarisa

This is a plain-English guide to the analytics running on dreamglade.com. No technical background needed.

## 1. What Vercel Analytics is for

Vercel Analytics (built into our hosting) is the quick internal check — visits, pages, traffic sources, device type — visible instantly in the Vercel dashboard with no extra setup. It's the fastest place to sanity-check "is the site getting traffic."

## 2. What GA4 is for

GA4 (Google Analytics 4) is a second, more detailed layer of the same data, sent to a Google Analytics property called **Dreamglade Website**. GA4 is the one that plugs into other Google tools — most importantly Looker Studio (see below).

## 3. Why Looker Studio will be used for Wade/Clarisa's dashboard

Looker Studio is a free Google reporting tool that can build a simple, visual dashboard directly from GA4 data. Once it's connected to the GA4 property, the dashboard updates on its own — nobody has to export or update anything by hand. Wade and Clarisa can just open a link and see current numbers.

## 4. What events are tracked

The same click sends one event to Vercel Analytics and one matching event to GA4:

| Visitor action | Vercel event name | GA4 event name |
|---|---|---|
| Apply click (hero, nav, pricing) | Apply Click | `apply_click` |
| Availability card click | Availability Click | `availability_click` |
| Email click (mailto step) | Email Click | `email_click` |
| WhatsApp click | WhatsApp Click | `whatsapp_click` |
| Safety page link click | Safety Click | `safety_click` |
| FAQ page link click | FAQ Click | `faq_click` |
| What to Expect link click | Experience Click | `experience_click` |
| YouTube link click | YouTube Click | `youtube_click` |
| Instagram link click | Instagram Click | `instagram_click` |
| Google Reviews link click | Google Reviews Click | `google_reviews_click` |

Each event also records roughly *where* on the site it happened (e.g. "hero", "pricing", "availability"), and for availability clicks, which retreat date range. No other details are attached.

(Note: there is currently no live WhatsApp link on the site — that tracking is wired up and ready, but nothing fires it yet since no such link exists.)

## 5. What each event means, in plain terms

- **Apply Click** = interest. Someone is thinking about coming.
- **Email Click** = a real lead. Someone finished the steps and is about to email us.
- **Availability Click** = someone is checking a specific date range.
- **Safety / FAQ / Experience Click** = someone is doing research before deciding.
- **YouTube / Instagram / Google Reviews Click** = someone wants social proof before trusting us.

## 6. What to check weekly

1. Total visitors this week vs. last week (Vercel or GA4).
2. Number of **Apply Clicks** and **Email Clicks** — are people starting and finishing the inquiry step?
3. Which **Availability Click** date ranges are getting attention.
4. Any big spike or drop compared to a normal week.

## 7. How to interpret the numbers

- A rise in visitors after posting on Instagram/YouTube = that content is working.
- More Apply Clicks than Email Clicks is normal — not everyone who starts finishes right away.
- A date range with a lot of Availability Clicks may be popular, or people may be confused about whether it's open — worth a look either way.

## 8. What not to overreact to

- **Day-to-day swings.** Traffic naturally jumps around. Look at weekly trends, not single days.
- **A slow week.** Retreat inquiries are seasonal and often driven by word of mouth.
- **Low numbers on brand-new content.** New pages/answers take time to get found and clicked.

## 9. Privacy note

No names, emails, phone numbers, WhatsApp numbers, medical info, medication info, application text, or message text are ever tracked — in Vercel Analytics or GA4. Events only record that a click happened, roughly where on the site, and (for availability clicks) which date range — nothing else.

## 10. Manual steps still needed

These require someone with access to the Google Analytics / Looker Studio account — they are not code changes:

1. Confirm GA4 Realtime reporting shows live visits after this update goes live.
2. Create a Looker Studio report connected to the **Dreamglade Website** GA4 property.
3. Share the Looker Studio report with Wade and Clarisa as **Viewers** (view-only access — no editing).

## Suggested weekly dashboard layout (for the Looker Studio report)

- Visitors over time
- Top pages
- Traffic sources
- Countries / cities
- Mobile vs. desktop
- Apply clicks
- Availability clicks
- Email clicks
- WhatsApp clicks
- Safety / FAQ / Experience clicks
- YouTube / Instagram / Google Reviews clicks
