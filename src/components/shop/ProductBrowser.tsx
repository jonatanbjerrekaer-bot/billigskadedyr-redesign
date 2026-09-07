import { useEffect, useMemo, useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import { Check, SlidersHorizontal, X } from "lucide-react";
import {
  BRANDS, dkr, FORMS, hasPrice, PEST_COUNTS, PEST_LABEL, PRODUCTS,
  type PestKey, type Product,
} from "../../lib/shop";
import Select from "../ui/Select";
import { ShopFooter, ShopHeader } from "./ShopChrome";
import ShopGlyph from "./ShopGlyph";
import ProductCard from "./ProductCard";
import { search } from "../../lib/search";
import ProPanel from "./ProPanel";

const BASE = import.meta.env.BASE_URL;

/**
 * Varebrowseren.
 *
 * Ændringerne her følger Baymards to undersøgelser af filtre og varelister,
 * og hver enkelt løser noget, den forrige udgave gjorde forkert:
 *
 * Flere værdier ad gangen. Før kunne man kun vælge ét skadedyr. Har man
 * både mus og rotter, er det ét problem for kunden og to filtre i systemet,
 * og han skulle vælge side. Nu kan man vælge begge, og de lægges sammen.
 *
 * Valgte filtre står øverst som chips, man kan fjerne enkeltvis. Uden dem
 * skal man lede i en lang sidebar efter det, man kom til at klikke på, og
 * det er den hyppigste grund til, at folk rydder alt og starter forfra.
 *
 * Pris er kommet med. Det er det filter, folk savner mest i en butik med
 * varer fra 9 til 4.599 kr., og intervallerne er lagt, hvor varerne
 * faktisk ligger, ikke i runde tal for syns skyld.
 *
 * Tomme valg bliver stående, men slukkede. At fjerne dem får listen til at
 * hoppe og skjuler, at valget overhovedet fandtes.
 *
 * Adressen følger filtrene. Et filtreret udsnit kan sendes til en anden
 * eller gemmes som bogmærke, og browserens tilbage-knap virker.
 */

type Sort = "relevans" | "billigst" | "dyrest" | "enhed";

/** Prisintervaller lagt der, hvor varerne ligger. */
const PRICE_BANDS = [
  { id: "u100", label: "Under 100 kr.", test: (p: Product) => p.price > 0 && p.price < 100 },
  { id: "100-249", label: "100-249 kr.", test: (p: Product) => p.price >= 100 && p.price < 250 },
  { id: "250-499", label: "250-499 kr.", test: (p: Product) => p.price >= 250 && p.price < 500 },
  { id: "500-999", label: "500-999 kr.", test: (p: Product) => p.price >= 500 && p.price < 1000 },
  { id: "o1000", label: "1.000 kr. og op", test: (p: Product) => p.price >= 1000 },
] as const;

type Filters = {
  pests: Set<string>;
  forms: Set<string>;
  bands: Set<string>;
  brands: Set<string>;
  inStock: boolean;
};

function matches(p: Product, f: Filters, skip?: keyof Filters) {
  if (skip !== "pests" && f.pests.size && !f.pests.has(p.pest)) return false;
  if (skip !== "forms" && f.forms.size && !f.forms.has(p.form)) return false;
  if (skip !== "bands" && f.bands.size) {
    const hit = PRICE_BANDS.some((b) => f.bands.has(b.id) && b.test(p));
    if (!hit) return false;
  }
  if (skip !== "brands" && f.brands.size && !f.brands.has(p.brand)) return false;
  if (skip !== "inStock" && f.inStock && !p.inStock) return false;
  return true;
}

function sortBy(list: Product[], sort: Sort) {
  if (sort === "billigst") return [...list].sort((a, b) => a.price - b.price);
  if (sort === "dyrest") return [...list].sort((a, b) => b.price - a.price);
  // Kategorispecifik sortering, som Baymard kalder den. Varer uden læsbar
  // mængde kan ikke sammenlignes og lægges bagest i stedet for at blive
  // blandet ind med et nul.
  if (sort === "enhed")
    return [...list].sort((a, b) => {
      if (!a.unitValue) return 1;
      if (!b.unitValue) return -1;
      return a.unitValue - b.unitValue;
    });
  // Der er ingen salgstal at sortere efter, så "relevans" er det ærlige:
  // det man kan købe nu, og billigst først.
  return [...list].sort(
    (a, b) => Number(b.inStock) - Number(a.inStock) || a.price - b.price,
  );
}

function readUrl(): { f: Filters; sort: Sort; q: string } {
  const q = new URLSearchParams(typeof location === "undefined" ? "" : location.search);
  const set = (k: string) => new Set((q.get(k) ?? "").split(",").filter(Boolean));
  const sort = q.get("sort");
  const term = q.get("q") ?? "";

  /*
   * Peger søgningen på ét skadedyr, og har man ikke selv valgt et, så
   * sættes det. "træorm" er borebiller, og så skal listen vise biller.
   * Det står som en chip bagefter, så det kan slås fra igen.
   */
  const pests = set("dyr");
  if (term && !pests.size) {
    const hit = search(term).pest;
    if (hit) pests.add(hit);
  }

  return {
    q: term,
    f: {
      pests,
      forms: set("type"),
      bands: set("pris"),
      brands: set("maerke"),
      inStock: q.get("lager") === "1",
    },
    sort:
      sort === "billigst" || sort === "dyrest" || sort === "enhed"
        ? sort
        : "relevans",
  };
}

export default function ProductBrowser() {
  const initial = readUrl();
  const [f, setF] = useState<Filters>(initial.f);
  const [sort, setSort] = useState<Sort>(initial.sort);
  const [term, setTerm] = useState(initial.q);
  const [open, setOpen] = useState(false);

  /*
   * Søgningen kører før filtrene: den afgør, hvilke varer der er i spil,
   * og filtrene skærer i dem bagefter.
   */
  const found = useMemo(() => (term.trim() ? search(term) : null), [term]);

  // Adressen følger filtrene, så et udsnit kan deles og bogmærkes.
  useEffect(() => {
    const q = new URLSearchParams();
    if (f.pests.size) q.set("dyr", [...f.pests].join(","));
    if (f.forms.size) q.set("type", [...f.forms].join(","));
    if (f.bands.size) q.set("pris", [...f.bands].join(","));
    if (f.brands.size) q.set("maerke", [...f.brands].join(","));
    if (f.inStock) q.set("lager", "1");
    if (sort !== "relevans") q.set("sort", sort);
    if (term.trim()) q.set("q", term);
    const s = q.toString();
    history.replaceState({}, "", location.pathname + (s ? `?${s}` : ""));
  }, [f, sort, term]);

  const pool = found ? found.products : PRODUCTS;
  const shown = useMemo(
    () => sortBy(pool.filter((p) => matches(p, f)), sort),
    [pool, f, sort],
  );

  /*
   * At komme tilbage til toppen af listen, hver gang man har kigget på en
   * vare, er den mest trættende ting ved at browse på en telefon: man har
   * rullet forbi fyrre varer, kigger på nummer enogfyrre, går tilbage og
   * skal rulle forbi de fyrre igen. Positionen gemmes derfor, når man
   * forlader siden, og genskabes, når man kommer tilbage.
   */
  useEffect(() => {
    const key = "butik-position";
    const save = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener("pagehide", save);
    const y = Number(sessionStorage.getItem(key) ?? 0);
    // Kun ved tilbagenavigation. En frisk indgang skal starte i toppen.
    const back = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (y > 0 && back?.type === "back_forward") window.scrollTo(0, y);
    return () => window.removeEventListener("pagehide", save);
  }, []);

  /** Hvor mange varer et valg ville give oven på de øvrige filtre. */
  const countPest = (k: string) =>
    PRODUCTS.filter((p) => p.pest === k && matches(p, f, "pests")).length;
  const countForm = (x: string) =>
    PRODUCTS.filter((p) => p.form === x && matches(p, f, "forms")).length;
  const countBrand = (x: string) =>
    PRODUCTS.filter((p) => p.brand === x && matches(p, f, "brands")).length;
  const countBand = (id: string) => {
    const b = PRICE_BANDS.find((x) => x.id === id)!;
    return PRODUCTS.filter((p) => b.test(p) && matches(p, f, "bands")).length;
  };

  const pests = (Object.keys(PEST_COUNTS) as PestKey[]).sort(
    (a, b) => PEST_COUNTS[b]! - PEST_COUNTS[a]!,
  );

  const toggle = (key: keyof Filters, keys: Iterable<string>) =>
    setF((prev) => ({ ...prev, [key]: new Set(keys) }));

  /** Alle aktive valg som ét fladt sæt, så de kan fjernes enkeltvis. */
  const chips = [
    ...[...f.pests].map((v) => ({
      k: "pests" as const, v, type: "Skadedyr", label: PEST_LABEL[v as PestKey],
    })),
    ...[...f.forms].map((v) => ({ k: "forms" as const, v, type: "Type", label: v })),
    ...[...f.bands].map((v) => ({
      k: "bands" as const, v, type: "Pris",
      label: PRICE_BANDS.find((b) => b.id === v)?.label ?? v,
    })),
    ...[...f.brands].map((v) => ({ k: "brands" as const, v, type: "Mærke", label: v })),
    ...(f.inStock
      ? [{ k: "inStock" as const, v: "1", type: "", label: "Kun på lager" }]
      : []),
    ...(term.trim()
      ? [{ k: "term" as const, v: term, type: "Søgning", label: term }]
      : []),
  ];

  function drop(chip: (typeof chips)[number]) {
    if (chip.k === "term") {
      setTerm("");
      return;
    }
    setF((prev) => {
      if (chip.k === "inStock") return { ...prev, inStock: false };
      const next = new Set(prev[chip.k]);
      next.delete(chip.v);
      return { ...prev, [chip.k]: next };
    });
  }

  const clearAll = () => {
    setTerm("");
    setF({ pests: new Set(), forms: new Set(), bands: new Set(), brands: new Set(), inStock: false });
  };

  const heading =
    f.pests.size === 1 ? `Mod ${PEST_LABEL[[...f.pests][0] as PestKey].toLowerCase()}` : "Alle varer";

  // Feltet fortæller, at man må vælge flere. Firkant, ikke cirkel: en
  // cirkel ville love et enten-eller, og det er netop ikke reglen her.
  const OPTION =
    "w-full flex items-center gap-2.5 rounded-lg px-3 min-h-[44px] text-[15px] font-semibold border-2 border-transparent text-ink-800 hover:border-ink-300 " +
    "data-[selected]:bg-ink-950 data-[selected]:text-cream data-[selected]:border-ink-950 data-[disabled]:opacity-35 transition-colors " +
    "[&[data-selected]_[data-box]]:border-cream [&[data-selected]_[data-box]]:bg-cream [&[data-selected]_[data-box]_svg]:opacity-100";

  /** Det firkantede felt foran hver værdi. */
  const Box = () => (
    <span
      data-box
      aria-hidden="true"
      className="grid place-items-center w-[18px] h-[18px] rounded-[4px] border-2 border-ink-400 shrink-0 transition-colors"
    >
      <Check size={12} strokeWidth={4} className="text-ink-950 opacity-0 transition-opacity" />
    </span>
  );

  return (
    <>
      <ShopHeader />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <nav aria-label="Brødkrumme" className="select-none text-sm text-ink-600 mb-3">
          <a href={`${BASE}shop/`} className="hover:text-ink-950 underline underline-offset-4">Butik</a>
          <span className="mx-2">/</span>
          <span className="text-ink-950 font-semibold">{heading}</span>
        </nav>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase text-ink-950">
          {heading}
        </h1>

        {/* Panelet skubbede hele listen ned i ét spring, når man valgte et
            dyr. Nu folder det sig ud, og listen følger med. */}
        {f.pests.size === 1 && (
          <div className="reveal mt-6">
            <div>
              <div className="reveal-in">
                <ProPanel pest={[...f.pests][0] as PestKey} compact />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-6 lg:gap-8">
          <div>
            <Button
              onPress={() => setOpen((v) => !v)}
              className="lg:hidden w-full inline-flex items-center justify-between gap-2 rounded-xl border-2 border-ink-300 bg-transparent min-h-[52px] px-4 font-display font-bold text-ink-950"
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal size={18} strokeWidth={2.5} aria-hidden="true" />
                Filtre
              </span>
              {chips.length > 0 && (
                <span className="text-xs font-sans bg-ink-950 text-cream rounded-full px-2 py-0.5">
                  {chips.length}
                </span>
              )}
            </Button>

            <div className={`shop-filter ${open ? "block" : "hidden"} lg:block mt-4 lg:mt-0`}>
              <fieldset className="mb-7 border-0 p-0 m-0">
                <legend className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 mb-1 p-0">
                  Skadedyr
                </legend>
                <p className="select-none text-[13px] text-ink-600 mb-2.5">Vælg gerne flere</p>
                <ToggleButtonGroup.Root
                  selectionMode="multiple"
                  selectedKeys={[...f.pests]}
                  onSelectionChange={(keys) => toggle("pests", [...keys].map(String))}
                  className="flex flex-wrap lg:flex-col gap-1.5"
                >
                  {pests.map((k) => {
                    const n = countPest(k);
                    return (
                      <ToggleButton key={k} id={k} isDisabled={n === 0 && !f.pests.has(k)} className={OPTION}>
                        <Box />
                        <ShopGlyph pest={k} size={20} className="opacity-80" />
                        <span className="grow text-left">{PEST_LABEL[k]}</span>
                        <span className="text-xs tabular-nums opacity-70">{n}</span>
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup.Root>
              </fieldset>

              <fieldset className="mb-7 border-0 p-0 m-0">
                <legend className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 mb-2.5 p-0">
                  Pris
                </legend>
                <ToggleButtonGroup.Root
                  selectionMode="multiple"
                  selectedKeys={[...f.bands]}
                  onSelectionChange={(keys) => toggle("bands", [...keys].map(String))}
                  className="flex flex-wrap lg:flex-col gap-1.5"
                >
                  {PRICE_BANDS.map((b) => {
                    const n = countBand(b.id);
                    return (
                      <ToggleButton key={b.id} id={b.id} isDisabled={n === 0 && !f.bands.has(b.id)} className={OPTION}>
                        <Box />
                        <span className="grow text-left">{b.label}</span>
                        <span className="text-xs tabular-nums opacity-70">{n}</span>
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup.Root>
              </fieldset>

              <fieldset className="mb-7 border-0 p-0 m-0">
                <legend className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 mb-2.5 p-0">
                  Slags løsning
                </legend>
                <ToggleButtonGroup.Root
                  selectionMode="multiple"
                  selectedKeys={[...f.forms]}
                  onSelectionChange={(keys) => toggle("forms", [...keys].map(String))}
                  className="flex flex-wrap lg:flex-col gap-1.5"
                >
                  {FORMS.map((x) => {
                    const n = countForm(x);
                    return (
                      <ToggleButton key={x} id={x} isDisabled={n === 0 && !f.forms.has(x)} className={OPTION}>
                        <Box />
                        <span className="grow text-left">{x}</span>
                        <span className="text-xs tabular-nums opacity-70">{n}</span>
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup.Root>
              </fieldset>

              <fieldset className="mb-7 border-0 p-0 m-0">
                <legend className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 mb-2.5 p-0">
                  Mærke
                </legend>
                <ToggleButtonGroup.Root
                  selectionMode="multiple"
                  selectedKeys={[...f.brands]}
                  onSelectionChange={(keys) => toggle("brands", [...keys].map(String))}
                  className="flex flex-wrap lg:flex-col gap-1.5"
                >
                  {BRANDS.map((x) => {
                    const n = countBrand(x);
                    return (
                      <ToggleButton key={x} id={x} isDisabled={n === 0 && !f.brands.has(x)} className={OPTION}>
                        <Box />
                        <span className="grow text-left">{x}</span>
                        <span className="text-xs tabular-nums opacity-70">{n}</span>
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup.Root>
              </fieldset>

              <ToggleButtonGroup.Root
                selectionMode="multiple"
                selectedKeys={f.inStock ? ["lager"] : []}
                onSelectionChange={(keys) =>
                  setF((prev) => ({ ...prev, inStock: [...keys].length > 0 }))
                }
                className="flex"
              >
                <ToggleButton id="lager" className={OPTION}>
                  <Box />
                  <span className="grow text-left">Kun på lager</span>
                  <span className="text-xs tabular-nums opacity-70">
                    {PRODUCTS.filter((p) => p.inStock && matches(p, f, "inStock")).length}
                  </span>
                </ToggleButton>
              </ToggleButtonGroup.Root>

              {open && (
                <Button
                  onPress={() => setOpen(false)}
                  className="lg:hidden mt-5 w-full rounded-full bg-accent-500 text-ink-950 font-display font-bold min-h-[52px]"
                >
                  Vis {shown.length} {shown.length === 1 ? "vare" : "varer"}
                </Button>
              )}
            </div>
          </div>

          <div>
            {/* Valgte filtre står, hvor man kigger, og kan fjernes enkeltvis. */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <p className="select-none text-ink-700 mr-1">
                <span className="tabular-nums font-semibold text-ink-950">{shown.length}</span>{" "}
                {shown.length === 1 ? "vare" : "varer"}
              </p>

              {chips.map((c) => (
                <Button
                  key={`${c.k}-${c.v}`}
                  onPress={() => drop(c)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 text-cream text-sm font-semibold pl-3 pr-2 h-9 hover:bg-ink-800"
                  aria-label={`Fjern filteret ${c.type ? `${c.type}: ` : ""}${c.label}`}
                >
                  {/* Filtertypen står med, fordi "Trinol", "under 200 kr." og
                      "Mus" ellers ligner tre chips af samme slags. */}
                  {c.type && (
                    <span className="font-normal text-ink-300">{c.type}:</span>
                  )}
                  {c.label}
                  <X size={14} strokeWidth={3} aria-hidden="true" />
                </Button>
              ))}

              {chips.length > 0 && (
                <Button
                  onPress={clearAll}
                  className="bg-transparent text-sm font-semibold text-ink-700 hover:text-ink-950 underline underline-offset-4 h-9 px-1"
                >
                  Ryd alle
                </Button>
              )}

              {/* Den valgte sortering skal kunne læses uden at åbne feltet,
                  og feltet skal sige hvad det sorterer, ikke bare "Sortér". */}
              <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-2">
                <span className="select-none text-sm text-ink-600 whitespace-nowrap">
                  Sortér efter
                </span>
                <div className="flex-1 sm:w-[210px]">
                  <Select
                    ariaLabel="Sortér varerne"
                    value={sort}
                    onValueChange={(v) => setSort(v as Sort)}
                    options={[
                      { value: "relevans", label: "På lager først" },
                      { value: "billigst", label: "Billigst først" },
                      { value: "dyrest", label: "Dyrest først" },
                      { value: "enhed", label: "Billigst pr. enhed" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/*
              Når søgningen har tolket noget, siges det højt. En liste over
              billeprodukter, fordi nogen skrev "huller i træet", er kun
              hjælpsom, hvis man kan se hvorfor.
            */}
            {found?.why && (
              <div className="reveal mb-4">
                <div>
                  <p className="reveal-in rounded-xl bg-ink-100 px-4 py-3 text-[15px] text-ink-800 m-0">
                    {found.why}
                  </p>
                </div>
              </div>
            )}

            {/* Baymard: 66 % af butikker kan ikke finde deres egne
                infosider. Fragt og returret er søgninger, folk laver. */}
            {found?.info?.map((i) => (
              <a
                key={i.title}
                href={i.href}
                className="mb-4 block rounded-xl border-2 border-ink-200 px-4 py-3 hover:border-ink-400 transition-colors"
              >
                <p className="font-display font-bold text-ink-950 m-0">{i.title}</p>
                <p className="mt-0.5 text-[15px] text-ink-700 m-0">{i.text}</p>
              </a>
            ))}

            {shown.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-ink-300 p-8 text-center">
                <p className="text-ink-800 font-semibold">
                  {term.trim() ? `Ingen varer matcher "${term}".` : "Ingen varer med de filtre."}
                </p>
                <p className="mt-1 text-ink-700">
                  {term.trim()
                    ? "Prøv et andet ord, eller beskriv hvad du har set: huller i træet, gnavelyde, bid om natten."
                    : "Prøv at fjerne et af dem herover."}
                </p>
                <Button
                  onPress={clearAll}
                  className="mt-4 rounded-full bg-ink-950 text-cream font-display font-bold min-h-[44px] px-5"
                >
                  Ryd alle filtre
                </Button>
              </div>
            ) : (
              <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 list-none p-0 m-0">
                {shown.map((p, i) => (
                  <li key={p.slug}>
                    <ProductCard p={p} priority={i < 4} />
                  </li>
                ))}
              </ul>
            )}

            {shown.length > 0 && (
              <p className="select-none mt-6 text-sm text-ink-600">
                Priser er inkl. moms. Billigste vare her:{" "}
                {(() => {
                  const cheapest = shown.filter(hasPrice).sort((a, b) => a.price - b.price)[0];
                  return cheapest ? dkr(cheapest.price) : "pris på forespørgsel";
                })()}
              </p>
            )}
          </div>
        </div>
      </main>

      <ShopFooter />
    </>
  );
}
