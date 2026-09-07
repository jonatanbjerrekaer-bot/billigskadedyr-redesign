import { ChevronRight } from "lucide-react";
import { TABS } from "../../lib/productTabs";
import { SAFETY, POISON_LINE } from "../../lib/safety";

/**
 * Hans egne foldeafsnit fra produktsiden.
 *
 * Det lange indhold, som en køber kun vil have, når han vil have det:
 * anvendelse, beskrivelse, sikkerhed, spørgsmål, fragt. Alt sammen hans egen
 * tekst.
 *
 * Bygget på <details> og <summary>. De folder ud uden en linje JavaScript,
 * de kan betjenes med tastatur, skærmlæsere kender dem, og browserens egen
 * sidesøgning finder tekst inde i dem. Det er ikke en spareløsning, det er
 * den rigtige.
 *
 * Den første står åben, fordi det er den, folk kom efter: hvor meget skal
 * jeg bruge, og hvordan påfører jeg det.
 */
/**
 * Faremærkningen, ordret fra det officielle sikkerhedsdatablad.
 *
 * Den står med vilje som den er. Man behøver ikke skrive, at en opgave er
 * farlig, når man kan skrive, hvad der står på dunken: H410, meget giftig
 * med langvarige virkninger for vandlevende organismer. Det er både det
 * ærligste og det stærkeste argument for at ringe til en fagmand.
 */
function SafetySheet({ slug }: { slug: string }) {
  const s = SAFETY[slug];
  if (!s) return null;
  return (
    <div className="mt-4 border-l-[3px] border-amber-600 pl-4 sm:pl-5 py-1">
      <div className="flex flex-wrap items-center gap-2">
        {/* Signalordet er et ord fra etiketten, ikke en dekoration. Det staar
            med versaler, fordi det goer det paa dunken, og uden pille om, saa
            det ikke ligner en rabatmaerkat. */}
        <span className="select-none font-display text-sm font-bold uppercase tracking-wide text-amber-800">
          {s.signal}
        </span>
        {s.pictograms.map((g) => (
          <span
            key={g}
            className="select-none rounded-md border border-ink-400 px-2 py-0.5 text-xs font-semibold text-ink-800"
          >
            {g}
          </span>
        ))}
      </div>

      {s.active && (
        <p className="mt-3 text-[15px] text-ink-900 m-0">
          <span className="font-semibold">Aktivstof:</span> {s.active}
        </p>
      )}
      {s.restriction && (
        <p className="mt-1 text-[15px] font-semibold text-ink-950 m-0">{s.restriction}</p>
      )}

      <p className="select-none mt-4 text-[11px] font-bold uppercase tracking-widest text-ink-700">
        Faresætninger
      </p>
      <ul className="mt-1.5 flex flex-col gap-1 list-none p-0 m-0 text-[15px] text-ink-900">
        {s.hazards.map((h) => <li key={h}>{h}</li>)}
      </ul>

      <p className="select-none mt-4 text-[11px] font-bold uppercase tracking-widest text-ink-700">
        Sikkerhedssætninger
      </p>
      <ul className="mt-1.5 flex flex-col gap-1 list-none p-0 m-0 text-[15px] text-ink-900">
        {s.precautions.map((x) => <li key={x}>{x}</li>)}
      </ul>

      <p className="mt-4 font-semibold text-ink-950 m-0">{POISON_LINE}</p>
      <p className="select-none mt-2 text-xs text-ink-700 m-0">{s.source}</p>
    </div>
  );
}

export default function ProductTabs({ slug }: { slug: string }) {
  const tabs = TABS[slug];
  if (!tabs?.length) return null;

  return (
    <section aria-labelledby="detaljer" className="max-w-3xl">
      <h2 id="detaljer" className="font-display text-2xl font-bold tracking-tight text-ink-950 mb-4">
        Det hele om varen
      </h2>
      <div className="border-t border-ink-200">
        {tabs.map((t, i) => (
          <details
            key={t.title}
            open={i === 0}
            className="group border-b border-ink-200"
          >
            <summary className="press select-none cursor-pointer list-none flex items-center justify-between gap-4 py-4 font-display text-lg font-bold text-ink-950 marker:hidden [&::-webkit-details-marker]:hidden">
              {t.title}
              <ChevronRight
                size={20}
                strokeWidth={2.5}
                aria-hidden="true"
                className="shrink-0 text-ink-600 transition-transform group-open:rotate-90"
              />
            </summary>
            <div className="pb-5 flex flex-col gap-3">
              {t.body.map((p) => (
                <p key={p} className="text-[15px] text-ink-800 leading-relaxed m-0">
                  {p}
                </p>
              ))}
              {t.title.startsWith("Sikkerhed") && <SafetySheet slug={slug} />}
              {t.list && (
                <ul className="flex flex-col gap-1.5 pl-5 m-0 text-[15px] text-ink-800 list-disc marker:text-ink-400">
                  {t.list.map((x) => (
                    <li key={x} className="leading-snug">{x}</li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
      <p className="select-none mt-3 text-xs text-ink-600">
        Teksten er hans egen fra billigskadedyr.dk. Etiketten på emballagen gælder frem for alt andet.
      </p>
    </section>
  );
}
