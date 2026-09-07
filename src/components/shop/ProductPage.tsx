import { useState } from "react";
import {
  Check, ChevronLeft, Minus, Plus, ShoppingCart, Truck, Undo2, X,
} from "lucide-react";
import { BY_SLUG, dkr, hasPrice, isDeal, PEST_LABEL, PRODUCTS } from "../../lib/shop";
import { DETAIL } from "../../lib/shopContent";
import { addToCart } from "../../lib/cart";
import { ShopFooter, ShopHeader } from "./ShopChrome";
import ProductCard from "./ProductCard";
import ProPanel from "./ProPanel";

const BASE = import.meta.env.BASE_URL;

/**
 * Produktsiden.
 *
 * Rækkefølgen er den, Baymard finder igen og igen: billede, navn, pris,
 * lagerstatus og læg-i-kurv skal kunne ses uden at rulle, fordi det er den
 * beslutning, siden findes for. Alt, der forklarer, kommer under.
 *
 * To ting er anderledes end i en almindelig webshop.
 *
 * Den ene er "gør" og "gør ikke" side om side. En webshop skriver normalt
 * kun den første halvdel, og så er det kunden, der finder ud af resten, når
 * varen står i garagen. Den anden halvdel er også den, der gør nudget
 * troværdigt: når vi har sagt tre rigtige ting om, hvad varen kan, tror man
 * på os, når vi siger, hvad den ikke kan.
 *
 * Den anden er, at nudget står under købsknappen og ikke over. Kunden, der
 * ved, hvad han laver, skal ikke forbi en advarsel for at købe en
 * hvepsespray. Kunden, der er i tvivl, ruller ned, og der står den.
 */
