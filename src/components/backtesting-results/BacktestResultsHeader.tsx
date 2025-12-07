import { Home, ChevronRight, Play, Copy, FileDown, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface BacktestResultsHeaderProps {
  strategyName: string;
  runId: number;
  universe: string;
  runType: string;
  status: 'completed' | 'in-progress' | 'failed';
  testPeriod: { from: string; to: string };
  granularity: string;
  capital: number;
  leverage: number;
  onRerun: () => void;
  onClone: () => void;
  onExport: (type: 'pdf' | 'csv' | 'json') => void;
}

export function BacktestResultsHeader({
  strategyName,
  runId,
  universe,
  runType,
  status,
  testPeriod,
  granularity,
  capital,
  leverage,
  onRerun,
  onClone,
  onExport,
}: BacktestResultsHeaderProps) {
  const [exportOpen, setExportOpen] = useState(false);

  const handleNavigation = (page: string) => {
    if ((window as any).onPageChange) {
      (window as any).onPageChange(page);
    }
  };

  const statusConfig = {
    completed: { color: 'text-[#00FF88] border-[#00FF88]/30 bg-[#00FF88]/10', label: 'Completed' },
    'in-progress': { color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10', label: 'In Progress' },
    failed: { color: 'text-red-400 border-red-400/30 bg-red-400/10', label: 'Failed' },
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-b border-gray-800 px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button
          onClick={() => handleNavigation('dashboard')}
          className="hover:text-[#00FF88] transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
        <ChevronRight className="w-4 h-4" />
        <button
          onClick={() => handleNavigation('strategy-library')}
          className="hover:text-[#00FF88] transition-colors"
        >
          Strategies
        </button>
        <ChevronRight className="w-4 h-4" />
        <button
          onClick={() => handleNavigation('strategy-library')}
          className="hover:text-[#00FF88] transition-colors"
        >
          {strategyName}
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Backtest Results #{runId}</span>
      </div>

      {/* Title & Meta Info */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-3">
            {strategyName} – Backtest Results
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Universe Badge */}
            <span className="px-3 py-1 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded-lg text-sm font-medium text-[#00C8FF]">
              {universe}
            </span>
            {/* Run Type Badge */}
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm font-medium text-purple-400">
              {runType}
            </span>
            {/* Status Chip */}
            <span className={cn('px-3 py-1 border rounded-lg text-sm font-medium', statusConfig[status].color)}>
              {statusConfig[status].label}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRerun}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <Play className="w-4 h-4" />
            Re-run with Modifications
          </button>
          <button
            onClick={onClone}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            Clone as New Strategy
          </button>
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
            >
              <FileDown className="w-4 h-4" />
              Export Report
              <ChevronDown className="w-4 h-4" />
            </button>
            {exportOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10">
                <button
                  onClick={() => {
                    onExport('pdf');
                    setExportOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 text-sm first:rounded-t-lg"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    onExport('csv');
                    setExportOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 text-sm border-t border-gray-800"
                >
                  Export CSV (Trades)
                </button>
                <button
                  onClick={() => {
                    onExport('json');
                    setExportOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 text-sm border-t border-gray-800 last:rounded-b-lg"
                >
                  Export JSON (Config + Metrics)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Run Meta Info */}
      <div className="flex items-center gap-6 text-sm text-gray-400">
        <div>
          <span className="text-gray-500">Test Period:</span>{' '}
          <span className="text-white font-medium">
            {new Date(testPeriod.from).toLocaleDateString()} – {new Date(testPeriod.to).toLocaleDateString()}
          </span>
        </div>
        <div className="w-px h-4 bg-gray-700" />
        <div>
          <span className="text-gray-500">Data Granularity:</span>{' '}
          <span className="text-white font-medium">{granularity}</span>
        </div>
        <div className="w-px h-4 bg-gray-700" />
        <div>
          <span className="text-gray-500">Initial Capital:</span>{' '}
          <span className="text-white font-medium">${capital.toLocaleString()}</span>
        </div>
        <div className="w-px h-4 bg-gray-700" />
        <div>
          <span className="text-gray-500">Leverage:</span>{' '}
          <span className={cn('font-medium', leverage > 2 ? 'text-yellow-400' : 'text-white')}>{leverage}x</span>
        </div>
      </div>
    </div>
  );
}