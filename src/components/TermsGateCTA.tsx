"use client";
import { useEffect, useRef, useState } from "react";
import { trackEvent, type TrackedEventName } from "@/lib/analytics";

export default function TermsGateCTA({
  label = "Begin Your Application",
  subject = "Dreamglade retreat inquiry",
  className,
  trackLocation = "hero",
  trackEvent: openEvent = "Apply Click",
  trackProperties,
}: {
  label?: string;
  subject?: string;
  className?: string;
  trackLocation?: string;
  trackEvent?: TrackedEventName;
  trackProperties?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function handleOpen() {
    trackEvent(openEvent, trackProperties ?? { location: trackLocation, destination: "apply" });
    setChecked(false);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setChecked(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    const modal = modalRef.current;
    modal?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleContinue() {
    trackEvent("Email Click", { location: trackLocation, destination: "booking" });
    window.location.href = `mailto:booking@dreamglade.com?subject=${encodeURIComponent(subject)}`;
    setOpen(false);
    setChecked(false);
  }

  return (
    <>
      <button ref={triggerRef} className={className ?? "cta-button"} onClick={handleOpen}>
        {label}
        <span className="arrow" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="terms-gate-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-gate-title"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="terms-gate-modal" ref={modalRef} tabIndex={-1}>
            <p className="terms-gate-eyebrow">Before continuing</p>
            <h2 id="terms-gate-title" className="terms-gate-title">
              Please review the Terms &amp; Conditions
            </h2>
            <p className="terms-gate-body">
              Dreamglade is a traditional ayahuasca retreat with important health, safety, preparation, payment, cancellation, and participation terms. Please review these before starting your inquiry.
            </p>
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="terms-gate-link"
            >
              Read the Terms &amp; Conditions ↗
            </a>
            <label className="terms-gate-check">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <span>I have read and reviewed the Terms &amp; Conditions.</span>
            </label>
            <div className="terms-gate-actions">
              <button
                className="cta-button"
                onClick={handleContinue}
                disabled={!checked}
              >
                Continue
                <span className="arrow" aria-hidden="true" />
              </button>
              <button className="terms-gate-cancel" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
