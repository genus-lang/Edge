import { ArrowRight } from "lucide-react";

interface HelpArticleCardProps {
  emoji: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function HelpArticleCard({ emoji, title, description, onClick }: HelpArticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-6 hover:border-[#00C8FF]/50 hover:shadow-xl hover:shadow-[#00C8FF]/10 transition-all duration-300 cursor-pointer"
    >
      {/* Emoji Icon */}
      <div className="text-4xl mb-3">{emoji}</div>

      {/* Title */}
      <h3 className="text-lg mb-2 group-hover:text-[#00C8FF] transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        {description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-2 text-[#00FF88] text-sm group-hover:gap-3 transition-all">
        Read Guide
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
