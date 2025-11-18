import { FileText, Shield } from "lucide-react";

interface LegalCTAProps {
  onNavigate?: (page: string) => void;
}

export function LegalCTA({ onNavigate }: LegalCTAProps) {
  const legalLinks = [
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "Learn how we protect your data",
      action: () => console.log("Navigate to Privacy Policy"),
    },
    {
      icon: FileText,
      title: "Refund Policy",
      description: "Our refund and cancellation terms",
      action: () => console.log("Navigate to Refund Policy"),
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-8 text-center">Related Legal Documents</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legalLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={index}
                onClick={link.action}
                className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 hover:border-[#00FF88]/50 hover:shadow-2xl hover:shadow-[#00FF88]/20 transition-all duration-300 text-left"
              >
                <Icon size={40} className="text-[#00FF88] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl mb-2 group-hover:text-[#00FF88] transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-400 text-sm">{link.description}</p>
                <span className="inline-block mt-4 text-[#00C8FF] group-hover:translate-x-2 transition-transform">
                  Read More →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
