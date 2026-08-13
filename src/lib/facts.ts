// Public facts source of truth for Dreamglade's AI-facing surfaces
// (/llms.txt, Markdown mirrors) and the consistency audit
// (scripts/audit-facts.ts). See docs/agent-ready-trust-layer/.
//
// Rules for this file:
// - Only verified facts already published somewhere on dreamglade.com.
// - Never availability dates, applications, guest data, health information,
//   internal notes, or credentials.
// - Pricing numbers live in ./pricing.ts (live exchange-rate dependency) —
//   this file references them, never duplicates the figures.
// - Must stay importable by plain Node (no `next`/`react`/JSX imports) so
//   scripts/audit-facts.ts can read it directly.

export const FACTS = {
  name: "Dreamglade",
  tagline: "Small-group ayahuasca and plant dieta retreat near Iquitos, Peru",

  location: {
    summary: "Near Moralillo, under an hour's drive from Iquitos, Peru",
    hectares: 25,
    source: "/",
  },

  groupSize: {
    max: 10,
    statement: "Maximum 10 guests per retreat",
    source: "/",
  },

  ownership: {
    founder: "Stacy Povey",
    foundedYear: 2013,
    owners: ["Wade Bucher", "Clarisa Gutierrez"] as const,
    transitionYear: 2023,
    statement:
      "Founded by Stacy Povey in 2013; owned and managed directly by Wade Bucher and Clarisa Gutierrez since 2023.",
    source: "/",
  },

  healers: {
    names: ["Maestra Dominga", "Maestro Raúl"] as const,
    tradition: "Shipibo",
    statement:
      "Ceremonies are led by Maestra Dominga and Maestro Raúl in the traditional Shipibo lineage, with a support team present throughout.",
    source: "/",
  },

  screening: {
    reviewer: "Paul",
    automated: false,
    statement:
      "Paul reviews every inquiry personally. There is no automated screening.",
    source: "/safety-preparation",
  },

  applicationProcess: {
    stages: [
      "Stage 1: short inquiry — dates, accommodation preference, no medical history",
      "Paul reads every inquiry personally, usually within a day",
      "Stage 2: full health disclosure, registration, and signed agreement, sent by email to approved applicants",
    ] as const,
    statement:
      "The application process is entirely human-led by email with Paul. No online booking, no automated acceptance, no deposit taken up front.",
    source: "/apply",
  },

  ceremonies: {
    days: ["Monday", "Wednesday", "Friday"] as const,
    durationHours: "5-6",
    minStayNights: 5,
    minStayCeremonies: 3,
    maxStayWeeks: 2,
    maxStayCeremonies: 6,
    statement:
      "Ceremonies are held Monday, Wednesday, and Friday nights. A five-night minimum stay includes three ceremonies; a two-week maximum stay includes up to six ceremonies. Each ceremony runs five to six hours.",
    source: "/faq",
  },

  plantDietas: {
    count: 6,
    names: [
      "Marosa",
      "Ajo Sacha",
      "Bobinsana",
      "Machinga",
      "Clavo Huasca",
      "Planta de Vida",
    ] as const,
    statement:
      "Dreamglade works with six traditional master plant dietas. The specific plant is chosen with Maestro Raúl after a guest arrives, based on their preparation and what is appropriate — not selected from a menu in advance.",
    source: "/master-plants",
  },

  transport: {
    guestArranges: "Guests arrange their own travel to Iquitos.",
    pickup:
      "Group transport departs the designated Iquitos city meeting point at 1 PM on the first retreat day, by 4x4, under an hour to the property.",
    arrivalAirportPickupIncluded: false,
    departureAirportDropoff: {
      included: true,
      condition: "flights departing after 3 PM on the last day",
    },
    statement:
      "Airport pickup on arrival is not included. Group transport from the designated Iquitos meeting point is included. Drop-off at Iquitos airport on departure is included only for flights after 3 PM.",
    source: "/faq",
  },

  healthDisclosure: {
    required: true,
    categories: [
      "current and recent medications",
      "supplements",
      "physical health history",
      "mental health history",
      "substance use",
    ] as const,
    statement:
      "Dreamglade requires every guest to disclose medications, supplements, physical and mental health history, and substance use before confirmation. This happens in writing with Paul before any deposit is taken.",
    source: "/safety-preparation",
  },

  medicalDisclaimer: {
    statement:
      "Dreamglade is not a medical provider. It does not offer medical treatment, therapy, detox, cures, diagnosis, or medical clearance. Guests are responsible for consulting their own doctor before applying.",
    source: "/safety-preparation",
  },

  pricing: {
    statement:
      "Current per-person-per-day pricing is published at dreamglade.com/#pricing. Figures are not restated here because the published PEN equivalent changes with the live exchange rate — see src/lib/pricing.ts for the stable USD source values.",
    volatile: true,
    source: "/",
  },

  canonicalPages: [
    { path: "/", purpose: "Overview, pricing, availability windows" },
    { path: "/safety-preparation", purpose: "Screening, medication disclosure, preparation" },
    { path: "/what-to-expect", purpose: "Daily rhythm, logistics" },
    { path: "/master-plants", purpose: "Plant dieta descriptions" },
    { path: "/faq", purpose: "Structured Q&A, also emitted as FAQPage JSON-LD" },
    { path: "/apply", purpose: "How to begin an inquiry" },
    { path: "/terms-and-conditions", purpose: "Published terms (binding agreement signed at Stage 2)" },
  ] as const,

  // Clean-text Markdown mirrors served at /md/<slug> (src/app/md/[slug]/route.ts).
  // /llms.txt generates its "Markdown mirrors" section from this list, so
  // adding a third mirror only requires a route entry + an item here.
  markdownMirrors: [
    { slug: "safety-preparation", mirrorOf: "/safety-preparation", purpose: "Clean-text version of Safety & Preparation" },
    { slug: "faq", mirrorOf: "/faq", purpose: "Clean-text version of the FAQ" },
  ] as const,

  // Facts that can change without this file being wrong — call these out
  // explicitly so an AI system (or a human) doesn't treat them as fixed.
  volatileFacts: [
    "Pricing (live PEN/USD exchange rate; USD base rate rarely changes) — see /#pricing",
    "Availability windows and specific retreat dates — see / and ask Paul directly",
  ] as const,
} as const;

export type Facts = typeof FACTS;
