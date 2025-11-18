import { Button } from "../ui/button";
import { Rocket, DollarSign } from "lucide-react";

export function FeaturesHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          Everything a Quant Needs — in One Platform
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          From designing strategies to backtesting, optimizing, and deploying live — Quant gives
          traders all the tools they need, backed by institutional-grade speed and intelligence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group min-w-[160px]"
          >
            <Rocket className="mr-2 group-hover:scale-110 transition-transform" size={20} />
            Try Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 hover:border-[#00FF88] hover:bg-[#00FF88]/10 transition-colors min-w-[160px]"
          >
            <DollarSign className="mr-2" size={20} />
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
