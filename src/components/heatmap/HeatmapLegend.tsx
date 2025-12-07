import { RefreshCw, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HeatmapLegendProps {
  metric: string;
  timeframe: string;
  advancers: number;
  decliners: number;
  unchanged: number;
  avgChange: string;
  totalMarketCap?: string;
  totalVolume?: string;
  marketStatus: string;
  marketOpen: boolean;
  autoRefresh: boolean;
  onRefreshToggle?: () => void;
}

export function HeatmapLegend({
  metric,
  timeframe,
  advancers,
  decliners,
  unchanged,
  avgChange,
  totalMarketCap,
  totalVolume,
  marketStatus,
  marketOpen,
  autoRefresh,
  onRefreshToggle,
}: HeatmapLegendProps) {
  const total = advancers + decliners + unchanged;
  const advancersPercent = (advancers / total) * 100;
  const declinersPercent = (decliners / total) * 100;
  const unchangedPercent = (unchanged / total) * 100;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Color Legend */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Color Scale</h4>
          <div className="space-y-3">
            {/* Gradient Bar */}
            <div className="relative h-8 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-gray-700 to-[#00FF88]" />
            </div>
            
            {/* Labels */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>≤ -5%</span>
              <span>-3%</span>
              <span>0%</span>
              <span>+3%</span>
              <span>≥ +5%</span>
            </div>

            <div className="text-xs text-gray-500 mt-2">
              Tile color = {metric === 'changePct' ? '% price change' : metric} ({timeframe})
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Market Breadth</h4>
          
          {/* Breadth Bar */}
          <div className="flex h-8 rounded-lg overflow-hidden mb-3">
            <div
              className="bg-[#00FF88] flex items-center justify-center text-xs text-black font-semibold"
              style={{ width: `${advancersPercent}%` }}
            >
              {advancersPercent > 15 && `${advancers}`}
            </div>
            <div
              className="bg-red-500 flex items-center justify-center text-xs text-white font-semibold"
              style={{ width: `${declinersPercent}%` }}
            >
              {declinersPercent > 15 && `${decliners}`}
            </div>
            <div
              className="bg-gray-600 flex items-center justify-center text-xs text-white font-semibold"
              style={{ width: `${unchangedPercent}%` }}
            >
              {unchangedPercent > 15 && `${unchanged}`}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00FF88] rounded" />
              <span className="text-gray-400">Advancers: <span className="text-white font-semibold">{advancers}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-gray-400">Decliners: <span className="text-white font-semibold">{decliners}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-600 rounded" />
              <span className="text-gray-400">Unchanged: <span className="text-white font-semibold">{unchanged}</span></span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Average Change</span>
              <span className={cn('font-semibold', avgChange.startsWith('+') ? 'text-[#00FF88]' : 'text-red-400')}>
                {avgChange}
              </span>
            </div>
            {totalMarketCap && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total Market Cap</span>
                <span className="text-white font-semibold">{totalMarketCap}</span>
              </div>
            )}
            {totalVolume && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total Volume</span>
                <span className="text-white font-semibold">{totalVolume}</span>
              </div>
            )}
          </div>
        </div>

        {/* Market Status & Refresh */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Status</h4>
          
          {/* Market Status */}
          <div className={cn(
            'flex items-center gap-3 p-3 rounded-lg border mb-3',
            marketOpen
              ? 'bg-[#00FF88]/10 border-[#00FF88]/30'
              : 'bg-gray-800/50 border-gray-700'
          )}>
            <Circle
              className={cn(
                'w-2 h-2 fill-current',
                marketOpen ? 'text-[#00FF88] animate-pulse' : 'text-gray-500'
              )}
            />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{marketStatus}</div>
              <div className="text-xs text-gray-500">
                {marketOpen ? 'Markets are open' : 'Markets are closed'}
              </div>
            </div>
          </div>

          {/* Auto Refresh */}
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
              <div className="flex items-center gap-2">
                <RefreshCw className={cn('w-4 h-4', autoRefresh && 'text-[#00FF88] animate-spin')} />
                <span className="text-sm text-white">Auto-refresh</span>
              </div>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={onRefreshToggle}
                className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
              />
            </label>

            {autoRefresh && (
              <div className="text-xs text-gray-500 px-3">
                Updating every 5 seconds
              </div>
            )}

            <button className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
              Manual Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
