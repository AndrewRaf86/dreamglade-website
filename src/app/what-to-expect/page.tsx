import type { Metadata } from "next";
import Nav from "@/components/Nav";
import TermsGateCTA from "@/components/TermsGateCTA";
import TrackedLink from "@/components/TrackedLink";
import SiteImage from "@/components/SiteImage";
import JourneyMap from "@/components/JourneyMap";

export const metadata: Metadata = {
  title: "What to Expect at an Ayahuasca Retreat",
  description:
    "A typical week at Dreamglade: arrival from Iquitos, ceremonies, dieta days, accommodation in private tambos, food, sauna, and integration support.",
  alternates: { canonical: "https://dreamglade.com/what-to-expect" },
  openGraph: {
    title: "What to Expect — Dreamglade",
    description:
      "A typical week at Dreamglade: meeting in Iquitos, transport to the centre, Monday/Wednesday/Friday ceremonies, private tambos, food, sauna, and integration.",
    url: "https://dreamglade.com/what-to-expect",
    images: [{ url: "/images/maloka-exterior.jpg" }],
  },
};

export default function WhatToExpect() {
  return (
    <>
      <Nav theme="light" />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">What to expect</span>
          <h1>What the retreat <em>experience is like.</em></h1>
          <p className="page-hero__sub">
            No two retreats are the same, but the shape is steady. Ceremonies on Monday, Wednesday and Friday; slow days in between; private tambos to sleep in; meals together at the communal big house.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <SiteImage src="/images/bridge-overview.jpg" alt="A wooden bridge crossing the lake at Dreamglade, surrounded by palms and rainforest" width={960} height={1280} />
              <p className="two-col__caption">The bridge across the lake, on arrival</p>
            </div>
            <div>
              <span className="eyebrow">Arrival</span>
              <h2 className="display" style={{ marginTop: 16 }}>From <em>Iquitos</em> to the land.</h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p><strong>You make your own way to Iquitos, and we take it from there.</strong> We meet you at a designated city meeting point in Iquitos on the first day of your retreat — once your application is confirmed — and bring you the rest of the way by 4x4, past Moralillo, down the road toward Nauta, under an hour from the city. We pick guests up around 1pm in Iquitos.</p>
                <p>The afternoon is for settling in — you will see your tambo, meet the team, and find your bearings. A ceremony is held on the first night of your retreat, so the timing of the day is built around it.</p>
                <p><strong>We recommend arriving in Iquitos one or two nights before your retreat.</strong> It gives you time to rest after travel and avoids the risk of a delayed flight pushing you past the 1 PM transfer. A night or two in Iquitos afterward is also worth considering.</p>
                <p><strong>Airport pickup is not included.</strong> Uber is available in Iquitos, but it is smart to bring cash in soles in case Uber is not working or a driver asks for cash. Motor taxis from the airport to hotels in Iquitos usually cost about 30–70 soles. <strong>Drop-off at Iquitos airport and Iquitos city is included on the last day,</strong> with airport drop-off for departures after 3 PM.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream-warm">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Getting there and back</span>
            <h2 className="display">From <em>Iquitos</em> to the land — and home again.</h2>
            <p className="lede" style={{ marginTop: 12 }}>
              You make your own way to Iquitos. From the moment you land, here is exactly
              what happens next — and how you get home again.
            </p>
          </div>
          <JourneyMap />
        </div>
      </section>

      <section className="section section--forest">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Ceremony nights</span>
            <h2 className="display" style={{ color: "var(--cream)" }}>Monday, Wednesday, <em>Friday.</em></h2>
            <p className="lede" style={{ color: "var(--cream)", marginTop: 16 }}>
              Three ceremony nights a week. Preparation for ceremony begins at 6pm. Five to six hours in the maloka, led by the healers.
            </p>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <span className="col-item__num">— Afternoon</span>
              <h3>Rest and quiet</h3>
              <p>Lunch is served around 12pm. Afterward, the land goes quiet. The sauna is available in the afternoon, and the rest of the day is intentionally unstructured — a hammock, a walk, time in your tambo, or whatever your body needs.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">— Evening</span>
              <h3>In the maloka</h3>
              <p>Each guest has their own mattress, blanket, and bucket. The maestros open the ceremony together. Singing, silence, slow walking. The team is in the room throughout.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">— Morning after</span>
              <h3>Breakfast circle</h3>
              <p>A slow breakfast at the communal big house, and a circle to share what came up. There is no pressure to speak. There is also no shortage of time.</p>
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
                <p>The hours after ceremony — and the day in between — are where the work settles. Most guests read, write in a journal, talk slowly at the communal big house, take a walk along the trails in the jungle on the property, or sit by the lake. Long, unstructured stretches give whatever came up in the night somewhere to go.</p>
                <p>Mornings hold plant baths, and afternoons include breathwork — gentle ways to come back into the body.</p>
                <p>There is no electricity or Wi-Fi anywhere on the property — by design. The first day without a screen can feel strange. By the second day, most guests stop reaching for one. Many tell us afterward that the quiet was the most unexpected, refreshing part of the whole week — and that the chance to genuinely step away from everything is half the reason to come.</p>
              </div>
            </div>
            <div className="two-col__media two-col__media--wide">
              <SiteImage src="/images/sauna.jpg" alt="The sauna at Dreamglade, built of natural wood beside the trees" width={3060} height={4080} />
              <p className="two-col__caption">The sauna, by the trees</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BETWEEN CEREMONIES ── */}
      <section className="section section--beige">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Between ceremonies</span>
            <h2 className="display">Time to <em>rest and settle in.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Retreat days are not filled with a schedule. There is time to rest, walk, read, speak, and sit by the lake between ceremonies.
            </p>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <h3>Rainforest &amp; Plant Walks</h3>
              <p>Trails through the jungle on the property, open to explore during the unstructured hours between ceremonies.</p>
            </article>
            <article className="col-item">
              <h3>Lake Time</h3>
              <p>Long, quiet hours by the lake — sitting, resting, or watching the water between ceremony days.</p>
            </article>
            <article className="col-item">
              <h3>Plant Baths</h3>
              <p>Traditional plant baths are part of the retreat rhythm, usually offered in the mornings.</p>
            </article>
            <article className="col-item">
              <h3>Breathwork</h3>
              <p>Gentle breathwork, usually in the afternoon, as one of the ways to come back into the body.</p>
            </article>
            <article className="col-item">
              <h3>Sauna &amp; Rest</h3>
              <p>Time for heat, rest, and quiet recovery in the wood sauna by the trees.</p>
            </article>
            <article className="col-item">
              <h3>Time in the Big House</h3>
              <p>The communal big house is the gathering point for meals, conversation, and reading, with no electricity or Wi-Fi to pull attention away.</p>
            </article>
            <article className="col-item">
              <h3>Sharing &amp; Integration Circles</h3>
              <p>Share circles are part of the rhythm, including a final circle together on the last morning.</p>
            </article>
            <article className="col-item">
              <h3>Personal Check-Ins</h3>
              <p>Paul is personally available throughout your stay, and reaches out again within a month after you leave.</p>
            </article>
            <article className="col-item">
              <h3>Sunrise, Sunset &amp; Stargazing</h3>
              <p>Simple moments on the land — morning light over the lake, sunset from the deck, and dark Amazon nights with little outside light.</p>
            </article>
            <article className="col-item">
              <h3>Optional Kambo Add-On</h3>
              <p>Kambo may be available as an optional add-on for an additional cost when appropriate, and can be discussed during the inquiry process.</p>
            </article>
            <article className="col-item">
              <h3>Master Plant Dietas</h3>
              <p>Dreamglade offers six traditional master plant dietas — Marosa, Ajo Sacha, Bobinsana, Machinga, Clavo Huasca, and Planta de Vida. The specific plant is not chosen from a menu in advance. It is discussed and selected with Maestro Raúl based on the guest, their preparation, and what is appropriate once they arrive on the land.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── PLANT DIETAS ── */}
      <section className="section section--cream-warm" id="plant-dietas">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Traditional plant dietas</span>
            <h2 className="display">Plant dietas at <em>Dreamglade.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              A dieta is not simply a food restriction. In the Amazonian tradition, it is a quiet period of simplicity, attention, and relationship with a master plant.
            </p>
          </div>

          <div style={{ display: "grid", gap: "clamp(20px, 3vw, 32px)", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", maxWidth: 900, margin: "0 auto clamp(40px, 5vw, 56px)" }}>
            <div style={{ padding: "24px 28px", background: "var(--cream)", borderLeft: "3px solid var(--gold)", borderRadius: 4 }}>
              <h3 style={{ marginTop: 0 }}>What a dieta involves</h3>
              <p style={{ margin: 0, fontSize: 15, opacity: 0.92 }}>At Dreamglade, the healers prepare a small tea or plant decoction from the chosen master plant, which may be a tree, vine, or shrub, for the guest to drink. The dieta may also include simple food, rest, time alone, ceremony, and guidance, creating a quieter container for working with that plant.</p>
            </div>
            <div style={{ padding: "24px 28px", background: "var(--cream)", borderLeft: "3px solid var(--gold)", borderRadius: 4 }}>
              <h3 style={{ marginTop: 0 }}>How the plant is chosen</h3>
              <p style={{ margin: 0, fontSize: 15, opacity: 0.92 }}>Guests do not need to choose a plant from a fixed menu before arriving. Maestro Raúl considers the guest&apos;s preparation, intention, and condition on the land, then recommends what is appropriate for the dieta.</p>
            </div>
          </div>

          <p style={{ textAlign: "center", maxWidth: 640, marginLeft: "auto", marginRight: "auto", fontSize: 16 }}>
            Dreamglade works with six master plants — Marosa, Ajo Sacha, Bobinsana, Machinga, Clavo Huasca, and Planta de Vida — each with its own character in the tradition. The plant dieta itself is included in the retreat price.
          </p>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <TrackedLink href="/master-plants" className="link-arrow" event="Plants Click" properties={{ location: "plant-dietas-section", destination: "master-plants" }}>See what each plant is known for</TrackedLink>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Accommodation</span>
            <h2 className="display">Tambos and <em>the communal big house.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Private thatched tambos to sleep in, the communal big house for everything else. No electricity or Wi-Fi in guest rooms — by design.
            </p>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <SiteImage src="/images2/dreamglade-outside-single-tambo.jpeg" alt="Private tambo cabin surrounded by rainforest at Dreamglade" style={{ aspectRatio: "4/3", objectFit: "cover", objectPosition: "center bottom", width: "100%" }} />
              <h3 style={{ marginTop: 6 }}>Private tambos</h3>
              <p>Single and double thatched cabins, raised off the ground, each with mosquito-screened sleeping. Most have lake or jungle views. All are quiet, with the forest right outside.</p>
            </article>
            <article className="col-item">
              <SiteImage src="/images/mapacho-mainhouse.jpg" alt="The communal big house at Dreamglade, with thatched roof and palm surroundings" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <h3 style={{ marginTop: 6 }}>The communal big house</h3>
              <p>The center of the day. Meals, conversation, and reading happen here. There is no electricity or Wi-Fi in guest rooms or anywhere on the property — the communal big house is the gathering point, and the quiet is part of what people come for.</p>
            </article>
            <article className="col-item">
              <SiteImage src="/images/solar.jpg" alt="The simple, limited electricity setup at Dreamglade" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <h3 style={{ marginTop: 6 }}>Limited electricity</h3>
              <p>Electricity is limited and simple, and the retreat is designed for quiet time away from normal digital life. Guest rooms have no outlets and no signal — and most guests, by the second day, are very glad about that. Some cellphone carriers have limited service around the retreat. We have a generator that runs once a day; this is the time to charge your devices.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--beige">
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <SiteImage src="/images/food.jpg" alt="A simple meal at Dreamglade — a bowl of light noodle soup and fresh watermelon, served by the lake" />
              <p className="two-col__caption">A light breakfast by the lake</p>
            </div>
            <div>
              <span className="eyebrow">Food &amp; dieta</span>
              <h2 className="display" style={{ marginTop: 16 }}>Simple food, <em>three times a day.</em></h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p>The retreat dieta is light, low-salt, plant-forward, and built around what grows here. Rice, potatoes, yuca, grains and fresh fruit. Nothing fried, and no added sugars.</p>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(24px, 4vw, 48px)", maxWidth: 760, margin: "0 auto" }}>
            <article className="col-item">
              <SiteImage src="/images2/dreamglade-last-morning-bridge.jpg" alt="Quiet morning on the land at Dreamglade before returning to Iquitos" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <span className="col-item__num">01 / Last morning</span>
              <h3>A final circle, then transport</h3>
              <p>We close the retreat with a final share circle on the last morning, then a group transfer back to Iquitos airport for flights after 3 PM, or to the city if you are staying on.</p>
            </article>
            <article className="col-item">
              <SiteImage src="/images2/dreamglade-big-house-integration-space.jpeg" alt="Shared Big House space for meals, conversation, and quiet integration at Dreamglade" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <span className="col-item__num">02 / Integration support</span>
              <h3>Paul writes to you</h3>
              <p>Paul reaches out within a month of you leaving — a short note to see how the landing has been and to answer anything that has come up. Ongoing support by WhatsApp or email is available if you want it.</p>
            </article>
          </div>
          <div style={{ marginTop: "clamp(48px, 5vw, 64px)", textAlign: "center" }}>
            <TermsGateCTA trackLocation="experience-page" />
          </div>
        </div>
      </section>
    </>
  );
}
