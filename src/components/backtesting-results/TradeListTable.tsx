import { useState } from 'react';
import { ArrowUpDown, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Trade {
  id: string;
  dateIn: string;
  timeIn: string;
  dateOut: string;
  timeOut: string;
  symbol: string;
  side: 'Long' | 'Short';
  entryPrice: number;
  exitPrice: number;
  positionSize: number;
  pnl: number;
  pnlPercent: number;
  fees: number;
  holdingPeriod: string;
  tags: string[];
}

interface TradeListTableProps {
  trades: Trade[];
}

export function TradeListTable({ trades }: TradeListTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Trade>('dateIn');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [sideFilter, setSideFilter] = useState<'all' | 'Long' | 'Short'>('all');
  const [pnlFilter, setPnlFilter] = useState<'all' | 'profitable' | 'losing'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (column: keyof Trade) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const filteredTrades = trades
    .filter((trade) => {
      if (searchQuery && !trade.symbol.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (sideFilter !== 'all' && trade.side !== sideFilter) {
        return false;
      }
      if (pnlFilter === 'profitable' && trade.pnl <= 0) {
        return false;
      }
      if (pnlFilter === 'losing' && trade.pnl >= 0) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * direction;
      }
      return String(aVal).localeCompare(String(bVal)) * direction;
    });

  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage);
  const paginatedTrades = filteredTrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortButton = ({ column, label }: { column: keyof Trade; label: string }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center gap-1 hover:text-white transition-colors"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">
          Trade List <span className="text-gray-500 text-sm font-normal">({filteredTrades.length} trades)</span>
        </h3>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50 w-64"
            />
          </div>
          
          {/* Filters */}
          <select
            value={sideFilter}
            onChange={(e) => setSideFilter(e.target.value as any)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
          >
            <option value="all">All Sides</option>
            <option value="Long">Long Only</option>
            <option value="Short">Short Only</option>
          </select>
          
          <select
            value={pnlFilter}
            onChange={(e) => setPnlFilter(e.target.value as any)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
          >
            <option value="all">All Trades</option>
            <option value="profitable">Profitable</option>
            <option value="losing">Losing</option>
          </select>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg hover:bg-[#00FF88]/20 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-sm">
              <th className="text-left py-3 px-4 font-medium">
                <SortButton column="id" label="ID" />
              </th>
              <th className="text-left py-3 px-4 font-medium">
                <SortButton column="dateIn" label="Date In" />
              </th>
              <th className="text-left py-3 px-4 font-medium">
                <SortButton column="dateOut" label="Date Out" />
              </th>
              <th className="text-left py-3 px-4 font-medium">
                <SortButton column="symbol" label="Symbol" />
              </th>
              <th className="text-left py-3 px-4 font-medium">Side</th>
              <th className="text-right py-3 px-4 font-medium">
                <SortButton column="entryPrice" label="Entry" />
              </th>
              <th className="text-right py-3 px-4 font-medium">
                <SortButton column="exitPrice" label="Exit" />
              </th>
              <th className="text-right py-3 px-4 font-medium">
                <SortButton column="positionSize" label="Size" />
              </th>
              <th className="text-right py-3 px-4 font-medium">
                <SortButton column="pnl" label="P&L" />
              </th>
              <th className="text-right py-3 px-4 font-medium">
                <SortButton column="fees" label="Fees" />
              </th>
              <th className="text-left py-3 px-4 font-medium">Period</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTrades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4 text-sm text-gray-400">#{trade.id}</td>
                <td className="py-3 px-4 text-sm text-white">
                  <div>{new Date(trade.dateIn).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500">{trade.timeIn}</div>
                </td>
                <td className="py-3 px-4 text-sm text-white">
                  <div>{new Date(trade.dateOut).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500">{trade.timeOut}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm font-medium text-white">
                    {trade.symbol}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={cn(
                      'inline-flex px-2 py-1 rounded text-xs font-semibold',
                      trade.side === 'Long'
                        ? 'bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88]'
                        : 'bg-red-400/10 border border-red-400/30 text-red-400'
                    )}
                  >
                    {trade.side}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-white text-right">${trade.entryPrice.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-white text-right">${trade.exitPrice.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-white text-right">{trade.positionSize}</td>
                <td className="py-3 px-4 text-right">
                  <div className={cn('text-sm font-semibold', trade.pnl >= 0 ? 'text-[#00FF88]' : 'text-red-400')}>
                    {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                  </div>
                  <div className={cn('text-xs', trade.pnl >= 0 ? 'text-[#00FF88]/70' : 'text-red-400/70')}>
                    {trade.pnlPercent >= 0 ? '+' : ''}{trade.pnlPercent.toFixed(2)}%
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400 text-right">${trade.fees.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-gray-400">{trade.holdingPeriod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTrades.length)} of {filteredTrades.length} trades
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    currentPage === page
                      ? 'bg-[#00FF88] text-black'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
