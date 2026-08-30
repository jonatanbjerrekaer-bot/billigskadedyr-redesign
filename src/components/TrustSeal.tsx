/**
 * e-mærket is the certification mark Danish shoppers look for, and it works by
 * being recognised at a glance, before anything is read. The concept had it as
 * text only, in a footer link and a USP label, which throws that away.
 *
 * On the live shop the mark is drawn by e-mærket's own widget: a script that
 * injects <emaerket-shadow-widget data-widget="label"> and fills its shadow
 * root. I tested that script on another origin. It loads, throws no errors,
 * and leaves the shadow root empty, so it is keyed to the certified domain and
 * cannot render here.
 *
 * This is therefore a stand-in, not a copy of the certification mark: the real
 * score and review count, in e-mærket's own visual language, linking straight
 * to the public certificate so every claim on it is checkable. On the real
 * domain you delete this component and paste the widget snippet in its place.
 */
type Props = {
  variant?: "dark" | "light" | "bar";
  className?: string;
};

const CERTIFICATE_URL = "https://certifikat.emaerket.dk/billigskadedyr.dk";
const SCORE = 4.6;
const COUNT = 111;

function Stars() {
  // 4.6 of 5 as a clipped overlay rather than rounded to a whole star, because
  // rounding up is exactly the kind of small dishonesty this section argues against.
  const pct = (SCORE / 5) * 100;
  const row = (fill: string, key: string) => (
    <span key={key} className="flex gap-[2px] w-max shrink-0" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={fill}>
          <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z" />
        </svg>
      ))}
    </span>
  );
  return (
    <span className="relative inline-flex shrink-0">
      {row("currentColor", "bg")}
      <span
        className="absolute inset-0 overflow-hidden text-emaerket"
        style={{ width: `${pct}%` }}
      >
        {row("currentColor", "fg")}
      </span>
    </span>
  );
}

export default function TrustSeal({ variant = "dark", className = "" }: Props) {
  const dark = variant !== "light";

  // Bar variant: one line, no card, sized to sit in the USP strip without
  // adding a pixel of height to it.
  if (variant === "bar") {
    return (
      <a
        href={CERTIFICATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`e-mærket certificeret webshop, ${String(SCORE).replace(".", ",")} af 5 baseret på ${COUNT} bedømmelser. Se certifikatet.`}
        className={["group flex items-start gap-2 min-w-0 text-[11px] sm:text-xs", className].join(" ")}
      >
        <svg width="15" height="17" viewBox="0 0 30 34" aria-hidden="true" className="shrink-0 mt-0.5 text-emaerket-light">
          <path d="M3 2h24a1 1 0 0 1 1 1v19a1 1 0 0 1-1 1h-9l-5.5 6.5V23H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" fill="currentColor" />
          <ellipse cx="15" cy="12.5" rx="8.5" ry="5.4" fill="none" stroke="#0d1f16" strokeWidth="2" />
          <path d="M10.8 12.5h8.4a4.2 4.2 0 1 0-4.2 4.2" fill="none" stroke="#0d1f16" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {/*
          Below sm the sibling USP items collapse to their bold label only, so
          this one does too. The stars drop out and the name stays: on a phone
          "e-mærket 4,6" carries the signal, where a row of stars with no name
          attached carries none.
        */}
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 font-semibold text-cream">
            <span className="hidden sm:inline text-ink-100/30"><Stars /></span>
            <span className="sm:hidden">e-mærket</span>
            {String(SCORE).replace(".", ",")}
          </span>
          <span className="hidden sm:block text-ink-100/70 group-hover:text-cream underline underline-offset-2 decoration-ink-100/30">
            e-mærket · {COUNT} bedømmelser
          </span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={CERTIFICATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`e-mærket certificeret webshop, ${String(SCORE).replace(".", ",")} af 5 baseret på ${COUNT} bedømmelser. Se certifikatet.`}
      className={[
        "group inline-flex items-center gap-3 rounded-xl border px-4 py-3 min-h-[44px] transition-colors",
        dark
          ? "border-ink-700 bg-ink-950/70 hover:border-emaerket"
          : "border-ink-100 bg-white hover:border-emaerket",
        className,
      ].join(" ")}
    >
      <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden="true" className="shrink-0 text-emaerket">
        <path
          d="M3 2h24a1 1 0 0 1 1 1v19a1 1 0 0 1-1 1h-9l-5.5 6.5V23H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
        <ellipse cx="15" cy="12.5" rx="8.5" ry="5.4" fill="none" stroke="#fff" strokeWidth="1.7" />
        <path d="M10.8 12.5h8.4a4.2 4.2 0 1 0-4.2 4.2" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      </svg>

      <span className="min-w-0">
        <span className={["flex items-center gap-2", dark ? "text-ink-100/35" : "text-ink-900/20"].join(" ")}>
          <Stars />
          <span className={["text-sm font-semibold", dark ? "text-cream" : "text-ink-900"].join(" ")}>
            {String(SCORE).replace(".", ",")} af 5
          </span>
        </span>
        <span
          className={[
            "block text-xs leading-tight mt-1",
            dark ? "text-ink-100/70" : "text-ink-900/70",
          ].join(" ")}
        >
          e-mærket webshop · {COUNT} bedømmelser
        </span>
        <span
          className={[
            "block text-xs leading-tight mt-0.5 underline underline-offset-2",
            dark ? "text-emaerket-light group-hover:text-cream" : "text-emaerket group-hover:text-ink-900",
          ].join(" ")}
        >
          Se certifikatet
        </span>
      </span>
    </a>
  );
}
