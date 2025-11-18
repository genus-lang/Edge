import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { PricingHeader } from "../components/pricing/PricingHeader";
import { PricingCards } from "../components/pricing/PricingCards";
import { ComparisonTable } from "../components/pricing/ComparisonTable";
import { PricingFAQ } from "../components/pricing/PricingFAQ";
import { PricingCTA } from "../components/pricing/PricingCTA";
import { Footer } from "../components/Footer";

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <PricingHeader billingCycle={billingCycle} onBillingChange={setBillingCycle} />
      <PricingCards billingCycle={billingCycle} />
      <ComparisonTable />
      <PricingFAQ />
      <PricingCTA />
      <Footer />
    </div>
  );
}
