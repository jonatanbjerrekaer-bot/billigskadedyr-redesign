import { ArrowRight, Truck } from "lucide-react";
import {
  PEST_COUNTS, PEST_LABEL, PRODUCTS, BY_SLUG, dkr, isDeal,
  type PestKey, type Product,
} from "../../lib/shop";
import { BESTSELLERS, DEALS_NOTE, SEASON } from "../../lib/shopContent";
import { ShopFooter, ShopHeader } from "./ShopChrome";
import Carousel, { CarouselItem } from "./Carousel";
import ProductCard from "./ProductCard";
import ProPanel from "./ProPanel";
import ShopGlyph from "./ShopGlyph";
import TrustRow from "./TrustRow";
import Reviews from "../Reviews";

const BASE = import.meta.env.BASE_URL;

/** De skadedyr, folk faktisk lander med, i den rækkefølge en husejer tænker. */
const ENTRY: PestKey[] = [
  "mus", "rotter", "myrer", "hvepse", "fluer", "moel",
  "edderkopper", "vaeggelus", "muldvarpe", "snegle", "kakerlakker",
];

/**
 * De tre varer, forsiden åbner med. Mus, hvepse og myrer er de tre
 * skadedyr, han har flest varer til, og alle tre har et brugbart
 * produktfoto og en pris, man kan sige højt.
 */
const HERO_PICKS = [
  "victor-elektronisk-musefaelde",
  "pest-stop-hvepsespray",
  "ps-myre-gel-10g",
];

function pick(slugs: string[]) {
  return slugs.map((s) => BY_SLUG.get(s)).filter((p) => p != null);
}

function seasonNow(now = new Date()) {
  const m = now.getMonth() + 1;
  return SEASON.find((s) => s.months.includes(m)) ?? SEASON[0]!;
}

/**
 * En vare i heroet. Billede på hvid, navn, pris.
 *
 * Bevidst ikke ProductCard: kortet i listen bærer skadedyr, form, forbehold
 * og lagerstatus, og fem informationslag i et hero er støj. Her er det
 * billedet og prisen, resten står på produktsiden.
 */
function HeroPick({ p, big }: { p: Product; big?: boolean }) {
  return (
    <a
      href={`${BASE}shop/produkt/${p.slug}/`}
      className="press group flex h-full flex-col overflow-hidden rounded-2xl bg-cream text-ink-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    >
      <div className={`relative bg-white ${big ? "aspect-[16/9]" : "aspect-square"}`}>
        <img
          src={`${BASE}shop/${p.img}`}
          alt={p.name}
          width={big ? 960 : 480}
          height={big ? 540 : 480}
          loading="eager"
          className="absolute inset-0 w-full h-full object-contain p-4 sm:p-6 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-end justify-between gap-3 px-3.5 py-3 sm:px-4 sm:py-3.5">
        <p className={`font-display font-bold leading-snug ${big ? "text-base sm:text-lg" : "text-sm"}`}>
          {p.name}
        </p>
        <p className={`font-display font-bold tabular-nums whitespace-nowrap ${big ? "text-lg sm:text-xl" : "text-base"}`}>
          {dkr(p.price)}
        </p>
      </div>
    </a>
  );
}

