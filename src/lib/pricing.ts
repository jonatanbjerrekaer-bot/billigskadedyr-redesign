export interface PriceRow {
  pest: string;
  low: number;
  high: number;
  note?: string;
}

/*
 * Two different kinds of price live here, and they have different provenance.
 *
 * 1. DIY_FROM — REAL. Scraped 2026-08 from billigskadedyr.dk's own WooCommerce
 *    Store API (/wp-json/wc/store/v1/products, 167 products). Each value is the
 *    cheapest product in that pest's own shop categories, so it is their price,
 *    not an estimate. Some of the lowest entries are bait stations rather than
 *    full treatments — that is why the copy says "produkter starter ved".
 *
 * 2. PRICE_TABLE — ESTIMATED, and deliberately not from billigskadedyr.dk.
 *    They publish no professional call-out prices at all ("Ring og få et
 *    uforpligtende tilbud"), so there is nothing of theirs to quote. These
 *    ranges come from other Danish pest-control firms' public price pages
 *    (skadedyrforbudt.dk, skadedyrservice.dk, djurslandskadedyr.dk,
 *    myreexpressen.dk, denrodemyre.dk, handyhand.dk), collected 2026-08.
 *    The UI must keep calling this "vejledende" — it is a market estimate.
 */

export const PRICE_TABLE: PriceRow[] = [
  { pest: "Myrer", low: 1200, high: 2500 },
  { pest: "Mus", low: 1200, high: 2200 },
  { pest: "Rotter", low: 1800, high: 3000 },
  { pest: "Væggelus", low: 2500, high: 4500 },
  { pest: "Skægkræ/sølvfisk", low: 2000, high: 3000 },
  { pest: "Hvepse (bo)", low: 850, high: 2000 },
  { pest: "Borebiller", low: 2500, high: 4500 },
  { pest: "Kakerlakker", low: 2000, high: 3500 },
  { pest: "Edderkopper", low: 1800, high: 2500 },
];

/** Keyed by pest slug (see lib/pests). Cheapest product in DKK, incl. VAT. */
const DIY_FROM: Record<string, number> = {
  rotter: 9.0,
  myrer: 9.0,
  hvepse: 69.0,
  vaeggelus: 49.0,
  soelvfisk: 49.0,
  borebiller: 259.95,
  kakerlakker: 629.0,
  edderkopper: 149.0,
  fluer: 19.0,
};

export function diyFrom(slug: string): string | null {
  const v = DIY_FROM[slug];
  if (v === undefined) return null;
  return v.toLocaleString("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kr.";
}

export type PropertyType = "lejlighed" | "hus" | "erhverv";
export type Severity = "let" | "normal" | "kraftig";

const PROPERTY_FACTOR: Record<PropertyType, number> = {
  lejlighed: 1.0,
  hus: 1.15,
  erhverv: 1.4,
};

const SEVERITY_FACTOR: Record<Severity, number> = {
  let: 0.85,
  normal: 1.0,
  kraftig: 1.3,
};

// Hvepsebo is not area-driven (nest removal, not room treatment).
const AREA_INDEPENDENT = new Set(["Hvepse (bo)"]);

const AREA_RANGE: [number, number] = [40, 400];
const AREA_FACTOR_MIN = 0.85; // 40 m²
const AREA_FACTOR_MAX = 1.5; // 400 m²

function areaFactor(area: number): number {
  const [min, max] = AREA_RANGE;
  const t = Math.min(1, Math.max(0, (area - min) / (max - min)));
  return AREA_FACTOR_MIN + t * (AREA_FACTOR_MAX - AREA_FACTOR_MIN);
}

export function estimate(
  pest: string,
  area: number,
  property: PropertyType,
  severity: Severity,
): { low: number; high: number } {
  const row = PRICE_TABLE.find((r) => r.pest === pest);
  if (!row) return { low: 0, high: 0 };

  const areaMult = AREA_INDEPENDENT.has(pest) ? 1 : areaFactor(area);
  const p = PROPERTY_FACTOR[property];
  const s = SEVERITY_FACTOR[severity];

  const low = Math.round((row.low * p * s * areaMult) / 10) * 10;
  const high = Math.round((row.high * p * s * areaMult) / 10) * 10;
  return { low, high };
}

export function dkr(n: number): string {
  return n.toLocaleString("da-DK") + " kr.";
}
