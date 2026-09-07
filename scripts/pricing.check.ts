// ponytail: one runnable check for the pricing rules, no framework.
//   node --experimental-strip-types scripts/pricing.check.ts
// It fails if the owner's figures, the season boundaries or the package rule
// ever drift. Lives outside src/ so the app bundle carries no node globals.
import { estimate, seasonOf } from "../src/lib/pricing.ts";

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

console.log("OK pricing");
