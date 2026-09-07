const STEPS = [
  {
    n: "01",
    title: "Skriv eller ring",
    desc: "Fortæl kort, hvad du står over for. Du får svar inden for 24 timer på hverdage.",
  },
  {
    n: "02",
    title: "Besigtigelse og fast pris",
    desc: "Vi ser på omfanget, anbefaler en metode og sætter prisen. Så ved du, hvad det ender med.",
  },
  {
    n: "03",
    title: "Behandling og opfølgning",
    desc: "Vi behandler, sender dig dokumentationen og følger op, så det ikke kommer igen.",
  },
];

/**
 * How the visit runs.
 *
 * This is the section where a photograph earns the most. Everything below the
 * hero used to be text, icons and cards, so a reader deciding whether to let a
 * stranger into his house never saw a person. The steps answer "what are the
 * stages"; the picture answers the question he is actually asking, which is
 * what it looks like when somebody is standing in his living room.
 *
 * One image beside the steps rather than one per step. Three photos of three
 * genuinely different moments would be better, and the layout is ready for
 * them, but three crops of the same moment would just be padding.
 *
 * public/proces.webp is a placeholder from a stock library and has to be
 * replaced before this goes anywhere near the public site. Two things to fix
 * when it is: it is not him, and the coverall and respirator argue with the
 * copy everywhere else on the site about approved products being safe indoors
 * around children and pets. A photo of him working in ordinary branded
 * workwear says more, and says it truthfully.
 */
export default function Process() {
  return (
    <section id="process" className="bg-cream py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 uppercase mb-3">
          Sådan foregår det
        </h2>
        <p className="text-ink-900/70 mb-8 max-w-2xl">
          Tre trin, og du ved besked undervejs. Prisen ligger fast, før vi går i gang.
        </p>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-center">
          {/* The steps keep their numbers: on a phone this is a list you read
              down, and the numbers are what carry the sense of a sequence. */}
          <ol className="flex flex-col gap-7 list-none p-0 m-0">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4 sm:gap-5">
                <span
                  className="font-display text-4xl sm:text-5xl font-bold text-accent-700 leading-none shrink-0 tabular-nums"
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink-900/75 max-w-prose">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* width and height are set so the browser reserves the space before
              the file arrives. Without them the steps jump as it loads, which
              is the layout shift we spent the prerender pass removing. */}
          <figure className="m-0 order-first lg:order-none">
            <img
              src={`${import.meta.env.BASE_URL}proces.webp`}
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              alt="Tekniker i gang med en indendørs behandling langs fodpaneler"
              className="w-full aspect-[4/3] object-cover rounded-2xl border border-ink-900/10 shadow-sm"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
