import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Nav from "@/components/Nav";
import FAQItem from "@/components/FAQItem";
import TermsGateCTA from "@/components/TermsGateCTA";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Ayahuasca Retreat Near Iquitos, Peru | Dreamglade",
  description:
    "Dreamglade is a small-group ayahuasca retreat near Iquitos, Peru — max 10 guests, traditional Shipibo-led ceremonies, 25 hectares of Amazon rainforest.",
  alternates: { canonical: "https://dreamglade.com" },
  openGraph: {
    title: "Dreamglade — Small-Group Ayahuasca Retreat Near Iquitos, Peru",
    description:
      "A small-group, traditional Shipibo-led ayahuasca retreat near Iquitos, Peru. Maximum 10 guests, 25 hectares of Amazon rainforest, every inquiry reviewed personally.",
    url: "https://dreamglade.com",
    images: [{ url: "/images/lake-overview.jpg" }],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dreamglade",
  description:
    "A small-group ayahuasca retreat near Iquitos, Peru. Traditional Shipibo-led ceremonies on 25 hectares of Amazon rainforest.",
  url: "https://dreamglade.com",
  logo: "https://dreamglade.com/images/logo-original.jpeg",
  email: "booking@dreamglade.com",
  telephone: "+51 920 478 240",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Caserio Moralillo Parcela 21, Ctra Iquitos-Nauta",
    postalCode: "16000",
    addressLocality: "Iquitos",
    addressCountry: "PE",
  },
  sameAs: ["https://share.google/tiFj2NeKbOzgqksP4"],
};

