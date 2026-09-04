import { Check, X } from "lucide-react";

/**
 * The old version repeated "Sådan gør andre" / "Sådan gør vi" as a label on
 * every single row, which is ten labels for two ideas. The headers are stated
 * once and the rows carry only the content, with the two sides told apart by
 * colour and icon rather than by repeated text.
 */
const ROWS: { other: string; us: string }[] = [
  {
    other: "“Kontakt os for pris”. Du ved først noget, når du har ringet",
    us: "Prisen står på siden. Regn den ud, før du kontakter os",
  },
  {
    other: "Webshop og fagfolk på hver sit domæne",
    us: "Ét sted: produkter til dig selv og folk, der kommer ud",
  },
  {
    other: "Kategorier efter produkttype",
    us: "Kategorier efter skadedyr. Du tænker “rotter”, ikke “smækfælde”",
  },
  {
    other: "Alt sælges som en opgave for en fagmand",
    us: "Vi siger det ligeud, når du selv kan klare det med et middel til 49 kr.",
  },
  {
    other: "Ingen dokumentation af behandlingen",
    us: "Skriftlig dokumentation, klar til ejendomsadministrationen eller forsikringssagen",
  },
];

export default function Comparison() {
  return (
    <section id="saa-dan" className="bg-white py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink-900 uppercase text-center">
          Sådan gør vi det anderledes
        </h2>
        <p className="text-center text-ink-900/70 mt-3 mb-12 max-w-xl mx-auto">
          Fem steder branchen gør det besværligt, og hvad vi gør i stedet.
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Left: the usual way. Deliberately quiet — it is the "before". */}
          <div className="rounded-2xl border border-ink-900/10 bg-ink-50/60 p-6 sm:p-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-ink-900/50 font-semibold mb-6">
              Sådan gør andre
            </h3>
            <ul className="flex flex-col gap-5">
              {ROWS.map((r) => (
                <li key={r.other} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 rounded-full bg-ink-900/[0.07] text-ink-900/40 flex items-center justify-center shrink-0"
                  >
                    <X size={14} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink-900/55 leading-relaxed">{r.other}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: ours. Dark panel with the lime marks so it carries the eye. */}
          <div className="rounded-2xl bg-ink-900 text-cream p-6 sm:p-8 shadow-[0_20px_60px_-25px] shadow-ink-900/60">
            <h3 className="text-xs uppercase tracking-[0.2em] text-accent-400 font-semibold mb-6">
              Sådan gør vi
            </h3>
            <ul className="flex flex-col gap-5">
              {ROWS.map((r) => (
                <li key={r.us} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 rounded-full bg-accent-500 text-ink-950 flex items-center justify-center shrink-0"
                  >
                    <Check size={14} strokeWidth={3.5} />
                  </span>
                  <span className="text-sm leading-relaxed">{r.us}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-ink-900/45 text-center mt-8">
          Sammenligning mod typisk branchepraksis, ikke mod specifikke firmaer.
        </p>
      </div>
    </section>
  );
}
