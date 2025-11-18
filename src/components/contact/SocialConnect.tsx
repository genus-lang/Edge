import { MessageSquare, Twitter, Youtube, Linkedin } from "lucide-react";

export function SocialConnect() {
  const socialPlatforms = [
    {
      name: "Discord",
      description: "Join our community of 10K+ traders",
      icon: MessageSquare,
      href: "#discord",
      gradient: "from-[#00FF88] to-[#00C8FF]",
      emoji: "💬",
    },
    {
      name: "X (Twitter)",
      description: "Follow for updates & market insights",
      icon: Twitter,
      href: "#twitter",
      gradient: "from-[#00C8FF] to-[#1EFCBD]",
      emoji: "𝕏",
    },
    {
      name: "YouTube",
      description: "Tutorials & strategy breakdowns",
      icon: Youtube,
      href: "#youtube",
      gradient: "from-[#1EFCBD] to-[#00FF88]",
      emoji: "▶️",
    },
    {
      name: "LinkedIn",
      description: "Connect with the Quant team",
      icon: Linkedin,
      href: "#linkedin",
      gradient: "from-[#00FF88] to-[#00C8FF]",
      emoji: "💼",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8 bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">
            Connect with the Quant community
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of traders sharing strategies, data, and success stories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.href}
              className="group relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-105 duration-300"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}
              />

              <div className="relative">
                {/* Icon */}
                <div className="text-4xl mb-3">{platform.emoji}</div>

                {/* Platform Name */}
                <h3 className="text-lg mb-2">{platform.name}</h3>

                {/* Description */}
                <p className="text-sm text-gray-400">{platform.description}</p>

                {/* Arrow indicator */}
                <div className="mt-4 text-[#00FF88] opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
