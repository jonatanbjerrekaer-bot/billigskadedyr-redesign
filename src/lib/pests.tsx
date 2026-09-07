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
  { slug: "myrer", treatment: "Behandling af reder og adgangsveje", label: "Myrer", priceKey: "Myrer", png: "ant", scale: 0.96 },
  { slug: "skaegkrae", treatment: "Behandling af fugtzoner, revner og fodpaneler", label: "Skægkræ", priceKey: "Skægkræ/sølvfisk", icon: "skaegkrae.svg" },
  {
    slug: "hvepse", treatment: "Fjernelse af bo og efterbehandling af hulrummet",
    label: "Hvepse & bier",
    priceKey: "Hvepse (bo)",
    png: "bee",
    scale: 0.97,
  },
  {
    slug: "vaeggelus", treatment: "Behandling af senge, møbler og fodpaneler",
    label: "Væggelus",
    priceKey: "Væggelus",
    Svg: BedBug,
    scale: 1.05,
  },
  {
    slug: "soelvfisk", treatment: "Behandling af fugtzoner, revner og fodpaneler",
    label: "Skægkræ & sølvfisk",
    priceKey: "Skægkræ/sølvfisk",
    png: "silverfish",
    scale: 1.0,
  },
  {
    slug: "borebiller", treatment: "Behandling af det angrebne træværk",
    label: "Borebiller",
    priceKey: "Borebiller",
    png: "beetle",
    scale: 1.13,
  },
  {
    slug: "kakerlakker", treatment: "Gelbehandling af køkken, skjul og afløb",
    label: "Kakerlakker",
    priceKey: "Kakerlakker",
    png: "cockroach",
    scale: 0.9,
  },
  { slug: "fluer", label: "Fluer & myg", png: "mosquito", scale: 1.06 },
  // gridHidden keeps the grid at a clean 4x2 rather than orphaning a ninth
  // card alone on a third row.
  {
    slug: "edderkopper", treatment: "Behandling af kroge, hjørner og vindueskarme",
    label: "Edderkopper",
    priceKey: "Edderkopper",
    png: "spider",
    scale: 1.05,
    gridHidden: true,
  },
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
