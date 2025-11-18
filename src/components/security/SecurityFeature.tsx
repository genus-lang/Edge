import { CheckCircle2, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SecurityFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  trustNote?: ReactNode;
  link?: {
    text: string;
    href: string;
  };
}

export function SecurityFeature({
  icon: Icon,
  title,
  description,
  features,
  trustNote,
  link,
}: SecurityFeatureProps) {
  return (
    <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#00FF88]/30 transition-all duration-300">
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon size={32} className="text-[#00FF88]" />
      </div>

      {/* Title */}
      <h3 className="text-3xl md:text-4xl mb-4">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-lg mb-6 leading-relaxed">
        {description}
      </p>

      {/* Features List */}
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 opacity-0 animate-in fade-in slide-in-from-left-2"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
          >
            <CheckCircle2
              size={20}
              className="text-[#00C8FF] flex-shrink-0 mt-0.5"
            />
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* Trust Note */}
      {trustNote && (
        <div className="bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg p-4 text-sm text-[#00FF88]">
          {trustNote}
        </div>
      )}

      {/* Link */}
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center gap-2 text-[#00C8FF] hover:text-[#00FF88] transition-colors mt-4"
        >
          {link.text}
          <span>→</span>
        </a>
      )}
    </div>
  );
}
