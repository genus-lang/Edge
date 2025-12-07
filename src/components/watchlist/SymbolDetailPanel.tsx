import { useState } from 'react';
import { X, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { WatchlistSymbol } from './WatchlistTable';

interface SymbolDetailPanelProps {
  symbol: WatchlistSymbol | null;
  onClose: () => void;
}

export function SymbolDetailPanel({ symbol, onClose }: SymbolDetailPanelProps) {
  const [timeframe, setTimeframe] = useState('1D');

  if (!symbol) return null;

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  // Mock chart data
  const chartData = Array.from({ length: 50 }, (_, i) => {
    const basePrice = parseFloat(symbol.price.replace(/[^0-9.]/g, ''));
    return basePrice + (Math.random() - 0.5) * 10;
  });

  const max = Math.max(...chartData);
  const min = Math.min(...chartData);
  const range = max - min || 1;

  const points = chartData
    .map((value, index) => {
      const x = (index / (chartData.length - 1)) * 300;
      const y = 150 - ((value - min) / range) * 150;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-900 border-l border-gray-800 shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-lg font-bold text-gray-300">
                {symbol.symbol.substring(0, 2)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{symbol.symbol}</h2>
                <p className="text-sm text-gray-500">{symbol.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="text-3xl font-bold text-white mb-1">{symbol.price}</div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex items-center gap-1 text-sm font-semibold',
                  symbol.positive ? 'text-[#00FF88]' : 'text-red-400'
                )}
              >
                {symbol.positive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {symbol.change} ({symbol.changePercent})
              </span>
              <span className="text-xs text-gray-600">Today</span>
            </div>
          </div>

          <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            Open Full Details
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mini Chart */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Price Chart</h3>
              <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={cn(
                      'px-2 py-1 text-xs font-medium rounded transition-all',
                      timeframe === tf
                        ? 'bg-[#00FF88] text-black'
                        : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
              <svg viewBox="0 0 300 150" className="w-full h-auto">
                <polyline
                  points={points}
                  fill="none"
                  stroke={symbol.positive ? '#00FF88' : '#EF4444'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Key Stats */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Key Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Market Cap</div>
                <div className="text-sm font-semibold text-white">$2.85T</div>
              </div>
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Volume</div>
                <div className="text-sm font-semibold text-white">{symbol.volume}</div>
              </div>
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Day High</div>
                <div className="text-sm font-semibold text-white">{symbol.dayHigh}</div>
              </div>
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Day Low</div>
                <div className="text-sm font-semibold text-white">{symbol.dayLow}</div>
              </div>
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">52W High</div>
                <div className="text-sm font-semibold text-white">$198.23</div>
              </div>
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">52W Low</div>
                <div className="text-sm font-semibold text-white">$124.17</div>
              </div>
            </div>
          </div>

          {/* Signals & Alerts */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Signals & Alerts</h3>
            {symbol.signal ? (
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">Current Signal</span>
                  {symbol.signalSource === 'AI' && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#00C8FF]/10 text-[#00C8FF]">
                      AI Generated
                    </span>
                  )}
                </div>
                <div className="text-sm font-semibold text-[#00FF88]">{symbol.signal}</div>
              </div>
            ) : (
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg mb-3 text-center text-sm text-gray-600">
                No active signals
              </div>
            )}

            {symbol.hasAlert && (
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Active Alerts</div>
                <div className="text-sm font-semibold text-white">2 alerts set</div>
              </div>
            )}

            <button className="w-full mt-3 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors">
              Manage Alerts
            </button>
          </div>

          {/* Quick Trade */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Quick Trade</h3>
            <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 bg-[#00FF88] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  Buy
                </button>
                <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  Sell
                </button>
              </div>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white">
                <option>Market Order</option>
                <option>Limit Order</option>
                <option>Stop Loss</option>
              </select>
              <input
                type="number"
                placeholder="Quantity"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500"
              />
              <p className="text-xs text-gray-600">
                This will open the full trading panel with pre-filled details
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
