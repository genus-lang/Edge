import { Users, Activity, DollarSign, Zap } from "lucide-react";

export function Achievements() {
  const stats = [
    {
      icon: Users,
      metric: "50K+",
      label: "Traders using Quant worldwide",
      gradient: "from-[#00FF88] to-[#00C8FF]",
    },
    {
      icon: Activity,
      metric: "2M+",
      label: "Lifetime backtests executed",
      gradient: "from-[#00C8FF] to-[#1EFCBD]",
    },
    {
      icon: DollarSign,
      metric: "$120M+",
      label: "Automated trading volume facilitated",
      gradient: "from-[#1EFCBD] to-[#00FF88]",
    },
    {
      icon: Zap,
      metric: "99.99%",
      label: "Platform uptime & data reliability",
      gradient: "from-[#00FF88] to-[#00C8FF]",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Our Achievements
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're just getting started
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all text-center">
                {/* Icon */}
                <div className="inline-flex mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5`}>
                    <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                      <stat.icon className="text-white" size={28} />
                    </div>
                  </div>
                </div>

                {/* Metric */}
                <div className={`text-5xl mb-2 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.metric}
                </div>

                {/* Label */}
                <p className="text-gray-400 text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
