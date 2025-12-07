import { Filter, RotateCcw, ChevronDown, Star, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface FiltersPanelProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
}

export function FiltersPanel({ filters, onFiltersChange, onReset }: FiltersPanelProps) {
  const [autoApply, setAutoApply] = useState(true);

  const assetTypes = ['Stocks', 'Crypto', 'Forex', 'Indices'];
  const strategyTypes = ['Scalping', 'Intraday', 'Swing', 'Positional', 'Long-term'];
  const riskLevels = [
    { label: 'Low', color: 'green', emoji: '🟢' },
    { label: 'Medium', color: 'yellow', emoji: '🟡' },
    { label: 'High', color: 'red', emoji: '🔴' },
  ];
  const timeframes = ['1m', '5m', '15m', '1H', '1D', '1W'];
  const indicators = ['RSI', 'MACD', 'EMA', 'Bollinger', 'VWAP', 'Custom'];
  const presets = [
    { label: 'Best for beginners', icon: Star },
    { label: 'Low drawdown strategies', icon: TrendingUp },
    { label: 'Consistent performers', icon: Star },
    { label: 'High win-rate setups', icon: Zap },
  ];

  const toggleFilter = (category: string, value: string) => {
    const current = filters[category] || [];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [category]: updated });
  };

  return (
    <div className="w-80 h-full overflow-y-auto bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-r border-gray-800 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          title="Reset filters"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Asset Type */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Asset Type</h4>
          <div className="space-y-2">
            {assetTypes.map((asset) => (
              <label key={asset} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.assetTypes?.includes(asset)}
                  onChange={() => toggleFilter('assetTypes', asset)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#00FF88] focus:ring-[#00FF88] focus:ring-offset-0"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {asset}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Strategy Type */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Strategy Type</h4>
          <div className="space-y-2">
            {strategyTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.strategyTypes?.includes(type)}
                  onChange={() => toggleFilter('strategyTypes', type)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#00C8FF] focus:ring-[#00C8FF] focus:ring-offset-0"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Risk Level */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Risk Level</h4>
          <div className="space-y-2">
            {riskLevels.map((risk) => (
              <button
                key={risk.label}
                onClick={() => toggleFilter('riskLevels', risk.label)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  filters.riskLevels?.includes(risk.label)
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                )}
              >
                <span>{risk.emoji}</span>
                <span>{risk.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Based on max drawdown & volatility
          </div>
        </div>

        {/* Performance Filters */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Performance</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Min Win Rate (%)</label>
              <input
                type="number"
                placeholder="e.g., 60"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Min CAGR (%)</label>
              <input
                type="number"
                placeholder="e.g., 20"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Max Drawdown (%)</label>
              <input
                type="number"
                placeholder="e.g., 15"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
          </div>
        </div>

        {/* Timeframe */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Timeframe</h4>
          <div className="flex flex-wrap gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => toggleFilter('timeframes', tf)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  filters.timeframes?.includes(tf)
                    ? 'bg-[#00C8FF] text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Indicators Used</h4>
          <div className="flex flex-wrap gap-2">
            {indicators.map((indicator) => (
              <button
                key={indicator}
                onClick={() => toggleFilter('indicators', indicator)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  filters.indicators?.includes(indicator)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                )}
              >
                {indicator}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Minimum Rating</h4>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onFiltersChange({ ...filters, minRating: rating })}
                className={cn(
                  'flex-1 py-2 rounded-lg text-xs font-medium transition-all',
                  filters.minRating === rating
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                )}
              >
                {rating}⭐
              </button>
            ))}
          </div>
        </div>

        {/* Trending Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-white">Recently Trending 🔥</span>
          </div>
          <button
            onClick={() => onFiltersChange({ ...filters, trending: !filters.trending })}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors',
              filters.trending ? 'bg-[#00FF88]' : 'bg-gray-700'
            )}
          >
            <div
              className={cn(
                'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                filters.trending ? 'right-1' : 'left-1'
              )}
            />
          </button>
        </div>

        {/* Preset Filters */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Quick Presets</h4>
          <div className="space-y-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                className="w-full flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-lg text-sm text-white hover:bg-[#00FF88]/20 transition-colors"
              >
                <preset.icon className="w-4 h-4 text-[#00FF88]" />
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Auto-apply Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <span className="text-sm text-white">Auto-apply</span>
          <button
            onClick={() => setAutoApply(!autoApply)}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors',
              autoApply ? 'bg-[#00C8FF]' : 'bg-gray-700'
            )}
          >
            <div
              className={cn(
                'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                autoApply ? 'right-1' : 'left-1'
              )}
            />
          </button>
        </div>

        {/* Apply Button */}
        {!autoApply && (
          <button className="w-full px-4 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Apply Filters
          </button>
        )}
      </div>
    </div>
  );
}
