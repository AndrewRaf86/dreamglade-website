"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

export default function FAQItem({ question, children }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " is-open" : ""}`}>
      <button
        className="faq-item__btn"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        <span className="faq-item__icon" aria-hidden="true" />
      </button>
      <div className="faq-item__panel">
        <div className="faq-item__panel-inner">{children}</div>
      </div>
    </div>
  );
}
