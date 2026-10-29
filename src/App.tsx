import { useState } from "react";
import MobileCtaBar from "./components/MobileCtaBar";
import { ToastProvider } from "@heroui/react";
import Header from "./components/Header";
import UspBar from "./components/UspBar";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Process from "./components/Process";
import Estimator from "./components/Estimator";
import Contact from "./components/Contact";
import Packages from "./components/Packages";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

/**
 * The front page in the order the owner argues it: what it costs (the index
 * in the hero), what you can count on, how the visit runs, your own price,
 * the packages, what customers say, the questions, and how to reach him.
 * The pest search lives in the hero index; the comparison sits under the
 * promises; the closing band and the form are one close.
 */
export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="np">
      <UspBar />
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <Hero />
        <Benefits />
        <Process />
        <Estimator contextKey="home" />
        <Packages />
        <Reviews />
        <Faq />
        <Contact contextKey="home" />
      </main>
      <Footer />
      <MobileCtaBar />
      <ToastProvider />
    </div>
  );
}
