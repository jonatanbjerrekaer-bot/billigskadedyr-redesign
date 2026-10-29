import { useSyncExternalStore } from "react";
import type { PropertyType } from "./pricing";

/**
 * The estimator owns its input state, but the contact section below it needs
 * the same answers to draft the message placeholder. Lifting state into a
 * context would turn Estimator inside out for one string, so the selections
 * live in a module-level store instead: Estimator publishes during render,
 * the shallow guard makes repeated publishes free, and Contact subscribes.
 *
 * Every selection carries the contextKey of the page that produced it, so a
 * contact form only picks it up when the visitor used the calculator on that
 * same page. After navigation the stale selection is ignored and the form
 * falls back to the simple current-page draft.
 */
export type EstimatorSelection = {
  /** The priced pest's slug, e.g. "myrer". */
  pestSlug: string;
  pestLabel: string;
  /** "home", "service:<slug>" or "species:<service>:<slug>". */
  contextKey: string;
  m2: number;
  property: PropertyType;
  /** The matched postnummer and its town, e.g. "8800" / "Viborg". null until
      four digits we know have been typed. */
  postcode: string | null;
  town: string | null;
  /** How many houses go together (1, 2, 5 or 10). Only above 1 once chosen. */
  houses: number;
  /** Formatted price per house, e.g. "2.200 kr.". null when this pest is quoted
      after a visit rather than calculated, so nothing downstream can
      print a number the calculator never produced. */
  price: string | null;
  /** The same price as a number, for the packages band. null when quoted. */
  amount: number | null;
  /** Rooms or nests for the main pest, where it is priced that way. */
  count: number | null;
  /** More pests on the same visit, with their own rooms or nests. */
  extras: { slug: string; label: string; count: number | null }[];
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

function extrasEqual(
  a: EstimatorSelection["extras"],
  b: EstimatorSelection["extras"],
): boolean {
  return a.length === b.length && a.every((x, i) => x.slug === b[i]!.slug && x.label === b[i]!.label && x.count === b[i]!.count);
}

export function publishEstimatorSelection(next: EstimatorSelection) {
  if (
    current &&
    current.pestSlug === next.pestSlug &&
    current.pestLabel === next.pestLabel &&
    current.contextKey === next.contextKey &&
    current.m2 === next.m2 &&
    current.property === next.property &&
    current.postcode === next.postcode &&
    current.town === next.town &&
    current.houses === next.houses &&
    current.price === next.price &&
    current.amount === next.amount &&
    current.count === next.count &&
    extrasEqual(current.extras, next.extras) &&
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
