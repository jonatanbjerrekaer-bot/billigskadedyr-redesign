import { useSyncExternalStore } from "react";
import { tools } from "./analytics";

const KEY = "bsdky-consent";
// A choice only counts for the tools it was given for: adding or dropping a
// tool in lib/analytics changes this string, and everyone is asked again.
const TOOLS = [tools.ga && "ga", tools.clarity && "clarity"].filter(Boolean).join(",");
/** True while the site uses any tool. With none, there is nothing to consent to. */
export const hasTools = TOOLS !== "";
/** Fired by the footer's "Cookieindstillinger" to show the banner again. */
export const OPEN_EVENT = "bsdky:consent-open";

type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
  // Nothing to say yes to: answer as a no, so the box stays away and whatever
  // waits for an answer (the phone bar) shows.
  if (!hasTools) return "rejected";
  try {
    const [v, tools = ""] = (window.localStorage.getItem(KEY) ?? "").split("|");
    if ((v === "accepted" || v === "rejected") && tools === TOOLS) return v;
  } catch {
    /* ignore */
  }
  return null;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("consent-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("consent-change", callback);
  };
}

export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, readConsent, () => null);
}

/** The stored answer, outside React. */
export const currentConsent = readConsent;

export function setConsent(value: Consent) {
  if (value === null) {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  } else {
    try {
      window.localStorage.setItem(KEY, `${value}|${TOOLS}`);
    } catch {
      /* private mode without storage: the answer holds for this page view only */
    }
  }
  // Notify same-tab listeners.
  window.dispatchEvent(new Event("consent-change"));
}
