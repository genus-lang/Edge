import { useEffect, useRef, useState } from "react";
import { Search, X, Sparkles, Filter, ArrowRight } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import { SearchResultCard } from "./SearchResultCard";
import { getSearchCategories } from "../../data/searchIndex";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const {
    query,
    results,
    suggestions,
    isSearching,
    selectedCategory,
    setQuery,
    setSelectedCategory,
    clearSearch,
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const [showFilters, setShowFilters] = useState(false);
  const categories = getSearchCategories();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
        clearSearch();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, clearSearch]);

  // Handle result click
  const handleResultClick = (url: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(url);
      window.scrollTo(0, 0);
    }
    onClose();
    clearSearch();
  };

  // Navigate to full search results page
  const viewAllResults = () => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo("search-results");
    }
    onClose();
  };

  if (!isOpen) return null;

  const displayResults = query.length >= 2 ? (suggestions.length > 0 ? suggestions : results) : [];
  const hasResults = displayResults.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] px-4">
        <div className="w-full max-w-3xl bg-gradient-to-br from-[#0A0A0A] to-black border border-white/20 rounded-2xl shadow-2xl shadow-[#00FF88]/10 animate-in slide-in-from-top-4 duration-300">
          {/* Header */}
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-4">
              <Search size={24} className="text-gray-400 flex-shrink-0" />
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for features, docs, FAQs, pricing..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-gray-500"
              />

              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border transition-all ${
                  showFilters || selectedCategory
                    ? "border-[#00FF88]/50 bg-[#00FF88]/10 text-[#00FF88]"
                    : "border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                <Filter size={18} />
              </button>
            </div>

            {/* Category Filters */}
            {showFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    !selectedCategory
                      ? "bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/50"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/30"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCategory === category
                        ? "bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/50"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/30"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Search Hint */}
            {!query && (
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Sparkles size={14} className="text-[#00C8FF]" />
                <span>
                  Try searching for "backtesting", "API", "pricing", or "how to"
                </span>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {isSearching && (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-2 border-[#00FF88]/30 border-t-[#00FF88] rounded-full animate-spin" />
                <p className="mt-4 text-gray-400">Searching...</p>
              </div>
            )}

            {!isSearching && query.length >= 2 && !hasResults && (
              <div className="text-center py-12">
                <Search size={48} className="text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">No results found</h3>
                <p className="text-gray-400">
                  Try adjusting your search or{" "}
                  <button
                    onClick={() => setSelectedCategory(undefined)}
                    className="text-[#00FF88] hover:underline"
                  >
                    clear filters
                  </button>
                </p>
              </div>
            )}

            {!isSearching && hasResults && (
              <div className="space-y-3">
                {displayResults.map((item) => (
                  <SearchResultCard
                    key={item.id}
                    item={item}
                    query={query}
                    onClick={() => handleResultClick(item.url)}
                  />
                ))}

                {/* View All Results Link */}
                {results.length > suggestions.length && (
                  <button
                    onClick={viewAllResults}
                    className="w-full mt-4 py-3 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/50 transition-all flex items-center justify-center gap-2 group"
                  >
                    View all {results.length} results
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                )}
              </div>
            )}

            {/* Initial State - Popular Searches */}
            {!query && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase text-gray-500 mb-3">
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Pricing", "API Documentation", "Backtesting", "Features", "How to start", "Refund policy"].map(
                      (term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-[#00FF88]/50 hover:text-[#00FF88] transition-all"
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-6 py-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">
                  ↑↓
                </kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">
                  Enter
                </kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">
                  Esc
                </kbd>
                <span>Close</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-[#00FF88] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
