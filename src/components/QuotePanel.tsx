import { ContactCtas } from "./ui/Cta";
import { ESTIMATED_FROM, dkr } from "../lib/pricing";

/**
 * What a pest without a calculated price says about price.
 *
 * Seven of the fourteen service pages had no price content whatsoever: the
 * estimator only renders for pests the calculator can price, and nothing
 * stood in for it. So "Priser" in the nav had nothing to scroll to, and a
 * visitor who came to find out what it costs left without an answer.
 *
 * Every claim here is already made elsewhere on the site, word for word:
 * "Fast pris efter en kort snak" and the sentence about not guessing come
 * from the estimator's own quote panel, and the response times come from the
 * badges beside it. Nothing new is asserted, and no figure is invented.
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
    treatment ?? "Behandling tilpasset opgaven",
    "Faktura og kvittering",
  ];
  const est = ESTIMATED_FROM[slug];

  return (
    <section id="estimator" className="section section--s estimator">
      <div className="container grid12">
        <div className="estimator__controls">
          <h2>Hvad koster det?</h2>
          <p className="lead select-none">
            {label} sætter vi fast pris på efter en kort snak. Så ved du, hvad det ender med, inden
            vi går i gang.
          </p>
        </div>

        <div className="estimator__result">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            {est ? (
              <>
                <p className="quote-panel__price">
                  Fra {dkr(est.from)}
                  <small className="select-none">vejledende</small>
                </p>
                <p className="small">
                  {est.note} Du får den faste pris, før vi går i gang, og den ændrer sig ikke
                  undervejs.
                </p>
              </>
            ) : (
              <>
                <p className="estimator__price estimator__price--words">Fast pris efter en kort snak</p>
                <p className="small muted">
                  Vi gætter ikke på et tal her. Du får prisen, før vi går i gang, og den ændrer sig
                  ikke undervejs.
                </p>
              </>
            )}
            <p className="select-none estimator__facts">
              <span>Svar på 1 hverdag</span>
              <span>Hos dig på 1-2 hverdage</span>
              <span>Hele Jylland og Fyn</span>
            </p>
          </div>

          <div>
            <p className="select-none estimator__sub">Prisen dækker</p>
            <ul className="estimator__list">
              {covers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <ContactCtas />
        </div>
      </div>
    </section>
  );
}
