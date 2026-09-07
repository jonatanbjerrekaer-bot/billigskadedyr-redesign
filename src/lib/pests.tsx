import type { ComponentType, CSSProperties } from "react";
import { BedBug } from "../components/icons/PestIcons";

/**
 * One registry for every pest that appears in the UI, so the quick-select grid
 * and the calculator dropdown cannot drift apart. `label` is the display name;
 * `priceKey` is the row in PRICE_TABLE (they used to be different strings,
 * which is how the two lists ended up disagreeing).
 */

// ponytail: optical, not literal. The Flaticon PNGs are flat outlines that read
// lighter than lucide's 2px stroke at the same box size, so the SVGs are drawn
// thinner and the PNGs a touch larger until the two weights match by eye.
// Tune here, not per component.
const SVG_STROKE = 1.75;

export type PestEntry = {
  slug: string;
  label: string;
  /** Row in PRICE_TABLE, when this pest has a professional price. */
  priceKey?: string;
  png?: string;
  /** Everyday words a customer might type instead of the label. Nobody
      searches for "klannere"; they search for a beetle, or for holes in
      their jumpers. Matched by the search field, never rendered. */
  aliases?: string[];
  /** Icon filename under public/pests, when it is not one of the webp
      masks. His own service SVGs arrive this way. */
  icon?: string;
  /** Hidden from the quick-select grid, still priced in the calculator. */
  gridHidden?: boolean;
  /** Optical size correction, 1 = no change. Derived, see note above. */
  scale?: number;
  /** What the treatment actually consists of, for the price breakdown. */
  treatment?: string;
  Svg?: ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
    style?: CSSProperties;
  }>;
};

