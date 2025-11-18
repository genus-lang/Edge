import { LucideIcon, ArrowRight } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  topics: string[];
  onClick?: () => void;
}

export function CategoryCard({ icon: Icon, title, topics, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-6 hover:border-[#00FF88]/50 hover:shadow-2xl hover:shadow-[#00FF88]/20 transition-all duration-300 cursor-pointer hover:-translate-y-2"
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon size={28} className="text-[#00FF88]" />
      </div>

      {/* Title */}
      <h3 className="text-xl mb-3 group-hover:text-[#00FF88] transition-colors">
        {title}
      </h3>

      {/* Topics */}
      <ul className="space-y-2 mb-4">
        {topics.map((topic, index) => (
          <li key={index} className="text-sm text-gray-400 flex items-start">
            <span className="text-[#00C8FF] mr-2">·</span>
            {topic}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex items-center gap-2 text-[#00C8FF] text-sm group-hover:gap-3 transition-all">
        View Articles
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
