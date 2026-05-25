import type { Metadata } from "next";
import Script from "next/script";
import Nav from "@/components/Nav";
import FAQItem from "@/components/FAQItem";
import TermsGateCTA from "@/components/TermsGateCTA";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Dreamglade: a safe small-group ayahuasca retreat near Iquitos, Peru. Ceremonies, screening, cost, transport, accommodation, and integration.",
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
  mainEntity: [
    { "@type": "Question", name: "Who runs Dreamglade?", acceptedAnswer: { "@type": "Answer", text: "Dreamglade was founded by Stacy Povey and is currently owned and managed by Wade Bucher and Clarisa Gutierrez. Paul reviews every application personally." } },
    { "@type": "Question", name: "How many guests are at a retreat?", acceptedAnswer: { "@type": "Answer", text: "A maximum of ten guests per retreat. We do not run larger groups." } },
    { "@type": "Question", name: "Where is Dreamglade located?", acceptedAnswer: { "@type": "Answer", text: "Dreamglade is near Maralillos, under an hour's drive from Iquitos in the Peruvian Amazon. The property is 25 hectares of rainforest lakeside." } },
    { "@type": "Question", name: "Is Dreamglade good for first-time ayahuasca guests?", acceptedAnswer: { "@type": "Answer", text: "Yes. Many guests come to Dreamglade for their first ayahuasca experience. The small group of no more than ten, the Shipibo-led ceremonies, and Paul's personal screening and preparation are designed to make a first time feel safe and well supported. The minimum stay of five nights includes three ceremonies, which is enough to gently find your footing." } },
    { "@type": "Question", name: "Is airport pickup included?", acceptedAnswer: { "@type": "Answer", text: "No. Airport pickup when you fly into Iquitos is not included. Helpful travel tip: make sure to have soles cash with you for motor taxis, which usually cost about 40–70 soles from the airport to hotels in Iquitos. You then meet us at the designated city meeting point in Iquitos on your first retreat day. Airport drop-off at the end is included for flights departing after 3 PM." } },
    { "@type": "Question", name: "How do I get to Dreamglade from Iquitos?", acceptedAnswer: { "@type": "Answer", text: "You make your own way to Iquitos, and we take it from there. After your application is confirmed, we meet you at a designated city meeting point in Iquitos and drive you to the property by 4x4, under an hour from the city. There is no public route to the centre — arrival transport is arranged by us and included." } },
    { "@type": "Question", name: "What are the accommodations like?", acceptedAnswer: { "@type": "Answer", text: "Guests sleep in private thatched tambos — single or two-bed cabins, raised off the ground, with mosquito-screened sleeping and most overlooking the lake or jungle. Comfort is simple and clean rather than luxury: a real bed, quiet, and the forest right outside. Meals and gathering happen at the communal big house." } },
    { "@type": "Question", name: "Who leads the ceremonies?", acceptedAnswer: { "@type": "Answer", text: "Ceremonies are led by Maestra Dominga and Maestro Raúl in the Shipibo tradition." } },
    { "@type": "Question", name: "How many ceremonies will I have, and when?", acceptedAnswer: { "@type": "Answer", text: "Ceremonies are held on Monday, Wednesday, and Friday nights. The minimum stay of five nights includes three ceremonies. A Friday start typically means a six-night stay with three ceremonies. The maximum stay of two weeks includes up to six ceremonies." } },
    { "@type": "Question", name: "How long does a ceremony last?", acceptedAnswer: { "@type": "Answer", text: "Quiet time begins at 6 PM and ceremony begins at 7 PM. Each ceremony runs five to six hours, with the healers and a support team present throughout." } },
    { "@type": "Question", name: "What is the minimum age?", acceptedAnswer: { "@type": "Answer", text: "Eighteen. Dreamglade does not accept guests under the age of 18." } },
    { "@type": "Question", name: "How does the application process work?", acceptedAnswer: { "@type": "Answer", text: "The first step is a short inquiry — about eight questions, no medical history. Paul reads every one personally. If it looks like a fit, he writes back to start a conversation. Full registration and a signed agreement come later, by email, before your arrival date is confirmed." } },
    { "@type": "Question", name: "How much does it cost?", acceptedAnswer: { "@type": "Answer", text: "Prices are listed in USD per person per day, with the same daily rate for the whole stay. Approximate Peruvian Soles equivalents are shown for convenience and may vary with the exchange rate at the time of payment. Both shared and single tambos include accommodation, meals, ceremonies, plant dieta, yoga, breathwork, sauna, and integration support." } },
    { "@type": "Question", name: "What is included in the price?", acceptedAnswer: { "@type": "Answer", text: "Accommodation, all meals, ceremonies, plant dieta, yoga, breathwork, sauna, and integration support. Group transport from the city meeting point in Iquitos and drop-off at Iquitos airport (for flights after 3 PM) are included. Flights, airport pickup, travel insurance, visas, and vaccinations are not included." } },
    { "@type": "Question", name: "Should I book my flights before my application is confirmed?", acceptedAnswer: { "@type": "Answer", text: "No. We recommend waiting until Paul has reviewed your application and confirmed your dates before you book flights." } },
    { "@type": "Question", name: "What is the deposit and cancellation policy?", acceptedAnswer: { "@type": "Answer", text: "A 50% deposit confirms your place. Cancellations within seven days of paying the deposit receive a refund less 100 USD. Specifics are confirmed in the Stage 2 registration and agreement." } },
    { "@type": "Question", name: "Is transport included?", acceptedAnswer: { "@type": "Answer", text: "Yes. We pick you up at the designated city meeting point in Iquitos at 1 PM on the first day of your retreat. Drop-off at Iquitos airport is included for departures after 3 PM on the last day. Airport pickup from the airport on arrival is not included." } },
    { "@type": "Question", name: "Is there Wi-Fi at Dreamglade?", acceptedAnswer: { "@type": "Answer", text: "There is no electricity or Wi-Fi in guest rooms or anywhere at the centre. The whole property runs on 100% solar power. The quiet and disconnection are part of why people come." } },
    { "@type": "Question", name: "What food is served?", acceptedAnswer: { "@type": "Answer", text: "The retreat dieta is light, low-salt, and plant-forward — rice, plantain, yuca, and fresh fruit. Nothing fried, fermented, or pork. No alcohol, caffeine, or added sugar. Vegetarian, vegan, and most allergy considerations are accommodated." } },
    { "@type": "Question", name: "Does Dreamglade follow up after the retreat?", acceptedAnswer: { "@type": "Answer", text: "Yes. Paul reaches out within a month of you leaving to see how the landing has been, and ongoing support by WhatsApp or email is available if you want it. If you want recommendations for therapists, integration groups, or further reading, we will send what we know." } },
    { "@type": "Question", name: "I use cannabis regularly. Can I still attend?", acceptedAnswer: { "@type": "Answer", text: "Yes, but be honest about it on your application. For habitual users we recommend stopping cannabis four to six weeks before the retreat and staying off it for two weeks afterward." } },
    { "@type": "Question", name: "What medications are a concern with ayahuasca?", acceptedAnswer: { "@type": "Answer", text: "Ayahuasca contains naturally occurring MAOIs, which can interact dangerously with certain medications and substances. Medication groups that may be unsafe include antidepressants and anxiety medications such as SSRIs and SNRIs, tricyclic antidepressants, MAOIs, stimulants, sedatives, certain prescription pain medications, heart and blood pressure medications, and blood thinners. Cough, cold, and allergy medications may also be relevant, especially formulas containing DXM or pseudoephedrine. This list is not exhaustive. All current and recent medications, supplements, health history, mental health history, and substance use must be disclosed before confirmation." } },
    { "@type": "Question", name: "Do I need to stop my medication before coming?", acceptedAnswer: { "@type": "Answer", text: "Dreamglade does not advise guests to stop, taper, or change medication. Any medication change — including tapering before a retreat — must be discussed with and supervised by the healthcare professional who prescribed it. Paul reviews disclosures personally, but Dreamglade does not provide medical advice or medical clearance." } },
    { "@type": "Question", name: "Is there a full list of contraindicated medications?", acceptedAnswer: { "@type": "Answer", text: "There is no single complete public list, because individual health situations vary. Guests must disclose all current and recent medications, supplements, health conditions, mental health history, and substance use. Paul reviews disclosures personally and may ask follow-up questions before confirming whether the next step is appropriate." } },
    { "@type": "Question", name: "What about cannabis, alcohol, or recreational substances?", acceptedAnswer: { "@type": "Answer", text: "Alcohol, cannabis, recreational drugs, and other substances may affect preparation and safety. Guests are asked to disclose substance use honestly during the intake process so Paul can review the situation and ask follow-up questions if needed." } },
    { "@type": "Question", name: "When can I arrive at Dreamglade?", acceptedAnswer: { "@type": "Answer", text: "Dreamglade does not run fixed-date group retreats. You can start your stay on a Monday or a Friday. A Wednesday start is sometimes possible under special conditions." } },
    { "@type": "Question", name: "Can I leave the property during my stay?", acceptedAnswer: { "@type": "Answer", text: "No. Once you arrive at Dreamglade, you stay on the land for the full retreat. We do not run day trips out from the centre." } },
  ],
};

