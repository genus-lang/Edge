import { TrendingUp, TrendingDown, Bell, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HeatmapTileProps {
  symbol: string;
  name: string;
  price: string;
  change: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  sector?: string;
  hasAlert?: boolean;
  hasAI?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function HeatmapTile({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  marketCap,
  sector,
  hasAlert,
  hasAI,
  size = 'medium',
  onClick,
}: HeatmapTileProps) {
  const getColorClass = (pct: number) => {
    if (pct >= 5) return 'from-[#00FF88]/20 to-[#00FF88]/10 border-[#00FF88]/40 text-[#00FF88]';
    if (pct >= 3) return 'from-[#00FF88]/15 to-[#00FF88]/5 border-[#00FF88]/30 text-[#00FF88]';
    if (pct >= 1) return 'from-[#00FF88]/10 to-transparent border-[#00FF88]/20 text-[#00FF88]';
    if (pct > 0) return 'from-[#00FF88]/5 to-transparent border-gray-700 text-[#00FF88]';
    if (pct === 0) return 'from-gray-800/50 to-gray-900/30 border-gray-700 text-gray-400';
    if (pct > -1) return 'from-red-500/5 to-transparent border-gray-700 text-red-400';
    if (pct > -3) return 'from-red-500/10 to-transparent border-red-500/20 text-red-400';
    if (pct > -5) return 'from-red-500/15 to-red-500/5 border-red-500/30 text-red-400';
    return 'from-red-500/20 to-red-500/10 border-red-500/40 text-red-400';
  };

  const sizeClasses = {
    small: 'min-h-[80px] p-2',
    medium: 'min-h-[120px] p-3',
    large: 'min-h-[160px] p-4',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full rounded-xl border transition-all hover:scale-[1.02] hover:shadow-lg',
        'bg-gradient-to-br',
        getColorClass(changePercent),
        sizeClasses[size]
      )}
    >
      {/* Badges */}
      <div className="absolute top-2 right-2 flex gap-1">
        {hasAlert && (
          <div className="w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
            <Bell className="w-3 h-3 text-yellow-500" />
          </div>
        )}
        {hasAI && (
          <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-purple-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between h-full">
        {/* Top: Symbol & Name */}
        <div>
          <div className="font-bold text-white text-left mb-1">
            {symbol}
          </div>
          <div className="text-xs text-gray-400 text-left truncate">
            {name}
          </div>
        </div>

        {/* Bottom: Price & Change */}
        <div className="mt-2">
          <div className="text-sm font-semibold text-white text-left mb-1">
            {price}
          </div>
          <div className="flex items-center gap-1 text-left">
            {changePercent > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : changePercent < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : null}
            <span className="text-sm font-bold">
              {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      <div className="absolute inset-0 bg-gray-900/95 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none p-4 flex flex-col justify-between">
        <div>
          <div className="text-lg font-bold text-white mb-1">{symbol}</div>
          <div className="text-sm text-gray-400 mb-3">{name}</div>
          {sector && (
            <div className="text-xs text-gray-500 mb-2">
              Sector: {sector}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Last Price</span>
            <span className="text-white font-semibold">{price}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Change</span>
            <span className={cn('font-semibold', changePercent >= 0 ? 'text-[#00FF88]' : 'text-red-400')}>
              {changePercent > 0 ? '+' : ''}{change} ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
          {volume && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Volume</span>
              <span className="text-white font-semibold">{volume}</span>
            </div>
          )}
          {marketCap && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Market Cap</span>
              <span className="text-white font-semibold">{marketCap}</span>
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700 flex gap-2 text-xs">
          <span className="text-[#00FF88]">View Details →</span>
        </div>
      </div>
    </button>
  );
}
