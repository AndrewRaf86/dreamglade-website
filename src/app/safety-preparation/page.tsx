import type { Metadata } from "next";
import Nav from "@/components/Nav";
import TermsGateCTA from "@/components/TermsGateCTA";

export const metadata: Metadata = {
  title: "Safety & Preparation",
  description:
    "Learn about ayahuasca safety, medication screening, preparation, and how Dreamglade reviews each guest before confirmation.",
  alternates: { canonical: "https://dreamglade.com/safety-preparation" },
  openGraph: {
    title: "Safety & Preparation — Dreamglade",
    description:
      "How Dreamglade screens guests, reviews medications and contraindications, and prepares you safely for a Shipibo-led ayahuasca retreat near Iquitos, Peru.",
    url: "https://dreamglade.com/safety-preparation",
    images: [{ url: "/images/maloka-exterior.jpg" }],
  },
};

export default function SafetyPreparation() {
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">Safety, first and always</span>
          <h1>Safety and preparation <em>before your retreat.</em></h1>
          <p className="page-hero__sub">
            A retreat is only as safe as the conversations that happen before it begins. Here is how Dreamglade approaches screening, contraindication review, the pre-retreat dieta, and what happens on the land.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container container--narrow">
          <div className="notice notice--medical">
            <span className="notice__label">Medical disclaimer</span>
            <h3>Dreamglade is a retreat center, not a medical provider.</h3>
            <p>
              Dreamglade provides traditional ayahuasca ceremonies in a ceremonial and cultural context. We do not offer medical treatment, therapy, detox, or cures for any physical or mental health condition. Paul reviews every inquiry manually, but he is not a substitute for medical advice: any decision about your medications or a medical condition must come from Paul together with a qualified healthcare professional. Participants are responsible for consulting their own doctor before applying.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--cream" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="two-col two-col--flip">
            <div>
              <span className="eyebrow">Contraindication review</span>
              <h2 className="display" style={{ marginTop: 16 }}>Who this <em>isn&apos;t for.</em></h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p>Ayahuasca interacts with many medications and conditions. We will discuss your full picture during the application process. A short, non-exhaustive list of things we always need to know about:</p>
              </div>
              <ol className="facts">
                <li><span className="facts__num">·</span><span className="facts__text"><strong>SSRIs, SNRIs, MAOIs,</strong> and other psychiatric medications.</span></li>
                <li><span className="facts__num">·</span><span className="facts__text"><strong>Heart, blood pressure, or seizure conditions,</strong> past or present.</span></li>
                <li><span className="facts__num">·</span><span className="facts__text"><strong>A personal or family history of psychosis,</strong> schizophrenia, or bipolar I.</span></li>
                <li><span className="facts__num">·</span><span className="facts__text"><strong>Pregnancy or breastfeeding.</strong></span></li>
                <li><span className="facts__num">·</span><span className="facts__text"><strong>Recent substance use or active addiction issues.</strong></span></li>
                <li><span className="facts__num">·</span><span className="facts__text"><strong>Recent surgery or any condition</strong> your doctor would want to know about before strenuous activity.</span></li>
              </ol>
              <p style={{ marginTop: 28, fontSize: 14, color: "var(--muted)" }}>
                This list is a starting point — not a screening tool. Paul will work through your full health intake with you in writing before any deposit is taken.
              </p>
            </div>
            <div className="two-col__media two-col__media--wide">
              <img src="/images/bobinsana-flower.jpg" alt="Bobinsana flower at Dreamglade" />
              <p className="two-col__caption">Bobinsana, in flower near the maloka</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream-warm">
        <div className="container container--narrow">
          <div className="section-head">
            <span className="eyebrow">Medication &amp; health screening</span>
            <h2 className="display">Medication and <em>health screening.</em></h2>
          </div>
          <div className="flow flow--lg" style={{ marginTop: 28 }}>
            <p>Ayahuasca contains naturally occurring MAOIs — Monoamine Oxidase Inhibitors. MAOIs can interact dangerously with certain medications and substances. For this reason, Dreamglade requires every guest to complete a health and medication disclosure before being accepted.</p>
            <p>Some medication groups may make ayahuasca unsafe, including antidepressants and anxiety medications such as SSRIs and SNRIs, tricyclic antidepressants, MAOIs, stimulants, sedatives, certain prescription pain medications, heart and blood pressure medications, and blood thinners. Cough, cold, and allergy medications may also be relevant — some formulas contain active ingredients such as DXM or pseudoephedrine.</p>
            <p>This list is not exhaustive. Guests must disclose all current and recent medications, supplements, physical health history, mental health history, substance use, and relevant conditions. Paul reviews disclosures personally and may ask follow-up questions before confirming whether the next step is appropriate.</p>
            <p>Dreamglade does not provide medical advice, diagnosis, treatment, therapy, detox, cures, or medical clearance. Do not stop, taper, or change any prescription medication without speaking with the healthcare professional who prescribed it.</p>
          </div>
        </div>
      </section>

      <section className="section section--beige">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The pre-retreat dieta</span>
            <h2 className="display">Two weeks of <em>quiet preparation.</em></h2>
            <p className="lede" style={{ marginTop: 16 }}>
              The dieta is the traditional way to arrive ready — softer in body, quieter in mind, with the work already partway begun.
            </p>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <span className="col-item__num">01 / Food</span>
              <h3>Simple, plant-forward, low-salt</h3>
              <p>For at least two weeks before arrival, we ask you to step away from pork, red meat, alcohol, recreational substances, fermented foods, and added sugar and salt. The week before, simpler still.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">02 / Body</span>
              <h3>Rest, hydration, slower days</h3>
              <p>This is not a time to push your body. Walks, gentle movement, sleep, and water are enough. Whatever else you need to wind down at home — quiet evenings, less screen time — counts.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">03 / Mind</span>
              <h3>Set an intention you can write down</h3>
              <p>Most guests find it helpful to spend the last week noting what they are bringing — questions, grief, gratitude, the things they want to look at honestly. You will not be quizzed; the noting is for you.</p>
            </article>
          </div>
          <p style={{ marginTop: 32, fontSize: 14, color: "var(--muted)" }}>
            Alcohol, cannabis, recreational drugs, and other substances may affect preparation and safety. These are reviewed during the intake process, and guests may receive individual guidance before confirmation.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <img src="/images/maloka-exterior.jpg" alt="The ceremony maloka at Dreamglade, raised on stilts with a thatched roof" />
              <p className="two-col__caption">The maloka, where ceremony is held</p>
            </div>
            <div>
              <span className="eyebrow">On the land</span>
              <h2 className="display" style={{ marginTop: 16 }}>What we do, <em>on a ceremony night.</em></h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p>By 6 PM, everyone is in the maloka for quiet time, and the ceremony begins not long after that. Each ceremony runs five to six hours, with Maestra Dominga and Maestro Raúl leading, and a support team present throughout.</p>
                <p>Each guest has their own mattress, blanket, and bucket within arm&apos;s reach. The room is held with attention rather than theatrics — singing, silence, slow walking. We never run a ceremony beyond ten guests.</p>
                <p>The morning after, we enjoy a slow breakfast and then prepare for share circle. Whatever came up the night before, you do not have to carry it alone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--center" style={{ justifySelf: "center" }}>When in doubt</span>
            <h2 className="display" style={{ color: "var(--cream)" }}>Ask Paul, <em>before you book.</em></h2>
            <p className="lede" style={{ color: "var(--cream)", marginTop: 16 }}>
              Paul reads every inquiry and answers in writing — usually within a day. There is no automated screening, no funnel.
            </p>
          </div>
          <div className="center" style={{ marginTop: 40 }}>
            <TermsGateCTA />
          </div>
        </div>
      </section>
    </>
  );
}
