import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { GRID_PESTS, PestGlyph, type PestEntry } from "../lib/pests";
import { PEST_SEARCH } from "../lib/pestSearch";
import { OWNER_PRICES, dkr } from "../lib/pricing";
import { homeHref } from "./ui/Cta";

/**
 * Icons come from one registry (lib/pests) shared with the price calculator,
 * so the list and the dropdown can never show different glyphs for the same
 * pest. The words people search by, and the line describing what they would
 * see at home, live in lib/pestSearch.
 */

/** What people actually see at home, typed out one by one in the empty field. Each must find a pest in lib/pestSearch. */
const EXAMPLES = [
  "huller i tøjet",
  "myrer i køkkenet",
  "larver i plænen",
  "stik i sengen",
  "hvepsebo",
  "orm i træ",
  "skud i plænen",
  "sølvfisk i badeværelset",
];
const STATIC_HINT = "Bille, huller i tøjet, larver i plænen";

/**
 * Types each example into the placeholder, holds it, deletes it, moves on.
 * Pauses while the field has focus or text, and stays on one static hint
 * under reduced motion, so it never competes with what someone is typing.
 */
function useTypedPlaceholder(paused: boolean) {
  const [text, setText] = useState(STATIC_HINT);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0, n = 0, deleting = false, t = 0;
    const tick = () => {
      const word = EXAMPLES[i];
      n += deleting ? -1 : 1;
      setText(word.slice(0, n));
      let wait = deleting ? 35 : 70;
      if (!deleting && n === word.length) { deleting = true; wait = 1600; }
      else if (deleting && n === 0) { deleting = false; i = (i + 1) % EXAMPLES.length; wait = 300; }
      t = window.setTimeout(tick, wait);
    };
    t = window.setTimeout(tick, 600);
    return () => { clearTimeout(t); setText(STATIC_HINT); };
  }, [paused]);
  return text;
}

/**
 * Folds the Danish letters so every spelling of a word lands on one string:
 * "Gåsebiller", "gaasebiller" and "gasebiller" all become "gasebiller", and
 * "Møl", "moel" and "mol" all become "mol". People type whichever is easiest
 * on the keyboard in front of them, and all three should find the pest.
 */
const fold = (s: string) =>
  s
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/aa/g, "a")
    .replace(/oe/g, "o")
    .replace(/ae/g, "a")
    .trim();

function matches(p: PestEntry, q: string) {
  const s = PEST_SEARCH[p.slug];
  const hay = fold([p.label, p.treatment ?? "", s?.tell ?? "", ...(s?.words ?? [])].join(" "));
  // every word must appear somewhere, so "biller i køkkenet" narrows rather than widens
  return fold(q).split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
}

/**
 * What the list prints at the right edge of a pest. Only the owner's own
 * published figures are numbers: the vejledende fra-priser in lib/pricing are
 * kept for each pest's own page, beside the sentence that qualifies them, and
 * never printed here as if they were his.
 */
export function priceOf(p: PestEntry): { text: string; ask: boolean; note?: string } {
  const row = p.priceKey ? OWNER_PRICES[p.priceKey] : undefined;
  if (row?.kind === "fixed")
    return { text: dkr(row.base), ask: false, note: row.unit === "rum" ? "pr. rum" : undefined };
  if (row?.kind === "quote" && row.inspection)
    return { text: dkr(row.inspection.price), ask: false, note: "besigtigelse" };
  return { text: "Efter en snak", ask: true };
}

/**
 * The pest list for the bottom of every service page, which passes `exclude`
 * so the page you are already on is not offered again. Set as a ruled list in
 * columns, the way the front page sets its index.
 */
export function PestChips({ exclude, list }: { exclude?: string; list?: PestEntry[] } = {}) {
  const pests = list ?? (exclude ? GRID_PESTS.filter((p) => p.slug !== exclude) : GRID_PESTS);
  return (
    <ul className="others">
      {pests.map((p) => (
        <li key={p.slug}>
          <a href={`${import.meta.env.BASE_URL}service/${p.slug}/`}>
            {/* Marked so the router can name it for the flight to the
                service page hero; see flyPest in lib/router. */}
            <span data-vt-pest={p.slug}>
              <PestGlyph pest={p} size={24} />
            </span>
            {p.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function PestQuickSelect() {
  const [q, setQ] = useState("");
  const searching = q.trim().length > 0;
  // The dictionary carries the everyday words people actually type, so a
  // search for "bille" reaches klannere and gåsebiller, which nobody knows by
  // name.
  const hits = useMemo(() => (searching ? GRID_PESTS.filter((p) => matches(p, q)) : GRID_PESTS), [q, searching]);

  const [focused, setFocused] = useState(false);
  const placeholder = useTypedPlaceholder(focused || q !== "");

  return (
    <div id="pest">
      <h2 className="index__head">Hvilket skadedyr har du?</h2>
      <p className="index__intro small muted">
        Vælg dit skadedyr, eller skriv hvad du har set. Du behøver ikke kende navnet.
      </p>

      {/* Almost nobody arrives knowing the word "klannere". They arrive with
          a beetle, or with huller i tøjet. The field searches the everyday
          words in lib/pestSearch, so the list answers the question people
          can actually ask. */}
      <div className="index__search">
        <Search size={20} aria-hidden="true" className="index__search-icon" />
        <label htmlFor="pest-search" className="visually-hidden">
          Søg efter skadedyr
        </label>
        <input
          id="pest-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="field"
          autoComplete="off"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Ryd søgning" className="index__clear">
            <X size={20} aria-hidden="true" />
          </button>
        )}
      </div>

      {hits.length > 0 ? (
        <>
          <ul className="index__list" data-searching={searching || undefined} aria-live="polite">
            {hits.map((p) => {
              const price = priceOf(p);
              return (
                <li key={p.slug} className="index__row">
                  {/* Each row leads to that pest's own service page, where the
                      treatment is explained in detail. */}
                  <a href={`${import.meta.env.BASE_URL}service/${p.slug}/`}>
                    <span className="index__glyph" data-vt-pest={p.slug}>
                      <PestGlyph pest={p} size={24} />
                    </span>
                    <span className="index__name">{p.label}</span>
                    <span className={`index__price ${price.ask ? "index__price--ask" : "agate"}`}>
                      {price.note && <small>{price.note}</small>}
                      {price.text}
                    </span>
                    {/* What you would notice at home, so four beetles are
                        telling apart rather than four names that look alike. */}
                    {searching && <span className="index__tell">{PEST_SEARCH[p.slug]?.tell}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
          {searching ? (
            <p className="index__caption">
              Ikke sikker på, hvilken det er?{" "}
              <a href={homeHref("#skriv")} className="link">
                Send os et billede
              </a>
              , så siger vi det.
            </p>
          ) : (
            <p className="index__caption">
              Vejledende priser. Uden beløb: fast pris efter en kort snak.
            </p>
          )}
        </>
      ) : (
        /* A dead end here is a lost job, so it goes straight to the form
           rather than telling the visitor to try other words. */
        <div className="index__empty">
          <p className="trigger-title">Vi kender den sikkert alligevel.</p>
          <p className="muted">
            Vi behandler flere skadedyr end dem, der står her. Send os et billede eller en
            beskrivelse, så siger vi, hvad det er, og hvad det koster.
          </p>
          <a href={homeHref("#skriv")} className="btn btn--primary">
            Beskriv, hvad du har set
          </a>
        </div>
      )}
    </div>
  );
}
