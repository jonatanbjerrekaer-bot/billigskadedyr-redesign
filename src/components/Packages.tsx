import { useState } from "react";
import { Disclosure, ToggleButton } from "@heroui/react";
import { Check, ChevronDown, Minus } from "lucide-react";
import Cta, { CONTACT_HREF } from "./ui/Cta";
import { useChosenPest, useEstimatorSelection } from "../lib/estimatorSelection";
import { PRICED_PESTS } from "../lib/pests";
import { OWNER_PRICES, dkr } from "../lib/pricing";

/**
 * Comparison UX follows Baymard's guidance for pricing tables:
 * three tiers (not more, to avoid choice paralysis), one visually dominant
 * recommendation, exact numbers instead of vague ranges, and a matrix that can
 * be filtered down to only the rows that actually differ.
 *
 * Set as the paper's one ink band: a price notice reversed out of the ink,
 * the three tiers parted by column rules rather than boxed as cards, the
 * recommended one marked with its word and the filled button.
 *
 * ponytail: no sticky header. It earns its keep on a 30-row enterprise matrix;
 * this one is eight rows and fits on a laptop screen without scrolling.
 */

type Tier = {
  id: string;
  name: string;
  fromLabel: string;
  desc: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "enkelt",
    name: "Enkeltbesøg",
    fromLabel: "Ét skadedyr, én behandling",
    desc: "Til ét problem, du vil have væk nu.",
  },
  {
    id: "fuld",
    name: "Fuld løsning",
    fromLabel: "Forår og efterår, med opfølgning",
    desc: "Det, de fleste huse ender med at få brug for.",
    featured: true,
  },
  {
    id: "erhverv",
    name: "Erhverv",
    fromLabel: "Løbende aftale",
    desc: "Løbende kontrol for virksomheder og institutioner.",
  },
];

/** Cell values in TIERS order. `true` = included, `false` = not, string = detail. */
const ROWS: { label: string; values: (boolean | string)[] }[] = [
  { label: "Besigtigelse på adressen", values: [true, true, true] },
  { label: "Behandling", values: ["1 besøg", "Op til 2 besøg", "Efter plan"] },
  { label: "Opfølgningsbesøg", values: [false, true, true] },
  { label: "Skriftlig dokumentation", values: [false, true, true] },
  { label: "Hos dig senest", values: ["1-2 hverdage", "1-2 hverdage", "1-2 hverdage"] },
  { label: "Løbende kontrol", values: [false, false, true] },
  { label: "Dokumentation til audits", values: [false, false, true] },
  { label: "Udvidede åbningstider", values: [false, false, true] },
];

const isSame = (values: (boolean | string)[]) => values.every((v) => v === values[0]);

/**
 * A matrix row that collapses to zero height instead of unmounting, so
 * toggling "Vis kun forskelle" animates in both directions; .row-collapse in
 * index.css does the work.
 */
function MatrixRow({ label, values, hidden }: { label: string; values: (boolean | string)[]; hidden: boolean }) {
  return (
    <tr aria-hidden={hidden} data-collapsed={hidden}>
      <th scope="row">
        <div className="row-collapse" data-collapsed={hidden}>
          <div>
            <div className="cell">{label}</div>
          </div>
        </div>
      </th>
      {values.map((v, i) => (
        <td key={TIERS[i].id}>
          <div className="row-collapse" data-collapsed={hidden}>
            <div>
              <div className="cell">
                <Cell value={v} />
              </div>
            </div>
          </div>
        </td>
      ))}
    </tr>
  );
}

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} strokeWidth={2.5} className="ok" aria-label="Inkluderet" />;
  if (value === false) return <Minus size={18} strokeWidth={2} className="no" aria-label="Ikke med" />;
  return <span>{value}</span>;
}

