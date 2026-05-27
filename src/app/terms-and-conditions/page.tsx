import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Dreamglade Terms and Conditions. Public-readable terms for transparency. The final agreement is signed on the private Stage 2 registration form.",
  alternates: { canonical: "https://dreamglade.com/terms-and-conditions" },
  openGraph: {
    title: "Terms & Conditions — Dreamglade",
    description:
      "Dreamglade's public-readable Terms and Conditions, published for transparency. The final binding agreement is signed during private Stage 2 registration.",
    url: "https://dreamglade.com/terms-and-conditions",
  },
};

export default function TermsAndConditions() {
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">Terms and Conditions</span>
          <h1>Terms and conditions.</h1>
          <p className="page-hero__sub">
            These terms are published for transparency. The final, binding agreement is signed during Stage 2 registration, which Paul sends by email to approved applicants only.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container container--narrow">
          <div className="notice notice--medical" style={{ marginBottom: "clamp(48px, 5vw, 72px)" }}>
            <span className="notice__label">Medical disclaimer</span>
            <h3>Dreamglade is a retreat center, not a medical provider.</h3>
            <p>
              Dreamglade provides traditional ayahuasca ceremonies in a ceremonial and cultural context. We do not offer medical treatment, therapy, or cures for any physical or mental health condition. Participants are responsible for consulting their healthcare providers regarding any medical concerns. Ayahuasca is not appropriate for everyone.
            </p>
          </div>

          <div className="prose">
            <h2>1. About these terms</h2>
            <p>
              These Terms and Conditions describe the relationship between Dreamglade and any person who applies to attend, or attends, a retreat at Dreamglade. They are published on this page for transparency. They do not constitute a signed agreement on their own.
            </p>
            <p>
              The binding agreement is signed electronically during Stage 2 registration, which is sent by email to approved applicants only after Paul has reviewed and accepted the Stage 1 inquiry. A PDF copy of the signed agreement is provided to the applicant and retained by Dreamglade at <strong>booking@dreamglade.com</strong>.
            </p>

            <h2>2. Application and acceptance</h2>
            <p>
              Submitting an inquiry through the public application form (Stage 1) does not confirm a place at any retreat. Places are confirmed only after:
            </p>
            <ul>
              <li>Paul has reviewed and accepted the inquiry,</li>
              <li>the applicant has completed Stage 2 registration and the binding agreement, and</li>
              <li>the deposit has been received.</li>
            </ul>
            <p>
              Dreamglade may decline an application at its discretion, including on safety, contraindication, or capacity grounds.
            </p>

            <h2>3. Pricing</h2>
            <p>
              Prices for retreats at Dreamglade are listed in US dollars (USD) per person per day. Approximate Peruvian Soles equivalents are shown for convenience and may vary with the exchange rate at the time of payment. Current pricing is shown on the <Link href="/#pricing">pricing section</Link> of the home page and is confirmed in writing during Stage 2 registration.
            </p>
            <p>
              Prices include accommodation, meals, ceremonies, plant dieta, breathwork, sauna, integration support, group transport from the designated city meeting point in Iquitos on arrival, and drop-off at Iquitos airport for departures after 3 PM on the last day. Prices do not include flights, airport pickup, travel insurance, visas, vaccinations, or personal expenses.
            </p>

            <h2>4. Deposit, payment, and cancellation</h2>
            <p>
              A <strong>50% deposit</strong> is required to confirm a place at a retreat. The remaining balance is due before or on arrival, in accordance with the terms set out in the signed Stage 2 agreement.
            </p>
            <div className="notice notice--medical" style={{ margin: "16px 0" }}>
              <span className="notice__label">Placeholder — needs legal confirmation</span>
              <p style={{ margin: 0 }}>
                The cancellation policy below is provisional and has not yet been legally confirmed. The figures shown (7-day window, 100 USD fee) should be verified by Wade, Clarisa, or legal counsel before this page is relied upon. The binding cancellation terms are those in the signed Stage 2 agreement.
              </p>
            </div>
            <p>
              Cancellations made <strong>within seven (7) days of the deposit being paid</strong> are eligible for a refund of the deposit less a 100 USD administrative fee.
            </p>
            <p>
              The handling of cancellations made after this window, no-shows, early departures, and Dreamglade-initiated cancellations is set out in detail in the Stage 2 agreement. This page does not vary or replace that agreement.
            </p>

            <h2>5. Health, contraindications, and disclosure</h2>
            <p>
              Dreamglade requires every guest to make a full, honest disclosure of their physical and mental health history, current medications, and any conditions that may bear on participation. This information is collected in the Stage 2 registration form and is treated as sensitive personal data.
            </p>
            <p>
              Ayahuasca interacts with many medications and conditions. Dreamglade may decline a guest&apos;s participation, at any stage, on safety grounds. A non-exhaustive list of conditions and medications that require careful consideration is published on the <Link href="/safety-preparation">Safety &amp; Preparation</Link> page.
            </p>
            <p>
              Participants confirm that they have consulted, or will consult, their own healthcare provider before attending, and that they assume responsibility for any health decision they make in connection with the retreat.
            </p>

            <h2>6. Conduct on the property</h2>
            <p>
              Dreamglade is a small, shared retreat center. Guests are expected to behave in a way that respects:
            </p>
            <ul>
              <li>The healers, staff, and other guests.</li>
              <li>The land, the lake, the plants, and the animals on the property.</li>
              <li>The Shipibo tradition under which ceremonies are held.</li>
            </ul>
            <p>
              Dreamglade reserves the right to end a guest&apos;s stay, without refund, in cases of conduct that endangers the safety of others, disrupts the ceremony, or otherwise materially breaches the agreement. Detailed conduct provisions are set out in the Stage 2 agreement.
            </p>

            <h2>7. Photography, video, and privacy</h2>
            <p>
              Dreamglade respects the privacy of every guest. Photographs or videos showing identifiable guests will not be used publicly without that guest&apos;s written permission, even if taken on the property.
            </p>
            <p>
              Guests are asked, in turn, to respect the privacy of other guests and of the healers and staff — and to refrain from taking photographs or video of any other person without their consent, particularly during ceremony, integration circles, or any moment of personal vulnerability.
            </p>

            <h2>8. Substances, alcohol, and prohibited items</h2>
            <p>
              Alcohol, recreational substances, and any substance contraindicated with ayahuasca are not permitted on the property during a retreat. Guests are also asked to honor the pre-retreat dieta described on the <Link href="/safety-preparation">Safety &amp; Preparation</Link> page.
            </p>

            <h2>9. Insurance and travel</h2>
            <p>
              Guests are responsible for arranging their own travel to and from Peru, including any required visas and vaccinations, and for holding adequate travel and medical insurance for the duration of the trip. Specific recommendations are included in the Stage 2 registration materials.
            </p>

            <h2>10. Limitation of liability</h2>
            <p>
              The limits of Dreamglade&apos;s liability are set out in detail in the Stage 2 agreement, subject to applicable law in Peru. Nothing on this page is intended to exclude any liability that cannot lawfully be excluded.
            </p>

            <h2>11. Changes to retreats and to these terms</h2>
            <p>
              Dreamglade may, on rare occasions, need to change retreat dates, accommodation arrangements, or program details for reasons outside its reasonable control (including weather, illness, or other force majeure events). Where this happens, Dreamglade will communicate with affected guests as quickly as possible and work in good faith to find a fair resolution.
            </p>
            <p>
              These public terms may be updated from time to time. The version that governs your retreat is the version of the Stage 2 agreement you sign.
            </p>

            <h2>12. Governing law</h2>
            <p>
              The Stage 2 agreement is governed by the laws of Peru, with venue and jurisdiction to be confirmed in the final agreement.
            </p>

            <h2>13. Contact</h2>
            <p>
              Questions about these terms or any aspect of a retreat can be sent to <strong>booking@dreamglade.com</strong>.
            </p>

            <hr />
          </div>
        </div>
      </section>
    </>
  );
}
