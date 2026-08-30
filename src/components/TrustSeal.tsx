/**
 * e-mærket is the trust mark Danish shoppers actually look for, and the
 * original site leans on it. It was only text here, which throws away the
 * whole point: the seal works because it is recognised at a glance, before
 * anything is read.
 *
 * The official mark is drawn by e-mærket's own widget script, and that script
 * is keyed to the live domain (widget.emaerket.dk/js/<site hash>), so it
 * cannot render on this concept's domain. Rather than paste a counterfeit of
 * a certification mark, this is the concept's own badge carrying the real
 * certificate number of things that matter: the score, the review count, and
 * a link straight to the public certificate. Everything on it is checkable,
 * which is the same standard the reviews section is held to.
 *
 * On the real domain this component is the thing you delete, and you drop the
 * official widget in its place.
 */
type Props = {
  variant?: "dark" | "light";
  className?: string;
};

const CERTIFICATE_URL = "https://certifikat.emaerket.dk/billigskadedyr.dk";

export default function TrustSeal({ variant = "dark", className = "" }: Props) {
  const dark = variant === "dark";
  return (
    <a
      href={CERTIFICATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group inline-flex items-center gap-3 rounded-xl border px-4 py-3 min-h-[44px] transition-colors",
        dark
          ? "border-ink-700 bg-ink-900/60 hover:border-accent-400"
          : "border-ink-100 bg-white hover:border-accent-500",
        className,
      ].join(" ")}
    >
      <svg
        width="34"
        height="40"
        viewBox="0 0 34 40"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M17 1.5 32 6.2v13.1c0 8.3-5.6 15.5-15 19.2-9.4-3.7-15-10.9-15-19.2V6.2L17 1.5Z"
          className={dark ? "fill-ink-950" : "fill-cream"}
          stroke="currentColor"
          strokeWidth="1.6"
          style={{ color: "var(--color-accent-500)" }}
        />
        <path
          d="m10.5 20.2 4.6 4.6 9-9.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--color-accent-500)" }}
        />
      </svg>

      <span className="min-w-0">
        <span
          className={[
            "block text-sm font-semibold leading-tight",
            dark ? "text-cream" : "text-ink-900",
          ].join(" ")}
        >
          e-mærket webshop
        </span>
        <span
          className={[
            "block text-xs leading-tight mt-0.5",
            dark ? "text-ink-100/70" : "text-ink-900/70",
          ].join(" ")}
        >
          4,6 af 5 · 110 anmeldelser
        </span>
        <span
          className={[
            "block text-xs leading-tight mt-0.5 underline underline-offset-2",
            dark
              ? "text-accent-400 group-hover:text-accent-300"
              : "text-accent-600 group-hover:text-accent-700",
          ].join(" ")}
        >
          Se certifikatet
        </span>
      </span>
    </a>
  );
}
