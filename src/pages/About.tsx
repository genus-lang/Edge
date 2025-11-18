import { Navigation } from "../components/Navigation";
import { AboutHeader } from "../components/about/AboutHeader";
import { Mission } from "../components/about/Mission";
import { Vision } from "../components/about/Vision";
import { Values } from "../components/about/Values";
import { Achievements } from "../components/about/Achievements";
import { Timeline } from "../components/about/Timeline";
import { Team } from "../components/about/Team";
import { TrustSection } from "../components/about/TrustSection";
import { Footer } from "../components/Footer";

export function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <AboutHeader />
      <Mission />
      <Vision />
      <Values />
      <Achievements />
      <Timeline />
      <Team />
      <TrustSection />
      <Footer />
    </div>
  );
}
