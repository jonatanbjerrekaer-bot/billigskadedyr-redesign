/**
 * Pest glyphs drawn on lucide's grammar so they sit beside the lucide icons
 * used elsewhere: 24x24 viewBox, currentColor stroke, 2px default weight,
 * round caps and joins, no fills.
 *
 * These exist because lucide has no wasp, cockroach, silverfish, woodworm,
 * bed bug or fly glyph, and reusing `Bug` for all of them made four different
 * pests look identical. Rotter keeps lucide's own `Rat` — it is already right.
 */

export type PestIconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
};

function Svg({
  size = 24,
  strokeWidth = 2,
  className,
  style,
  children,
}: PestIconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Myre — three body segments, six legs, two antennae. */
export function Ant(props: PestIconProps) {
  return (
    <Svg {...props}>
      <circle cx="5.5" cy="12" r="2" />
      <ellipse cx="11" cy="12" rx="2.2" ry="2.4" />
      <ellipse cx="17.8" cy="12" rx="3.8" ry="3.1" />
      <path d="M4.2 10.6 2.2 8.2M6.2 10.2 6.8 7.4" />
      <path d="M9.4 10.2 7.4 6.8M11 9.6 11 6.2M12.8 10.3 14.6 7.2" />
      <path d="M9.4 13.8 7.4 17.2M11 14.4 11 17.8M12.8 13.7 14.6 16.8" />
    </Svg>
  );
}

/** Hveps — narrow waist, striped abdomen, wings clear of the body. */
export function Wasp(props: PestIconProps) {
  return (
    <Svg {...props}>
      <circle cx="4.4" cy="14" r="1.7" />
      <path d="M3.2 12.7 1.8 10.6M5.4 12.4 5.8 10.2" />
      <ellipse cx="8.4" cy="14" rx="2.4" ry="2.2" />
      <path d="M10.6 14h1.2" />
      <path d="M12 14c0-2.4 2-4 4.6-4s4.6 1.6 4.6 4-2 4-4.6 4-4.6-1.6-4.6-4Z" />
      <path d="M15.4 10.6 15.4 17.4M18.4 11 18.4 17" />
      <path d="M8 11.6C8.6 7.4 12.6 5.6 15 7.8" />
      <path d="M9.4 11.4C11 8.6 14.6 8 16.2 9.6" />
    </Svg>
  );
}

/** Kakerlak — shield head, swept-back legs, long forward antennae. */
export function Cockroach(props: PestIconProps) {
  return (
    <Svg {...props}>
      <path d="M5.6 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z" />
      <path d="M4.4 10.8 1.2 6.6M4.4 13.2 1.2 17.4" />
      <ellipse cx="15" cy="12" rx="5.6" ry="3.6" />
      <path d="M10.4 12h10" />
      <path d="M11.6 9.2 9.6 5.8M15 8.5 14.2 4.8M18.4 9.4 19 5.8" />
      <path d="M11.6 14.8 9.6 18.2M15 15.5 14.2 19.2M18.4 14.6 19 18.2" />
    </Svg>
  );
}

/** Sølvfisk — tapered body, segment lines, three tail filaments. */
export function Silverfish(props: PestIconProps) {
  return (
    <Svg {...props}>
      <path d="M3.6 12c2.4-3.3 9.6-3.1 14.6-.4-5 2.9-12.2 3.1-14.6.4Z" />
      <path d="M8.4 10.1 8.4 13.9M12.4 10.4 12.4 13.6" />
      <path d="M18.2 11.6 22 9.2M18.6 12 22.6 12M18.2 12.4 22 14.8" />
      <path d="M3.6 12 1.2 9.6M3.6 12 1.2 14.4" />
    </Svg>
  );
}

/** Borebille — beetle seen from above, elytra seam, six legs. */
export function Beetle(props: PestIconProps) {
  return (
    <Svg {...props}>
      <ellipse cx="12" cy="5.4" rx="2" ry="1.6" />
      <ellipse cx="12" cy="8.8" rx="3.1" ry="2.1" />
      <ellipse cx="12" cy="15.2" rx="5" ry="5.8" />
      <path d="M12 9.6 12 20.9" />
      <path d="M10.6 4.2 9 2M13.4 4.2 15 2" />
      <path d="M7.4 11.6 4 9.6M7 15.2 3.4 15.2M7.4 18.6 4.4 20.8" />
      <path d="M16.6 11.6 20 9.6M17 15.2 20.6 15.2M16.6 18.6 19.6 20.8" />
    </Svg>
  );
}

/** Væggelus — flat rounded body with segment bands. */
export function BedBug(props: PestIconProps) {
  return (
    <Svg {...props}>
      <ellipse cx="12" cy="5.8" rx="1.9" ry="1.5" />
      <ellipse cx="12" cy="13.6" rx="5.6" ry="6" />
      <path d="M6.7 11.4h10.6M6.7 15.2h10.6" />
      <path d="M10.7 4.7 9 2.6M13.3 4.7 15 2.6" />
      <path d="M7.1 9.8 3.6 7.9M6.5 13.6 3 13.6M7.1 17.6 4 19.9" />
      <path d="M16.9 9.8 20.4 7.9M17.5 13.6 21 13.6M16.9 17.6 20 19.9" />
    </Svg>
  );
}

/** Flue — compact body, two broad wings. */
export function Fly(props: PestIconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="6.2" r="2.3" />
      <ellipse cx="12" cy="13.6" rx="3" ry="5.1" />
      <path d="M9.4 9.8C5 8.2 2.4 12 5.6 15.6" />
      <path d="M14.6 9.8C19 8.2 21.6 12 18.4 15.6" />
      <path d="M9.6 15.4 6.6 18.8M14.4 15.4 17.4 18.8" />
      <path d="M10.6 18 9.8 21.4M13.4 18 14.2 21.4" />
    </Svg>
  );
}
