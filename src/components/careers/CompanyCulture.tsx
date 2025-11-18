import { Rocket, Users, Lightbulb, Globe, BookOpen } from "lucide-react";

export function CompanyCulture() {
  const culturePillars = [
    {
      icon: Rocket,
      title: "Innovation over tradition",
      color: "#00FF88",
    },
    {
      icon: Users,
      title: "Open communication & transparency",
      color: "#00C8FF",
    },
    {
      icon: Lightbulb,
      title: "Ownership > hierarchy",
      color: "#00FF88",
    },
    {
      icon: Globe,
      title: "Remote-friendly & global team",
      color: "#00C8FF",
    },
    {
      icon: BookOpen,
      title: "Continuous learning & experimentation",
      color: "#00FF88",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl mb-6 text-center">Who We Are</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto text-center leading-relaxed">
          Quant is more than a trading platform — it's a place where bold ideas, continuous learning, and collaborative problem-solving define our everyday. We empower team members to grow fast, take ownership, and shape the future of fintech.
        </p>

        {/* Culture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 hover:border-[#00FF88]/50 hover:shadow-2xl hover:shadow-[#00FF88]/20 transition-all duration-300 hover:-translate-y-2"
              >
                <Icon
                  size={40}
                  className="mb-4 transition-transform group-hover:scale-110"
                  style={{ color: pillar.color }}
                />
                <h3 className="text-xl text-white">{pillar.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
