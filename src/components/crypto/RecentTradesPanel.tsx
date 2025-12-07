import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Trade {
  time: string;
  price: string;
  amount: string;
  side: 'buy' | 'sell';
}

const mockTrades: Trade[] = [
  { time: '15:24:32', price: '61,245.50', amount: '0.0124', side: 'buy' },
  { time: '15:24:30', price: '61,244.20', amount: '0.5420', side: 'buy' },
  { time: '15:24:28', price: '61,243.00', amount: '0.0890', side: 'sell' },
  { time: '15:24:26', price: '61,245.80', amount: '1.2350', side: 'buy' },
  { time: '15:24:24', price: '61,242.50', amount: '0.3210', side: 'sell' },
  { time: '15:24:22', price: '61,246.00', amount: '0.7650', side: 'buy' },
  { time: '15:24:20', price: '61,241.80', amount: '0.1560', side: 'sell' },
  { time: '15:24:18', price: '61,247.20', amount: '0.9340', side: 'buy' },
  { time: '15:24:16', price: '61,240.50', amount: '0.4520', side: 'sell' },
  { time: '15:24:14', price: '61,248.00', amount: '1.6780', side: 'buy' },
];

export function RecentTradesPanel() {
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<'all' | 'big'>('all');

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Recent Trades</h3>
          <div className="flex items-center gap-2">
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'big')}
              className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-white focus:outline-none focus:border-[#00FF88]/50"
            >
              <option value="all">All Trades</option>
              <option value="big">Big Trades (&gt;$50k)</option>
            </select>

            {/* Pause/Play */}
            <button
              onClick={() => setPaused(!paused)}
              className="p-1.5 rounded bg-gray-800 border border-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 font-medium">
          <div>Time</div>
          <div className="text-right">Price (USDT)</div>
          <div className="text-right">Amount (BTC)</div>
          <div className="text-right">Side</div>
        </div>
      </div>

      {/* Trades List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {mockTrades.map((trade, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 gap-2 px-2 py-1.5 rounded hover:bg-gray-800/50 transition-colors text-xs"
          >
            <div className="text-gray-500">{trade.time}</div>
            <div
              className={cn(
                'text-right font-medium',
                trade.side === 'buy' ? 'text-[#00FF88]' : 'text-red-400'
              )}
            >
              {trade.price}
            </div>
            <div className="text-right text-gray-400">{trade.amount}</div>
            <div className="text-right">
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded text-xs font-semibold',
                  trade.side === 'buy'
                    ? 'bg-[#00FF88]/10 text-[#00FF88]'
                    : 'bg-red-500/10 text-red-400'
                )}
              >
                {trade.side === 'buy' ? 'Buy' : 'Sell'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Indicator */}
      {!paused && (
        <div className="px-4 py-2 border-t border-gray-800 flex items-center justify-center gap-2 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          Live streaming
        </div>
      )}
    </div>
  );
}