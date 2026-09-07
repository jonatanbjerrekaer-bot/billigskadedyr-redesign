import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { GRID_PESTS, PestGlyph, type PestEntry } from "../lib/pests";
import { PEST_SEARCH } from "../lib/pestSearch";
import Reveal from "./ui/Reveal";
import { homeHref } from "./ui/Cta";

/**
 * Icons come from one registry (lib/pests) shared with the price calculator,
 * so the grid and the dropdown can never show different glyphs for the same
 * pest. The words people search by, and the line describing what they would
 * see at home, live in lib/pestSearch.
 */

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
 * The pest list as chips. A grid sized every column to the widest label, so
 * short names sat in mostly empty cards and fourteen items left a ragged last
 * row; a chip takes the width of its own text, so the left edge lines up with
 * the heading and the wrap is meant to be uneven.
 *
 * `describe` turns the chips into wider cards carrying the line about what you
 * would see at home. That is on in search results and off everywhere else: a
 * search for "bille" returns four pests that look alike as names, and the
 * visitor cannot choose between them without it. The full list does not need
 * it, and switching it on there would undo the height the chips saved.
 *
 * Shared with the bottom of every service page, which passes `exclude` so the
 * page you are already on is not offered again.
 */
export function PestChips(
  { exclude, list, describe }: { exclude?: string; list?: PestEntry[]; describe?: boolean } = {},
) {
  const pests = list ?? (exclude ? GRID_PESTS.filter((p) => p.slug !== exclude) : GRID_PESTS);
  return (
    <div className={describe ? "grid sm:grid-cols-2 gap-3" : "flex flex-wrap gap-2 sm:gap-2.5"}>
      {pests.map((p, i) => (
        <Reveal key={p.slug} delay={i * 30} className={describe ? "h-full [&>*]:h-full" : ""}>
          {/* Each chip leads to that pest's own service page, where the
              treatment is explained in detail. */}
          <a
            href={`${import.meta.env.BASE_URL}service/${p.slug}/`}
            className={
              "group bg-white border border-ink-900/10 hover:border-accent-500 shadow-sm hover:shadow-md lift-sm press transition-[color,background-color,border-color,box-shadow,transform] duration-150 flex items-center " +
              (describe
                ? "rounded-2xl p-3 gap-3.5"
                : "rounded-full pl-1.5 pr-4 py-1.5 gap-2 sm:pl-2 sm:pr-5 sm:py-2 sm:gap-3")
            }
          >
            {/* Shares its view-transition-name with the tile in the service
                page hero, so the icon travels between the two pages instead
                of the pages cross-fading past each other. */}
            <span
              className={
                "shrink-0 bg-ink-900 text-accent-500 flex items-center justify-center transition-colors group-hover:bg-accent-500 group-hover:text-ink-900 " +
                (describe ? "w-12 h-12 rounded-xl" : "w-8 h-8 sm:w-10 sm:h-10 rounded-full")
              }
              style={{ viewTransitionName: `pest-${p.slug}` }}
            >
              <PestGlyph pest={p} />
            </span>
            {describe ? (
              <span className="min-w-0">
                <span className="block font-display font-bold text-ink-900">{p.label}</span>
                {/* What you would notice at home, so four beetles are
                    telling apart rather than four names that look alike. */}
                <span className="block text-sm text-ink-900/70 leading-snug">
                  {PEST_SEARCH[p.slug]?.tell}
                </span>
              </span>
            ) : (
              <span className="font-display font-bold text-sm sm:text-base text-ink-900 whitespace-nowrap">
                {p.label}
              </span>
            )}
          </a>
        </Reveal>
      ))}
    </div>
  );
}

export default function PestQuickSelect() {
  const [q, setQ] = useState("");
  const searching = q.trim().length > 0;
  // The dictionary carries the everyday words people actually type, so a
  // search for "bille" reaches klannere and gåsebiller, which nobody knows by
  // name.
  const hits = useMemo(() => (searching ? GRID_PESTS.filter((p) => matches(p, q)) : GRID_PESTS), [q, searching]);

  return (
    <section id="pest" className="bg-ink-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 uppercase mb-2">
          Hvilket skadedyr har du?
        </h2>
        <p className="text-ink-900/70 mb-5 max-w-2xl">
          Vælg dit skadedyr, eller skriv hvad du har set. Du behøver ikke kende navnet.
        </p>

        {/* Almost nobody arrives knowing the word "klannere". They arrive with
            a beetle, or with huller i tøjet. The field searches the everyday
            words in lib/pestSearch, so the list answers the question people
            can actually ask. */}
        <div className="mb-6 max-w-md relative">
          <label htmlFor="pest-search" className="sr-only">
            Søg efter skadedyr
          </label>
          <input
            id="pest-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Fx bille, huller i tøjet, larver i plænen"
            className="w-full min-h-[48px] rounded-full border border-ink-900/15 bg-white pl-5 pr-12 text-base text-ink-900 placeholder:text-ink-900/45 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 transition-colors"
          />
          {/* Safari draws its own clear button for type=search, in the
              system blue, ignoring the design. That one is hidden in CSS
              and this is ours. */}
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Ryd søgning"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-ink-900/45 hover:text-ink-900 hover:bg-ink-900/5 press transition-colors"
            >
              <X size={18} strokeWidth={2.5} aria-hidden="true" />
            </button>
          )}
        </div>

        {hits.length > 0 ? (
          <>
            <PestChips list={hits} describe={searching} />
            {/* Four beetles can still look alike on the page. Somebody who is
                not sure should not be left guessing, and a photo settles it
                faster than any list can. */}
            {searching && (
              <p className="mt-4 text-sm text-ink-900/70">
                Ikke sikker på, hvilken det er?{" "}
                <a
                  href={homeHref("#skriv")}
                  className="font-semibold text-ink-900 underline underline-offset-4 hover:text-accent-700"
                >
                  Send os et billede
                </a>
                , så siger vi det.
              </p>
            )}
          </>
        ) : (
          /* A dead end here is a lost job, so it goes straight to the form
             rather than telling the visitor to try other words. */
          <div className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6 max-w-xl">
            <p className="font-display font-bold text-ink-900">
              Vi kender den sikkert alligevel.
            </p>
            <p className="mt-2 text-ink-900/70">
              Vi behandler flere skadedyr end dem, der står her. Send os et billede eller en
              beskrivelse, så siger vi, hvad det er, og hvad det koster.
            </p>
            <a
              href={homeHref("#skriv")}
              className="mt-4 inline-flex items-center min-h-[48px] rounded-full bg-ink-900 px-6 font-display font-bold text-cream press hover:bg-accent-500 hover:text-ink-900 transition-colors"
            >
              Beskriv, hvad du har set
            </a>
          </div>
        )}

        <p className="mt-6 text-xs text-ink-900/70">
          Insektikoner:{" "}
          <a
            href="https://www.flaticon.com/"
            className="inline-flex items-center min-h-[44px] sm:min-h-0 underline hover:text-ink-900/70"
            rel="noopener noreferrer"
            target="_blank"
          >
            Freepik – Flaticon
          </a>
          .
        </p>
      </div>
    </section>
  );
}
