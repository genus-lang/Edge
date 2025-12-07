import { Search, Plus, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SymbolDatasetBarProps {
  symbol: string;
  onSymbolChange: (symbol: string) => void;
  marketType: string;
  onMarketTypeChange: (type: string) => void;
  timeframes: string[];
  onTimeframesChange: (timeframes: string[]) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  dataSource: string;
  onDataSourceChange: (source: string) => void;
}

export function SymbolDatasetBar({
  symbol,
  onSymbolChange,
  marketType,
  onMarketTypeChange,
  timeframes,
  onTimeframesChange,
  dateRange,
  onDateRangeChange,
  dataSource,
  onDataSourceChange,
}: SymbolDatasetBarProps) {
  const marketTypes = ['Stocks', 'Crypto', 'Forex', 'Indices'];
  const availableTimeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];
  const dateRanges = ['1M', '3M', '6M', '1Y', 'Custom'];
  const dataSources = ['NASDAQ', 'NYSE', 'Binance', 'Coinbase'];

  const toggleTimeframe = (tf: string) => {
    if (timeframes.includes(tf)) {
      onTimeframesChange(timeframes.filter((t) => t !== tf));
    } else {
      onTimeframesChange([...timeframes, tf]);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-b border-gray-800">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Symbol Search */}
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={symbol}
            onChange={(e) => onSymbolChange(e.target.value)}
            placeholder="Search symbol: AAPL, BTCUSDT, EURUSD..."
            className="w-80 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF88]/50"
          />
        </div>

        {/* Market Type Toggle */}
        <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
          {marketTypes.map((type) => (
            <button
              key={type}
              onClick={() => onMarketTypeChange(type)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                marketType === type
                  ? 'bg-[#00C8FF] text-black'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Timeframe Chips */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">TIMEFRAME:</span>
          <div className="flex items-center gap-1">
            {availableTimeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => toggleTimeframe(tf)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  timeframes.includes(tf)
                    ? 'bg-[#00FF88] text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => onDateRangeChange(range)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  dateRange === range
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Data Source */}
        <select
          value={dataSource}
          onChange={(e) => onDataSourceChange(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
        >
          {dataSources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>

        {/* Compare Symbol */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
          <Plus className="w-4 h-4" />
          Compare
        </button>
      </div>
    </div>
  );
}
