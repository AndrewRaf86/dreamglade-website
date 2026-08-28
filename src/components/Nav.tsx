"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

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
        <Link className="site-header__wordmark" href="/" aria-label="Dreamglade — home" prefetch={false}>
          <Image src="/images/logo.svg" alt="Dreamglade" width={520} height={120} priority />
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
          <Link
            href="/#about"
            onClick={() => {
              trackEvent("About Click", { location: "nav", destination: "about" });
              setMenuOpen(false);
            }}
          >
            About
          </Link>
          <Link
            href="/safety-preparation"
            aria-current={pathname === "/safety-preparation" ? "page" : undefined}
            onClick={() => {
              trackEvent("Safety Click", { location: "nav", destination: "safety" });
              setMenuOpen(false);
            }}
          >
            Safety &amp; Preparation
          </Link>
          <Link
            href="/what-to-expect"
            aria-current={pathname === "/what-to-expect" ? "page" : undefined}
            onClick={() => {
              trackEvent("Experience Click", { location: "nav", destination: "what-to-expect" });
              setMenuOpen(false);
            }}
          >
            What to Expect
          </Link>
          <Link
            href="/master-plants"
            aria-current={pathname === "/master-plants" ? "page" : undefined}
            onClick={() => {
              trackEvent("Plants Click", { location: "nav", destination: "master-plants" });
              setMenuOpen(false);
            }}
          >
            Master Plants
          </Link>
          <Link
            href="/faq"
            aria-current={pathname === "/faq" ? "page" : undefined}
            onClick={() => {
              trackEvent("FAQ Click", { location: "nav", destination: "faq" });
              setMenuOpen(false);
            }}
          >
            FAQ
          </Link>
          <Link
            href="/apply"
            className="is-cta"
            onClick={() => {
              trackEvent("Apply Click", { location: "nav", destination: "apply" });
              setMenuOpen(false);
            }}
          >
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}
