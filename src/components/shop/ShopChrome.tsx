import { useEffect, useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import { Menu, Phone, Search, ShoppingCart, X } from "lucide-react";
import { PEST_COUNTS, PEST_LABEL, type PestKey } from "../../lib/shop";
import { useCartCount } from "../../lib/cart";
import ShopGlyph from "./ShopGlyph";

const BASE = import.meta.env.BASE_URL;

/** Står søgningen i adressen, skal den også stå i feltet. */
function initialQuery(): string {
  if (typeof location === "undefined") return "";
  return new URLSearchParams(location.search).get("q") ?? "";
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

// Samme felt-stil som kontaktformularen på servicesitet.
const FIELD =
  "w-full rounded-full border border-ink-700 bg-ink-900 pl-11 pr-4 h-11 text-sm text-cream placeholder:text-ink-100/45 outline-none transition-colors focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/40";

export function ShopHeader() {
  /*
   * Søgeordet er state, ikke defaultValue. Siden er prærenderet uden ?q, så
   * hydreringen ville ellers beholde den tomme værdi fra HTML'en, og feltet
   * stod tomt lige efter, man havde søgt. Det så ud, som om intet skete.
   */
  const [q, setQ] = useState("");
  useEffect(() => setQ(initialQuery()), []);
  const [open, setOpen] = useState(false);
  const count = useCartCount();

  return (
    <header className="sticky top-0 z-40 bg-ink-950 text-cream border-b border-ink-800">
      <p className="select-none bg-accent-500 text-ink-950 text-center text-[13px] sm:text-sm font-semibold py-1.5 px-4">
        Fragt fra 59 kr. · Afsendes samme hverdag, hvis du bestiller inden kl. 14
      </p>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center gap-3 sm:gap-6">
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

        {/*
          En rigtig formular. Feltet var før uden value og uden handler, så
          man kunne skrive og trykke retur uden at der skete noget.
          Søgeknappen er synlig, fordi Baymard finder, at mobilbrugere ikke
          nødvendigvis bruger tastaturets returtast til at søge.
        */}
        <form
          action={`${BASE}shop/produkter/`}
          method="get"
          role="search"
          className="hidden md:flex flex-1 max-w-xl items-center gap-2"
        >
          <TextField.Root className="flex-1">
            <Label htmlFor="shop-search" className="sr-only">
              Søg i butikken
            </Label>
            <div className="relative">
              <Search
                size={18}
                strokeWidth={2.5}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-100/55"
              />
              <Input
                id="shop-search"
                name="q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Søg efter mus, huller i træet, myregift…"
                className={FIELD}
              />
            </div>
          </TextField.Root>
          <button
            type="submit"
            className="press shrink-0 h-11 px-4 rounded-full bg-accent-500 text-ink-950 font-semibold text-sm hover:bg-accent-400"
          >
            Søg
          </button>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
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
              <span className="min-w-[22px] h-[22px] px-1 grid place-items-center rounded-full bg-accent-500 text-ink-950 text-xs font-bold tabular-nums">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>

      <nav
        className={`${open ? "block" : "hidden"} lg:block border-t border-ink-800 bg-ink-950`}
        aria-label="Skadedyr"
      >
        <ul className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center gap-0 lg:gap-0.5 py-2 lg:py-0 list-none m-0 overflow-x-auto">
          {MENU_PESTS.map((p) => (
            <li key={p}>
              <a
                href={`${BASE}shop/produkter/?dyr=${p}`}
                className="group flex items-center gap-2 whitespace-nowrap px-2.5 py-2.5 lg:py-3 text-sm font-semibold text-ink-100/85 hover:text-cream hover:bg-ink-900 rounded-lg"
              >
                <ShopGlyph pest={p} size={22} className="text-accent-500 group-hover:text-accent-400" />
                {PEST_LABEL[p]}
                <span className="text-xs text-ink-100/45 tabular-nums">{PEST_COUNTS[p]}</span>
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
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
      <p className="select-none text-center text-xs text-ink-100/45 pb-8 px-4">
        Bekæmpelsesmidler skal bruges forsvarligt. Læs altid etiket og produktoplysninger før brug.
      </p>
    </footer>
  );
}
