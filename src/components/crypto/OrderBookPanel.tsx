import { useState } from 'react';
import { cn } from '../../lib/utils';

interface OrderBookEntry {
  price: string;
  amount: string;
  total: string;
}

const mockBids: OrderBookEntry[] = [
  { price: '61,240.50', amount: '0.5420', total: '33,192' },
  { price: '61,239.00', amount: '1.2350', total: '75,630' },
  { price: '61,237.50', amount: '0.8900', total: '54,501' },
  { price: '61,236.00', amount: '2.1200', total: '129,820' },
  { price: '61,234.50', amount: '0.4560', total: '27,923' },
  { price: '61,233.00', amount: '1.6780', total: '102,749' },
  { price: '61,231.50', amount: '0.9340', total: '57,190' },
  { price: '61,230.00', amount: '1.4520', total: '88,906' },
];

const mockAsks: OrderBookEntry[] = [
  { price: '61,245.50', amount: '0.6820', total: '41,769' },
  { price: '61,247.00', amount: '1.1240', total: '68,841' },
  { price: '61,248.50', amount: '0.7650', total: '46,855' },
  { price: '61,250.00', amount: '1.9870', total: '121,743' },
  { price: '61,251.50', amount: '0.5340', total: '32,708' },
  { price: '61,253.00', amount: '1.3560', total: '83,059' },
  { price: '61,254.50', amount: '0.8920', total: '54,639' },
  { price: '61,256.00', amount: '1.6450', total: '100,756' },
];

export function OrderBookPanel() {
  const [grouping, setGrouping] = useState('1');
  const [view, setView] = useState<'book' | 'depth'>('book');

  const spread = '5.00';
  const spreadPercent = '0.008';

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Order Book</h3>
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
              <button
                onClick={() => setView('book')}
                className={cn(
                  'px-2 py-1 text-xs rounded transition-all',
                  view === 'book'
                    ? 'bg-[#00FF88] text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                Book
              </button>
              <button
                onClick={() => setView('depth')}
                className={cn(
                  'px-2 py-1 text-xs rounded transition-all',
                  view === 'depth'
                    ? 'bg-[#00FF88] text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                Depth
              </button>
            </div>
            
            {/* Grouping */}
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
              className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-white focus:outline-none focus:border-[#00FF88]/50"
            >
              <option value="0.5">0.5</option>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 font-medium">
          <div>Price (USDT)</div>
          <div className="text-right">Amount (BTC)</div>
          <div className="text-right">Total (USDT)</div>
        </div>
      </div>

      {/* Order Book Content */}
      {view === 'book' ? (
        <div className="flex-1 overflow-y-auto">
          {/* Asks (Sell Orders) */}
          <div className="p-2 space-y-0.5">
            {[...mockAsks].reverse().map((ask, idx) => (
              <button
                key={idx}
                className="w-full grid grid-cols-3 gap-2 px-2 py-1 rounded hover:bg-gray-800/50 transition-colors text-xs relative group"
              >
                {/* Background bar */}
                <div
                  className="absolute inset-0 bg-red-500/10 rounded"
                  style={{ width: `${30 + idx * 8}%` }}
                />
                <div className="text-red-400 font-medium relative z-10">{ask.price}</div>
                <div className="text-right text-gray-400 relative z-10">{ask.amount}</div>
                <div className="text-right text-gray-500 relative z-10">{ask.total}</div>
              </button>
            ))}
          </div>

          {/* Spread */}
          <div className="px-4 py-3 bg-gray-800/50 border-y border-gray-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Spread</span>
              <span className="text-white font-semibold">${spread} ({spreadPercent}%)</span>
            </div>
          </div>

          {/* Bids (Buy Orders) */}
          <div className="p-2 space-y-0.5">
            {mockBids.map((bid, idx) => (
              <button
                key={idx}
                className="w-full grid grid-cols-3 gap-2 px-2 py-1 rounded hover:bg-gray-800/50 transition-colors text-xs relative group"
              >
                {/* Background bar */}
                <div
                  className="absolute inset-0 bg-[#00FF88]/10 rounded"
                  style={{ width: `${30 + idx * 8}%` }}
                />
                <div className="text-[#00FF88] font-medium relative z-10">{bid.price}</div>
                <div className="text-right text-gray-400 relative z-10">{bid.amount}</div>
                <div className="text-right text-gray-500 relative z-10">{bid.total}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Depth Chart */
        <div className="flex-1 p-4">
          <div className="h-full flex items-center justify-center text-gray-600">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-sm">Depth Chart</div>
              <div className="text-xs text-gray-700 mt-1">Visual representation of order book</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
