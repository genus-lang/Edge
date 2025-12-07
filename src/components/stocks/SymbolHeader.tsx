import { Star, TrendingUp, Shield, Activity } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface SymbolHeaderProps {
  symbol: string;
  name: string;
  exchange: string;
  country?: string;
  sector: string;
  industry: string;
  marketStatus: 'Open' | 'Closed' | 'Pre-market' | 'After-hours';
  isInWatchlist?: boolean;
  onWatchlistToggle?: () => void;
  onSectorClick?: () => void;
  onIndustryClick?: () => void;
}

export function SymbolHeader({
  symbol,
  name,
  exchange,
  country = 'US',
  sector,
  industry,
  marketStatus,
  isInWatchlist = false,
  onWatchlistToggle,
  onSectorClick,
  onIndustryClick,
}: SymbolHeaderProps) {
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);

  const handleWatchlistToggle = () => {
    setInWatchlist(!inWatchlist);
    onWatchlistToggle?.();
  };

  const statusColors = {
    Open: 'bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30',
    Closed: 'bg-gray-700 text-gray-400 border-gray-600',
    'Pre-market': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    'After-hours': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Left: Symbol Info */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-300">
            {symbol.substring(0, 2)}
          </span>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">
              {symbol}
            </h1>
            <span className="text-gray-500">|</span>
            <span className="text-lg text-gray-300">{name}</span>
            {country && (
              <span className="px-2 py-0.5 text-xs rounded bg-gray-800 text-gray-400">
                {country}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-400">
              {exchange}
            </span>
            <span
              className={cn(
                'px-2 py-1 text-xs font-medium rounded-full border',
                statusColors[marketStatus]
              )}
            >
              {marketStatus === 'Open' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00FF88] mr-1.5 animate-pulse" />}
              {marketStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Tags & Actions */}
      <div className="flex items-center gap-3">
        {/* Tags */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onSectorClick}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30 hover:bg-[#00FF88]/20 transition-colors"
          >
            <TrendingUp className="inline w-3 h-3 mr-1.5" />
            {sector}
          </button>
          <button
            onClick={onIndustryClick}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            {industry}
          </button>
        </div>

        {/* Watchlist Toggle */}
        <button
          onClick={handleWatchlistToggle}
          className={cn(
            'p-3 rounded-xl border transition-all',
            inWatchlist
              ? 'bg-[#00FF88]/10 border-[#00FF88]/30 text-[#00FF88]'
              : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
          )}
          title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <Star
            className={cn('w-5 h-5', inWatchlist && 'fill-current')}
          />
        </button>

        {/* Risk Badge (optional) */}
        <div className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700">
          <div className="flex items-center gap-2 text-xs">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400">Blue Chip</span>
          </div>
        </div>
      </div>
    </div>
  );
}
