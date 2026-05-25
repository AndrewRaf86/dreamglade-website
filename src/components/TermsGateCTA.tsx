"use client";
import { useState } from "react";

export default function TermsGateCTA({ label = "Begin Your Application" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  function handleOpen() {
    setChecked(false);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setChecked(false);
  }

  function handleContinue() {
    window.open(
      "https://form.jotform.com/261348683042054",
      "_blank",
      "scrollbars=yes,toolbar=no,width=700,height=500"
    );
    setOpen(false);
    setChecked(false);
  }

  return (
    <>
      <button className="cta-button" onClick={handleOpen}>
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
          <div className="terms-gate-modal">
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
