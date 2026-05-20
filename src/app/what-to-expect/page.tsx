import type { Metadata } from "next";
import Nav from "@/components/Nav";
import JotformCTA from "@/components/JotformCTA";

export const metadata: Metadata = {
  title: "What to Expect",
  description:
    "A typical week at DreamGlade: arrival from Iquitos, ceremonies, dieta days, accommodation in private tambos, food, sauna, and integration support.",
  alternates: { canonical: "https://dreamglade.com/what-to-expect" },
  openGraph: {
    title: "What to Expect — DreamGlade",
    description:
      "A typical week at DreamGlade: meeting in Iquitos, transport to the centre, Monday/Wednesday/Friday ceremonies, private tambos, food, sauna, and integration.",
    url: "https://dreamglade.com/what-to-expect",
    images: [{ url: "/images/maloka-exterior.jpg" }],
  },
};

export default function WhatToExpect() {
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">What to expect</span>
          <h1>What the retreat <em>experience is like.</em></h1>
          <p className="page-hero__sub">
            No two retreats are the same, but the shape is steady. Ceremonies on Monday, Wednesday and Friday; slow days in between; private tambos to sleep in; meals together at Mapacho, the communal house.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <img src="/images/bridge-overview.jpg" alt="A wooden bridge crossing the lake at DreamGlade, surrounded by palms and rainforest" />
              <p className="two-col__caption">The bridge across the lake, on arrival</p>
            </div>
            <div>
              <span className="eyebrow">Arrival</span>
              <h2 className="display" style={{ marginTop: 16 }}>From <em>Iquitos</em> to the land.</h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p><strong>You make your own way to Iquitos, and we take it from there.</strong> We meet you at a designated city meeting point in Iquitos on the first day of your retreat — once your application is confirmed — and bring you the rest of the way by 4x4, about 15 km out, past Maralillos, down the road toward Nauta. We aim to arrive at the property around 1 PM. Transport on arrival day is included.</p>
                <p>The afternoon is for settling in — you will see your tambo, meet the team, and find your bearings. A ceremony is held on the first night of your retreat, so the timing of the day is built around it: a light early meal, quiet time from 6 PM, ceremony at 7.</p>
                <p><strong>We recommend arriving in Iquitos one or two nights before your retreat.</strong> It gives you time to rest after travel and avoids the risk of a delayed flight pushing you past the 1 PM transfer. A night or two in Iquitos afterward is also worth considering.</p>
                <p><strong>Airport pickup is not included.</strong> If you are flying in, we will help you arrange a taxi from the airport to your hotel. <strong>Drop-off at Iquitos airport is included</strong> for departures after 3 PM on the last day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Ceremony nights</span>
            <h2 className="display" style={{ color: "var(--cream)" }}>Monday, Wednesday, <em>Friday.</em></h2>
            <p className="lede" style={{ color: "var(--cream)", marginTop: 16 }}>
              Three ceremony nights a week. Quiet time at 6 PM. Ceremony at 7 PM. Five to six hours in the maloka, led by the healers.
            </p>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <span className="col-item__num">— Afternoon</span>
              <h3>Rest and quiet</h3>
              <p>A simple early dinner well before 6 PM. The land goes quiet. You spend the late afternoon however you need — a hammock, a walk, your tambo.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">— Evening</span>
              <h3>In the maloka</h3>
              <p>Each guest has their own mat, blanket, and bucket. The maestros open the ceremony together. Singing, silence, slow walking. The team is in the room throughout.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">— Morning after</span>
              <h3>Breakfast circle</h3>
              <p>A slow breakfast at Mapacho, and a circle to share — or not — what came up. There is no pressure to speak. There is also no shortage of time.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--cream-warm">
        <div className="container">
          <div className="two-col two-col--flip">
            <div>
              <span className="eyebrow">Off-days</span>
              <h2 className="display" style={{ marginTop: 16 }}>The space <em>between.</em></h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p>Off-days are not empty. They are the most important days of the retreat.</p>
                <p>The hours after ceremony — and the day in between — are where the work settles. Most guests read, write in a journal, talk slowly over coffee at Mapacho, or sit by the lake. Long, unstructured stretches give whatever came up in the night somewhere to go.</p>
                <p>Mornings hold plant baths, sauna and sweat lodge, yoga and breathwork — gentle ways to come back into the body. Plant dietas are available for guests who want a deeper, longer commitment to a single teacher plant.</p>
                <p>There is no electricity or Wi-Fi anywhere on the property — by design. The first day without a screen can feel strange. By the second day, most guests stop reaching for one. Many tell us afterward that the quiet was the most unexpected, refreshing part of the whole week — and that the chance to genuinely step away from everything is half the reason to come.</p>
                <p>If you want company, Mapacho is always open and there is usually someone there. If you do not, no one will come looking.</p>
              </div>
              <p style={{ marginTop: 24, fontSize: 14, color: "var(--muted)" }}>
                Additional activities such as Kambo (100 soles), sweat lodge, and plant dietas can be added on request once you arrive.
              </p>
            </div>
            <div className="two-col__media two-col__media--wide">
              <img src="/images/sauna.jpg" alt="The sauna at DreamGlade, built of natural wood beside the trees" />
              <p className="two-col__caption">The sauna, by the trees</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Accommodation</span>
            <h2 className="display">Tambos and <em>Mapacho.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Private thatched tambos to sleep in, the communal house called Mapacho for everything else. No electricity or Wi-Fi in guest rooms — by design.
            </p>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <img src="/images/tambo5-lakeview.jpg" alt="A private tambo at DreamGlade with a view of the lake" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <h3 style={{ marginTop: 6 }}>Private tambos</h3>
              <p>Single and double thatched cabins, raised off the ground, each with mosquito-screened sleeping. Most have lake or jungle views. All are quiet, with the forest right outside.</p>
            </article>
            <article className="col-item">
              <img src="/images/mapacho-mainhouse.jpg" alt="Mapacho — the communal house at DreamGlade, with thatched roof and palm surroundings" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <h3 style={{ marginTop: 6 }}>Mapacho, the communal house</h3>
              <p>The center of the day. Meals, conversation, reading, the kitchen. There is no electricity or Wi-Fi in guest rooms or anywhere on the property — Mapacho is the gathering point, and the quiet is part of what people come for.</p>
            </article>
            <article className="col-item">
              <img src="/images/solar.jpg" alt="Solar panels at DreamGlade, providing 100 percent of the property's power" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <h3 style={{ marginTop: 6 }}>100% solar</h3>
              <p>The whole property runs on solar power. Guest rooms have no outlets and no signal — and most guests, by the second day, are very glad about that.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--beige">
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <img src="/images/food.jpg" alt="A simple meal at DreamGlade — a bowl of light noodle soup and fresh watermelon, served by the lake" />
              <p className="two-col__caption">A light lunch by the lake</p>
            </div>
            <div>
              <span className="eyebrow">Food &amp; dieta</span>
              <h2 className="display" style={{ marginTop: 16 }}>Simple food, <em>three times a day.</em></h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p>The retreat dieta is light, low-salt, plant-forward, and built around what grows here. Rice, plantain, yuca, and fresh fruit. Nothing fried, fermented, or pork. No alcohol, no caffeine, no added sugar.</p>
                <p>If you are coming with a deeper plant dieta in mind — bobinsana, ajo sacha, chiric sanango — we can prepare for it once your application is in and we have spoken with you.</p>
                <p>We are happy to accommodate vegetarian, vegan, and most allergy considerations. Tell us when you apply.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">After you leave</span>
            <h2 className="display">Integration <em>is the longer work.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Whatever happens on the land is half of it. What you do with it once you are home is the rest.
            </p>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <span className="col-item__num">01 / Last morning</span>
              <h3>A final circle, then transport</h3>
              <p>We close the retreat with a quiet circle on the last morning, then a group transfer back to Iquitos airport for flights after 3 PM, or to the city if you are staying on.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">02 / Two-week check-in</span>
              <h3>Paul writes to you</h3>
              <p>Paul reaches out within a month of you leaving — a short note to see how the landing has been and to answer anything that has come up. Ongoing support by WhatsApp or email is available if you want it.</p>
            </article>
            <article className="col-item">
              <img src="/images/jungle-sun.jpg" alt="Sunlight through the Amazon canopy at DreamGlade" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <span className="col-item__num">03 / Onward</span>
              <h3>Practical support, on request</h3>
              <p>If you want recommendations for therapists, integration groups, or further reading once you are back home, we will send what we know. We do not push it on anyone.</p>
            </article>
          </div>
          <div style={{ marginTop: "clamp(48px, 5vw, 64px)", textAlign: "center" }}>
            <JotformCTA />
          </div>
        </div>
      </section>
    </>
  );
}