export default function Packages() {
  const [diffOnly, setDiffOnly] = useState(false);
  const sel = useEstimatorSelection();
  // Only the owner's published numbers are printed: the calculator's price for
  // one treatment, and his spring-and-autumn package where he has one.
  const amounts: Record<string, number | null> = {
    enkelt: sel?.amount ?? null,
    fuld: sel?.packageAmount ?? null,
    erhverv: null,
  };
  const pest = sel?.pestLabel.toLowerCase();
  // A pest he only prices after a conversation would fill all three cards with
  // "Efter en snak". Say it once, with his reason, and offer the way forward.
  const [slug] = useChosenPest(PRICED_PESTS[0].slug);
  const chosen = PRICED_PESTS.find((p) => p.slug === slug);
  const row = chosen?.priceKey ? OWNER_PRICES[chosen.priceKey] : undefined;
  const quoted = row?.kind === "quote" ? row : null;
  const rows = diffOnly ? ROWS.filter((r) => !isSame(r.values)) : ROWS;

  return (
    <section id="packages" className="band band--ink">
      <div className="container grid12">
        <div className="head-split">
          <h2>Hvad koster det?</h2>
          <p>
            {quoted && chosen
              ? `${chosen.label} har ingen fast pakkepris. Her er hvorfor, og hvad du gør i stedet.`
              : pest
                ? `Priserne for ${pest}, som du har valgt i prisberegneren ovenfor.`
                : "Vælg dit skadedyr i prisberegneren ovenfor, så står prisen her."}
          </p>
        </div>

        {quoted && chosen ? (
          <div className="quoted">
            <div>
              <h3>{chosen.label} prissætter vi efter en snak</h3>
              <p className="quoted__why">{quoted.why}</p>
            </div>
            <div className="quoted__side">
              {quoted.inspection ? (
                <>
                  <p className="quoted__price">{dkr(quoted.inspection.price)}</p>
                  <p className="quoted__note">{quoted.inspection.text}. Derefter en fast pris, før vi går i gang.</p>
                </>
              ) : (
                <p className="quoted__note">
                  Skriv kort, hvad du har set, eller send et billede. Så får du en fast pris, før vi går i gang.
                </p>
              )}
              <Cta href={CONTACT_HREF} variant="primary" fullWidth>
                Skriv til os om {chosen.label.toLowerCase()}
              </Cta>
              <a href="#estimator" className="quoted__other">Vælg et andet skadedyr</a>
            </div>
          </div>
        ) : (
        <div className="tiers">
          {TIERS.map((t) => (
            <div key={t.id} className="tier" data-featured={t.featured || undefined}>
              <h3>{t.name}</h3>
              {/* The recommendation is a word and the filled button, never a
                  different colour of card. */}
              {t.featured && <p className="tier__note">Anbefalet</p>}
              <p className="tier__price">
                {amounts[t.id] ? (
                  <>
                    <strong>{amounts[t.id]!.toLocaleString("da-DK")}</strong>
                    <span className="muted">kr.</span>
                  </>
                ) : (
                  <strong className="words">{t.id === "erhverv" ? "Efter aftale" : "Efter en snak"}</strong>
                )}
              </p>
              {/* The number belongs to the pest chosen above, so the card names it. */}
              <p className="tier__note">
                {pest && t.id !== "erhverv" ? `${sel!.pestLabel}: ${t.fromLabel.toLowerCase()}` : t.fromLabel}
              </p>
              <p className="tier__desc">{t.desc}</p>
              <Cta href={CONTACT_HREF} variant={t.featured ? "primary" : "secondary"} fullWidth>
                Få et uforpligtende tilbud
              </Cta>
            </div>
          ))}
        </div>
        )}

        <div className="matrix">
          <div className="matrix__head">
            <h3>Hvad er forskellen?</h3>
            <ToggleButton
              // Desktop-only: on a phone the same job is done by folding the
              // whole matrix away.
              isSelected={diffOnly}
              onChange={setDiffOnly}
              className="btn btn--secondary matrix__toggle"
            >
              Vis kun forskelle
            </ToggleButton>
          </div>

          {/* Phones: the tiers as ruled lists, folded by default so it costs no
              scrolling to skip. */}
          <Disclosure.Root className="matrix__mobile">
            <Disclosure.Heading>
              <Disclosure.Trigger className="disclosure-trigger">
                <span>Se hvad der er med i hver pakke</span>
                <ChevronDown size={20} aria-hidden="true" className="chev" />
              </Disclosure.Trigger>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body>
                {TIERS.map((t, i) => (
                  <div key={t.id} className="tier-rows">
                    <h4 className="trigger-title">{t.name}</h4>
                    <dl>
                      {rows.map((r) => (
                        <div key={r.label}>
                          <dt>{r.label}</dt>
                          <dd>
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

          <div className="matrix__desktop">
            <table>
              <caption className="visually-hidden">Sammenligning af de tre pakker</caption>
              <thead>
                <tr>
                  <th scope="col">Indhold</th>
                  {TIERS.map((t) => (
                    <th key={t.id} scope="col">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <MatrixRow key={r.label} label={r.label} values={r.values} hidden={diffOnly && isSame(r.values)} />
                ))}
              </tbody>
            </table>
            {diffOnly && (
              <p className="small muted" style={{ marginTop: "var(--space-sm)" }}>
                {ROWS.length - rows.length} punkter er ens i alle tre pakker og er derfor skjult.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
