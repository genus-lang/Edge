import { useState } from 'react';
import { Activity, Bell, TrendingUp, FileText, ChevronUp, ChevronDown, Plus, Settings, Trash2, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChartBottomPanelProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export function ChartBottomPanel({ isExpanded, onToggleExpanded }: ChartBottomPanelProps) {
  const [activeTab, setActiveTab] = useState('indicators');

  const indicators = [
    { id: '1', name: 'EMA (20)', type: 'Trend', visible: true, color: '#9333EA', settings: { period: 20 } },
    { id: '2', name: 'RSI', type: 'Momentum', visible: true, color: '#3B82F6', settings: { period: 14, overbought: 70, oversold: 30 } },
    { id: '3', name: 'MACD', type: 'Momentum', visible: false, color: '#10B981', settings: { fast: 12, slow: 26, signal: 9 } },
  ];

  const alerts = [
    { id: '1', condition: 'Price > $180', status: 'Active', triggered: null },
    { id: '2', condition: 'RSI < 30', status: 'Active', triggered: null },
    { id: '3', condition: 'MACD Cross Up', status: 'Triggered', triggered: '2 hours ago' },
  ];

  const trades = [
    { id: '1', symbol: 'AAPL', side: 'Buy', qty: 100, entry: 175.20, current: 178.45, pnl: '+$325.00', pnlPercent: '+1.85%' },
    { id: '2', symbol: 'TSLA', side: 'Sell', qty: 50, entry: 245.80, current: 242.10, pnl: '+$185.00', pnlPercent: '+1.51%' },
  ];

  const logs = [
    { id: '1', time: '14:32:15', message: 'Indicator added: EMA (20)', type: 'info' },
    { id: '2', time: '14:28:43', message: 'Alert triggered: Price > $180', type: 'success' },
    { id: '3', time: '14:15:22', message: 'Template applied: Day Trading Setup', type: 'info' },
  ];

  return (
    <div className={cn('border-t border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 transition-all', isExpanded ? 'h-64 sm:h-64' : 'h-10')}>
      {/* Tab Bar */}
      <div className="h-10 flex items-center justify-between px-2 sm:px-4 border-b border-gray-800">
        <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('indicators')}
            className={cn(
              'flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
              activeTab === 'indicators'
                ? 'bg-[#00C8FF] text-black'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Indicators</span>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={cn(
              'flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
              activeTab === 'alerts'
                ? 'bg-[#00C8FF] text-black'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Alerts</span>
            <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">1</span>
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            className={cn(
              'flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
              activeTab === 'trades'
                ? 'bg-[#00C8FF] text-black'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Trades</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={cn(
              'flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
              activeTab === 'logs'
                ? 'bg-[#00C8FF] text-black'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Logs</span>
          </button>
        </div>

        <button
          onClick={onToggleExpanded}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Tab Content */}
      {isExpanded && (
        <div className="h-[calc(100%-2.5rem)] overflow-y-auto p-2 sm:p-4">
          {/* Indicators Tab */}
          {activeTab === 'indicators' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs sm:text-sm font-semibold text-white">Active Indicators</h3>
                <button className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-[#00FF88] text-black rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add Indicator</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              {indicators.map((indicator) => (
                <div
                  key={indicator.id}
                  className="flex items-center justify-between p-2 sm:p-3 bg-gray-800/30 border border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: indicator.color }}
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white">{indicator.name}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{indicator.type}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      className="p-1 sm:p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                      title={indicator.visible ? 'Hide' : 'Show'}
                    >
                      {indicator.visible ? <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> : <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>
                    <button
                      className="p-1 sm:p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                      title="Settings"
                    >
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      className="p-1 sm:p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs sm:text-sm font-semibold text-white">Price & Indicator Alerts</h3>
                <button className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-[#00FF88] text-black rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Create Alert</span>
                  <span className="sm:hidden">New</span>
                </button>
              </div>

              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    'flex items-center justify-between p-2 sm:p-3 border rounded-lg',
                    alert.status === 'Triggered'
                      ? 'bg-[#00FF88]/10 border-[#00FF88]/30'
                      : 'bg-gray-800/30 border-gray-700'
                  )}
                >
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-white mb-1">{alert.condition}</div>
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded font-semibold',
                          alert.status === 'Triggered'
                            ? 'bg-[#00FF88]/20 text-[#00FF88]'
                            : 'bg-gray-700 text-gray-400'
                        )}
                      >
                        {alert.status}
                      </span>
                      {alert.triggered && (
                        <span className="text-gray-500 hidden sm:inline">Triggered {alert.triggered}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <button className="p-1 sm:p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="p-1 sm:p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors">
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Trades Tab */}
          {activeTab === 'trades' && (
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-4">Open Positions</h3>

              {trades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-2 sm:p-3 bg-gray-800/30 border border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div>
                      <div className="flex items-center gap-1 sm:gap-2 mb-1">
                        <span className="text-xs sm:text-sm font-semibold text-white">{trade.symbol}</span>
                        <span
                          className={cn(
                            'px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold',
                            trade.side === 'Buy'
                              ? 'bg-[#00FF88]/10 text-[#00FF88]'
                              : 'bg-red-500/10 text-red-400'
                          )}
                        >
                          {trade.side}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-500">{trade.qty} shares</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                        <span className="text-gray-500">Entry: ${trade.entry}</span>
                        <span className="text-gray-500 hidden sm:inline">Current: ${trade.current}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-bold text-[#00FF88]">{trade.pnl}</div>
                    <div className="text-[10px] sm:text-xs text-[#00FF88]">{trade.pnlPercent}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-4">Activity Log</h3>

              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-2 sm:gap-3 p-2 hover:bg-gray-800/30 rounded-lg transition-colors"
                >
                  <span className="text-[10px] sm:text-xs text-gray-500 font-mono">{log.time}</span>
                  <span className="flex-1 text-[10px] sm:text-xs text-gray-300">{log.message}</span>
                  <span
                    className={cn(
                      'px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold',
                      log.type === 'success'
                        ? 'bg-[#00FF88]/10 text-[#00FF88]'
                        : 'bg-gray-700 text-gray-400'
                    )}
                  >
                    {log.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}