import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  FORMS, PEST_COUNTS, PEST_LABEL, PRODUCTS, type PestKey, type Product,
} from "../../lib/shop";
import { ShopFooter, ShopHeader } from "./ShopChrome";
import ProductCard from "./ProductCard";
import ProPanel from "./ProPanel";

const BASE = import.meta.env.BASE_URL;

/**
 * Varebrowseren.
 *
 * Den nuværende butik lader dig vælge én kategori ad gangen ud af 72, og
 * kategorierne overlapper: en musefælde ligger i "Mus", i "Musefælder", i
 * "Elektroniske musefælder" og under sit mærke. Man kan ikke se, hvor mange
 * varer der er tilbage efter et valg, og man kan ikke fravælge igen uden at
 * gå tilbage.
 *
 * Her er der to spørgsmål: hvilket dyr, og hvad slags løsning. Begge er
 * synlige på én gang, begge kan slås fra, og antallet står ved siden af hvert
 * valg, så man kan se, om det er umagen værd at klikke. Det er den eneste
 * grund til at tælle: at kunne se, hvad et klik koster, før man klikker.
 */

type Sort = "relevans" | "billigst" | "dyrest";

function sortBy(list: Product[], sort: Sort) {
  if (sort === "billigst") return [...list].sort((a, b) => a.price - b.price);
  if (sort === "dyrest") return [...list].sort((a, b) => b.price - a.price);
  // Relevans er her: på lager først, så billigst. Der er ingen salgstal at
  // sortere efter, og at lade som om der var ville være et opfundet tal.
  return [...list].sort(
    (a, b) => Number(b.inStock) - Number(a.inStock) || a.price - b.price,
  );
}

/** ?dyr=mus i adressen, så et link fra menuen lander med filteret sat. */
function pestFromUrl(): PestKey | "" {
  if (typeof location === "undefined") return "";
  const v = new URLSearchParams(location.search).get("dyr") ?? "";
  return (v in PEST_LABEL ? v : "") as PestKey | "";
}

export default function ProductBrowser() {
  const [pest, setPest] = useState<PestKey | "">(pestFromUrl);
  const [form, setForm] = useState<string>("");
  const [sort, setSort] = useState<Sort>("relevans");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const shown = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) => (!pest || p.pest === pest) && (!form || p.form === form),
    );
    return sortBy(list, sort);
  }, [pest, form, sort]);

  /** Hvor mange varer et valg ville give, målt oven på de andre filtre. */
  const countIfPest = (k: PestKey) =>
    PRODUCTS.filter((p) => p.pest === k && (!form || p.form === form)).length;
  const countIfForm = (f: string) =>
    PRODUCTS.filter((p) => p.form === f && (!pest || p.pest === pest)).length;

  const pests = (Object.keys(PEST_COUNTS) as PestKey[]).sort(
    (a, b) => PEST_COUNTS[b]! - PEST_COUNTS[a]!,
  );

  return (
    <>
      <ShopHeader />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <nav aria-label="Brødkrumme" className="select-none text-sm text-ink-600 mb-3">
          <a href={`${BASE}shop/`} className="hover:text-ink-950 underline underline-offset-4">
            Butik
          </a>
          <span className="mx-2">/</span>
          <span className="text-ink-950 font-semibold">
            {pest ? PEST_LABEL[pest] : "Alle varer"}
          </span>
        </nav>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase text-ink-950">
          {pest ? `Mod ${PEST_LABEL[pest].toLowerCase()}` : "Alle varer"}
        </h1>
        <p className="select-none mt-2 text-ink-700">
          <span className="tabular-nums font-semibold text-ink-950">{shown.length}</span>{" "}
          {shown.length === 1 ? "vare" : "varer"}
          {form && <> · {form.toLowerCase()}</>}
        </p>

        {pest && (
          <div className="mt-6">
            <ProPanel pest={pest} compact />
          </div>
        )}

        <div className="mt-6 grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-6 lg:gap-8">
          {/* Filtrene er en liste, ikke en rullemenu. En rullemenu skjuler,
              hvad valgene er, og det er præcis det, der er svært her. */}
          <div>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="lg:hidden w-full inline-flex items-center justify-between gap-2 rounded-xl border-2 border-ink-300 min-h-[52px] px-4 font-display font-bold text-ink-950"
              aria-expanded={filtersOpen}
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal size={18} strokeWidth={2.5} aria-hidden="true" />
                Filtre
              </span>
              {(pest || form) && (
                <span className="text-xs font-sans bg-ink-950 text-cream rounded-full px-2 py-0.5">
                  {[pest, form].filter(Boolean).length}
                </span>
              )}
            </button>

            <div className={`${filtersOpen ? "block" : "hidden"} lg:block mt-4 lg:mt-0`}>
              {(pest || form) && (
                <button
                  type="button"
                  onClick={() => {
                    setPest("");
                    setForm("");
                  }}
                  className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-ink-950 underline underline-offset-4"
                >
                  <X size={14} strokeWidth={3} aria-hidden="true" />
                  Ryd alle filtre
                </button>
              )}

              <fieldset className="mb-7 border-0 p-0 m-0">
                <legend className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 mb-2.5 p-0">
                  Skadedyr
                </legend>
                <ul className="flex flex-wrap lg:flex-col gap-1.5 list-none p-0 m-0">
                  {pests.map((k) => {
                    const on = pest === k;
                    const n = countIfPest(k);
                    return (
                      <li key={k}>
                        <button
                          type="button"
                          onClick={() => setPest(on ? "" : k)}
                          aria-pressed={on}
                          className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 min-h-[44px] text-[15px] font-semibold border-2 transition-colors ${
                            on
                              ? "bg-ink-950 text-cream border-ink-950"
                              : "bg-transparent text-ink-800 border-transparent hover:border-ink-300"
                          } ${n === 0 ? "opacity-40" : ""}`}
                        >
                          {PEST_LABEL[k]}
                          <span className="text-xs tabular-nums opacity-70">{n}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>

              <fieldset className="border-0 p-0 m-0">
                <legend className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 mb-2.5 p-0">
                  Slags løsning
                </legend>
                <ul className="flex flex-wrap lg:flex-col gap-1.5 list-none p-0 m-0">
                  {FORMS.map((f) => {
                    const on = form === f;
                    const n = countIfForm(f);
                    return (
                      <li key={f}>
                        <button
                          type="button"
                          onClick={() => setForm(on ? "" : f)}
                          aria-pressed={on}
                          className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 min-h-[44px] text-[15px] font-semibold border-2 transition-colors ${
                            on
                              ? "bg-ink-950 text-cream border-ink-950"
                              : "bg-transparent text-ink-800 border-transparent hover:border-ink-300"
                          } ${n === 0 ? "opacity-40" : ""}`}
                        >
                          {f}
                          <span className="text-xs tabular-nums opacity-70">{n}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-end mb-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-ink-800">
                Sortér
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="rounded-lg border-2 border-ink-300 bg-cream min-h-[44px] px-3 font-semibold text-ink-950"
                >
                  <option value="relevans">På lager først</option>
                  <option value="billigst">Billigst først</option>
                  <option value="dyrest">Dyrest først</option>
                </select>
              </label>
            </div>

            {shown.length === 0 ? (
              <p className="rounded-2xl border-2 border-dashed border-ink-300 p-8 text-center text-ink-700">
                Ingen varer med de filtre. Prøv at slå et af dem fra.
              </p>
            ) : (
              <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 list-none p-0 m-0">
                {shown.map((p, i) => (
                  <li key={p.slug}>
                    <ProductCard p={p} priority={i < 4} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <ShopFooter />
    </>
  );
}
