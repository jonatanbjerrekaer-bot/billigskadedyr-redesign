import { useState } from "react";
import { Disclosure, Surface, ToggleButton } from "@heroui/react";
import { Check, ChevronDown, Minus, Sparkles } from "lucide-react";
import Cta, { MAILTO } from "./ui/Cta";

/**
 * Comparison UX follows Baymard's guidance for pricing tables:
 * three tiers (not more, to avoid choice paralysis), one visually dominant
 * recommendation, exact numbers instead of vague ranges, and a matrix that can
 * be filtered down to only the rows that actually differ — because the rows
 * that are identical across every tier are the ones users waste time reading.
 *
 * ponytail: no sticky header. It earns its keep on a 30-row enterprise matrix;
 * this one is nine rows and fits on a laptop screen without scrolling.
 */

type Tier = {
  id: string;
  name: string;
  from: number | null;
  fromLabel: string;
  desc: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "enkelt",
    name: "Enkeltbesøg",
    from: 1800,
    fromLabel: "Ét skadedyr, ét besøg",
    desc: "Til ét afgrænset problem, du vil have væk nu.",
  },
  {
    id: "fuld",
    name: "Fuld løsning",
    from: 2800,
    fromLabel: "Op til 2 besøg + opfølgning",
    desc: "Det de fleste boliger ender med at få brug for.",
    featured: true,
  },
  {
    id: "erhverv",
    name: "Erhverv",
    from: null,
    fromLabel: "Pris efter aftale",
    desc: "Løbende kontrol for virksomheder og institutioner.",
  },
];

/** Cell values in TIERS order. `true` = included, `false` = not, string = detail. */
const ROWS: { label: string; values: (boolean | string)[] }[] = [
  { label: "Besigtigelse på adressen", values: [true, true, true] },
  { label: "Behandling", values: ["1 behandling", "Op til 2 besøg", "Efter plan"] },
  { label: "Opfølgningsbesøg", values: [false, true, true] },
  { label: "Skriftlig dokumentation", values: [false, true, true] },
  { label: "Garanti på behandlingen", values: [true, true, true] },
  { label: "Hos dig senest", values: ["1-2 hverdage", "1-2 hverdage", "1-2 hverdage"] },
  { label: "Løbende kontrol", values: [false, false, true] },
  { label: "Dokumentation til audits", values: [false, false, true] },
  { label: "Udvidede åbningstider", values: [false, false, true] },
];

const isSame = (values: (boolean | string)[]) => values.every((v) => v === values[0]);

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check size={18} strokeWidth={3} className="text-accent-600" aria-label="Inkluderet" />;
  if (value === false)
    return <Minus size={18} strokeWidth={2} className="text-ink-900/25" aria-label="Ikke med" />;
  return <span className="text-sm text-ink-900/80">{value}</span>;
}

