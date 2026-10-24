const STEPS = [
  {
    title: "Skriv eller ring",
    desc: "Fortæl kort, hvad du står over for. Du får svar inden for en hverdag.",
  },
  {
    title: "Vi kigger på det og siger prisen",
    desc: "Vi ser, hvor slemt det er, og hvad der skal til. Prisen får du, før der sker noget.",
  },
  {
    title: "Vi gør arbejdet og følger op",
    desc: "Du får behandlingen på skrift bagefter. Vi følger op, så det ikke kommer igen.",
  },
];

/**
 * How the visit runs, beside the one photograph the page keeps.
 *
 * public/proces.webp is a placeholder from a stock library and has to be
 * replaced before this goes anywhere near the public site: it is not him, and
 * the coverall and respirator argue with the copy everywhere else on the site
 * about approved products being safe indoors around children and pets. It
 * sits in a slot, so his own photograph replaces it without touching the
 * layout; the paper prints every picture in black and white.
 */
export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container grid12">
        <figure className="process__figure">
          <div data-slot="process" data-alt="Daniel i almindeligt arbejdstøj, i gang med en indendørs behandling">
            <img
              src={`${import.meta.env.BASE_URL}proces.webp`}
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              alt="Tekniker i gang med en indendørs behandling langs fodpaneler"
            />
          </div>
          <figcaption>En indendørs behandling langs fodpanelerne.</figcaption>
        </figure>

        <div className="process__text">
          <h2>Sådan foregår det</h2>
          <p className="lead">
            Tre trin, og du ved besked undervejs.
          </p>
          <ol className="stages">
            {STEPS.map((s) => (
              <li key={s.title}>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
