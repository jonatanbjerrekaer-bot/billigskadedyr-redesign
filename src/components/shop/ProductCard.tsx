import { AlertTriangle, Check } from "lucide-react";
import { dkr, hasPrice, isDeal, PEST_LABEL, type Product } from "../../lib/shop";
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

  return (
    <a
      href={`${BASE}shop/produkt/${p.slug}/`}
      className="group flex flex-col bg-cream rounded-2xl border border-ink-200 overflow-hidden hover:border-ink-400 hover:shadow-lg transition-[border-color,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
    >
      <div className="relative aspect-square bg-white">
        <img
          src={`${BASE}shop/${p.img}`}
          alt={p.name}
          width={400}
          height={400}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-contain p-4 sm:p-6 transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {deal && (
          <span className="select-none absolute top-3 left-3 bg-accent-500 text-ink-950 text-xs font-bold uppercase tracking-wide rounded-full px-2.5 py-1">
            Tilbud
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 sm:p-5 border-t border-ink-200 flex-1">
        <p className="select-none text-[11px] uppercase tracking-widest text-ink-500">
          {PEST_LABEL[p.pest]} · {p.form}
        </p>
        <h3 className="font-display font-bold text-ink-950 leading-snug text-[15px] sm:text-base">
          {p.name}
        </h3>

        {nudge?.flag && (
          <p className="flex items-start gap-1.5 text-[13px] text-ink-700 leading-snug">
            <AlertTriangle size={14} strokeWidth={2.5} aria-hidden="true" className="text-amber-600 shrink-0 mt-0.5" />
            {nudge.flag}
          </p>
        )}

        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          {hasPrice(p) ? (
            <p className="font-display text-xl sm:text-2xl font-bold text-ink-950 tabular-nums leading-none">
              {dkr(p.price)}
              {deal && (
                <span className="ml-2 text-sm font-sans font-normal text-ink-500 line-through">
                  {dkr(p.regular)}
                </span>
              )}
            </p>
          ) : (
            <p className="font-display text-base font-bold text-ink-700 leading-none">
              Pris på forespørgsel
            </p>
          )}
          <p
            className={`select-none flex items-center gap-1 text-xs font-semibold ${
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
