import { Star, TrendingUp, Shield, Award } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface CryptoHeaderProps {
  symbol: string;
  name: string;
  pair: string;
  rank: number;
  categories: string[];
  marketCap: string;
  volume24h: string;
  circulatingSupply: string;
  currentPrice: string;
  change24h: string;
  changePercent: string;
  positive: boolean;
  localPrice?: string;
  isInWatchlist?: boolean;
  onWatchlistToggle?: () => void;
}

export function CryptoHeader({
  symbol,
  name,
  pair,
  rank,
  categories,
  marketCap,
  volume24h,
  circulatingSupply,
  currentPrice,
  change24h,
  changePercent,
  positive,
  localPrice,
  isInWatchlist = false,
  onWatchlistToggle,
}: CryptoHeaderProps) {
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);

  const handleWatchlistToggle = () => {
    setInWatchlist(!inWatchlist);
    onWatchlistToggle?.();
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <div className="flex items-start justify-between">
        {/* Left: Identity */}
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-2xl font-bold text-white">
            ₿
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{name}</h1>
              <span className="text-gray-500">|</span>
              <span className="text-lg text-gray-300">{symbol} / {pair}</span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-xs font-semibold border border-[#00FF88]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                Live
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 rounded-full bg-gray-800 text-gray-400 text-xs font-medium">
                Rank #{rank}
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-2 py-1 rounded-full bg-[#00C8FF]/10 text-[#00C8FF] text-xs font-medium border border-[#00C8FF]/30 hover:bg-[#00C8FF]/20 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-500">Market Cap: </span>
                <span className="text-white font-semibold">{marketCap}</span>
              </div>
              <div>
                <span className="text-gray-500">24h Volume: </span>
                <span className="text-white font-semibold">{volume24h}</span>
              </div>
              <div>
                <span className="text-gray-500">Circ Supply: </span>
                <span className="text-white font-semibold">{circulatingSupply}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Price & Actions */}
        <div className="flex items-start gap-6">
          {/* Price */}
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-2">
              {currentPrice}
            </div>
            <div className="flex items-center justify-end gap-2 mb-1">
              <span
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-md text-sm font-semibold',
                  positive
                    ? 'bg-[#00FF88]/10 text-[#00FF88]'
                    : 'bg-red-500/10 text-red-400'
                )}
              >
                {positive ? <TrendingUp className="w-4 h-4" /> : '↓'}
                {change24h} ({changePercent})
              </span>
            </div>
            {localPrice && (
              <div className="text-sm text-gray-500">≈ {localPrice}</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
