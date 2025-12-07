import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Strategy {
  id: string;
  name: string;
  stats: {
    winRate: number;
    cagr: number;
    maxDrawdown: number;
    sharpe: number;
  };
  riskLevel: string;
  chartData: number[];
}

interface ComparisonDrawerProps {
  strategies: Strategy[];
  onClose: () => void;
  onCloneSelected: () => void;
  onBacktestSelected: () => void;
}

export function ComparisonDrawer({
  strategies,
  onClose,
  onCloneSelected,
  onBacktestSelected,
}: ComparisonDrawerProps) {
  if (strategies.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 max-h-[60vh] bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-700 shadow-2xl">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            <h3 className="text-lg font-bold text-white">Strategy Comparison</h3>
            <p className="text-sm text-gray-400">{strategies.length} strategies selected</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCloneSelected}
              className="px-4 py-2 bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#00C8FF] rounded-lg hover:bg-[#00C8FF]/20 transition-colors text-sm font-semibold"
            >
              Clone Selected
            </button>
            <button
              onClick={onBacktestSelected}
              className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm font-semibold"
            >
              Backtest Selected
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Strategy Names Row */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${strategies.length}, 1fr)` }}>
              <div className="text-sm font-semibold text-gray-500">Strategy</div>
              {strategies.map((strategy) => (
                <div key={strategy.id} className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                  <div className="text-sm font-bold text-white mb-1">{strategy.name}</div>
                  <div className="text-xs text-gray-500">{strategy.riskLevel} Risk</div>
                </div>
              ))}
            </div>

            {/* Metrics Comparison Table */}
            <div className="space-y-3">
              {/* Win Rate */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${strategies.length}, 1fr)` }}>
                <div className="flex items-center text-sm font-semibold text-white">Win Rate</div>
                {strategies.map((strategy) => (
                  <div key={strategy.id} className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg text-center">
                    <div className={cn(
                      'text-2xl font-bold',
                      strategy.stats.winRate >= 60 ? 'text-[#00FF88]' : 'text-yellow-400'
                    )}>
                      {strategy.stats.winRate}%
                    </div>
                  </div>
                ))}
              </div>

              {/* CAGR */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${strategies.length}, 1fr)` }}>
                <div className="flex items-center text-sm font-semibold text-white">CAGR</div>
                {strategies.map((strategy) => (
                  <div key={strategy.id} className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg text-center">
                    <div className={cn(
                      'text-2xl font-bold',
                      strategy.stats.cagr >= 25 ? 'text-[#00FF88]' : 'text-[#00C8FF]'
                    )}>
                      {strategy.stats.cagr}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Max Drawdown */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${strategies.length}, 1fr)` }}>
                <div className="flex items-center text-sm font-semibold text-white">Max Drawdown</div>
                {strategies.map((strategy) => (
                  <div key={strategy.id} className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg text-center">
                    <div className={cn(
                      'text-2xl font-bold',
                      strategy.stats.maxDrawdown >= -15 ? 'text-[#00FF88]' : 'text-red-400'
                    )}>
                      {strategy.stats.maxDrawdown}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Sharpe Ratio */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${strategies.length}, 1fr)` }}>
                <div className="flex items-center text-sm font-semibold text-white">Sharpe Ratio</div>
                {strategies.map((strategy) => (
                  <div key={strategy.id} className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg text-center">
                    <div className={cn(
                      'text-2xl font-bold',
                      strategy.stats.sharpe >= 1.5 ? 'text-[#00FF88]' : 'text-yellow-400'
                    )}>
                      {strategy.stats.sharpe.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Charts */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${strategies.length}, 1fr)` }}>
              <div className="flex items-center text-sm font-semibold text-white">Performance Curve</div>
              {strategies.map((strategy) => (
                <div key={strategy.id} className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                  <div className="h-24 flex items-end gap-0.5">
                    {strategy.chartData.map((value, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex-1 rounded-t',
                          value >= 0 ? 'bg-gradient-to-t from-[#00FF88] to-[#00C8FF]' : 'bg-red-500'
                        )}
                        style={{ height: `${Math.abs(value)}%` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Risk vs Return Scatter Plot */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Risk vs Return Analysis</h4>
              <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="relative h-64">
                  {/* Axes */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gray-700" />
                  <div className="absolute bottom-0 left-0 w-px h-full bg-gray-700" />
                  
                  {/* Labels */}
                  <div className="absolute -bottom-6 right-0 text-xs text-gray-500">Return (CAGR) →</div>
                  <div className="absolute -left-16 top-0 text-xs text-gray-500 -rotate-90 origin-left">Risk (Max DD) →</div>

                  {/* Data Points */}
                  {strategies.map((strategy, idx) => {
                    const x = ((strategy.stats.cagr + 10) / 60) * 100; // normalize 0-100
                    const y = ((Math.abs(strategy.stats.maxDrawdown) - 5) / 30) * 100; // normalize 0-100
                    return (
                      <div
                        key={strategy.id}
                        className="absolute w-4 h-4 rounded-full bg-[#00FF88] border-2 border-gray-900 cursor-pointer hover:scale-150 transition-transform"
                        style={{
                          left: `${x}%`,
                          bottom: `${100 - y}%`,
                          transform: 'translate(-50%, 50%)',
                        }}
                        title={strategy.name}
                      />
                    );
                  })}

                  {/* Quadrants */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                    <div className="border-r border-b border-gray-700/50" />
                    <div className="border-b border-gray-700/50" />
                    <div className="border-r border-gray-700/50" />
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
