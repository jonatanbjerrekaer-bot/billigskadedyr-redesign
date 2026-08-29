export default function Hero() {
  return (
    <section id="top" className="bg-forest-950 text-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="basis-0 grow" style={{ flexBasis: "55%" }}>
            <p className="uppercase tracking-widest text-accent-400 text-sm font-bold mb-3">
              Risskov, Aarhus
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Rats, wasps, bed bugs or wood borers?
              <br />
              We solve it fast and for a fair price.
            </h1>
            <p className="mt-4 text-forest-100/85 text-lg">
              Professional pest control for homes and businesses across Aarhus. We inspect first,
              explain your options, and give you a fixed price before any work begins.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#tilbud"
                className="bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-lg px-6 py-4 text-center min-h-[48px] flex items-center justify-center transition-colors"
              >
                Get a free quote
              </a>
              <a
                href="#pest"
                className="border-2 border-forest-100/40 text-cream hover:bg-forest-800 font-semibold rounded-lg px-6 py-4 text-center min-h-[48px] flex items-center justify-center transition-colors"
              >
                Find my pest
              </a>
            </div>
          </div>

          <div
            className="basis-0 grow rounded-2xl bg-forest-800 border border-forest-700 p-6"
            style={{ flexBasis: "38%" }}
          >
            <p className="text-xs uppercase tracking-widest text-forest-100/70 mb-3">
              Why customers call us
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Free inspection and fixed price",
                "Certified technicians, documented service",
                "Serves homes, offices and industry",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-accent-400 text-xl leading-none mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm text-forest-100/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
