import { Disclosure } from "@heroui/react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { ARTICLES } from "../lib/articles";

/**
 * Answers are written for search as well as for readers: each one opens with
 * the question's own keywords in plain Danish ("skadedyrsbekæmpelse i Aarhus",
 * "hvad koster en skadedyrsbekæmper"), because FAQ answers are what Google
 * lifts into featured snippets. Kept to 2-4 sentences for the same reason.
 *
 * The DIY-vs-professional entry is a Danish take on
 * gogreenpestcontrol.com/professional-vs-diy-pest-control/ — same decision
 * framing (cost, safety, recurrence), written from scratch for a Danish reader.
 */
type FaqItem = { q: string; a: string; cta?: { href: string; label: string } };

const ITEMS: FaqItem[] = [
  {
    q: "Skal jeg vælge gør-det-selv eller en professionel skadedyrsbekæmper?",
    a: "Gør-det-selv virker bedst på små, tidlige angreb: enkelte myrer, fluer eller et par sølvfisk. Her koster de rette midler typisk under 200 kr., og du kan handle med det samme. Professionel skadedyrsbekæmpelse betaler sig, når problemet er vendt tilbage mere end én gang, når du ikke kan finde reden, eller når det gælder rotter, væggelus eller borebiller. De kræver godkendte midler, adgang til hulrum og dokumentation. Et halvt udført forsøg gør ofte problemet dyrere at løse bagefter.",
    cta: { href: "#router", label: "Se de to muligheder" },
  },
  {
    q: "Hvor hurtigt kan I komme?",
    a: "Vi kører ud i hele Jylland og på Fyn, og vi udvider løbende dækningsområdet. Hvor hurtigt vi kan komme, afhænger af opgaven, sæsonen og hvor du bor, så du får altid en ærlig vurdering, når du kontakter os. Er det akut, for eksempel rotter indendørs eller et hvepsebo tæt på en indgang, så skriv eller ring på 24 24 55 83, så finder vi den hurtigste løsning.",
    cta: { href: "mailto:info@billigskadedyr.dk", label: "Skriv til os" },
  },
  {
    q: "Hvad koster skadedyrsbekæmpelse?",
    a: "Prisen afhænger af hvilket skadedyr det er, hvor stort området er, og hvor længe angrebet har stået på. Du kan få et vejledende prisoverslag med det samme i prisberegneren her på siden. Den endelige, bundne pris får du efter en kort samtale, og den ændrer sig ikke undervejs. Skriv til os, så vender vi tilbage inden for 24 timer på hverdage.",
    cta: { href: "#estimator", label: "Beregn en vejledende pris" },
  },
  {
    q: "Dækker I der, hvor jeg bor?",
    a: "Vi hjælper kunder i hele Jylland og på Fyn, og vi arbejder løbende på at udvide dækningsområdet. Er du i tvivl, om vi dækker din adresse, så skriv til os. Er I flere husstande i samme område, der ønsker behandling, kan vi som regel finde en fornuftig samlet løsning.",
    cta: { href: "mailto:info@billigskadedyr.dk", label: "Spørg om din adresse" },
  },
  {
    q: "Hvem kommer hjem til mig?",
    a: "Virksomheden blev grundlagt af Daniels far, og i 2017 overtog Daniel Nemborg den ved et generationsskifte. Han fik sit første job som skadedyrsbekæmper som 12-årig og har i dag knap 20 års praktisk erfaring med alt fra myrer og mus til rotter, væggelus og skægkræ. Vi arbejder efter gældende lovgivning og råder over de nødvendige autorisationer til de behandlinger, hvor det er påkrævet.",
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
    a: "Vi følger op på behandlingen. Ser du tegn på skadedyret igen inden for garantiperioden, kommer vi tilbage og kigger på det uden ekstra regning. Kontakt os hellere for tidligt end for sent. Jo før vi ser det, jo mindre bliver indsatsen.",
    cta: { href: "#packages", label: "Se hvad pakkerne dækker" },
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-cream py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 uppercase mb-2">
          Ofte stillede spørgsmål
        </h2>
        <p className="text-ink-900/70 mb-8 max-w-2xl">
          Om priser, sikkerhed og hvornår det kan betale sig at ringe efter en professionel.
        </p>

        <div className="flex flex-col gap-3 max-w-3xl">
          {ITEMS.map((item) => (
            <Disclosure.Root
              key={item.q}
              className="bg-white rounded-xl border border-ink-100 overflow-hidden"
            >
              <Disclosure.Heading>
                <Disclosure.Trigger className="group w-full text-left cursor-pointer flex items-center justify-between gap-3 px-5 py-4 min-h-[44px] font-medium text-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-inset">
                  <span>{item.q}</span>
                  <Plus
                    size={20}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="text-accent-700 shrink-0 transition-transform duration-200 group-aria-expanded:rotate-45"
                  />
                </Disclosure.Trigger>
              </Disclosure.Heading>
              <Disclosure.Content>
                <Disclosure.Body className="px-5 pb-4 text-sm text-ink-900/80 leading-relaxed">
                  <p>{item.a}</p>
                  {/*
                    An answer that ends in a full stop makes the reader go and
                    find the relevant section themselves. Where there is an
                    obvious next step, it belongs in the answer, at the moment
                    the question is resolved. The safety questions get no CTA:
                    someone asking whether the poison is safe around their
                    child is not looking for a button.
                  */}
                  {item.cta && (
                    <a
                      href={item.cta.href}
                      className="mt-3 inline-flex items-center gap-1.5 min-h-[44px] text-sm font-semibold text-ink-900 underline underline-offset-4 hover:text-accent-700"
                    >
                      {item.cta.label}
                      <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                  )}
                </Disclosure.Body>
              </Disclosure.Content>
            </Disclosure.Root>
          ))}
        </div>

        {/*
          Guides, kept as a second group rather than mixed into the FAQ above.
          Those six answer "should I buy" questions; these answer "how do I deal
          with this pest" questions, which is a different visit and a different
          search. Each title is the article's own H1, which is the phrasing
          people actually search for, and each answer opens with the article's
          own first lines so the page carries real indexable text rather than a
          bare list of links.
        */}
        <h3 className="font-display text-2xl font-bold tracking-tight text-ink-900 uppercase mt-14 mb-2">
          Guides til de enkelte skadedyr
        </h3>
        <p className="text-ink-900/70 mb-6 max-w-2xl">
          Uddrag af artiklerne fra billigskadedyr.dk. Klik videre for at læse hele guiden.
        </p>

        <div className="flex flex-col gap-3 max-w-3xl">
          {ARTICLES.map((a) => (
            <Disclosure.Root
              key={a.slug}
              className="bg-white rounded-xl border border-ink-100 overflow-hidden"
            >
              <Disclosure.Heading>
                <Disclosure.Trigger className="group w-full text-left cursor-pointer flex items-center justify-between gap-3 px-5 py-4 min-h-[44px] font-medium text-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-inset">
                  <span>{a.title}</span>
                  <Plus
                    size={20}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="text-accent-700 shrink-0 transition-transform duration-200 group-aria-expanded:rotate-45"
                  />
                </Disclosure.Trigger>
              </Disclosure.Heading>
              <Disclosure.Content>
                <Disclosure.Body className="px-5 pb-4">
                  <p className="text-sm text-ink-900/80 leading-relaxed">{a.intro}</p>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 min-h-[44px] text-sm font-semibold text-ink-900 underline underline-offset-4 hover:text-accent-700"
                  >
                    Læs hele artiklen
                    <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
                  </a>
                </Disclosure.Body>
              </Disclosure.Content>
            </Disclosure.Root>
          ))}
        </div>
      </div>
    </section>
  );
}
