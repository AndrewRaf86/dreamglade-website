import type { Metadata } from "next";
import Nav from "@/components/Nav";
import TermsGateCTA from "@/components/TermsGateCTA";

export const metadata: Metadata = {
  title: "Begin Your Inquiry",
  description:
    "Begin your DreamGlade inquiry. Paul, our integration coach, reviews every application personally. This is the first step in a conversation.",
  alternates: { canonical: "https://dreamglade.com/apply" },
  openGraph: {
    title: "Begin Your Inquiry — DreamGlade",
    description:
      "Start your DreamGlade inquiry. A short first-stage application, read personally by Paul, our integration coach. Safety-first screening before any deposit.",
    url: "https://dreamglade.com/apply",
    images: [{ url: "/images/lake-overview.jpg" }],
  },
};

export default function Apply() {
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">Stage 1 — inquiry</span>
          <h1>Begin your <em>inquiry.</em></h1>
          <p className="page-hero__sub">
            Paul, our integration coach, reviews every application personally. This is the first step in a conversation.
          </p>
          <div style={{ marginTop: 16 }}>
            <TermsGateCTA />
          </div>
        </div>
      </section>

      <section className="section section--cream" id="how-it-works">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2 className="display">Three small <em>steps.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              We do not lock dates on a calendar or take a payment up front. The first thing is a short inquiry — about eight questions, no medical history at this stage.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step__num">01</span>
              <h3>Apply</h3>
              <p>A short inquiry — about eight questions. Your name, where you are from, the retreat dates you are considering, and a few words about why now. No medical history at this stage.</p>
              <span className="step__connector" aria-hidden="true" />
            </div>
            <div className="step">
              <span className="step__num">02</span>
              <h3>Review</h3>
              <p>Paul reads every inquiry personally — usually within a day. If something needs a closer look before we go further, he will tell you, gently and clearly.</p>
              <span className="step__connector" aria-hidden="true" />
            </div>
            <div className="step">
              <span className="step__num">03</span>
              <h3>Conversation</h3>
              <p>If it looks like a fit, Paul writes back to start a real conversation — by email, on your time. From there, the full registration, agreement, and deposit come later, also by email.</p>
            </div>
          </div>
          <div className="trust-strip">
            <span className="stars" aria-label="5 out of 5 stars" />
            <span><strong style={{ color: "var(--ink)", fontWeight: 600 }}>5.0</strong> &middot; 182 verified Google reviews</span>
            <span aria-hidden="true">·</span>
            <a href="https://share.google/tiFj2NeKbOzgqksP4" target="_blank" rel="noopener">Read them on Google</a>
          </div>
        </div>
      </section>

      <section className="section section--forest" id="begin">
        <div className="container container--narrow center">
          <span className="eyebrow eyebrow--center" style={{ justifySelf: "center" }}>Ready when you are</span>
          <h2 className="display" style={{ color: "var(--cream)", marginTop: 16 }}>The first <em>eight questions.</em></h2>
          <p className="lede" style={{ color: "var(--cream)", margin: "16px auto 40px", maxWidth: 640 }}>
            The inquiry opens in a small window. It takes about five minutes. You can save it for later if you need to.
          </p>
          <TermsGateCTA />
          <p style={{ marginTop: 32, fontSize: 14, color: "var(--beige)", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            After your application is reviewed, Paul will email you the full registration and signed agreement before your arrival date is confirmed.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <img src="/images/lake-from-bighouse.jpg" alt="The still lake at DreamGlade seen from the communal house" />
              <p className="two-col__caption">From the porch at Mapacho</p>
            </div>
            <div>
              <span className="eyebrow">What we&apos;ll ask</span>
              <h2 className="display" style={{ marginTop: 16 }}>A few questions, <em>nothing more.</em></h2>
              <div className="flow flow--lg" style={{ marginTop: 28 }}>
                <p>The Stage 1 inquiry is brief on purpose. We use it to start a conversation, not to filter you through a funnel.</p>
              </div>
              <ol className="facts">
                <li><span className="facts__num">01</span><span className="facts__text">Your name and where you are writing from.</span></li>
                <li><span className="facts__num">02</span><span className="facts__text">Retreat dates you are considering.</span></li>
                <li><span className="facts__num">03</span><span className="facts__text">Whether you would like a shared or single tambo.</span></li>
                <li><span className="facts__num">04</span><span className="facts__text">Whether you have done ceremony work before.</span></li>
                <li><span className="facts__num">05</span><span className="facts__text">A few words about why now.</span></li>
                <li><span className="facts__num">06</span><span className="facts__text">Anything you want us to know up front.</span></li>
              </ol>
              <p style={{ marginTop: 28, fontSize: 14, color: "var(--muted)" }}>
                Full health intake, sensitive personal data, and the agreement are part of <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Stage 2 registration</strong>, which Paul will email to you after he has reviewed your inquiry and you have agreed to move forward.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
