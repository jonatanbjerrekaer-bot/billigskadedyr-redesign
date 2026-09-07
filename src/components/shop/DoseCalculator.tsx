import { useState } from "react";
import { Button } from "@heroui/react";
import { ArrowRight, Check, Info } from "lucide-react";
import type { Product, Variant } from "../../lib/shop";
import { dkr } from "../../lib/shop";
import type { Dose, Rate } from "../../lib/dosage";
import { proLinkFor } from "../../lib/shopContent";

/**
 * Hvor meget skal jeg bruge?
 *
 * Det er det spørgsmål, der står mellem en husejer og en dunk til to tusind
 * kroner, og hans butik svarer på det inde midt i et afsnit: "1 ltr rækker
 * til ca. 50m2". Så skal kunden selv regne den anden vej, og hvis han regner
 * forkert, står han enten med for lidt midt i en behandling eller med en
 * ekstra dunk, han ikke kan returnere åbnet.
 *
 * Derfor: en skala for arealet, og så regner siden.
 *
 * Det egentlige arbejde ligger i koncentratet. To varianter af den samme vare
 * kan ikke sammenlignes på prisen, når den ene skal fortyndes ti gange. 5
 * liter koncentrat til 2.599 kr. er billigere end 25 liter brugsklar til
 * 2.099 kr., og det kan man ikke se på hylden. Her kan man.
 *
 * Beregneren vises kun for varer, der står i DOSAGE, altså der hvor der er
 * rigtige tal at regne på. Ellers ingen beregner.
 */

/** Alt regnes i ml eller g, så liter og kilo kan lægges sammen med resten. */
const TO_BASE: Record<string, number> = { l: 1000, ml: 1, kg: 1000, g: 1, stk: 1 };

function fmt(amount: number, unit: Dose["unit"]): string {
  // Under en liter siger man ikke "0,4 liter", man siger 400 ml.
  if (unit === "l" || unit === "ml") {
    const ml = amount * TO_BASE[unit]!;
    return ml < 1000
      ? `${Math.round(ml)} ml`
      : `${(ml / 1000).toLocaleString("da-DK", { maximumFractionDigits: 1 })} liter`;
  }
  const g = amount * TO_BASE[unit]!;
  return g < 1000
    ? `${Math.round(g)} gram`
    : `${(g / 1000).toLocaleString("da-DK", { maximumFractionDigits: 1 })} kg`;
}

/** Hvor meget færdig vare én pakning rækker til, i beregnerens enhed. */
function covers(v: Variant, dose: Dose, rate: Rate): number {
  const base = v.amount * (TO_BASE[v.amountUnit] ?? 0);
  const inDose = base / TO_BASE[dose.unit]!;
  const dil = rate.dilution ?? dose.concentrate;
  if (!v.isConcentrate) return inDose;
  // Et koncentrat kan ikke bruges til en behandling, der ikke fortyndes.
  return dil ? inDose * dil.yield : 0;
}

