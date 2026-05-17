import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <p className="site-footer__brand"><span className="mark" />DreamGlade</p>
            <p className="site-footer__desc">
              A small-group ayahuasca retreat near Iquitos, Peru. Shipibo-led ceremonies on twenty hectares of lakeside Amazon rainforest.
            </p>
            <p className="site-footer__contact">
              <strong>Caserio Moralillo Parcela 21</strong><br />
              Ctra Iquitos-Nauta, 16000<br />
              Iquitos, Peru<br />
              <br />
              <strong>booking@dreamglade.com</strong><br />
              +51 920 478 240
            </p>
          </div>
          <div>
            <h4>The site</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/safety-preparation">Safety &amp; Preparation</Link></li>
              <li><Link href="/what-to-expect">What to Expect</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/apply">Apply</Link></li>
              <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4>Reviews</h4>
            <ul>
              <li><a href="https://share.google/tiFj2NeKbOzgqksP4" target="_blank" rel="noopener">Google Reviews →</a></li>
              <li><Link href="/#reviews">Guest reflections</Link></li>
            </ul>
          </div>
          <div>
            <h4>The retreat</h4>
            <ul>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#healers">The healers</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              <li><Link href="/#availability">2026 availability</Link></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 DreamGlade. All rights reserved.</span>
          <span>Stewarded by Wade Bucher &amp; Clarisa Gutierrez · Founded by Stace.</span>
        </div>
      </div>
    </footer>
  );
}
