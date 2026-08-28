import { FACTS } from "./facts.ts";
import { USD_PRICES } from "./pricing-data.ts";
import { BASE_URL } from "./ai-content.ts";

export type JsonLdNode = Record<string, unknown>;

export const SCHEMA_IDS = {
  website: `${BASE_URL}/#website`,
  organization: `${BASE_URL}/#organization`,
  place: `${BASE_URL}/#retreat-center`,
  service: `${BASE_URL}/#retreat-service`,
  founder: `${BASE_URL}/#stacy-povey`,
  ownerWade: `${BASE_URL}/#wade-bucher`,
  ownerClarisa: `${BASE_URL}/#clarisa-gutierrez`,
  healerDominga: `${BASE_URL}/#maestra-dominga`,
  healerRaul: `${BASE_URL}/#maestro-raul`,
} as const;

const priceOptions: Array<{ slug: string; name: string; price: number }> = [
  { slug: "communal", name: "Communal tambo", price: USD_PRICES.communal },
  { slug: "two-person", name: "Two-person tambo", price: USD_PRICES.twoPersonTambo },
  { slug: "private", name: "Private tambo", price: USD_PRICES.single },
];

const priceOffers: JsonLdNode[] = priceOptions.map(({ slug, name, price }) => ({
  "@id": `${BASE_URL}/#offer-${slug}`,
  "@type": "Offer",
  name,
  price,
  priceCurrency: "USD",
  url: `${BASE_URL}/#pricing`,
  description: "Per person per day. Inquiry and personal confirmation by Paul are required; this is not instant booking or guaranteed availability.",
  seller: { "@id": SCHEMA_IDS.organization },
}));

const priceOfferReferences = priceOffers.map((offer) => ({ "@id": offer["@id"] }));

export function buildSiteGraph(): JsonLdNode {
  const people: JsonLdNode[] = [
    { "@id": SCHEMA_IDS.founder, "@type": "Person", name: FACTS.ownership.founder },
    { "@id": SCHEMA_IDS.ownerWade, "@type": "Person", name: FACTS.ownership.owners[0] },
    { "@id": SCHEMA_IDS.ownerClarisa, "@type": "Person", name: FACTS.ownership.owners[1] },
    { "@id": SCHEMA_IDS.healerDominga, "@type": "Person", name: FACTS.healers.names[0], description: `Shipibo ceremony leader from ${FACTS.healers.homeCommunity}.` },
    { "@id": SCHEMA_IDS.healerRaul, "@type": "Person", name: FACTS.healers.names[1], description: `Shipibo ceremony leader from ${FACTS.healers.homeCommunity}.` },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": SCHEMA_IDS.website,
        "@type": "WebSite",
        name: FACTS.name,
        url: BASE_URL,
        inLanguage: "en",
        publisher: { "@id": SCHEMA_IDS.organization },
      },
      {
        "@id": SCHEMA_IDS.organization,
        "@type": "Organization",
        name: FACTS.name,
        description: `${FACTS.tagline}. ${FACTS.groupSize.statement}.`,
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo-original.jpeg`,
        image: `${BASE_URL}/images/lake-overview.jpg`,
        email: FACTS.contact.email,
        telephone: [...FACTS.contact.phones],
        foundingDate: String(FACTS.ownership.foundedYear),
        founder: { "@id": SCHEMA_IDS.founder },
        owner: [{ "@id": SCHEMA_IDS.ownerWade }, { "@id": SCHEMA_IDS.ownerClarisa }],
        location: { "@id": SCHEMA_IDS.place },
        sameAs: [...FACTS.socialProfiles],
        makesOffer: priceOfferReferences,
      },
      {
        "@id": SCHEMA_IDS.place,
        "@type": "Place",
        name: "Dreamglade retreat center",
        description: `${FACTS.location.summary}, on ${FACTS.location.hectares} hectares of rainforest.`,
        image: `${BASE_URL}/images/lake-overview.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: FACTS.contact.address.street,
          postalCode: FACTS.contact.address.postalCode,
          addressLocality: FACTS.contact.address.locality,
          addressCountry: FACTS.contact.address.countryCode,
        },
      },
      {
        "@id": SCHEMA_IDS.service,
        "@type": "Service",
        name: "Dreamglade small-group ayahuasca and plant dieta retreat",
        serviceType: "Small-group ayahuasca and plant dieta retreat",
        description: `${FACTS.ceremonies.statement} ${FACTS.retreatFormat.statement}`,
        url: BASE_URL,
        provider: { "@id": SCHEMA_IDS.organization },
        areaServed: { "@type": "Place", name: "Iquitos, Peru" },
        offers: priceOfferReferences,
      },
      ...people,
      ...priceOffers,
    ],
  };
}

export function buildPageGraph(options: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "FAQPage";
  about?: string[];
  mainEntity?: JsonLdNode[];
}): JsonLdNode {
  const url = `${BASE_URL}${options.path}`;
  const isHome = options.path === "" || options.path === "/";
  const breadcrumbId = `${url.replace(/\/$/, "")}/#breadcrumb`;
  const page: JsonLdNode = {
    "@id": `${url.replace(/\/$/, "")}/#webpage`,
    "@type": options.type ?? "WebPage",
    name: options.name,
    description: options.description,
    url,
    isPartOf: { "@id": SCHEMA_IDS.website },
    publisher: { "@id": SCHEMA_IDS.organization },
    inLanguage: "en",
  };
  if (!isHome) page.breadcrumb = { "@id": breadcrumbId };
  if (options.about?.length) page.about = options.about.map((id) => ({ "@id": id }));
  if (options.mainEntity) page.mainEntity = options.mainEntity;

  const graph: JsonLdNode[] = [page];
  if (!isHome) {
    graph.push({
      "@id": breadcrumbId,
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Dreamglade", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: options.name, item: url },
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
