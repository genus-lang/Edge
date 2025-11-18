import { Search } from "lucide-react";
import { useState } from "react";

export function SupportHero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          How can we help you?
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-400 mb-10">
          Find guides, tutorials, and troubleshooting resources for everything on Quant.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00FF88] transition-colors" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search for help articles..."
              className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50 focus:shadow-lg focus:shadow-[#00FF88]/20 transition-all duration-300"
            />
          </div>
        </form>

        {/* Search Suggestions */}
        <p className="text-sm text-gray-500">
          Try searching for:{" "}
          <button className="text-[#00C8FF] hover:underline">
            "backtesting"
          </button>
          ,{" "}
          <button className="text-[#00C8FF] hover:underline">
            "connect broker"
          </button>
          ,{" "}
          <button className="text-[#00C8FF] hover:underline">
            "billing"
          </button>
          ,{" "}
          <button className="text-[#00C8FF] hover:underline">
            "AI optimizer"
          </button>
        </p>
      </div>
    </section>
  );
}
