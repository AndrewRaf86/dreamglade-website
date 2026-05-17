"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Nav({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass = [
    "site-header",
    theme === "light" ? "theme-light" : "",
    scrolled ? "is-scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className="container site-header__inner">
        <Link className="site-header__wordmark" href="/" aria-label="DreamGlade — home">
          <img src="/images/logo-dreamglade.png" alt="DreamGlade" />
        </Link>

        <button
          className="site-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav
          className={`site-header__nav${menuOpen ? " is-open" : ""}`}
          id="primary-nav"
          aria-label="Primary"
        >
          <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link
            href="/safety-preparation"
            aria-current={pathname === "/safety-preparation" ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Safety
          </Link>
          <Link
            href="/what-to-expect"
            aria-current={pathname === "/what-to-expect" ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Experience
          </Link>
          <Link
            href="/faq"
            aria-current={pathname === "/faq" ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/apply"
            className="is-cta"
            onClick={() => setMenuOpen(false)}
          >
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}
