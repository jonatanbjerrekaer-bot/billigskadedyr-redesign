import { useSyncExternalStore } from "react";
import type { PropertyType, Severity } from "./pricing";

/**
 * The estimator owns its input state, but the contact section below it needs
 * the same answers to draft the message placeholder. Lifting state into a
 * context would turn Estimator inside out for one string, so the selections
 * live in a module-level store instead: Estimator publishes during render,
 * the shallow guard makes repeated publishes free, and Contact subscribes.
 */
export type EstimatorSelection = {
  pestLabel: string;
  m2: number;
  property: PropertyType;
  severity: Severity;
  /** Formatted price, e.g. "2.200 kr.". null when this pest is quoted
      after a visit rather than calculated, so nothing downstream can
      print a number the calculator never produced. */
  price: string | null;
  /** The same price as a number, for the packages band. null when quoted. */
  amount: number | null;
  /** The owner's published spring-and-autumn package for this pest, if any. */
  packageAmount: number | null;
  /** True once the visitor has touched any calculator input themselves. */
  touched: boolean;
};

let current: EstimatorSelection | null = null;
const listeners = new Set<() => void>();

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function publishEstimatorSelection(next: EstimatorSelection) {
  if (
    current &&
    current.pestLabel === next.pestLabel &&
    current.m2 === next.m2 &&
    current.property === next.property &&
    current.severity === next.severity &&
    current.price === next.price &&
    current.amount === next.amount &&
    current.packageAmount === next.packageAmount &&
    current.touched === next.touched
  ) {
    return;
  }
  current = next;
  listeners.forEach((l) => l());
}

export function useEstimatorSelection() {
  return useSyncExternalStore(subscribe, () => current);
}

/**
 * The chosen pest, shared by the hero's price card and the calculator so the
 * two dropdowns always show the same pest. null until someone picks one, and
 * then each caller falls back to its own default.
 */
let chosenPest: string | null = null;
const pestListeners = new Set<() => void>();

export function setChosenPest(slug: string) {
  if (slug === chosenPest) return;
  chosenPest = slug;
  pestListeners.forEach((l) => l());
}

export function useChosenPest(fallback: string): [string, (slug: string) => void] {
  const slug = useSyncExternalStore(
    (fn) => {
      pestListeners.add(fn);
      return () => {
        pestListeners.delete(fn);
      };
    },
    () => chosenPest,
  );
  return [slug ?? fallback, setChosenPest];
}
