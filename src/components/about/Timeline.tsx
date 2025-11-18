import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Timeline() {
  const milestones = [
    {
      year: "2021",
      title: "The Beginning",
      description: "Idea conceptualized by a group of quantitative engineers",
    },
    {
      year: "2022",
      title: "MVP Launch",
      description: "MVP launched with backtesting engine",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Live trading & AI optimization launched",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Integrations expanded to 30+ brokers & exchanges",
    },
    {
      year: "2025",
      title: "Marketplace Era",
      description: "Introduced Strategy Marketplace & global scaling",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Our Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From concept to global platform
          </p>
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00FF88] via-[#00C8FF] to-[#00FF88]" />

          <div className="grid grid-cols-5 gap-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#00FF88] rounded-full ring-4 ring-black z-10" />

                {/* Card */}
                <div className={`${index % 2 === 0 ? 'pt-32' : 'pb-32'}`}>
                  <div className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-xl p-6 border border-white/10 hover:border-[#00FF88]/30 transition-all">
                    <div className="text-3xl text-[#00FF88] mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative pl-8">
              {/* Vertical Line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-2 top-8 bottom-0 w-[2px] bg-gradient-to-b from-[#00FF88] to-[#00C8FF]" />
              )}

              {/* Dot */}
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#00FF88] rounded-full ring-4 ring-black" />

              {/* Card */}
              <div className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-xl p-6 border border-white/10">
                <div className="text-2xl text-[#00FF88] mb-2">
                  {milestone.year}
                </div>
                <h3 className="text-lg mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Growth Image */}
        <div className="mt-16 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/10 via-transparent to-[#00C8FF]/10" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758876019673-704b039d405c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm93dGglMjBzdGFydHVwJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NjM0MDUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Growth Journey"
            className="w-full h-64 object-cover opacity-50"
          />
        </div>
      </div>
    </section>
  );
}
