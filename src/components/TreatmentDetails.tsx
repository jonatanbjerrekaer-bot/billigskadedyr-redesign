import { Disclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { treatmentFor } from "../lib/treatments";
import type { TreatmentDetails as TreatmentDetailsModel } from "../lib/treatments";

/**
 * The collapsed "Sådan udfører vi behandlingen" section on every service and
 * species page. The reader can see exactly what a visit involves — inspection,
 * method, aftercare — before writing to us, in the owner's own professional
 * wording. Protected or harmless species (assessmentOnly) lead with the
 * vurdering instead of a method.
 *
 * On a service page it renders as its own ruled section in the 12-column
 * grid. On a species page it renders bare inside the article column, where a
 * nested container grid would break the layout.
 */
export default function TreatmentDetails({
  service,
  speciesSlug,
  bare = false,
}: {
  service: string;
  speciesSlug?: string;
  bare?: boolean;
}) {
  const details = treatmentFor(service, speciesSlug);
  if (!details) return null;

  const heading = details.assessmentOnly ? "Vores vurdering" : "Sådan udfører vi behandlingen";
  const body = <TreatmentAccordion details={details} />;

  if (bare) {
    return (
      <div className="treatment treatment--bare">
        <div className="treatment__head">
          <h2>{heading}</h2>
          <p>{details.intro}</p>
        </div>
        {body}
      </div>
    );
  }

  return (
    <section className="section treatment" aria-label={heading}>
      <div className="container grid12">
        <div className="treatment__head">
          <h2>{heading}</h2>
          <p>{details.intro}</p>
        </div>
        {body}
      </div>
    </section>
  );
}

function TreatmentAccordion({ details }: { details: TreatmentDetailsModel }) {
  return (
    <Disclosure.Root className="treatment__item">
      <Disclosure.Heading>
        <Disclosure.Trigger className="disclosure-trigger">
          <span className="trigger-title">Se præcis, hvad vi gør</span>
          <Plus size={22} strokeWidth={2} aria-hidden="true" className="plus" />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="faq__body">
          <ol className="treatment__steps">
            {details.steps.map((step) => (
              <li key={step.slice(0, 40)}>{step}</li>
            ))}
          </ol>
          {details.aftercare && details.aftercare.length > 0 && (
            <>
              <h3 className="treatment__aftercare-title">Efter behandlingen</h3>
              <ul className="treatment__aftercare">
                {details.aftercare.map((note) => (
                  <li key={note.slice(0, 40)}>{note}</li>
                ))}
              </ul>
            </>
          )}
          {!details.assessmentOnly && (
            <p className="small muted treatment__note">
              Én professionel behandling er nok i langt de fleste tilfælde. Skulle der mod forventning
              være brug for endnu en, er den stadig billigere end hos konkurrenterne.
            </p>
          )}
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure.Root>
  );
}
