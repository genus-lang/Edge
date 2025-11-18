import { Activity, FileText, MessageCircle, Newspaper } from "lucide-react";

export function QuickHelpLinks() {
  const quickLinks = [
    {
      icon: Activity,
      label: "Platform Status",
      href: "#status",
    },
    {
      icon: FileText,
      label: "API Documentation",
      href: "#api-docs",
    },
    {
      icon: MessageCircle,
      label: "Community Discord",
      href: "#discord",
    },
    {
      icon: Newspaper,
      label: "Release Notes",
      href: "#release-notes",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                className="group flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-[#00FF88]/50 hover:bg-white/10 transition-all duration-300"
              >
                <Icon size={20} className="text-[#00FF88] group-hover:scale-110 transition-transform" />
                <span className="text-sm group-hover:text-[#00FF88] transition-colors">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
