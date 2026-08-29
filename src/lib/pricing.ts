export interface Pest {
  slug: string;
  name: string;
  path: "diy" | "pro";
  note: string;
}

export interface PriceRow {
  pest: string;
  low: number;
  high: number;
  note?: string;
}

// Indicative DKK ranges (incl. tax), sourced from live Danish pest-control
// pricing pages: skadedyrforbudt.dk, skadedyrservice.dk, djurslandskadedyr.dk,
// myreexpressen.dk, denrodemyre.dk, handyhand.dk. Collected 2026-08.
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

export function estimate(pest: string, area: number, property: PropertyType, severity: Severity): { low: number; high: number } {
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
