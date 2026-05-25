// Official prices confirmed — quoted in USD per person per day.
// PEN equivalent is calculated at the live exchange rate and is approximate.
export const USD_PRICES = {
  communal: 200,
  twoPersonTambo: 210,
  single: 220,
} as const;

export type PricingData = {
  usd: typeof USD_PRICES;
  penRate: number | null;
  pen: { communal: number | null; twoPersonTambo: number | null; single: number | null };
};

export async function getPricing(): Promise<PricingData> {
  const penRate = await fetchPenPerUsd();
  return {
    usd: USD_PRICES,
    penRate,
    pen: {
      communal: penRate ? Math.round(USD_PRICES.communal * penRate) : null,
      twoPersonTambo: penRate ? Math.round(USD_PRICES.twoPersonTambo * penRate) : null,
      single: penRate ? Math.round(USD_PRICES.single * penRate) : null,
    },
  };
}

async function fetchPenPerUsd(): Promise<number | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const rate = data?.rates?.PEN;
    return typeof rate === "number" && rate > 0 ? rate : null;
  } catch {
    return null;
  }
}
