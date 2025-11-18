import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { TrustLogos } from "../components/TrustLogos";
import { Features } from "../components/Features";
import { ProductShowcase } from "../components/ProductShowcase";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { PricingPreview } from "../components/PricingPreview";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <TrustLogos />
      <Features />
      <ProductShowcase />
      <HowItWorks />
      <Testimonials />
      <PricingPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}
