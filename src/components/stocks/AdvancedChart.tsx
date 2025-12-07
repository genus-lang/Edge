import { useState } from 'react';
import { BarChart3, TrendingUp, Settings, Plus, Layers } from 'lucide-react';
import { cn } from '../../lib/utils';

const chartTypes = [
  { id: 'candles', label: 'Candles', icon: BarChart3 },
  { id: 'line', label: 'Line', icon: TrendingUp },
  { id: 'area', label: 'Area', icon: Layers },
];

const timeframes = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y', 'Max'];
const intervals = ['1m', '5m', '15m', '1h', '1D', '1W'];

const availableIndicators = [
  { id: 'rsi', name: 'RSI', category: 'Momentum', default: 14 },
  { id: 'macd', name: 'MACD', category: 'Momentum', default: '12,26,9' },
  { id: 'sma20', name: 'SMA (20)', category: 'Trend', default: 20 },
  { id: 'ema50', name: 'EMA (50)', category: 'Trend', default: 50 },
  { id: 'bb', name: 'Bollinger Bands', category: 'Volatility', default: '20,2' },
  { id: 'vwap', name: 'VWAP', category: 'Volume', default: null },
];

interface AdvancedChartProps {
  symbol: string;
}

export function AdvancedChart({ symbol }: AdvancedChartProps) {
  const [chartType, setChartType] = useState('candles');
  const [timeframe, setTimeframe] = useState('1D');
  const [interval, setInterval] = useState('5m');
  const [activeIndicators, setActiveIndicators] = useState<string[]>([]);
  const [showIndicatorPanel, setShowIndicatorPanel] = useState(false);
  const [showVolume, setShowVolume] = useState(true);

  const toggleIndicator = (id: string) => {
    if (activeIndicators.includes(id)) {
      setActiveIndicators(activeIndicators.filter((i) => i !== id));
    } else {
      setActiveIndicators([...activeIndicators, id]);
    }
  };

  // Mock chart data generation
  const generateChartData = () => {
    const points = 100;
    const basePrice = 150;
    return Array.from({ length: points }, (_, i) => {
      const price = basePrice + (Math.random() - 0.5) * 20 + i * 0.1;
      return {
        x: i,
        open: price - Math.random() * 2,
        high: price + Math.random() * 3,
        low: price - Math.random() * 3,
        close: price,
        volume: Math.random() * 1000000,
      };
    });
  };

  const chartData = generateChartData();

  // Simple candlestick rendering
  const renderCandlesticks = () => {
    const width = 800;
    const height = 400;
    const maxPrice = Math.max(...chartData.map((d) => d.high));
    const minPrice = Math.min(...chartData.map((d) => d.low));
    const priceRange = maxPrice - minPrice;
    const candleWidth = width / chartData.length - 2;

    return (
      <svg width={width} height={height} className="w-full h-auto">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = (height / 4) * i;
          return (
            <line
              key={i}
              x1={0}
              y1={y}
              x2={width}
              y2={y}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="4"
            />
          );
        })}

        {/* Candlesticks */}
        {chartData.slice(0, 80).map((candle, i) => {
          const x = (width / 80) * i + candleWidth / 2;
          const openY = height - ((candle.open - minPrice) / priceRange) * height;
          const closeY = height - ((candle.close - minPrice) / priceRange) * height;
          const highY = height - ((candle.high - minPrice) / priceRange) * height;
          const lowY = height - ((candle.low - minPrice) / priceRange) * height;
          const isGreen = candle.close > candle.open;

          return (
            <g key={i}>
              {/* Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={isGreen ? '#00FF88' : '#EF4444'}
                strokeWidth="1"
              />
              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={Math.min(openY, closeY)}
                width={candleWidth}
                height={Math.abs(closeY - openY) || 1}
                fill={isGreen ? '#00FF88' : '#EF4444'}
                opacity={0.8}
              />
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="relative">
      {/* Chart Controls */}
      <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-t-xl">
        <div className="flex items-center justify-between mb-4">
          {/* Chart Type */}
          <div className="flex items-center gap-2 p-1 bg-gray-800 rounded-lg">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setChartType(type.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
                  chartType === type.id
                    ? 'bg-[#00FF88] text-black'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </button>
            ))}
          </div>

          {/* Timeframe */}
          <div className="flex items-center gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  timeframe === tf
                    ? 'bg-[#00FF88] text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Interval */}
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
          >
            {intervals.map((int) => (
              <option key={int} value={int}>
                {int}
              </option>
            ))}
          </select>

          {/* Indicators Button */}
          <button
            onClick={() => setShowIndicatorPanel(!showIndicatorPanel)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
              showIndicatorPanel
                ? 'bg-[#00FF88] text-black'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            )}
          >
            <Plus className="w-4 h-4" />
            Indicators
          </button>

          {/* Volume Toggle */}
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              showVolume
                ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30'
                : 'bg-gray-800 text-gray-400'
            )}
          >
            Volume
          </button>
        </div>

        {/* Active Indicators */}
        {activeIndicators.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">Active:</span>
            {activeIndicators.map((id) => {
              const indicator = availableIndicators.find((i) => i.id === id);
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs"
                >
                  <span className="text-white">{indicator?.name}</span>
                  <button
                    onClick={() => toggleIndicator(id)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Chart Area */}
      <div className="relative bg-gray-900 border-x border-gray-800">
        <div className="p-6">
          {renderCandlesticks()}
        </div>

        {/* Volume Bars */}
        {showVolume && (
          <div className="px-6 pb-6">
            <div className="flex items-end gap-1 h-20">
              {chartData.slice(0, 80).map((candle, i) => {
                const maxVolume = Math.max(...chartData.map((d) => d.volume));
                const height = (candle.volume / maxVolume) * 100;
                const isGreen = candle.close > candle.open;
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex-1 rounded-t',
                      isGreen ? 'bg-[#00FF88]/30' : 'bg-red-500/30'
                    )}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Indicator Panel */}
      {showIndicatorPanel && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-sm font-semibold text-white">Technical Indicators</h3>
          </div>
          <div className="p-2">
            {['Momentum', 'Trend', 'Volatility', 'Volume'].map((category) => (
              <div key={category} className="mb-3">
                <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase">
                  {category}
                </div>
                {availableIndicators
                  .filter((ind) => ind.category === category)
                  .map((indicator) => (
                    <button
                      key={indicator.id}
                      onClick={() => toggleIndicator(indicator.id)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                        activeIndicators.includes(indicator.id)
                          ? 'bg-[#00FF88]/10 text-[#00FF88]'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      )}
                    >
                      <span>{indicator.name}</span>
                      <div className="flex items-center gap-2">
                        {indicator.default && (
                          <span className="text-xs text-gray-600">({indicator.default})</span>
                        )}
                        {activeIndicators.includes(indicator.id) && (
                          <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-b-xl border-t-0">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>Showing {symbol} · {timeframe} · {interval} interval</div>
          <button className="flex items-center gap-1.5 text-[#00FF88] hover:text-[#00FF88]/80">
            <Settings className="w-3.5 h-3.5" />
            Save Layout
          </button>
        </div>
      </div>
    </div>
  );
}
