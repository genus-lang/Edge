import { useState } from 'react';
import { Search, Plus, Star, TrendingUp, Activity, BarChart3, Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Indicator {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: string;
  type: 'Overlay' | 'Separate Panel';
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  isFavorite: boolean;
}

interface IndicatorLibraryProps {
  onAddIndicator: (indicator: Indicator) => void;
  onToggleFavorite: (id: string) => void;
}

const indicators: Indicator[] = [
  {
    id: 'rsi',
    name: 'RSI (Relative Strength Index)',
    shortName: 'RSI',
    description: 'Momentum oscillator measuring overbought/oversold conditions',
    category: 'Momentum',
    type: 'Separate Panel',
    complexity: 'Beginner',
    isFavorite: true,
  },
  {
    id: 'macd',
    name: 'MACD (Moving Average Convergence Divergence)',
    shortName: 'MACD',
    description: 'Trend-following momentum indicator showing relationship between two MAs',
    category: 'Momentum',
    type: 'Separate Panel',
    complexity: 'Intermediate',
    isFavorite: false,
  },
  {
    id: 'ema',
    name: 'EMA (Exponential Moving Average)',
    shortName: 'EMA',
    description: 'Weighted moving average giving more weight to recent prices',
    category: 'Trend',
    type: 'Overlay',
    complexity: 'Beginner',
    isFavorite: true,
  },
  {
    id: 'bollinger',
    name: 'Bollinger Bands',
    shortName: 'BB',
    description: 'Volatility bands placed above and below a moving average',
    category: 'Volatility',
    type: 'Overlay',
    complexity: 'Intermediate',
    isFavorite: false,
  },
  {
    id: 'stochastic',
    name: 'Stochastic Oscillator',
    shortName: 'Stoch',
    description: 'Momentum indicator comparing closing price to price range',
    category: 'Momentum',
    type: 'Separate Panel',
    complexity: 'Intermediate',
    isFavorite: false,
  },
  {
    id: 'atr',
    name: 'ATR (Average True Range)',
    shortName: 'ATR',
    description: 'Volatility indicator measuring market volatility',
    category: 'Volatility',
    type: 'Separate Panel',
    complexity: 'Intermediate',
    isFavorite: false,
  },
  {
    id: 'vwap',
    name: 'VWAP (Volume Weighted Average Price)',
    shortName: 'VWAP',
    description: 'Trading benchmark giving average price weighted by volume',
    category: 'Volume',
    type: 'Overlay',
    complexity: 'Beginner',
    isFavorite: false,
  },
  {
    id: 'obv',
    name: 'OBV (On Balance Volume)',
    shortName: 'OBV',
    description: 'Cumulative volume indicator predicting price movements',
    category: 'Volume',
    type: 'Separate Panel',
    complexity: 'Intermediate',
    isFavorite: false,
  },
];

export function IndicatorLibrary({ onAddIndicator, onToggleFavorite }: IndicatorLibraryProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All', 'Trend', 'Momentum', 'Volatility', 'Volume', 'Oscillators', 'Popular'];

  const filteredIndicators = indicators.filter((indicator) => {
    const matchesTab = activeTab === 'All' || indicator.category === activeTab || (activeTab === 'Popular' && indicator.isFavorite);
    const matchesSearch = indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          indicator.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Trend':
        return TrendingUp;
      case 'Momentum':
        return Activity;
      case 'Volatility':
        return BarChart3;
      case 'Volume':
        return Volume2;
      default:
        return Activity;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-r border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm font-semibold text-white mb-3">Indicator Library</h3>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indicator (RSI, MACD, EMA...)"
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF88]/50"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                activeTab === tab
                  ? 'bg-[#00C8FF] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Indicator List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredIndicators.map((indicator) => {
          const CategoryIcon = getCategoryIcon(indicator.category);
          return (
            <div
              key={indicator.id}
              className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  <CategoryIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white mb-1">{indicator.name}</div>
                    <div className="text-xs text-gray-400 line-clamp-2">{indicator.description}</div>
                  </div>
                </div>

                <button
                  onClick={() => onToggleFavorite(indicator.id)}
                  className="flex-shrink-0 text-gray-600 hover:text-yellow-500 transition-colors"
                >
                  <Star className={cn('w-4 h-4', indicator.isFavorite && 'fill-yellow-500 text-yellow-500')} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'px-2 py-0.5 rounded text-xs font-semibold',
                    indicator.type === 'Overlay'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-purple-500/10 text-purple-400'
                  )}>
                    {indicator.type}
                  </span>
                  <span className={cn(
                    'px-2 py-0.5 rounded text-xs font-semibold',
                    indicator.complexity === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                    indicator.complexity === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  )}>
                    {indicator.complexity}
                  </span>
                </div>

                <button
                  onClick={() => onAddIndicator(indicator)}
                  className="flex items-center gap-1 px-3 py-1 bg-[#00FF88] text-black rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
