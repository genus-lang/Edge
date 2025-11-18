import { Button } from "../ui/button";
import { Rocket } from "lucide-react";

export function BlogPostCTA() {
  const handleGetStarted = () => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo("home");
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="px-6 lg:px-8 py-20 bg-gradient-to-b from-[#0A0A0A] to-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FF88]/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <Rocket className="mx-auto mb-6 text-[#00FF88]" size={48} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Ready to build smarter strategies?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start backtesting your ideas with institutional-grade tools today.
            </p>
            
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group text-lg px-8 py-6"
            >
              <Rocket className="mr-2 group-hover:scale-110 transition-transform" size={24} />
              Start Backtesting on Quant
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
