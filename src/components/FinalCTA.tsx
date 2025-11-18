import { Check } from "lucide-react";
import { Button } from "./ui/button";

export function FinalCTA() {
  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  const benefits = [
    "Free plan available",
    "Cancel anytime",
    "Works on all markets",
  ];

  return (
    <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0A0A] to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF88]/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl mb-8 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          Start backtesting now — it's free
        </h2>

        <Button
          size="lg"
          onClick={() => handleNavigation("signup")}
          className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/40 text-lg px-12 py-6 mb-8"
        >
          🚀 Create my first strategy
        </Button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check size={16} className="text-[#00FF88]" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}