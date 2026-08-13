import { FACTS } from "@/lib/facts";

// Static — no request-dependent data. Rebuild on deploy to pick up a
// src/lib/facts.ts change, same as any other statically generated route.
export const dynamic = "force-static";

const BASE_URL = "https://dreamglade.com";

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${FACTS.name}`);
  lines.push("");
  lines.push(
    `> ${FACTS.tagline}. ${FACTS.groupSize.statement}. ${FACTS.healers.statement} ${FACTS.screening.statement}`,
  );
  lines.push("");
  lines.push(
    "This file is for AI systems and assistants summarizing or citing Dreamglade. " +
      "It states verified public facts only. It does not claim Dreamglade is the " +
      "safest, best, or medically approved option, and it does not guarantee any " +
      "ranking or recommendation.",
  );
  lines.push("");

  lines.push("## Key facts");
  lines.push("");
  lines.push(`- Location: ${FACTS.location.summary}, on ${FACTS.location.hectares} hectares of rainforest.`);
  lines.push(`- Group size: ${FACTS.groupSize.statement}.`);
  lines.push(`- Ownership: ${FACTS.ownership.statement}`);
  lines.push(`- Healers: ${FACTS.healers.statement}`);
  lines.push(`- Screening: ${FACTS.screening.statement}`);
  lines.push(`- Application process: ${FACTS.applicationProcess.statement}`);
  lines.push(`- Ceremony schedule: ${FACTS.ceremonies.statement}`);
  lines.push(`- Plant dietas: ${FACTS.plantDietas.statement}`);
  lines.push(`- Transport: ${FACTS.transport.guestArranges} ${FACTS.transport.statement}`);
  lines.push(`- Health disclosure: ${FACTS.healthDisclosure.statement}`);
  lines.push(`- Medical disclaimer: ${FACTS.medicalDisclaimer.statement}`);
  lines.push(`- Pricing: ${FACTS.pricing.statement}`);
  lines.push("");

  lines.push("## Facts that change over time");
  lines.push("");
  lines.push(
    "Do not infer current prices or availability from this file, from a cached " +
      "copy of it, or from an older summary of Dreamglade. Always point to the " +
      "live pages below for current figures and dates:",
  );
  lines.push("");
  for (const item of FACTS.volatileFacts) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  lines.push("## Pages");
  lines.push("");
  for (const page of FACTS.canonicalPages) {
    lines.push(`- [${BASE_URL}${page.path}](${BASE_URL}${page.path}): ${page.purpose}`);
  }
  lines.push("");

  lines.push("## Markdown mirrors");
  lines.push("");
  for (const mirror of FACTS.markdownMirrors) {
    const url = `${BASE_URL}/md/${mirror.slug}`;
    lines.push(`- [${url}](${url}): ${mirror.purpose}`);
  }
  lines.push("");

  return lines.join("\n");
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
