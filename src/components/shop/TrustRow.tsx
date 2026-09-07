import { BadgeCheck, Clock, ShieldCheck, Stethoscope } from "lucide-react";

/**
 * De fire løfter, ordret som han selv skriver dem på billigskadedyr.dk.
 *
 * Teksterne er hans, ikke vores. Det gælder også "Certificeret af e-mærket",
 * som er en påstand om en rigtig certificering, og den slags skal man ikke
 * skrive på vegne af nogen. Den står her, fordi den står på hans egen side.
 *
 * De ligger under indholdet og ikke i heroet. Et løftebånd oven over det,
 * man kom efter, er noget, man scroller forbi.
 */
const ITEMS = [
  {
    icon: Clock,
    title: "Hurtig levering",
    text: "Vi gør alt, hvad vi kan, for at du har din pakke allerede i morgen.",
  },
  {
    icon: ShieldCheck,
    title: "Sikker betaling",
    text: "Du får en sikker betalingsløsning her på Billigskadedyr.dk.",
  },
  {
    icon: Stethoscope,
    title: "Testet af fagfolk",
    text: "Vi er professionelle fagfolk, og derfor tester vi personligt alle produkter.",
  },
  {
    icon: BadgeCheck,
    title: "Certificeret af e-mærket",
    text: "Du kan roligt have tillid til os! Vores shop er certificeret af e-mærket.",
  },
];

export default function TrustRow({ id }: { id?: string }) {
  return (
    <section id={id} aria-label="Sådan handler du her" className="anchor">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="border-t border-ink-300 pt-4">
            <Icon size={26} strokeWidth={1.75} aria-hidden="true" className="text-ink-950" />
            <p className="select-none mt-3 font-display font-bold text-ink-950">{title}</p>
            <p className="select-none mt-1 text-[15px] text-ink-700 leading-snug">{text}</p>
          </li>
        ))}
      </ul>
      <p className="select-none mt-3 text-sm text-ink-600">
        Fragtpriser fra 59 kr. Gratis afhentning i Risskov. 14 dages returret på uåbnede varer.
      </p>
    </section>
  );
}
