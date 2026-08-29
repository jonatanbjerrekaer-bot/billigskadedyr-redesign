const ROWS = [
  { other: "Du gætter, hvad det koster", us: "Vejledende pris online, fast pris efter 10 minutters telefon" },
  { other: "Et site, ét budskab, to domæner", us: "Ét sted: shop eller professionel hjælp, valgt i første skærm" },
  { other: "Kategorier efter produkttype", us: "Kategorier efter skadedyr. Du tænker 'rotter', ikke 'smækfælde'" },
  { other: "Kontakt os for pris", us: "Priskalkulator viser et interval med det samme" },
  { other: "Ingen dokumentation af behandlingen", us: "Klar dokumentation, klar til ejendom eller forsikring" },
];

export default function Comparison() {
  return (
    <section id="saa-dan" className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-forest-900 uppercase text-center mb-3">
          Sådan gør andre
        </h2>
        <h3 className="text-center text-forest-900/80 font-medium mb-10">
          vs. sådan gør vi
        </h3>
        <div className="flex flex-col gap-0 border border-forest-100 rounded-2xl overflow-hidden">
          {ROWS.map((row, i) => (
            <div
              key={row.us}
              className={`flex flex-col sm:flex-row ${i !== 0 ? "border-t border-forest-100" : ""}`}
            >
              <div
                className="px-5 py-4 text-sm text-forest-900/80"
                style={{ flexBasis: "50%", flexGrow: 1 }}
              >
                <span className="block text-xs uppercase tracking-widest text-forest-900/60 mb-1">
                  Sådan gør andre
                </span>
                {row.other}
              </div>
              <div
                className="px-5 py-4 bg-forest-50 text-sm text-forest-900"
                style={{ flexBasis: "50%", flexGrow: 1 }}
              >
                <span className="block text-xs uppercase tracking-widest text-accent-500 mb-1">
                  Sådan gør vi
                </span>
                {row.us}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-forest-900/50 text-center mt-4">
          Sammenligning mod typisk branchepraksis, ikke mod specifikke firmaer.
        </p>
      </div>
    </section>
  );
}
