import PestQuickSelect, { priceOf } from "./PestQuickSelect";
import { GRID_PESTS, PRICED_PESTS, PestGlyph } from "../lib/pests";
import { useChosenPest } from "../lib/estimatorSelection";
import Select from "./ui/Select";
import { OWNER_PRICES } from "../lib/pricing";

/**
 * The first screen borrows what the big US pest firms and the best product
 * sites do well: a solid green band (Terminix, Aptive, Sunday), the pests
 * themselves as one-tap ways in (Terminix's service chips), the rating in the
 * hero (Hawx), and the product shown rather than described (Stripe, Linear).
 * Here the product is the price, so the card answers "what does it cost?"
 * before anyone scrolls. The full price list follows as its own band.
 */
const MORE = "__alle";

export default function Hero() {
  // Same list, same store as the calculator below: change one, both follow.
  const [slug, setSlug] = useChosenPest(PRICED_PESTS[0].slug);
  // The dropdown and chips show the common pests; the rest live in the full list below.
  const toList = () => document.getElementById("pest")?.scrollIntoView({ behavior: "smooth", block: "start" });
  const pest = PRICED_PESTS.find((p) => p.slug === slug) ?? PRICED_PESTS[0];
  const price = priceOf(pest);
  const row = pest.priceKey ? OWNER_PRICES[pest.priceKey] : undefined;
  // The owner's own reason where he gives one; otherwise the honest general one.
  const why =
    row?.kind === "quote"
      ? row.why
      : `${pest.label} har ingen fast pris, fordi arbejdet afhænger af, hvor de sidder, og hvor mange der er. Skriv kort, hvad du har set, eller send et billede, så får du en fast pris, før vi kommer.`;

  return (
    <>
      <section id="top" className="hero">
        <div className="container grid12">
          <div className="hero__text">
            <p className="hero__kicker">Skadedyrsbekæmpelse i Jylland og Fyn</p>
            <h1>
              <span className="keep">Skadedyr i huset?</span>
              <br /> Vi kommer og <span className="tail">fjerner dem.</span>
            </h1>
            <p className="lead">
              Du får en fast pris, før vi går i gang. Vi kigger efter først, og du siger ja,
              før vi rører noget.
            </p>
            <ul className="hero__chips" aria-label="Skadedyr vi fjerner">
              {GRID_PESTS.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <a href={`${import.meta.env.BASE_URL}service/${p.slug}/`}>
                    <span className="hero__chip-glyph">
                      <PestGlyph pest={p} size={22} />
                    </span>
                    {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#pest" className="hero__chip-more">
                  + {GRID_PESTS.length - 6} andre skadedyr
                </a>
              </li>
            </ul>
            <p className="hero__rating">
              <strong>4,6 af 5</strong> på e-mærket ·{" "}
              <a href="#reviews">Læs hvad kunderne skriver</a>
            </p>
          </div>

          <form className="hero__check" onSubmit={(e) => e.preventDefault()}>
            <h2>Hvad koster det?</h2>
            <span className="field-label">Vælg dit skadedyr</span>
            <Select
              value={slug}
              onValueChange={(v) => (v === MORE ? toList() : setSlug(v))}
              ariaLabel="Skadedyr"
              triggerId="hero-pest"
              paper
              options={[
                ...PRICED_PESTS.map((p) => ({
                  value: p.slug,
                  label: p.label,
                  icon: <PestGlyph pest={p} size={22} />,
                })),
                { value: MORE, label: `Se alle ${GRID_PESTS.length} skadedyr …` },
              ]}
            />
            <a href="#pest" className="hero__check-more">
              Ikke på listen? Se alle {GRID_PESTS.length} skadedyr
            </a>
            <p className="hero__check-price" data-words={price.ask || undefined} aria-live="polite">
              {price.text}
            </p>
            <p className="hero__check-note">
              {row?.kind === "fixed"
                ? `Pris for én behandling af ${pest.label.toLowerCase()}. Den ligger fast, før vi går i gang.`
                : price.note
                  ? `Det koster ${price.text} at få os ud og se på det. ${why}`
                  : why}
            </p>
            {row?.kind === "fixed" ? (
              <a href="#estimator" className="btn btn--primary">
                Beregn min præcise pris
              </a>
            ) : (
              <a href="#skriv" className="btn btn--primary">
                Skriv til os om {pest.label.toLowerCase()}
              </a>
            )}
          </form>
        </div>
      </section>

      <section className="index-band">
        <div className="container">
          <PestQuickSelect />
        </div>
      </section>
    </>
  );
}
