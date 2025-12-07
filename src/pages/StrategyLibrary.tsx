import { useState } from 'react';
import { LibraryHeader } from '../components/strategy-library/LibraryHeader';
import { FiltersPanel } from '../components/strategy-library/FiltersPanel';
import { StrategyCard } from '../components/strategy-library/StrategyCard';
import { ComparisonDrawer } from '../components/strategy-library/ComparisonDrawer';

const mockStrategies = [
  {
    id: 'str-1',
    name: 'RSI + EMA Momentum Breakout',
    subtitle: 'RSI + EMA Trend Strategy',
    assetType: 'Stocks',
    timeframe: 'Intraday',
    riskLevel: 'Medium' as const,
    rating: 4.5,
    stats: {
      winRate: 62,
      cagr: 28,
      maxDrawdown: -12,
      sharpe: 1.6,
    },
    description: 'A trend-following strategy using EMA crossover and RSI confirmation to capture consistent intraday moves. Targets high-momentum stocks with strong volume support.',
    indicators: ['RSI(14)', 'EMA(20, 50)', 'Volume Filter'],
    popularity: 4283,
    isTrending: true,
    backtestCount: 1240,
    isPremium: false,
    isVerified: true,
    chartData: [40, 45, 42, 50, 55, 52, 60, 65, 62, 70, 68, 75, 80],
  },
  {
    id: 'str-2',
    name: 'MACD Divergence Reversal',
    subtitle: 'Mean Reversion Strategy',
    assetType: 'Crypto',
    timeframe: 'Swing',
    riskLevel: 'High' as const,
    rating: 4.2,
    stats: {
      winRate: 58,
      cagr: 45,
      maxDrawdown: -22,
      sharpe: 1.4,
    },
    description: 'Identifies divergence between price and MACD to catch powerful reversal moves in crypto markets. Best suited for volatile assets with clear trend exhaustion signals.',
    indicators: ['MACD(12, 26, 9)', 'RSI(14)', 'Bollinger Bands'],
    popularity: 3127,
    isTrending: false,
    backtestCount: 890,
    isPremium: true,
    isVerified: false,
    chartData: [35, 40, 38, 45, 50, 48, 55, 58, 55, 62, 60, 68, 72],
  },
  {
    id: 'str-3',
    name: 'Bollinger Bands Squeeze',
    subtitle: 'Volatility Breakout System',
    assetType: 'Forex',
    timeframe: 'Scalping',
    riskLevel: 'Low' as const,
    rating: 4.8,
    stats: {
      winRate: 68,
      cagr: 22,
      maxDrawdown: -8,
      sharpe: 2.1,
    },
    description: 'Exploits low-volatility periods followed by explosive breakouts using Bollinger Band squeeze patterns. Highly effective in ranging forex pairs with tight stop losses.',
    indicators: ['Bollinger Bands', 'ATR', 'Volume'],
    popularity: 5891,
    isTrending: true,
    backtestCount: 2100,
    isPremium: false,
    isVerified: true,
    chartData: [45, 48, 46, 52, 55, 53, 58, 62, 60, 65, 68, 70, 75],
  },
  {
    id: 'str-4',
    name: 'VWAP + Support/Resistance',
    subtitle: 'Institutional Flow Following',
    assetType: 'Stocks',
    timeframe: 'Intraday',
    riskLevel: 'Low' as const,
    rating: 4.6,
    stats: {
      winRate: 65,
      cagr: 24,
      maxDrawdown: -10,
      sharpe: 1.9,
    },
    description: 'Follows institutional order flow by trading bounces from VWAP and key S/R levels. Combines price action with volume analysis for high-probability setups.',
    indicators: ['VWAP', 'Support/Resistance', 'Volume Profile'],
    popularity: 6234,
    isTrending: false,
    backtestCount: 1650,
    isPremium: false,
    isVerified: true,
    chartData: [42, 46, 44, 50, 53, 51, 56, 60, 58, 63, 66, 68, 72],
  },
  {
    id: 'str-5',
    name: 'Triple EMA Crossover',
    subtitle: 'Multi-Timeframe Trend System',
    assetType: 'Indices',
    timeframe: 'Swing',
    riskLevel: 'Medium' as const,
    rating: 4.3,
    stats: {
      winRate: 60,
      cagr: 32,
      maxDrawdown: -15,
      sharpe: 1.7,
    },
    description: 'Uses three EMAs across different timeframes to identify strong trending moves in major indices. Waits for alignment before entry with trailing stops.',
    indicators: ['EMA(8, 21, 55)', 'ADX', 'Momentum'],
    popularity: 3845,
    isTrending: true,
    backtestCount: 1120,
    isPremium: true,
    isVerified: false,
    chartData: [38, 42, 40, 47, 52, 50, 57, 61, 59, 66, 64, 71, 76],
  },
  {
    id: 'str-6',
    name: 'Stochastic + RSI Combo',
    subtitle: 'Dual Oscillator System',
    assetType: 'Crypto',
    timeframe: 'Intraday',
    riskLevel: 'Medium' as const,
    rating: 4.4,
    stats: {
      winRate: 63,
      cagr: 35,
      maxDrawdown: -18,
      sharpe: 1.5,
    },
    description: 'Combines Stochastic and RSI oscillators to filter out false signals and identify genuine momentum shifts. Works best in trending crypto markets.',
    indicators: ['Stochastic(14, 3)', 'RSI(14)', 'EMA(20)'],
    popularity: 4521,
    isTrending: false,
    backtestCount: 1380,
    isPremium: false,
    isVerified: true,
    chartData: [36, 41, 39, 46, 51, 49, 56, 60, 58, 64, 62, 69, 74],
  },
];

