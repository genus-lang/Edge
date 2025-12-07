import { Search, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface FilterPanelProps {
  marketType: 'stocks' | 'crypto' | 'forex';
  onFiltersChange?: (filters: any) => void;
}

export function FilterPanel({ marketType, onFiltersChange }: FilterPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const presetFilters = [
    { id: 'high-volume', label: 'High Volume Movers', icon: '📊' },
    { id: 'top-gainers', label: 'Top Gainers', icon: '📈' },
    { id: 'top-losers', label: 'Top Losers', icon: '📉' },
    { id: 'unusual-volatility', label: 'Unusual Volatility', icon: '⚡' },
  ];

  const stockSectors = [
    'Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer', 'Industrials',
  ];

  const cryptoSectors = [
    'DeFi', 'Layer 1', 'Layer 2', 'Memes', 'NFT', 'Stablecoins',
  ];

  const forexCategories = [
    'Majors', 'Minors', 'Exotics',
  ];

  const sectors = marketType === 'stocks' ? stockSectors : marketType === 'crypto' ? cryptoSectors : forexCategories;

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]
    );
  };

  const clearAll = () => {
    setSearchQuery('');
    setWatchlistOnly(false);
    setSelectedSectors([]);
  };

  return (
    <div className="w-80 h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-r border-gray-800 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#00FF88]" />
            <h3 className="text-lg font-semibold text-white">Filters</h3>
          </div>
          <button
            onClick={clearAll}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Search */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Search Symbols
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symbols..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF88]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Watchlist Toggle */}
        <label className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
          <input
            type="checkbox"
            checked={watchlistOnly}
            onChange={(e) => setWatchlistOnly(e.target.checked)}
            className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
          />
          <span className="text-sm text-white">Only Watchlist Symbols</span>
        </label>

        {/* Preset Filters */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Quick Filters
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presetFilters.map((preset) => (
              <button
                key={preset.id}
                className="flex items-center gap-2 p-2 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 hover:border-[#00FF88]/50 hover:text-white transition-all"
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sector/Category Filters */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            {marketType === 'stocks' ? 'Sectors' : marketType === 'crypto' ? 'Categories' : 'Pairs'}
          </label>
          <div className="space-y-1">
            {sectors.map((sector) => (
              <label
                key={sector}
                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedSectors.includes(sector)}
                  onChange={() => toggleSector(sector)}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                />
                <span className="text-sm text-gray-300">{sector}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Market Cap/Volume Range (for stocks/crypto) */}
        {marketType !== 'forex' && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Market Cap
            </label>
            <div className="space-y-2">
              {['Mega', 'Large', 'Mid', 'Small', 'Micro'].map((cap) => (
                <label
                  key={cap}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                  />
                  <span className="text-sm text-gray-300">{cap} Cap</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        <div>
          <button
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="w-full flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg text-sm font-medium text-white hover:bg-gray-800/50 transition-colors"
          >
            <span>Advanced Filters</span>
            {advancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {advancedOpen && (
            <div className="mt-3 space-y-3">
              {/* RSI Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  RSI (14)
                </label>
                <div className="space-y-1">
                  {['Oversold (<30)', 'Neutral (30-70)', 'Overbought (>70)'].map((range) => (
                    <label
                      key={range}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                      />
                      <span className="text-xs text-gray-300">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sentiment (for stocks) */}
              {marketType === 'stocks' && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    Sentiment
                  </label>
                  <div className="flex gap-2">
                    {['Bearish', 'Neutral', 'Bullish'].map((sentiment) => (
                      <button
                        key={sentiment}
                        className="flex-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300 hover:border-[#00FF88]/50 transition-colors"
                      >
                        {sentiment}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Apply Button */}
        <button className="w-full py-2.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