export default function ProductPage({ slug }: { slug: string }) {
  const p = BY_SLUG.get(slug);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!p) {
    return (
      <>
        <ShopHeader />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-ink-950">Den vare findes ikke</h1>
          <a
            href={`${BASE}shop/produkter/`}
            className="mt-6 inline-block font-semibold underline underline-offset-4"
          >
            Se alle varer
          </a>
        </main>
        <ShopFooter />
      </>
    );
  }

  const d = DETAIL[p.slug];
  const deal = isDeal(p);
  const related = PRODUCTS.filter((x) => x.pest === p.pest && x.slug !== p.slug).slice(0, 8);

  function add() {
    addToCart(p!.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2600);
  }

  return (
    <>
      <ShopHeader />

      <main>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5">
          <nav aria-label="Brødkrumme" className="select-none text-sm text-ink-600 flex items-center gap-2">
            <a href={`${BASE}shop/`} className="hover:text-ink-950 underline underline-offset-4">Butik</a>
            <span>/</span>
            <a
              href={`${BASE}shop/produkter/?dyr=${p.pest}`}
              className="hover:text-ink-950 underline underline-offset-4"
            >
              {PEST_LABEL[p.pest]}
            </a>
            <span>/</span>
            <span className="text-ink-950 font-semibold truncate">{p.name}</span>
          </nav>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-14 pb-10">
          <div className="bg-white rounded-2xl border border-ink-200 p-6 sm:p-12 grid place-items-center">
            <img
              src={`${BASE}shop/${p.img}`}
              alt={p.name}
              width={720}
              height={720}
              className="w-full max-w-md object-contain"
            />
          </div>

          <div>
            <p className="select-none text-[11px] uppercase tracking-widest text-ink-600 mb-2">
              {PEST_LABEL[p.pest]} · {p.form}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink-950 leading-tight">
              {p.name}
            </h1>
            {d?.lead && <p className="mt-3 text-lg text-ink-800 leading-relaxed">{d.lead}</p>}
            {!d && p.blurb && <p className="mt-3 text-ink-800 leading-relaxed">{p.blurb}</p>}

            <div className="mt-6 flex items-end gap-3">
              <p className="font-display text-4xl sm:text-5xl font-bold text-ink-950 tabular-nums leading-none">
                {hasPrice(p) ? dkr(p.price) : "Pris på forespørgsel"}
              </p>
              {deal && hasPrice(p) && (
                <p className="text-lg text-ink-500 line-through tabular-nums">{dkr(p.regular)}</p>
              )}
            </div>
            <p className="select-none mt-1.5 text-sm text-ink-600">
              {hasPrice(p) ? "Inkl. moms" : "Ring eller skriv, så får du prisen med det samme"}
            </p>

            <p
              className={`select-none mt-4 inline-flex items-center gap-2 font-semibold ${
                p.inStock ? "text-green-700" : "text-ink-600"
              }`}
            >
              {p.inStock ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : null}
              {p.inStock ? "På lager, sendes samme hverdag inden kl. 14" : "Skaffevare, 5-8 hverdage"}
            </p>

            {hasPrice(p) && (
            <div className="mt-6 flex flex-wrap items-stretch gap-3">
              <div className="flex items-center rounded-full border-2 border-ink-300 h-14">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Færre"
                  className="w-12 h-full grid place-items-center rounded-l-full hover:bg-ink-100 disabled:opacity-30"
                  disabled={qty <= 1}
                >
                  <Minus size={18} strokeWidth={3} aria-hidden="true" />
                </button>
                <span className="w-10 text-center font-display font-bold text-lg tabular-nums" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Flere"
                  className="w-12 h-full grid place-items-center rounded-r-full hover:bg-ink-100"
                >
                  <Plus size={18} strokeWidth={3} aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={add}
                className="press flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-500 text-ink-950 font-display font-bold text-lg h-14 px-8 hover:bg-accent-400 transition-colors"
              >
                {added ? (
                  <>
                    <Check size={20} strokeWidth={3} aria-hidden="true" />
                    Lagt i kurven
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} strokeWidth={2.5} aria-hidden="true" />
                    Læg i kurv
                  </>
                )}
              </button>
            </div>
            )}

            <ul className="select-none mt-5 flex flex-col gap-2 text-sm text-ink-700 list-none p-0 m-0">
              <li className="flex items-center gap-2">
                <Truck size={16} strokeWidth={2.5} aria-hidden="true" className="text-ink-500" />
                Fri fragt over 499 kr., ellers 49 kr.
              </li>
              <li className="flex items-center gap-2">
                <Undo2 size={16} strokeWidth={2.5} aria-hidden="true" className="text-ink-500" />
                14 dages returret på uåbnede varer
              </li>
              {p.sku && (
                <li className="flex items-center gap-2 text-ink-500">Varenummer {p.sku}</li>
              )}
            </ul>

            {d && (
              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="select-none text-[11px] font-bold uppercase tracking-widest text-green-800 mb-2.5">
                    Det gør den
                  </p>
                  <ul className="flex flex-col gap-2 text-[15px] text-ink-800 list-none p-0 m-0">
                    {d.does.map((x) => (
                      <li key={x} className="flex gap-2 leading-snug">
                        <Check size={16} strokeWidth={3} aria-hidden="true" className="text-green-700 shrink-0 mt-1" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 mb-2.5">
                    Det gør den ikke
                  </p>
                  <ul className="flex flex-col gap-2 text-[15px] text-ink-800 list-none p-0 m-0">
                    {d.doesNot.map((x) => (
                      <li key={x} className="flex gap-2 leading-snug">
                        <X size={16} strokeWidth={3} aria-hidden="true" className="text-ink-500 shrink-0 mt-1" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-8">
              <ProPanel pest={p.pest} />
            </div>
          </div>
        </div>

        {d && (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-14 pb-14">
            <section aria-labelledby="fakta">
              <h2 id="fakta" className="font-display text-2xl font-bold tracking-tight text-ink-950 mb-4">
                Kort fortalt
              </h2>
              <dl className="rounded-2xl border border-ink-200 divide-y divide-ink-200 overflow-hidden">
                {d.specs.map((s) => (
                  <div key={s.k} className="grid sm:grid-cols-[minmax(0,11rem)_1fr] gap-1 sm:gap-4 px-4 py-3.5">
                    <dt className="select-none text-sm font-semibold text-ink-600">{s.k}</dt>
                    <dd className="text-[15px] text-ink-900 m-0">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="saadan">
              <h2 id="saadan" className="font-display text-2xl font-bold tracking-tight text-ink-950 mb-4">
                Sådan bruger du den
              </h2>
              <ol className="flex flex-col gap-3.5 list-none p-0 m-0 counter-reset">
                {d.how.map((step, i) => (
                  <li key={step} className="flex gap-3.5">
                    <span className="select-none shrink-0 grid place-items-center w-8 h-8 rounded-full bg-ink-950 text-cream font-display font-bold text-sm tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-[15px] text-ink-800 leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        )}

        {related.length > 0 && (
          <section aria-labelledby="relateret" className="bg-ink-100 border-t border-ink-200 py-10 sm:py-14">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
              <h2 id="relateret" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-950 mb-5">
                Andet mod {PEST_LABEL[p.pest].toLowerCase()}
              </h2>
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
                {related.slice(0, 4).map((x) => (
                  <li key={x.slug}>
                    <ProductCard p={x} />
                  </li>
                ))}
              </ul>
              <a
                href={`${BASE}shop/produkter/?dyr=${p.pest}`}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-ink-950 underline underline-offset-4"
              >
                <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                Se alt mod {PEST_LABEL[p.pest].toLowerCase()}
              </a>
            </div>
          </section>
        )}
      </main>

      <ShopFooter />
    </>
  );
}
