import { Button } from "../ui/button";
import { Mail } from "lucide-react";

export function CareersCTA() {
  const handleContact = () => {
    console.log("Contact us");
    // Handle email or contact form logic
  };

  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00C8FF]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Think you're a great fit, even if your role isn't listed?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              We love talking to passionate builders who want to shape the future of algorithmic trading.
            </p>

            <Button
              size="lg"
              onClick={handleContact}
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group text-lg px-8 py-6"
            >
              <Mail className="mr-2" size={24} />
              Send us your resume
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
