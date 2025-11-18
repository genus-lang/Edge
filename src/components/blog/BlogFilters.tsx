interface BlogFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function BlogFilters({ activeFilter, onFilterChange }: BlogFiltersProps) {
  const filters = [
    "All",
    "Algorithmic Trading",
    "Market Insights",
    "Quant Strategies",
    "Platform Updates",
    "Tutorials",
  ];

  return (
    <div className="mb-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black shadow-lg shadow-[#00FF88]/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
