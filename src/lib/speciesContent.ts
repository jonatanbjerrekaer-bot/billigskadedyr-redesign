import gaasebiller from "./species/gaasebiller";
import moel from "./species/moel";
import myg from "./species/myg";
import klannere from "./species/klannere";
import snegle from "./species/snegle";
import muldvarpe from "./species/muldvarpe";
import myrer from "./species/myrer";
import hvepse from "./species/hvepse";
import vaeggelus from "./species/vaeggelus";
import soelvfisk from "./species/soelvfisk";
import borebiller from "./species/borebiller";
import kakerlakker from "./species/kakerlakker";
import fluer from "./species/fluer";
import edderkopper from "./species/edderkopper";
import musOgRotter from "./species/mus-og-rotter";
import lopper from "./species/lopper";
import flaater from "./species/flaater";
import lus from "./species/lus";
import maar from "./species/maar";
import fugle from "./species/fugle";
import vildedyr from "./species/vildedyr";
import haven from "./species/haven";

/**
 * One article per species card on a service page, so each card can lead to
 * a page of its own. The cards stay in serviceContent, written for the
 * overview; these are the long versions, kept apart so the service copy does
 * not drown in them. One file per service under ./species.
 *
 * Built from the owner's own writing first: his pro service pages, his FAQ
 * and his webshop articles (raw copies in docs/owner-copy/). His sentences
 * are kept verbatim or near-verbatim; a new sentence is only added where
 * nothing of his covers a needed point, and then it is short and sourced.
 * Every paragraph carries a provenance note (never rendered) so he can review
 * fast. Figures are only those a public source states.
 */
export type SpeciesArticle = {
  /** Exactly the name on the card in serviceContent; this is the join key. */
  name: string;
  /** The last part of /service/<service>/<slug>/. */
  slug: string;
  /** Page heading, where the card name is not one on its own ("Larven"). */
  title?: string;
  /** Scientific name, shown under the heading. */
  latin?: string;
  /** Meta description, at most about 155 characters. */
  description: string;
  sections: {
    heading: string;
    paragraphs: string[];
    /**
     * Review aid for the owner, never rendered. One entry per paragraph, in
     * the same order: "owner <url>" when the paragraph is his text verbatim
     * or lightly trimmed, "owner+new <url>" when it is his text with a short
     * added clause, "new" when written for this site from `sources`.
     */
    provenance: string[];
  }[];
  /** The public pages the facts were checked against. */
  sources: string[];
};

const BY_SERVICE: Record<string, SpeciesArticle[]> = {
  gaasebiller,
  moel,
  myg,
  klannere,
  snegle,
  muldvarpe,
  myrer,
  hvepse,
  vaeggelus,
  soelvfisk,
  borebiller,
  kakerlakker,
  fluer,
  edderkopper,
  "mus-og-rotter": musOgRotter,
  lopper,
  flaater,
  lus,
  maar,
  fugle,
  vildedyr,
  haven,
};

/** Every article for a service, in the order its cards appear. */
export function speciesOf(service: string): SpeciesArticle[] {
  return BY_SERVICE[service] ?? [];
}

/** The article behind a card, or undefined when that card has none. */
export function speciesByName(service: string, name: string): SpeciesArticle | undefined {
  return speciesOf(service).find((a) => a.name === name);
}

export function speciesBySlug(service: string, slug: string): SpeciesArticle | undefined {
  return speciesOf(service).find((a) => a.slug === slug);
}

/** Every species route as [service, slug], for anything that lists URLs. */
export function allSpeciesRoutes(): [string, string][] {
  return Object.entries(BY_SERVICE).flatMap(([service, list]) => list.map((a) => [service, a.slug] as [string, string]));
}
