import { FileText } from "lucide-react";

export function SecurityHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          Enterprise-Grade Security for Every Trader
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-10">
          Your data, strategies, and API keys are protected with industry-leading 
          security standards — the same level trusted by financial institutions and 
          enterprise partners.
        </p>

        {/* CTA Button */}
        <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 group">
          <FileText size={20} />
          View Security & Compliance Documentation
        </button>
      </div>
    </section>
  );
}
