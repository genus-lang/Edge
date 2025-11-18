import { Button } from "../ui/button";
import { Rocket, Check } from "lucide-react";

export function TestimonialsCTA() {
  const handleGetStarted = () => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo("home");
      window.scrollTo(0, 0);
    }
  };

  const benefits = [
    "No credit card required",
    "Cancel anytime",
    "Beginner friendly",
  ];

  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00C8FF]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Your strategy could be the next success story.
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of traders who have transformed their trading with Quant.
            </p>

            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group text-lg px-8 py-6 mb-8"
            >
              <Rocket className="mr-2 group-hover:scale-110 transition-transform" size={24} />
              Start Using Quant for Free
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check size={16} className="text-[#00FF88]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
