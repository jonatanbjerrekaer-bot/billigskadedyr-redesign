import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./router.tsx";
import "./index.css";

// iOS Safari only applies :active (our pressed state on touch) when a touch
// listener exists on the page; this empty passive one guarantees it.
document.addEventListener("touchstart", () => {}, { passive: true });

// Hidden-until-revealed states are scoped under .js, so nothing is invisible
// for a visitor whose script never runs.
document.documentElement.classList.add("js");

const root = document.getElementById("root");
if (!root) throw new Error("missing #root");

/**
 * One entry for the whole site. Every pest still has its own address and its
 * own prerendered file, so a cold arrival, from a search result or a shared
 * link, gets that file with its content in it. React Router takes over once
 * the visitor is inside (see router.tsx).
 */
createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
