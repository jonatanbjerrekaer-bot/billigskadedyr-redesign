import { useState } from "react";
import { Check } from "lucide-react";
import { dkr, hasPrice, hasRange, isDeal, PEST_LABEL, type Product } from "../../lib/shop";
import { NUDGE } from "../../lib/shopContent";

const BASE = import.meta.env.BASE_URL;

/**
 * Et produktkort.
 *
 * Prisen er stor og står alene, fordi den er det, øjet leder efter, og fordi
 * målgruppen ikke skal lede efter 13px grå tal. Lagerstatus står med, fordi
 * "kan jeg få den nu" er det andet spørgsmål. Og hvor der er et forbehold,
 * står det på kortet i stedet for at vente til produktsiden: en kunde, der
 * opdager på side tre, at varen ikke duer til hans opgave, føler sig snydt.
 */
export default function ProductCard({ p, priority }: { p: Product; priority?: boolean }) {
  const nudge = NUDGE[p.pest];
  const deal = isDeal(p);
  // Hovedbilledet foerst, saa de ekstra. Har varen ingen ekstra, staar der
  // ét, og saa vises striben ikke.
  const shots = [p.img, ...p.images];
  const [shot, setShot] = useState(0);
  // Fås varen i flere størrelser, er én pris en halv sandhed.
  const range = hasRange(p);

  return (
    <a
      href={`${BASE}shop/produkt/${p.slug}/`}
      className="group flex h-full flex-col bg-cream rounded-2xl border border-ink-200 overflow-hidden hover:border-ink-950 transition-[border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
    >
      <div className="relative aspect-square bg-white">
        <img
          src={`${BASE}shop/${shots[shot]}`}
          alt={p.name}
          width={400}
          height={400}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-contain p-4 sm:p-6"
        />

        {/* Billedskifteren. Prikker frem for pile: der er to eller tre
            billeder, ikke tyve, og en prik viser både hvor mange der er og
            hvilket man står på. */}
        {shots.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {shots.map((s, i) => (
              <button
                key={s}
                type="button"
                aria-label={`Vis billede ${i + 1} af ${shots.length}`}
                aria-current={i === shot}
                onMouseEnter={() => setShot(i)}
                onFocus={() => setShot(i)}
                onClick={(e) => {
                  // Prikken sidder inde i kortets link. Uden det her aabner
                  // et klik paa prikken varen i stedet for at skifte billede.
                  e.preventDefault();
                  e.stopPropagation();
                  setShot(i);
                }}
                className={`shot-dot h-6 w-6 grid place-items-center rounded-full border-0 bg-transparent p-0 cursor-pointer ${
                  i === shot ? "is-on" : ""
                }`}
              />
            ))}
          </div>
        )}
        {deal && (
          <span className="select-none absolute top-3 left-3 bg-accent-500 text-ink-950 text-[13px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1">
            Tilbud
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-5 border-t border-ink-200 flex-1">
        <p className="select-none text-[13px] text-ink-500">
          {PEST_LABEL[p.pest]} · {p.form}
          {range ? (
            <> · {p.variants.length} størrelser</>
          ) : (
            p.size && <> · {p.size}</>
          )}
        </p>
        <h3 className="font-display font-semibold text-ink-950 leading-snug text-[17px]">
          {p.name}
        </h3>

        {nudge?.flag && (
          <p className="text-[13px] text-ink-700 leading-snug">{nudge.flag}</p>
        )}

        {p.unit && (
          <p className="select-none text-[13px] text-ink-600 tabular-nums">{p.unit}</p>
        )}

        {/* Raekken skal kunne bryde. Med et tilbud staar der pris, foerpris og
              lagerstatus, og uden ombrydning bliver den sidste skubbet ud
              over kortets kant. */}
          <div className="mt-auto pt-2 flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-x-2 sm:gap-y-1">
          {hasPrice(p) ? (
            <p className="font-display text-lg sm:text-2xl font-bold text-ink-950 tabular-nums leading-none whitespace-nowrap">
              {range && (
                <span className="select-none mr-1 text-sm font-sans font-semibold text-ink-600">Fra</span>
              )}
              {dkr(p.price)}
              {deal && (
                <span className="ml-2 text-sm font-sans font-normal text-ink-500 line-through">
                  {dkr(p.regular)}
                </span>
              )}
            </p>
          ) : (
            <p className="font-display text-base sm:text-[19px] font-bold text-ink-700 leading-snug">
              Pris på forespørgsel
            </p>
          )}
          <p
            className={`select-none flex items-center gap-1 text-[13px] font-medium whitespace-nowrap ${
              p.inStock ? "text-green-700" : "text-ink-500"
            }`}
          >
            {p.inStock && <Check size={13} strokeWidth={3} aria-hidden="true" />}
            {p.inStock ? "På lager" : "Skaffevare"}
          </p>
        </div>
      </div>
    </a>
  );
}
