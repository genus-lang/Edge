import { Search, Plus, BookmarkCheck, GitCompare, Home, ChevronRight } from 'lucide-react';

interface LibraryHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateNew: () => void;
  onViewSaved: () => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export function LibraryHeader({
  searchQuery,
  onSearchChange,
  onCreateNew,
  onViewSaved,
  compareCount,
  onOpenCompare,
}: LibraryHeaderProps) {
  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-b border-gray-800">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button
          onClick={() => handleNavigation('dashboard')}
          className="hover:text-[#00FF88] transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
        <ChevronRight className="w-4 h-4" />
        <span>Strategies</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Strategy Library</span>
      </div>

      {/* Title & Description */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Strategy Library</h1>
        <p className="text-sm text-gray-400">
          Explore proven trading strategies and adapt them to your style.
        </p>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search strategy by name, indicator, asset..."
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
          />
        </div>

        {/* Actions */}
        <button
          onClick={onViewSaved}
          className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
        >
          <BookmarkCheck className="w-5 h-5" />
          My Saved
        </button>

        <button
          onClick={onOpenCompare}
          disabled={compareCount === 0}
          className="flex items-center gap-2 px-4 py-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          <GitCompare className="w-5 h-5" />
          Compare ({compareCount})
        </button>

        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Create New Strategy
        </button>
      </div>
    </div>
  );
}
