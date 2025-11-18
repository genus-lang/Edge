import { Shield, CheckCircle2 } from "lucide-react";

interface ComplianceBadgeProps {
  icon?: string;
  title: string;
  description: string;
}

export function ComplianceBadge({ icon = "📌", title, description }: ComplianceBadgeProps) {
  return (
    <div className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-6 hover:border-[#00FF88]/50 hover:shadow-2xl hover:shadow-[#00FF88]/20 transition-all duration-300 hover:scale-104">
      {/* Icon/Badge */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <Shield size={24} className="text-[#00FF88]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-xl group-hover:text-[#00FF88] transition-colors">
            {title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Check Mark */}
      <div className="mt-4 flex items-center gap-2 text-[#00FF88] text-sm">
        <CheckCircle2 size={16} />
        <span>Certified & Verified</span>
      </div>
    </div>
  );
}
