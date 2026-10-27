// ponytail: one runnable check for the pricing rules, no framework.
//   node --experimental-strip-types scripts/pricing.check.ts
// It fails if the owner's price list (2026-10-26) ever drifts.
import { driveSurcharge, estimate, round100, seasonOf } from "../src/lib/pricing.ts";

const assert = (cond: unknown, msg: string) => {
  if (!cond) {
    console.error("FAIL " + msg);
    process.exit(1);
  }
};
const d = (iso: string) => new Date(iso + "T12:00:00");
const NOW = d("2026-10-10");

assert(seasonOf(d("2026-04-01")) === "forår", "april is forår");
assert(seasonOf(d("2026-01-15")) === "vinter", "january is vinter");

assert(round100(349) === 300, "349 rounds to 300");
assert(round100(350) === 400, "350 rounds to 400");
assert(driveSurcharge("8000", 9) === 0, "Aarhus C: no driving");
assert(driveSurcharge("8543", 18) === 0, "Hornslet: no driving");
assert(driveSurcharge("8382", 17) === 0, "Søften (8382): no driving");
assert(driveSurcharge("8310", 21) === 100, "Tranbjerg, south of Højbjerg: 126 kr. -> 100");
assert(driveSurcharge("8464", 29) === 200, "Galten, west of Harlev: 174 kr. -> 200");
assert(driveSurcharge("8800", 71) === 400, "Viborg: 400 flat");
assert(driveSurcharge("7500", 134) === 400, "Holstebro: 400 flat");
assert(driveSurcharge("7100", 80) === 400, "Vejle: 400 flat");

type Opts = Parameters<typeof estimate>[5];
const at = (pest: string, opts: Opts) => {
  const q = estimate(pest, 140, "hus", "normal", NOW, opts);
  if (q.kind !== "fixed") throw new Error("expected a fixed quote for " + pest);
  return q;
};

// Base prices, Aarhus.
for (const [k, p] of [
  ["Myrer", 600], ["Edderkopper", 1200], ["Skægkræ", 1000], ["Hvepse & bier", 800],
  ["Gåsebiller", 2000], ["Møl", 1200], ["Myg", 2000], ["Pr. rum", 1000], ["Klannere", 1000],
  ["Kakerlakker", 800], ["Fluer", 1500], ["Bænkebidere", 1000], ["Ørentviste", 1000], ["Bladlus", 1000],
] as const) {
  assert(at(k, { postcode: "8000" }).price === p, `${k} in Aarhus is ${p}`);
}

// Tiers at Viborg (400 kr. driving).
assert(at("Myrer", { postcode: "8800" }).price === 1000, "ants Viborg, 1 house: 600 + 400");
assert(at("Myrer", { postcode: "8800", houses: 2 }).price === 800, "2 houses: half the driving");
assert(at("Myrer", { postcode: "8800", houses: 3 }).price === 800, "3 houses get the 2-house price");
assert(at("Myrer", { postcode: "8800", houses: 5 }).price === 700, "5 houses: 600 + 80 -> 700");
assert(at("Myrer", { postcode: "8800", houses: 10 }).price === 500, "10 houses: 500 flat");
assert(at("Edderkopper", { postcode: "8800", houses: 10 }).price === 1000, "spiders at 10: 1000");
assert(at("Kakerlakker", { postcode: "8800", houses: 10 }).price === 500, "cockroaches at 10: 500 per room");
assert(at("Myrer", { postcode: "8800", houses: 5 }).total === 3500, "total is price x houses");

// Per room, per nest.
assert(at("Pr. rum", { postcode: "8000", count: 3 }).price === 3000, "3 rooms of bed bugs: 3000");
assert(at("Kakerlakker", { postcode: "8800", count: 2 }).price === 2000, "cockroaches 2 rooms Viborg: 1600 + 400");
assert(at("Hvepse & bier", { postcode: "8000", count: 3 }).price === 1600, "wasps, 3 nests: 800 + 2 x 400");

// Several pests on one visit: one trip, half the driving.
const combo = at("Myrer", { postcode: "8800", extras: [{ key: "Edderkopper", label: "Edderkopper" }] });
assert(combo.price === 600 + 1200 + 200, "ants + spiders Viborg: 1800 + half of 400");
assert(combo.caption.includes("edderkopper"), "the caption names the added pest");
assert(at("Myrer", { postcode: "8800" }).comboSaving === 200, "a second pest in Viborg saves half of 400");
assert(at("Myrer", { postcode: "8800", houses: 5 }).comboSaving === 0, "5 houses already beat half driving");
assert(
  at("Myrer", { postcode: "8800", houses: 5, extras: [{ key: "Fluer", label: "Fluer" }] }).price === 600 + 1500 + 100,
  "combo at 5 houses keeps the bigger 80 % discount (80 -> 100)",
);

assert(estimate("Borebiller", 140, "hus", "normal", NOW).kind === "quote", "borebiller: after inspection");

console.log("OK pricing");
