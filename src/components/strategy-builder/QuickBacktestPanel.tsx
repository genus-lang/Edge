import { PlayCircle, ChevronUp, ChevronDown, Terminal, TestTube, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface QuickBacktestPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  backtestResults?: {
    totalTrades: number;
    winRate: number;
    pnl: number;
    maxDrawdown: number;
    sharpe: number;
  };
  validationLogs: Array<{ type: 'error' | 'warning' | 'info'; message: string; timestamp: Date }>;
  onRunQuickBacktest: (timeRange: string) => void;
  onOpenFullBacktest: () => void;
}

export function QuickBacktestPanel({
  isOpen,
  onToggle,
  backtestResults,
  validationLogs,
  onRunQuickBacktest,
  onOpenFullBacktest,
}: QuickBacktestPanelProps) {
  const [activeTab, setActiveTab] = useState<'backtest' | 'console'>('backtest');
  const [selectedTimeRange, setSelectedTimeRange] = useState('3M');

  const timeRanges = ['1M', '3M', '6M', '1Y', 'Custom'];

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-700 transition-all duration-300',
        isOpen ? 'h-80' : 'h-12'
      )}
    >
      {/* Header Bar */}
      <div
        onClick={onToggle}
        className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-semibold text-white">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            Quick Backtest & Console
          </button>

          {/* Tabs */}
          {isOpen && (
            <div className="flex items-center gap-1 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('backtest');
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  activeTab === 'backtest'
                    ? 'bg-[#00C8FF]/10 text-[#00C8FF] border border-[#00C8FF]/30'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <TestTube className="w-3 h-3 inline mr-1" />
                Quick Backtest
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('console');
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  activeTab === 'console'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <Terminal className="w-3 h-3 inline mr-1" />
                Validation Console
                {validationLogs.filter((log) => log.type === 'error').length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {validationLogs.filter((log) => log.type === 'error').length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {isOpen && backtestResults && (
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Trades:</span>
              <span className="text-white font-semibold">{backtestResults.totalTrades}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Win Rate:</span>
              <span className={cn('font-semibold', backtestResults.winRate >= 60 ? 'text-[#00FF88]' : 'text-yellow-400')}>
                {backtestResults.winRate}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">P&L:</span>
              <span className={cn('font-semibold', backtestResults.pnl >= 0 ? 'text-[#00FF88]' : 'text-red-400')}>
                {backtestResults.pnl >= 0 ? '+' : ''}{backtestResults.pnl}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      {isOpen && (
        <div className="h-[calc(100%-48px)] overflow-hidden">
          {/* Quick Backtest Tab */}
          {activeTab === 'backtest' && (
            <div className="h-full p-6">
              <div className="flex items-start gap-6 h-full">
                {/* Left: Controls */}
                <div className="w-80 space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Time Range</label>
                    <div className="flex gap-2">
                      {timeRanges.map((range) => (
                        <button
                          key={range}
                          onClick={() => setSelectedTimeRange(range)}
                          className={cn(
                            'flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                            selectedTimeRange === range
                              ? 'bg-[#00C8FF] text-black'
                              : 'bg-gray-800 text-gray-400 hover:text-white'
                          )}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onRunQuickBacktest(selectedTimeRange)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Run Quick Backtest
                  </button>

                  <button
                    onClick={onOpenFullBacktest}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm font-semibold"
                  >
                    Open in Backtesting Lab
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* Right: Results */}
                <div className="flex-1 h-full overflow-auto">
                  {backtestResults ? (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-4">Results Summary</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">Total Trades</div>
                          <div className="text-2xl font-bold text-white">{backtestResults.totalTrades}</div>
                        </div>
                        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">Win Rate</div>
                          <div className={cn('text-2xl font-bold', backtestResults.winRate >= 60 ? 'text-[#00FF88]' : 'text-yellow-400')}>
                            {backtestResults.winRate}%
                          </div>
                        </div>
                        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">P&L</div>
                          <div className={cn('text-2xl font-bold', backtestResults.pnl >= 0 ? 'text-[#00FF88]' : 'text-red-400')}>
                            {backtestResults.pnl >= 0 ? '+' : ''}{backtestResults.pnl}%
                          </div>
                        </div>
                        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">Max Drawdown</div>
                          <div className={cn('text-2xl font-bold', backtestResults.maxDrawdown >= -15 ? 'text-[#00FF88]' : 'text-red-400')}>
                            {backtestResults.maxDrawdown}%
                          </div>
                        </div>
                        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg col-span-2">
                          <div className="text-xs text-gray-500 mb-1">Sharpe Ratio</div>
                          <div className={cn('text-2xl font-bold', backtestResults.sharpe >= 1.5 ? 'text-[#00FF88]' : 'text-yellow-400')}>
                            {backtestResults.sharpe.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#00C8FF]/20 to-[#00FF88]/20 border border-[#00C8FF]/30 flex items-center justify-center">
                          <TestTube className="w-8 h-8 text-[#00C8FF]" />
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-1">No backtest results yet</h4>
                        <p className="text-xs text-gray-500">Select a time range and run a quick backtest</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Validation Console Tab */}
          {activeTab === 'console' && (
            <div className="h-full p-6 overflow-auto">
              <h4 className="text-sm font-semibold text-white mb-4">Validation Logs</h4>
              <div className="space-y-2 font-mono text-xs">
                {validationLogs.length > 0 ? (
                  validationLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-lg border',
                        log.type === 'error' && 'bg-red-500/5 border-red-500/30',
                        log.type === 'warning' && 'bg-yellow-500/5 border-yellow-500/30',
                        log.type === 'info' && 'bg-blue-500/5 border-blue-500/30'
                      )}
                    >
                      <span className="text-gray-500 shrink-0">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 font-semibold',
                          log.type === 'error' && 'text-red-400',
                          log.type === 'warning' && 'text-yellow-400',
                          log.type === 'info' && 'text-blue-400'
                        )}
                      >
                        [{log.type.toUpperCase()}]
                      </span>
                      <span className="flex-1 text-gray-300">{log.message}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No validation logs</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
