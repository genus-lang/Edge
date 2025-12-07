import { Play, Pause, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { cn } from '../../../lib/utils';

const strategies = [
  {
    id: '1',
    name: 'Mean Reversion Pro',
    asset: 'SPY',
    status: 'live',
    pnl: '+$1,234.56',
    pnlPercent: '+4.23%',
    positive: true,
  },
  {
    id: '2',
    name: 'Momentum Breakout',
    asset: 'BTC-USD',
    status: 'live',
    pnl: '+$856.32',
    pnlPercent: '+2.91%',
    positive: true,
  },
  {
    id: '3',
    name: 'Trend Following',
    asset: 'EUR/USD',
    status: 'paused',
    pnl: '-$123.45',
    pnlPercent: '-0.52%',
    positive: false,
  },
  {
    id: '4',
    name: 'Scalping Algorithm',
    asset: 'TSLA',
    status: 'live',
    pnl: '+$432.10',
    pnlPercent: '+1.87%',
    positive: true,
  },
];

export function ActiveStrategies() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Active Strategies</h3>
          <p className="text-sm text-gray-500 mt-1">
            {strategies.filter((s) => s.status === 'live').length} live strategies
          </p>
        </div>
        <button className="text-sm text-[#00FF88] hover:text-[#00FF88]/80 font-medium">
          View All
        </button>
      </div>

      {/* Strategy Cards */}
      <div className="space-y-3">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className="group relative p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-white">{strategy.name}</h4>
                  <span
                    className={cn(
                      'px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1',
                      strategy.status === 'live'
                        ? 'bg-[#00FF88]/10 text-[#00FF88]'
                        : 'bg-gray-700 text-gray-400'
                    )}
                  >
                    {strategy.status === 'live' ? (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                        Live
                      </>
                    ) : (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                        Paused
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">
                    Asset: <span className="text-white font-medium">{strategy.asset}</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400">Today:</span>
                    <span
                      className={cn(
                        'font-semibold flex items-center gap-1',
                        strategy.positive ? 'text-[#00FF88]' : 'text-red-400'
                      )}
                    >
                      {strategy.positive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {strategy.pnl} ({strategy.pnlPercent})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    strategy.status === 'live'
                      ? 'hover:bg-yellow-500/10 text-gray-400 hover:text-yellow-500'
                      : 'hover:bg-[#00FF88]/10 text-gray-400 hover:text-[#00FF88]'
                  )}
                  title={strategy.status === 'live' ? 'Pause' : 'Resume'}
                >
                  {strategy.status === 'live' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
