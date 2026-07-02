# Dreamglade Website Analytics — A Guide for Andrew, Wade & Clarisa

This is a plain-English guide to the analytics running on dreamglade.com. No technical background needed.

GA4 is connected through the Vercel environment variable NEXT_PUBLIC_GA_MEASUREMENT_ID.

## 1. What Vercel Analytics shows

Vercel Analytics (built into our hosting) is the quick internal check — visits, pages, traffic sources, device type — visible instantly in the Vercel dashboard with no extra setup. It also shows the custom click events listed below. It's the fastest place to sanity-check "is the site getting traffic."

## 2. What GA4 shows

GA4 (Google Analytics 4) is a second, more detailed layer of the same data, sent to a Google Analytics property called **Dreamglade Website**. GA4 shows the same visits and click events, plus more detail on where visitors came from (traffic sources) and where they are (country/city). GA4 is the one that plugs into other Google tools — most importantly Looker Studio (see below).

## 3. Why Looker Studio will be used for Wade/Clarisa's dashboard

Looker Studio is a free Google reporting tool that can build a simple, visual dashboard directly from GA4 data. Once it's connected to the GA4 property, the dashboard updates on its own — nobody has to export or update anything by hand. Wade and Clarisa can just open a link and see current numbers.

## 4. What custom events were added

The same click sends one event to Vercel Analytics and one matching event to GA4:

| Visitor action | Vercel event name | GA4 event name |
|---|---|---|
| Apply click (hero, nav, pricing, footer) | Apply Click | `apply_click` |
| Availability card click | Availability Click | `availability_click` |
| Email click (mailto step) | Email Click | `email_click` |
| WhatsApp click | WhatsApp Click | `whatsapp_click` |
| Safety link click (nav, homepage, footer, FAQ page) | Safety Click | `safety_click` |
| FAQ link click (nav, homepage, footer) | FAQ Click | `faq_click` |
| What to Expect link click (nav, homepage, footer) | Experience Click | `experience_click` |
| Pricing link click (homepage, footer, FAQ page) | Pricing Click | `pricing_click` |
| About link click (hero, nav, footer) | About Click | `about_click` |
| YouTube link click | YouTube Click | `youtube_click` |
| Instagram link click | Instagram Click | `instagram_click` |
| Google Reviews link click | Google Reviews Click | `google_reviews_click` |

Each event also records roughly *where* on the site it happened (e.g. "hero", "nav", "footer", "pricing", "availability"), and for availability clicks, which retreat date range. No other details are attached.

(Note: there is currently no live WhatsApp link on the site — that tracking is wired up and ready, but nothing fires it yet since no such link exists.)

## 5. How to open Vercel Analytics

1. Log in to [vercel.com](https://vercel.com) and open the **Dreamglade** project.
2. Click the **Analytics** tab near the top.
3. Scroll to the **Events** panel to see the custom clicks (Apply Click, Email Click, etc.).

## 6. How to open GA4

1. Log in to [analytics.google.com](https://analytics.google.com).
2. Select the **Dreamglade Website** property.
3. Click **Reports → Realtime** to see live visitors and events right now.
4. Click **Reports → Engagement → Events** to see event totals over time.

## 7. What each event means, in plain terms

- **Apply Click** = interest. Someone is thinking about coming.
- **Email Click** = a real lead. Someone finished the steps and is about to email us.
- **Availability Click** = someone is checking a specific date range.
- **Safety / FAQ / Experience Click** = someone is doing research before deciding.
- **Pricing Click** = someone wants to know the cost — often a sign they're close to applying.
- **About Click** = someone wants to know who runs Dreamglade before trusting it.
- **YouTube / Instagram / Google Reviews Click** = someone wants social proof before trusting us.

## 8. What to check weekly

1. Total visitors this week vs. last week (Vercel or GA4).
2. Number of **Apply Clicks** and **Email Clicks** — are people starting and finishing the inquiry step?
3. Which **Availability Click** date ranges are getting attention.
4. Any big spike or drop compared to a normal week.

## 9. How to interpret the numbers

- A rise in visitors after posting on Instagram/YouTube = that content is working.
- More Apply Clicks than Email Clicks is normal — not everyone who starts finishes right away.
- A date range with a lot of Availability Clicks may be popular, or people may be confused about whether it's open — worth a look either way.
- Lots of Safety/FAQ/Pricing clicks before an Apply Click suggests people are doing real research, which is a good sign.

## 10. What not to overreact to

- **Day-to-day swings.** Traffic naturally jumps around. Look at weekly trends, not single days.
- **A slow week.** Retreat inquiries are seasonal and often driven by word of mouth.
- **Low numbers on brand-new content.** New pages/answers take time to get found and clicked.

## 11. Privacy note

No personal, medical, medication, application, message, email, phone, or WhatsApp details are tracked. Events only record that a click happened, roughly where on the site, and (for availability clicks) which date range — nothing else, in either Vercel Analytics or GA4.

## 12. Suggested weekly report format

```
Week of [date]:
- Visitors: [number] (vs. [last week's number])
- Apply Clicks: [number]
- Email Clicks: [number]
- Most-clicked availability date: [date range]
- Notes: [anything unusual — a spike, a quiet stretch, a popular post]
```

## Links to use when sharing the website

These are the same dreamglade.com link, with a small tag added to the end. The tag helps Google Analytics show where a visitor came from — it does not track any personal details about the person clicking.

- Instagram bio link: `https://dreamglade.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio`
- Instagram story link: `https://dreamglade.com/?utm_source=instagram&utm_medium=social&utm_campaign=story`
- Facebook post link: `https://dreamglade.com/?utm_source=facebook&utm_medium=social&utm_campaign=post`
- Reddit comment link: `https://dreamglade.com/?utm_source=reddit&utm_medium=organic&utm_campaign=comment`
- WhatsApp direct-share link: `https://dreamglade.com/?utm_source=whatsapp&utm_medium=direct&utm_campaign=guest_referral`

How to use them:

- Use the **Instagram bio link** for the link in the Instagram profile.
- Use the **Instagram story link** whenever the website is linked in a story.
- Use the **Facebook link** in Facebook posts.
- Use the **Reddit link** only when Dreamglade comments helpfully on a relevant Reddit thread.
- Use the **WhatsApp link** when sharing the website directly with someone one-on-one.

## Manual steps still needed

These require someone with access to the Google Analytics / Looker Studio account — they are not code changes:

1. Confirm GA4 Realtime reporting shows live visits after this update goes live.
2. Create a Looker Studio report connected to the **Dreamglade Website** GA4 property.
3. Share the Looker Studio report with Wade and Clarisa as **Viewers** (view-only access — no editing).

## Suggested Looker Studio dashboard plan

1. **Total visitors** — how many people came to the site, and whether that's growing week to week.
2. **Top traffic sources** — where visitors came from (Instagram, Google search, direct link, etc.), so we know which channels are working.
3. **Top pages** — which pages get the most views, showing what visitors care about most.
4. **Apply / Email clicks** — how many people started and finished the inquiry step, the clearest sign of real interest.
5. **Availability clicks** — which retreat date ranges people are checking most, useful for planning and follow-up.
6. **Instagram / YouTube / Google Reviews clicks** — how much visitors lean on social proof before trusting the site.
7. **Safety / FAQ / Experience clicks** — how much research people do before applying, a sign of serious intent.
8. **Best source of serious inquiries** — which traffic source (Instagram, Facebook, Reddit, direct, etc.) produces the most Apply/Email Clicks, so future effort can go toward what actually works.
