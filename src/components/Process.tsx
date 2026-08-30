const STEPS = [
  {
    n: "01",
    title: "Skriv eller ring",
    desc: "Fortæl kort, hvad du står over for. Du får svar inden for 24 timer på hverdage.",
  },
  {
    n: "02",
    title: "Besigtigelse og fast pris",
    desc: "Vi ser på omfanget, anbefaler en metode og sætter prisen. Så ved du, hvad det ender med.",
  },
  {
    n: "03",
    title: "Behandling og opfølgning",
    desc: "Vi behandler, sender dig dokumentationen og følger op, så det ikke kommer igen.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-cream py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 uppercase text-center mb-12">
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
              <h3 className="font-display text-xl font-bold text-ink-900">{s.title}</h3>
              <p className="text-sm text-ink-900/75">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
