import { Brain, Users, Lock, Globe } from "lucide-react";

export function Values() {
  const values = [
    {
      icon: Brain,
      emoji: "🧠",
      title: "Innovation",
      description: "We challenge legacy trading tools and reinvent what's possible.",
      gradient: "from-[#00FF88] to-[#00C8FF]",
    },
    {
      icon: Users,
      emoji: "🤝",
      title: "Transparency",
      description: "Data, pricing, and performance should always be clear.",
      gradient: "from-[#00C8FF] to-[#1EFCBD]",
    },
    {
      icon: Lock,
      emoji: "🔐",
      title: "Security",
      description: "Trust is earned through compliance and safety.",
      gradient: "from-[#1EFCBD] to-[#00FF88]",
    },
    {
      icon: Globe,
      emoji: "🌎",
      title: "Accessibility",
      description: "Quantitative trading should be for everyone — not just hedge funds.",
      gradient: "from-[#00FF88] to-[#00C8FF]",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Values & Work Philosophy
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            These are more than words — they are our foundation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-[1px] hover:scale-105 transition-transform duration-300"
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity blur-sm`} />
              
              <div className="relative bg-black rounded-2xl p-8 h-full">
                {/* Icon */}
                <div className="text-4xl mb-4">{value.emoji}</div>

                <h3 className="text-xl mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
