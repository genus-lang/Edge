import { SearchItem } from "../../data/searchIndex";
import { ArrowRight, FileText, Code, HelpCircle, DollarSign, Scale, Building, Package } from "lucide-react";

interface SearchResultCardProps {
  item: SearchItem;
  query: string;
  onClick: () => void;
}

export function SearchResultCard({ item, query, onClick }: SearchResultCardProps) {
  // Get icon based on category
  const getCategoryIcon = () => {
    switch (item.category) {
      case "Blog":
        return <FileText size={16} className="text-[#00FF88]" />;
      case "Docs":
        return <Code size={16} className="text-[#00C8FF]" />;
      case "FAQs":
        return <HelpCircle size={16} className="text-purple-400" />;
      case "Pricing":
        return <DollarSign size={16} className="text-yellow-400" />;
      case "Legal":
        return <Scale size={16} className="text-gray-400" />;
      case "Company":
        return <Building size={16} className="text-blue-400" />;
      case "Product":
        return <Package size={16} className="text-[#00FF88]" />;
      default:
        return <FileText size={16} className="text-gray-400" />;
    }
  };

  // Get category color
  const getCategoryColor = () => {
    switch (item.category) {
      case "Blog":
        return "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30";
      case "Docs":
        return "bg-[#00C8FF]/10 text-[#00C8FF] border-[#00C8FF]/30";
      case "FAQs":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "Pricing":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "Legal":
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
      case "Company":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Product":
        return "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30";
      default:
        return "bg-white/10 text-gray-400 border-white/30";
    }
  };

  // Highlight matching text
  const highlightText = (text: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="bg-[#00FF88]/30 text-[#00FF88] rounded px-0.5">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-4 hover:border-[#00FF88]/50 hover:bg-white/5 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs ${getCategoryColor()}`}>
              {getCategoryIcon()}
              {item.category}
            </span>
            <span className="text-xs text-gray-500">{item.page}</span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-white group-hover:text-[#00FF88] transition-colors line-clamp-1">
            {highlightText(item.title)}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-2">
            {highlightText(item.description)}
          </p>
        </div>

        {/* Arrow Icon */}
        <ArrowRight
          size={20}
          className="text-gray-600 group-hover:text-[#00FF88] group-hover:translate-x-1 transition-all flex-shrink-0"
        />
      </div>
    </button>
  );
}
