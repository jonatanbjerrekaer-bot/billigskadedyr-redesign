import { useState } from "react";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
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
import { serviceContentFor, servicePest } from "../lib/serviceContent";
import { PESTS } from "../lib/pests";

// The page now carries its own estimator, contact form, process and FAQ, so
// every in-page target below is a plain local hash. Only links that leave for
// the front page keep the BASE_URL prefix.
const B = import.meta.env.BASE_URL;
const SERVICE_LABELS: Record<string, string> = Object.fromEntries(PESTS.map((p) => [p.slug, p.label]));
const SIBLINGS: string[] = PESTS.map((p) => p.slug);

export default function ServicePage({ slug }: { slug: string }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pest = servicePest(slug);
  const content = serviceContentFor(slug);

  if (!pest || !content) {
    return (
      <div className="min-h-screen bg-cream text-ink-900 font-sans flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="font-display text-2xl font-bold">Den side findes ikke</p>
        <a href={B} className="text-accent-700 underline underline-offset-4">
          Til forsiden
        </a>
      </div>
    );
  }

  const label = pest.label;
  // Fluer has no price key, so the calculator has nothing to quote for it.
  // Showing a calculator that cannot answer is worse than not showing one.
  const priced = PRICED_PESTS.some((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-cream text-ink-900 font-sans pb-20 md:pb-0">
      <UspBar />
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <section className="bg-ink-900 text-cream">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-5 pb-14 sm:pb-20">
            {/* Sat above the title rather than floated over it: on a page reached
                from the grid, getting back is the second thing people want. */}
            <a
              href={`${B}#pest`}
              className="press inline-flex items-center gap-2 -ml-2 mb-8 rounded-lg px-3 py-2 min-h-[44px] text-sm font-semibold text-ink-100/80 hover:text-cream hover:bg-ink-800 transition-colors"
            >
              <ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />
              Alle skadedyr
            </a>
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Named for the view transition, so this tile is the same object
                  as the card on the front page rather than a new one. */}
              <span
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent-500 text-ink-900 flex items-center justify-center shrink-0"
                style={{ viewTransitionName: `pest-${slug}` }}
              >
                <PestGlyph pest={pest} size={40} />
              </span>
              <div className="min-w-0">
                <p className="uppercase tracking-widest text-accent-500 text-sm font-bold mb-3">
                  Professionel skadedyrsbekæmpelse
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
                  Professionel bekæmpelse af {label.toLowerCase()}
                </h1>
              </div>
            </div>
            <p className="mt-6 text-ink-100/85 text-lg max-w-2xl leading-relaxed">
              {content.intro}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={priced ? "#estimator" : "#skriv"}
                className="press bg-accent-500 hover:bg-accent-400 text-ink-950 font-bold rounded-lg px-6 py-4 text-center min-h-[48px] inline-flex items-center justify-center gap-2 transition-colors"
              >
                {priced ? "Beregn min pris" : "Få et fast tilbud"}
              </a>
              <a
                href="#skriv"
                className="press bg-white text-ink-900 hover:bg-ink-50 font-bold rounded-lg px-6 py-4 text-center min-h-[48px] inline-flex items-center justify-center gap-2 transition-colors"
              >
                Skriv til os
              </a>
            </div>
          </div>
        </section>

        {/*
          The conversion section. The reader is typically a homeowner in his
          fifties who has already bought something at the hardware store and
          watched it not work. Three things move him: knowing what actually
          happens, knowing the price cannot move once agreed, and being told
          straight when he does not need us. The last one is why the DIY line
          stays in: a firm that tells you not to hire it is a firm you believe
          when it says you should.
        */}
        <section className="bg-white py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase">
                  Hvorfor er professionel {label.toLowerCase()}-bekæmpelse mere effektiv?
                </h2>
                <p className="mt-4 text-base sm:text-lg text-ink-900/80 leading-relaxed max-w-xl">
                  Midler fra byggemarkedet rammer det, du kan se. Problemet sidder
                  der, hvor du ikke kan komme til. Derfor vender det tilbage, og
                  derfor bliver det dyrere at løse, end hvis det var gjort rigtigt
                  første gang.
                </p>
                <ul className="mt-8 flex flex-col gap-5 max-w-xl">
                  {content.whyProfessional.map((w) => (
                    <li key={w} className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-accent-500 text-ink-950 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={16} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-base text-ink-900/85 leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
                {/*
                  Said out loud, on the page that is trying to sell the visit.
                  It costs a few jobs and buys the ones that matter.
                */}
                <p className="mt-8 max-w-xl rounded-2xl border border-ink-900/10 bg-ink-50/70 p-5 text-sm text-ink-900/80 leading-relaxed">
                  <span className="font-semibold text-ink-900">Og hvis du selv kan klare det, siger vi det.</span>{" "}
                  Et lille, nyt angreb klarer du ofte selv med det rette middel til
                  under 200 kr. Ring eller skriv, så siger vi ærligt, hvad vi ville
                  gøre i dit sted.
                </p>
              </div>

              {/* The answers to "who is coming into my house, and what does it
                  cost me". Facts already stated elsewhere on the site. */}
              <aside className="lg:sticky lg:top-20 rounded-2xl bg-ink-900 text-cream p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide">
                  Det får du, uanset hvad
                </h3>
                <dl className="mt-6 flex flex-col gap-5">
                  {[
                    ["Fast pris, aftalt før vi går i gang", "Du siger ja til et beløb, ikke til et estimat. Det tal ændrer sig ikke undervejs."],
                    ["Certificerede teknikere", "Vi arbejder efter gældende lovgivning og har de autorisationer, den enkelte behandling kræver."],
                    ["Skriftlig dokumentation", "Du får behandlingen på skrift, klar til ejendomsadministrationen eller forsikringssagen."],
                    ["Du ved, hvem der kommer", "Daniel Nemborg overtog virksomheden efter sin far i 2017 og har knap 20 års praktisk erfaring."],
                    ["Hos dig på 1-2 hverdage", "Er det akut, for eksempel rotter indendørs eller et bo tæt på en indgang, ringer du bare."],
                  ].map(([t, d]) => (
                    <div key={t} className="flex items-start gap-3">
                      <Check size={18} strokeWidth={3} aria-hidden="true" className="text-accent-500 shrink-0 mt-0.5" />
                      <div>
                        <dt className="font-semibold text-sm text-cream">{t}</dt>
                        <dd className="mt-1 text-sm text-ink-100/75 leading-relaxed">{d}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <a
                  href={priced ? "#estimator" : "#skriv"}
                  className="press mt-8 w-full bg-accent-500 hover:bg-accent-400 text-ink-950 font-bold rounded-lg px-6 py-4 min-h-[48px] inline-flex items-center justify-center text-center transition-colors"
                >
                  {priced ? "Se prisen for din bolig" : "Få et fast tilbud"}
                </a>
                <p className="mt-3 text-xs text-ink-100/60 text-center">
                  Uforpligtende. Vi svarer inden for en hverdag.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-ink-50 py-14 sm:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-6">
              Hvad er {label.toLowerCase()}?
            </h2>
            <dl className="grid gap-4 md:grid-cols-2 max-w-3xl">
              {content.species.map((sp) => (
                <div key={sp.name} className="bg-white rounded-2xl border border-ink-900/10 p-6">
                  <dt className="font-display text-lg font-bold text-ink-900 mb-1.5">{sp.name}</dt>
                  <dd className="text-sm text-ink-900/75 leading-relaxed">{sp.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* The front page's three steps, plus what is specific to this pest. */}
        <Process note={content.processNote} />

        {priced && <Estimator initialPest={slug} />}

        <Contact />

        <Faq
          items={content.faq}
          title={`Ofte stillede spørgsmål om ${label.toLowerCase()}`}
        />

        <section className="bg-cream border-t border-ink-100 py-12 sm:py-14">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-2xl font-bold tracking-tight uppercase mb-6">
              Har du et andet skadedyr?
            </h2>
            <nav aria-label="Andre skadedyr" className="flex flex-wrap gap-2.5">
              {SIBLINGS.map((s) => (
                <a
                  key={s}
                  href={`${B}service/${s}/`}
                  className="inline-flex items-center min-h-[44px] rounded-full border border-ink-900/15 bg-white px-4 py-2 text-sm font-medium hover:border-accent-500 transition-colors"
                >
                  {SERVICE_LABELS[s] ?? s}
                </a>
              ))}
            </nav>
            <p className="mt-6">
              <a
                href={`${B}#pest`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 underline underline-offset-4 hover:text-accent-700 min-h-[44px]"
              >
                Se alle skadedyr
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
      <ToastProvider />
    </div>
  );
}