export default function DoseCalculator({
  p,
  dose,
  onPickVariant,
}: {
  p: Product;
  dose: Dose;
  onPickVariant?: (label: string) => void;
}) {
  const [m2, setM2] = useState(20);
  const [rateKey, setRateKey] = useState(dose.rates[0]!.key);
  const rate = dose.rates.find((r) => r.key === rateKey) ?? dose.rates[0]!;

  const max = Math.max(60, Math.round(dose.proAboveM2 * 2));
  const step = max > 600 ? 25 : max > 150 ? 5 : 1;
  const need = m2 * rate.perM2;
  const tooBig = m2 > dose.proAboveM2;

  // Kun de varianter, der har en læsbar mængde, kan indgå i regnestykket.
  const usable = p.variants.filter((v) => covers(v, dose, rate) > 0);
  const options = usable.map((v) => {
    const packs = Math.max(1, Math.ceil(need / covers(v, dose, rate)));
    return { v, packs, total: packs * v.price };
  });
  const best = options.length
    ? options.reduce((a, b) => (b.total < a.total ? b : a))
    : null;

  return (
    <section
      aria-labelledby="beregner"
      className="rounded-2xl border-2 border-ink-200 bg-white p-5 sm:p-6"
    >
      <h2
        id="beregner"
        className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink-950"
      >
        Hvor meget skal du bruge?
      </h2>
      <p className="select-none mt-1.5 text-sm text-ink-600">
        Træk i skalaen, så regner vi mængden ud og siger, hvilken pakning der er billigst.
      </p>

      {dose.rates.length > 1 && (
        <fieldset className="mt-5 border-0 p-0 m-0">
          <legend className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 mb-2.5">
            Hvad er opgaven?
          </legend>
          <div className="flex flex-col gap-2">
            {dose.rates.map((r) => (
              <label
                key={r.key}
                className="select-none flex items-center gap-3 cursor-pointer rounded-xl border-2 border-ink-200 px-4 py-3 min-h-[52px] has-[:checked]:border-ink-950 has-[:checked]:bg-ink-100 transition-colors"
              >
                <input
                  type="radio"
                  name="behandling"
                  value={r.key}
                  checked={rateKey === r.key}
                  onChange={() => setRateKey(r.key)}
                  className="w-5 h-5 accent-ink-950 shrink-0"
                />
                <span className="text-[15px] text-ink-900">{r.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-5">
        <label
          htmlFor="areal"
          className="select-none flex flex-wrap items-baseline justify-between gap-2"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-600">
            Areal, der skal behandles
          </span>
          <span className="font-display text-2xl font-bold text-ink-950 tabular-nums">
            {m2.toLocaleString("da-DK")} m²
          </span>
        </label>
        {/* Native range: den har tastaturbetjening, den har VoiceOver, og den
            har et gribehåndtag, en 60-årig tommelfinger kan ramme. */}
        <input
          id="areal"
          type="range"
          min={step}
          max={max}
          step={step}
          value={m2}
          onChange={(e) => setM2(Number(e.target.value))}
          className="mt-2 w-full h-11 accent-accent-500 cursor-pointer"
        />
        <div className="select-none flex justify-between text-xs text-ink-500 tabular-nums">
          <span>{step} m²</span>
          <span>{max.toLocaleString("da-DK")} m²</span>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-ink-100 px-4 py-4">
        <p className="text-[15px] text-ink-800 m-0">
          Til {m2.toLocaleString("da-DK")} m² skal du bruge ca.{" "}
          <strong className="font-display text-lg text-ink-950">{fmt(need, dose.unit)}</strong>{" "}
          {dose.concentrate ? "færdig blanding" : "af varen"}.
        </p>
        {(rate.dilution ?? dose.concentrate) && (
          <p className="mt-1.5 text-sm text-ink-700 m-0">
            {(rate.dilution ?? dose.concentrate)!.note}, så det svarer til{" "}
            {fmt(need / (rate.dilution ?? dose.concentrate)!.yield, dose.unit)} koncentrat
            og resten vand.
          </p>
        )}
      </div>

      {options.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2 list-none p-0 m-0">
          {options.map(({ v, packs, total }) => {
            const win = best?.v.label === v.label && options.length > 1;
            return (
              <li key={v.label}>
                <button
                  type="button"
                  onClick={() => onPickVariant?.(v.label)}
                  className={`press w-full text-left flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 px-4 py-3 min-h-[56px] transition-colors ${
                    win ? "border-ink-950 bg-cream" : "border-ink-200 hover:border-ink-400"
                  }`}
                >
                  <span className="font-semibold text-ink-950">
                    {packs} × {v.label}
                  </span>
                  {v.isConcentrate && (
                    <span className="select-none text-xs text-ink-600">
                      giver {fmt(covers(v, dose, rate) * packs, dose.unit)} blanding
                    </span>
                  )}
                  <span className="ml-auto font-display font-bold text-ink-950 tabular-nums">
                    {dkr(total)}
                  </span>
                  {win && (
                    <span className="select-none w-full flex items-center gap-1.5 text-xs font-semibold text-green-800">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                      Billigst til dit areal
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="select-none mt-4 flex gap-2 text-xs text-ink-600 leading-relaxed">
        <Info size={14} strokeWidth={2.5} aria-hidden="true" className="shrink-0 mt-0.5" />
        {dose.sourceNote} Det er et overslag. Etiketten på dunken er den, der gælder.
      </p>

      {tooBig && (
        <div className="mt-4 rounded-xl border-2 border-ink-950 bg-ink-950 text-cream p-4">
          <p className="font-display font-bold text-lg m-0">
            {m2} m² er en dags arbejde med sprøjte og maske
          </p>
          <p className="mt-1.5 text-[15px] text-ink-200 m-0">
            På det areal skal midlet fordeles ensartet, og det, du ikke rammer, er der stadig
            insekter i. Vi kommer forbi, ser på det og giver en fast pris.
          </p>
          <Button
            onPress={() => {
              window.location.href = proLinkFor(p.pest);
            }}
            className="press mt-3.5 inline-flex items-center gap-2 rounded-full bg-accent-500 text-ink-950 font-display font-bold h-12 px-6 hover:bg-accent-400 data-[pressed]:bg-accent-600 transition-colors"
          >
            Få en pris på opgaven
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </Button>
        </div>
      )}
    </section>
  );
}