export default function FAQ() {
  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>

      <Nav />

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
              <p>Dreamglade was founded by Stacy Povey and is currently owned and managed by Wade Bucher and Clarisa Gutierrez. Paul reviews every application personally.</p>
            </FAQItem>
            <FAQItem question="Where is Dreamglade located?">
              <p>Dreamglade is near Maralillos, under an hour's drive from Iquitos in the Peruvian Amazon. The property is 25 hectares of rainforest lakeside.</p>
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
            <FAQItem question="Who leads the ceremonies?">
              <p>Ceremonies are led by Maestra Dominga and Maestro Raúl in the Shipibo tradition. A support team is in the room throughout.</p>
            </FAQItem>
            <FAQItem question="How many ceremonies will I have, and when?">
              <p>Ceremonies are held on Monday, Wednesday, and Friday nights. The minimum stay of five nights includes three ceremonies (for example, arriving Monday and leaving Saturday morning). A Friday start typically means a six-night stay with three ceremonies, because of the weekend in the middle. The maximum stay of two weeks includes up to six ceremonies.</p>
            </FAQItem>
            <FAQItem question="How long does a ceremony last?">
              <p>Quiet time begins at 6 PM and ceremony begins at 7 PM. Each ceremony runs five to six hours, with the healers and a support team present throughout.</p>
            </FAQItem>
            <FAQItem question="How many ceremonies do you recommend?">
              <p>The minimum is three ceremonies, which is enough to see whether ayahuasca is something you want to work with. For any deeper, longer-arc work, we strongly recommend five or six. Some guests do not feel much in the first one or two ceremonies; if there is a lot to clear, it can take five or six. Very few people regret coming for longer.</p>
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
              <p>Ayahuasca is not appropriate for everyone. Dreamglade tends to suit people who want a small, quiet, grounded setting and are willing to do real preparation before they arrive. Paul reviews every application personally to talk this through with you.</p>
            </FAQItem>
            <FAQItem question="Is Dreamglade good for first-time ayahuasca guests?">
              <p>Yes. Many guests come to Dreamglade for their first ayahuasca experience. The small group of no more than ten, the Shipibo-led ceremonies, and Paul&apos;s personal screening and preparation are designed to make a first time feel safe and well supported. The minimum stay of five nights includes three ceremonies, which is enough to gently find your footing.</p>
            </FAQItem>
            <FAQItem question="What is the minimum age?">
              <p>Eighteen. Dreamglade does not accept guests under the age of 18.</p>
            </FAQItem>
            <FAQItem question="What medical conditions or medications need to be disclosed?">
              <p>Guests should disclose current medications, medical history, mental health history, and recent substance use. Paul reviews this information before confirmation and may ask follow-up questions. Dreamglade does not provide medical advice or medical clearance. See <a href="/safety-preparation" style={{ color: "var(--gold)", borderBottom: "1px solid var(--gold)" }}>Safety &amp; Preparation</a> for the kinds of things we look at most closely.</p>
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
              <p>Paul reviews your Stage 1 inquiry. Your full health intake is collected later, in the Stage 2 registration and agreement, and is shared only with the people directly responsible for your safety on the land.</p>
            </FAQItem>
            <FAQItem question="I use cannabis regularly. Can I still attend?">
              <p>Yes, but be honest about it on your application. For habitual users — daily use over a long period — we recommend stopping cannabis four to six weeks before the retreat and staying off it for two weeks afterward. Cannabis dulls the work; for daily users, it can take three ceremonies just to fully open to ayahuasca. If that is you, we will suggest a longer stay so you have time to do the work, not just clear the ground for it.</p>
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
              <p>For at least two weeks before arrival: no pork, red meat, alcohol, recreational substances, fermented foods, or added salt and sugar. The week before, simpler still. Walks, rest, and hydration. Most guests find it helpful to spend the last week noting what they are bringing — an intention they can put in writing.</p>
            </FAQItem>
            <FAQItem question="What should I bring?">
              <p>A packing list will be provided as part of the Stage 2 registration, including loose, light clothing for ceremony, insect repellent guidance, sandals, a refillable water bottle, and a notebook.</p>
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
            <FAQItem question="How much does it cost?">
              <p>Prices are listed in USD per person per day, with the same daily rate for the whole stay. Approximate Peruvian Soles equivalents are shown for convenience and may vary with the exchange rate at the time of payment. Current pricing is shown on the <a href="/#pricing" style={{ color: "var(--gold)", borderBottom: "1px solid var(--gold)" }}>pricing section</a> of the home page. Both shared and single tambos include accommodation, meals, ceremonies, plant dieta, yoga, breathwork, sauna, and integration support.</p>
            </FAQItem>
            <FAQItem question="What is included in the price?">
              <p>Accommodation in a private or shared thatched tambo, all meals, ceremonies, plant dieta, yoga, breathwork, sauna, and integration support throughout your stay. Group transport from the designated city meeting point in Iquitos on the first day of your retreat and drop-off at Iquitos airport at the end (for flights after 3 PM) are included.</p>
              <p>Not included: international and domestic flights, airport pickup on arrival, travel insurance, visas, and vaccinations.</p>
            </FAQItem>
            <FAQItem question="Should I book my flights before my application is confirmed?">
              <p>No — we recommend waiting until Paul has reviewed your application and confirmed your dates before you book flights. Once your place is confirmed and your deposit is in, you can book with confidence. Where possible, choose a changeable or refundable fare; flights to Iquitos shift more often than they used to.</p>
            </FAQItem>
            <FAQItem question="What is the deposit and cancellation policy?">
              <p>A 50% deposit confirms your place. Cancellations within seven days of paying the deposit receive a refund less 100 USD. Specifics are confirmed in the Stage 2 registration and agreement.</p>
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
              <p>Yes. We pick you up at the designated city meeting point in Iquitos at 1 PM on the first day of your retreat and bring you to the property by 4x4. Drop-off at Iquitos airport is included for departures after 3 PM on the last day. Airport pickup is not included. Helpful travel tip: make sure to have soles cash with you for motor taxis, which usually cost about 40–70 soles from the airport to hotels in Iquitos.</p>
            </FAQItem>
            <FAQItem question="Is airport pickup included?">
              <p>No. Airport pickup when you fly into Iquitos is not included. Helpful travel tip: make sure to have soles cash with you for motor taxis, which usually cost about 40–70 soles from the airport to hotels in Iquitos. You then meet us at the designated city meeting point in Iquitos on your first retreat day. Airport drop-off at the end is included for flights departing after 3 PM.</p>
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
              <p>Guests sleep in private thatched tambos — single or two-bed cabins, raised off the ground, with mosquito-screened sleeping and most overlooking the lake or jungle. Comfort is simple and clean rather than luxury: a real bed, quiet, and the forest right outside. Meals and gathering happen at the communal big house.</p>
            </FAQItem>
            <FAQItem question="Is there Wi-Fi or electricity in my room?">
              <p>No. There is no electricity or Wi-Fi in guest rooms or anywhere at the centre, by design. The whole property runs on 100% solar power. Most guests find the disconnection is part of what makes the week work.</p>
            </FAQItem>
            <FAQItem question="What food is served?">
              <p>The retreat dieta is light, low-salt, and plant-forward, built around what grows locally — rice, plantain, yuca, and fresh fruit. Nothing fried, fermented, or pork. No alcohol, caffeine, or added sugar. Vegetarian, vegan, and most allergy considerations are accommodated — please tell us when you apply.</p>
            </FAQItem>
            <FAQItem question="Are there other activities besides ceremony?">
              <p>Yes. Plant baths, yoga, breathwork, sauna, and sweat lodge are included. Plant dietas — a deeper, longer commitment to a single teacher plant — are available on request.</p>
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
              <p>Yes. Paul reaches out within a month of you leaving to see how the landing has been, and ongoing support by WhatsApp or email is available if you want it. If you want recommendations for therapists, integration groups, or further reading, we will send what we know.</p>
            </FAQItem>
            <FAQItem question="Should I stay in Iquitos after the retreat?">
              <p>If you can, yes — one or two nights in Iquitos before flying home is worth it. It gives you a softer re-entry: quiet streets, simple food, and time to put words to what happened before the bigger noise of normal life starts again.</p>
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
              <p>Most guests come on their own. The small group means you will know everyone by name within a day or two, and there is no expectation that you spend time with anyone you do not want to.</p>
            </FAQItem>
            <FAQItem question="What if I get sick during ceremony?">
              <p>Purging — vomiting, sometimes diarrhoea — is common and is part of the work. Each guest has their own bucket within arm&apos;s reach, and the support team is in the room throughout the night. Nothing about it is treated as shameful.</p>
            </FAQItem>
            <FAQItem question="What if I want to leave early?">
              <p>You can leave whenever you want. We will help you arrange transport back to Iquitos. Refund terms for an early departure are in the Stage 2 agreement.</p>
            </FAQItem>
            <FAQItem question="Is Dreamglade safe for women travelling alone?">
              <p>Yes. The property is staffed continuously, the group is small, and every applicant is screened. Many of our guests are women travelling on their own.</p>
            </FAQItem>
            <FAQItem question="I am worried about being without my phone. Is that a problem?">
              <p>It rarely lasts long. Most guests find the first day or two without a screen the strangest part of the retreat — and then, somewhere on day two or three, they stop reaching for one. By the end of the week the quiet is usually what they remember most fondly. The communal big house has Wi-Fi if you genuinely need to handle something urgent.</p>
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
            <TermsGateCTA />
          </div>
        </div>
      </section>
    </>
  );
}
