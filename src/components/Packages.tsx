const PACKAGES = [
  {
    name: "Enkeltbesøg",
    price: "Fra ca. 1.800 kr.",
    desc: "Ét skadedyr, ét besøg.",
    items: ["Inspektion", "Én behandling", "Fast pris", "Garanti på behandlingen"],
  },
  {
    name: "Fuld løsning",
    price: "Fra ca. 2.800 kr.",
    desc: "De fleste boliger. Bedste værdi.",
    featured: true,
    items: ["Inspektion og plan", "Op til 2 besøg", "Opfølgning inkluderet", "Dokumentation", "Garanti"],
  },
  {
    name: "Erhverv",
    price: "Efter aftale",
    desc: "Virksomheder og institutioner.",
    items: ["Skræddersyet plan", "Løbende kontrol", "Dokumentation til audits", "Udvidede åbningstider"],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="bg-forest-950 text-cream py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight uppercase text-center mb-3">
          Pakker
        </h2>
        <p className="text-center text-forest-100/70 text-sm mb-10">
          Vejledende. Du får altid en fast pris, før vi begynder.
        </p>
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {PACKAGES.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl p-6 ${
                p.featured
                  ? "bg-accent-500 text-white ring-2 ring-accent-400"
                  : "bg-forest-900 border border-forest-700"
              }`}
              style={{ flexBasis: "260px", flexGrow: 1, flexShrink: 1, maxWidth: "100%" }}
            >
              {p.featured && (
                <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-90">
                  Mest valgt
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className={`text-2xl font-display font-bold mt-2 ${p.featured ? "text-white" : "text-accent-400"}`}>
                {p.price}
              </p>
              <p className={`text-sm mt-1 ${p.featured ? "text-white/80" : "text-forest-100/70"}`}>
                {p.desc}
              </p>
              <ul className={`mt-5 flex flex-col gap-2 text-sm ${p.featured ? "text-white/90" : "text-forest-100/85"}`}>
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-0.5">✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#tilbud"
                className={`mt-6 text-center font-semibold rounded-lg py-3 min-h-[44px] transition-colors ${
                  p.featured
                    ? "bg-white text-accent-500 hover:bg-forest-50"
                    : "bg-forest-800 hover:bg-forest-700 text-cream"
                }`}
              >
                Få et uforpligtende tilbud
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