export function StrategyLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    assetTypes: [],
    strategyTypes: [],
    riskLevels: [],
    timeframes: [],
    indicators: [],
    minRating: 0,
    trending: false,
  });
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [savedStrategies, setSavedStrategies] = useState<string[]>(['str-3', 'str-4']);
  const [showComparison, setShowComparison] = useState(false);

  // Filter strategies based on search and filters
  const filteredStrategies = mockStrategies.filter((strategy) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        strategy.name.toLowerCase().includes(query) ||
        strategy.subtitle.toLowerCase().includes(query) ||
        strategy.assetType.toLowerCase().includes(query) ||
        strategy.indicators.some(ind => ind.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Asset type filter
    if (filters.assetTypes.length > 0 && !filters.assetTypes.includes(strategy.assetType)) {
      return false;
    }

    // Risk level filter
    if (filters.riskLevels.length > 0 && !filters.riskLevels.includes(strategy.riskLevel)) {
      return false;
    }

    // Trending filter
    if (filters.trending && !strategy.isTrending) {
      return false;
    }

    return true;
  });

  const handleToggleCompare = (strategyId: string) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategyId)
        ? prev.filter((id) => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const handleToggleSave = (strategyId: string) => {
    setSavedStrategies((prev) =>
      prev.includes(strategyId)
        ? prev.filter((id) => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const handleOpenCompare = () => {
    if (selectedStrategies.length >= 2) {
      setShowComparison(true);
    }
  };

  const selectedStrategyObjects = mockStrategies.filter((s) =>
    selectedStrategies.includes(s.id)
  );

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <LibraryHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateNew={() => console.log('Create new strategy')}
        onViewSaved={() => console.log('View saved strategies')}
        compareCount={selectedStrategies.length}
        onOpenCompare={handleOpenCompare}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Filters Panel */}
        <FiltersPanel
          filters={filters}
          onFiltersChange={setFilters}
          onReset={() => setFilters({
            assetTypes: [],
            strategyTypes: [],
            riskLevels: [],
            timeframes: [],
            indicators: [],
            minRating: 0,
            trending: false,
          })}
        />

        {/* Strategy Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#0A0E13] to-gray-900">
          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="text-white font-semibold">{filteredStrategies.length}</span> strategies
            </div>
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50">
              <option>Sort by: Popularity</option>
              <option>Sort by: Rating</option>
              <option>Sort by: Win Rate</option>
              <option>Sort by: CAGR</option>
              <option>Sort by: Sharpe Ratio</option>
            </select>
          </div>

          {/* Grid */}
          {filteredStrategies.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStrategies.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  isSelected={selectedStrategies.includes(strategy.id)}
                  isSaved={savedStrategies.includes(strategy.id)}
                  onView={() => console.log('View strategy:', strategy.id)}
                  onClone={() => console.log('Clone strategy:', strategy.id)}
                  onBacktest={() => console.log('Backtest strategy:', strategy.id)}
                  onToggleSave={() => handleToggleSave(strategy.id)}
                  onToggleCompare={() => handleToggleCompare(strategy.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-xl font-bold text-white mb-2">No strategies match your filters</div>
                <p className="text-sm text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setFilters({
                        assetTypes: [],
                        strategyTypes: [],
                        riskLevels: [],
                        timeframes: [],
                        indicators: [],
                        minRating: 0,
                        trending: false,
                      });
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => console.log('View popular strategies')}
                    className="px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    View Popular Strategies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Drawer */}
      {showComparison && (
        <ComparisonDrawer
          strategies={selectedStrategyObjects}
          onClose={() => setShowComparison(false)}
          onCloneSelected={() => console.log('Clone selected strategies')}
          onBacktestSelected={() => console.log('Backtest selected strategies')}
        />
      )}
    </div>
  );
}
