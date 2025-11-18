import { LucideIcon } from "lucide-react";

interface ApiCardProps {
  icon: string;
  title: string;
  description: string;
}

export function ApiCard({ icon, title, description }: ApiCardProps) {
  return (
    <div className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-6 hover:border-[#00FF88]/50 hover:shadow-2xl hover:shadow-[#00FF88]/20 transition-all duration-300 hover:scale-105">
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl mb-2 group-hover:text-[#00FF88] transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
