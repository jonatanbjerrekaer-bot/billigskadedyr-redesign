import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  PRODUCTS, BY_SLUG, dkr, hasPrice, hasRange, isDeal, PEST_LABEL, type Product,
} from "../../lib/shop";
import { BESTSELLERS, DEALS_NOTE, SEASON } from "../../lib/shopContent";
import { ShopFooter, ShopHeader } from "./ShopChrome";
import Carousel, { CarouselItem } from "./Carousel";
import ProductCard from "./ProductCard";
import Guides from "./Guides";
import { EM_COUNT, EM_SCORE } from "../TrustSeal";
import Reviews from "../Reviews";

const BASE = import.meta.env.BASE_URL;

/**
 * Billedbanken i heroet. Alle ligger i public/, er beskaaret til 4:3 og
 * vejer under 210 KB, saa de kan hentes uden at siden bliver tung.
 * Kilde: Unsplash, fri til kommerciel brug uden navngivning.
 *
 * Tilfoej et billede ved at laegge filen i public/ og skrive en linje her.
 */
const SHOTS = [
  { src: "shop-hero-skur.webp", alt: "Hvidt havehus med grønt vindue, haveredskaber og krukker" },
  { src: "shop-hero-roser.webp", alt: "Gule huse med stokroser og lavendel langs fortovet" },
  { src: "shop-hero-gulthus.webp", alt: "Gult hus med rødt tegltag bag et træ" },
  { src: "shop-hero-margeritter.webp", alt: "Gule margeritter foran hvide huse" },
  { src: "shop-hero-hus.webp", alt: "Rødt træhus mellem træer i efterårslys" },
];

const SKIFT_MS = 7000;

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

/** En vare som en raekke: billede, navn, pris. Til lister, ikke gitre. */
function ProductRow({ p }: { p: Product }) {
  return (
    <a
      href={`${BASE}shop/produkt/${p.slug}/`}
      className="group flex items-center gap-4 py-4 no-underline"
    >
      <img
        src={`${BASE}shop/${p.img}`}
        alt=""
        width={96}
        height={96}
        loading="lazy"
        className="h-20 w-20 shrink-0 rounded-xl border border-ink-200 bg-white object-contain p-2"
      />
      <span className="min-w-0 flex-1">
        <span className="select-none block text-[0.8125rem] text-ink-500">
          {PEST_LABEL[p.pest]} · {p.form}
        </span>
        <span className="block font-display font-semibold text-[1.0625rem] leading-snug text-ink-950 underline-offset-4 decoration-ink-300 group-hover:underline">
          {p.name}
        </span>
      </span>
      <span className="shrink-0 font-display text-lg font-bold tabular-nums text-ink-950">
        {hasPrice(p) ? (
          <>
            {hasRange(p) && <span className="select-none mr-1 text-sm font-sans font-semibold text-ink-600">Fra</span>}
            {dkr(p.price)}
          </>
        ) : (
          <span className="text-sm font-sans font-semibold text-ink-700">Pris på forespørgsel</span>
        )}
      </span>
    </a>
  );
}

function seasonNow(now = new Date()) {
  const m = now.getMonth() + 1;
  return SEASON.find((s) => s.months.includes(m)) ?? SEASON[0]!;
}

