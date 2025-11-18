import { Search } from "lucide-react";
import { useState } from "react";

interface BlogHeroProps {
  onSearch?: (query: string) => void;
}

export function BlogHero({ onSearch }: BlogHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative pt-32 pb-16 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          Insights, Strategies & Market Intelligence
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Stay ahead with expert articles on quantitative trading, backtesting, market psychology,
          and algorithmic finance.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search articles..."
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF88]/50 focus:shadow-lg focus:shadow-[#00FF88]/20 transition-all"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
