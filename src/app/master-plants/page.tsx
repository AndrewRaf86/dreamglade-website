import type { Metadata } from "next";
import Nav from "@/components/Nav";
import TermsGateCTA from "@/components/TermsGateCTA";
import TrackedLink from "@/components/TrackedLink";
import SiteImage from "@/components/SiteImage";
import { FACTS } from "@/lib/facts";

export const metadata: Metadata = {
  title: "Master Plants & Plant Dietas",
  description: `The five master plant dietas Dreamglade works with — ${FACTS.plantDietas.names.join(", ")} — plus Kambo, and what a traditional dieta involves.`,
  alternates: { canonical: "https://dreamglade.com/master-plants" },
  openGraph: {
    title: "Master Plants & Plant Dietas — Dreamglade",
    description:
      "What each master plant is traditionally known for, how a dieta works, and how Maestro Raúl chooses the right plant for each guest.",
    url: "https://dreamglade.com/master-plants",
    images: [{ url: "/images/bobinsana-flower.jpg" }],
  },
};

export default function MasterPlants() {
  return (
    <>
      <Nav theme="light" />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">Plant medicine at Dreamglade</span>
          <h1>The master plants <em>we work with.</em></h1>
          <p className="page-hero__sub">
            Every dieta at Dreamglade is a relationship with a specific plant teacher. Here is what each one is in the Shipibo and Amazonian tradition, what a dieta involves, and how the right plant is chosen for each guest.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container container--narrow">
          <div className="notice notice--medical">
            <span className="notice__label">Medical disclaimer</span>
            <h3>This page describes cultural and traditional practice — not medicine.</h3>
            <p>
              Dreamglade is a retreat center, not a medical provider. The descriptions below reflect Shipibo and Amazonian tradition and what guests commonly report — they are not medical claims, and no plant on this page is offered as a treatment, therapy, or cure for any physical or mental health condition. See <TrackedLink href="/safety-preparation" event="Safety Click" properties={{ location: "master-plants-disclaimer", destination: "safety" }}>Safety &amp; Preparation</TrackedLink> for how Dreamglade screens guests and reviews medications before confirming a stay.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A DIETA ── */}
      <section className="section section--cream" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <SiteImage src="/images/maloka-exterior.jpg" alt="The ceremony maloka at Dreamglade, raised on stilts with a thatched roof" width={4096} height={3072} />
              <p className="two-col__caption">The maloka, where dietas are guided</p>
            </div>
            <div>
              <span className="eyebrow">What a dieta is</span>
              <h2 className="display" style={{ marginTop: 16 }}>More than the <em>English word suggests.</em></h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p>In the Amazonian tradition, a dieta is a structured period of isolation and simplicity built around a relationship with one specific plant — a planta maestra, or master plant teacher.</p>
                <p>The idea is simple to describe and harder to do: quiet the noise of ordinary life — habits, rich food, conversation, distraction — so there is room to actually listen. During a dieta, a guest drinks a small tea or decoction from the chosen plant, eats simply, and spends real time alone, away from the usual pull of phones, socializing, and entertainment.</p>
                <p>Traditionally, a dieta was how healers themselves were trained — a way of building a direct, personal relationship with a plant&apos;s character over time. At Dreamglade, Maestro Raúl chooses which plant is appropriate for each guest once they have arrived, based on their preparation, their intention, and what he observes on the land. It is not picked from a menu in advance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE MASTER PLANTS ── */}
      <section className="section section--cream-warm" id="the-plants">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{FACTS.plantDietas.count} master plants</span>
            <h2 className="display">The plants Dreamglade <em>dietas with.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Each has its own character in the tradition. None is chosen for its intensity — the right one depends on the guest, their preparation, and what Maestro Raúl observes once they arrive.
            </p>
          </div>

          <div className="grid-3">
            <article className="col-item">
              <h3>Marosa</h3>
              <p>A soft-leaved shrub with small white flowers, and one of the gentlest master plants in the Shipibo tradition — lovingly called <em>mamasita</em>, &quot;little mother.&quot; It doesn&apos;t carry the intensity of ayahuasca or the strong purge of some other dieta plants; instead it works quietly, over days, on emotional openness. Marosa is traditionally associated with softening old heartbreak and relational pain, which is part of why it is often one of the first dietas a guest is guided toward.</p>
            </article>

            <article className="col-item">
              <h3>Ajo Sacha</h3>
              <p>Its name means &quot;wild garlic&quot; — the leaves release a strong garlic-like scent when crushed, though the plant is unrelated to the garlic in your kitchen. In tradition it is regarded as a plant of protection and strength, used in floral baths to clear heavy or stagnant energy, sometimes called <em>saladera</em> — a long stretch of bad luck or stuckness. A dieta with Ajo Sacha is traditionally associated with clarity, resolve, and quiet inner strength.</p>
            </article>

            <article className="col-item">
              <SiteImage src="/images/bobinsana-flower.jpg" alt="Bobinsana in flower, a soft pink brush-like blossom, growing at Dreamglade" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <h3 style={{ marginTop: 6 }}>Bobinsana</h3>
              <p>Easy to recognize by its soft pink, brush-like flowers, and it grows right on the land at Dreamglade, near the maloka. In the Shipibo tradition it is known as a heart-opening plant and, distinctively, a dream plant — guests on a Bobinsana dieta often report unusually vivid, memorable dreams. Emotionally it is associated with heartbreak, grief, and a resilience the tradition describes as bending without breaking, the way its own branches move in the wind.</p>
            </article>

            <article className="col-item">
              <h3>Clavo Huasca</h3>
              <p>A woody vine that smells distinctly of cloves when its bark is cut, used a little differently from the other plants here — less a formal isolation dieta, more a warming tonic taken to awaken energy and vitality. Traditionally it is known as a plant that helps people reconnect with enthusiasm, creativity, and confidence, and it has long been used in Amazonian folk tradition as a tonic for stamina. Ask Maestro Raúl about Clavo Huasca if it feels relevant to your dieta.</p>
            </article>

            <article className="col-item">
              <SiteImage src="/images/planta-de-vida.jpg" alt="Planta de Vida, a succulent shrub handled with care by Dreamglade's healers" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <h3 style={{ marginTop: 6 }}>Planta de Vida</h3>
              <p>Approached with more caution and reverence than any other dieta plant here — its sap is genuinely potent, and it is handled only by the experienced healers who know how to work with it safely. In tradition it is regarded above all as a plant of protection: used in floral baths and ceremony to clear negative energy, and traditionally associated with resilience — the ability to stay grounded through difficulty.</p>
            </article>
          </div>

          <p style={{ marginTop: "clamp(32px, 4vw, 48px)", fontSize: 14, color: "var(--muted)", textAlign: "center", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            The plant dieta itself is included in the retreat price. If you are curious what it may involve for your stay, mention it in your inquiry and the team can explain the process before you arrive.
          </p>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <TrackedLink href="/apply" className="link-arrow" event="Experience Click" properties={{ location: "master-plants-section", destination: "apply" }}>Discuss your plant dieta in your inquiry</TrackedLink>
          </div>
        </div>
      </section>

      {/* ── KAMBO ── */}
      <section className="section section--cream">
        <div className="container">
          <div className="two-col two-col--flip">
            <div>
              <span className="eyebrow">A separate tradition</span>
              <h2 className="display" style={{ marginTop: 16 }}>Kambo — <em>not a plant, and not a dieta.</em></h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p>Kambo isn&apos;t a plant at all — it is a secretion from the Giant Monkey Frog (<em>Phyllomedusa bicolor</em>), harvested without harming the frog, and it is one of the oldest cleansing traditions in the Amazon. Tribes across the region — including the Matsés, Katukina, and Yawanawá — have used it for generations, traditionally before hunts, before difficult seasons, or simply as a periodic reset.</p>
                <p>A Kambo session is short — usually 20 to 40 minutes — and always led by an experienced practitioner. A few small, superficial marks are made on the skin, and the Kambo is applied there. Most people experience a fast, intense physical response: a racing heart, flushing, sweating, and often vomiting, which the tradition regards as the point — a genuine physical purge. It passes quickly, and most people describe what follows as unusually clear, light, and calm.</p>
                <p><strong>Kambo is not part of the standard retreat price.</strong> It is available as an optional add-on when appropriate, and it is something you can raise during your inquiry.</p>
              </div>
            </div>
            <div className="two-col__media two-col__media--wide">
              <SiteImage src="/images/bobinsana-flower.jpg" alt="Detail of Amazon rainforest flora near the maloka at Dreamglade" />
              <p className="two-col__caption">Near the maloka, where Kambo sessions are held</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--center" style={{ justifySelf: "center" }}>Questions about a specific plant?</span>
            <h2 className="display" style={{ color: "var(--cream)" }}>Ask Paul, <em>before you book.</em></h2>
            <p className="lede" style={{ color: "var(--cream)", marginTop: 16 }}>
              Paul reads every inquiry and answers in writing — usually within a day. There is no automated screening, no funnel.
            </p>
          </div>
          <div className="center" style={{ marginTop: 40 }}>
            <TermsGateCTA trackLocation="master-plants-page" />
          </div>
        </div>
      </section>
    </>
  );
}
