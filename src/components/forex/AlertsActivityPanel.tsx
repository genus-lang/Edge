import { useState } from 'react';
import { Bell, Activity, FileText, Plus, Edit, Trash2, Pause, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

const mockAlerts = [
  { id: '1', condition: 'Price > 1.1000', status: 'active' },
  { id: '2', condition: 'Spread > 1.5 pips', status: 'active' },
  { id: '3', condition: 'RSI < 30', status: 'paused' },
];

const mockActivity = [
  { id: '1', type: 'trade', time: '2 hours ago', description: 'Buy 0.5 lots EUR/USD @ 1.09245', result: '+$45.20' },
  { id: '2', type: 'backtest', time: '1 day ago', description: 'Backtest completed: Mean Reversion Strategy', result: '65% win rate' },
  { id: '3', type: 'alert', time: '2 days ago', description: 'Alert triggered: Price crossed 1.0900', result: 'Triggered' },
];

export function AlertsActivityPanel() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'activity' | 'notes'>('alerts');
  const [notes, setNotes] = useState('');

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg mb-4">
        <button
          onClick={() => setActiveTab('alerts')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'alerts'
              ? 'bg-[#00FF88] text-black'
              : 'text-gray-400 hover:text-white'
          )}
        >
          <Bell className="w-4 h-4" />
          Alerts
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'activity'
              ? 'bg-[#00FF88] text-black'
              : 'text-gray-400 hover:text-white'
          )}
        >
          <Activity className="w-4 h-4" />
          Activity
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'notes'
              ? 'bg-[#00FF88] text-black'
              : 'text-gray-400 hover:text-white'
          )}
        >
          <FileText className="w-4 h-4" />
          Notes
        </button>
      </div>

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00FF88] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Alert
          </button>

          <div className="space-y-2">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white font-medium">{alert.condition}</span>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-semibold',
                      alert.status === 'active'
                        ? 'bg-[#00FF88]/10 text-[#00FF88]'
                        : 'bg-gray-700 text-gray-400'
                    )}
                  >
                    {alert.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
                    {alert.status === 'active' ? (
                      <Pause className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>
                  <button className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
                    <Edit className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <button className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-2">
          {mockActivity.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm text-white">{item.description}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{item.time}</span>
                <span className="text-[#00FF88] font-semibold">{item.result}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your trading notes here... (supports markdown)"
            className="w-full h-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50 resize-none"
          />
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>Auto-saved</span>
            <button className="text-[#00FF88] hover:text-[#00FF88]/80">Pin note</button>
          </div>
        </div>
      )}
    </div>
  );
}
