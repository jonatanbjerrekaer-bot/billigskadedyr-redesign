import { useState } from "react";
import { Check, ArrowRight, Calculator, Mail } from "lucide-react";
import Header from "./Header";
import UspBar from "./UspBar";
import Footer from "./Footer";
import MobileCtaBar from "./MobileCtaBar";
import { ToastProvider } from "@heroui/react";
import { PestGlyph } from "../lib/pests";
import { serviceContentFor, servicePest } from "../lib/serviceContent";
import { PESTS } from "../lib/pests";

// Relative in-page targets point at the front page's sections (the estimator, the
// contact form and the pest grid live on the home page). BASE_URL is the Vite base
// with a trailing slash, so `${BASE_URL}#estimator` yields a valid root-relative URL.
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

  return (
    <div className="min-h-screen bg-cream text-ink-900 font-sans pb-20 md:pb-0">
      <UspBar />
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <section className="bg-ink-900 text-cream">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <div className="flex items-start gap-4 sm:gap-6">
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent-500 text-ink-900 flex items-center justify-center shrink-0">
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
                href={`${B}#estimator`}
                className="press bg-accent-500 hover:bg-accent-400 text-ink-950 font-bold rounded-lg px-6 py-4 text-center min-h-[48px] inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Calculator size={18} strokeWidth={2.5} aria-hidden="true" />
                Beregn min pris
              </a>
              <a
                href={`${B}#skriv`}
                className="press bg-white text-ink-900 hover:bg-ink-50 font-bold rounded-lg px-6 py-4 text-center min-h-[48px] inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Mail size={18} strokeWidth={2.5} aria-hidden="true" />
                Få et fast tilbud
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-6">
              Hvorfor er professionel {label.toLowerCase()}-bekæmpelse mere effektiv?
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 max-w-3xl">
              {content.whyProfessional.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-accent-500 text-ink-950 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-sm sm:text-base text-ink-900/85 leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
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

        <section className="bg-white py-14 sm:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-4">
                Sådan foregår behandlingen
              </h2>
              <p className="text-base text-ink-900/80 leading-relaxed">{content.processNote}</p>
              <p className="mt-6 text-sm text-ink-900/70">
                <a
                  href={`${B}#estimator`}
                  className="inline-flex items-center gap-1.5 font-semibold text-ink-900 underline underline-offset-4 hover:text-accent-700 min-h-[44px]"
                >
                  Se vejledende pris i beregneren
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </p>
            </div>
          </div>
        </section>

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
