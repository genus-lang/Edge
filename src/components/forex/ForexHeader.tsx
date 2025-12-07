import { Star, Bell, TrendingUp, Pin } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface ForexHeaderProps {
  baseCurrency: string;
  quoteCurrency: string;
  baseFullName: string;
  quoteFullName: string;
  pairType: 'Major' | 'Minor' | 'Exotic';
  currentPrice: string;
  change: string;
  changePercent: string;
  positive: boolean;
  spread: string;
  sessionStatus: string;
  sessionOpen: boolean;
  isInWatchlist?: boolean;
  onWatchlistToggle?: () => void;
  onCreateAlert?: () => void;
  onTrade?: () => void;
}

export function ForexHeader({
  baseCurrency,
  quoteCurrency,
  baseFullName,
  quoteFullName,
  pairType,
  currentPrice,
  change,
  changePercent,
  positive,
  spread,
  sessionStatus,
  sessionOpen,
  isInWatchlist = false,
  onWatchlistToggle,
  onCreateAlert,
  onTrade,
}: ForexHeaderProps) {
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);

  const handleWatchlistToggle = () => {
    setInWatchlist(!inWatchlist);
    onWatchlistToggle?.();
  };

  const pairTypeColors = {
    Major: 'bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30',
    Minor: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    Exotic: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <div className="flex items-start justify-between">
        {/* Left: Pair Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">
              {baseCurrency} / {quoteCurrency}
            </h1>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold border',
                pairTypeColors[pairType]
              )}
            >
              {pairType}
            </span>
            <span
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border',
                sessionOpen
                  ? 'bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30'
                  : 'bg-gray-700 text-gray-400 border-gray-600'
              )}
            >
              {sessionOpen && <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />}
              LIVE
            </span>
          </div>
          
          <div className="text-sm text-gray-400 mb-3">
            {baseFullName} vs {quoteFullName}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-gray-500">Session: </span>
              <span className="text-white font-semibold">{sessionStatus}</span>
            </div>
            <div>
              <span className="text-gray-500">Spread: </span>
              <span className="text-white font-semibold">{spread} pips</span>
            </div>
          </div>
        </div>

        {/* Center: Price */}
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">
            {currentPrice}
          </div>
          <div
            className={cn(
              'flex items-center justify-center gap-2 text-lg font-semibold',
              positive ? 'text-[#00FF88]' : 'text-red-400'
            )}
          >
            {positive ? <TrendingUp className="w-5 h-5" /> : '↓'}
            <span>{change} ({changePercent})</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTrade}
            className="px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Trade
          </button>
          
          <button
            onClick={handleWatchlistToggle}
            className={cn(
              'p-3 rounded-lg border transition-all',
              inWatchlist
                ? 'bg-[#00FF88]/10 border-[#00FF88]/30 text-[#00FF88]'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
            )}
            title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Star className={cn('w-5 h-5', inWatchlist && 'fill-current')} />
          </button>

          <button
            onClick={onCreateAlert}
            className="p-3 rounded-lg border bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 transition-all"
            title="Create alert"
          >
            <Bell className="w-5 h-5" />
          </button>

          <button
            className="p-3 rounded-lg border bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 transition-all"
            title="Pin to dashboard"
          >
            <Pin className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
