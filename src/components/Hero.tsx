import { Calculator, Check, Mail, MapPin, Phone } from "lucide-react";

const TRUST_POINTS = [
  "Fast pris, aftalt før vi går i gang",
  "Certificerede teknikere og skriftlig dokumentation",
  "Kan du klare det selv, siger vi det ligeud",
];

export default function Hero() {
  return (
    <section id="top" className="bg-ink-900 text-cream">
      <div className="max-w-6xl mx-auto">
        {/* Split hero: type panel left, full-bleed photo right. */}
        <div className="flex flex-col md:flex-row">
          <div className="basis-0 grow px-5 sm:px-8 py-14 md:py-20" style={{ flexBasis: "52%" }}>
            <p className="uppercase tracking-widest text-accent-500 text-sm font-bold mb-4">
              Risskov, Aarhus
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Rotter, hvepse, væggelus eller borebiller?
            </h1>
            <p className="mt-5 text-ink-100/85 text-lg max-w-md">
              Webshop og professionel bekæmpelse samme sted, i hele Aarhus. Vi ser på det
              først, siger ærligt om du kan klare det selv, og giver dig en fast pris, hvis vi
              skal ud.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {TRUST_POINTS.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={3}
                    aria-hidden="true"
                    className="text-accent-500 shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-ink-100/90">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {/* Primary action is the calculator: it is the thing that answers
                  the question every caller actually has. */}
              <a
                href="#estimator"
                className="press bg-accent-500 hover:bg-accent-400 text-ink-950 font-bold rounded-lg px-6 py-4 text-center min-h-[48px] inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Calculator size={18} strokeWidth={2.5} aria-hidden="true" />
                Beregn min pris
              </a>
              <a
                href="#pest"
                className="press border-2 border-ink-100/30 text-cream hover:border-accent-500 font-semibold rounded-lg px-6 py-4 text-center min-h-[48px] flex items-center justify-center transition-colors"
              >
                Find mit skadedyr
              </a>
            </div>
          </div>

          <div className="basis-0 grow overflow-hidden" style={{ flexBasis: "48%" }}>
            {/*
              Demo image only. Source: snowballpestcontrol.com
              https://snowballpestcontrol.com/wp-content/uploads/2025/12/Why-Regular-Pest-Control-is-Essential-for-a-Healthy-Home-7374193.webp
              Used as a placeholder in this unofficial concept. NOT licensed for
              production — replace with a licensed or own photo before any real use.
            */}
            <img
              src={`${import.meta.env.BASE_URL}hero.webp`}
              alt="Skadedyrstekniker i arbejdstøj under en behandling"
              className="h-full w-full object-cover min-h-[320px] md:min-h-[520px]"
              loading="eager"
            />
          </div>
        </div>

        {/* Contact strip: the practical details a caller wants, one row. */}
        <div className="flex flex-col sm:flex-row border-t border-ink-700">
          <a
            href="mailto:info@billigskadedyr.dk"
            className="basis-0 grow flex items-center gap-3 px-6 py-5 bg-ink-800 hover:bg-ink-700 transition-colors"
          >
            <Mail size={18} aria-hidden="true" className="text-accent-500 shrink-0" />
            <span className="select-text text-sm">info@billigskadedyr.dk</span>
          </a>
          <a
            href="tel:+4524245583"
            className="basis-0 grow flex items-center gap-3 px-6 py-5 bg-ink-800 hover:bg-ink-700 transition-colors border-t sm:border-t-0 sm:border-l border-ink-700"
          >
            <Phone size={18} aria-hidden="true" className="text-accent-500 shrink-0" />
            <span className="select-text text-sm font-semibold">24 24 55 83</span>
          </a>
          <div className="basis-0 grow flex items-center gap-3 px-6 py-5 bg-accent-500 text-ink-950">
            <MapPin size={18} aria-hidden="true" className="shrink-0" />
            <span className="select-text text-sm font-semibold">Viengevej 6A, 8240 Risskov</span>
          </div>
        </div>
      </div>
    </section>
  );
}
