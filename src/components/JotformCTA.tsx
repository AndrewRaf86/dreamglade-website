"use client";

export default function JotformCTA({ label = "Begin Your Application" }: { label?: string }) {
  return (
    <button
      className="cta-button"
      onClick={() =>
        window.open(
          "https://form.jotform.com/261348683042054",
          "_blank",
          "scrollbars=yes,toolbar=no,width=700,height=500"
        )
      }
    >
      {label}
      <span className="arrow" aria-hidden="true" />
    </button>
  );
}
