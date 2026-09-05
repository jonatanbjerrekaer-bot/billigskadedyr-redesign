import { useEffect, useRef, type ReactNode } from "react";

/**
 * One-time entrance for card grids: rises 8px and fades in the first time the
 * element scrolls into view, staggered per sibling via `delay`. The observer
 * disconnects after firing, so it never replays, and the element is fully
 * interactive before and during the entrance. Under reduced motion only the
 * opacity fades (index.css). If IntersectionObserver is unavailable the
 * content renders immediately.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-revealed");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
