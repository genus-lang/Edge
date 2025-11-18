export function Team() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Co-Founder & CEO",
      avatar: "https://i.pravatar.cc/500?img=12",
      quote: "We believe trading should be driven by data — not emotions.",
    },
    {
      name: "Sarah Johnson",
      role: "CTO & Co-Founder",
      avatar: "https://i.pravatar.cc/500?img=45",
      quote: "Technology should empower traders, not intimidate them.",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Quant Research",
      avatar: "https://i.pravatar.cc/500?img=33",
      quote: "Every strategy tells a story hidden in the data.",
    },
    {
      name: "Emma Thompson",
      role: "Head of Product",
      avatar: "https://i.pravatar.cc/500?img=47",
      quote: "Great products are born from understanding trader needs.",
    },
    {
      name: "David Park",
      role: "Lead AI Engineer",
      avatar: "https://i.pravatar.cc/500?img=15",
      quote: "AI is not replacing traders — it's amplifying their edge.",
    },
    {
      name: "Lisa Martinez",
      role: "Head of Community",
      avatar: "https://i.pravatar.cc/500?img=38",
      quote: "Our community drives everything we build.",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Meet the People Behind Quant
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A team of traders, engineers, and innovators united by one mission
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-8 border border-white/10 hover:border-[#00FF88]/30 transition-all hover:scale-105 duration-300"
            >
              {/* Avatar */}
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-[#00FF88]/20 group-hover:ring-[#00FF88]/50 transition-all">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[#00C8FF]">
                  {member.role}
                </p>
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-400 text-center italic leading-relaxed">
                "{member.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
