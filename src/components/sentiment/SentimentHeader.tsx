import { Search, Calendar, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SentimentHeaderProps {
  marketType: string;
  onMarketTypeChange: (type: string) => void;
  selectedAssets: string[];
  onAssetsChange: (assets: string[]) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  sentimentSource: string;
  onSourceChange: (source: string) => void;
}

export function SentimentHeader({
  marketType,
  onMarketTypeChange,
  selectedAssets,
  onAssetsChange,
  dateRange,
  onDateRangeChange,
  sentimentSource,
  onSourceChange,
}: SentimentHeaderProps) {
  const marketTypes = ['All Markets', 'Stocks', 'Crypto', 'Forex'];
  const dateRanges = ['1D', '1W', '1M', '3M', '6M', '1Y', 'Custom'];
  const sources = ['All Sources', 'News', 'Twitter/X', 'Reddit', 'On-chain', 'Forums'];

  const removeAsset = (asset: string) => {
    onAssetsChange(selectedAssets.filter((a) => a !== asset));
  };

  return (
    <div className="space-y-4">
      {/* Title Row */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Market Sentiment Analysis</h1>
        <p className="text-sm text-gray-400">
          Track crowd mood across news, social media, and markets
        </p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Market Type */}
        <div className="flex-shrink-0">
          <label className="block text-xs font-medium text-gray-500 mb-2">Market Type</label>
          <select
            value={marketType}
            onChange={(e) => onMarketTypeChange(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-[#00FF88]/50"
          >
            {marketTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Asset Selector */}
        <div className="flex-1 min-w-[300px]">
          <label className="block text-xs font-medium text-gray-500 mb-2">Assets</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search symbols (TSLA, AAPL, BTC)..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF88]/50"
            />
          </div>
          {selectedAssets.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedAssets.map((asset) => (
                <div
                  key={asset}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg"
                >
                  <span className="text-xs font-semibold text-[#00FF88]">{asset}</span>
                  <button
                    onClick={() => removeAsset(asset)}
                    className="text-[#00FF88] hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="flex-shrink-0">
          <label className="block text-xs font-medium text-gray-500 mb-2">Date Range</label>
          <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => onDateRangeChange(range)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  dateRange === range
                    ? 'bg-[#00C8FF] text-black'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Sentiment Source */}
        <div className="flex-shrink-0">
          <label className="block text-xs font-medium text-gray-500 mb-2">Source</label>
          <select
            value={sentimentSource}
            onChange={(e) => onSourceChange(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-[#00FF88]/50"
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
