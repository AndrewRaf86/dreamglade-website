import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <p className="site-footer__brand"><img src="/images/logo.svg" alt="Dreamglade" /></p>
            <p className="site-footer__desc">
              A small-group ayahuasca retreat near Iquitos, Peru. Shipibo-led ceremonies on 25 hectares of lakeside Amazon rainforest.
            </p>
            <p className="site-footer__contact">
              <strong>Caserio Moralillo Parcela 21</strong><br />
              Ctra Iquitos-Nauta, 16000<br />
              Iquitos, Peru<br />
              <br />
              <strong><a href="mailto:booking@dreamglade.com">booking@dreamglade.com</a></strong><br />
              <a href="tel:+51920478240">+51 920 478 240</a><br />
              <a href="tel:+51924866141">+51 924 866 141</a>
            </p>
            <p className="site-footer__social">
              <TrackedLink href="https://www.instagram.com/dreamglade/" target="_blank" rel="noopener noreferrer" event="Instagram Click" properties={{ location: "footer", destination: "instagram" }}>Instagram</TrackedLink>
              <span aria-hidden="true">·</span>
              <TrackedLink href="https://www.youtube.com/@dreamgladeamazon" target="_blank" rel="noopener noreferrer" event="YouTube Click" properties={{ location: "footer", destination: "youtube" }}>YouTube</TrackedLink>
            </p>
          </div>
          <div>
            <h4>The site</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><TrackedLink href="/safety-preparation" event="Safety Click" properties={{ location: "footer", destination: "safety" }}>Safety &amp; Preparation</TrackedLink></li>
              <li><TrackedLink href="/what-to-expect" event="Experience Click" properties={{ location: "footer", destination: "what-to-expect" }}>What to Expect</TrackedLink></li>
              <li><TrackedLink href="/faq" event="FAQ Click" properties={{ location: "footer", destination: "faq" }}>FAQ</TrackedLink></li>
              <li><TrackedLink href="/apply" event="Apply Click" properties={{ location: "footer", destination: "apply" }}>Apply</TrackedLink></li>
              <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4>Reviews</h4>
            <ul>
              <li><TrackedLink href="https://share.google/tiFj2NeKbOzgqksP4" target="_blank" rel="noopener" event="Google Reviews Click" properties={{ location: "footer", destination: "google-reviews" }}>Google Reviews →</TrackedLink></li>
              <li><Link href="/#reviews">Guest reflections</Link></li>
            </ul>
          </div>
          <div>
            <h4>The retreat</h4>
            <ul>
              <li><TrackedLink href="/#about" event="About Click" properties={{ location: "footer", destination: "about" }}>About</TrackedLink></li>
              <li><Link href="/#healers">The healers</Link></li>
              <li><TrackedLink href="/#pricing" event="Pricing Click" properties={{ location: "footer", destination: "pricing" }}>Pricing</TrackedLink></li>
              <li><Link href="/#availability">2026 availability</Link></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 Dreamglade. All rights reserved.</span>
          <span>Managed by Wade Bucher &amp; Clarisa Gutierrez · Founded by Stacy Povey.</span>
        </div>
      </div>
    </footer>
  );
}
