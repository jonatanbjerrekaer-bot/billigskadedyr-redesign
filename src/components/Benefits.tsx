const BENEFITS = [
  {
    title: "Få fast pris i forvejen",
    desc: "Ingen overraskelser. Du får en klar og bundet pris efter en kort telefonsnak.",
    icon: "🎯",
  },
  {
    title: "Certificerede fagfolk",
    desc: "Vores teknikere er uddannede og autoriserede til professionel bekæmpelse.",
    icon: "📜",
  },
  {
    title: "Dokumenteret service",
    desc: "Du modtager klar dokumentation af behandlingen, så du kan dokumentere for din ejendom eller forsikring.",
    icon: "📋",
  },
  {
    title: "Hurtig og diskret",
    desc: "Vi planlægger efter dine behov og arbejder hurtigt, så vi forstyrrer din daglige drift mindst muligt.",
    icon: "⚡",
  },
];

export default function Benefits() {
  return (
    <section id="why" className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-forest-900 uppercase text-center mb-10">
          Hvorfor vælge os
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-forest-50 rounded-2xl p-6 flex flex-col gap-3"
              style={{ flexBasis: "220px", flexGrow: 1, flexShrink: 1, maxWidth: "100%" }}
            >
              <div className="w-12 h-12 rounded-xl bg-forest-900 text-accent-400 flex items-center justify-center text-2xl" aria-hidden="true">
                {b.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-forest-900">{b.title}</h3>
              <p className="text-sm text-forest-900/75">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
