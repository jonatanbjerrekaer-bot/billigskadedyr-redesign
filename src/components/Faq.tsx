import { Disclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { homeHref } from "./ui/Cta";

/**
 * Answers are written for search as well as for readers: each one opens with
 * the question's own keywords in plain Danish ("skadedyrsbekæmpelse i Aarhus",
 * "hvad koster en skadedyrsbekæmper"), because FAQ answers are what Google
 * lifts into featured snippets. Kept to 2-4 sentences for the same reason.
 *
 * The first entry carries the site's one-treatment positioning: a single
 * professional treatment is enough in the vast majority of cases, and a rare
 * second one is still cheaper than the competitors'.
 */
type FaqItem = { q: string; a: string; cta?: { href: string; label: string } };

const ITEMS: FaqItem[] = [
  {
    q: "Hvornår skal jeg kontakte en professionel skadedyrsbekæmper?",
    a: "Kontakt os, når problemet vender tilbage, når du ikke kan finde kilden, eller når det gælder rotter, væggelus eller borebiller. De kræver godkendte midler, adgang til hulrum og dokumentation. Én professionel behandling er nok i langt de fleste tilfælde — og skulle der mod forventning være brug for endnu en, er den stadig billigere end hos konkurrenterne.",
    cta: { href: "#pest", label: "Find dit skadedyr" },
  },
  {
    q: "Hvor hurtigt kan I komme?",
    a: "Vi kører ud i hele Jylland og på Fyn, og vi udvider løbende dækningsområdet. Hvor hurtigt vi kan komme, afhænger af opgaven, sæsonen og hvor du bor, så du får altid en ærlig vurdering, når du kontakter os. Er det akut, for eksempel et hvepsebo tæt på en indgang, så skriv eller ring på 24 24 55 83, så finder vi den hurtigste løsning.",
    cta: { href: "#skriv", label: "Skriv til os" },
  },
  {
    q: "Hvad koster skadedyrsbekæmpelse?",
    a: "Prisen afhænger af hvilket skadedyr det er, hvor stort området er, og hvor længe angrebet har stået på. Du kan få et vejledende prisoverslag med det samme i prisberegneren her på siden. Den endelige, bundne pris får du efter en kort samtale, og den ændrer sig ikke undervejs. Skriv til os, så vender vi tilbage inden for en hverdag.",
    cta: { href: "#estimator", label: "Beregn en vejledende pris" },
  },
  {
    q: "Dækker I der, hvor jeg bor?",
    a: "Vi hjælper kunder i hele Jylland og på Fyn, og vi arbejder løbende på at udvide dækningsområdet. Er du i tvivl, om vi dækker din adresse, så skriv til os. Er I flere husstande i samme område, der ønsker behandling, kan vi som regel finde en fornuftig samlet løsning.",
    cta: { href: "#skriv", label: "Spørg om din adresse" },
  },
  {
    q: "Hvem kommer hjem til mig?",
    a: "Daniel Nemborg overtog virksomheden af sin far i 2017 og har knap 20 års praktisk erfaring. Vi arbejder efter gældende lovgivning og har de autorisationer, der kræves til de enkelte behandlinger.",
  },
  {
    q: "Må jeg være hjemme under behandlingen?",
    a: "I de fleste tilfælde ja. Ved enkelte behandlinger skal boligen luftes ud i et par timer bagefter. Vi fortæller dig altid i forvejen, om du skal være til stede, hvor lang tid behandlingen tager, og hvornår rummene kan bruges igen.",
  },
  {
    q: "Er midlerne sikre for børn og husdyr?",
    a: "Ja. Vi bruger kun godkendte midler og følger de danske regler for professionel skadedyrsbekæmpelse. Du får konkret vejledning i, hvor længe børn og husdyr skal holdes væk fra det behandlede område, og hvordan du rengør bagefter.",
  },
  {
    q: "Hvad sker der, hvis skadedyret vender tilbage?",
    a: "Vi følger op på behandlingen, og du kan altid ringe, hvis du ser tegn på skadedyret igen. Kontakt os hellere for tidligt end for sent. Jo før vi ser det, jo mindre bliver indsatsen.",
    cta: { href: "#packages", label: "Se hvad pakkerne dækker" },
  },
];

export default function Faq({
  items,
  title,
  intro,
}: { items?: FaqItem[]; title?: string; intro?: string } = {}) {
  const list = items?.length ? items : ITEMS;
  return (
    <section id="faq" className="section">
      <div className="container grid12">
        <div className="faq__head">
          <h2>{title ?? "Ofte stillede spørgsmål"}</h2>
          <p>{intro ?? "Om priser, sikkerhed og hvornår det kan betale sig at få professionel hjælp."}</p>
        </div>

        <div className="faq__list">
          {list.map((item) => (
            <Disclosure.Root key={item.q} className="faq__item">
              <Disclosure.Heading>
                <Disclosure.Trigger className="disclosure-trigger">
                  <span className="trigger-title">{item.q}</span>
                  <Plus size={22} strokeWidth={2} aria-hidden="true" className="plus" />
                </Disclosure.Trigger>
              </Disclosure.Heading>
              <Disclosure.Content>
                <Disclosure.Body className="faq__body">
                  <p>{item.a}</p>
                  {/*
                    An answer that ends in a full stop makes the reader go and
                    find the relevant section themselves. Where there is an
                    obvious next step, it belongs in the answer. The safety
                    questions get no link: someone asking whether the poison is
                    safe around their child is not looking for a button.
                  */}
                  {item.cta && (
                    <a href={homeHref(item.cta.href)} className="link">
                      {item.cta.label}
                    </a>
                  )}
                </Disclosure.Body>
              </Disclosure.Content>
            </Disclosure.Root>
          ))}
        </div>
      </div>
    </section>
  );
}
