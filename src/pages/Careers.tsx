import { Navigation } from "../components/Navigation";
import { CareersHero } from "../components/careers/CareersHero";
import { CompanyCulture } from "../components/careers/CompanyCulture";
import { Benefits } from "../components/careers/Benefits";
import { OpenRoles } from "../components/careers/OpenRoles";
import { InternshipSection } from "../components/careers/InternshipSection";
import { CareersCTA } from "../components/careers/CareersCTA";
import { Footer } from "../components/Footer";

export function Careers() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <CareersHero />
      <CompanyCulture />
      <Benefits />
      <OpenRoles />
      <InternshipSection />
      <CareersCTA />
      <Footer />
    </div>
  );
}
