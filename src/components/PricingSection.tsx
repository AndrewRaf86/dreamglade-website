import { getPricing } from "@/lib/pricing";
import Link from "next/link";

export default async function PricingSection() {
  const { usd, pen, penRate } = await getPricing();

  const penNote = penRate
    ? `Approx. S/. at today's rate (1 USD = S/. ${penRate.toFixed(2)})`
    : null;

  return (
    <section className="section section--cream" id="pricing">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pricing</span>
          <h2 className="display">Three ways to <em>stay.</em></h2>
          <p className="lede" style={{ marginTop: 12 }}>
            All-inclusive: accommodation, meals, ceremonies, plant dieta, breathwork, sauna, and integration support.
          </p>
        </div>

        <div className="pricing-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {/* Communal tambo */}
          <article className="pricing-card">
            <div className="pricing-card__photo">
              <img src="/images/sharetambo-front.jpg" alt="Communal tambo at Dreamglade" />
            </div>
            <span className="pricing-card__eyebrow">Communal tambo</span>
            <h3 className="pricing-card__name">Communal tambo</h3>
            <p className="pricing-card__price">
              <span className="pricing-card__price-num">${usd.communal} USD</span>
              <span className="pricing-card__price-unit">per person / day</span>
            </p>
            {pen.communal && (
              <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 4px" }}>
                ≈ S/. {pen.communal} <em style={{ fontStyle: "normal", opacity: 0.75 }}>(approximate)</em>
              </p>
            )}
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 20px" }}>
              Up to 6 people. A shared thatched cabin steps from the maloka. Bathrooms are a short walk away — there is no private toilet in the tambo.
            </p>
            <ul className="pricing-card__features">
              <li>All meals, ceremonies, plant dieta, breathwork, sauna</li>
              <li>Integration support throughout your stay and after</li>
              <li>Group transport from the city meeting point in Iquitos</li>
            </ul>
          </article>

          {/* Two-person tambo */}
          <article className="pricing-card">
            <div className="pricing-card__photo">
              <img src="/images/tambo7-lakeview.jpg" alt="Two-person tambo at Dreamglade" />
            </div>
            <span className="pricing-card__eyebrow">Two-person tambo</span>
            <h3 className="pricing-card__name">Two-person tambo</h3>
            <p className="pricing-card__price">
              <span className="pricing-card__price-num">${usd.twoPersonTambo} USD</span>
              <span className="pricing-card__price-unit">per person / day</span>
            </p>
            {pen.twoPersonTambo && (
              <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 4px" }}>
                ≈ S/. {pen.twoPersonTambo} <em style={{ fontStyle: "normal", opacity: 0.75 }}>(approximate)</em>
              </p>
            )}
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 20px" }}>
              For family, couples, or friends wanting to stay together. Has a private dry compost toilet.
            </p>
            <ul className="pricing-card__features">
              <li>All meals, ceremonies, plant dieta, breathwork, sauna</li>
              <li>Integration support throughout your stay and after</li>
              <li>Group transport from the city meeting point in Iquitos</li>
            </ul>
          </article>

          {/* Private tambo */}
          <article className="pricing-card">
            <div className="pricing-card__photo">
              <img src="/images2/TAMBO%205%20-%20ENTRY.jpg" alt="Private tambo at Dreamglade" />
            </div>
            <span className="pricing-card__eyebrow">Private tambo</span>
            <h3 className="pricing-card__name">Private tambo</h3>
            <p className="pricing-card__price">
              <span className="pricing-card__price-num">${usd.single} USD</span>
              <span className="pricing-card__price-unit">per person / day</span>
            </p>
            {pen.single && (
              <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 4px" }}>
                ≈ S/. {pen.single} <em style={{ fontStyle: "normal", opacity: 0.75 }}>(approximate)</em>
              </p>
            )}
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 20px" }}>
              A private thatched cabin to yourself, with a private compost toilet. Most have lake or jungle views — quiet, simple, and private.
            </p>
            <ul className="pricing-card__features">
              <li>All meals, ceremonies, plant dieta, breathwork, sauna</li>
              <li>Integration support throughout your stay and after</li>
              <li>Group transport from the city meeting point in Iquitos</li>
            </ul>
          </article>
        </div>

        <div style={{ marginTop: 32, padding: "16px 20px", background: "var(--cream-warm)", borderLeft: "3px solid var(--gold)", borderRadius: 4, maxWidth: 760 }}>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Prices are listed in USD.</strong>{" "}
            Approximate Peruvian Soles equivalents are shown for convenience and may vary with the exchange rate at the time of payment.{" "}
            {penNote && <span>{penNote}. </span>}
            Do not book flights until Paul has confirmed your dates and registration.
          </p>
        </div>

        <div style={{ marginTop: 20, display: "grid", gap: 10, maxWidth: 760 }}>
          <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Minimum 5 nights</strong> (3 ceremonies).{" "}
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Maximum 2 weeks</strong> (6 ceremonies).
            Same daily rate regardless of stay length.
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
            Drop-off at Iquitos airport is included for flights departing after 3 PM on the last day.
            Airport pickup on arrival is not included.
            Helpful travel tip: Uber is available in Iquitos, but it is smart to bring soles cash in case Uber is not working or you need to pay a motor taxi in cash. Motor taxis from the airport to hotels in Iquitos usually cost about 40–70 soles.
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
            <Link href="/apply" style={{ color: "var(--gold-deep)", borderBottom: "1px solid var(--gold-deep)" }}>Begin an inquiry</Link> to confirm availability and pricing.
            No deposit is taken until Paul has reviewed your application and sent the full registration.
          </p>
        </div>
      </div>
    </section>
  );
}
