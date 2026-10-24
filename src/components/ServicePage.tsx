import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import UspBar from "./UspBar";
import Footer from "./Footer";
import MobileCtaBar from "./MobileCtaBar";
import Estimator from "./Estimator";
import Contact from "./Contact";
import Process from "./Process";
import Faq from "./Faq";
import { ToastProvider } from "@heroui/react";
import { PestGlyph, PRICED_PESTS } from "../lib/pests";
import QuotePanel from "./QuotePanel";
import { PestChips } from "./PestQuickSelect";
import { serviceContentFor, servicePest } from "../lib/serviceContent";
import { SPECIES_ART } from "../lib/speciesArt";

// The page carries its own estimator, contact form, process and FAQ, so
// every in-page target below is a plain local hash. Only links that leave for
// the front page keep the BASE_URL prefix.
const B = import.meta.env.BASE_URL;

const PROMISES: [string, string][] = [
  ["Fast pris, aftalt før vi går i gang", "Du siger ja til et beløb, ikke til et estimat. Det tal ændrer sig ikke undervejs."],
  ["Certificerede teknikere", "Vi arbejder efter gældende lovgivning og har de autorisationer, den enkelte behandling kræver."],
  ["Du får det på skrift", "Behandlingen på skrift, klar til ejendomsadministrationen eller forsikringssagen."],
  ["Du ved, hvem der kommer", "Daniel Nemborg overtog virksomheden efter sin far i 2017 og har knap 20 års praktisk erfaring."],
  ["Hos dig på 1-2 hverdage", "Er det akut, for eksempel et hvepsebo tæt på en indgang, ringer du bare."],
  ["Vi siger det, hvis du selv kan klare det", "Er angrebet lille, er et middel til omkring 49 kr. ofte nok. Så siger vi det ligeud i stedet for at sende en tekniker."],
];

export default function ServicePage({ slug }: { slug: string }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pest = servicePest(slug);
  const content = serviceContentFor(slug);

  if (!pest || !content) {
    return (
      <div className="np">
        <div className="container section">
          <p className="trigger-title">Den side findes ikke</p>
          <a href={B} className="link">
            Til forsiden
          </a>
        </div>
      </div>
    );
  }

  const label = pest.label;
  // Fluer has no price key, so the calculator has nothing to quote for it.
  // Showing a calculator that cannot answer is worse than not showing one.
  const priced = PRICED_PESTS.some((p) => p.slug === slug);
  // All the species drawn, or none: a drawing next to an icon reads as two sets.
  const drawn = !!content.species?.every((sp) => SPECIES_ART[sp.name]);

  return (
    <div className="np">
      <UspBar />
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <section className="svc-hero">
          <div className="container grid12">
            {/* Above the title rather than floated over it: on a page reached
                from the index, getting back is the second thing people want. */}
            <a href={`${B}#pest`} className="svc-hero__back" style={{ gridColumn: "1 / -1" }}>
              <ArrowLeft size={16} aria-hidden="true" />
              Alle skadedyr
            </a>
            <div className="svc-hero__title">
              {/* The router names this glyph for the flight from the row on
                  the front page, so it arrives as the same object. */}
              <span className="svc-hero__glyph" data-vt-pest={slug}>
                <PestGlyph pest={pest} size={64} />
              </span>
              <h1>Vi fjerner {label.toLowerCase()}</h1>
            </div>
            <p className="lead svc-hero__lead">{content.intro}</p>
            <div className="actions">
              <a href="#estimator" className="btn btn--primary">
                {priced ? "Beregn min pris" : "Få et fast tilbud"}
              </a>
              <a href="#skriv" className="btn btn--secondary">
                Skriv til os
              </a>
            </div>
          </div>
        </section>

        {/*
          The conversion section. The reader is typically a homeowner who has
          already bought something at the hardware store and watched it not
          work. Three things move him: knowing what actually happens, knowing
          the price cannot move once agreed, and being told straight when he
          does not need us.
        */}
        <section className="section">
          <div className="container grid12">
            <div className="why__text">
              <h2>Hvorfor virkede midlet fra byggemarkedet ikke?</h2>
              <p className="lead">
                Det rammer det, du kan se. Problemet sidder der, hvor du ikke kan komme til, og
                derfor kommer det igen.
              </p>
              <ul className="why__list">
                {(content.whyProfessional ?? []).map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* The answers to "who is coming into my house, and what does it
            cost me", under the argument rather than beside it: two text
            columns side by side left the eye with nowhere to start. */}
        <section className="section">
          <div className="container">
            <h2>Det får du, uanset hvad</h2>
            <dl className="svc-promises">
              {PROMISES.map(([t, d]) => (
                <div key={t}>
                  <dt>{t}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
            <div className="actions svc-promises__cta">
              <a href="#estimator" className="btn btn--primary">
                {priced ? "Se prisen for din bolig" : "Få et fast tilbud"}
              </a>
              <p>Uforpligtende. Vi svarer inden for en hverdag.</p>
            </div>
          </div>
        </section>

        {!!content.species?.length && (
          <section className="section">
            <div className="container">
              <h2>Hvad er {label.toLowerCase()}?</h2>
              <dl className="species">
                {content.species!.map((sp) => (
                  <div key={sp.name}>
                    {drawn && (
                      <div className="species__art">
                        <img src={`${B}species/${SPECIES_ART[sp.name]}.webp`} alt={sp.name} loading="lazy" />
                      </div>
                    )}
                    <dt>{sp.name}</dt>
                    <dd>{sp.text}</dd>
                  </div>
                ))}
              </dl>
              {drawn && (
                <p className="species__credit">
                  Tegningerne er fra gamle naturhistoriske værker og frit tilgængelige via Wikimedia Commons.
                </p>
              )}
            </div>
          </section>
        )}

        <Process />

        {/* Either the calculator or the answer it would have given. Both
            carry id="estimator", so Priser in the nav resolves on every
            service page. */}
        {priced ? (
          <Estimator initialPest={slug} />
        ) : (
          <QuotePanel slug={slug} label={label} treatment={pest.treatment} />
        )}

        <Faq items={content.faq} title={`Ofte stillede spørgsmål om ${label.toLowerCase()}`} />

        <section className="section">
          <div className="container">
            <h2>Har du et andet skadedyr?</h2>
            <nav aria-label="Andre skadedyr">
              <PestChips exclude={slug} />
            </nav>
            <p style={{ marginTop: "var(--space-lg)" }}>
              <a href={`${B}#pest`} className="link">
                Se alle skadedyr
              </a>
            </p>
          </div>
        </section>

        <Contact pestLabel={label} />
      </main>
      <Footer />
      <MobileCtaBar />
      <ToastProvider />
    </div>
  );
}
