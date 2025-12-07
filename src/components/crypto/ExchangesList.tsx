import { ExternalLink, CheckCircle } from 'lucide-react';

interface Exchange {
  name: string;
  pair: string;
  price: string;
  volume24h: string;
  spread: string;
  fees: string;
  type: 'Spot' | 'Futures' | 'Perpetual';
  connected?: boolean;
}

const exchanges: Exchange[] = [
  {
    name: 'Binance',
    pair: 'BTC/USDT',
    price: '$61,245.50',
    volume24h: '$12.5B',
    spread: '0.01%',
    fees: '0.1%',
    type: 'Spot',
    connected: true,
  },
  {
    name: 'Coinbase Pro',
    pair: 'BTC/USD',
    price: '$61,242.80',
    volume24h: '$8.2B',
    spread: '0.02%',
    fees: '0.5%',
    type: 'Spot',
    connected: true,
  },
  {
    name: 'Kraken',
    pair: 'BTC/USDT',
    price: '$61,248.20',
    volume24h: '$3.8B',
    spread: '0.03%',
    fees: '0.26%',
    type: 'Spot',
  },
  {
    name: 'Bybit',
    pair: 'BTCUSDT',
    price: '$61,243.90',
    volume24h: '$5.6B',
    spread: '0.01%',
    fees: '0.06%',
    type: 'Perpetual',
  },
  {
    name: 'OKX',
    pair: 'BTC/USDT',
    price: '$61,246.50',
    volume24h: '$4.2B',
    spread: '0.02%',
    fees: '0.08%',
    type: 'Spot',
  },
];

export function ExchangesList() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Exchange Availability</h3>
        <select className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50">
          <option>All Types</option>
          <option>Spot</option>
          <option>Futures</option>
          <option>Perpetual</option>
        </select>
      </div>

      {/* Exchanges Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exchange
              </th>
              <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pair
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h Volume
              </th>
              <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spread
              </th>
              <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fees
              </th>
              <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {exchanges.map((exchange, idx) => (
              <tr
                key={idx}
                className="group hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                      {exchange.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {exchange.name}
                      </div>
                      {exchange.connected && (
                        <div className="flex items-center gap-1 text-xs text-[#00FF88]">
                          <CheckCircle className="w-3 h-3" />
                          Connected
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-400">{exchange.pair}</td>
                <td className="py-3 text-right text-sm font-semibold text-white">
                  {exchange.price}
                </td>
                <td className="py-3 text-right text-sm text-gray-400">
                  {exchange.volume24h}
                </td>
                <td className="py-3 text-center">
                  <span className="text-xs text-[#00FF88]">{exchange.spread}</span>
                </td>
                <td className="py-3 text-center">
                  <span className="text-xs text-gray-400">{exchange.fees}</span>
                </td>
                <td className="py-3 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-xs font-medium">
                    {exchange.type}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="px-3 py-1.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity">
                    Trade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Connect Exchange CTA */}
      <div className="p-4 bg-[#00C8FF]/5 border border-[#00C8FF]/20 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white mb-1">
              Connect Your Exchange
            </div>
            <div className="text-xs text-gray-400">
              Link your exchange accounts to trade directly from Quant Edge
            </div>
          </div>
          <button className="px-4 py-2 bg-[#00C8FF] text-black text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
