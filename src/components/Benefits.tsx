import { BadgeCheck, ClipboardCheck, Tag, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "./ui/Reveal";

const BENEFITS: { title: string; desc: string; Icon: LucideIcon }[] = [
  {
    title: "Fast pris i forvejen",
    desc: "Du får en bundet pris, før vi går i gang. Den ændrer sig ikke undervejs.",
    Icon: Tag,
  },
  {
    title: "Certificerede fagfolk",
    desc: "Vores teknikere er uddannede og autoriserede til professionel bekæmpelse.",
    Icon: BadgeCheck,
  },
  {
    title: "Dokumenteret service",
    desc: "Du får det skriftligt: hvad vi fandt, hvad vi brugte, og hvad vi gjorde. Klar til ejendomsadministrationen eller forsikringssagen.",
    Icon: ClipboardCheck,
  },
  {
    title: "Hurtig og diskret",
    desc: "Vi lægger besøget, hvor det passer dig, og er ude igen uden at lave et nummer ud af det.",
    Icon: Timer,
  },
];

export default function Benefits() {
  return (
    <section id="why" className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 uppercase text-center mb-10">
          Det kan du regne med
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 50} className="h-full [&>*]:h-full">
            <div className="bg-ink-50 rounded-2xl p-6 flex flex-col gap-3 h-full">
              <div className="w-12 h-12 rounded-xl bg-ink-900 text-accent-400 flex items-center justify-center">
                <b.Icon size={22} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-lg text-ink-900">{b.title}</h3>
              <p className="text-sm text-ink-900/75">{b.desc}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
