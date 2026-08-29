import { useSyncExternalStore } from "react";

const KEY = "bsdky-consent";

type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === "accepted" || v === "rejected") return v;
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

export function setConsent(value: Consent) {
  if (value === null) {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  } else {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
  }
  // Notify same-tab listeners.
  window.dispatchEvent(new Event("consent-change"));
}
