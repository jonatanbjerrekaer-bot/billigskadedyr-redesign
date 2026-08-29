import { useState } from "react";
import CookieBanner from "./components/CookieBanner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TwoPathRouter from "./components/TwoPathRouter";
import PestQuickSelect from "./components/PestQuickSelect";
import Benefits from "./components/Benefits";
import Comparison from "./components/Comparison";
import Process from "./components/Process";
import Estimator from "./components/Estimator";
import Packages from "./components/Packages";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import ClosingCta from "./components/ClosingCta";
import Footer from "./components/Footer";

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-forest-900 font-sans">
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <Hero />
        <TwoPathRouter />
        <PestQuickSelect />
        <Benefits />
        <Comparison />
        <Process />
        <Estimator />
        <Packages />
        <Reviews />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
