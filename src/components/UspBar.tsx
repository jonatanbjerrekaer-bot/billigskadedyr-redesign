import { Clock, PhoneCall, Tag } from "lucide-react";
import TrustSeal from "./TrustSeal";

/**
 * The four promises billigskadedyr.dk runs above its own header. Delivery
 * speed is first there, so it leads here too.
 *
 * ponytail: a static grid, not a carousel and not a toast. A carousel would
 * hide three of four promises behind an interaction nobody performs, and a
 * toast is for transient feedback, not standing trust copy.
 *
 * On a phone the descriptions used to truncate to "Markedets måske
 * billigst…", which reads worse than not showing them: a clipped promise is a
 * promise the reader has to guess at. Below sm the labels alone are shown in
 * two columns, which fits without clipping and keeps all four visible.
 */
const USPS = [
  { Icon: Clock, label: "Hurtig hjælp", text: "Hos dig på 1-2 hverdage" },
  { Icon: Tag, label: "Fast pris", text: "Aftalt, før vi går i gang" },
  { Icon: PhoneCall, label: "Akut hjælp", text: "Ring 24 24 55 83" },
];

export default function UspBar() {
  return (
    <div className="bg-ink-950 text-ink-100/80 border-b border-ink-800">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-2.5 sm:py-3 grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-2 items-center select-none">
        {USPS.map(({ Icon, label, text }) => (
          // Label and text each get their own line. Free wrapping meant the
          // shortest promise sat on one line while the rest took two, so the
          // row read as broken rather than as four matching items.
          <div key={label} className="flex items-start gap-2 text-[11px] sm:text-xs min-w-0">
            <Icon
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="text-accent-500 shrink-0 mt-0.5"
            />
            <span className="min-w-0">
              <span className="block font-semibold text-cream">{label}</span>
              <span className="hidden sm:block text-ink-100/70">{text}</span>
            </span>
          </div>
        ))}

        <TrustSeal variant="bar" />
      </div>
    </div>
  );
}
