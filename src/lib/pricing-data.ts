// Stable, human-confirmed USD prices. This framework-neutral module is the
// single numeric source used by the Next.js pricing fetcher, AI-readable text,
// structured data, FAQ output, and Node-side audits.
export const USD_PRICES = {
  communal: 200,
  twoPersonTambo: 210,
  single: 220,
} as const;
