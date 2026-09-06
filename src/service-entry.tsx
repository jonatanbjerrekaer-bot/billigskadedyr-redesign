import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ServicePage from "./components/ServicePage";
import { serviceContentFor, servicePest } from "./lib/serviceContent";
import "./index.css";

// The slug is handed to the shared bundle by the page shell through
// <html lang="da" data-pest="slug"> so one entry serves all service pages.
function slugFromDom(): string {
  return document.documentElement.getAttribute("data-pest") || "";
}

function setPageMeta(slug: string) {
  const pest = servicePest(slug);
  const content = serviceContentFor(slug);
  if (!pest || !content) return;
  document.title = `Professionel bekæmpelse af ${pest.label.toLowerCase()} | Billigskadedyr.dk`;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta!.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta!.setAttribute("content", content.intro.slice(0, 155));
}

const slug = slugFromDom();
setPageMeta(slug);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ServicePage slug={slug} />
  </StrictMode>,
);
