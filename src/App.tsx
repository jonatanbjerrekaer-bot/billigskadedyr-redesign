import { useState } from "react";
import CookieBanner from "./components/CookieBanner";
import MobileCtaBar from "./components/MobileCtaBar";
import { ToastProvider } from "@heroui/react";
import Header from "./components/Header";
import UspBar from "./components/UspBar";
import Hero from "./components/Hero";
import PestQuickSelect from "./components/PestQuickSelect";
import Benefits from "./components/Benefits";
import Comparison from "./components/Comparison";
import Process from "./components/Process";
import Estimator from "./components/Estimator";
import Contact from "./components/Contact";
import Packages from "./components/Packages";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import ClosingCta from "./components/ClosingCta";
import Footer from "./components/Footer";

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-ink-900 font-sans pb-20 md:pb-0">
      <UspBar />
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <Hero />
        <PestQuickSelect />
        <Benefits />
        <Comparison />
        <Process />
        <Estimator />
        <Packages />
        <Reviews />
        <Faq />
        <ClosingCta />
        <Contact />
      </main>
      <Footer />
      <MobileCtaBar />
      <CookieBanner />
      <ToastProvider />
    </div>
  );
}
