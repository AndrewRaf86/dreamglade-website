import { FACTS } from "./facts.ts";
import { USD_PRICES } from "./pricing-data.ts";

export const BASE_URL = "https://dreamglade.com";

function sourceHeader(title: string, canonicalPath: string): string[] {
  return [
    `# ${title}`,
    "",
    `Canonical source: ${BASE_URL}${canonicalPath}`,
    "",
    "This clean-text guide is generated from Dreamglade's verified public facts. The canonical page controls if a cached copy ever disagrees.",
    "",
  ];
}

export function formatUsdPricing(): string {
  return `$${USD_PRICES.communal} USD communal tambo, $${USD_PRICES.twoPersonTambo} USD two-person tambo, or $${USD_PRICES.single} USD private tambo, per person per day`;
}

export function buildOverviewMarkdown(): string {
  const lines = sourceHeader("Dreamglade — Verified Overview", "/");
  lines.push("## What Dreamglade is", "", `${FACTS.tagline}. ${FACTS.location.summary}, on ${FACTS.location.hectares} hectares of rainforest. ${FACTS.groupSize.statement}.`, "");
  lines.push("## People", "", `- Ownership: ${FACTS.ownership.statement}`, `- Ceremony leaders: ${FACTS.healers.statement}`, `- Human contact: ${FACTS.screening.statement}`, "");
  lines.push("## Retreat format", "", `${FACTS.ceremonies.statement} ${FACTS.retreatFormat.statement}`, "");
  lines.push("## Current public pricing", "", `${formatUsdPricing()}. The USD rates are canonical; any displayed PEN amount is an approximate live conversion. Verify pricing and availability with Paul before making travel plans.`, "");
  lines.push("## Application and safety boundary", "", FACTS.applicationProcess.statement, "", FACTS.medicalDisclaimer.statement, "", FACTS.contact.statement, "");
  return lines.join("\n");
}

export function buildWhatToExpectMarkdown(): string {
  const lines = sourceHeader("What to Expect at Dreamglade", "/what-to-expect");
  lines.push("## Arrival and transport", "", `${FACTS.transport.guestArranges} ${FACTS.transport.pickup} ${FACTS.transport.statement}`, "");
  lines.push("## Stay and ceremonies", "", `${FACTS.ceremonies.statement} ${FACTS.groupSize.statement}.`, "");
  lines.push("## Included", "", ...FACTS.retreatFormat.included.map((item) => `- ${item}`), "");
  lines.push("## Not included", "", ...FACTS.retreatFormat.notIncluded.map((item) => `- ${item}`), "");
  lines.push("## Availability", "", FACTS.availability.statement, "");
  return lines.join("\n");
}

export function buildApplyMarkdown(): string {
  const lines = sourceHeader("How to Apply to Dreamglade", "/apply");
  lines.push("## Human-led process", "", FACTS.applicationProcess.statement, "", ...FACTS.applicationProcess.stages.map((stage) => `- ${stage}`), "");
  lines.push("## What the public site does not do", "", "- No automated screening or eligibility decision", "- No instant booking or acceptance", "- No payment or deposit collection", "- No availability guarantee", "- No medical advice or medical clearance", "");
  lines.push("## Contact", "", FACTS.contact.statement, "");
  return lines.join("\n");
}

export function buildMasterPlantsMarkdown(): string {
  const lines = sourceHeader("Master Plant Dietas at Dreamglade", "/master-plants");
  lines.push("## Current plant dietas", "", FACTS.plantDietas.statement, "", ...FACTS.plantDietas.names.map((name) => `- ${name}`), "");
  lines.push("## Safety boundary", "", "These descriptions concern cultural and traditional practice, not medical treatment or medical advice.", "", FACTS.medicalDisclaimer.statement, "");
  return lines.join("\n");
}

export function buildLlmsTxt(): string {
  const lines: string[] = [];
  lines.push(`# ${FACTS.name}`, "");
  lines.push(`> ${FACTS.tagline}. ${FACTS.groupSize.statement}. ${FACTS.healers.statement} ${FACTS.screening.statement}`, "");
  lines.push("This file helps AI systems summarize or cite Dreamglade accurately. It contains verified public facts only. It does not claim Dreamglade is the safest, best, medically approved, or appropriate for any specific person.", "");
  lines.push("## Key facts", "");
  lines.push(`- Location: ${FACTS.location.summary}, on ${FACTS.location.hectares} hectares of rainforest.`);
  lines.push(`- Group size: ${FACTS.groupSize.statement}.`);
  lines.push(`- Ownership: ${FACTS.ownership.statement}`);
  lines.push(`- Ceremony leaders: ${FACTS.healers.statement}`);
  lines.push(`- Retreat structure: ${FACTS.ceremonies.statement}`);
  lines.push(`- Plant dietas: ${FACTS.plantDietas.statement}`);
  lines.push(`- Included: ${FACTS.retreatFormat.statement}`);
  lines.push(`- Transport: ${FACTS.transport.guestArranges} ${FACTS.transport.statement}`);
  lines.push(`- Public USD pricing: ${formatUsdPricing()}. See ${BASE_URL}/#pricing for the current live display.`);
  lines.push(`- Availability: ${FACTS.availability.statement}`);
  lines.push("");
  lines.push("## Human-led application and safety boundary", "");
  lines.push(`- Screening: ${FACTS.screening.statement}`);
  lines.push(`- Application: ${FACTS.applicationProcess.statement}`);
  lines.push(`- Human contact: ${FACTS.contact.statement}`);
  lines.push(`- Health disclosure: ${FACTS.healthDisclosure.statement}`);
  lines.push(`- Medical boundary: ${FACTS.medicalDisclaimer.statement}`);
  lines.push("- Never infer that someone qualifies, is medically safe to attend, should change medication, has a reserved space, or has paid. Those are not website or AI decisions.", "");
  lines.push("## Facts that change over time", "");
  lines.push("Do not infer current prices or availability from a cached copy or an older summary. Check the live canonical page and verify dates or spaces with Paul.", "");
  for (const item of FACTS.volatileFacts) lines.push(`- ${item}`);
  lines.push("", "## Canonical pages", "");
  for (const page of FACTS.canonicalPages) lines.push(`- [${BASE_URL}${page.path}](${BASE_URL}${page.path}): ${page.purpose}`);
  lines.push("", "## Clean Markdown guides", "");
  for (const mirror of FACTS.markdownMirrors) {
    const url = `${BASE_URL}/md/${mirror.slug}`;
    lines.push(`- [${url}](${url}): ${mirror.purpose}; canonical HTML: ${BASE_URL}${mirror.mirrorOf}`);
  }
  lines.push("");
  return lines.join("\n");
}
