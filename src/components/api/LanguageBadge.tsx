interface LanguageBadgeProps {
  name: string;
  icon?: string;
}

export function LanguageBadge({ name, icon }: LanguageBadgeProps) {
  return (
    <div className="group flex items-center gap-3 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-lg px-6 py-4 hover:border-[#00C8FF]/50 hover:bg-white/15 transition-all duration-300">
      {icon && <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>}
      <span className="text-gray-300 group-hover:text-[#00C8FF] transition-colors">
        {name}
      </span>
    </div>
  );
}
