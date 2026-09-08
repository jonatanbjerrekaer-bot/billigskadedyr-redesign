/**
 * De fire løfter, ordret som han selv skriver dem på billigskadedyr.dk.
 *
 * Teksterne er hans, ikke vores. Det gælder også "Certificeret af e-mærket",
 * som er en påstand om en rigtig certificering, og den slags skal man ikke
 * skrive på vegne af nogen. Den står her, fordi den står på hans egen side.
 *
 * Den staar paa produktsiden under koebsknappen, ikke paa forsiden:
 * bjaelken oeverst siger allerede fragt, retur og afhentning.
 *
 * Titel og tekst i to kolonner med streger imellem. Fire ens felter med et
 * ikon over en overskrift over to linjer er den mest genkendelige
 * skabelonform, der findes, og ikonerne sagde ikke noget, ordene ikke sagde.
 */
const ITEMS = [
  {
    title: "Hurtig levering",
    text: "Vi gør alt, hvad vi kan, for at du har din pakke allerede i morgen.",
  },
  {
    title: "Sikker betaling",
    text: "Du får en sikker betalingsløsning her på Billigskadedyr.dk.",
  },
  {
    title: "Testet af fagfolk",
    text: "Vi er professionelle fagfolk, og derfor tester vi personligt alle produkter.",
  },
  {
    title: "Certificeret af e-mærket",
    text: "Du kan roligt have tillid til os! Vores shop er certificeret af e-mærket.",
  },
];

export default function TrustRow({ id }: { id?: string }) {
  return (
    <section id={id} aria-label="Sådan handler du her" className="anchor">
      <dl className="grid sm:grid-cols-2 gap-x-10 m-0 border-t border-ink-200">
        {ITEMS.map(({ title, text }) => (
          <div key={title} className="grid grid-cols-[minmax(8.5rem,10rem)_1fr] gap-4 py-4 border-b border-ink-200">
            <dt className="select-none font-display font-semibold text-ink-950 leading-snug m-0">{title}</dt>
            <dd className="select-none text-[0.9375rem] text-ink-700 leading-snug m-0">{text}</dd>
          </div>
        ))}
      </dl>
      <p className="select-none mt-3 text-sm text-ink-600">
        Fragtpriser fra 59 kr. Gratis afhentning i Risskov. 14 dages returret på uåbnede varer.
      </p>
    </section>
  );
}