export default function Packages() {
  const [diffOnly, setDiffOnly] = useState(false);
  const rows = diffOnly ? ROWS.filter((r) => !isSame(r.values)) : ROWS;

  return (
    <section id="packages" className="bg-ink-950 text-cream py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight uppercase text-center mb-3">
          Pakker
        </h2>
        <p className="text-center text-ink-100/70 text-sm mb-12 max-w-xl mx-auto">
          Vejledende priser. Du får dit eget beløb i prisberegneren ovenfor og en bundet
          pris, før vi går i gang.
        </p>

        {/* Cards. The recommended tier is lifted and outlined rather than filled
            solid lime: a fully saturated card reads discount, not professional. */}
        <div className="grid md:grid-cols-3 gap-5 md:items-end">
          {TIERS.map((t) => (
            <Surface
              key={t.id}
              className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                t.featured
                  ? "bg-ink-900 border-2 border-accent-500 shadow-[0_0_60px_-12px] shadow-accent-500/40 md:pb-9 md:pt-11"
                  : "bg-ink-900/60 border border-ink-700 hover:border-ink-600"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 bg-accent-500 text-ink-950 text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1">
                  <Sparkles size={13} strokeWidth={2.5} aria-hidden="true" />
                  Mest valgt
                </span>
              )}

              <h3 className="font-display text-xl font-bold text-cream">{t.name}</h3>

              <div className="mt-4 flex items-baseline gap-1.5">
                {t.from ? (
                  <>
                    <span className="text-sm text-ink-100/60">fra</span>
                    <span className="font-display text-4xl font-bold text-accent-400 tabular-nums">
                      {t.from.toLocaleString("da-DK")}
                    </span>
                    <span className="text-sm text-ink-100/60">kr.</span>
                  </>
                ) : (
                  <span className="font-display text-3xl font-bold text-accent-400">
                    Efter aftale
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-100/60 mt-1">{t.fromLabel}</p>

              <p className="text-sm text-ink-100/80 mt-4 grow">{t.desc}</p>

              {/* mt-6 + grow on the description above keeps the three CTAs
                  on one baseline even though the copy lengths differ. */}
              <div className="mt-6">
                <Cta
                  href={MAILTO}
                  variant={t.featured ? "primary" : "secondary"}
                  fullWidth
                >
                  Få et uforpligtende tilbud
                </Cta>
              </div>
            </Surface>
          ))}
        </div>

        {/* Difference matrix. */}
        <div className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">
              Hvad er forskellen?
            </h3>
            <ToggleButton
              // Desktop-only: on mobile the same job is done by folding the
              // whole matrix away.
              isSelected={diffOnly}
              onChange={setDiffOnly}
              className="hidden md:inline-flex px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] bg-ink-900 border border-ink-700 text-ink-100 hover:border-ink-600 data-[selected]:bg-accent-500 data-[selected]:text-ink-950 data-[selected]:border-accent-500 transition-colors"
            >
              Vis kun forskelle
            </ToggleButton>
          </div>

          {/* Phones: one card per tier, no sideways scrolling, folded by
              default so it costs no scrolling to skip. */}
          <Disclosure.Root className="md:hidden">
            <Disclosure.Heading>
              <Disclosure.Trigger className="group flex w-full items-center justify-between gap-3 min-h-[48px] rounded-xl bg-ink-900 border border-ink-700 px-4 text-left text-sm font-medium text-cream cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-500">
                Se hvad der er med i hver pakke
                <ChevronDown
                  size={20}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="shrink-0 text-accent-500 transition-transform duration-300 group-aria-expanded:rotate-180"
                />
              </Disclosure.Trigger>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="flex flex-col gap-4 pt-4">
            {TIERS.map((t, i) => (
              <div
                key={t.id}
                className={`rounded-2xl bg-white p-5 ${
                  t.featured ? "ring-2 ring-accent-500" : ""
                }`}
              >
                <h4
                  className={`font-display font-bold mb-3 ${
                    t.featured ? "text-accent-600" : "text-ink-900"
                  }`}
                >
                  {t.name}
                </h4>
                <dl className="flex flex-col">
                  {rows.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between gap-4 py-2.5 border-b border-ink-900/[0.06] last:border-0"
                    >
                      <dt className="text-sm text-ink-900/70">{r.label}</dt>
                      <dd className="shrink-0">
                        <Cell value={r.values[i]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure.Root>

          <div className="hidden md:block overflow-x-auto rounded-2xl bg-white">
            <table className="w-full min-w-[560px] text-left border-collapse">
              <caption className="sr-only">Sammenligning af de tre pakker</caption>
              <thead>
                <tr className="border-b border-ink-900/10">
                  <th scope="col" className="px-5 py-4 text-sm font-semibold text-ink-900/60">
                    Indhold
                  </th>
                  {TIERS.map((t) => (
                    <th
                      key={t.id}
                      scope="col"
                      className={`px-5 py-4 text-sm font-bold ${
                        t.featured ? "text-accent-600" : "text-ink-900"
                      }`}
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-ink-900/[0.06] last:border-0">
                    <th
                      scope="row"
                      className="px-5 py-3.5 text-sm font-medium text-ink-900 text-left"
                    >
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td
                        key={TIERS[i].id}
                        className={`px-5 py-3.5 ${TIERS[i].featured ? "bg-accent-500/[0.07]" : ""}`}
                      >
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {diffOnly && (
            <p className="mt-3 text-xs text-ink-100/50">
              {ROWS.length - rows.length} punkter er ens i alle tre pakker og er skjult.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
