import { useConsent } from "../lib/consent";
import { setConsent } from "../lib/consent";

export default function CookieBanner() {
  const consent = useConsent();
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 right-0 z-50 bg-forest-950 text-cream px-5 py-4 flex flex-wrap items-center gap-4"
    >
      <p className="text-sm basis-full sm:basis-auto flex-1">
        Vi bruger cookies til statistik, så vi kan forbedre siden.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setConsent("accepted")}
          className="bg-accent-500 text-white font-semibold rounded-lg px-5 py-3 min-h-[44px] hover:bg-accent-400 transition-colors"
        >
          Accepter
        </button>
        <button
          onClick={() => setConsent("rejected")}
          className="bg-forest-800 text-cream font-medium rounded-lg px-5 py-3 min-h-[44px] hover:bg-forest-700 transition-colors"
        >
          Afvis
        </button>
      </div>
    </div>
  );
}
