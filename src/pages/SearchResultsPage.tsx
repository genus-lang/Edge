import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { SearchResultCard } from "../components/search/SearchResultCard";
import { getSearchCategories } from "../data/searchIndex";
import { SITE_CONFIG } from "../config/site";

export function SearchResultsPage() {
  const {
    query,
    results,
    isSearching,
    selectedCategory,
    setQuery,
    setSelectedCategory,
  } = useSearch();

  const categories = getSearchCategories();

  const handleResultClick = (url: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(url);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-center bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Search {SITE_CONFIG.name}
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <Search
              size={24}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for features, docs, FAQs, pricing..."
              className="w-full pl-14 pr-4 py-4 bg-gradient-to-br from-[#0A0A0A] to-black border border-white/20 rounded-xl text-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50 transition-all"
              autoFocus
            />
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal size={20} className="text-[#00FF88]" />
                  <h2 className="text-lg">Filters</h2>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(undefined)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      !selectedCategory
                        ? "bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/50"
                        : "text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    All Results
                    {!selectedCategory && results.length > 0 && (
                      <span className="float-right text-xs">
                        {results.length}
                      </span>
                    )}
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === category
                          ? "bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/50"
                          : "text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Clear Filters */}
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(undefined)}
                    className="w-full mt-4 px-4 py-2 text-sm text-gray-400 hover:text-[#00FF88] transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Main Content - Results */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              {query && (
                <div className="mb-6">
                  <p className="text-gray-400">
                    {isSearching ? (
                      "Searching..."
                    ) : results.length > 0 ? (
                      <>
                        Found <span className="text-[#00FF88]">{results.length}</span>{" "}
                        {results.length === 1 ? "result" : "results"} for{" "}
                        <span className="text-white">"{query}"</span>
                        {selectedCategory && (
                          <>
                            {" "}
                            in <span className="text-[#00FF88]">{selectedCategory}</span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        No results found for{" "}
                        <span className="text-white">"{query}"</span>
                      </>
                    )}
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isSearching && (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-[#00FF88]/30 border-t-[#00FF88] rounded-full animate-spin" />
                  <p className="mt-4 text-gray-400">Searching...</p>
                </div>
              )}

              {/* No Results */}
              {!isSearching && query && results.length === 0 && (
                <div className="text-center py-12">
                  <Search size={64} className="text-gray-600 mx-auto mb-6" />
                  <h2 className="text-2xl mb-3">No results found</h2>
                  <p className="text-gray-400 mb-6">
                    We couldn't find anything matching your search.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Try:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Using different keywords</li>
                      <li>• Checking your spelling</li>
                      <li>• Using more general terms</li>
                      <li>• Removing filters</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Results Grid */}
              {!isSearching && results.length > 0 && (
                <div className="space-y-4">
                  {results.map((item) => (
                    <SearchResultCard
                      key={item.id}
                      item={item}
                      query={query}
                      onClick={() => handleResultClick(item.url)}
                    />
                  ))}
                </div>
              )}

              {/* Empty State - No Query */}
              {!query && (
                <div className="text-center py-12">
                  <Search size={64} className="text-gray-600 mx-auto mb-6" />
                  <h2 className="text-2xl mb-3">Start searching</h2>
                  <p className="text-gray-400 mb-8">
                    Enter a search term to find what you're looking for
                  </p>

                  {/* Popular Searches */}
                  <div>
                    <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
                    <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                      {[
                        "Pricing",
                        "API Documentation",
                        "Backtesting",
                        "Features",
                        "How to start",
                        "Refund policy",
                        "Security",
                        "Live trading",
                      ].map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-[#00FF88]/50 hover:text-[#00FF88] transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
