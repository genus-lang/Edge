import { Activity, Zap, Brain, Shield } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Backtesting",
      description: "Test strategies on 10+ years of historical data in seconds",
      gradient: "from-[#00FF88] to-[#00C8FF]",
    },
    {
      icon: Activity,
      title: "Live Trading",
      description: "Execute trades automatically with smart routing and low latency",
      gradient: "from-[#00C8FF] to-[#00FF88]",
    },
    {
      icon: Brain,
      title: "AI Optimization",
      description: "Let AI auto-tune parameters for maximum performance",
      gradient: "from-[#00FF88] to-[#1EFCBD]",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Drawdown limits, volatility control & adaptive stop-loss",
      gradient: "from-[#1EFCBD] to-[#00C8FF]",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 relative">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Everything you need to trade smarter
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful tools designed for both beginner and professional traders
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-[1px] hover:scale-105 transition-transform duration-300"
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity blur-sm`} />
              
              <div className="relative bg-black rounded-2xl p-8 h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}>
                  <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                    <feature.icon className={`bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} size={24} />
                  </div>
                </div>

                <h3 className="text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
