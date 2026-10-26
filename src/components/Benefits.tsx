import Comparison from "./Comparison";

const BENEFITS: { title: string; desc: string }[] = [
  {
    title: "Fast pris i forvejen",
    desc: "Du får en bundet pris, før vi går i gang. Den ændrer sig ikke undervejs.",
  },
  {
    title: "Certificerede fagfolk",
    desc: "Vi er uddannede og autoriserede til de midler, opgaven kræver.",
  },
  {
    title: "Ingen garanti — derfor billigere",
    desc: "Du betaler ikke for gratis genbesøg, du måske aldrig får brug for. Langt de fleste skal kun behandles én gang.",
  },
  {
    title: "Hurtig og diskret",
    desc: "Vi lægger besøget, hvor det passer dig, og er ude igen uden at lave et nummer ud af det.",
  },
];

/**
 * The four promises as ruled rows, and under them the comparison with the
 * rest of the trade: one section, because both answer the same question,
 * "what do I get from these people that I would not get elsewhere".
 */
export default function Benefits() {
  return (
    <section id="why" className="section">
      <div className="container grid12">
        <div className="promises__head">
          <h2>Det kan du regne med</h2>
        </div>
        <dl className="promises__rows">
          {BENEFITS.map((b) => (
            <div key={b.title} className="promise">
              <dt>{b.title}</dt>
              <dd>{b.desc}</dd>
            </div>
          ))}
        </dl>
        <Comparison />
      </div>
    </section>
  );
}
