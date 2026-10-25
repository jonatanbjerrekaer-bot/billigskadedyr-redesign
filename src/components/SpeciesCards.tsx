import { ArrowRight } from "lucide-react";
import { SPECIES_ART } from "../lib/speciesArt";
import { speciesByName } from "../lib/speciesContent";

const B = import.meta.env.BASE_URL;

/**
 * The species cards, as the service page shows them and as a species page
 * shows its siblings. One component so the two can never drift into two
 * looks for the same thing.
 */
export default function SpeciesCards({
  service,
  species,
}: {
  service: string;
  species: { name: string; text: string }[];
}) {
  // All the species drawn, or none: a drawing next to an icon reads as two sets.
  const drawn = species.length > 0 && species.every((sp) => SPECIES_ART[sp.name]);

  return (
    <>
      <dl className="species">
        {species.map((sp) => {
          const article = speciesByName(service, sp.name);
          return (
            <div key={sp.name} className={article ? "species__card" : undefined}>
              {drawn && (
                <div className="species__art">
                  {/* The name below is the link's text, so a filled alt would
                      only make a screen reader say it twice. */}
                  <img src={`${B}species/${SPECIES_ART[sp.name]}.webp`} alt="" loading="lazy" />
                </div>
              )}
              <dt>
                {/* One link per card, stretched over the whole card in CSS, so
                    the card is one target with one accessible name rather than
                    a drawing, a name and a text that each have to be aimed at. */}
                {article ? (
                  <a href={`${B}service/${service}/${article.slug}/`} className="species__link">
                    {sp.name}
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                ) : (
                  sp.name
                )}
              </dt>
              <dd>{sp.text}</dd>
            </div>
          );
        })}
      </dl>
      {drawn && (
        <p className="species__credit">
          Tegningerne er fra gamle naturhistoriske værker eller tegnet efter frie fotos, alle via Wikimedia Commons.
        </p>
      )}
    </>
  );
}
