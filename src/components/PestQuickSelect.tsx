const PESTS = [
  { name: "Rotter & Mus", iconChar: "🐀", path: "diy" },
  { name: "Myrer", iconChar: "🐜", path: "diy" },
  { name: "Hvepse", iconChar: "🐝", path: "pro" },
  { name: "Væggelus", iconChar: "🛏", path: "pro" },
  { name: "Skægkræ & Sølvfisk", iconChar: "🐛", path: "diy" },
  { name: "Borebiller", iconChar: "🪵", path: "pro" },
  { name: "Kakerlakker", iconChar: "🪳", path: "pro" },
  { name: "Fluer & myg", iconChar: "🪰", path: "diy" },
];

export default function PestQuickSelect() {
  return (
    <section id="pest" className="bg-cream py-16">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="font-display text-3xl font-bold tracking-tight text-forest-900 uppercase mb-2">
          Hvilket skadedyr har du?
        </h2>
        <p className="text-forest-900/70 mb-8">
          Vælg det skadedyr, du står over for, og vi viser dig den korteste vej til et resultat.
        </p>
        <div className="flex flex-wrap gap-4">
          {PESTS.map((p) => (
            <a
              key={p.name}
              href={p.path === "pro" ? "#tilbud" : "#shop"}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center gap-2 w-full sm:w-[calc(33%-8px)] md:w-[calc(25%-12px)]"
            >
              <div className="w-14 h-14 rounded-xl bg-forest-50 flex items-center justify-center text-3xl" aria-hidden="true">
                {p.iconChar}
              </div>
              <span className="font-display font-bold text-forest-900 text-center">{p.name}</span>
              <span className="text-xs text-forest-900/60">
                {p.path === "pro" ? "Bedst med professionel hjælp" : "Klarer du selv med de rette produkter"}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