export default function Home() {
  return (
    <>
      <Script id="org-jsonld" type="application/ld+json">
        {JSON.stringify(orgJsonLd)}
      </Script>

      {/* Nav — light theme for hero */}
      <Nav theme="light" />

      {/* ── 1. HERO ── */}
      <section className="hero">
        <div className="hero__media">
          <img
            src="/images/hero-alt-bighouse-rain.jpg"
            alt="Rain falling on the lake at Dreamglade, with thatched malokas and palms in soft Amazon light"
          />
        </div>
        <div className="container hero__inner">
          <span className="hero__eyebrow">A grounded retreat in the Peruvian Amazon</span>
          <div className="hero__layout">
            <div>
              <h1 className="hero__title">
                A small place,<br /><em>held carefully.</em>
              </h1>
            </div>
            <div>
              <p className="hero__subtitle">
                Dreamglade is a small-group ayahuasca retreat near Iquitos, Peru — ten guests at most, traditional Shipibo-led ceremonies, 25 hectares of rainforest surrounding our man-made lake.
              </p>
              <div className="hero__actions">
                <TermsGateCTA />
                <a href="#about" className="ghost-link">Read more first</a>
              </div>
            </div>
          </div>
          <dl className="hero__meta" aria-label="Quick facts">
            <div className="hero__meta-item">
              <dt className="hero__meta-label">Group size</dt>
              <dd className="hero__meta-value">Max 10 guests</dd>
            </div>
            <div className="hero__meta-item">
              <dt className="hero__meta-label">Location</dt>
              <dd className="hero__meta-value">Short drive from Iquitos</dd>
            </div>
            <div className="hero__meta-item">
              <dt className="hero__meta-label">Tradition</dt>
              <dd className="hero__meta-value">Shipibo-led</dd>
            </div>
            <div className="hero__meta-item">
              <dt className="hero__meta-label">Stay</dt>
              <dd className="hero__meta-value">5 nights – 2 weeks</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── 2. ABOUT ── */}
      <section className="section section--cream" id="about">
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <img
                src="/images2/IMG-20240820-WA0003.jpg"
                alt="Wade and Clarisa"
              />
              <p className="two-col__caption">Wade and Clarisa</p>
            </div>
            <div>
              <span className="eyebrow">The people who run it</span>
              <h2 className="display" style={{ marginTop: 16 }}>
                <em>Wade and Clarisa</em>
              </h2>
              <div className="flow flow--lg" style={{ marginTop: 28, maxWidth: 560 }}>
                <p className="lede">
                  Dreamglade was founded by Stacy Povey in 2013 and later came under the care of Wade Bucher and Clarisa Gutierrez in 2023.
                </p>
                <p>
                  Today, Wade and Clarisa own and manage Dreamglade as a small, grounded retreat on 25 hectares of Amazon rainforest near Iquitos. The feeling is personal, human, and real.
                </p>
                <p>
                  This is not a corporate retreat brand or a high-volume booking machine. It is a small place where the people who run it are directly responsible for the guest experience, the land, the team, and the integrity of the work.
                </p>
              </div>
              <ol className="facts">
                <li>
                  <span className="facts__num">01</span>
                  <span className="facts__text"><strong>Maximum 10 guests</strong> — so every applicant is known by name.</span>
                </li>
                <li>
                  <span className="facts__num">02</span>
                  <span className="facts__text"><strong>Near Moralillo,</strong> under an hour's drive from Iquitos.</span>
                </li>
                <li>
                  <span className="facts__num">03</span>
                  <span className="facts__text"><strong>25 hectares of Amazon rainforest,</strong> lakeside.</span>
                </li>
                <li>
                  <span className="facts__num">04</span>
                  <span className="facts__text"><strong>Traditional Shipibo-led ceremonies</strong> with Maestra Dominga and Maestro Raúl.</span>
                </li>
                <li>
                  <span className="facts__num">05</span>
                  <span className="facts__text"><strong>Paul,</strong> our integration support specialist, reviews every application personally.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SAFETY PREVIEW ── */}
      <section className="section section--forest" id="safety-preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Safety, first and always</span>
            <h2 className="display" style={{ color: "var(--cream)" }}>
              We screen every applicant<br /><em>before we say yes.</em>
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Honest preparation — yours and ours — is what makes a retreat safe.
            </p>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <span className="col-item__num">01 / Screening</span>
              <h3>A real conversation, not a checkbox</h3>
              <p>Every inquiry is read by Paul personally. If something on your health history needs a closer look, we will tell you — gently and clearly — before a deposit is ever discussed.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">02 / Preparation</span>
              <h3>Contraindication review &amp; dieta</h3>
              <p>We walk you through medications, conditions, and the pre-retreat dieta that protects the work. Responsible preparation is part of the retreat, not an afterthought.</p>
            </article>
            <article className="col-item">
              <span className="col-item__num">03 / In ceremony</span>
              <h3>Traditional Shipibo-led, never alone</h3>
              <p>Maestra Dominga and Maestro Raúl lead every ceremony with a support team. The room is held with attention, not theatrics, and never beyond a small group.</p>
            </article>
          </div>
          <div style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            <Link href="/safety-preparation" className="link-arrow">
              Read the full safety &amp; preparation page
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. HEALERS ── */}
      <section className="section section--cream" id="healers">
        <div className="container">
          <div className="healer-pair">
            {/* Text — appears first in DOM so mobile shows heading before photos */}
            <div className="healer-pair__text">
              <span className="eyebrow">Traditional Shipibo ceremonial lineage</span>
              <h2 className="display">Maestra Dominga <em>&amp; Maestro Raúl</em></h2>
              <p className="healer-pair__bio">
                Maestra Dominga and Maestro Raúl are a married Shipibo ceremonial couple who have shared more than 40 years of life, family, and service to their community. They come from Vista Alegre, a small village upriver from Pucallpa, and both were raised in families where plant medicine, ceremonial song, and spiritual healing traditions were passed down through parents and grandparents. Their work carries the balance of their shared path: Dominga brings softness, grounding, and feminine strength, while Raúl brings steadiness, protection, and ceremonial depth. Through their icaros and limpiezas, they help hold a careful ceremonial space rooted in lineage, humility, and respect for the traditions that came before them.
              </p>
              <p className="healer-pair__note">
                Together, they carry a living Shipibo tradition shaped by family, community, song, and decades of practice.
              </p>
            </div>
            {/* Photos — pushed left via order:-1 on desktop */}
            <div className="healer-pair__photos">
              <div className="healer-pair__photo">
                <figure className="healer-pair__portrait">
                  <img src="/images/dominga2.jpg" alt="Maestra Dominga at Dreamglade" />
                </figure>
                <div>
                  <p className="healer-pair__name">Maestra <em>Dominga</em></p>
                  <p className="healer-pair__role">Shipibo maestra</p>
                </div>
              </div>
              <div className="healer-pair__photo">
                <figure className="healer-pair__portrait">
                  <img src="/images/raul-old-website-photo.jpg" alt="Maestro Raúl at Dreamglade" />
                </figure>
                <div>
                  <p className="healer-pair__name">Maestro <em>Raúl</em></p>
                  <p className="healer-pair__role">Shipibo maestro</p>
                </div>
              </div>
            </div>
          </div>
          {/* Image strip between healers and Paul */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 2vw, 24px)", margin: "clamp(40px, 5vw, 64px) 0" }}>
            <figure style={{ margin: 0 }}>
              <img
                src="/images2/PLANTBATHGUEST5.jpg"
                alt="Plant bath at Dreamglade"
                loading="lazy"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
              />
            </figure>
            <figure style={{ margin: 0 }}>
              <img
                src="/images2/HUG4.jpg"
                alt="Ceremonial support at Dreamglade"
                loading="lazy"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
              />
            </figure>
          </div>

          <div className="team-aside">
            <figure className="team-aside__portrait">
              <img src="/images/people-paul.png" alt="Paul" />
            </figure>
            <div>
              <h3><em>Paul</em></h3>
              <p className="healer-pair__role">Integration support</p>
              <p>
                He reviews every application personally and helps guests understand whether Dreamglade is the right fit before anything is confirmed. He supports the inquiry and preparation process with clear communication, practical guidance, and integration support after the retreat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. EXPERIENCE PREVIEW ── */}
      <section className="section section--cream-warm" id="experience-preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What a retreat looks like</span>
            <h2 className="display">The rhythm of a <em>week here.</em></h2>
          </div>
          <div className="grid-3">
            <article className="col-item">
              <img src="/images/maloka-exterior.jpg" alt="The maloka ceremony house at Dreamglade, raised on stilts beside the lake" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <span className="col-item__num">01 / Ceremony nights</span>
              <h3>Monday, Wednesday, Friday</h3>
              <p>Preparation for ceremony begins at 6pm. Ceremony starts shortly after. Each ceremony runs five to six hours in the maloka, led by the healers.</p>
            </article>
            <article className="col-item">
              <img src="/images/trampoline-pillows.jpg" alt="A canopied trampoline-deck with pillows looking out across the lake at Dreamglade" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <span className="col-item__num">02 / Off-days</span>
              <h3>Quiet time to process</h3>
              <p>Off-days are where the work settles — sauna, plant baths, and long unhurried hours by the lake with a book or a journal. No phones, no signal. Most guests find the quiet to be the most unexpected gift of the week.</p>
            </article>
            <article className="col-item">
              <img src="/images/lake-overview.jpg" alt="Aerial view of the lake and thatched structures at Dreamglade, surrounded by Amazon rainforest" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              <span className="col-item__num">03 / The land</span>
              <h3>Lake, jungle, communal big house</h3>
              <p>25 hectares of forest, the still lake at the center, private thatched tambos to sleep in, and the communal big house where meals and conversation happen.</p>
            </article>
          </div>
          <div style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            <Link href="/what-to-expect" className="link-arrow">See the full experience</Link>
          </div>
        </div>
      </section>

      {/* ── 5b. GALLERY ── */}
      <section className="section section--cream-warm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="gallery-strip">
            <figure><img src="/images2/BIGHOUSE-KENTA.jpg" alt="Communal big house at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/DECK-MALOKA-REMI.jpg" alt="Deck near the maloka at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/IMG-20240708-WA0018.jpg" alt="Simple dieta meal at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/DOGS%20-%20Puente.jpg" alt="Dogs on the bridge at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/IMG-20240326-WA0011.jpg" alt="Retreat grounds at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/LAKE%20-%20TAMBO3.jpg" alt="Lake and tambo at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/MALOKABEDS.jpg" alt="Maloka beds at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/PAINT-TAMBOS-JESSICA.jpg" alt="Painted tambos at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/CORREDOR-WILLIAM.jpg" alt="Open-air corridor at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/IMG-20240708-WA0016.jpg" alt="Dreamglade grounds" loading="lazy" /></figure>
            <figure><img src="/images2/TAMBO%205%20_%20CAT.jpg" alt="Cat near a tambo at Dreamglade" loading="lazy" /></figure>
            <figure><img src="/images2/LAKE3-IVETA.jpg" alt="Lake at Dreamglade" loading="lazy" /></figure>
          </div>
          <p className="gallery-strip__caption">Daily life on the land</p>
        </div>
      </section>

      {/* ── 6. PRICING ── */}
      <PricingSection />

      {/* ── 7. AVAILABILITY ── */}
      <section className="section section--beige" id="availability">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Availability — 2026–2027</span>
            <h2 className="display">Six open <em>windows.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Each window below is a continuous retreat period. Guests join the retreat on Monday or Friday and can stay up to 2 weeks. Dates outside these windows are closed.
            </p>
          </div>
          <div className="avail-grid">
            {[
              { dates: "June 22 – July 18, 2026", limited: false },
              { dates: "July 27 – August 22, 2026", limited: false },
              { dates: "Aug 31 – Sept 26, 2026", limited: false },
              { dates: "Oct 19 – Nov 14, 2026", limited: false },
              { dates: "Nov 23 – Dec 19, 2026", limited: false },
              { dates: "January 18 – February 13, 2027", limited: false },
            ].map(({ dates, limited }) => (
              <article key={dates} className="avail-card">
                <span className={`avail-card__status${limited ? " avail-card__status--limited" : ""}`}>
                  <span className="dot" /> {limited ? "Limited availability" : "Available"}
                </span>
                <h3 className="avail-card__dates">{dates}</h3>
                <p className="avail-card__detail">Guests join Monday or Friday</p>
                <p className="avail-card__detail">Max 2 weeks if approved</p>
                <div className="avail-card__spots">
                  <span className="avail-card__spots-label">Spots left</span>
                  <a
                    href={`mailto:booking@dreamglade.com?subject=${encodeURIComponent(`Dreamglade availability inquiry: ${dates}`)}`}
                    className="avail-card__verify"
                  >
                    VERIFY WITH PAUL
                  </a>
                </div>
                <TermsGateCTA
                  label="Ask About This Retreat"
                  subject={`Dreamglade availability inquiry: ${dates}`}
                  className="avail-card__cta"
                />
              </article>
            ))}
          </div>
          <p style={{ marginTop: 40, fontSize: 13, color: "var(--muted)", maxWidth: 760, letterSpacing: "0.02em" }}>
            Maximum 10 guests on the land at any time. Guests join the retreat on Monday or Friday and can stay up to 2 weeks if approved. Dates between the windows above are closed. Paul confirms all dates and spaces personally after reviewing your inquiry.
          </p>
        </div>
      </section>

      {/* ── 8. REVIEWS ── */}
      <section className="section section--cream-warm" id="reviews">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Guest Reflections</span>
            <h2 className="display">What guests have <em>said.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Short excerpts from recent public Google reviews. Full reviews can be read on Google.
            </p>
          </div>
          <div className="rating-block">
            <span className="stars" aria-label="5 out of 5 stars" />
            <span className="rating-block__num">5.0</span>
            <span className="rating-block__count">from 182 Google reviews</span>
            <a className="rating-block__cta link-arrow" href="https://share.google/tiFj2NeKbOzgqksP4" target="_blank" rel="noopener">
              Read all Google reviews
            </a>
          </div>
          <div className="review-grid">
            {[
              { name: "Cody", time: "a week ago", excerpt: "The Dreamglade team made my whole experience feel so special. There wasn't a single moment where I felt uncomfortable, judged, or not supported." },
              { name: "Roberto Carneiro", time: "a month ago", excerpt: "I felt at home at Dreamglade. Wade, Clarissa, and the whole team made me feel safe throughout my stay. The small group size makes a big difference." },
              { name: "Chocolate Chick", time: "2 months ago", excerpt: "The staff genuinely care, right from intake with Paul to after and beyond. They are very serious about ayahuasca and each person's experience." },
              { name: "Kelley Bubnic", time: "4 months ago", excerpt: "As a solo female traveller, I felt so comfortable, safe, and surrounded by the best team to guide me through this experience." },
              { name: "Kai Jones", time: "6 months ago", excerpt: "One of the most difficult parts was choosing the right centre. From the first enquiry, Paul was in contact by email and helped me feel prepared." },
              { name: "T G", time: "a year ago", excerpt: "Paul helped me through the administrative process and what to expect. His emails were thoughtful and put me at ease." },
              { name: "Paul Clarke", time: "a year ago", excerpt: "From dealing with Paul during the booking process, to getting picked up in Iquitos and settling in, I felt welcome and comfortable." },
              { name: "Gregor Cox", time: "a year ago", excerpt: "The accommodation was clean, spacious, and free of mosquitos. The food was tasty, healthy, and plentiful. The price is more affordable compared to many other retreats." },
              { name: "Brian Y", time: "a year ago", excerpt: "Dreamglade is not a glamorous retreat. What you get is time to work with the medicine and yourself, with caring facilitators and a quiet jungle setting." },
            ].map(({ name, time, excerpt }, i) => (
              <article key={i} className="review-card" aria-label={`Google review from ${name}`}>
                <span style={{ color: "#E6A700", fontSize: "16px", letterSpacing: "0.08em" }} aria-label="5 out of 5 stars">★★★★★</span>
                <p className="review-card__quote">&ldquo;{excerpt}&rdquo;</p>
                <div className="review-card__meta">
                  <span>{name}</span>
                  <span>{time}</span>
                </div>
                <span className="review-card__badge">Google review</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ PREVIEW ── */}
      <section className="section section--forest" id="faq-preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Common questions</span>
            <h2 className="display" style={{ color: "var(--cream)" }}>Before you <em>ask.</em></h2>
          </div>
          <div className="faq-list" role="list">
            <FAQItem question="Is Dreamglade right for me?">
              <p>Dreamglade is a small-group retreat — a maximum of ten guests at a time. It tends to suit people who want a quiet, grounded setting, who are willing to do real preparation before they arrive, and who are open to a traditional Shipibo-led ceremony rather than a Western program. Paul reviews every application personally to talk this through with you.</p>
            </FAQItem>
            <FAQItem question="How long is a retreat, and how many ceremonies?">
              <p>The minimum stay is five nights, which includes three ceremonies. The maximum is two weeks, with up to six ceremonies. Ceremonies are held on Monday, Wednesday and Friday nights. Preparation for ceremony begins at 6pm and ceremony starts shortly after, running for five to six hours.</p>
            </FAQItem>
            <FAQItem question="What does the price include?">
              <p>Current pricing is shown in the <a href="/#pricing" style={{ color: "var(--gold)", borderBottom: "1px solid var(--gold)" }}>pricing section</a> of the home page. All tambos include accommodation, all meals, ceremonies, plant dieta, breathwork, sauna, and integration support. Group transport from the city meeting point in Iquitos is included, and drop-off at Iquitos airport is included for flights after 3 PM. Airport pickup on arrival is not included.</p>
            </FAQItem>
            <FAQItem question="How do I apply?">
              <p>The first step is a short inquiry — about eight questions, no medical history. Paul reads every one personally. If it looks like a fit, he writes back to start a conversation. The full registration and signed agreement come later, by email, before your arrival date is confirmed.</p>
            </FAQItem>
            <FAQItem question="Where exactly is Dreamglade?">
              <p>Dreamglade is near Moralillo, under an hour's drive from Iquitos in the Peruvian Amazon. The property is 25 hectares of rainforest lakeside. Guest rooms have no electricity or Wi-Fi by design. Electricity is limited and simple, and the retreat is designed for quiet time away from normal digital life.</p>
            </FAQItem>
          </div>
          <div style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            <Link href="/faq" className="link-arrow">All frequently asked questions</Link>
          </div>
        </div>
      </section>

      {/* ── 10. APPLY CTA ── */}
      <section className="bleed-cta" id="apply-cta">
        <div className="bleed-cta__media">
          <img src="/images/hero-alt-overview.jpg" alt="An overview of Dreamglade — thatched structures beside the lake, surrounded by Amazon rainforest" />
        </div>
        <div>
          <span className="bleed-cta__eyebrow">The first step is a conversation</span>
          <h2 className="bleed-cta__title">Begin your <em>Dreamglade</em> application.</h2>
          <p className="bleed-cta__sub">
            Paul reads every inquiry. It takes about eight questions to get started — no medical history at this stage.
          </p>
          <TermsGateCTA />
          <p className="bleed-cta__note">
            After your application is reviewed, Paul will email you the full registration and signed agreement before your arrival date is confirmed.
          </p>
        </div>
      </section>

    </>
  );
}
