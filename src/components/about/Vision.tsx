import { Check } from "lucide-react";

export function Vision() {
  const goals = [
    "Expand AI-driven strategy automation",
    "Support 100+ global brokers & exchanges",
    "Build the world's largest strategy marketplace",
    "Put institutional investment tools in every trader's hands",
  ];

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-6">
            Our Vision
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            A world where trading is powered not by emotions, but by data, automation, and
            strategy. We envision a financial landscape where individuals and institutions use
            AI to unlock smarter, faster, and safer trading decisions.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl mb-6 text-center">
            Future Goals
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Check className="text-[#00FF88] flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-300">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
