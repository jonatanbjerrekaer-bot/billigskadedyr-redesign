import { useState } from "react";
import { Menu, Phone, Search, ShoppingCart } from "lucide-react";
import { PEST_COUNTS, PEST_LABEL, type PestKey } from "../../lib/shop";
import { useCartCount } from "../../lib/cart";

const BASE = import.meta.env.BASE_URL;
const TEL = "tel:+4524245583";

/**
 * Butikkens ramme.
 *
 * Den nuværende butik har 72 kategorier i én flad liste, hvor mærke,
 * skadedyr og virkemåde ligger side om side. Her er der ét spørgsmål i
 * menuen, "hvilket dyr", fordi det er det eneste, kunden ved med sikkerhed,
 * når han lander. Mærke og virkemåde er filtre inde i browseren, hvor de
 * hører hjemme, ikke navigation.
 */

/** De skadedyr, der har nok varer til at fortjene en plads i menuen. */
const MENU_PESTS: PestKey[] = [
  "mus", "rotter", "myrer", "fluer", "hvepse", "moel",
  "edderkopper", "vaeggelus", "muldvarpe", "snegle",
];

export function ShopHeader() {
  const [open, setOpen] = useState(false);
  const count = useCartCount();

  return (
    <header className="sticky top-0 z-40 bg-ink-950 text-cream border-b border-ink-800">
      {/* Fri fragt-linjen står øverst, fordi fragt er den hyppigste grund til
          at folk forlader en kurv, og den bør besvares før den bliver stillet. */}
      <p className="select-none bg-accent-500 text-ink-950 text-center text-[13px] sm:text-sm font-semibold py-1.5 px-4">
        Fri fragt over 499 kr. · Afsendes samme hverdag, hvis du bestiller inden kl. 14
      </p>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center gap-3 sm:gap-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden -ml-1 p-2 rounded-lg hover:bg-ink-900"
          aria-expanded={open}
          aria-label={open ? "Luk menu" : "Åbn menu"}
        >
          {open ? <Menu size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </button>

        <a href={`${BASE}shop/`} className="font-display font-bold text-lg sm:text-xl tracking-tight shrink-0">
          Billig<span className="text-accent-500">skadedyr</span>.dk
        </a>

        <form
          className="hidden md:flex flex-1 max-w-xl items-center gap-2 bg-ink-900 border border-ink-800 rounded-full px-4 h-11 focus-within:border-accent-500"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <Search size={18} strokeWidth={2.5} aria-hidden="true" className="text-ink-100/60 shrink-0" />
          <input
            type="search"
            placeholder="Søg efter mus, hvepse, myregift…"
            className="bg-transparent outline-none text-sm w-full placeholder:text-ink-100/50"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <a
            href={TEL}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-3 h-11 rounded-full hover:bg-ink-900"
          >
            <Phone size={17} strokeWidth={2.5} aria-hidden="true" className="text-accent-500" />
            24 24 55 83
          </a>
          <button
            type="button"
            className="relative inline-flex items-center gap-2 px-3 sm:px-4 h-11 rounded-full bg-ink-900 hover:bg-ink-800 font-semibold text-sm"
          >
            <ShoppingCart size={18} strokeWidth={2.5} aria-hidden="true" />
            <span className="hidden sm:inline">Kurv</span>
            {count > 0 && (
              <span className="min-w-[22px] h-[22px] px-1 grid place-items-center rounded-full bg-accent-500 text-ink-950 text-xs font-bold tabular-nums">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Skadedyrene som en linje, ikke som en rullemenu med 72 punkter. */}
      <nav
        className={`${open ? "block" : "hidden"} lg:block border-t border-ink-800 bg-ink-950`}
        aria-label="Skadedyr"
      >
        <ul className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center gap-0 lg:gap-1 py-2 lg:py-0 list-none m-0 overflow-x-auto">
          {MENU_PESTS.map((p) => (
            <li key={p}>
              <a
                href={`${BASE}shop/produkter/?dyr=${p}`}
                className="block whitespace-nowrap px-3 py-3 lg:py-3.5 text-sm font-semibold text-ink-100/85 hover:text-cream hover:bg-ink-900 rounded-lg"
              >
                {PEST_LABEL[p]}
                <span className="ml-1.5 text-xs text-ink-100/45 tabular-nums">{PEST_COUNTS[p]}</span>
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
