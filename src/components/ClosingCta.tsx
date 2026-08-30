import { Mail, Phone } from "lucide-react";
import Cta, { MAILTO, TEL } from "./ui/Cta";
import TrustSeal from "./TrustSeal";

export default function ClosingCta() {
  return (
    <section id="tilbud" className="bg-accent-500 text-ink-950 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight uppercase">
          Klar til at få det løst?
        </h2>
        <p className="mt-3 text-lg opacity-90">
          Skriv et par linjer om, hvad du står over for. Du får svar inden for 24 timer på
          hverdage og en fast pris, før vi går i gang.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Cta
            href={MAILTO}
            variant="onAccent"
            icon={<Mail size={18} strokeWidth={2.5} aria-hidden="true" />}
          >
            Skriv til os
          </Cta>
          <Cta
            href={TEL}
            variant="onAccentGhost"
            icon={<Phone size={18} strokeWidth={2.5} aria-hidden="true" />}
          >
            Ring 24 24 55 83
          </Cta>
        </div>
        {/*
          The seal sits at the point of decision, not only in the footer.
          Someone about to write to a stranger about their home wants to see,
          in the same glance as the button, that the business is certified and
          that the certificate is one click away.
        */}
        <div className="mt-8 flex justify-center">
          <TrustSeal variant="light" />
        </div>

        <p className="mt-6 text-sm opacity-80">Åbningstider: Man-Fre 08-18 · Lør-Søn 12-16</p>
      </div>
    </section>
  );
}
