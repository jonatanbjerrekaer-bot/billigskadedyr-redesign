import type { PestKey } from "../../lib/shop";

/**
 * Skadedyrsikonerne, som servicesitet bruger dem.
 *
 * Samme filer under public/pests og samme teknik: ikonet er en maske, og
 * farven kommer fra currentColor, så det følger teksten omkring sig i stedet
 * for at være et fremmedlegeme i en anden farve.
 *
 * Butikken sælger til to dyr, servicesitet ikke har en side for, mus og
 * rotter, og de manglede derfor et ikon. De to er tegnet til lejligheden i
 * samme stregtykkelse og på samme 512-grid som muldvarpen, der også blev
 * tegnet til dette site. De er tættere på hinanden, end man kunne ønske,
 * men det er mus og rotter også, og etiketten står ved siden af.
 */
const ICON: Partial<Record<PestKey, string>> = {
  mus: "mus.svg",
  rotter: "rotter.svg",
  myrer: "myrer.svg",
  fluer: "fluer.webp",
  hvepse: "bee.webp",
  moel: "moel.svg",
  edderkopper: "edderkopper.svg",
  vaeggelus: "beetle.webp",
  muldvarpe: "muldvarpe.svg",
  snegle: "snegle.svg",
  kakerlakker: "kakerlakker.svg",
  biller: "borebiller.svg",
  lopper: "klannere.svg",
};

export default function ShopGlyph({
  pest,
  size = 22,
  className,
}: {
  pest: PestKey;
  size?: number;
  className?: string;
}) {
  const file = ICON[pest];
  if (!file) return null;

  const url = `url(${import.meta.env.BASE_URL}pests/${file})`;
  return (
    <span
      aria-hidden="true"
      className={`bg-current shrink-0 ${className ?? ""}`}
      style={{
        width: size,
        height: size,
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

/** Har skadedyret et ikon? Menuen bruger det til ikke at efterlade et hul. */
export function hasGlyph(pest: PestKey): boolean {
  return ICON[pest] != null;
}
