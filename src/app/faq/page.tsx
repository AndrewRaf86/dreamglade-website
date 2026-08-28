import type { Metadata } from "next";
import Script from "next/script";
import Nav from "@/components/Nav";
import FAQItem from "@/components/FAQItem";
import TermsGateCTA from "@/components/TermsGateCTA";
import TrackedLink from "@/components/TrackedLink";
import {
  CANNABIS_FAQ_ANSWER,
  CANNABIS_FAQ_QUESTION,
  FAQ_ITEMS,
  FIRST_TIME_FAQ_ANSWER,
  FIRST_TIME_FAQ_QUESTION,
  HEALERS_FAQ_ANSWER,
  HEALERS_FAQ_QUESTION,
  MENSTRUAL_CYCLE_FAQ_ANSWER,
  MENSTRUAL_CYCLE_FAQ_QUESTION,
  PLANT_DIETAS_FAQ_ANSWER,
  PLANT_DIETAS_FAQ_QUESTION,
  PRICING_FAQ_ANSWER,
  PRICING_FAQ_QUESTION,
  SOLO_WOMEN_FAQ_ANSWER,
  SOLO_WOMEN_FAQ_QUESTION,
} from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Dreamglade's small-group ayahuasca retreats near Iquitos, Peru: safety process, ceremonies, cost, transport, accommodation, and integration.",
  alternates: { canonical: "https://dreamglade.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions — Dreamglade",
    description:
      "Common questions about Dreamglade, a small-group ayahuasca retreat near Iquitos, Peru: safety, ceremonies, cost, getting there, accommodation, and integration.",
    url: "https://dreamglade.com/faq",
    images: [{ url: "/images/lake-overview.jpg" }],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FAQ() {
  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>

      <Nav theme="light" />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">Frequently asked questions</span>
          <h1>Common questions <em>before applying.</em></h1>
          <p className="page-hero__sub">
            If your question is not here, write to <strong style={{ color: "var(--cream)" }}>booking@dreamglade.com</strong>. Paul reads every message personally.
          </p>
        </div>
      </section>

      {/* 01 — About Dreamglade */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">01 — About Dreamglade</span>
            <h2 className="display">About <em>Dreamglade.</em></h2>
          </div>
          <div className="faq-list">
            <FAQItem question="Who runs Dreamglade?">
              <p>Dreamglade was founded by Stacy Povey in 2013 and later came under the care of Wade Bucher and Clarisa Gutierrez in 2023. Paul reviews every application personally.</p>
            </FAQItem>
            <FAQItem question="Where is Dreamglade located?">
              <p>Dreamglade is near Moralillo, under an hour&apos;s drive from Iquitos in the Peruvian Amazon. The property is 25 hectares of rainforest lakeside.</p>
            </FAQItem>
            <FAQItem question="How many guests are at a retreat?">
              <p>A maximum of ten guests per retreat. We do not run larger groups.</p>
            </FAQItem>
          </div>
        </div>
      </section>

      {/* 02 — The Ceremonies */}
      <section className="section section--cream-warm">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">02 — The Ceremonies</span>
            <h2 className="display">The <em>ceremonies.</em></h2>
          </div>
          <div className="faq-list">
            <FAQItem question={HEALERS_FAQ_QUESTION}>
              <p>{HEALERS_FAQ_ANSWER}</p>
            </FAQItem>
            <FAQItem question="How many ceremonies will I have, and when?">
              <p>Ceremonies are held on Monday, Wednesday, and Friday nights. The minimum stay of five nights includes three ceremonies (for example, arriving Monday and leaving Saturday morning). A Friday start typically means a six-night stay with three ceremonies, because of the weekend in the middle. The maximum stay of two weeks includes up to six ceremonies.</p>
            </FAQItem>
            <FAQItem question="How long does a ceremony last?">
              <p>Preparation for ceremony begins at 6pm. Ceremony starts shortly after. Each ceremony runs five to six hours, with the healers and a support team present throughout.</p>
            </FAQItem>
            <FAQItem question="How many ceremonies do you recommend?">
              <p>The minimum is three ceremonies. For any deeper, longer-arc work, we strongly recommend five or six.</p>
            </FAQItem>
          </div>
        </div>
      </section>

      {/* 03 — Safety and Screening */}
      <section className="section section--forest">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">03 — Safety and Screening</span>
            <h2 className="display" style={{ color: "var(--cream)" }}>Safety and <em>screening.</em></h2>
          </div>
          <div className="faq-list">
            <FAQItem question="Is Dreamglade right for me?">
              <p>Dreamglade tends to suit people who want a small, quiet, grounded setting and are willing to do real preparation before they arrive. Paul reviews every application personally to talk this through with you.</p>
            </FAQItem>
            <FAQItem question={FIRST_TIME_FAQ_QUESTION}>
              <p>{FIRST_TIME_FAQ_ANSWER}</p>
            </FAQItem>
            <FAQItem question="What is the minimum age?">
              <p>Eighteen. Dreamglade does not accept guests under the age of 18.</p>
            </FAQItem>
            <FAQItem question={MENSTRUAL_CYCLE_FAQ_QUESTION}>
              <p>{MENSTRUAL_CYCLE_FAQ_ANSWER}</p>
            </FAQItem>
            <FAQItem question="What medical conditions or medications need to be disclosed?">
              <p>Guests should disclose current medications, medical history, mental health history, and recent substance use. Paul reviews this information before confirmation and may ask follow-up questions. Dreamglade does not provide medical advice or medical clearance. See <TrackedLink href="/safety-preparation" style={{ color: "var(--gold)", borderBottom: "1px solid var(--gold)" }} event="Safety Click" properties={{ location: "faq-page", destination: "safety" }}>Safety &amp; Preparation</TrackedLink> for the kinds of things we look at most closely.</p>
            </FAQItem>
            <FAQItem question="What medications are a concern with ayahuasca?">
              <p>Ayahuasca contains naturally occurring MAOIs, which can interact dangerously with certain medications and substances. Medication groups that may be unsafe include antidepressants and anxiety medications such as SSRIs and SNRIs, tricyclic antidepressants, MAOIs, stimulants, sedatives, certain prescription pain medications, heart and blood pressure medications, and blood thinners. Cough, cold, and allergy medications may also be relevant, especially formulas containing DXM or pseudoephedrine. This list is not exhaustive. All current and recent medications, supplements, health history, mental health history, and substance use must be disclosed before confirmation.</p>
            </FAQItem>
            <FAQItem question="Do I need to stop my medication before coming?">
              <p>Dreamglade does not advise guests to stop, taper, or change medication. Any medication change — including tapering before a retreat — must be discussed with and supervised by the healthcare professional who prescribed it. Paul reviews disclosures personally, but Dreamglade does not provide medical advice or medical clearance.</p>
            </FAQItem>
            <FAQItem question="Is there a full list of contraindicated medications?">
              <p>There is no single complete public list, because individual health situations vary. Guests must disclose all current and recent medications, supplements, health conditions, mental health history, and substance use. Paul reviews disclosures personally and may ask follow-up questions before confirming whether the next step is appropriate.</p>
            </FAQItem>
            <FAQItem question="Who handles my health information?">
              <p>Paul, our integration support specialist.</p>
            </FAQItem>
            <FAQItem question={CANNABIS_FAQ_QUESTION}>
              <p>{CANNABIS_FAQ_ANSWER}</p>
            </FAQItem>
            <FAQItem question="What about cannabis, alcohol, or recreational substances?">
              <p>Alcohol, cannabis, recreational drugs, and other substances may affect preparation and safety. Guests are asked to disclose substance use honestly during the intake process so Paul can review the situation and ask follow-up questions if needed.</p>
            </FAQItem>
          </div>
        </div>
      </section>

      {/* 04 — Preparation */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">04 — Preparation</span>
            <h2 className="display"><em>Preparation.</em></h2>
          </div>
          <div className="faq-list">
            <FAQItem question="What does the pre-retreat dieta involve?">
              <p>For at least two weeks before arrival, guests are expected to come off processed foods, pork, red meat, alcohol, recreational substances, fermented foods, caffeine and limit salt and sugar. Walks, rest, and hydration are recommended. Most guests find it helpful to spend the last week noting what they are bringing — an intention they can put in writing.</p>
            </FAQItem>
            <FAQItem question="What should I bring?">
              <p>We recommend bringing loose, light clothing for ceremony, natural insect repellent, sandals, a refillable water bottle, a notebook, and a flashlight with a red light feature because it is less disruptive for other guests. All toiletries, including soaps and toothpaste, should be natural. Paul will give you more details once you are confirmed.</p>
            </FAQItem>
          </div>
        </div>
      </section>

      {/* 05 — Logistics and Booking */}
      <section className="section section--cream-warm">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">05 — Logistics and Booking</span>
            <h2 className="display">Logistics and <em>booking.</em></h2>
          </div>
          <div className="faq-list">
            <FAQItem question={PRICING_FAQ_QUESTION}>
              <p>{PRICING_FAQ_ANSWER} <TrackedLink href="/#pricing" style={{ color: "var(--gold)", borderBottom: "1px solid var(--gold)" }} event="Pricing Click" properties={{ location: "faq-page", destination: "pricing" }}>View current pricing.</TrackedLink></p>
            </FAQItem>
            <FAQItem question="What is included in the price?">
              <p>Accommodation in a private, two-person, or communal thatched tambo, all meals, ceremonies, plant dieta, breathwork, sauna, and integration support before and after your stay. Group transport from the designated city meeting point in Iquitos on the first day of your retreat and drop-off to the city of Iquitos and Iquitos airport are included for flights after 3 PM.</p>
              <p>Not included: international and domestic flights, airport pickup on arrival, travel insurance, visas, and vaccinations. Kambo is not included in the daily rate. It may be available as an optional add-on for an additional cost when appropriate, and can be discussed during the inquiry process.</p>
            </FAQItem>
            <FAQItem question="Should I book my flights before my application is confirmed?">
              <p>No — we recommend waiting until Paul has reviewed your application and confirmed your dates before you book flights. Once your place is confirmed and your deposit is in, you can book with confidence.</p>
            </FAQItem>
            <FAQItem question="What is the deposit and cancellation policy?">
              <p>A 50% deposit confirms your place. Cancellations within seven days get your deposit back minus a $100 cancellation fee. Specifics are confirmed in the Stage 2 registration and agreement.</p>
            </FAQItem>
            <FAQItem question="How long can I stay?">
              <p>Minimum five nights (three ceremonies). Maximum two weeks (six ceremonies).</p>
            </FAQItem>
            <FAQItem question="When can I arrive — what start dates are available?">
              <p>Dreamglade does not run fixed-date group retreats. Instead, you can start your stay on a Monday or a Friday. A Wednesday start is sometimes possible under special conditions — ask Paul. Ceremonies are held every Monday, Wednesday, and Friday regardless of when you arrive.</p>
            </FAQItem>
            <FAQItem question="When should I arrive in Iquitos?">
              <p>We strongly recommend arriving in Iquitos one or two nights before your retreat begins. It gives you time to rest after travel and removes the risk of a delayed flight pushing you past the 1 PM transfer to the property. A ceremony is held on the first night of your retreat, so arriving rested matters.</p>
            </FAQItem>
            <FAQItem question="Is transport included?">
              <p>Yes. We pick you up at the designated city meeting point in Iquitos at 1 PM on the first day of your retreat and bring you to the property by 4x4. Drop-off at Iquitos airport is included for departures after 3 PM on the last day. Airport pickup is not included. Uber is available in Iquitos, but it is smart to bring cash in soles in case Uber is not working or a driver asks for cash. Motor taxis from the airport to hotels in Iquitos usually cost about 30–70 soles.</p>
            </FAQItem>
            <FAQItem question="Is airport pickup included?">
              <p>No. Airport pickup when you fly into Iquitos is not included. Uber is available in Iquitos, but it is smart to bring cash in soles in case Uber is not working or a driver asks for cash. Motor taxis from the airport to hotels in Iquitos usually cost about 30–70 soles. You then meet us at the designated city meeting point in Iquitos on your first retreat day.</p>
            </FAQItem>
            <FAQItem question="How do I get to Dreamglade from Iquitos?">
              <p>You make your own way to Iquitos, and we take it from there. After your application is confirmed, we meet you at a designated city meeting point in Iquitos and drive you to the property by 4x4, under an hour from the city. There is no public route to the centre — arrival transport is arranged by us and included.</p>
            </FAQItem>
            <FAQItem question="Can I leave the property during my stay?">
              <p>No — once you arrive at Dreamglade, you stay on the land for the full retreat. We do not run day trips out from the centre. The reason is integration: the work each ceremony opens needs unbroken quiet to settle, and a few hours back in the city undoes a surprising amount of it.</p>
            </FAQItem>
            <FAQItem question="Do I need a visa for Peru?">
              <p>Visa requirements depend on your nationality. Most short-stay tourist visits to Peru do not require a visa in advance, but please confirm against the official Peruvian government source for your country before booking flights.</p>
            </FAQItem>
            <FAQItem question="Do I need vaccinations?">
              <p>Please consult a travel medicine clinic for current recommendations for the Iquitos region. Specific guidance will be included with the Stage 2 registration.</p>
            </FAQItem>
          </div>
        </div>
      </section>

      {/* 06 — During Your Stay */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">06 — During Your Stay</span>
            <h2 className="display">During your <em>stay.</em></h2>
          </div>
          <div className="faq-list">
            <FAQItem question="What are the accommodations like?">
              <p>Guests sleep in private, two-person, or communal thatched tambos, all raised off the ground, with mosquito-screened sleeping and most overlooking the lake or jungle. Comfort is simple and clean rather than luxury: a real bed, quiet, and the forest right outside. Meals and gathering happen at the communal big house.</p>
            </FAQItem>
            <FAQItem question="Is there Wi-Fi or electricity in my room?">
              <p>No. There is no Wi-Fi in guest rooms or anywhere at the centre, by design. Electricity is limited and simple, and the retreat is designed for quiet time away from normal digital life. Most guests find the disconnection is part of what makes the week work. Some cellphone carriers have limited service around the retreat. We have a generator that runs once a day; this is the time to charge your devices.</p>
            </FAQItem>
            <FAQItem question="What food is served?">
              <p>The retreat dieta is light, low-salt, plant-forward, and built around what grows here. Rice, sweet potatoes, yuca, grains and fresh fruit. Nothing fried, and no added sugars.</p>
            </FAQItem>
            <FAQItem question="What is a plant dieta?">
              <p>A plant dieta is not just a food diet. In the Amazonian tradition, it is a quiet period of simplicity, attention, and relationship with a master plant. At Dreamglade, the healers prepare a small tea or plant decoction from the selected master plant, which may be a tree, vine, or shrub, for the guest to drink, and the guest follows a simple retreat rhythm around that work.</p>
            </FAQItem>
            <FAQItem question="Are there other activities besides ceremony?">
              <p>Yes. Plant baths, plant dietas, breathwork, jungle trails to explore and sauna are included.</p>
            </FAQItem>
            <FAQItem question={PLANT_DIETAS_FAQ_QUESTION}>
              <p>{PLANT_DIETAS_FAQ_ANSWER} See <TrackedLink href="/master-plants" event="Plants Click" properties={{ location: "faq-page", destination: "master-plants" }}>Master Plants</TrackedLink> for what each one is known for.</p>
            </FAQItem>
          </div>
        </div>
      </section>

      {/* 07 — After Your Retreat */}
      <section className="section section--beige">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">07 — After Your Retreat</span>
            <h2 className="display">After your <em>retreat.</em></h2>
          </div>
          <div className="faq-list">
            <FAQItem question="Does Dreamglade follow up after the retreat?">
              <p>Yes. Paul reaches out within a month of you leaving to see how the landing has been, and ongoing support by email is available if you want it.</p>
            </FAQItem>
            <FAQItem question="Should I stay in Iquitos after the retreat?">
              <p>If you can, yes — one or two nights in Iquitos before flying home is worth it. It gives you a softer re-entry: simple food and time to put words to what happened before the bigger noise of normal life starts again.</p>
            </FAQItem>
            <FAQItem question="Can I come back?">
              <p>Yes. Many guests return for a second or third retreat once the integration of the first has settled. Returning guests apply the same way.</p>
            </FAQItem>
          </div>
        </div>
      </section>

      {/* 08 — Common Concerns */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">08 — Common Concerns</span>
            <h2 className="display">Common <em>concerns.</em></h2>
          </div>
          <div className="faq-list">
            <FAQItem question="Can I come on my own?">
              <p>No. All bookings are handled through the website or by email with Paul. You cannot show up and join a retreat without going through the booking process.</p>
            </FAQItem>
            <FAQItem question="What if I get sick during ceremony?">
              <p>Purging — vomiting, sometimes diarrhea — is common and is part of the work. Each guest has their own bucket within arm&apos;s reach, and the support team is in the room throughout the night. Nothing about it is treated as shameful.</p>
            </FAQItem>
            <FAQItem question="What if I want to leave early?">
              <p>You can leave whenever you want. We will help you arrange transport back to Iquitos. Refund terms for an early departure are in the Stage 2 agreement.</p>
            </FAQItem>
            <FAQItem question={SOLO_WOMEN_FAQ_QUESTION}>
              <p>{SOLO_WOMEN_FAQ_ANSWER}</p>
            </FAQItem>
            <FAQItem question="I am worried about being without my phone. Is that a problem?">
              <p>It is often one of the bigger adjustments at the start of the retreat, especially in the first couple of days. But most guests find that once they settle in, the quiet becomes part of what they value most. If you need to check in with a family member to let them know you are safe, please let a team member know and we will help make that happen.</p>
            </FAQItem>
          </div>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--center" style={{ justifySelf: "center" }}>Still have a question?</span>
            <h2 className="display" style={{ color: "var(--cream)" }}>Write to <em>Paul.</em></h2>
            <p className="lede" style={{ color: "var(--cream)", marginTop: 12 }}>
              booking@dreamglade.com — he reads every message, usually within a day.
            </p>
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <TermsGateCTA trackLocation="faq-page" />
          </div>
        </div>
      </section>
    </>
  );
}
