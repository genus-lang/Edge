import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { cn } from '../../../lib/utils';

const trades = [
  {
    id: '1',
    time: '14:32:15',
    asset: 'BTC-USD',
    type: 'buy',
    quantity: '0.125',
    price: '$43,250.00',
    pnl: '+$234.56',
    positive: true,
  },
  {
    id: '2',
    time: '13:18:42',
    asset: 'AAPL',
    type: 'sell',
    quantity: '50',
    price: '$182.45',
    pnl: '+$156.78',
    positive: true,
  },
  {
    id: '3',
    time: '12:05:20',
    asset: 'TSLA',
    type: 'buy',
    quantity: '10',
    price: '$238.72',
    pnl: '-$45.32',
    positive: false,
  },
  {
    id: '4',
    time: '11:42:08',
    asset: 'EUR/USD',
    type: 'sell',
    quantity: '5000',
    price: '1.0892',
    pnl: '+$87.40',
    positive: true,
  },
  {
    id: '5',
    time: '10:15:33',
    asset: 'ETH-USD',
    type: 'buy',
    quantity: '2.5',
    price: '$2,315.60',
    pnl: '+$123.45',
    positive: true,
  },
];

export function RecentTrades() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Trades</h3>
          <p className="text-sm text-gray-500 mt-1">Latest activity</p>
        </div>
        <button className="text-sm text-[#00FF88] hover:text-[#00FF88]/80 font-medium">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                P&L
              </th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="group hover:bg-gray-800/30 transition-colors cursor-pointer"
              >
                <td className="py-3 text-sm text-gray-400">{trade.time}</td>
                <td className="py-3">
                  <span className="text-sm font-medium text-white">{trade.asset}</span>
                </td>
                <td className="py-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium',
                      trade.type === 'buy'
                        ? 'bg-[#00FF88]/10 text-[#00FF88]'
                        : 'bg-red-500/10 text-red-400'
                    )}
                  >
                    {trade.type === 'buy' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 text-sm text-right text-gray-300">{trade.quantity}</td>
                <td className="py-3 text-sm text-right text-gray-300">{trade.price}</td>
                <td className="py-3 text-right">
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      trade.positive ? 'text-[#00FF88]' : 'text-red-400'
                    )}
                  >
                    {trade.pnl}
                  </span>
                </td>
                <td className="py-3">
                  <button className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-600 group-hover:text-gray-400 transition-colors opacity-0 group-hover:opacity-100">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
