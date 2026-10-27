/*
 * The owner's price list, 2026-10-26. It replaces everything before it: the
 * spider package, the Viborg floor, the ant cap and the 900 kr. Viborg
 * surcharge are gone, because this list is the whole of how he prices now.
 *
 * Every pest follows the same four tiers:
 *   1 house    standard price + driving
 *   2 houses   standard price + half the driving
 *   5 houses   standard price + a fifth of the driving (-80 %)
 *   10 houses  his own lower figure, driving or not
 * Several pests in one visit drive out once, at half the driving.
 *
 * Season is read from the clock, not from a checkbox.
 */

import distances from "./distances.json" with { type: "json" };

export type PropertyType = "lejlighed" | "hus" | "erhverv";
export type Severity = "let" | "normal" | "kraftig";
export type Season = "forår" | "sommer" | "efterår" | "vinter";

type Owner =
  | {
      kind: "fixed";
      /** One treatment, one house. */
      base: number;
      /** What each house pays at ten houses, whatever the distance. */
      ten: number;
      /** Where his old published wording names an area limit. */
      maxM2?: number;
      /**
       * "rum": the price is per room. "bo": the price is the first nest, and
       * each extra nest adds `perExtra`.
       */
      unit?: "rum" | "bo";
      perExtra?: number;
    }
  | {
      kind: "quote";
      why: string;
      /** What he charges to come and look, where he publishes it. */
      inspection?: { price: number; text: string };
    };

/** Keyed by the priceKey values in lib/pests. */
export const OWNER_PRICES: Record<string, Owner> = {
  Myrer: { kind: "fixed", base: 600, ten: 500, maxM2: 250 },
  Edderkopper: { kind: "fixed", base: 1200, ten: 1000, maxM2: 250 },
  // He does not treat sølvfisk, only skægkræ.
  Skægkræ: { kind: "fixed", base: 1000, ten: 800, maxM2: 200 },
  "Hvepse & bier": { kind: "fixed", base: 800, ten: 600, unit: "bo", perExtra: 400 },
  // ponytail: "muligvis pr m² græsplæne" in his list; flat until he names a rate.
  Gåsebiller: { kind: "fixed", base: 2000, ten: 1500 },
  Møl: { kind: "fixed", base: 1200, ten: 1000 },
  Myg: { kind: "fixed", base: 2000, ten: 1500 },
  // Væggelus, fnat, flåter, lus and lopper share one per-room price.
  "Pr. rum": { kind: "fixed", base: 1000, ten: 800, unit: "rum" },
  Klannere: { kind: "fixed", base: 1000, ten: 800 },
  Kakerlakker: { kind: "fixed", base: 800, ten: 500, unit: "rum" },
  Fluer: { kind: "fixed", base: 1500, ten: 1200 },
  Bænkebidere: { kind: "fixed", base: 1000, ten: 800 },
  Ørentviste: { kind: "fixed", base: 1000, ten: 800 },
  Bladlus: { kind: "fixed", base: 1000, ten: 800 },
  Borebiller: {
    kind: "quote",
    why: "Prisen afhænger af angrebets omfang, træværket og adgangsforholdene, så den sætter vi efter en besigtigelse.",
    inspection: {
      price: 500,
      text: "plus kørsel, for at komme forbi til en vurdering og et uforpligtende tilbud",
    },
  },
};

/**
 * Vejledende fra-priser for the pests he does not publish a price for. Not
 * reachable from the calculator; shown once, on the pest's own page, under
 * the word "vejledende". Keyed by slug. Owner must confirm.
 */
