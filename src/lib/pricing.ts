/*
 * Prices as billigskadedyrprof.dk publishes them, read 2026-09-07.
 *
 * The old table in this file was a market estimate assembled from other Danish
 * firms, because at the time we believed the owner published nothing. He does,
 * on the professional site, for three of his services. Those three are quoted
 * exactly, including what he says is covered. Everything else he prices after a
 * conversation, and the honest thing is to say so rather than invent a range
 * and call it vejledende.
 *
 * Season is read from the clock, not from a checkbox. A visitor should not have
 * to know that spring is when the two-treatment package pays off; the page
 * knows what month it is.
 */

import distances from "./distances.json" with { type: "json" };

export type PropertyType = "lejlighed" | "hus" | "erhverv";
export type Severity = "let" | "normal" | "kraftig";
export type Season = "forår" | "sommer" | "efterår" | "vinter";

type Owner =
  | {
      kind: "fixed";
      /** What one treatment costs, up to maxM2. */
      base: number;
      maxM2: number;
      /** His wording for what the price covers. */
      includes: string;
      /** Both treatments, spring and autumn, as one package. */
      packagePrice?: number;
      /** An additional treatment during the summer. */
      summerExtra?: number;
      /**
       * What each house pays when 5 or 10 houses book together, where the
       * owner has named a figure that the -20 % rule would not give. Only the
       * cases that differ are listed; everything else follows the formula.
       */
      group?: { 5?: number; 10?: number };
      /** The same, for the two-treatment package. */
      packageGroup?: { 5?: number; 10?: number };
      /**
       * Towns he visits so often that the total for one house is capped there
       * (owner, 2026-10-26). The driving charge shrinks to fit the cap, also
       * where a named TOWN_SURCHARGE would otherwise push the total past it.
       * Neighbour tiers only lower the per-house price, so a capped surcharge
       * keeps every tier under the cap.
       */
      cap?: { maxTotal: number; postcodes: string[] };
    }
  | {
      kind: "quote";
      why: string;
      /** What he charges to come and look, where he publishes it. */
      inspection?: { price: number; text: string };
    };

/** Keyed by the priceKey values in lib/pests. */
export const OWNER_PRICES: Record<string, Owner> = {
  Myrer: {
    kind: "fixed",
    base: 600,
    maxM2: 250,
    includes: "inkl. moms",
    // Herning, Holstebro and Viborg are the towns he drives to most; there the
    // total for one house must never pass 1.200 kr. (owner, 2026-10-26).
    cap: { maxTotal: 1200, postcodes: ["7400", "7500", "8800"] },
  },
  Edderkopper: {
    kind: "fixed",
    base: 1000,
    maxM2: 250,
    includes: "inkl. moms",
    packagePrice: 1600,
    summerExtra: 500,
    // The owner's own figure for ten houses on the package. The formula would
    // say 1.300 kr.; he wants 1.000 kr., the same as one treatment at five.
    packageGroup: { 10: 1000 },
  },
  "Skægkræ/sølvfisk": {
    kind: "fixed",
    base: 1000,
    maxM2: 200,
    includes: "inkl. moms",
  },
  Borebiller: {
    kind: "quote",
    why: "Prisen afhænger af angrebets omfang, træværket og adgangsforholdene, så den sætter vi efter en snak.",
    inspection: {
      price: 1000,
      text: "for at komme forbi til en vurdering og et uforpligtende tilbud, inkl. moms",
    },
  },
  Væggelus: {
    kind: "quote",
    why: "Prisen afhænger blandt andet af boligens størrelse og hvor mange rum der er angrebet.",
  },
  "Hvepse (bo)": {
    kind: "quote",
    why: "Prisen afhænger af, hvor boet sidder, og hvor svært det er at komme til.",
  },
  Kakerlakker: {
    kind: "quote",
    why: "Kakerlakker kræver en vurdering på stedet, før vi sætter en pris.",
  },
};

/**
 * Vejledende fra-priser for the pests he does not publish a price for.
 *
 * Deliberately NOT part of OWNER_PRICES and NOT reachable from the
 * calculator: his four real prices are the only numbers the estimator is
 * allowed to state. These are shown once, on the pest's own page, under the
 * word "vejledende" and next to the sentence that says the real price comes
 * after a look. Keyed by slug. See the header of this file for the market
 * data and the ratio they were derived from. Owner must confirm.
 */
export const ESTIMATED_FROM: Record<string, { from: number; note: string }> = {
  fluer: { from: 900, note: "Op til 200 m². Prisen afhænger af, hvor mange rum der skal behandles." },
  moel: { from: 1000, note: "Op til 200 m². Prisen afhænger af, hvor mange skabe og tekstiler der er angrebet." },
  myg: { from: 900, note: "Prisen afhænger af, hvor mange ynglesteder der skal behandles." },
  klannere: { from: 1000, note: "Op til 200 m². Prisen afhænger af, hvor stort et areal der er tæpper og tekstiler på." },
  snegle: { from: 900, note: "Prisen afhænger af havens størrelse." },
  muldvarpe: { from: 1200, note: "Inkl. opstart og én opfølgning. Prisen afhænger af plænens størrelse." },
  gaasebiller: { from: 1400, note: "Prisen afhænger af plænens størrelse." },
};

