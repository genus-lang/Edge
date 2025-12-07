import { useState } from 'react';
import { GripVertical, TrendingUp, TrendingDown, Bell, BellDot, BarChart3, Activity, MoreVertical } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface WatchlistSymbol {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  assetType: 'Stock' | 'Crypto' | 'Forex' | 'Index';
  price: string;
  change: string;
  changePercent: string;
  positive: boolean;
  volume: string;
  dayHigh: string;
  dayLow: string;
  currentPriceInRange: number; // 0-100
  sparkline: number[];
  signal?: 'Bullish' | 'Bearish' | 'Overbought' | 'Oversold';
  signalSource?: 'AI' | 'Manual';
  hasAlert: boolean;
  alertTriggered: boolean;
  holdings?: {
    quantity: number;
    value: string;
  };
}

interface WatchlistTableProps {
  symbols: WatchlistSymbol[];
  onSymbolClick?: (symbol: WatchlistSymbol) => void;
  onRemoveSymbol?: (symbolId: string) => void;
  onManageAlerts?: (symbolId: string) => void;
  onOpenChart?: (symbol: string) => void;
  onOpenTrade?: (symbol: string) => void;
}

// Mini sparkline component
function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width="60" height="20" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#00FF88' : '#EF4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const signalColors = {
  Bullish: 'bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30',
  Bearish: 'bg-red-500/10 text-red-400 border-red-500/30',
  Overbought: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  Oversold: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
};

export function WatchlistTable({
  symbols,
  onSymbolClick,
  onRemoveSymbol,
  onManageAlerts,
  onOpenChart,
  onOpenTrade,
}: WatchlistTableProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [selectedSymbols, setSelectedSymbols] = useState<Set<string>>(new Set());

  const toggleSelection = (symbolId: string) => {
    const newSelected = new Set(selectedSymbols);
    if (newSelected.has(symbolId)) {
      newSelected.delete(symbolId);
    } else {
      newSelected.add(symbolId);
    }
    setSelectedSymbols(newSelected);
  };

  if (symbols.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-gray-800 flex items-center justify-center mb-4">
          <BarChart3 className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h3>
        <p className="text-gray-400 mb-6">Add symbols to start tracking markets in real-time</p>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
            + Add Symbol
          </button>
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Browse Market Overview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="pb-3 w-8"></th>
            <th className="pb-3 w-8">
              <input
                type="checkbox"
                className="rounded border-gray-700 bg-gray-800"
                checked={selectedSymbols.size === symbols.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSymbols(new Set(symbols.map((s) => s.id)));
                  } else {
                    setSelectedSymbols(new Set());
                  }
                }}
              />
            </th>
            <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Symbol
            </th>
            <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change
            </th>
            <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              % Change
            </th>
            <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume
            </th>
            <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Day Range
            </th>
            <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trend
            </th>
            <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Signal
            </th>
            <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Alerts
            </th>
            <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Holdings
            </th>
            <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {symbols.map((symbol) => (
            <tr
              key={symbol.id}
              className={cn(
                'group hover:bg-gray-800/30 transition-colors',
                symbol.alertTriggered && 'border-l-2 border-l-[#00FF88]'
              )}
            >
              {/* Drag Handle */}
              <td className="py-3 cursor-grab active:cursor-grabbing">
                <GripVertical className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </td>

              {/* Checkbox */}
              <td className="py-3">
                <input
                  type="checkbox"
                  checked={selectedSymbols.has(symbol.id)}
                  onChange={() => toggleSelection(symbol.id)}
                  className="rounded border-gray-700 bg-gray-800"
                />
              </td>

              {/* Symbol */}
              <td
                className="py-3 cursor-pointer"
                onClick={() => onSymbolClick?.(symbol)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">
                    {symbol.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{symbol.symbol}</div>
                    <div className="text-xs text-gray-500">
                      {symbol.name} · {symbol.exchange}
                    </div>
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="py-3 text-right">
                <div className="text-sm font-semibold text-white">{symbol.price}</div>
                <div className="text-xs text-gray-600">Updated 3s ago</div>
              </td>

              {/* Change */}
              <td className="py-3 text-right">
                <span
                  className={cn(
                    'text-sm font-medium',
                    symbol.positive ? 'text-[#00FF88]' : 'text-red-400'
                  )}
                >
                  {symbol.change}
                </span>
              </td>

              {/* % Change */}
              <td className="py-3 text-right">
                <div
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold',
                    symbol.positive
                      ? 'bg-[#00FF88]/10 text-[#00FF88]'
                      : 'bg-red-500/10 text-red-400'
                  )}
                >
                  {symbol.positive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {symbol.changePercent}
                </div>
              </td>

              {/* Volume */}
              <td className="py-3 text-right text-sm text-gray-300">{symbol.volume}</td>

              {/* Day Range */}
              <td className="py-3">
                <div className="px-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>L: {symbol.dayLow}</span>
                    <span>H: {symbol.dayHigh}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-[#00FF88] rounded-full"
                      style={{ width: `${symbol.currentPriceInRange}%` }}
                    />
                  </div>
                </div>
              </td>

              {/* Sparkline */}
              <td className="py-3 text-center">
                <MiniSparkline data={symbol.sparkline} positive={symbol.positive} />
              </td>

              {/* Signal */}
              <td className="py-3 text-center">
                {symbol.signal ? (
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className={cn(
                        'px-2 py-1 text-xs rounded-full font-medium border',
                        signalColors[symbol.signal]
                      )}
                    >
                      {symbol.signal}
                    </span>
                    {symbol.signalSource === 'AI' && (
                      <span className="text-xs text-[#00C8FF]" title="AI Generated">
                        AI
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-gray-600">—</span>
                )}
              </td>

              {/* Alerts */}
              <td className="py-3 text-center">
                <button
                  onClick={() => onManageAlerts?.(symbol.id)}
                  className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {symbol.alertTriggered ? (
                    <BellDot className="w-4 h-4 text-[#00FF88]" />
                  ) : symbol.hasAlert ? (
                    <BellDot className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Bell className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </td>

              {/* Holdings */}
              <td className="py-3 text-center">
                {symbol.holdings ? (
                  <div className="text-xs">
                    <div className="font-semibold text-white">
                      {symbol.holdings.quantity} shares
                    </div>
                    <div className="text-gray-500">{symbol.holdings.value}</div>
                  </div>
                ) : (
                  <span className="text-xs text-gray-600">—</span>
                )}
              </td>

              {/* Actions */}
              <td className="py-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => onOpenChart?.(symbol.symbol)}
                    className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-600 hover:text-[#00C8FF] transition-colors"
                    title="Open Chart"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenTrade?.(symbol.symbol)}
                    className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-600 hover:text-[#00FF88] transition-colors"
                    title="Trade"
                  >
                    <Activity className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${symbol.symbol} from watchlist?`)) {
                        onRemoveSymbol?.(symbol.id);
                      }
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bulk Actions Bar */}
      {selectedSymbols.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex items-center gap-4 z-50">
          <span className="text-sm text-gray-400">{selectedSymbols.size} selected</span>
          <div className="h-6 w-px bg-gray-700" />
          <button className="px-3 py-1.5 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-sm rounded-lg hover:bg-[#00FF88]/20 transition-colors">
            Add to Watchlist
          </button>
          <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            Set Alerts
          </button>
          <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            Export
          </button>
          <button
            onClick={() => setSelectedSymbols(new Set())}
            className="px-3 py-1.5 text-gray-500 text-sm hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
