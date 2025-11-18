import { DollarSign, Palmtree, Home, TrendingUp, Brain, Shield } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Based on skills, not location",
    },
    {
      icon: Palmtree,
      title: "Flexible Time Off",
      description: "No micromanagement, trust-based policies",
    },
    {
      icon: Home,
      title: "Remote First",
      description: "Work from anywhere in the world",
    },
    {
      icon: TrendingUp,
      title: "Stock Options",
      description: "For full-time roles",
    },
    {
      icon: Brain,
      title: "Learning Budget",
      description: "Courses, books, certifications supported",
    },
    {
      icon: Shield,
      title: "Job Stability",
      description: "Functioning business with real revenue",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl mb-6 text-center">
          Why You'll Love Working Here
        </h2>
        <p className="text-xl text-gray-400 mb-12 text-center">
          We win together — as humans first, teammates second.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="relative group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 hover:border-[#00C8FF]/50 hover:shadow-2xl hover:shadow-[#00C8FF]/20 transition-all duration-300"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-[#00C8FF]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <Icon size={40} className="text-[#00FF88] mb-4" />
                  <h3 className="text-xl mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
