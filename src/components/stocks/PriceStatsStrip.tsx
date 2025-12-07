import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PriceStats {
  currentPrice: string;
  change: string;
  changePercent: string;
  positive: boolean;
  dayHigh: string;
  dayLow: string;
  open: string;
  previousClose: string;
  volume: string;
  avgVolume: string;
  marketCap: string;
  weekHigh52: string;
  weekLow52: string;
  beta?: string;
  lastUpdated: string;
}

interface PriceStatsStripProps {
  stats: PriceStats;
  isLive?: boolean;
}

export function PriceStatsStrip({ stats, isLive = true }: PriceStatsStripProps) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <div className="flex items-center justify-between">
        {/* Left: Core Price Info */}
        <div className="flex items-center gap-8">
          {/* Current Price */}
          <div>
            <div className="text-4xl font-bold text-white mb-2">
              {stats.currentPrice}
            </div>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'flex items-center gap-1.5 text-lg font-semibold',
                  stats.positive ? 'text-[#00FF88]' : 'text-red-400'
                )}
              >
                {stats.positive ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span>{stats.change}</span>
                <span>({stats.changePercent})</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {isLive ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                    Live · {stats.lastUpdated}
                  </span>
                ) : (
                  <span>Delayed by 15 min</span>
                )}
              </div>
            </div>
            {/* Today's Range */}
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="text-gray-500">Today's Range:</span>
              <div className="flex items-center gap-2">
                <span className="text-red-400">{stats.dayLow}</span>
                <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-3/5 bg-gradient-to-r from-red-500 via-yellow-500 to-[#00FF88]" />
                </div>
                <span className="text-[#00FF88]">{stats.dayHigh}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Key Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard label="Open" value={stats.open} />
          <StatCard label="High" value={stats.dayHigh} highlight="up" />
          <StatCard label="Low" value={stats.dayLow} highlight="down" />
          <StatCard label="Prev Close" value={stats.previousClose} />
          <StatCard label="Volume" value={stats.volume} tooltip="Trading volume for today" />
          <StatCard label="Avg Volume" value={stats.avgVolume} tooltip="30-day average volume" />
          <StatCard label="Market Cap" value={stats.marketCap} />
          <StatCard label="52W High" value={stats.weekHigh52} />
          <StatCard label="52W Low" value={stats.weekLow52} />
          {stats.beta && (
            <StatCard label="Beta" value={stats.beta} tooltip="Volatility vs market" />
          )}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  highlight?: 'up' | 'down';
  tooltip?: string;
}

function StatCard({ label, value, highlight, tooltip }: StatCardProps) {
  return (
    <div className="group relative">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div
        className={cn(
          'text-sm font-semibold',
          highlight === 'up' && 'text-[#00FF88]',
          highlight === 'down' && 'text-red-400',
          !highlight && 'text-white'
        )}
      >
        {value}
      </div>
      {tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
}
