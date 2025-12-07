import { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  turnover: string;
  sector: string;
  exchange: string;
  positive: boolean;
}

const gainers: Stock[] = [
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors',
    price: '₹856.45',
    change: '+33.20',
    changePercent: '+4.03%',
    volume: '38.5L',
    turnover: '₹329Cr',
    sector: 'Auto',
    exchange: 'NSE',
    positive: true,
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel',
    price: '₹1,123.80',
    change: '+38.10',
    changePercent: '+3.51%',
    volume: '22.3L',
    turnover: '₹250Cr',
    sector: 'Telecom',
    exchange: 'NSE',
    positive: true,
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: '₹2,456.30',
    change: '+55.40',
    changePercent: '+2.31%',
    volume: '45.2L',
    turnover: '₹1,110Cr',
    sector: 'Energy',
    exchange: 'NSE',
    positive: true,
  },
  {
    symbol: 'LT',
    name: 'Larsen & Toubro',
    price: '₹3,234.15',
    change: '+66.80',
    changePercent: '+2.11%',
    volume: '12.8L',
    turnover: '₹414Cr',
    sector: 'Infrastructure',
    exchange: 'NSE',
    positive: true,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy',
    price: '₹3,678.90',
    change: '+65.20',
    changePercent: '+1.80%',
    volume: '32.4L',
    turnover: '₹1,192Cr',
    sector: 'IT',
    exchange: 'NSE',
    positive: true,
  },
];

const losers: Stock[] = [
  {
    symbol: 'ADANIPORTS',
    name: 'Adani Ports',
    price: '₹1,204.50',
    change: '-25.80',
    changePercent: '-2.10%',
    volume: '25.6L',
    turnover: '₹308Cr',
    sector: 'Infrastructure',
    exchange: 'NSE',
    positive: false,
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank',
    price: '₹966.30',
    change: '-11.70',
    changePercent: '-1.20%',
    volume: '35.2L',
    turnover: '₹340Cr',
    sector: 'Banking',
    exchange: 'NSE',
    positive: false,
  },
  {
    symbol: 'AXISBANK',
    name: 'Axis Bank',
    price: '₹1,025.80',
    change: '-8.20',
    changePercent: '-0.79%',
    volume: '30.5L',
    turnover: '₹313Cr',
    sector: 'Banking',
    exchange: 'NSE',
    positive: false,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    price: '₹1,559.40',
    change: '-7.80',
    changePercent: '-0.50%',
    volume: '28.9L',
    turnover: '₹451Cr',
    sector: 'Banking',
    exchange: 'NSE',
    positive: false,
  },
  {
    symbol: 'ITC',
    name: 'ITC Ltd',
    price: '₹443.85',
    change: '-1.35',
    changePercent: '-0.30%',
    volume: '40.2L',
    turnover: '₹178Cr',
    sector: 'FMCG',
    exchange: 'NSE',
    positive: false,
  },
];

const mostActive: Stock[] = [
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    price: '₹678.25',
    change: '+10.15',
    changePercent: '+1.52%',
    volume: '50.8L',
    turnover: '₹344Cr',
    sector: 'Banking',
    exchange: 'NSE',
    positive: true,
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: '₹2,456.30',
    change: '+55.40',
    changePercent: '+2.31%',
    volume: '45.2L',
    turnover: '₹1,110Cr',
    sector: 'Energy',
    exchange: 'NSE',
    positive: true,
  },
  {
    symbol: 'ITC',
    name: 'ITC Ltd',
    price: '₹443.85',
    change: '-1.35',
    changePercent: '-0.30%',
    volume: '40.2L',
    turnover: '₹178Cr',
    sector: 'FMCG',
    exchange: 'NSE',
    positive: false,
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors',
    price: '₹856.45',
    change: '+33.20',
    changePercent: '+4.03%',
    volume: '38.5L',
    turnover: '₹329Cr',
    sector: 'Auto',
    exchange: 'NSE',
    positive: true,
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank',
    price: '₹966.30',
    change: '-11.70',
    changePercent: '-1.20%',
    volume: '35.2L',
    turnover: '₹340Cr',
    sector: 'Banking',
    exchange: 'NSE',
    positive: false,
  },
];

export function GainersLosersTables() {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers' | 'active'>('gainers');
  const [selectedStocks, setSelectedStocks] = useState<Set<string>>(new Set());

  const currentData =
    activeTab === 'gainers' ? gainers : activeTab === 'losers' ? losers : mostActive;

  const toggleStock = (symbol: string) => {
    const newSelected = new Set(selectedStocks);
    if (newSelected.has(symbol)) {
      newSelected.delete(symbol);
    } else {
      newSelected.add(symbol);
    }
    setSelectedStocks(newSelected);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 p-1 bg-gray-800/50 rounded-lg">
          <button
            onClick={() => setActiveTab('gainers')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
              activeTab === 'gainers'
                ? 'bg-[#00FF88] text-black'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab('losers')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
              activeTab === 'losers'
                ? 'bg-red-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            )}
          >
            <TrendingDown className="w-4 h-4" />
            Top Losers
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
              activeTab === 'active'
                ? 'bg-[#00C8FF] text-black'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            )}
          >
            <ArrowUpRight className="w-4 h-4" />
            Most Active
          </button>
        </div>

        {selectedStocks.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{selectedStocks.size} selected</span>
            <button className="px-3 py-1.5 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-sm rounded-lg hover:bg-[#00FF88]/20 transition-colors">
              Add to Watchlist
            </button>
            <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
              Compare
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-700 bg-gray-800"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStocks(new Set(currentData.map((s) => s.symbol)));
                    } else {
                      setSelectedStocks(new Set());
                    }
                  }}
                />
              </th>
              <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Change
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume
              </th>
              <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turnover
              </th>
              <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sector
              </th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {currentData.map((stock) => (
              <tr
                key={stock.symbol}
                className="group hover:bg-gray-800/30 transition-colors cursor-pointer"
              >
                <td className="py-3">
                  <input
                    type="checkbox"
                    checked={selectedStocks.has(stock.symbol)}
                    onChange={() => toggleStock(stock.symbol)}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                </td>
                <td className="py-3">
                  <span className="text-sm font-bold text-white">{stock.symbol}</span>
                  <span className="ml-2 text-xs text-gray-500">{stock.exchange}</span>
                </td>
                <td className="py-3 text-sm text-gray-300">{stock.name}</td>
                <td className="py-3 text-sm text-right font-semibold text-white">
                  {stock.price}
                </td>
                <td
                  className={cn(
                    'py-3 text-sm text-right font-medium',
                    stock.positive ? 'text-[#00FF88]' : 'text-red-400'
                  )}
                >
                  {stock.change}
                </td>
                <td className="py-3 text-right">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold',
                      stock.positive
                        ? 'bg-[#00FF88]/10 text-[#00FF88]'
                        : 'bg-red-500/10 text-red-400'
                    )}
                  >
                    {stock.positive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stock.changePercent}
                  </span>
                </td>
                <td className="py-3 text-sm text-right text-gray-300">{stock.volume}</td>
                <td className="py-3 text-sm text-right text-gray-300">{stock.turnover}</td>
                <td className="py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                    {stock.sector}
                  </span>
                </td>
                <td className="py-3">
                  <button className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-600 group-hover:text-gray-400 transition-colors opacity-0 group-hover:opacity-100">
                    <Star className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
        <div className="text-sm text-gray-500">Showing 1-5 of 50 results</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1.5 bg-[#00FF88] text-black text-sm rounded-lg font-medium">
            1
          </button>
          <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            2
          </button>
          <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            3
          </button>
          <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
