import { readFile } from "node:fs/promises";
import { FACTS } from "../src/lib/facts.ts";
import {
  buildApplyMarkdown,
  buildLlmsTxt,
  buildMasterPlantsMarkdown,
  buildOverviewMarkdown,
  buildWhatToExpectMarkdown,
  formatUsdPricing,
} from "../src/lib/ai-content.ts";
import { buildPageGraph, buildSiteGraph, SCHEMA_IDS, type JsonLdNode } from "../src/lib/structured-data.ts";

type Check = { id: string; ok: boolean; detail: string };
const checks: Check[] = [];

function check(id: string, ok: boolean, detail: string) {
  checks.push({ id, ok, detail });
}

function contains(id: string, text: string, expected: string) {
  check(id, text.includes(expected), `contains ${JSON.stringify(expected)}`);
}

function excludes(id: string, text: string, prohibited: RegExp) {
  check(id, !prohibited.test(text), `excludes ${prohibited}`);
}

const outputs = {
  llms: buildLlmsTxt(),
  overview: buildOverviewMarkdown(),
  whatToExpect: buildWhatToExpectMarkdown(),
  apply: buildApplyMarkdown(),
  masterPlants: buildMasterPlantsMarkdown(),
};
const corpus = Object.values(outputs).join("\n");

contains("answerability-overview", corpus, FACTS.tagline);
contains("answerability-location", corpus, FACTS.location.summary);
contains("answerability-ownership", corpus, FACTS.ownership.statement);
contains("answerability-healers", corpus, FACTS.healers.statement);
contains("answerability-group-size", corpus, FACTS.groupSize.statement);
contains("answerability-retreat-format", corpus, FACTS.ceremonies.statement);
contains("answerability-five-plants", corpus, FACTS.plantDietas.statement);
contains("answerability-transport", corpus, FACTS.transport.statement);
contains("answerability-pricing", corpus, formatUsdPricing());
contains("answerability-availability", corpus, FACTS.availability.statement);
contains("boundary-human-screening", corpus, FACTS.screening.statement);
contains("boundary-medical", corpus, FACTS.medicalDisclaimer.statement);
contains("boundary-no-booking", corpus, "No instant booking or acceptance");
contains("boundary-no-payment", corpus, "No payment or deposit collection");
contains("boundary-no-eligibility", outputs.llms, "Never infer that someone qualifies");
excludes("facts-no-machinga", corpus, /\bMachinga\b/i);
excludes("facts-no-six-plant-claim", corpus, /six (?:traditional )?master plant dietas|six master plants/i);

const mirrors = FACTS.markdownMirrors.map((item) => item.slug);
check("mirrors-six-unique", mirrors.length === 6 && new Set(mirrors).size === 6, `found ${mirrors.length} unique=${new Set(mirrors).size}`);
for (const slug of ["overview", "faq", "safety-preparation", "what-to-expect", "apply", "master-plants"] as const) {
  check(`mirror-${slug}`, mirrors.includes(slug), `registered /md/${slug}`);
}

const siteGraph = buildSiteGraph();
const graph = siteGraph["@graph"] as JsonLdNode[];
const ids = graph.map((node) => node["@id"]).filter((id): id is string => typeof id === "string");
check("schema-context", siteGraph["@context"] === "https://schema.org", "uses Schema.org HTTPS context");
check("schema-unique-ids", ids.length === new Set(ids).size, `${ids.length} graph IDs are unique`);
for (const id of Object.values(SCHEMA_IDS)) check(`schema-id-${id.split("#").at(-1)}`, ids.includes(id), `graph contains ${id}`);
for (const price of [200, 210, 220]) check(`schema-price-${price}`, JSON.stringify(siteGraph).includes(`"price":${price}`), `graph contains canonical USD price ${price}`);
excludes("schema-no-rating-or-review", JSON.stringify(siteGraph), /aggregateRating|reviewCount|ratingValue|"review"/i);
excludes("schema-no-availability-claim", JSON.stringify(siteGraph), /InStock|LimitedAvailability|SoldOut/i);

const faqGraph = buildPageGraph({
  path: "/faq",
  name: "Frequently Asked Questions",
  description: "Dreamglade FAQ",
  type: "FAQPage",
  mainEntity: [{ "@type": "Question", name: "How do I apply?", acceptedAnswer: { "@type": "Answer", text: FACTS.applicationProcess.statement } }],
});
contains("schema-faq-page", JSON.stringify(faqGraph), '"@type":"FAQPage"');
contains("schema-breadcrumb", JSON.stringify(faqGraph), '"@type":"BreadcrumbList"');

const serializerSource = await readFile(new URL("../src/components/StructuredData.tsx", import.meta.url), "utf8");
contains("schema-script-escaping", serializerSource, 'replace(/</g, "\\\\u003c")');

const failures = checks.filter((item) => !item.ok);
console.log(`\nDreamglade AI-readiness audit — ${checks.length} checks\n`);
for (const item of checks) console.log(`${item.ok ? "PASS" : "FAIL"}  [${item.id}] ${item.detail}`);
console.log(`\n${checks.length - failures.length}/${checks.length} checks passed.`);
if (failures.length) process.exit(1);
