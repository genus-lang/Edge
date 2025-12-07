import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, LineChart, ShoppingCart, Star, FlaskConical, Eye, Download } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Asset {
  symbol: string;
  name: string;
  price: string;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
  rsi: number;
  distance52w: string;
}

interface ResultsTableProps {
  assets: Asset[];
  onSymbolClick?: (symbol: string) => void;
}

export function ResultsTable({ assets, onSymbolClick }: ResultsTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof Asset>('changePercent');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [visibleColumns, setVisibleColumns] = useState({
    symbol: true,
    price: true,
    change: true,
    volume: true,
    marketCap: true,
    sector: true,
    rsi: true,
    distance52w: true,
  });

  const handleSort = (field: keyof Asset) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleRow = (symbol: string) => {
    setSelectedRows((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const toggleAllRows = () => {
    setSelectedRows(selectedRows.length === assets.length ? [] : assets.map((a) => a.symbol));
  };

  const sortedAssets = [...assets].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * multiplier;
    }
    return String(aVal).localeCompare(String(bVal)) * multiplier;
  });

  return (
    <div className="space-y-4">
      {/* Summary Bar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-white">{assets.length} results</div>
          <div className="text-sm text-gray-500">Updated 5 seconds ago</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-xs text-gray-500">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Sorted by: <span className="text-white">{sortField}</span> {sortDirection === 'desc' ? '↓' : '↑'}
          </span>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
            <Eye className="w-4 h-4" />
            Columns
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-xl">
          <div className="text-sm font-semibold text-white">
            {selectedRows.length} instrument{selectedRows.length > 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              Add to Watchlist
            </button>
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              Create Basket
            </button>
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              Compare
            </button>
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              Backtest Basket
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === assets.length}
                  onChange={toggleAllRows}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                />
              </th>
              {visibleColumns.symbol && (
                <th
                  className="p-4 text-left text-xs font-semibold text-gray-500 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('symbol')}
                >
                  <div className="flex items-center gap-2">
                    Symbol
                    {sortField === 'symbol' && (sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />)}
                  </div>
                </th>
              )}
              {visibleColumns.price && (
                <th
                  className="p-4 text-left text-xs font-semibold text-gray-500 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    Last Price
                    {sortField === 'price' && (sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />)}
                  </div>
                </th>
              )}
              {visibleColumns.change && (
                <th
                  className="p-4 text-left text-xs font-semibold text-gray-500 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('changePercent')}
                >
                  <div className="flex items-center gap-2">
                    % Change (1D)
                    {sortField === 'changePercent' && (sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />)}
                  </div>
                </th>
              )}
              {visibleColumns.volume && (
                <th
                  className="p-4 text-left text-xs font-semibold text-gray-500 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('volume')}
                >
                  Volume
                </th>
              )}
              {visibleColumns.marketCap && (
                <th
                  className="p-4 text-left text-xs font-semibold text-gray-500 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('marketCap')}
                >
                  Market Cap
                </th>
              )}
              {visibleColumns.sector && (
                <th className="p-4 text-left text-xs font-semibold text-gray-500">Sector</th>
              )}
              {visibleColumns.rsi && (
                <th
                  className="p-4 text-left text-xs font-semibold text-gray-500 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('rsi')}
                >
                  <div className="flex items-center gap-2">
                    RSI
                    {sortField === 'rsi' && (sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />)}
                  </div>
                </th>
              )}
              {visibleColumns.distance52w && (
                <th className="p-4 text-left text-xs font-semibold text-gray-500">52W High</th>
              )}
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((asset, idx) => (
              <tr
                key={asset.symbol}
                className={cn(
                  'border-b border-gray-800 hover:bg-gray-800/30 transition-colors',
                  selectedRows.includes(asset.symbol) && 'bg-[#00FF88]/5'
                )}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(asset.symbol)}
                    onChange={() => toggleRow(asset.symbol)}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                  />
                </td>
                {visibleColumns.symbol && (
                  <td className="p-4">
                    <button
                      onClick={() => onSymbolClick?.(asset.symbol)}
                      className="text-left hover:text-[#00FF88] transition-colors"
                    >
                      <div className="font-semibold text-white">{asset.symbol}</div>
                      <div className="text-xs text-gray-500">{asset.name}</div>
                    </button>
                  </td>
                )}
                {visibleColumns.price && (
                  <td className="p-4 text-sm font-semibold text-white">{asset.price}</td>
                )}
                {visibleColumns.change && (
                  <td className="p-4">
                    <div
                      className={cn(
                        'flex items-center gap-1 text-sm font-semibold',
                        asset.changePercent >= 0 ? 'text-[#00FF88]' : 'text-red-400'
                      )}
                    >
                      {asset.changePercent >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {asset.changePercent > 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                    </div>
                  </td>
                )}
                {visibleColumns.volume && (
                  <td className="p-4 text-sm text-gray-400">{asset.volume}</td>
                )}
                {visibleColumns.marketCap && (
                  <td className="p-4 text-sm text-gray-400">{asset.marketCap}</td>
                )}
                {visibleColumns.sector && (
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300">
                      {asset.sector}
                    </span>
                  </td>
                )}
                {visibleColumns.rsi && (
                  <td className="p-4">
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        asset.rsi < 30
                          ? 'text-[#00FF88]'
                          : asset.rsi > 70
                          ? 'text-red-400'
                          : 'text-gray-400'
                      )}
                    >
                      {asset.rsi}
                    </span>
                  </td>
                )}
                {visibleColumns.distance52w && (
                  <td className="p-4 text-sm text-gray-400">{asset.distance52w}</td>
                )}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-[#00C8FF] hover:border-[#00C8FF]/50 transition-colors"
                      title="View Chart"
                    >
                      <LineChart className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/50 transition-colors"
                      title="Trade"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors"
                      title="Add to Watchlist"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-400/50 transition-colors"
                      title="Backtest"
                    >
                      <FlaskConical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <select className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="text-sm text-gray-500">per page</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
            Previous
          </button>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={cn(
                  'w-9 h-9 rounded-lg text-sm font-semibold transition-colors',
                  page === 1
                    ? 'bg-[#00FF88] text-black'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                )}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
