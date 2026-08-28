// Consistency audit: checks that src/lib/facts.ts and the live page copy in
// src/app/**, src/components/**, and src/lib/** agree on Dreamglade's core
// public facts. Zero-dependency Node script — no test framework involved.
//
// Run: npm run audit:facts
//
// Note: scripts/package.json ({"type":"module"}) exists for a real reason —
// without it, `tsc -p scripts/tsconfig.json` (npm run typecheck) fails with
// "the 'import.meta' meta-property is not allowed in files which will build
// into CommonJS output", since TypeScript's "nodenext" module mode looks at
// the nearest package.json to decide ESM vs. CommonJS. It does NOT fully
// silence Node's MODULE_TYPELESS_PACKAGE_JSON warning at runtime, though:
// `npm run audit:facts` still prints it once, for src/lib/facts.ts
// specifically, since that file lives outside scripts/'s package.json
// boundary. That residual warning is harmless (doesn't affect behavior or
// exit code) and is left as-is rather than adding "type":"module" to the
// root package.json, which would affect the rest of the project's tooling
// for no functional benefit here.
//
// What this checks, and what it doesn't:
// - This is regex/string-grade, not semantic. It gives targeted coverage of
//   specific, known-important facts and known-wrong phrasings — it cannot
//   detect every possible way a fact could be worded incorrectly, and it is
//   not a substitute for a human reading the site.
// - Most checks below are corpus-wide: they ask "does this fact appear
//   *somewhere* in the scanned files, and does a banned/outdated phrase
//   appear *nowhere*?" A corpus-wide PASS does not guarantee every page that
//   should state a fact actually does — if a fact is removed from one page
//   but still exists on another, a corpus-wide check will not notice.
// - The "---- Page-scoped ----" section below checks specific facts against
//   specific canonical pages (the same page recorded as that fact's `source`
//   in src/lib/facts.ts), which catches the case corpus-wide checks miss:
//   a regression on one specific page while the fact happens to survive
//   elsewhere. These currently cover the highest-stakes facts (group size,
//   medical disclaimer, screening/application process, arrival transport,
//   ceremony schedule) — not every fact has a page-scoped check, by design;
//   see TECHNICAL-SPEC.md §5.
//
// See docs/agent-ready-trust-layer/TECHNICAL-SPEC.md §5.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { FACTS } from "../src/lib/facts.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const APP_DIR = join(ROOT, "src/app");
const COMPONENTS_DIR = join(ROOT, "src/components");
const LIB_DIR = join(ROOT, "src/lib");

type FileEntry = { relPath: string; content: string };
const TEXT_EXTENSIONS = new Set([".tsx", ".ts", ".md"]);

function walk(dir: string): FileEntry[] {
  const out: FileEntry[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...walk(full));
    } else if (TEXT_EXTENSIONS.has(extname(full))) {
      out.push({ relPath: full.replace(ROOT, ""), content: readFileSync(full, "utf8") });
    }
  }
  return out;
}

// Includes src/lib/ so the canonical safety Markdown mirror
// (src/lib/safety-markdown.ts) is scanned by every check below, the same as
// any other page copy — that's what catches it drifting from the live
// /safety-preparation page it mirrors.
const files: FileEntry[] = [...walk(APP_DIR), ...walk(COMPONENTS_DIR), ...walk(LIB_DIR)];

// Maps a canonical URL path (as used in src/lib/facts.ts's `source` fields)
// to the page.tsx file that renders it, for page-scoped checks below.
function canonicalPageFile(urlPath: string): FileEntry[] {
  const relPath = urlPath === "/" ? "src/app/page.tsx" : `src/app${urlPath}/page.tsx`;
  return files.filter((f) => f.relPath.endsWith(relPath));
}

type CheckResult = { id: string; ok: boolean; message: string };
const results: CheckResult[] = [];

