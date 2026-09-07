import { ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";
import { PEST_COUNTS, PEST_LABEL, PRODUCTS, BY_SLUG, isDeal, type PestKey } from "../../lib/shop";
import { BESTSELLERS, DEALS_NOTE, SEASON } from "../../lib/shopContent";
import { ShopFooter, ShopHeader } from "./ShopChrome";
import Carousel, { CarouselItem } from "./Carousel";
import ProductCard from "./ProductCard";
import ProPanel from "./ProPanel";

const BASE = import.meta.env.BASE_URL;

/** De skadedyr, folk faktisk lander med, i den rækkefølge en husejer tænker. */
const ENTRY: PestKey[] = [
  "mus", "rotter", "myrer", "hvepse", "fluer", "moel",
  "edderkopper", "vaeggelus", "muldvarpe", "snegle", "kakerlakker",
];

function pick(slugs: string[]) {
  return slugs.map((s) => BY_SLUG.get(s)).filter((p) => p != null);
}

function seasonNow(now = new Date()) {
  const m = now.getMonth() + 1;
  return SEASON.find((s) => s.months.includes(m)) ?? SEASON[0]!;
}

export default function ShopHome() {
  const season = seasonNow();
  const seasonItems = pick(season.slugs);
  const best = pick(BESTSELLERS);
  const deals = PRODUCTS.filter(isDeal);

  return (
    <>
      <ShopHeader />

      <main>
        {/*
          Forsiden stiller ét spørgsmål: hvad har du?
          Den nuværende butik åbner med en kategorimenu på 72 punkter, hvor
          man skal kende ordet "klannere" for at finde noget. Her er indgangen
          dyret, og filtrene ligger inde i browseren.
        */}
        <section className="bg-ink-950 text-cream">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight uppercase max-w-3xl">
              Midlerne vi selv bruger, til dig der vil gøre det selv
            </h1>
            <p className="select-none mt-4 text-lg text-ink-100/80 max-w-2xl leading-relaxed">
              Vi rykker ud til skadedyr til daglig. Det, vi har i bilen, kan du købe her.
              Og siger vi, at en opgave ikke er til at klare selv, er det ikke for at sælge
              dig noget dyrere.
            </p>

            <p className="select-none mt-8 mb-3 text-sm font-semibold uppercase tracking-widest text-accent-500">
              Hvad har du?
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 list-none p-0 m-0">
              {ENTRY.map((p) => (
                <li key={p}>
                  <a
                    href={`${BASE}shop/produkter/?dyr=${p}`}
                    className="press flex items-center justify-between gap-2 rounded-xl bg-ink-900 border border-ink-800 px-4 min-h-[56px] font-display font-bold hover:border-accent-500 hover:bg-ink-800 transition-colors"
                  >
                    {PEST_LABEL[p]}
                    <span className="select-none text-xs font-sans font-normal text-ink-100/50 tabular-nums">
                      {PEST_COUNTS[p] ?? 0}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="select-none mt-8 grid sm:grid-cols-3 gap-4 text-sm">
              {[
                [Truck, "Fri fragt over 499 kr.", "Afsendes samme hverdag inden kl. 14"],
                [ShieldCheck, "Godkendte midler", "Samme produkter som fagfolk bruger"],
                [Package, "14 dages returret", "Uåbnede varer tages retur"],
              ].map(([Icon, t, s]) => {
                const I = Icon as typeof Truck;
                return (
                  <p key={t as string} className="flex items-start gap-3">
                    <I size={20} strokeWidth={2.25} aria-hidden="true" className="text-accent-500 shrink-0 mt-0.5" />
                    <span>
                      <span className="block font-semibold text-cream">{t as string}</span>
                      <span className="text-ink-100/65">{s as string}</span>
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        <Carousel
          id="saeson"
          heading={season.heading}
          note={season.note}
          href={`${BASE}shop/produkter/`}
          hrefLabel="Se alle varer"
          count={seasonItems.length}
        >
          {seasonItems.map((p, i) => (
            <CarouselItem key={p.slug}>
              <ProductCard p={p} priority={i < 3} />
            </CarouselItem>
          ))}
        </Carousel>

        {/* Det store nudge midt på siden, ikke gemt nederst. Rotter er det
            tydeligste tilfælde: det er ikke et spørgsmål om at være dygtig nok. */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
          <ProPanel pest="rotter" />
        </section>

        {deals.length > 0 ? (
          <Carousel id="tilbud" heading="Tilbud" href={`${BASE}shop/produkter/`} count={deals.length}>
            {deals.map((p) => (
              <CarouselItem key={p.slug}>
                <ProductCard p={p} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <section aria-labelledby="tilbud" className="py-8 sm:py-12">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
              <h2 id="tilbud" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-950">
                Tilbud
              </h2>
              <p className="select-none mt-2 text-ink-700 max-w-2xl">{DEALS_NOTE}</p>
              <a
                href={`${BASE}shop/produkter/`}
                className="mt-4 inline-flex items-center gap-2 font-semibold text-ink-950 underline underline-offset-4"
              >
                Se alle varer
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </section>
        )}

        <Carousel
          id="mest-solgte"
          heading="Mest solgte"
          href={`${BASE}shop/produkter/`}
          count={best.length}
        >
          {best.map((p) => (
            <CarouselItem key={p.slug}>
              <ProductCard p={p} />
            </CarouselItem>
          ))}
        </Carousel>

        {/* Den brede overgang til servicesiden, for dem der er nået hertil
            uden at lægge noget i kurven. */}
        <section className="bg-ink-100 border-y border-ink-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-[1fr_minmax(0,22rem)] gap-8 items-center">
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight uppercase text-ink-950">
                Har du prøvet selv to gange?
              </h2>
              <p className="mt-4 text-ink-800 leading-relaxed max-w-2xl text-lg">
                Så er det sjældent produktet, der er galt. Det er som regel, at dyret
                sidder et andet sted, end der hvor du kan se det. Vi kommer forbi, kigger
                efter, og siger en fast pris, før vi går i gang.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={BASE}
                className="press inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 text-ink-950 font-display font-bold min-h-[52px] px-7 text-lg hover:bg-accent-400 transition-colors"
              >
                Se hvad vi laver
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </a>
              <a
                href={`${BASE}#skriv`}
                className="press inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-950 text-ink-950 font-display font-bold min-h-[52px] px-7 text-lg hover:bg-ink-950 hover:text-cream transition-colors"
              >
                Få et fast tilbud
              </a>
            </div>
          </div>
        </section>
      </main>

      <ShopFooter />
    </>
  );
}
