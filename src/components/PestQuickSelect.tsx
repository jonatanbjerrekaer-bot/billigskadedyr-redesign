import { GRID_PESTS, PestGlyph } from "../lib/pests";

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
          Vælg det skadedyr, du står over for, og vi viser dig den korteste vej til et resultat.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GRID_PESTS.map((p) => (
            <a
              key={p.slug}
              href={p.path === "pro" ? "#estimator" : "#shop"}
              className="group bg-white rounded-2xl border border-ink-900/10 hover:border-accent-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-6 flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-xl bg-ink-900 text-accent-500 flex items-center justify-center transition-colors group-hover:bg-accent-500 group-hover:text-ink-900">
                <PestGlyph pest={p} />
              </div>
              <span className="font-display font-bold text-ink-900 text-center">{p.label}</span>
              <span className="text-xs text-ink-900/60 text-center">
                {p.path === "pro"
                  ? "Bedst med professionel hjælp"
                  : "Klarer du selv med de rette produkter"}
              </span>
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-900/45">
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
