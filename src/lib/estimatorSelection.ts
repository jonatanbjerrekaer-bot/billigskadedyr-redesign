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
  /** Formatted price, e.g. "2.200 kr." */
  price: string;
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
    current.price === next.price
  ) {
    return;
  }
  current = next;
  listeners.forEach((l) => l());
}

export function useEstimatorSelection() {
  return useSyncExternalStore(subscribe, () => current);
}
