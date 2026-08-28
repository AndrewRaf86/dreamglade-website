import type { Metadata } from "next";
import Nav from "@/components/Nav";
import TermsGateCTA from "@/components/TermsGateCTA";
import TrackedLink from "@/components/TrackedLink";
import SiteImage from "@/components/SiteImage";
import ProcessSteps from "@/components/ProcessSteps";
import StructuredData from "@/components/StructuredData";
import { buildPageGraph, SCHEMA_IDS } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Begin Your Inquiry",
  description:
    "Begin your Dreamglade inquiry. Paul reviews every application personally. This is the first step in a conversation.",
  alternates: {
    canonical: "https://dreamglade.com/apply",
    types: { "text/markdown": "https://dreamglade.com/md/apply" },
  },
  openGraph: {
    title: "Begin Your Inquiry — Dreamglade",
    description:
      "Start your Dreamglade inquiry. A short first-stage application, read personally by Paul. Safety-first screening before any deposit.",
    url: "https://dreamglade.com/apply",
    images: [{ url: "/images/lake-overview.jpg", alt: "Dreamglade retreat center and lake near Iquitos, Peru" }],
  },
};

const applyJsonLd = buildPageGraph({
  path: "/apply",
  name: "Begin a Dreamglade Retreat Inquiry",
  description: "Dreamglade's short Stage 1 inquiry and personal handoff to Paul; no automated screening, booking, acceptance, or payment.",
  about: [SCHEMA_IDS.organization, SCHEMA_IDS.service],
});

export default function Apply() {
  return (
    <>
      <StructuredData id="apply-page-graph" data={applyJsonLd} />
      <Nav theme="light" />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">Stage 1 — inquiry</span>
          <h1>Begin your Dreamglade <em>retreat inquiry.</em></h1>
          <p className="page-hero__sub">
            Paul reviews every application personally. This is the first step in a conversation.
          </p>
          <div style={{ marginTop: 16 }}>
            <TermsGateCTA trackLocation="apply" />
          </div>
        </div>
      </section>

      <section className="section section--cream" id="how-it-works">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2 className="display">Three small <em>steps.</em></h2>
            <p className="lede" style={{ marginTop: 12 }}>
              We do not lock dates on a calendar or take a payment up front. The first thing is a short inquiry — no medical history at this stage.
            </p>
          </div>
          <ProcessSteps />
          <div className="trust-strip">
            <span className="stars" role="img" aria-label="5 out of 5 stars" />
            <span><strong style={{ color: "var(--ink)", fontWeight: 600 }}>5.0</strong> &middot; 182 verified Google reviews</span>
            <span aria-hidden="true">·</span>
            <TrackedLink href="https://share.google/tiFj2NeKbOzgqksP4" target="_blank" rel="noopener" event="Google Reviews Click" properties={{ location: "apply", destination: "google-reviews" }}>Read them on Google</TrackedLink>
          </div>
        </div>
      </section>

      <section className="section section--forest" id="begin">
        <div className="container container--narrow center">
          <span className="eyebrow eyebrow--center" style={{ justifySelf: "center" }}>Ready when you are</span>
          <h2 className="display" style={{ color: "var(--cream)", marginTop: 16, marginBottom: 40 }}>The first <em>step.</em></h2>
          <TermsGateCTA trackLocation="apply" />
          <p style={{ marginTop: 32, fontSize: 14, color: "var(--beige)", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            After your application is reviewed, Paul will email you the full registration and signed agreement before your arrival date is confirmed.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="two-col">
            <div className="two-col__media">
              <SiteImage src="/images/lake-from-bighouse.jpg" alt="The maloka at Dreamglade, looking across the still lake" width={3072} height={4096} />
              <p className="two-col__caption">The maloka, looking across the lake</p>
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
