"use client";

import { useEffect, useRef } from "react";

const STAGES = [
  {
    num: "01 / Fly in",
    title: "Land in Iquitos",
    body: "You arrange your own flights. We recommend arriving 1–2 nights early to rest and avoid a delayed flight risking the transfer.",
  },
  {
    num: "02 / Meeting point",
    title: "City meeting point, 1pm",
    body: "On your first retreat day, we meet you at a designated point in Iquitos — no public route runs to the centre.",
  },
  {
    num: "03 / The drive",
    title: "~1hr by 4x4",
    body: "Past Moralillo, toward Nauta. Included in your stay — arranged by us, not booked separately.",
  },
  {
    num: "04 / Arrival",
    title: "Settle into your tambo",
    body: "Meet the team, see your tambo, find your bearings. The first ceremony is held that night.",
  },
  {
    num: "05 / Departure",
    title: "Transfer home",
    body: "A final circle, then a group transfer to Iquitos. Airport drop-off is included for flights after 3pm.",
  },
];

export default function JourneyMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!section || !svg || !path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = reduce ? "0" : String(len);
    path.style.transition = reduce
      ? "none"
      : "stroke-dashoffset 1400ms cubic-bezier(0.16, 1, 0.3, 1)";

    const dots: { dot: SVGCircleElement; num: SVGTextElement }[] = [];
    const count = STAGES.length;
    for (let i = 0; i < count; i++) {
      const point = path.getPointAtLength((i / (count - 1)) * len);

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("class", "map-dot");
      dot.setAttribute("cx", String(point.x));
      dot.setAttribute("cy", String(point.y));
      dot.setAttribute("r", "9");
      svg.appendChild(dot);

      const num = document.createElementNS("http://www.w3.org/2000/svg", "text");
      num.setAttribute("class", "map-num");
      num.setAttribute("x", String(point.x));
      num.setAttribute("y", String(point.y));
      num.textContent = String(i + 1);
      svg.appendChild(num);

      dots.push({ dot, num });
    }

    const stageEls = section.querySelectorAll<HTMLElement>(".stage");

    function reveal() {
      if (!reduce && path) path.style.strokeDashoffset = "0";
      dots.forEach(({ dot, num }, i) => {
        setTimeout(
          () => {
            dot.classList.add("is-visible");
            num.classList.add("is-visible");
          },
          reduce ? 0 : i * 120 + 300
        );
      });
      stageEls.forEach((el, i) => {
        setTimeout(() => el.classList.add("is-visible"), reduce ? 0 : i * 80 + 200);
      });
    }

    if (reduce) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal();
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="map-wrap">
        <svg
          ref={svgRef}
          className="map-svg"
          viewBox="0 0 1000 200"
          role="img"
          aria-label="Schematic route: Iquitos airport, city meeting point, drive to Dreamglade, arrival, and return transfer"
        >
          <path
            ref={pathRef}
            className="map-path"
            d="M 40,150 C 160,150 160,60 280,60 S 400,150 500,150 S 620,60 740,60 S 860,150 960,100"
          />
        </svg>
      </div>
      <ol className="stages">
        {STAGES.map((stage) => (
          <li className="stage" key={stage.num}>
            <span className="stage__num">{stage.num}</span>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
