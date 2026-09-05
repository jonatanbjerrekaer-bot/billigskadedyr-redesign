import { useState } from "react";
import { Button } from "@heroui/react";
import { useConsent, setConsent } from "../lib/consent";

export default function CookieBanner() {
  const consent = useConsent();
  const [exiting, setExiting] = useState(false);
  if (consent !== null || typeof window === "undefined") return null;

  // The answer slides the banner back down the edge it came from, and only
  // then commits the consent — which is what makes the mobile CTA bar able
  // to slide up from the same edge as its handoff (animate-slide-up).
  const answer = (value: "accepted" | "rejected") => {
    setExiting(true);
    window.setTimeout(() => setConsent(value), 250);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className={`fixed bottom-0 left-0 right-0 z-50 bg-ink-950 text-cream px-5 py-4 flex flex-wrap items-center gap-4 animate-slide-up ${
        exiting ? "banner-exit" : ""
      }`}
    >
      <p className="text-sm basis-full sm:basis-auto flex-1">
        Vi bruger cookies til statistik, så vi kan forbedre siden.
      </p>
      <div className="flex gap-2">
        <Button
          onPress={() => answer("accepted")}
          className="bg-accent-500 text-ink-950 font-semibold rounded-lg px-5 py-3 min-h-[44px] hover:bg-accent-400 transition-colors"
        >
          Accepter
        </Button>
        <Button
          onPress={() => answer("rejected")}
          className="bg-ink-800 text-cream font-medium rounded-lg px-5 py-3 min-h-[44px] hover:bg-ink-700 transition-colors"
        >
          Afvis
        </Button>
      </div>
    </div>
  );
}
