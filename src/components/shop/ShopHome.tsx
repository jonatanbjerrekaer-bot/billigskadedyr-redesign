import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  PRODUCTS, BY_SLUG, dkr, isDeal,
} from "../../lib/shop";
import { BESTSELLERS, DEALS_NOTE, SEASON } from "../../lib/shopContent";
import { ShopFooter, ShopHeader } from "./ShopChrome";
import Carousel, { CarouselItem } from "./Carousel";
import ProductCard from "./ProductCard";
import ProPanel from "./ProPanel";
import TrustRow from "./TrustRow";
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
            <div className="flex flex-col justify-center gap-5 bg-ink-50 px-5 py-10 sm:px-8 sm:py-12 lg:py-14 lg:pr-10 lg:pl-[max(2rem,calc((100vw-1400px)/2+1.5rem))]">
              <span className="select-none w-max rounded-full bg-accent-500 px-3.5 py-1 text-[13px] font-semibold text-ink-950">
                Samme priser som fagfolk betaler
              </span>

              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight uppercase text-balance text-ink-950">
                Midlerne vi selv bruger
              </h1>

              <p className="select-none max-w-[42ch] text-lg text-pretty text-ink-700 leading-relaxed m-0">
                Vi rykker ud til skadedyr hver dag. Det, vi har med i bilen, kan du
                købe her.
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

            <div className="relative min-h-[300px] sm:min-h-[380px] bg-ink-100">
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
                  className="press group absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[20rem] flex items-center gap-3 rounded-2xl bg-white/95 p-3 backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
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
