import { TrendingUp, TrendingDown, Star, Plus } from 'lucide-react';
import { cn } from '../../../lib/utils';

const watchlistItems = [
  {
    id: '1',
    symbol: 'BTC-USD',
    name: 'Bitcoin',
    price: '$43,250.00',
    change: '+2.34%',
    positive: true,
    sparkline: [40000, 41000, 40500, 42000, 41500, 43000, 43250],
  },
  {
    id: '2',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '$182.45',
    change: '+1.23%',
    positive: true,
    sparkline: [178, 179, 180, 179.5, 181, 182, 182.45],
  },
  {
    id: '3',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: '$238.72',
    change: '-0.85%',
    positive: false,
    sparkline: [242, 241, 240, 239, 240, 239, 238.72],
  },
  {
    id: '4',
    symbol: 'ETH-USD',
    name: 'Ethereum',
    price: '$2,315.60',
    change: '+3.45%',
    positive: true,
    sparkline: [2200, 2250, 2220, 2280, 2300, 2310, 2315.6],
  },
];

// Mini sparkline component
function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width="60" height="20" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#00FF88' : '#EF4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WatchlistPreview() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Watchlist</h3>
          <p className="text-sm text-gray-500 mt-1">Quick market pulse</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-[#00FF88] transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Watchlist Items */}
      <div className="space-y-2">
        {watchlistItems.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1">
              <button className="text-gray-600 hover:text-yellow-500 transition-colors">
                <Star className="w-4 h-4" />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white text-sm">{item.symbol}</span>
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sparkline */}
              <div className="hidden sm:block">
                <MiniSparkline data={item.sparkline} positive={item.positive} />
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-sm font-semibold text-white">{item.price}</div>
                <div
                  className={cn(
                    'text-xs font-medium flex items-center gap-1',
                    item.positive ? 'text-[#00FF88]' : 'text-red-400'
                  )}
                >
                  {item.positive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {item.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-4 py-2.5 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 hover:border-[#00FF88]/30 transition-all">
        Edit Watchlist
      </button>
    </div>
  );
}
