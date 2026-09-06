import { GRID_PESTS, PestGlyph } from "../lib/pests";
import { requestPestPick } from "../lib/estimatorSelection";
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
          Vælg dit skadedyr, og se om du kan klare det selv, eller om vi skal ud.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GRID_PESTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50} className="h-full [&>*]:h-full">
            {/*
              Pro pests route to the calculator; DIY pests open their own
              category in the webshop, that is where "klarer du selv" happens.
              The old #shop anchor never existed on the page.
            */}
            <a
              href={p.path === "pro" ? "#estimator" : (p.shopUrl ?? "https://billigskadedyr.dk/")}
              target={p.path === "pro" ? undefined : "_blank"}
              rel={p.path === "pro" ? undefined : "noreferrer"}
              onClick={p.path === "pro" ? () => requestPestPick(p.slug) : undefined}
              className="group bg-white rounded-2xl border border-ink-900/10 hover:border-accent-500 shadow-sm hover:shadow-md lift-sm press transition-[color,background-color,border-color,box-shadow,transform] duration-150 p-6 flex flex-col items-center gap-2 h-full"
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