export default function ShopHome() {
  const season = seasonNow();
  const featured = pick(HERO_PICKS)[0];

  /*
   * Billedbanken skifter af sig selv. Der staar intet paa billederne, saa
   * ingen gaar glip af noget ved ikke at se dem alle; det er derfor den
   * her rotation er i orden, hvor en karrusel med varer ikke ville vaere.
   */
  const [shot, setShot] = useState(0);
  useEffect(() => {
    if (SHOTS.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setShot((n) => (n + 1) % SHOTS.length), SKIFT_MS);
    return () => clearInterval(id);
  }, []);
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
        {/* Ud til kanten uden ramme og skygge. Et foto, der stopper 24 px
            fra skaermkanten med en streg omkring, ligner et vindue ind til
            siden; det her ér siden. */}
        <section className="border-b border-ink-200">
          <div className="grid lg:grid-cols-2">
            <div className="hero-in flex flex-col justify-center gap-5 bg-ink-50 px-5 py-10 sm:px-8 sm:py-12 lg:py-14 lg:pr-10 lg:pl-[max(2rem,calc((100vw-77.5rem)/2+2rem))]">
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight uppercase text-balance text-ink-950">
                Midlerne vi selv bruger
              </h1>

              <p className="select-none max-w-[42ch] text-lg text-pretty text-ink-700 leading-relaxed m-0">
                Vi rykker ud til skadedyr hver dag. Det, vi har med i bilen, kan du
                købe her, til de priser fagfolk betaler.
              </p>

              <a
                href={`${BASE}shop/produkter/`}
                className="press w-max inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-500 text-ink-950 font-display font-bold text-lg h-14 px-8 transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-400"
              >
                Se alle varer
                <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
              </a>

              <p className="select-none flex items-center gap-2 text-sm text-ink-700 m-0">
                <ShieldCheck size={17} strokeWidth={2.25} aria-hidden="true" className="text-ink-600" />
                <span>
                  <span className="font-semibold text-ink-950">
                    e-mærket {EM_SCORE.toLocaleString("da-DK", { minimumFractionDigits: 1 })}
                  </span>{" "}
                  af 5 · {EM_COUNT} anmeldelser
                </span>
              </p>
            </div>

            <div className="hero-photo relative min-h-[18.75rem] sm:min-h-[23.75rem] bg-ink-100">
              {SHOTS.map((s, n) => (
                <img
                  key={s.src}
                  src={`${BASE}${s.src}`}
                  alt={n === shot ? s.alt : ""}
                  aria-hidden={n === shot ? undefined : true}
                  width={1200}
                  height={900}
                  loading={n === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    n === shot ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {featured && (
                <a
                  href={`${BASE}shop/produkt/${featured.slug}/`}
                  className="press group absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[20rem] flex items-center gap-3 rounded-2xl bg-white p-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
                >
                  <img
                    src={`${BASE}shop/${featured.img}`}
                    alt=""
                    width={64}
                    height={64}
                    loading="eager"
                    className="h-14 w-14 shrink-0 object-contain"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-ink-950 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                      {featured.name}
                    </span>
                    <span className="block font-display text-lg font-bold tabular-nums text-ink-950">
                      {dkr(featured.price)}
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="shrink-0 text-ink-600 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                  />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Seks varer i et gitter, alle synlige. Baymard: en statisk sektion
            saelger lige saa godt som en karrusel, og ingen skal rulle for at
            se den sjette. Tilbud laengere nede er karrusellen. */}
        <section aria-labelledby="saeson" className="pt-12 pb-20 sm:pt-16 sm:pb-24">
          <div className="max-w-[77.5rem] mx-auto px-5 sm:px-8">
            <div className="max-w-[62ch]">
              <h2 id="saeson" className="font-display text-2xl sm:text-[1.875rem] font-bold tracking-tight text-ink-950 m-0">
                {season.heading}
              </h2>
              <p className="select-none mt-2 mb-8 text-ink-700 leading-relaxed m-0">{season.note}</p>
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 list-none p-0 m-0">
              {seasonItems.map((p, i) => (
                <li key={p.slug} className="flex">
                  <ProductCard p={p} priority={i < 3} />
                </li>
              ))}
            </ul>
            <a
              href={`${BASE}shop/produkter/`}
              className="mt-8 inline-flex items-center gap-2 font-semibold text-ink-950 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-950"
            >
              Se alle varer
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Billeder og rigtig tekst mellem karrusellerne. Fire kortgitre i
            traek er den samme rytme fire gange. */}
        <Guides />

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
            <div className="max-w-[77.5rem] mx-auto px-5 sm:px-8">
              <h2 id="tilbud" className="font-display text-2xl sm:text-[1.875rem] font-bold tracking-tight text-ink-950">
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

        {/* Sidens ene moerke flade, og det er fagmanden. Fotoet gaar til
            kanten, teksten staar paa det, og knappen er den eneste lime
            uden for heroet og prisskiltene. */}
        <section className="relative isolate overflow-hidden bg-ink-950 text-cream">
          <img
            src={`${BASE}hero.webp`}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/25"
          />
          <div className="max-w-[77.5rem] mx-auto px-5 sm:px-8 py-20 sm:py-28 lg:py-32">
            <div className="max-w-[36rem]">
              <h2 className="font-display text-3xl sm:text-[2.5rem] font-bold tracking-tight uppercase text-balance leading-[1.05] m-0">
                Har du prøvet selv to gange?
              </h2>
              <p className="mt-5 text-lg text-ink-100/85 leading-relaxed text-pretty">
                Så er det sjældent produktet, der er galt. Det er som regel, at dyret
                sidder et andet sted, end der hvor du kan se det. Vi kommer forbi, kigger
                efter, og siger en fast pris, før vi går i gang.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={BASE}
                  className="press inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 text-ink-950 font-display font-bold min-h-[52px] px-7 text-lg hover:bg-accent-400 transition-colors"
                >
                  Se hvad vi laver
                  <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </a>
                <a
                  href={`${BASE}#skriv`}
                  className="press inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream/70 text-cream font-display font-bold min-h-[52px] px-7 text-lg hover:bg-cream hover:text-ink-950 transition-colors"
                >
                  Få et fast tilbud
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Raekker, ikke kort. Tredje kortgitter paa siden ville vaere den
            samme sektion en gang til. Ingen numre: listen er hans, men jeg
            ved ikke, om raekkefoelgen er salgstal. */}
        <section aria-labelledby="mest-solgte" className="pt-16 pb-24 sm:pt-20 sm:pb-28">
          <div className="max-w-[77.5rem] mx-auto px-5 sm:px-8">
            <h2 id="mest-solgte" className="font-display text-2xl sm:text-[1.875rem] font-bold tracking-tight text-ink-950 m-0">
              Mest solgte
            </h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-10 list-none p-0 m-0 border-t border-ink-200">
              {best.map((p) => (
                <li key={p.slug} className="border-b border-ink-200">
                  <ProductRow p={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Reviews />
      </main>

      <ShopFooter />
    </>
  );
}