export const PESTS: PestEntry[] = [
  { slug: "myrer", treatment: "Behandling af reder og adgangsveje", label: "Myrer", priceKey: "Myrer", png: "ant", scale: 0.96, aliases: ["myre", "myrer", "myretue", "myrebo", "ants", "ant", "sorte myrer", "røde myrer", "små sorte insekter", "kryb i køkkenet", "myrer på terrassen", "myrer under fliser", "myrestier", "sukkermyre", "pharaomyre", "skovmyre", "havemyre", "engmyre", "myrer i huset", "kravl", "krible krable"] },
  {
    slug: "edderkopper", treatment: "Behandling af kroge, hjørner og vindueskarme",
    label: "Edderkopper",
    priceKey: "Edderkopper",
    png: "spider",
    scale: 1.05,
    aliases: ["stankelben", "stankelbenslarve", "edderkop", "edderkopper", "spider", "spindelvæv", "spind", "otte ben", "langbenet", "korsedderkop", "husedderkop", "kælderedderkop", "vandredderkop", "store edderkopper", "edderkopper i kælderen", "stankelbensedderkop", "mange ben"],
  },
  {
    slug: "hvepse", treatment: "Fjernelse af bo og efterbehandling af hulrummet",
    label: "Hvepse & bier",
    priceKey: "Hvepse (bo)",
    png: "bee",
    scale: 0.97,
    aliases: ["hveps", "hvepse", "hvepsebo", "bi", "bier", "gedehams", "gedehamse", "bo", "rede", "sværm", "stik", "stukket", "wasp", "bee", "hornet", "bo under tagsten", "bo på loftet", "bo i hækken", "jordbi", "murbi", "honningbi", "humlebi", "hvepse i skunken", "flyvende insekter der stikker"],
  },
  {
    slug: "vaeggelus", treatment: "Behandling af senge, møbler og fodpaneler",
    label: "Væggelus",
    priceKey: "Væggelus",
    Svg: BedBug,
    scale: 1.05,
    aliases: ["væggelus", "veggelus", "bedbugs", "bed bugs", "bedbug", "stik i sengen", "bid om natten", "bidt om natten", "seng", "madras", "sengekant", "blodpletter på lagen", "kløe om natten", "utøj i sengen", "hotel", "rejse", "små brune insekter i sengen"],
  },
  {
    slug: "soelvfisk", treatment: "Behandling af fugtzoner, revner og fodpaneler",
    label: "Skægkræ & sølvfisk",
    priceKey: "Skægkræ/sølvfisk",
    icon: "skaegkrae.svg",
    aliases: ["sølvfisk", "solvfisk", "skægkræ", "skaegkrae", "sølvkræ", "sølvfisk i badeværelset", "hurtige insekter", "hurtigt kryb", "fugt", "badeværelse", "bryggers", "kælder", "under vasken", "silverfish", "sølvgrå insekter", "papirfisk", "insekter ved afløb", "lange følehorn", "insekter om natten på gulvet"],
  },
  {
    slug: "borebiller", treatment: "Behandling af det angrebne træværk",
    label: "Borebiller",
    priceKey: "Borebiller",
    png: "beetle",
    scale: 1.13,
    aliases: ["bille", "biller", "beetle", "borebille", "borebiller", "træorm", "orm i træ", "huller i træ", "huller i møbler", "bjælker", "spær", "gammelt træ", "boremel", "træstøv", "savsmuld", "møbelangreb", "husbukke", "træskadedyr", "loftsbjælker", "trægulv", "woodworm", "orm"],
  },
  {
    slug: "kakerlakker", treatment: "Gelbehandling af køkken, skjul og afløb",
    label: "Kakerlakker",
    priceKey: "Kakerlakker",
    png: "cockroach",
    scale: 0.9,
    aliases: ["kakerlak", "kakerlakker", "kakkerlak", "kakkerlakker", "cockroach", "roach", "brune biller", "biller i køkkenet", "natdyr", "insekter bag komfuret", "bag køleskabet", "køkken", "restaurant", "storkøkken", "tyskere", "brune insekter der løber", "insekter om natten i køkkenet", "hurtige brune biller"],
  },
  { slug: "fluer", treatment: "Behandling af hvilesteder og indflyvningsveje", label: "Fluer", png: "fluer", scale: 1.02, aliases: ["flue", "fluer", "flies", "fly", "spyflue", "kødflue", "stueflue", "bananflue", "frugtflue", "eddikeflue", "summen", "mange fluer", "fluer i vindueskarmen", "fluer på loftet", "klyngeflue", "fluer om efteråret", "maddiker", "larver i skraldespanden", "insekter omkring frugt"] },
  { slug: "gaasebiller", treatment: "Behandling af plænen mod larverne i rodzonen", label: "Gåsebiller", icon: "gaasebiller.svg", aliases: ["bille", "biller", "beetle", "gåsebille", "gaasebille", "gåsebiller", "stankelben", "stankelbenslarver", "stankelbenslarve", "oldenborre", "oldenborrer", "engerling", "engerlinger", "larver i plænen", "larver i græsset", "larver", "hvide larver", "krumme larver", "død plæne", "gule pletter", "brune pletter i plænen", "plænen slipper", "græsset ruller op", "fugle hakker i plænen", "krager i plænen", "råger", "muldvarpeskud eller larver", "plæne", "græsplæne", "græs der dør"] },
  { slug: "moel", treatment: "Behandling af skabe, tekstiler og fødevareskabe", label: "Møl", icon: "moel.svg", aliases: ["møl", "moel", "mol", "moth", "huller i tøjet", "huller i trøjen", "tøj", "uld", "uldtøj", "uldtæppe", "melmøl", "klædemøl", "pelsmøl", "rugmøl", "larver i skabet", "møl i mel", "spind i mel", "spind i posen", "klædeskab", "garderobe", "sommerfugle indendørs", "små sommerfugle", "insekter i melposen", "genbrugstøj"] },
  { slug: "myg", treatment: "Behandling af ynglesteder og indflyvningsveje", label: "Myg", png: "mosquito", aliases: ["myg", "mosquito", "moskito", "stikmyg", "dansemyg", "kvægmyg", "mitter", "stik", "myggestik", "sværm", "sværme", "stikkende insekter", "myg i haven", "myg på terrassen", "myg i soveværelset", "regnvandstønde", "stillestående vand", "vandtønde", "sø", "insekter der stikker om aftenen", "kløende buler"] },
  { slug: "klannere", treatment: "Behandling af tæpper, tekstiler og revner", label: "Klannere", icon: "klannere.svg", aliases: ["bille", "biller", "beetle", "klanner", "klannere", "pelsklanner", "museumsbille", "tæppebille", "små biller i vindueskarmen", "biller i vindueskarmen", "behåret larve", "hårede larver", "larvehuder", "huller i tøjet", "huller i tæppet", "tæppe", "uld", "pels", "fjer", "dyner", "puder", "polstrede møbler", "udstoppede dyr", "carpet beetle", "små runde biller", "larver under fodlisten"] },
  { slug: "snegle", treatment: "Behandling af bede, kanter og fugtige skjul", label: "Snegle", icon: "snegle.svg", aliases: ["snegl", "snegle", "dræbersnegl", "dræbersnegle", "draebersnegl", "iberisk skovsnegl", "agersnegl", "vinbjergsnegl", "slug", "snail", "slim", "slimspor", "æder mine planter", "spist salat", "huller i bladene", "bed", "køkkenhave", "have", "planter ædt", "røde snegle", "sorte snegle", "snegle i bedet"] },
  { slug: "muldvarpe", treatment: "Bekæmpelse i gangsystemet under plænen", label: "Muldvarpe", icon: "muldvarpe.svg", aliases: ["muldvarp", "muldvarpe", "mole", "muldskud", "muldvarpeskud", "skud i plænen", "jordbunker", "bunker af jord", "mosegris", "vandrotte", "gange i plænen", "huller i plænen", "ujævn plæne", "plæne", "græsplæne", "gnavet rødder", "planter visner", "løg ædt", "gulerødder ædt", "dyr under jorden", "gravende dyr"] },
];

/** The subset shown in the quick-select grid. */
export const GRID_PESTS = PESTS.filter((p) => !p.gridHidden);

/** The subset the calculator can actually price. */
export const PRICED_PESTS = PESTS.filter((p) => p.priceKey);

export function pestBySlug(slug: string): PestEntry | undefined {
  return PESTS.find((p) => p.slug === slug);
}

/**
 * Renders a pest glyph at a normalised weight. PNGs are painted through a CSS
 * mask so `currentColor` tints them exactly like the SVGs — a filter can only
 * force pure white or black.
 */
export function PestGlyph({
  pest,
  size = 28,
  className,
}: {
  pest: PestEntry;
  size?: number;
  className?: string;
}) {
  const scale = pest.scale ?? 1;

  if (pest.Svg) {
    const Svg = pest.Svg;
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className ?? ""}`}
        style={{ width: size, height: size }}
      >
        <Svg size={size} strokeWidth={SVG_STROKE} style={{ transform: `scale(${scale})` }} />
      </span>
    );
  }
  const file = pest.icon ?? `${pest.png}.webp`;
  const url = `url(${import.meta.env.BASE_URL}pests/${file})`;
  return (
    <span
      aria-hidden="true"
      className={`bg-current shrink-0 ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        transform: `scale(${scale})`,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
