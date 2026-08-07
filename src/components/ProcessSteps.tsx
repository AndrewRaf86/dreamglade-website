"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Apply",
    body: "Let us know the dates and accommodation you would like to join us for.",
  },
  {
    num: "02",
    title: "Review",
    body: "Paul reads every inquiry personally — usually within a day. If something needs a closer look before we go further, he will tell you, gently and clearly.",
  },
  {
    num: "03",
    title: "Conversation",
    body: "Paul writes back — by email, on your time. From there, the full registration, terms and conditions agreement, and deposit come later, also by email.",
  },
];

export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animated = container.querySelectorAll<HTMLElement>(".step, .step__connector");

    if (reduce) {
      container.classList.add("spine-visible");
      animated.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          container.classList.add("spine-visible");
          animated.forEach((el) => el.classList.add("is-visible"));
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  return (
    <div className="steps" ref={containerRef}>
      {STEPS.map((step, i) => (
        <div className="step" key={step.num}>
          <span className="step__num">{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          {i < STEPS.length - 1 && <span className="step__connector" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
