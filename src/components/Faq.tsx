const ITEMS = [
  {
    q: "Hvor hurtigt kan I komme?",
    a: "Vi kører typisk på 1-2 hverdage. Er det akut, ring til os på 24 24 55 83 så finder vi en hurtig løsning.",
  },
  {
    q: "Hvor meget koster det?",
    a: "Det afhænger af skadedyr og omfang. Brug priskalkulatoren ovenfor til et vejledende bud. Du får en fast pris efter en kort snak.",
  },
  {
    q: "Må jeg være hjemme under behandlingen?",
    a: "I de fleste tilfælde ja. Vi fortæller dig i forvejen, om du skal være til stede, og hvor længe det tager.",
  },
  {
    q: "Er midlerne sikre for børn og husdyr?",
    a: "Ja. Vi bruger godkendte midler og følger altid gældende regler. Du får tydelig vejledning til, hvordan du holder børn og dyr i sikkerhed under og efter behandlingen.",
  },
  {
    q: "Hvad sker der, hvis skadedyret vender tilbage?",
    a: "Vi følger op på behandlingen. Kontakt os, hvis du ser tegn på skadedyret igen, så kigger vi på det uden unødig ventetid.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-cream py-16">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="font-display text-3xl font-bold tracking-tight text-forest-900 uppercase mb-8">
          Ofte stillede spørgsmål
        </h2>

        <div className="flex flex-col gap-3">
          {ITEMS.map((item) => (
            <details
              key={item.q}
              className="group bg-white rounded-xl border border-forest-100 overflow-hidden"
            >
              <summary
                className="list-none cursor-pointer flex items-center justify-between gap-3 px-5 py-4 min-h-[44px] font-medium text-forest-900 select-none"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="text-accent-500 text-2xl leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 text-sm text-forest-900/80 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
