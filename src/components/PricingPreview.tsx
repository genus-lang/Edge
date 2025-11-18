import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function PricingPreview() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-3xl p-[2px] overflow-hidden">
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FF88] via-[#00C8FF] to-[#00FF88] opacity-50 animate-pulse" />
          
          <div className="relative bg-black rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl mb-4">
              Affordable for every trader — from beginner to professional
            </h2>
            <p className="text-gray-400 mb-8">
              Free plan available — no credit card required
            </p>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group"
            >
              💰 View Pricing
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>

            <p className="text-sm text-gray-500 mt-6">
              Cancel anytime · No hidden fees · Full feature access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
