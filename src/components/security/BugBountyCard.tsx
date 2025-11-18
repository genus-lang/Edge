import { Bug, CheckCircle2 } from "lucide-react";

export function BugBountyCard() {
  const features = [
    "Reward program for qualified findings",
    "No retaliation policy for good-faith researchers",
    "Timeline & commitment to responsible patching",
  ];

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border-2 border-[#00FF88]/40 rounded-2xl p-10 md:p-12 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#00FF88]/30 to-[#00C8FF]/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <Bug size={40} className="text-[#00FF88]" />
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl mb-4">
            Help Us Make Quant Even Safer
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We welcome ethical security research and responsible disclosure of 
            vulnerabilities.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8 text-left max-w-xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="text-[#00C8FF] flex-shrink-0 mt-0.5"
                />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105">
            🚀 Submit Vulnerability Report
          </button>
        </div>
      </div>
    </section>
  );
}