export function seasonOf(date: Date = new Date()): Season {
  const m = date.getMonth() + 1;
  if (m >= 3 && m <= 5) return "forår";
  if (m >= 6 && m <= 8) return "sommer";
  if (m >= 9 && m <= 11) return "efterår";
  return "vinter";
}

/** Driving is charged per kilometre driven, there and back. */
export const DRIVE_KR_PER_KM = 3;

/** Neighbour tiers. Three or four houses get the two-house price, six to nine the five-house price. */
export type Houses = 1 | 2 | 5 | 10;

export function houseTier(n: number): Houses {
  if (n >= 10) return 10;
  if (n >= 5) return 5;
  if (n >= 2) return 2;
  return 1;
}

/** Always up to the next hundred: 390 becomes 400, 400 stays, 401 becomes 500. */
export function ceil100(n: number): number {
  return Math.ceil(n / 100) * 100;
}

/**
 * The driving surcharge for one trip out and home. Inside Aarhus Kommune there
 * is none. Kilometres are one-way, as stored in distances.json, so the round
 * trip is doubled here and nowhere else.
 */
export function driveSurcharge(km: number, aarhus: boolean): number {
  return aarhus ? 0 : ceil100(km * 2 * DRIVE_KR_PER_KM);
}

/**
 * Towns where the owner has named the surcharge himself (2026-10-24). These win
 * over the per-km rate, which they do not follow: Holstebro is further than
 * Viborg by road but costs less, so no single rate fits both.
 */
export const TOWN_SURCHARGE: Record<string, number> = {
  "7500": 400, // Holstebro
  "8800": 900, // Viborg
};

type Place = { by: string; km: number; aarhus: boolean; ll?: number[] };
const PLACES = distances as Record<string, Place>;

/**
 * The postnummer whose centre lies nearest a point, for "Brug min placering".
 * Runs in the browser on the bundled table, so the visitor's position is
 * never sent anywhere. Pakkecentre and "Udland" are not places one lives.
 * ponytail: nearest centroid, not the real postcode polygon; near a border it
 * can pick the neighbour, which is why the field stays editable.
 */
export function nearestPostcode(lat: number, lon: number): string | undefined {
  const k = Math.cos((lat * Math.PI) / 180);
  let best: string | undefined;
  let bestD = Infinity;
  for (const [nr, p] of Object.entries(PLACES)) {
    if (!p.ll || /pakke|udland/i.test(p.by)) continue;
    const d = (p.ll[0] - lat) ** 2 + ((p.ll[1] - lon) * k) ** 2;
    if (d < bestD) [best, bestD] = [nr, d];
  }
  return best;
}

export type PostcodeLookup =
  | { state: "none" }
  | { state: "unknown"; nr: string }
  | { state: "ok"; nr: string; place: Place };

/**
 * Anything short of four digits is "still typing", not an error, so the
 * calculator stays quiet until there is something to look up.
 */
export function lookupPostcode(raw: string | undefined): PostcodeLookup {
  const nr = (raw ?? "").trim();
  if (!/^\d{4}$/.test(nr)) return { state: "none" };
  const place = PLACES[nr];
  return place ? { state: "ok", nr, place } : { state: "unknown", nr };
}

/**
 * What one house pays for one job. `base` is the single treatment or the
 * package; `surcharge` is the full round-trip driving charge, which is added
 * once however many treatments the base contains.
 */
function perHouse(
  base: number,
  override: { 5?: number; 10?: number } | undefined,
  tier: Houses,
  surcharge: number,
): number {
  if (tier === 1) return base + surcharge;
  // Two houses drive out once between them, so each pays half the round trip.
  if (tier === 2) return base + ceil100(surcharge / 2);
  // Five houses: driving is included both ways, at any distance.
  if (tier === 5) return override?.[5] ?? base;
  // Ten houses: 20 % off, rounded up to the hundred, driving free.
  return override?.[10] ?? ceil100((base * 4) / 5);
}

export type Quote =
  | {
      kind: "fixed";
      /** What ONE house pays: the number the visitor is asked to say yes to. */
      price: number;
      /** How many houses the price is for, after rounding to a tier. */
      houses: Houses;
      /** price x houses. */
      total: number;
      /** The driving each house's price includes. Zero in Aarhus and from five houses. */
      surcharge: number;
      /** The one-house price at this postcode, so the UI can show the saving. */
      soloPrice: number;
      /** The per-house price at ten houses, for the neighbour line. */
      tenPrice: number;
      /** The full round-trip charge for this postcode, whatever the tier. */
      tripCharge: number;
      /** True when the price is the two-treatment package, whose ten-house price is the owner's own figure. */
      isPackage: boolean;
      /** Named so the price never appears without saying what it covers. */
      caption: string;
      /** One line about driving, written from the postcode and the tier. */
      driving: string;
      /** The postcode the driving line is about, once it matched. */
      place: { nr: string; by: string } | null;
      /** "unknown" when four digits were typed that we have no distance for. */
      postcodeState: PostcodeLookup["state"];
      /** Season-driven notes. No control produces these; the date does. */
      notes: string[];
      /** True when the home is bigger than the price he publishes covers. */
      overArea: boolean;
    }
  | { kind: "quote"; why: string; inspection?: { price: number; text: string } };

