import { ArrowRight } from "lucide-react";
import {
  PRODUCTS, BY_SLUG, dkr, isDeal,
  type Product,
} from "../../lib/shop";
import { BESTSELLERS, DEALS_NOTE, SEASON } from "../../lib/shopContent";
import { ShopFooter, ShopHeader } from "./ShopChrome";
import Carousel, { CarouselItem } from "./Carousel";
import ProductCard from "./ProductCard";
import ProPanel from "./ProPanel";
import TrustRow from "./TrustRow";
import Reviews from "../Reviews";

const BASE = import.meta.env.BASE_URL;

/**
 * De tre varer, forsiden aabner med. Mus, hvepse og myrer er de tre
 * skadedyr, han har flest varer til, og alle tre har et brugbart
 * produktfoto og en pris, man kan sige hoejt.
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
 * En vare i heroet. Billede paa hvid, navn, pris.
 *
 * Bevidst ikke ProductCard: kortet i listen baerer skadedyr, form, forbehold
 * og lagerstatus, og fem informationslag i et hero er stoej.
 *
 * 4:3 og ikke kvadrat. Tre kvadrater i en raekke goer heroet 100 px
 * hoejere, og saa ligger knappen under folden paa en 1280x720-skaerm.
 */
function HeroPick({ p }: { p: Product }) {
  return (
    <a
      href={`${BASE}shop/produkt/${p.slug}/`}
      className="press group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white text-ink-950 hover:border-ink-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    >
      <div className="relative aspect-[4/3] bg-white">
        <img
          src={`${BASE}shop/${p.img}`}
          alt={p.name}
          width={480}
          height={360}
          loading="eager"
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-0.5 border-t border-ink-200 px-3.5 py-3">
        <p className="font-display font-bold text-sm leading-snug">{p.name}</p>
        <p className="font-display font-bold text-base tabular-nums">{dkr(p.price)}</p>
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
        <section className="border-b border-ink-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-9 pb-11 sm:pt-12 sm:pb-14">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:items-center">
              <div>
                <h1 className="font-display text-[34px] sm:text-[46px] font-bold tracking-tight uppercase leading-[1.03] text-ink-950">
                  Midlerne vi
                  <br />
                  selv bruger
                </h1>
                <p className="select-none mt-4 max-w-[36ch] text-base sm:text-lg text-ink-700 leading-relaxed">
                  Vi rykker ud til skadedyr hver dag. Det, vi har med i bilen, kan du
                  købe her til samme pris som fagfolk.
                </p>

                {/* Én knap. Vejen ind efter dyr staar i baandet lige over,
                    og en knap, der siger det samme igen, deler bare trykket. */}
                <a
                  href={`${BASE}shop/produkter/`}
                  className="press mt-6 inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-500 text-ink-950 font-display font-bold text-lg h-14 px-8 hover:bg-accent-400 transition-colors"
                >
                  Se alle varer
                  <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>

              {/*
                Varerne er hans egne fotos fra public/shop, paa hvide flader,
                fordi produktfotos er skudt paa hvid baggrund, og fordi det
                giver heroet den dybde, en flad moerk farve ikke har.
              */}
              {heroPicks.length === 3 && (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 list-none p-0 m-0">
                  {heroPicks.map((p, i) => (
                    <li key={p.slug} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>
                      <HeroPick p={p} />
                    </li>
                  ))}
                </ul>
              )}
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
          <section aria-labelledby="tilbud" className="py-12 sm:py-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
              <h2 id="tilbud" className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink-950">
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
              <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight uppercase text-ink-950">
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
