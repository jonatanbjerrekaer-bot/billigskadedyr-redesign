const REVIEWS = [
  {
    quote:
      "Jeg har brugt billigskadedyr i mange år, da der altid er en klar og konkret vejledning, service og altid et smil med på vejen. Daniel har stået parat til at vejlede mig gennem store som små spørgsmål.",
    src: "Trustpilot, 18. februar 2026",
  },
  {
    quote:
      "Vi har brugt dem flere gange i vores hus - både til hvepse, borebiller og edderkopper. Hver gang får man en super service, og skadedyrene forsvinder.",
    src: "Trustpilot",
  },
  {
    quote:
      "Vi kontaktede billigskadedyr.dk mod skægkræ og det har vist sig at være det bedste vi har gjort. Utrolig kompetent, professionel og venlig rådgivning og service og prisen er mere end fornuftig.",
    src: "Trustpilot, 24. februar 2026",
  },
  {
    quote:
      "Købte noget gift, blev ringet op kort tid efter bestillingen og fortalt, at jeg kunne få et bedre produkt til det halve. Super god service, og produktet virker rigtig godt.",
    src: "Trustpilot, 13. januar 2026",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-forest-900 uppercase mb-2">
          Anmeldelser
        </h2>
        <p className="text-sm text-forest-900/70 mb-8">
          Trustpilot: 3,8 ud af 5 (44 anmeldelser) · e-mærket: 4,6 ud af 5 (110 verificerede anmeldelser)
        </p>
        <div className="flex flex-wrap gap-4">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.src}
              className="bg-forest-50 border-l-4 border-accent-500 rounded-xl p-5 flex flex-col gap-3"
              style={{ flexBasis: "440px", flexGrow: 1, flexShrink: 1, maxWidth: "100%" }}
            >
              <p className="text-sm text-forest-900/90 leading-relaxed">{r.quote}</p>
              <cite className="text-xs text-forest-900/50 not-italic">{r.src}</cite>
            </blockquote>
          ))}
        </div>
        <p className="text-xs text-forest-900/50 mt-6">
          Citater gengivet fra Trustpilot. Den samlede bedømmelse er 3,8 af 5 - vi viser den som den er.
        </p>
      </div>
    </section>
  );
}
