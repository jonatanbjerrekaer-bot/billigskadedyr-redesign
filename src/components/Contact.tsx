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
 * button on the page. Kept out of the estimator panel on purpose: the panel
 * is for arriving at a number, this is for acting on it.
 */
export default function Contact() {
  const selection = useEstimatorSelection();

  // A starting point, not a blank page: the placeholder drafts the message
  // from the visitor's own answers in the calculator above, so writing the
  // mail is editing, not composing. It tracks the live selections.
  const placeholder = selection
    ? `Hej! Jeg har brug for hjælp til ${selection.pestLabel.toLowerCase()} i ${PROPERTY_NOUN[selection.property]} på ca. ${selection.m2} m². Angrebet er ${SEVERITY_ADVERB[selection.severity]}, og prisberegneren siger omkring ${selection.price}. Jeg vil gerne have et fast tilbud.`
    : "Hej! Jeg har brug for hjælp til et skadedyrsproblem. Jeg vil gerne have et fast tilbud.";

  return (
    <section id="skriv" className="bg-ink-950 text-cream py-12 sm:py-16 scroll-mt-16">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight uppercase text-center">
          Skriv til os
        </h2>
        <p className="mt-3 text-center text-sm text-ink-100/80">
          Beskedfeltet herunder tager udgangspunkt i det, du har regnet på i prisberegneren. Ret i
          det, eller skriv dit eget. Vi svarer inden for en hverdag, og prisen ligger fast, før vi
          går i gang.
        </p>
        <div className="mt-8 bg-ink-800 rounded-2xl p-5 sm:p-6">
          <InquiryForm placeholder={placeholder} />
        </div>
      </div>
    </section>
  );
}
