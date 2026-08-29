import { useState } from "react";

const PATHS = [
  {
    id: "diy",
    title: "Klar det selv",
    desc: "Køb de rigtige fælder og midler til din type skadedyr, og follow simple instruktioner.",
    price: "Fra 39,95 kr.",
    time: "Resultat umiddelbart",
    href: "#shop",
    icon: "🛒",
  },
  {
    id: "pro",
    title: "Få en professionel ud",
    desc: "Certificerede bekæmpere inspicere, behandler og dokumenterer. Bedst til vedvarende problemer.",
    price: "Vejledende fra ca. 1.800 kr.",
    time: "Typisk 1-2 besøg",
    href: "#tilbud",
    icon: "🧑‍🔧",
  },
];

export default function TwoPathRouter() {
  const [active, setActive] = useState("diy");

  return (
    <section id="router" className="bg-forest-950 text-cream">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-14">
        <h2 className="font-display text-3xl font-bold tracking-tight uppercase text-center mb-8">
          Hvordan vil du tackle det?
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {PATHS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`text-left rounded-2xl border p-6 transition-all w-full sm:w-[320px] ${
                active === p.id
                  ? "bg-accent-500 border-accent-500 text-white"
                  : "bg-forest-900 border-forest-700 hover:border-accent-400"
              }`}
              aria-pressed={active === p.id}
            >
              <div className="text-4xl mb-3" aria-hidden="true">{p.icon}</div>
              <h3 className="font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm opacity-90">{p.desc}</p>
              <p className="mt-4 font-semibold">{p.price}</p>
              <p className="text-xs opacity-70">{p.time}</p>
            </button>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href={PATHS.find((p) => p.id === active)?.href}
            className="inline-block bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-lg px-6 py-3 min-h-[44px] transition-colors"
          >
            {active === "diy" ? "Se produkter" : "Få et uforpligtende tilbud"}
          </a>
        </div>
      </div>
    </section>
  );
}
