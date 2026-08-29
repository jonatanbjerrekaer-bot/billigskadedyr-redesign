export default function ClosingCta() {
  return (
    <section id="tilbud" className="bg-accent-500 text-white py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight uppercase">
          Klar til at få det løst?
        </h2>
        <p className="mt-3 text-lg opacity-90">
          Ring eller skriv. Du får svar inden for 24 timer på hverdage, og en fast pris inden vi starter.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+4524245583"
            className="bg-forest-950 text-white font-semibold rounded-lg px-8 py-4 min-h-[48px] inline-flex items-center justify-center transition-colors hover:bg-forest-900"
          >
            Ring 24 24 55 83
          </a>
          <a
            href="mailto:info@billigskadedyr.dk"
            className="bg-white text-forest-900 font-semibold rounded-lg px-8 py-4 min-h-[48px] inline-flex items-center justify-center transition-colors hover:bg-forest-50"
          >
            Send en mail
          </a>
        </div>
        <p className="mt-6 text-sm opacity-80">
          Åbningstider: Man-Fre 08-18 · Lør-Søn 12-16
        </p>
      </div>
    </section>
  );
}
