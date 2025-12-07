import { TrendingUp, TrendingDown, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TopMover {
  symbol: string;
  name: string;
  change: number;
  changePercent: number;
}

interface AIInsightsPanelProps {
  topGainers: TopMover[];
  topLosers: TopMover[];
  unusualVolume: TopMover[];
  onSymbolClick?: (symbol: string) => void;
}

export function AIInsightsPanel({ topGainers, topLosers, unusualVolume, onSymbolClick }: AIInsightsPanelProps) {
  return (
    <div className="w-96 h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-l border-gray-800 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-lg font-semibold text-white">AI Insights</h3>
        </div>

        {/* AI Highlights */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Market Highlights</h4>
          <div className="space-y-3">
            <div className="p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-[#00FF88] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Technology sector</strong> showing strong momentum with average gain of +2.8% today
                </div>
              </div>
            </div>

            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Energy sector</strong> under pressure; broad weakness with average -3.4% decline
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#00C8FF] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  Mid-cap tech stocks leading gains. Consider reviewing your strategies in this segment
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-3 px-3 py-2 bg-gray-800 border border-gray-700 text-[#00C8FF] text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Open Screener with These Filters
          </button>
        </div>

        {/* Top Gainers */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Top Gainers</h4>
          <div className="space-y-2">
            {topGainers.map((mover) => (
              <button
                key={mover.symbol}
                onClick={() => onSymbolClick?.(mover.symbol)}
                className="w-full p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-sm font-semibold text-white">{mover.symbol}</div>
                    <div className="text-xs text-gray-500">{mover.name}</div>
                  </div>
                  <div className="flex items-center gap-1 text-[#00FF88]">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-sm font-bold">+{mover.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Top Losers</h4>
          <div className="space-y-2">
            {topLosers.map((mover) => (
              <button
                key={mover.symbol}
                onClick={() => onSymbolClick?.(mover.symbol)}
                className="w-full p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-red-500/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-sm font-semibold text-white">{mover.symbol}</div>
                    <div className="text-xs text-gray-500">{mover.name}</div>
                  </div>
                  <div className="flex items-center gap-1 text-red-400">
                    <TrendingDown className="w-3 h-3" />
                    <span className="text-sm font-bold">{mover.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Unusual Volume */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Unusual Volume</h4>
          <div className="space-y-2">
            {unusualVolume.map((mover) => (
              <button
                key={mover.symbol}
                onClick={() => onSymbolClick?.(mover.symbol)}
                className="w-full p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00C8FF]/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-sm font-semibold text-white">{mover.symbol}</div>
                    <div className="text-xs text-gray-500">{mover.name}</div>
                  </div>
                  <div className="text-xs text-[#00C8FF] font-semibold">
                    +280% vol
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Risk Alerts */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Risk Alerts</h4>
          <div className="space-y-2">
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  High volatility detected in 5 of your watchlist symbols
                </div>
              </div>
            </div>

            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  3 of your portfolio stocks are in today's top losers
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <button className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
              View Affected Strategies
            </button>
            <button className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
              View Portfolio Impact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
