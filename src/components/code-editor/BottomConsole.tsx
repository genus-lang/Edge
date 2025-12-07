import { Terminal, PlayCircle, TestTube, FileText, ChevronUp, ChevronDown, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface ConsoleLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error';
  message: string;
}

interface TestResult {
  symbol: string;
  timeframe: string;
  dateRange: string;
  totalTrades: number;
  winRate: number;
  pnl: number;
  maxDrawdown: number;
  trades: Array<{
    id: string;
    entryTime: string;
    exitTime: string;
    side: 'buy' | 'sell';
    size: number;
    pnl: number;
  }>;
}

interface BottomConsoleProps {
  isOpen: boolean;
  onToggle: () => void;
  consoleLogs: ConsoleLog[];
  testResult?: TestResult;
  onClearLogs: () => void;
}

export function BottomConsole({
  isOpen,
  onToggle,
  consoleLogs,
  testResult,
  onClearLogs,
}: BottomConsoleProps) {
  const [activeTab, setActiveTab] = useState<'console' | 'test' | 'logs'>('console');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-blue-400';
      case 'warn': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-700 transition-all duration-300',
        isOpen ? 'h-96' : 'h-12'
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
            Console & Results
          </button>

          {/* Tabs */}
          {isOpen && (
            <div className="flex items-center gap-1 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('console');
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  activeTab === 'console'
                    ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <Terminal className="w-3 h-3 inline mr-1" />
                Console
                {consoleLogs.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-gray-700 text-white text-xs rounded-full">
                    {consoleLogs.length}
                  </span>
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('test');
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  activeTab === 'test'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <PlayCircle className="w-3 h-3 inline mr-1" />
                Test Run
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('logs');
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  activeTab === 'logs'
                    ? 'bg-[#00C8FF]/10 text-[#00C8FF] border border-[#00C8FF]/30'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <FileText className="w-3 h-3 inline mr-1" />
                Logs
              </button>
            </div>
          )}
        </div>

        {isOpen && testResult && (
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Trades:</span>
              <span className="text-white font-semibold">{testResult.totalTrades}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Win Rate:</span>
              <span className={cn('font-semibold', testResult.winRate >= 60 ? 'text-[#00FF88]' : 'text-yellow-400')}>
                {testResult.winRate}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">P&L:</span>
              <span className={cn('font-semibold', testResult.pnl >= 0 ? 'text-[#00FF88]' : 'text-red-400')}>
                {testResult.pnl >= 0 ? '+' : ''}{testResult.pnl}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      {isOpen && (
        <div className="h-[calc(100%-48px)] overflow-hidden">
          {/* Console Tab */}
          {activeTab === 'console' && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-2 border-b border-gray-800">
                <h4 className="text-sm font-semibold text-white">Console Output</h4>
                <button
                  onClick={onClearLogs}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </div>
              <div className="flex-1 overflow-auto px-6 py-4 font-mono text-xs space-y-1">
                {consoleLogs.length > 0 ? (
                  consoleLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-gray-600 shrink-0">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <span className={cn('shrink-0 font-semibold', getLevelColor(log.level))}>
                        [{log.level.toUpperCase()}]
                      </span>
                      <span className="flex-1 text-gray-300">{log.message}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Console is empty. Run your strategy to see output.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Test Run Tab */}
          {activeTab === 'test' && (
            <div className="h-full overflow-auto p-6">
              {testResult ? (
                <div className="space-y-4">
                  {/* Summary Cards */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Test Summary</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Total Trades</div>
                        <div className="text-2xl font-bold text-white">{testResult.totalTrades}</div>
                      </div>
                      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Win Rate</div>
                        <div className={cn('text-2xl font-bold', testResult.winRate >= 60 ? 'text-[#00FF88]' : 'text-yellow-400')}>
                          {testResult.winRate}%
                        </div>
                      </div>
                      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">P&L</div>
                        <div className={cn('text-2xl font-bold', testResult.pnl >= 0 ? 'text-[#00FF88]' : 'text-red-400')}>
                          {testResult.pnl >= 0 ? '+' : ''}{testResult.pnl}%
                        </div>
                      </div>
                      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Max Drawdown</div>
                        <div className={cn('text-2xl font-bold', testResult.maxDrawdown >= -15 ? 'text-[#00FF88]' : 'text-red-400')}>
                          {testResult.maxDrawdown}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trades Table */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Recent Trades</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Entry Time</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Exit Time</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Side</th>
                            <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500">Size</th>
                            <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500">P&L</th>
                          </tr>
                        </thead>
                        <tbody>
                          {testResult.trades.map((trade) => (
                            <tr key={trade.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                              <td className="py-2 px-3 text-gray-400">{trade.entryTime}</td>
                              <td className="py-2 px-3 text-gray-400">{trade.exitTime}</td>
                              <td className="py-2 px-3">
                                <span className={cn(
                                  'px-2 py-1 rounded text-xs font-semibold',
                                  trade.side === 'buy' ? 'bg-[#00FF88]/10 text-[#00FF88]' : 'bg-red-500/10 text-red-400'
                                )}>
                                  {trade.side === 'buy' ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
                                  {trade.side.toUpperCase()}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-right text-white">{trade.size}</td>
                              <td className="py-2 px-3 text-right">
                                <span className={cn('font-semibold', trade.pnl >= 0 ? 'text-[#00FF88]' : 'text-red-400')}>
                                  {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                      <TestTube className="w-8 h-8 text-purple-400" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">No test results yet</h4>
                    <p className="text-xs text-gray-500">Click "Run Test" to see results</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div className="h-full overflow-auto px-6 py-4 font-mono text-xs space-y-2">
              <div className="p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg text-blue-400">
                [2024-12-07 14:32:15] Request to broker API: GET /api/v1/positions
              </div>
              <div className="p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg text-blue-400">
                [2024-12-07 14:32:16] Response: &#123;status: 200, data: &#123;...&#125;&#125;
              </div>
              <div className="p-3 bg-yellow-500/5 border border-yellow-500/30 rounded-lg text-yellow-400">
                [2024-12-07 14:32:17] Warning: High volatility detected on BTCUSDT
              </div>
              <div className="p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg text-blue-400">
                [2024-12-07 14:32:18] Executing strategy logic...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}