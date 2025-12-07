import { Clock, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MarketStatus {
  region: string;
  status: 'open' | 'closed' | 'pre-market' | 'post-market';
  timeUntil: string;
}

const marketStatuses: MarketStatus[] = [
  { region: 'US Markets', status: 'open', timeUntil: '2h 15m until close' },
  { region: 'India (NSE/BSE)', status: 'closed', timeUntil: 'Opens in 5h 20m' },
];

interface QuickStat {
  label: string;
  value: string;
  type: 'neutral' | 'warning' | 'success';
}

const quickStats: QuickStat[] = [
  { label: 'Global Market Breadth', value: '63% advancing', type: 'success' },
  { label: 'Overall Volatility', value: 'High', type: 'warning' },
  { label: 'Sentiment', value: 'Moderately Bullish', type: 'success' },
];

export function MarketStatusBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left: Market Status */}
        <div className="flex items-center gap-6">
          {marketStatuses.map((market, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {/* Status Indicator */}
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  market.status === 'open' && 'bg-[#00FF88] animate-pulse',
                  market.status === 'closed' && 'bg-gray-500',
                  (market.status === 'pre-market' || market.status === 'post-market') &&
                    'bg-yellow-500'
                )}
              />

              {/* Status Text */}
              <div>
                <span
                  className={cn(
                    'font-semibold',
                    market.status === 'open' && 'text-[#00FF88]',
                    market.status === 'closed' && 'text-gray-400'
                  )}
                >
                  {market.region}:
                </span>
                <span
                  className={cn(
                    'ml-1.5 uppercase text-sm',
                    market.status === 'open' && 'text-[#00FF88]',
                    market.status === 'closed' && 'text-gray-500'
                  )}
                >
                  {market.status}
                </span>
                <span className="ml-2 text-sm text-gray-500">– {market.timeUntil}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Quick Stats */}
        <div className="flex items-center gap-3">
          {quickStats.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                'px-3 py-1.5 rounded-lg border text-sm',
                stat.type === 'success' &&
                  'bg-[#00FF88]/10 border-[#00FF88]/30 text-[#00FF88]',
                stat.type === 'warning' && 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
                stat.type === 'neutral' && 'bg-gray-800 border-gray-700 text-gray-300'
              )}
            >
              <span className="font-medium">{stat.label}:</span>
              <span className="ml-1.5 font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