export function estimate(
  pest: string,
  area: number,
  _property: PropertyType,
  _severity: Severity,
  now: Date = new Date(),
  opts: { postcode?: string; houses?: number } = {},
): Quote {
  const row = OWNER_PRICES[pest];
  if (!row) return { kind: "quote", why: "Den pris sætter vi efter en kort snak." };
  if (row.kind === "quote") return row;

  const season = seasonOf(now);
  const overArea = area > row.maxM2;
  const notes: string[] = [];
  const tier = houseTier(opts.houses ?? 1);
  const lookup = lookupPostcode(opts.postcode);
  // A blank or unknown postcode is quoted as Aarhus, with a line that says so,
  // rather than inventing a distance.
  // let, not const: a frequent-route cap (below) may shrink it to fit.
  let tripCharge =
    lookup.state === "ok"
      ? (TOWN_SURCHARGE[lookup.nr] ?? driveSurcharge(lookup.place.km, lookup.place.aarhus))
      : 0;
  const place = lookup.state === "ok" ? { nr: lookup.nr, by: lookup.place.by } : null;

  let base = row.base;
  let override = row.group;
  let caption = `1 behandling af bolig op til ${row.maxM2} m², ${row.includes}`;

  // In spring the two-treatment package is the one that pays off, so it is what
  // we quote. Outside spring we quote the single treatment and say what the
  // package would cost, without pretending the visitor asked for it.
  if (row.packagePrice && season === "forår") {
    base = row.packagePrice;
    override = row.packageGroup;
    caption = `2 behandlinger, forår og efterår, op til ${row.maxM2} m², ${row.includes}`;
    notes.push("Du rammer foråret, hvor forår og efterår samlet står bedst.");
  } else if (row.packagePrice) {
    notes.push(
      `Forår og efterår samlet koster ${row.packagePrice.toLocaleString("da-DK")} kr.`,
    );
  }

  if (row.summerExtra && season === "sommer") {
    notes.push(
      `Har du allerede fået behandlet i foråret, koster en ekstra behandling nu ${row.summerExtra} kr.`,
    );
  }

  if (season === "vinter") {
    notes.push("Behandlingen udføres typisk fra foråret, hvor dyrene er aktive.");
  }

  if (overArea) {
    notes.push(
      `Prisen her dækker op til ${row.maxM2} m². Din bolig er større, så vi sætter den endelige pris efter en kort snak.`,
    );
  }

  // Frequent-route towns: the total for one house must never pass the cap, so
  // the driving charge shrinks to fit. Done after the package swap so the cap
  // measures the base actually being quoted, and before perHouse so the
  // driving line and every tier read the clamped figure.
  if (
    row.cap &&
    lookup.state === "ok" &&
    row.cap.postcodes.includes(lookup.nr) &&
    base + tripCharge > row.cap.maxTotal
  ) {
    tripCharge = Math.max(0, row.cap.maxTotal - base);
  }

  const price = perHouse(base, override, tier, tripCharge);
  const soloPrice = perHouse(base, override, 1, tripCharge);
  const tenPrice = perHouse(base, override, 10, tripCharge);
  const included = tier === 1 ? tripCharge : tier === 2 ? ceil100(tripCharge / 2) : 0;

  let driving: string;
  if (lookup.state === "unknown") {
    driving = "Det postnummer kender vi ikke";
  } else if (lookup.state === "none") {
    driving = "I Aarhus Kommune. Udenfor lægger vi 3 kr. pr. kørt km til";
  } else if (tripCharge === 0) {
    driving = "Ingen kørselstillæg i Aarhus";
  } else if (tier >= 5) {
    driving = "Kørsel er med, når I er 5 eller flere";
  } else if (tier === 2) {
    driving = `Kørsel til ${lookup.nr} ${lookup.place.by}: ${dkr(tripCharge)}, I deler den`;
  } else {
    driving = `Kørsel til ${lookup.nr} ${lookup.place.by}: ${dkr(tripCharge)}, betales én gang`;
  }

  return {
    kind: "fixed",
    price,
    houses: tier,
    total: price * tier,
    surcharge: included,
    soloPrice,
    tenPrice,
    tripCharge,
    isPackage: base === row.packagePrice,
    caption,
    driving,
    place,
    postcodeState: lookup.state,
    notes,
    overArea,
  };
}

export function dkr(n: number): string {
  return n.toLocaleString("da-DK") + " kr.";
}
