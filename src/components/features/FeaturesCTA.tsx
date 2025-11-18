import { Button } from "../ui/button";
import { Rocket } from "lucide-react";

export function FeaturesCTA() {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FF88]/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              You have the strategy — now build it.
            </h2>

            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-all shadow-2xl shadow-[#00FF88]/30 group hover:scale-105 duration-300"
            >
              <Rocket className="mr-2 group-hover:scale-110 transition-transform" size={24} />
              Start Using Quant for Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
