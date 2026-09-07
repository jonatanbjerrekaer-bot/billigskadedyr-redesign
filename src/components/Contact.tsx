import InquiryForm from "./InquiryForm";
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

/**
 * The page's one contact form, and the anchor target of every "Skriv til os"
 * button on the page. The copy states what we know instead of asking: the
 * estimator reports whether the visitor actually used it, and only then is
 * the message prefilled with a draft. Defaults alone never prefill; a draft
 * that describes a situation the visitor never told us would read as a trick
 * on a form whose whole job is trust.
 */
export default function Contact({ pestLabel }: { pestLabel?: string } = {}) {
  const selection = useEstimatorSelection();
  const touched = selection?.touched ?? false;

  // Only a visitor who used the calculator gets the full sentence. The
  // defaults must never describe a home nobody described.
  const draft = touched && selection
    ? `Hej! Jeg har brug for hjælp til ${selection.pestLabel.toLowerCase()} i ${PROPERTY_NOUN[selection.property]} på ca. ${selection.m2} m². Angrebet er ${SEVERITY_ADVERB[selection.severity]}, og prisberegneren siger omkring ${selection.price.replace(/\.$/, "")}. Jeg vil gerne have et fast tilbud.`
    : pestLabel
      // Opening this page is the visitor naming the pest, so the draft
      // names it back and stops there. Everything else still waits for
      // the estimator to be used.
      ? `Hej! Jeg har brug for hjælp til ${pestLabel.toLowerCase()}. Jeg vil gerne have et fast tilbud.`
      : "";

  return (
    <section id="skriv" className="bg-ink-950 text-cream py-12 sm:py-16 scroll-mt-16">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight uppercase text-center">
          Skriv til os
        </h2>
        <p className="mt-3 text-center text-sm text-ink-100/80">
          {touched
            ? "Beskedfeltet er udfyldt ud fra det, du har regnet på i prisberegneren. Læs det gerne igennem, og ret det, hvis der står noget galt. Vi svarer inden for en hverdag, og prisen ligger fast, før vi går i gang."
            : pestLabel
              ? "Beskeden er skrevet ud fra den side, du står på. Skriv gerne til, hvad du har set, og hvor i boligen det er. Vi svarer inden for en hverdag, og prisen ligger fast, før vi går i gang."
              : "Skriv en besked nedenfor, så vender vi tilbage inden for en hverdag. Prisen ligger fast, før vi går i gang."}
        </p>
        <div className="mt-8 bg-ink-800 rounded-2xl p-5 sm:p-6">
          <InquiryForm draft={draft} />
        </div>
      </div>
    </section>
  );
}
