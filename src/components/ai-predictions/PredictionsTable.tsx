import { TrendingUp, TrendingDown, Minus, LineChart, Bell, ShoppingCart, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Prediction {
  symbol: string;
  name: string;
  type: 'Stock' | 'Crypto' | 'Forex';
  exchange: string;
  direction: 'Bullish' | 'Bearish' | 'Range-bound';
  expectedMove: string;
  targetPrice: string;
  confidence: number;
  risk: 'Low' | 'Medium' | 'High';
  signal: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  horizon: string;
  lastUpdated: string;
}

interface PredictionsTableProps {
  predictions: Prediction[];
  selectedSymbol: string | null;
  onRowClick: (symbol: string) => void;
}

export function PredictionsTable({ predictions, selectedSymbol, onRowClick }: PredictionsTableProps) {
  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'Bullish':
        return <TrendingUp className="w-4 h-4 text-[#00FF88]" />;
      case 'Bearish':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'Bullish':
        return 'bg-[#00FF88]/10 border-[#00FF88]/30 text-[#00FF88]';
      case 'Bearish':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      default:
        return 'bg-gray-700/50 border-gray-600 text-gray-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-[#00FF88]';
      case 'Medium':
        return 'text-yellow-500';
      case 'High':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSignalColor = (signal: string) => {
    if (signal.includes('Buy')) return 'text-[#00FF88]';
    if (signal.includes('Sell')) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <table className="w-full">
        <thead className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
          <tr>
            <th className="p-4 text-left text-xs font-semibold text-gray-500">
              Asset
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-500">
              Direction
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-500">
              Expected Move
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-500">
              Confidence
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-500">
              Risk
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-500">
              Signal
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction) => (
            <tr
              key={prediction.symbol}
              onClick={() => onRowClick(prediction.symbol)}
              className={cn(
                'border-b border-gray-800 cursor-pointer transition-all',
                selectedSymbol === prediction.symbol
                  ? 'bg-[#00FF88]/5 border-l-4 border-l-[#00FF88]'
                  : 'hover:bg-gray-800/30'
              )}
            >
              {/* Asset */}
              <td className="p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{prediction.symbol}</span>
                    <span className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400">
                      {prediction.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{prediction.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{prediction.exchange}</div>
                </div>
              </td>

              {/* Direction */}
              <td className="p-4">
                <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-semibold', getDirectionColor(prediction.direction))}>
                  {getDirectionIcon(prediction.direction)}
                  {prediction.direction}
                </div>
              </td>

              {/* Expected Move */}
              <td className="p-4">
                <div className="text-sm font-semibold text-white mb-1">
                  {prediction.expectedMove}
                </div>
                <div className="text-xs text-gray-500">
                  Target: {prediction.targetPrice}
                </div>
              </td>

              {/* Confidence */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full transition-all',
                          prediction.confidence >= 75 ? 'bg-[#00FF88]' :
                          prediction.confidence >= 50 ? 'bg-[#00C8FF]' :
                          'bg-yellow-500'
                        )}
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-white w-10 text-right">
                    {prediction.confidence}%
                  </span>
                </div>
              </td>

              {/* Risk */}
              <td className="p-4">
                <span className={cn('text-sm font-semibold', getRiskColor(prediction.risk))}>
                  {prediction.risk}
                </span>
              </td>

              {/* Signal */}
              <td className="p-4">
                <span className={cn('text-sm font-semibold', getSignalColor(prediction.signal))}>
                  {prediction.signal}
                </span>
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-[#00C8FF] hover:border-[#00C8FF]/50 transition-colors"
                    title="View Chart"
                  >
                    <LineChart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors"
                    title="Create Alert"
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/50 transition-colors"
                    title="Trade"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-400/50 transition-colors"
                    title="Add to Watchlist"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {predictions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <TrendingUp className="w-16 h-16 text-gray-700 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Predictions Found</h3>
          <p className="text-sm text-gray-500 max-w-md">
            No predictions match your current filters. Try adjusting your search criteria or changing the model.
          </p>
        </div>
      )}
    </div>
  );
}
