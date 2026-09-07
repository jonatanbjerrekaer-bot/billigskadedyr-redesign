import { useMemo, useState } from "react";
import { GRID_PESTS, PestGlyph, type PestEntry } from "../lib/pests";
import Reveal from "./ui/Reveal";
import { homeHref } from "./ui/Cta";

/**
 * Icons come from one registry (lib/pests) shared with the price calculator,
 * so the grid and the dropdown can never show different glyphs for the same
 * pest. Weight normalisation lives there too.
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
  const hay = fold([p.label, p.treatment ?? "", ...(p.aliases ?? [])].join(" "));
  // every word must appear somewhere, so "biller koekken" narrows rather than widens
  return fold(q).split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
}

/**
 * The pest list as chips. A grid sized every column to the widest label, so
 * short names sat in mostly empty cards and fourteen items left a ragged last
 * row; a chip takes the width of its own text, so the left edge lines up with
 * the heading and the wrap is meant to be uneven.
 *
 * Shared with the bottom of every service page, which passes `exclude` so the
 * page you are already on is not offered again.
 */
export function PestChips({ exclude, list }: { exclude?: string; list?: PestEntry[] } = {}) {
  const pests = list ?? (exclude ? GRID_PESTS.filter((p) => p.slug !== exclude) : GRID_PESTS);
  return (
    <div className="flex flex-wrap gap-2 sm:gap-2.5">
      {pests.map((p, i) => (
        <Reveal key={p.slug} delay={i * 30}>
          {/* Each chip leads to that pest's own service page, where the
              treatment is explained in detail. */}
          <a
            href={`${import.meta.env.BASE_URL}service/${p.slug}/`}
            className="group bg-white rounded-full border border-ink-900/10 hover:border-accent-500 shadow-sm hover:shadow-md lift-sm press transition-[color,background-color,border-color,box-shadow,transform] duration-150 pl-1.5 pr-4 py-1.5 gap-2 sm:pl-2 sm:pr-5 sm:py-2 sm:gap-3 flex items-center"
          >
            {/* Shares its view-transition-name with the tile in the service
                page hero, so the icon travels between the two pages instead
                of the pages cross-fading past each other. */}
            <span
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-ink-900 text-accent-500 flex items-center justify-center transition-colors group-hover:bg-accent-500 group-hover:text-ink-900"
              style={{ viewTransitionName: `pest-${p.slug}` }}
            >
              <PestGlyph pest={p} />
            </span>
            <span className="font-display font-bold text-sm sm:text-base text-ink-900 whitespace-nowrap">
              {p.label}
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

export default function PestQuickSelect() {
  const [q, setQ] = useState("");
  // The registry carries the everyday words people actually type, so a search
  // for "bille" reaches klannere and gåsebiller, which nobody knows by name.
  const hits = useMemo(() => (q.trim() ? GRID_PESTS.filter((p) => matches(p, q)) : GRID_PESTS), [q]);

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
            words in the registry, so the list answers the question people can
            actually ask. */}
        <div className="mb-6 max-w-md">
          <label htmlFor="pest-search" className="sr-only">
            Søg efter skadedyr
          </label>
          <input
            id="pest-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Fx bille, huller i tøjet, larver i plænen"
            className="w-full min-h-[48px] rounded-full border border-ink-900/15 bg-white px-5 text-base text-ink-900 placeholder:text-ink-900/45 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 transition-colors"
          />
        </div>

        {hits.length > 0 ? (
          <PestChips list={hits} />
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