export const ESTIMATED_FROM: Record<string, { from: number; note: string }> = {
  snegle: { from: 900, note: "Prisen afhænger af havens størrelse." },
  muldvarpe: { from: 1200, note: "Inkl. opstart og én opfølgning. Prisen afhænger af plænens størrelse." },
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

/** Share of the driving each house pays, by tier. Ten houses pay a set price instead. */
const DRIVE_SHARE: Record<Houses, number> = { 1: 1, 2: 0.5, 5: 0.2, 10: 0 };

/** His rule: always to the nearest hundred. 349 becomes 300, 350 becomes 400. */
export function round100(n: number): number {
  return Math.round(n / 100) * 100;
}

/**
 * No driving in Aarhus and the towns just north of it, out to and including
 * Hornslet (owner, 2026-10-26). South of Højbjerg (Tranbjerg, Mårslet, Beder,
 * Malling, Solbjerg, Hasselager) and west of Sabro and Harlev is charged.
 * 8382 is Hinnerup's number but also Søften's, which he named, so it is in.
 */
export const FREE_ZONE = new Set([
  "8000", "8100", "8200", "8210", "8220", "8230", "8240", "8245", "8250", "8260", "8270",
  "8380", "8381", "8382", "8462", "8471", "8520", "8530", "8541", "8543",
]);

/** Towns with a fixed driving charge, however far by road (owner, 2026-10-26). */
export const TOWN_SURCHARGE: Record<string, number> = {
  "7100": 400, // Vejle
  "7500": 400, // Holstebro
  "8800": 400, // Viborg
};

/**
 * The driving charge for one trip out and home. Kilometres are one-way, as
 * stored in distances.json, so the round trip is doubled here and nowhere else.
 */
export function driveSurcharge(nr: string, km: number): number {
  if (FREE_ZONE.has(nr)) return 0;
  return TOWN_SURCHARGE[nr] ?? round100(km * 2 * DRIVE_KR_PER_KM);
}

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

type Fixed = Extract<Owner, { kind: "fixed" }>;

/** One pest's treatment price for one house, before driving. */
function treatment(row: Fixed, tier: Houses, count: number): number {
  const each = tier === 10 ? row.ten : row.base;
  if (row.unit === "rum") return each * count;
  if (row.unit === "bo") return each + (row.perExtra ?? 0) * (count - 1);
  return each;
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
      /** The driving each house's price includes. */
      surcharge: number;
      /** The one-house price at this postcode, so the UI can show the saving. */
      soloPrice: number;
      /** The full round-trip charge for this postcode, whatever the tier. */
      tripCharge: number;
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
  opts: {
    postcode?: string;
    houses?: number;
    /** Rooms or nests for the main pest, where it is priced that way. */
    count?: number;
    /** More pests treated on the same visit: priceKey, and the name to print. */
    extras?: { key: string; label: string }[];
  } = {},
): Quote {
  const row = OWNER_PRICES[pest];
  if (!row) return { kind: "quote", why: "Den pris sætter vi efter en kort snak." };
  if (row.kind === "quote") return row;

  const count = Math.max(1, Math.round(opts.count ?? 1));
  // ponytail: extras are one room / one nest each; per-extra counts if he asks.
  const extras = (opts.extras ?? []).flatMap(({ key, label }) => {
    const r = OWNER_PRICES[key];
    return r?.kind === "fixed" ? [[label, r] as const] : [];
  });
  const combo = extras.length > 0;

  const overArea = row.maxM2 !== undefined && area > row.maxM2;
  const notes: string[] = [];
  const tier = houseTier(opts.houses ?? 1);
  const lookup = lookupPostcode(opts.postcode);
  // A blank or unknown postcode is quoted as Aarhus, with a line that says so,
  // rather than inventing a distance.
  const tripCharge = lookup.state === "ok" ? driveSurcharge(lookup.nr, lookup.place.km) : 0;
  const place = lookup.state === "ok" ? { nr: lookup.nr, by: lookup.place.by } : null;

  // Several pests on one visit: one trip, half the driving. A neighbour tier
  // that already gives more off keeps its own share.
  const share = (t: Houses) => Math.min(DRIVE_SHARE[t], combo ? 0.5 : 1);
  const perHouse = (t: Houses) =>
    treatment(row, t, count) +
    extras.reduce((sum, [, r]) => sum + treatment(r, t, 1), 0) +
    round100(tripCharge * share(t));

  const price = perHouse(tier);
  const soloPrice = perHouse(1);
  const included = round100(tripCharge * share(tier));

  let caption =
    row.unit === "rum"
      ? `Behandling af ${count} rum`
      : row.unit === "bo"
        ? `Fjernelse af ${count} ${count === 1 ? "bo" : "boer"}`
        : row.maxM2
          ? `1 behandling af bolig op til ${row.maxM2} m²`
          : "1 behandling";
  if (combo) caption += ` + ${extras.map(([k]) => k.toLowerCase()).join(", ")} på samme besøg`;
  caption += ", inkl. moms";

  if (seasonOf(now) === "vinter") {
    notes.push("Behandlingen udføres typisk fra foråret, hvor dyrene er aktive.");
  }
  if (overArea) {
    notes.push(
      `Prisen her dækker op til ${row.maxM2} m². Din bolig er større, så vi sætter den endelige pris efter en kort snak.`,
    );
  }

  let driving: string;
  if (lookup.state === "unknown") {
    driving = "Det postnummer kender vi ikke";
  } else if (lookup.state === "none") {
    driving = "Ingen kørsel i Aarhus og nord for, ud til Hornslet. Ellers 3 kr. pr. kørt km";
  } else if (tripCharge === 0) {
    driving = "Ingen kørsel i dit område";
  } else if (tier === 10) {
    driving = "Fra 10 huse er prisen fast, uanset kørsel";
  } else if (included < tripCharge) {
    driving = `Kørsel til ${lookup.nr} ${lookup.place.by}: ${dkr(tripCharge)}, du betaler ${dkr(included)}`;
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
    tripCharge,
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
