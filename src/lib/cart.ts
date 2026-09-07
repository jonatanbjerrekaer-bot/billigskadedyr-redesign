/*
 * En kurv, der lever i hukommelsen. Nok til en demo: knappen skal gøre
 * noget synligt, og tallet i toppen skal stemme. Der er ingen betaling,
 * ingen server og ingen localStorage, fordi ingen af delene er det, den
 * her prototype skal vise.
 */
import { useSyncExternalStore } from "react";

export type Line = { slug: string; qty: number };

let lines: Line[] = [];
const listeners = new Set<() => void>();

function emit() {
  lines = [...lines];
  listeners.forEach((l) => l());
}

export function addToCart(slug: string, qty = 1) {
  const found = lines.find((l) => l.slug === slug);
  if (found) found.qty += qty;
  else lines.push({ slug, qty });
  emit();
}

export function useCart(): Line[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => lines,
    () => lines,
  );
}

export function useCartCount(): number {
  return useCart().reduce((n, l) => n + l.qty, 0);
}
