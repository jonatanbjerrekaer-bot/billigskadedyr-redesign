const STEPS = [
  {
    n: "01",
    title: "Ring eller skriv",
    desc: "Fortæl kort, hvad du står over for. Du får svar inden for 24 timer på hverdage.",
  },
  {
    n: "02",
    title: "Inspektion og fast pris",
    desc: "Vi vurderer situationen, anbefaler metode og giver dig en fast pris. Ingen overraskelser.",
  },
  {
    n: "03",
    title: "Behandling og opfølgning",
    desc: "Vi behandler, dokumenterer og følger op, så problemet ikke vender tilbage.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-cream py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-forest-900 uppercase text-center mb-12">
          Sådan foregår det
        </h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex flex-col gap-2"
              style={{ flexBasis: "240px", flexGrow: 1, flexShrink: 1, maxWidth: "100%" }}
            >
              <span className="font-display text-5xl font-bold text-accent-500" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="font-display text-xl font-bold text-forest-900">{s.title}</h3>
              <p className="text-sm text-forest-900/75">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
