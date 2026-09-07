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
    }
  | { kind: "quote"; why: string };

/** Keyed by the priceKey values in lib/pests. */
export const OWNER_PRICES: Record<string, Owner> = {
  Myrer: {
    kind: "fixed",
    base: 600,
    maxM2: 250,
    includes: "inkl. kørsel og moms",
  },
  Edderkopper: {
    kind: "fixed",
    base: 1000,
    maxM2: 250,
    includes: "inkl. moms",
    packagePrice: 1600,
    summerExtra: 500,
  },
  "Skægkræ/sølvfisk": {
    kind: "fixed",
    base: 1000,
    maxM2: 200,
    includes: "inkl. kørsel og moms",
  },
  Borebiller: {
    kind: "quote",
    why: "Prisen afhænger af angrebets omfang, træværket og adgangsforholdene, så den sætter vi efter en snak.",
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

export function seasonOf(date: Date = new Date()): Season {
  const m = date.getMonth() + 1;
  if (m >= 3 && m <= 5) return "forår";
  if (m >= 6 && m <= 8) return "sommer";
  if (m >= 9 && m <= 11) return "efterår";
  return "vinter";
}

export type Quote =
  | {
      kind: "fixed";
      /** The number the visitor is being asked to say yes to. */
      price: number;
      /** Named so the price never appears without saying what it covers. */
      caption: string;
      /** Season-driven notes. No control produces these; the date does. */
      notes: string[];
      /** True when the home is bigger than the price he publishes covers. */
      overArea: boolean;
    }
  | { kind: "quote"; why: string };

export function estimate(
  pest: string,
  area: number,
  _property: PropertyType,
  _severity: Severity,
  now: Date = new Date(),
): Quote {
  const row = OWNER_PRICES[pest];
  if (!row) return { kind: "quote", why: "Den pris sætter vi efter en kort snak." };
  if (row.kind === "quote") return row;

  const season = seasonOf(now);
  const overArea = area > row.maxM2;
  const notes: string[] = [];
  let price = row.base;
  let caption = `1 behandling af bolig op til ${row.maxM2} m², ${row.includes}`;

  // In spring the two-treatment package is the one that pays off, so it is what
  // we quote. Outside spring we quote the single treatment and say what the
  // package would cost, without pretending the visitor asked for it.
  if (row.packagePrice && season === "forår") {
    price = row.packagePrice;
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

  return { kind: "fixed", price, caption, notes, overArea };
}

export function dkr(n: number): string {
  return n.toLocaleString("da-DK") + " kr.";
}
