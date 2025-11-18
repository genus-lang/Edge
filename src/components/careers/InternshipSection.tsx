import { Button } from "../ui/button";
import { GraduationCap } from "lucide-react";

export function InternshipSection() {
  const handleApply = () => {
    console.log("Apply for internship");
    // Handle internship application logic
  };

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#0A0A0A] to-black border-2 border-[#00FF88]/50 rounded-2xl p-12 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10" />

          <div className="relative z-10 text-center">
            <GraduationCap size={64} className="mx-auto mb-6 text-[#00FF88]" />
            <h2 className="text-3xl md:text-4xl mb-4">Looking for Internships?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              We welcome students and self-learners passionate about trading, AI, and software engineering. No experience required — just curiosity and commitment.
            </p>

            <Button
              size="lg"
              onClick={handleApply}
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group text-lg px-8 py-6"
            >
              Apply for Internship
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
