import { useEffect, useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { dkr, PEST_LABEL, type PestKey } from "../../lib/shop";
import { suggest } from "../../lib/search";
import { useLocationKey } from "../../lib/shopRouter";

const BASE = import.meta.env.BASE_URL;

/**
 * Søgefeltet med forslag.
 *
 * Feltet var først en attrap, så blev det en formular, og nu viser det, hvad
 * det finder, mens man skriver. Baymard: forslag skal komme, før man er
 * færdig med at skrive, og de skal vise varer, ikke bare ord, for et navn
 * uden pris og billede fortæller ikke, om det er den rigtige vare.
 *
 * Tre slags forslag, i den rækkefølge:
 *
 *   skadedyr   "Alt mod mus (32)". Den brede indgang først, fordi den, der
 *              skriver "mus", som regel vil se alt mod mus.
 *   varer      med billede, navn og pris. Seks ad gangen. Flere bliver til
 *              en liste, man skal læse, og så kan man lige så godt søge.
 *   sider      fragt og returret. Baymard: 66 % af butikker kan ikke finde
 *              deres egne infosider.
 *
 * Feltet er bygget som en combobox efter ARIA-mønsteret: piletaster flytter
 * markeringen, retur åbner den markerede, escape lukker listen og beholder
 * teksten. Uden det er forslag en museting, og halvdelen af dem, der søger,
 * bruger tastaturet.
 *
 * Der er ingen forsinkelse på opslaget. 122 varer gennemsøges hurtigere end
 * en debounce ville vente.
 */
export default function SearchBox({ mobile }: { mobile?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const felt = useRef<HTMLInputElement>(null);
  const listId = useId();
  const stedet = useLocationKey();

  // Står søgningen i adressen, skal den også stå i feltet. Siden er
  // prærenderet uden ?q, så det kan først læses efter montering.
  //
  // Feltet skrives også direkte. Browseren gendanner selv formularfelter,
  // når man bladrer i historikken, og den gør det efter React har tegnet
  // feltet tomt. React sammenligner kun med sin egen sidste værdi, som
  // stadig er "", så den opdager aldrig, at der står noget i DOM'en. Uden
  // den her linje blev en søgning hængende i feltet, når man klikkede en
  // vare i forslagene. autoComplete="off" hjælper ikke: den slår browserens
  // eget autofyld fra, ikke gendannelsen af historikken.
  // Butikken skifter side uden at hente en ny, så det her felt bliver stående
  // monteret. Uden en afhængighed af adressen blev søgningen liggende i
  // feltet, når man klikkede en vare i forslagene: adressen skiftede, men
  // komponentens state gjorde ikke. useLocationKey skifter ved hver
  // navigation, også frem og tilbage i historikken.
  //
  // Feltet skrives også direkte i DOM'en. Browseren gendanner selv
  // formularfelter, og React sammenligner kun med sin egen sidste værdi, så
  // den opdager ikke, at der er kommet noget andet til at stå der.
  useEffect(() => {
    const fra = new URLSearchParams(location.search).get("q") ?? "";
    setQ(fra);
    if (felt.current) felt.current.value = fra;
    setOpen(false);
    setActive(-1);
  }, [stedet]);

  useEffect(() => {
    function away(e: MouseEvent) {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, []);

  const s = q.trim().length >= 2 ? suggest(q) : null;
  const rows: { href: string; label: string; sub?: string; img?: string }[] = s
    ? [
        ...s.pests.map((p: PestKey) => ({
          href: `${BASE}shop/produkter/?dyr=${p}`,
          label: `Alt mod ${PEST_LABEL[p].toLowerCase()}`,
          sub: `${s.pestCounts[p]} varer`,
        })),
        ...s.products.map((p) => ({
          href: `${BASE}shop/produkt/${p.slug}/`,
          label: p.name,
          sub: p.price > 0 ? dkr(p.price) : "Pris på forespørgsel",
          img: `${BASE}shop/${p.img}`,
        })),
        ...s.info.map((i) => ({
          href: `${BASE}shop/produkter/?q=${encodeURIComponent(i.match[0]!)}`,
          label: i.title,
          sub: "Information",
        })),
      ]
    : [];

  const show = open && rows.length > 0;

  function onKey(e: React.KeyboardEvent) {
    if (!show) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % rows.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? rows.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      location.href = rows[active]!.href;
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  return (
    <div ref={box} className={`relative ${mobile ? "w-full" : "flex-1 max-w-xl"}`}>
      <form
        action={`${BASE}shop/produkter/`}
        method="get"
        role="search"
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <label htmlFor={`søg-${listId}`} className="sr-only">
            Søg i butikken
          </label>
          <Search
            size={18}
            strokeWidth={2.5}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-500"
          />
          <input
            ref={felt}
            id={`søg-${listId}`}
            name="q"
            type="search"
            role="combobox"
            aria-expanded={show}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
            autoComplete="off"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
              setActive(-1);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKey}
            placeholder="Søg efter mus, huller i træet, myregift…"
            className="w-full h-11 rounded-full bg-ink-50 border-2 border-ink-200 pl-11 pr-10 text-ink-950 placeholder:text-ink-500 focus:outline-none focus:border-ink-950"
          />
          {q && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                setOpen(false);
              }}
              aria-label="Ryd søgningen"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-7 h-7 rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-950"
            >
              <X size={16} strokeWidth={3} aria-hidden="true" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="press shrink-0 h-11 px-4 rounded-full bg-accent-500 text-ink-950 font-semibold text-sm hover:bg-accent-400"
        >
          Søg
        </button>
      </form>

      {show && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Forslag"
          className="expand-in absolute z-50 left-0 right-0 mt-2 max-h-[70vh] overflow-auto rounded-2xl border-2 border-ink-200 bg-cream p-1.5 shadow-2xl list-none"
        >
          {rows.map((r, i) => (
            <li key={r.href + r.label} role="none">
              <a
                href={r.href}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                data-active={i === active ? "" : undefined}
                className="suggest-row flex items-center gap-3 rounded-xl px-3 min-h-[52px] py-2 no-underline text-ink-950"
              >
                {r.img ? (
                  <img
                    src={r.img}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain rounded-md bg-white shrink-0"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid place-items-center w-10 h-10 rounded-md bg-ink-100 shrink-0"
                  >
                    <Search size={16} strokeWidth={2.5} className="text-ink-600" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink-950 text-[0.9375rem] truncate">
                    {r.label}
                  </span>
                  {r.sub && (
                    <span className="block text-sm text-ink-600 tabular-nums">{r.sub}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
