import { Button } from "../ui/button";
import { Mail, BookOpen } from "lucide-react";

export function PricingCTA() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-[#0B0B0B]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00C8FF]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl mb-4">
              Still not sure what plan is right for you?
            </h2>
            <p className="text-gray-400 mb-8">
              Our team is here to help you find the perfect solution
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group min-w-[180px]"
              >
                <Mail className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                Contact Sales
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:border-[#00FF88] hover:bg-[#00FF88]/10 transition-colors min-w-[180px]"
              >
                <BookOpen className="mr-2" size={20} />
                Visit Help Center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
