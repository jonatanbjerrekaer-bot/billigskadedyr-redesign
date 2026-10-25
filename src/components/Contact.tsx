import InquiryForm from "./InquiryForm";
import TrustSeal from "./TrustSeal";
import { useEstimatorSelection } from "../lib/estimatorSelection";
import type { PropertyType, Severity } from "../lib/pricing";

const PROPERTY_NOUN: Record<PropertyType, string> = {
  lejlighed: "en lejlighed",
  hus: "et hus",
  erhverv: "en erhvervsejendom",
};
const SEVERITY_ADVERB: Record<Severity, string> = {
  let: "let",
  normal: "normalt",
  kraftig: "kraftigt",
};

const HOURS = [
  ["Man - Fre", "08:00 - 21:00"],
  ["Lør - Søn", "12:00 - 16:00"],
  ["Helligdage", "12:00 - 16:00"],
];

/**
 * The close, and the anchor target of every "Skriv til os" button: what it
 * takes to reach the business (mail, phone, address, hours) beside the page's
 * one contact form. The old closing band and the form section said the same
 * thing twice in a row; they are one section now.
 *
 * The copy states what we know instead of asking: the estimator reports
 * whether the visitor actually used it, and only then is the message
 * prefilled with a draft. Defaults alone never prefill; a draft that
 * describes a situation the visitor never told us would read as a trick on a
 * form whose whole job is trust.
 */
// "Vi er 5 huse i 8800 Viborg" only says what the visitor actually entered:
// a town when a postnummer matched, a group when more than one house.
function placeOf(sel: { houses: number; postcode: string | null; town: string | null }): string {
  const where = sel.postcode ? ` i ${sel.postcode} ${sel.town}` : "";
  if (sel.houses > 1) return `. Vi er ${sel.houses} huse${where}`;
  return where ? `. Boligen ligger i ${sel.postcode} ${sel.town}` : "";
}

export default function Contact({ pestLabel }: { pestLabel?: string } = {}) {
  const selection = useEstimatorSelection();
  const touched = selection?.touched ?? false;

  // Only a visitor who used the calculator gets the full sentence. The
  // defaults must never describe a home nobody described.
  const draft = touched && selection
    ? // A quoted pest has no number yet, so the sentence stops at the facts
      // he can actually give: which pest, what kind of home, how big.
      `Hej! Jeg har brug for hjælp til ${selection.pestLabel.toLowerCase()} i ${PROPERTY_NOUN[selection.property]} på ca. ${selection.m2} m²${placeOf(selection)}. ${
        selection.price
          ? `Angrebet er ${SEVERITY_ADVERB[selection.severity]}, og prisberegneren siger omkring ${selection.price.replace(/\.$/, "")}${selection.houses > 1 ? " pr. hus" : ""}. `
          : ""
      }Jeg vil gerne have et fast tilbud.`
    : pestLabel
      // Opening this page is the visitor naming the pest, so the draft
      // names it back and stops there.
      ? `Hej! Jeg har brug for hjælp til ${pestLabel.toLowerCase()}. Jeg vil gerne have et fast tilbud.`
      : "";

  return (
    <section id="skriv" className="section close">
      <div className="container grid12">
        <div className="close__facts">
          <h2>Klar til at få det løst?</h2>
          <p>
            Skriv et par linjer om, hvad du står over for. Vi svarer inden for en hverdag.
          </p>
          <dl className="close__dl">
            <div>
              <dt>E-mail</dt>
              <dd><a href="mailto:info@billigskadedyr.dk" className="select-text">info@billigskadedyr.dk</a></dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd>
                <a href="tel:+4524245583" className="select-text">24 24 55 83</a>
                <br />
                <span className="small muted">Akut og igangværende sager</span>
              </dd>
            </div>
            <div>
              <dt>Adresse</dt>
              <dd className="select-text">Viengevej 6A, 8240 Risskov</dd>
            </div>
            <div>
              <dt>Åbningstider</dt>
              <dd>
                <table className="hours">
                  <tbody>
                    {HOURS.map(([d, t]) => (
                      <tr key={d}>
                        <th scope="row">{d}</th>
                        <td className="agate">{t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>
          </dl>
          {/* The seal sits at the point of decision: someone about to write
              to a stranger about their home wants to see, in the same glance
              as the form, that the business is certified. */}
          <div className="close__seal">
            <TrustSeal variant="paper" />
          </div>
        </div>

        <div className="close__form">
          <h3>Skriv til os</h3>
          <p className="select-none">
            {touched
              ? "Beskedfeltet er udfyldt ud fra det, du har regnet på i prisberegneren. Læs det gerne igennem, og ret det, hvis der står noget galt."
              : pestLabel
                ? "Beskeden er skrevet ud fra den side, du står på. Skriv gerne til, hvad du har set, og hvor i boligen det er."
                : "Skriv en besked nedenfor, så vender vi tilbage inden for en hverdag."}
          </p>
          <InquiryForm draft={draft} />
        </div>
      </div>
    </section>
  );
}
