import { Code2, TrendingUp, Rocket, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: Code2,
      title: "Create Strategy",
      description: "Drag-and-drop rules or code strategies using Python/JS",
      color: "from-[#00FF88] to-[#00C8FF]",
    },
    {
      number: "2",
      icon: TrendingUp,
      title: "Backtest",
      description: "Run simulations on 10+ years of historical data instantly",
      color: "from-[#00C8FF] to-[#1EFCBD]",
    },
    {
      number: "3",
      icon: Rocket,
      title: "Deploy Live",
      description: "Connect brokers & trade automatically with smart execution",
      color: "from-[#1EFCBD] to-[#00FF88]",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            How Quant Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From idea to execution in three simple steps
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/20 to-transparent">
                    <ArrowRight
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20"
                      size={20}
                    />
                  </div>
                )}

                {/* Step Card */}
                <div className="relative group">
                  <div className="text-center">
                    {/* Icon Circle */}
                    <div className="relative inline-block mb-6">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} p-[2px] mx-auto`}>
                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center group-hover:bg-[#0A0A0A] transition-colors">
                          <step.icon size={32} className="text-white" />
                        </div>
                      </div>
                      {/* Number Badge */}
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-black`}>
                        {step.number}
                      </div>
                    </div>

                    <h3 className="text-2xl mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
