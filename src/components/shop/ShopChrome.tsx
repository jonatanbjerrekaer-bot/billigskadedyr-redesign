import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { MapPin, Menu, Phone, ShoppingCart, Truck, Undo2, X } from "lucide-react";
import SearchBox from "./SearchBox";
import TrustSeal from "../TrustSeal";
import { PEST_COUNTS, PEST_LABEL, type PestKey } from "../../lib/shop";
import { useCartCount } from "../../lib/cart";
import ShopGlyph from "./ShopGlyph";

const BASE = import.meta.env.BASE_URL;

/** De tre loefter, der staar oeverst paa hver side. Tallene er de rigtige. */
const USP = [
  { Icon: Truck, stat: "Fragt fra 59 kr.", sub: "Afsendt samme hverdag inden kl. 14" },
  { Icon: Undo2, stat: "14 dages returret", sub: "På uåbnede varer" },
  { Icon: MapPin, stat: "Gratis afhentning", sub: "Hos os i Risskov" },
];

/**
 * Hvilket skadedyr står vi på?
 *
 * Baymard: 95 % af butikker markerer ikke den valgte kategori i
 * navigationen, og så mister man fornemmelsen af, hvor i katalogget man er.
 * Det læses efter montering, fordi siden er prærenderet uden parametre.
 */
function usePest(): string {
  const [p, setP] = useState("");
  useEffect(() => {
    setP(new URLSearchParams(location.search).get("dyr") ?? "");
  }, []);
  return p;
}

const TEL = "tel:+4524245583";

/**
 * Butikkens ramme, bygget på de samme komponenter som servicesitet.
 *
 * Søgefeltet er HeroUI's TextField og Input i stedet for en <input> i en
 * div med sin egen ramme. Den gamle udgave tegnede to rammer, når feltet
 * fik fokus: min egen focus-within på wrapperen og browserens fokusring på
 * selve feltet. Feltet har nu én ramme, og det er feltets egen.
 *
 * Menuen viser samme skadedyrsikoner som servicesitet. På den her side er
 * de ikke pynt: de er den hurtigste måde at finde "mus" i en række på ti,
 * når man kigger efter et dyr og ikke efter et ord.
 */

const MENU_PESTS: PestKey[] = [
  "mus", "rotter", "myrer", "fluer", "hvepse", "moel",
  "edderkopper", "vaeggelus", "muldvarpe", "snegle",
];

