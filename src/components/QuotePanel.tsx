import { Check, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_HREF, TEL } from "./ui/Cta";
import { ESTIMATED_FROM, dkr } from "../lib/pricing";

/**
 * What a pest without a calculated price says about price.
 *
 * Seven of the fourteen service pages had no price content whatsoever: the
 * estimator only renders for pests the calculator can price, and nothing
 * stood in for it. The word "koster" did not appear once on gåsebiller. So
 * "Priser" in the nav had nothing to scroll to, and more importantly a
 * visitor who came to find out what it costs left without an answer.
 *
 * Every claim here is already made elsewhere on the site, word for word:
 * "Fast pris efter en kort snak" and the sentence about not guessing come
 * from the estimator's own quote panel, and the response times come from the
 * badges beside it. Nothing new is asserted, and no figure is invented, which
 * is the whole point: the honest answer to "what does it cost" for these
 * pests is that it is set after a look, not that it is unknown.
 */
export default function QuotePanel({
  slug,
  label,
  treatment,
}: {
  /** Looks up the vejledende fra-pris, where one exists. */
  slug: string;
  label: string;
  /** What the visit actually consists of, from the pest registry. */
  treatment?: string;
}) {
  const covers = [
    "Besigtigelse på adressen",
    treatment ?? "Behandling tilpasset opgaven",
    "Skriftlig dokumentation af behandlingen",
  ];
  const est = ESTIMATED_FROM[slug];

  return (
    <section id="estimator" className="bg-ink-950 text-cream py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight uppercase mb-3">
          Hvad koster det?
        </h2>
        <p className="text-ink-100/70 mb-8 max-w-2xl">
          {label} sætter vi pris på efter en kort snak. Så ved du, hvad det ender med,
          inden vi går i gang.
        </p>

        <div className="rounded-2xl border border-ink-800 bg-ink-900/60 p-5 sm:p-7 grid gap-7 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            {est ? (
              <>
                <p className="font-display text-3xl font-bold text-accent-400">
                  Fra {dkr(est.from)}
                  <span className="ml-2 align-middle text-[11px] font-sans font-semibold uppercase tracking-widest text-ink-100/60">
                    vejledende
                  </span>
                </p>
                <p className="text-sm text-ink-100/70 leading-relaxed">
                  {est.note} Du får den faste pris, før vi går i gang, og den ændrer sig
                  ikke undervejs.
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-2xl font-bold text-accent-400">
                  Fast pris efter en kort snak
                </p>
                <p className="text-sm text-ink-100/70 leading-relaxed">
                  Vi gætter ikke på et tal her. Du får prisen, før vi går i gang, og den
                  ændrer sig ikke undervejs.
                </p>
              </>
            )}
            <div className="flex flex-wrap gap-2 text-xs text-ink-100/80">
              <span className="rounded-full bg-ink-900 px-2.5 py-1">Svar på 1 hverdag</span>
              <span className="rounded-full bg-ink-900 px-2.5 py-1">Hos dig på 1-2 hverdage</span>
            </div>
            <p className="flex items-start gap-2 text-sm text-ink-100/80 mt-1">
              <MapPin size={16} strokeWidth={2.5} aria-hidden="true" className="text-accent-500 shrink-0 mt-0.5" />
              Hele Jylland og Fyn
            </p>
          </div>

          <div>
            <p className="mb-2.5 text-[11px] uppercase tracking-widest text-ink-100/60">
              Prisen dækker
            </p>
            <ul className="text-sm text-ink-100/90 flex flex-col gap-2 list-none p-0 m-0">
              {covers.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check size={16} strokeWidth={3} aria-hidden="true" className="text-accent-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col sm:flex-row gap-3">
            <a
              href={CONTACT_HREF}
              className="press inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 text-ink-950 font-display font-bold min-h-[48px] px-6 hover:bg-accent-400 transition-colors"
            >
              <Mail size={17} strokeWidth={2.5} aria-hidden="true" />
              Skriv til os
            </a>
            <a
              href={TEL}
              className="press inline-flex items-center justify-center gap-2 rounded-full border border-ink-700 min-h-[48px] px-6 font-display font-bold hover:border-accent-500 transition-colors"
            >
              <Phone size={17} strokeWidth={2.5} aria-hidden="true" />
              Ring 24 24 55 83
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
