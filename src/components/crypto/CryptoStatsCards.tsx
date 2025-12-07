import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardData {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  tooltip?: string;
}

const mockStats: StatCardData[] = [
  {
    label: 'Market Cap',
    value: '$1.21T',
    change: '+2.4%',
    positive: true,
    tooltip: 'Total market value of circulating supply',
  },
  {
    label: 'Fully Diluted Valuation',
    value: '$1.28T',
    change: '+2.4%',
    positive: true,
    tooltip: 'Market cap if max supply was in circulation',
  },
  {
    label: '24h Volume',
    value: '$32.5B',
    change: '+15.2%',
    positive: true,
    tooltip: 'Total trading volume across all exchanges',
  },
  {
    label: '24h High / Low',
    value: '$62,450 / $59,120',
    tooltip: 'Highest and lowest price in last 24 hours',
  },
  {
    label: 'Circulating Supply',
    value: '19.5M BTC',
    change: '+0.01%',
    positive: true,
    tooltip: 'Amount of coins currently in circulation',
  },
  {
    label: 'Total / Max Supply',
    value: '19.5M / 21M',
    tooltip: 'Total mined vs maximum possible supply',
  },
  {
    label: 'Volume / Market Cap',
    value: '2.68%',
    change: '+12.4%',
    positive: true,
    tooltip: 'Trading volume relative to market cap',
  },
  {
    label: 'Volatility (30D)',
    value: '68 / 100',
    change: '-5 pts',
    positive: false,
    tooltip: 'Price volatility score over last 30 days',
  },
];

export function CryptoStatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {mockStats.map((stat) => (
        <div
          key={stat.label}
          className="group relative p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="text-xs text-gray-500 uppercase font-medium">
              {stat.label}
            </div>
            {stat.tooltip && (
              <button className="text-gray-600 hover:text-gray-400">
                <Info className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          
          <div className="flex items-end justify-between">
            <div className="text-lg font-bold text-white">{stat.value}</div>
            {stat.change && (
              <div
                className={cn(
                  'flex items-center gap-1 text-xs font-semibold',
                  stat.positive ? 'text-[#00FF88]' : 'text-red-400'
                )}
              >
                {stat.positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            )}
          </div>

          {/* Tooltip */}
          {stat.tooltip && (
            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity w-48 z-10">
              {stat.tooltip}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