function presence(id: string, pattern: RegExp, message: string, scope: FileEntry[] = files) {
  const found = scope.some((f) => pattern.test(f.content));
  results.push({
    id,
    ok: found,
    message: found ? `OK — found ${message}` : `MISSING — expected to find ${message}, found nowhere`,
  });
}

function absence(id: string, pattern: RegExp, message: string, scope: FileEntry[] = files) {
  const hits = scope.filter((f) => pattern.test(f.content));
  results.push({
    id,
    ok: hits.length === 0,
    message:
      hits.length === 0
        ? `OK — no occurrences of banned phrase (${message})`
        : `DRIFT — found banned/outdated phrase (${message}) in: ${hits.map((f) => f.relPath).join(", ")}`,
  });
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ==================== Corpus-wide checks ====================

// ---- Group size ----
presence(
  "group-size-max",
  /\bten guests\b|\bmax(?:imum)? 10 guests\b|\bmaximum of ten\b/i,
  `the current group-size statement ("${FACTS.groupSize.statement}")`,
);
absence("group-size-wrong", /\b(?:eight|twelve|fifteen|20|8|12|15)\s+guests\b/i, "a wrong group-size number");

// ---- Owners / managers ----
for (const owner of FACTS.ownership.owners) {
  presence(`owner-${owner.replace(/\s+/g, "-").toLowerCase()}`, new RegExp(esc(owner)), `owner name "${owner}"`);
}
presence("founder", new RegExp(esc(FACTS.ownership.founder)), `founder name "${FACTS.ownership.founder}"`);

// ---- Healers ----
for (const healer of FACTS.healers.names) {
  presence(`healer-${healer.replace(/\s+/g, "-").toLowerCase()}`, new RegExp(esc(healer)), `healer name "${healer}"`);
}
presence("healers-tradition", /Shipibo/i, `ceremonial tradition "${FACTS.healers.tradition}"`);
presence("healers-relationship", /married Shipibo ceremonial couple/i, "the approved Dominga/Raúl relationship");
presence("healers-community", /Vista Alegre[^.]{0,80}upriver from Pucallpa/i, "the approved Dominga/Raúl home community");
presence("healers-shared-years", /more than 40 years of life, family, and service/i, "the approved Dominga/Raúl shared history");

// ---- Ceremony schedule ----
presence(
  "ceremony-days",
  /Monday,?\s+Wednesday,?\s+(?:and\s+)?Friday/i,
  `ceremony days "${FACTS.ceremonies.days.join(", ")}"`,
);
absence("ceremony-days-wrong", /Tuesday,?\s+Thursday,?\s+(?:and\s+)?Saturday/i, "a wrong ceremony schedule");

// ---- Stay length / ceremony counts ----
presence("min-stay-nights", /\bfive nights\b|\b5 nights\b/i, `minimum stay "${FACTS.ceremonies.minStayNights} nights"`);
presence(
  "min-stay-ceremonies",
  /\bthree ceremonies\b|\b3 ceremonies\b/i,
  `minimum-stay ceremony count "${FACTS.ceremonies.minStayCeremonies}"`,
);
presence("max-stay-weeks", /\btwo weeks\b|\b2 weeks\b/i, `maximum stay "${FACTS.ceremonies.maxStayWeeks} weeks"`);
presence(
  "max-stay-ceremonies",
  /\bsix ceremonies\b|\b6 ceremonies\b/i,
  `maximum-stay ceremony count "${FACTS.ceremonies.maxStayCeremonies}"`,
);

// ---- Plant dietas ----
presence(
  "plant-count",
  /five (?:traditional )?master plant dietas|five master plants/i,
  `plant dieta count "${FACTS.plantDietas.count}"`,
);
absence(
  "plant-count-wrong",
  /six (?:traditional )?master plant dietas|six master plants/i,
  "the superseded six-plant count — see DECISIONS.md's 2026-08-27 confirmation entry",
);
absence("plant-machinga-removed", /\bMachinga\b/i, "Machinga, which is not currently offered");
for (const plant of FACTS.plantDietas.names) {
  presence(`plant-${plant.toLowerCase().replace(/\s+/g, "-")}`, new RegExp(esc(plant)), `plant name "${plant}"`);
}

// ---- Transport / airport ----
presence(
  "arrival-pickup-not-included",
  /airport pickup[^.]{0,40}not included|not included[^.]{0,40}airport pickup/i,
  "language stating arrival airport pickup is NOT included",
);
absence(
  "arrival-pickup-wrong",
  /airport pickup (?:on arrival )?is included/i,
  "arrival airport pickup incorrectly stated as included",
);
presence(
  "departure-dropoff-condition",
  /after 3\s?PM/i,
  `departure drop-off condition "${FACTS.transport.departureAirportDropoff.condition}"`,
);
presence("meeting-point", /(?:designated )?(?:city )?meeting point in Iquitos/i, "the Iquitos city meeting-point transport language");

// ---- Pricing (reference only — numbers live in pricing.ts) ----
presence(
  "pricing-source-import",
  /from ["']@\/lib\/pricing["']/,
  "PricingSection importing from @/lib/pricing (single source of truth for pricing)",
  files.filter((f) => f.relPath.includes("PricingSection")),
);
presence(
  "pricing-faq-source-import",
  /import\s+\{\s*USD_PRICES\s*\}\s+from ["']\.\/pricing["']/,
  "FAQ structured answer importing USD_PRICES from pricing.ts",
  files.filter((f) => f.relPath.endsWith("src/lib/faq-data.ts")),
);
absence(
  "pricing-hardcoded",
  /\$(?:19\d|2[0-4]\d)(?:\.\d\d)?\s*(?:USD)?\s*(?:per person|\/\s?day|\/person)/i,
  "a hardcoded per-day USD figure duplicated outside pricing.ts",
);

// ---- Application process ----
presence(
  "no-automated-screening",
  /no automated screening/i,
  `the screening statement ("${FACTS.screening.statement}")`,
);
presence(
  "paul-reviews-personally",
  /Paul (?:reads|reviews) every (?:inquiry|inquiries|application|message)s?\s+(?:personally|manually)/i,
  "language confirming Paul personally reviews every inquiry",
);
presence("stage-2-registration", /Stage 2 registration/i, "the two-stage application process (Stage 2 registration)");
absence(
  "automated-booking-language",
  /\bbook (?:instantly|now)\b|\binstant booking\b|\bautomated booking\b/i,
  "language implying automated/instant booking",
);

// ---- Medical / safety disclaimers ----
presence("not-medical-provider", /not a medical provider/i, "the medical disclaimer (\"not a medical provider\")");
presence("no-medical-clearance", /medical clearance/i, "the medical-clearance disclaimer");
absence(
  "paul-medication-decision",
  /decision about (?:your )?medications?[^.]{0,80}must come from Paul/i,
  "language assigning medication decisions to Paul",
);
presence(
  "paul-review-not-medical-opinion",
  /Paul[^.]{0,160}not a medical opinion/i,
  "the boundary that Paul's review is not a medical opinion",
);
absence(
  "faq-no-automated-eligibility-answer",
  /I use cannabis regularly[\s\S]{0,500}answer:\s*["']Yes\b/i,
  "an affirmative automated eligibility answer for regular cannabis use",
  files.filter((f) => f.relPath.endsWith("src/lib/faq-data.ts")),
);
presence(
  "faq-human-review-boundary",
  /website cannot determine whether someone may attend/i,
  "the deterministic human-review boundary in the cannabis FAQ answer",
  files.filter((f) => f.relPath.endsWith("src/lib/faq-data.ts")),
);
// This check is intentionally narrow: it only flags an explicit affirmative
// subject+claim ("Dreamglade cures...", "ayahuasca treats..."), not a bare
// "cures"/"treats" substring — the site's own correct disclaimer language
// ("does not offer... cures for any... condition") is a negation and must
// not trip this check (an earlier, broader version of this regex did,
// flagging the site's own correct disclaimer as a violation).
// The trade-off: this narrow phrasing will NOT catch every real unsupported
// medical claim — different subjects ("this medicine..."), third-person
// phrasing (a quoted guest testimonial claiming a cure), or claims split
// across sentences will all slip past it. It's a targeted tripwire for the
// most direct, common phrasing of this specific risk, not a general medical-
// claim detector — a human read of any new safety/medical copy is still the
// real safeguard.
absence(
  "cure-claim",
  /\b(?:Dreamglade|ayahuasca|this retreat|the ceremony|the medicine)\s+(?:cures|treats|heals)\b/i,
  "an unsupported direct medical cure/treatment claim",
);

// ==================== Page-scoped checks ====================
// Each of these checks a fact against its specific canonical page (per
// src/lib/facts.ts's `source` field for that fact), not the whole corpus —
// see the file header for why this matters.

presence(
  "page-scoped:group-size-on-homepage",
  /\bten guests\b|\bmax(?:imum)? 10 guests\b|\bmaximum of ten\b/i,
  `the group-size statement specifically on the homepage (${FACTS.groupSize.source})`,
  canonicalPageFile(FACTS.groupSize.source),
);

presence(
  "page-scoped:medical-disclaimer-on-safety-page",
  /not a medical provider/i,
  `the medical-provider disclaimer specifically on the safety page (${FACTS.medicalDisclaimer.source})`,
  canonicalPageFile(FACTS.medicalDisclaimer.source),
);

presence(
  "page-scoped:no-automated-screening-on-safety-page",
  /no automated screening/i,
  `the "no automated screening" statement specifically on the safety page (${FACTS.screening.source})`,
  canonicalPageFile(FACTS.screening.source),
);

presence(
  "page-scoped:human-led-application-on-apply-page",
  /Paul (?:reads|reviews) every (?:inquiry|inquiries|application|message)s?\s+(?:personally|manually)/i,
  `human-led application/screening language specifically on the apply page (${FACTS.applicationProcess.source})`,
  canonicalPageFile(FACTS.applicationProcess.source),
);

presence(
  "page-scoped:arrival-pickup-not-included-on-faq-page",
  /airport pickup[^.]{0,40}not included|not included[^.]{0,40}airport pickup/i,
  `the arrival-airport-pickup-not-included policy specifically on the FAQ page (${FACTS.transport.source})`,
  canonicalPageFile(FACTS.transport.source),
);

presence(
  "page-scoped:ceremony-schedule-on-faq-page",
  /Monday,?\s+Wednesday,?\s+(?:and\s+)?Friday/i,
  `the ceremony schedule specifically on the FAQ page (${FACTS.ceremonies.source})`,
  canonicalPageFile(FACTS.ceremonies.source),
);

presence(
  "page-scoped:availability-not-guaranteed-on-homepage",
  /FACTS\.availability\.statement/,
  `the availability boundary specifically on the homepage (${FACTS.availability.source})`,
  canonicalPageFile(FACTS.availability.source),
);
absence(
  "page-scoped:availability-status-not-asserted",
  /["'](?:Limited availability|Available)["']/,
  "a hardcoded availability-status assertion",
  canonicalPageFile(FACTS.availability.source),
);

// ---- Report ----
const failed = results.filter((r) => !r.ok);
console.log(`\nDreamglade facts consistency audit — ${results.length} checks\n`);
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"}  [${r.id}] ${r.message}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
if (failed.length > 0) {
  console.log(
    `\n${failed.length} check(s) failed. If this reflects a genuine, intentional change, update the` +
      ` relevant check in scripts/audit-facts.ts and src/lib/facts.ts together. If it's real drift,` +
      ` fix the page copy instead.`,
  );
  process.exit(1);
}
process.exit(0);