export function ShopHeader() {
  const el = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [skjulUsp, setSkjulUsp] = useState(false);
  const here = usePest();
  const count = useCartCount();

  /*
   * Bjaelken klaeber til toppen, saa et #-hop lander bag den. Hoejden er
   * ikke fast: mobilen har sit eget soegebaand, og menuen kan foldes ud.
   * Vi maaler den og lader .anchor traekke fra i scroll-margin-top.
   */
  useEffect(() => {
    const h = el.current;
    if (!h) return;
    const set = () =>
      document.documentElement.style.setProperty("--hdr", `${h.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(h);
    return () => ro.disconnect();
  }, []);

  /*
   * Loeftebaandet vejer ~50 px af bjaelken hele vejen ned ad siden. De tre
   * vilkaar er noget, man laeser én gang, ikke noget man skal have foran
   * sig, mens man kigger paa varer. Det viger, naar man ruller ned, og
   * kommer igen, naar man ruller op eller er tilbage i toppen.
   *
   * Taersklen paa 6 px er der, fordi traekkeplader og momentum giver
   * smaa udsving i begge retninger; uden den blinker baandet.
   */
  useEffect(() => {
    let sidst = window.scrollY;
    let venter = false;
    const paaRul = () => {
      if (venter) return;
      venter = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80) setSkjulUsp(false);
        else if (y > sidst + 6) setSkjulUsp(true);
        else if (y < sidst - 6) setSkjulUsp(false);
        sidst = y;
        venter = false;
      });
    };
    window.addEventListener("scroll", paaRul, { passive: true });
    return () => window.removeEventListener("scroll", paaRul);
  }, []);

  return (
    <header ref={el} className="sticky top-0 z-40 bg-ink-950 text-cream border-b border-ink-800">
      {/* Tre loefter med ikon, tal og underlinje, som paa thenap.dk. De
          stod som én lang saetning, og saa laeses ingen af dem. Paa mobil
          falder underlinjen bort, men tallet bliver staaende: det er det,
          der siger hvad loeftet er. */}
      <div
        aria-hidden={skjulUsp || undefined}
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          skjulUsp ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
      <ul className="select-none max-w-[1240px] mx-auto grid grid-cols-3 divide-x divide-ink-800 border-b border-ink-800 list-none p-0 m-0">
        {USP.map(({ Icon, stat, sub }) => (
          <li key={stat} className="flex items-center justify-center gap-2.5 px-3 py-2.5">
            <Icon size={20} strokeWidth={2} aria-hidden="true" className="shrink-0 text-accent-500" />
            <span className="min-w-0">
              <span className="block text-[13px] sm:text-sm font-semibold text-cream leading-tight">
                {stat}
              </span>
              <span className="hidden sm:block text-[13px] text-ink-100/65 leading-tight">
                {sub}
              </span>
            </span>
          </li>
        ))}
      </ul>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center gap-3 sm:gap-6 min-w-0">
        <Button
          onPress={() => setOpen((v) => !v)}
          className="lg:hidden -ml-1 p-2 rounded-lg bg-transparent text-cream hover:bg-ink-900 data-[pressed]:bg-ink-800"
          aria-label={open ? "Luk menu" : "Åbn menu"}
        >
          {open ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </Button>

        <a href={`${BASE}shop/`} className="font-display font-bold text-lg sm:text-xl tracking-tight shrink-0">
          Billig<span className="text-accent-500">skadedyr</span>.dk
        </a>

        {/* Kun paa skrivebordet. Mobilen har sit eget baand nedenfor, og
            da begge stod fremme, blev feltet her klemt til en cirkel og
            skubbede kurven ud over kanten. */}
        <div className="hidden md:flex flex-1 min-w-0">
          <SearchBox />
        </div>

        <div className="ml-auto shrink-0 flex items-center gap-1 sm:gap-2">
          <a
            href={TEL}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-3 h-11 rounded-full hover:bg-ink-900"
          >
            <Phone size={17} strokeWidth={2.5} aria-hidden="true" className="text-accent-500" />
            24 24 55 83
          </a>
          <Button className="relative inline-flex items-center gap-2 px-3 sm:px-4 h-11 rounded-full bg-ink-900 text-cream hover:bg-ink-800 data-[pressed]:bg-ink-700 font-semibold text-sm">
            <ShoppingCart size={18} strokeWidth={2.5} aria-hidden="true" />
            <span className="hidden sm:inline">Kurv</span>
            {count > 0 && (
              <span className="min-w-[22px] h-[22px] px-1 grid place-items-center rounded-full bg-accent-500 text-ink-950 text-[13px] font-bold tabular-nums">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* På mobil er der ikke plads til feltet i logolinjen, og det må ikke
          bare forsvinde: søgning er vejen, folk tager, når kategorierne
          svigter. Det får sit eget bånd. */}
      <div className="md:hidden px-4 pb-3">
        <SearchBox mobile />
      </div>

      <nav
        className={`${open ? "block" : "hidden"} lg:block border-t border-ink-800 bg-ink-950`}
        aria-label="Skadedyr"
      >
        <ul className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center gap-0 lg:gap-0.5 py-2 lg:py-0 list-none m-0 overflow-x-auto">
          {MENU_PESTS.map((p) => (
            <li key={p}>
              <a
                href={`${BASE}shop/produkter/?dyr=${p}`}
                aria-current={here === p ? "page" : undefined}
                className={`group flex items-center gap-2 whitespace-nowrap px-2.5 py-2.5 lg:py-3 text-sm font-semibold rounded-lg ${
                  here === p
                    ? "bg-ink-900 text-cream"
                    : "text-ink-100/85 hover:text-cream hover:bg-ink-900"
                }`}
              >
                <ShopGlyph pest={p} size={22} className="text-accent-500 group-hover:text-accent-400" />
                {PEST_LABEL[p]}
                <span className="text-[13px] text-ink-100/45 tabular-nums">{PEST_COUNTS[p]}</span>
              </a>
            </li>
          ))}
          <li className="lg:ml-auto">
            <a
              href={`${BASE}shop/produkter/`}
              className="block whitespace-nowrap px-3 py-3 lg:py-3.5 text-sm font-semibold text-accent-400 hover:text-accent-300"
            >
              Se alle varer
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function ShopFooter() {
  return (
    <footer className="bg-ink-950 text-ink-100/70 border-t border-ink-800 mt-16">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <p className="select-none font-display font-bold text-cream mb-3">Billigskadedyr.dk</p>
          <p className="leading-relaxed">
            Professionelle midler og fælder til private og erhverv. Vi er de samme folk,
            der rykker ud, så vi sælger kun det, vi selv bruger.
          </p>
        </div>
        <div>
          <h3 className="select-none text-cream font-semibold mb-3">Handel</h3>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            <li><a href="#" className="hover:text-cream">Fragt og levering</a></li>
            <li><a href="#" className="hover:text-cream">Returret</a></li>
            <li><a href="#" className="hover:text-cream">Handelsbetingelser</a></li>
            <li><a href="#" className="hover:text-cream">Privatlivspolitik</a></li>
          </ul>
        </div>
        <div>
          <h3 className="select-none text-cream font-semibold mb-3">Skal vi klare det?</h3>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            <li><a href={BASE} className="hover:text-cream">Professionel bekæmpelse</a></li>
            <li><a href={`${BASE}service/hvepse/`} className="hover:text-cream">Hvepsebo</a></li>
            <li><a href={`${BASE}service/vaeggelus/`} className="hover:text-cream">Væggelus</a></li>
            <li><a href={`${BASE}#skriv`} className="hover:text-cream">Få et fast tilbud</a></li>
          </ul>
        </div>
        <div>
          <h3 className="select-none text-cream font-semibold mb-3">Kontakt</h3>
          <p className="leading-relaxed">
            Ring 24 24 55 83<br />
            Hverdage 8-16<br />
            Hele Jylland og Fyn
          </p>
        </div>
      </div>
      {/* Certificeringen stod foer som en enkelt linje i et trustkort. Et
          maerke, der ikke fortaeller hvad det daekker, er en paastand; her
          staar hvad det betyder, og seglet linker til det certifikat, hvor
          det hele kan kontrolleres. */}
      <div className="border-t border-ink-800">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-8 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
          <TrustSeal className="justify-self-start" />
          <div className="text-sm max-w-[65ch]">
            <h3 className="select-none text-cream font-semibold mb-2">Certificeret af e-mærket</h3>
            <p className="leading-relaxed">
              e-mærket er den danske certificering af netbutikker. For at bære mærket skal
              butikken leve op til et regelsæt om handelsbetingelser, priser, levering og
              behandling af persondata, og den bliver kontrolleret på det løbende.
            </p>
            <p className="leading-relaxed mt-3">
              Går noget galt med en ordre, kan du klage til e-mærket. Det koster dig ikke
              noget, og de mægler mellem dig og butikken. Det er den del, der er værd at
              kende: du står ikke alene med en mail, der ikke bliver besvaret.
            </p>
            <p className="leading-relaxed mt-3 text-ink-100/55">
              Certifikatet er offentligt. Scoren og antallet af bedømmelser ovenfor står på
              e-mærkets egen side, og du kan slå det op uden at tage vores ord for det.
            </p>
          </div>
        </div>
      </div>

      <p className="select-none text-center text-[13px] text-ink-100/45 pb-8 px-4">
        Bekæmpelsesmidler skal bruges forsvarligt. Læs altid etiket og produktoplysninger før brug.
      </p>
    </footer>
  );
}