export default function ShopHome() {
  const season = seasonNow();
  const heroPicks = pick(HERO_PICKS);
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
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16">
            <div className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center">
              <div>
                <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight uppercase leading-[1.05]">
                  Midlerne vi
                  <br />
                  selv bruger
                </h1>
                <p className="select-none mt-5 text-lg sm:text-xl text-ink-100/80 max-w-xl leading-relaxed">
                  Vi rykker ud til skadedyr hver dag. Det, vi har med i bilen, kan du
                  købe her til samme pris som fagfolk.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`${BASE}shop/produkter/`}
                    className="press inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-500 text-ink-950 font-display font-bold text-lg h-14 px-8 hover:bg-accent-400 transition-colors"
                  >
                    Se alle varer
                    <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
                  </a>
                  <a
                    href="#skadedyr"
                    className="press inline-flex items-center justify-center rounded-full border-2 border-ink-100/25 text-cream font-display font-bold text-lg h-14 px-8 hover:border-accent-500 hover:text-accent-500 transition-colors"
                  >
                    Find dit skadedyr
                  </a>
                </div>
              </div>

              {/*
                Varerne er hans egne fotos fra public/shop. De ligger på hvide
                flader, fordi produktfotos er skudt på hvid baggrund, og fordi
                det giver heroet den dybde, en flad mørk farve ikke har.
                Den første er stor, de to andre er små: lige store felter er
                det mønster, man genkender som skabelon.
              */}
              {heroPicks.length === 3 && (
                <ul className="grid grid-cols-2 gap-3 sm:gap-4 list-none p-0 m-0">
                  <li className="col-span-2">
                    <HeroPick p={heroPicks[0]!} big />
                  </li>
                  {heroPicks.slice(1).map((p) => (
                    <li key={p.slug}>
                      <HeroPick p={p} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Løfterne stod inde i heroet og gjorde det til en stak. De hører
            hjemme lige under, hvor de kan læses som det, de er: vilkårene. */}
        <section className="bg-ink-900 border-y border-ink-800 text-cream">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
            <p className="select-none flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-100/75">
              <Truck size={17} strokeWidth={2.25} aria-hidden="true" className="text-accent-500" />
              <span>Fragt fra 59 kr.</span>
              <span aria-hidden="true" className="text-ink-100/30">·</span>
              <span>afsendt samme hverdag inden kl. 14</span>
              <span aria-hidden="true" className="text-ink-100/30">·</span>
              <span>14 dages returret</span>
              <span aria-hidden="true" className="text-ink-100/30">·</span>
              <span>samme midler som fagfolk bruger</span>
            </p>
          </div>
        </section>

        <section id="skadedyr" className="bg-ink-950 text-cream scroll-mt-4">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-1.5">
              Hvad har du?
            </h2>
            <p className="select-none text-ink-100/70 mb-5">
              Vælg dyret, så viser vi kun det, der virker mod det.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 list-none p-0 m-0">
              {ENTRY.map((p) => (
                <li key={p}>
                  <a
                    href={`${BASE}shop/produkter/?dyr=${p}`}
                    className="press flex items-center gap-2.5 rounded-xl bg-ink-900 border border-ink-800 px-4 min-h-[56px] font-display font-bold hover:border-accent-500 hover:bg-ink-800 transition-colors"
                  >
                    <ShopGlyph
                      pest={p}
                      size={22}
                      className="shrink-0 text-accent-500"
                    />
                    <span className="truncate">{PEST_LABEL[p]}</span>
                    <span className="select-none ml-auto text-xs font-sans font-normal text-ink-100/50 tabular-nums">
                      {PEST_COUNTS[p] ?? 0}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

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

        {/* Mørk flade. Tre ens karruseller i træk er den samme sektion tre
            gange; lys, mørk, lys giver siden en rytme uden at introducere
            en eneste ny farve. */}
        <div className="bg-ink-950 text-cream mt-4">
          <Carousel
            id="mest-solgte"
            heading="Mest solgte"
            href={`${BASE}shop/produkter/`}
            count={best.length}
            onDark
          >
            {best.map((p) => (
              <CarouselItem key={p.slug}>
                <ProductCard p={p} />
              </CarouselItem>
            ))}
          </Carousel>
        </div>

        {/* Den brede overgang til servicesiden, for dem der er nået hertil
            uden at lægge noget i kurven. */}
        <section className="bg-ink-100 border-y border-ink-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-[minmax(0,18rem)_1fr_minmax(0,20rem)] gap-8 items-center">
            <figure className="hidden lg:block m-0">
              <img
                src={`${BASE}hero.webp`}
                alt="Skadedyrsbekæmper på arbejde"
                width={720}
                height={540}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover rounded-2xl"
              />
            </figure>
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
        <section className="bg-cream">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-14">
            <TrustRow id="fragt" />
            <Reviews />
          </div>
        </section>
      </main>

      <ShopFooter />
    </>
  );
}
