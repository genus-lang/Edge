import { Star, Users, Globe, Link } from "lucide-react";

export function RatingsSummary() {
  const stats = [
    {
      icon: Star,
      label: "Average Rating",
      value: "4.9 / 5.0",
      color: "#00FF88",
    },
    {
      icon: Users,
      label: "Reviews",
      value: "2,300+",
      subtext: "verified users",
      color: "#00C8FF",
    },
    {
      icon: Globe,
      label: "Global Reach",
      value: "50+",
      subtext: "countries",
      color: "#00FF88",
    },
    {
      icon: Link,
      label: "Supported Brokers",
      value: "30+",
      subtext: "integrations",
      color: "#00C8FF",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Real Traders. Real Platforms. Real Performance.</h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 hover:border-[#00FF88]/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition-opacity"
                  style={{ background: `radial-gradient(circle at center, ${stat.color}20, transparent)` }}
                />

                <div className="relative z-10">
                  <Icon
                    className="mb-4"
                    size={40}
                    style={{ color: stat.color }}
                  />
                  <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                  <p className="text-3xl md:text-4xl mb-1">{stat.value}</p>
                  {stat.subtext && (
                    <p className="text-sm text-gray-500">{stat.subtext}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
