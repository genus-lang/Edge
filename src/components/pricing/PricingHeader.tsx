import { useState } from "react";

interface PricingHeaderProps {
  billingCycle: "monthly" | "yearly";
  onBillingChange: (cycle: "monthly" | "yearly") => void;
}

export function PricingHeader({ billingCycle, onBillingChange }: PricingHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          Pricing Built for Every Trader
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Start for free. Upgrade only when you're ready — no credit card required.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-4 bg-[#0A0A0A] border border-white/10 rounded-full p-2">
          <button
            onClick={() => onBillingChange("monthly")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              billingCycle === "monthly"
                ? "bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => onBillingChange("yearly")}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
              billingCycle === "yearly"
                ? "bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
            <span className="text-xs bg-[#00FF88] text-black px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
