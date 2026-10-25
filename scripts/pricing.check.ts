// ponytail: one runnable check for the pricing rules, no framework.
//   node --experimental-strip-types scripts/pricing.check.ts
// It fails if the owner's figures, the season boundaries or the package rule
// ever drift. Lives outside src/ so the app bundle carries no node globals.
import { ceil100, driveSurcharge, estimate, seasonOf } from "../src/lib/pricing.ts";

const assert = (cond: unknown, msg: string) => {
  if (!cond) {
    console.error("FAIL " + msg);
    process.exit(1);
  }
};
const d = (iso: string) => new Date(iso + "T12:00:00");

assert(seasonOf(d("2026-04-01")) === "forår", "april is forår");
assert(seasonOf(d("2026-07-01")) === "sommer", "july is sommer");
assert(seasonOf(d("2026-09-07")) === "efterår", "september is efterår");
assert(seasonOf(d("2026-01-15")) === "vinter", "january is vinter");

const ants = estimate("Myrer", 140, "hus", "normal", d("2026-09-07"));
assert(ants.kind === "fixed" && ants.price === 600, "ants are his 600 kr");
assert(ants.kind === "fixed" && !ants.overArea, "140 m2 is inside his 250");

const bigAnts = estimate("Myrer", 300, "hus", "normal", d("2026-09-07"));
assert(bigAnts.kind === "fixed" && bigAnts.overArea, "300 m2 is over his 250");

const spring = estimate("Edderkopper", 200, "hus", "normal", d("2026-04-10"));
assert(spring.kind === "fixed" && spring.price === 1600, "spring quotes the package");

const autumn = estimate("Edderkopper", 200, "hus", "normal", d("2026-10-10"));
assert(autumn.kind === "fixed" && autumn.price === 1000, "autumn quotes one treatment");

const summer = estimate("Edderkopper", 200, "hus", "normal", d("2026-07-10"));
assert(
  summer.kind === "fixed" && summer.notes.some((n) => n.includes("500")),
  "summer surfaces the 500 kr extra on its own, with no checkbox",
);

const beetle = estimate("Borebiller", 140, "hus", "normal", d("2026-09-07"));
assert(beetle.kind === "quote", "borebiller is quote-only, he says so himself");

// Property and severity must not move a price the owner publishes as flat.
const a = estimate("Myrer", 140, "lejlighed", "let", d("2026-09-07"));
const b = estimate("Myrer", 140, "erhverv", "kraftig", d("2026-09-07"));
assert(
  a.kind === "fixed" && b.kind === "fixed" && a.price === b.price,
  "a flat price stays flat whatever the other answers say",
);

// --- Driving surcharge and neighbour tiers (owner's rules, 2026-10-24) ---

assert(ceil100(390) === 400, "390 rounds up to 400");
assert(ceil100(400) === 400, "400 stays 400");
assert(ceil100(401) === 500, "401 rounds up to 500");
assert(driveSurcharge(71, true) === 0, "inside Aarhus there is no surcharge");
assert(driveSurcharge(65, false) === 400, "65 km out and home is 390 kr, billed as 400");
assert(driveSurcharge(67, false) === 500, "67 km out and home is 402 kr, billed as 500");

const AUTUMN = d("2026-10-10");
const SPRING = d("2026-04-10");
// 8000 Aarhus C (inside the kommune) and 8800 Viborg (outside).
const at = (pest: string, now: Date, postcode: string, houses: number) => {
  const q = estimate(pest, 140, "hus", "normal", now, { postcode, houses });
  if (q.kind !== "fixed") throw new Error("expected a fixed quote for " + pest);
  return q;
};

assert(at("Myrer", AUTUMN, "8000", 1).price === 600, "ants in Aarhus: 600, no surcharge");
assert(at("Myrer", AUTUMN, "", 1).price === 600, "no postcode is quoted as Aarhus");
assert(at("Myrer", AUTUMN, "1234", 1).postcodeState === "unknown", "an unknown postcode is flagged");

const viborg = at("Myrer", AUTUMN, "8800", 1);
assert(viborg.surcharge === viborg.tripCharge && viborg.tripCharge > 0, "Viborg pays the full surcharge");
assert(viborg.price === 600 + viborg.tripCharge, "one house: standard + full surcharge");
assert(at("Myrer", AUTUMN, "8800", 2).price === 600 + Math.ceil(viborg.tripCharge / 2 / 100) * 100, "two houses: half the surcharge, ceil to 100");
assert(at("Myrer", AUTUMN, "8800", 3).price === at("Myrer", AUTUMN, "8800", 2).price, "three houses get the two-house price");
assert(at("Myrer", AUTUMN, "8800", 5).price === 600, "five houses: standard price, driving included");
assert(at("Myrer", AUTUMN, "8800", 7).price === 600, "six to nine houses get the five-house price");
assert(at("Myrer", AUTUMN, "8800", 10).price === 500, "ten houses, ants: 500");
assert(at("Myrer", AUTUMN, "7500", 10).price === 500, "ten houses is the same at any distance");
assert(at("Myrer", AUTUMN, "8800", 5).total === 3000, "total is price x houses");
assert(at("Skægkræ/sølvfisk", AUTUMN, "8800", 5).price === 1000, "skægkræ at five houses: 1000");
assert(at("Skægkræ/sølvfisk", AUTUMN, "8800", 10).price === 800, "skægkræ at ten houses: 800");

// Spiders: the package holds two treatments but the driving is charged once.
const pkg1 = at("Edderkopper", SPRING, "8800", 1);
assert(pkg1.price === 1600 + pkg1.tripCharge, "spider package: surcharge counted once, not per treatment");
assert(at("Edderkopper", SPRING, "8800", 5).price === 1600, "spider package at five houses: 1600");
assert(at("Edderkopper", SPRING, "8800", 10).price === 1000, "spider package at ten houses: the owner's 1000, not the formula's 1300");
assert(at("Edderkopper", AUTUMN, "8800", 5).price === 1000, "single spider treatment at five houses: 1000");
assert(at("Edderkopper", AUTUMN, "8800", 10).price === 800, "single spider treatment at ten houses follows the formula: 800");
assert(at("Edderkopper", AUTUMN, "8800", 10).soloPrice === 1000 + pkg1.tripCharge, "soloPrice is the one-house price at that postcode");

// The owner named these two towns' surcharges himself; they beat the per-km rate.
assert(at("Myrer", AUTUMN, "7500", 1).price === 1000, "Holstebro ants, one house: the owner's 1000");
assert(at("Myrer", AUTUMN, "7500", 2).price === 800, "Holstebro ants, two houses: the owner's 800");
assert(at("Edderkopper", SPRING, "8800", 1).price === 2500, "Viborg spider package, one house: the owner's 2500");

console.log("OK pricing");
