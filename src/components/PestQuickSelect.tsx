import { GRID_PESTS, PestGlyph } from "../lib/pests";
import Reveal from "./ui/Reveal";

/**
 * Icons come from one registry (lib/pests) shared with the price calculator,
 * so the grid and the dropdown can never show different glyphs for the same
 * pest. Weight normalisation lives there too.
 */
export default function PestQuickSelect() {
  return (
    <section id="pest" className="bg-ink-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 uppercase mb-2">
          Hvilket skadedyr har du?
        </h2>
        <p className="text-ink-900/70 mb-8 max-w-2xl">
          Vælg dit skadedyr og læs, hvad en professionel behandling dækker.
        </p>
        {/* A grid sized every column to the widest label, so short names
            sat in mostly empty cards and the last row came up ragged. Chips
            take the width of their own text: the left edge lines up with the
            heading, the wrap is meant to be uneven, and the list is half as
            tall. */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {GRID_PESTS.map((p, i) => (
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
              <span className="font-display font-bold text-sm sm:text-base text-ink-900 whitespace-nowrap">{p.label}</span>
            </a>
            </Reveal>
          ))}
        </div>
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
