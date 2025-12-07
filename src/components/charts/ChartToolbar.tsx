import { useState } from 'react';
import { Search, TrendingUp, Plus, Settings, Save, Grid, BarChart3, LineChart as LineChartIcon, AreaChart, CandlestickChart, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChartToolbarProps {
  symbol: string;
  onSymbolChange: (symbol: string) => void;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  chartType: string;
  onChartTypeChange: (type: string) => void;
  layout: number;
  onLayoutChange: (layout: number) => void;
  onOpenIndicators: () => void;
  onOpenSettings: () => void;
}

export function ChartToolbar({
  symbol,
  onSymbolChange,
  timeframe,
  onTimeframeChange,
  chartType,
  onChartTypeChange,
  layout,
  onLayoutChange,
  onOpenIndicators,
  onOpenSettings,
}: ChartToolbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [compareSymbol, setCompareSymbol] = useState('');

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];
  const chartTypes = [
    { id: 'candlestick', label: 'Candlestick', icon: CandlestickChart },
    { id: 'line', label: 'Line', icon: LineChartIcon },
    { id: 'area', label: 'Area', icon: AreaChart },
    { id: 'bars', label: 'Bars', icon: BarChart3 },
  ];
  const layouts = [1, 2, 4, 6];

  const recentSymbols = ['AAPL', 'TSLA', 'BTCUSDT', 'ETHUSDT', 'GOOGL'];

  return (
    <div className="h-auto sm:h-14 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-b border-gray-800 flex flex-col sm:flex-row items-start sm:items-center px-2 sm:px-4 py-2 sm:py-0 gap-2 sm:gap-4 overflow-x-auto">
      {/* Symbol Search */}
      <div className="relative w-full sm:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={symbol}
            onChange={(e) => onSymbolChange(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            placeholder="Search symbol..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF88]/50"
          />
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div className="absolute top-full mt-2 w-full sm:w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 px-2 py-1">RECENT</div>
              {recentSymbols.map((sym) => (
                <button
                  key={sym}
                  onClick={() => {
                    onSymbolChange(sym);
                    setSearchOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left"
                >
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{sym}</div>
                    <div className="text-xs text-gray-500">
                      {sym === 'AAPL' ? 'Apple Inc. (NASDAQ)' :
                       sym === 'TSLA' ? 'Tesla Inc. (NASDAQ)' :
                       sym === 'BTCUSDT' ? 'Bitcoin / Tether (Binance)' :
                       sym === 'ETHUSDT' ? 'Ethereum / Tether (Binance)' :
                       'Alphabet Inc. (NASDAQ)'}
                    </div>
                  </div>
                  <Star className="w-4 h-4 text-gray-600 hover:text-yellow-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Separator - Hidden on mobile */}
      <div className="hidden sm:block w-px h-8 bg-gray-700" />

      {/* Timeframe Selector */}
      <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => onTimeframeChange(tf)}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
              timeframe === tf
                ? 'bg-[#00C8FF] text-black'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            )}
          >
            {tf}
          </button>
        ))}
        <button className="px-2.5 sm:px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg text-xs sm:text-sm font-medium hover:text-white transition-colors whitespace-nowrap">
          More
        </button>
      </div>

      {/* Separator - Hidden on mobile */}
      <div className="hidden lg:block w-px h-8 bg-gray-700" />

      {/* Chart Type */}
      <div className="flex items-center gap-1">
        {chartTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChartTypeChange(type.id)}
            className={cn(
              'p-2 rounded-lg transition-all',
              chartType === type.id
                ? 'bg-[#00FF88] text-black'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            )}
            title={type.label}
          >
            <type.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Separator - Hidden on mobile */}
      <div className="hidden lg:block w-px h-8 bg-gray-700" />

      {/* Indicators Button */}
      <button
        onClick={onOpenIndicators}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Indicators</span>
        <span className="sm:hidden">+</span>
      </button>

      {/* Compare - Hidden on mobile */}
      <div className="relative hidden md:block">
        <input
          type="text"
          value={compareSymbol}
          onChange={(e) => setCompareSymbol(e.target.value)}
          placeholder="Compare..."
          className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF88]/50"
        />
      </div>

      {/* Spacer */}
      <div className="hidden lg:flex flex-1" />

      {/* Layout Controls */}
      <div className="flex items-center gap-2">
        {layouts.map((l) => (
          <button
            key={l}
            onClick={() => onLayoutChange(l)}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all',
              layout === l
                ? 'bg-[#00FF88] text-black'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            )}
            title={`${l} Panel${l > 1 ? 's' : ''}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Save Layout */}
      <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors" title="Save Layout">
        <Save className="w-4 h-4" />
      </button>

      {/* Settings */}
      <button
        onClick={onOpenSettings}
        className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
        title="Chart Settings"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
}