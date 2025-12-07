import { Search, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AIHeaderProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  horizon: string;
  onHorizonChange: (horizon: string) => void;
  selectedUniverse: string[];
  onUniverseChange: (universe: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  autoRefresh: boolean;
  onAutoRefreshToggle: () => void;
  lastUpdated: string;
  onRefresh: () => void;
}

export function AIHeader({
  selectedModel,
  onModelChange,
  horizon,
  onHorizonChange,
  selectedUniverse,
  onUniverseChange,
  searchQuery,
  onSearchChange,
  autoRefresh,
  onAutoRefreshToggle,
  lastUpdated,
  onRefresh,
}: AIHeaderProps) {
  const horizons = ['1D', '1W', '1M', '3M', 'Custom'];
  const universeOptions = ['All', 'Stocks', 'Crypto', 'Forex', 'Indices'];

  const toggleUniverse = (option: string) => {
    if (option === 'All') {
      onUniverseChange(['All']);
    } else {
      const newSelection = selectedUniverse.includes(option)
        ? selectedUniverse.filter((u) => u !== option)
        : [...selectedUniverse.filter((u) => u !== 'All'), option];
      onUniverseChange(newSelection.length === 0 ? ['All'] : newSelection);
    }
  };

  return (
    <div className="space-y-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Predictions</h1>
        <p className="text-sm text-gray-400">
          Model-driven forecasts for your selected markets
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Model Selector */}
        <div className="flex-1 min-w-[250px]">
          <label className="block text-xs font-medium text-gray-500 mb-2">Model</label>
          <select
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-[#00FF88]/50"
          >
            <option value="quantnet-v3">QuantNet v3</option>
            <option value="short-term">Short-Term Momentum AI</option>
            <option value="long-term">Long-Term Macro AI</option>
            <option value="ensemble">Ensemble Model</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            LSTM + Gradient Boosting with 2h refresh
          </p>
        </div>

        {/* Horizon Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Prediction Horizon</label>
          <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
            {horizons.map((h) => (
              <button
                key={h}
                onClick={() => onHorizonChange(h)}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all',
                  horizon === h
                    ? 'bg-[#00C8FF] text-black'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[250px]">
          <label className="block text-xs font-medium text-gray-500 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search symbol or name (e.g., AAPL, BTC)"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF88]/50"
            />
          </div>
        </div>

        {/* Refresh Controls */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Updates</label>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-medium hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={onAutoRefreshToggle}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                autoRefresh ? 'bg-[#00FF88]/10 text-[#00FF88]' : 'bg-gray-800 text-gray-400'
              )}
              title="Auto-refresh every 15 min"
            >
              {autoRefresh ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Universe Filter */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Asset Universe</label>
        <div className="flex flex-wrap gap-2">
          {universeOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleUniverse(option)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                selectedUniverse.includes(option)
                  ? 'bg-[#00FF88] text-black'
                  : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
