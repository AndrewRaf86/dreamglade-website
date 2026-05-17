// Prices are in Peruvian Soles (PEN) — primary currency.
// USD equivalent is calculated at the live exchange rate and is approximate.
// NOTE: Confirm exact PEN amounts with Paul/Clarisa before publishing.
export const PEN_PRICES = {
  shared: 750,  // S/. per person per day — shared tambo (needs Paul's confirmation)
  single: 820,  // S/. per person per day — single tambo (needs Paul's confirmation)
} as const;

export type PricingData = {
  pen: typeof PEN_PRICES;
  usdRate: number | null;
  usd: { shared: number | null; single: number | null };
};

export async function getPricing(): Promise<PricingData> {
  const usdRate = await fetchUsdPerPen();
  return {
    pen: PEN_PRICES,
    usdRate,
    usd: {
      shared: usdRate ? Math.round(PEN_PRICES.shared * usdRate) : null,
      single: usdRate ? Math.round(PEN_PRICES.single * usdRate) : null,
    },
  };
}

async function fetchUsdPerPen(): Promise<number | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/PEN", {
      next: { revalidate: 3600 }, // refresh rate once per hour
    });
    if (!res.ok) return null;
    const data = await res.json();
    const rate = data?.rates?.USD;
    return typeof rate === "number" && rate > 0 ? rate : null;
  } catch {
    return null;
  }
}
