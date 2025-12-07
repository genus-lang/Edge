import { Clock, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

const sessions = [
  { name: 'Tokyo', hours: '00:00 - 09:00 GMT', active: false },
  { name: 'London', hours: '08:00 - 17:00 GMT', active: true },
  { name: 'New York', hours: '13:00 - 22:00 GMT', active: true },
];

export function SessionSpreadsPanel() {
  const currentSpread = 0.8;
  const avgSpread = 0.9;
  const volatility = 'Normal'; // Low | Normal | High
  const atr = '58 pips';

  const volatilityColors = {
    Low: 'text-[#00FF88] bg-[#00FF88]/10 border-[#00FF88]/30',
    Normal: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    High: 'text-red-400 bg-red-500/10 border-red-500/30',
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">Spreads & Sessions</h3>

      {/* Current Spread */}
      <div className="p-4 bg-gradient-to-br from-[#00FF88]/5 to-[#00C8FF]/5 border border-[#00FF88]/20 rounded-lg mb-4">
        <div className="text-xs text-gray-500 mb-2">Current Spread</div>
        <div className="text-4xl font-bold text-white mb-1">{currentSpread} <span className="text-xl text-gray-500">pips</span></div>
        <div className="text-xs text-gray-400">
          Avg during session: {avgSpread} pips
        </div>
      </div>

      {/* Trading Sessions */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-white">Trading Sessions</span>
        </div>
        
        <div className="space-y-2">
          {sessions.map((session) => (
            <div
              key={session.name}
              className={cn(
                'p-3 rounded-lg border transition-colors',
                session.active
                  ? 'bg-[#00FF88]/10 border-[#00FF88]/30'
                  : 'bg-gray-800/30 border-gray-700'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{session.name}</span>
                    {session.active && (
                      <span className="flex items-center gap-1 text-xs text-[#00FF88]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{session.hours}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-2 bg-gray-800/30 rounded-lg text-xs text-gray-400">
          <strong className="text-white">Tip:</strong> London + NY overlap (13:00-17:00 GMT) typically shows highest movement
        </div>
      </div>

      {/* Volatility Gauge */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-white">Volatility</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            {['Low', 'Normal', 'High'].map((level) => (
              <div
                key={level}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold border',
                  level === volatility
                    ? volatilityColors[level as keyof typeof volatilityColors]
                    : 'bg-gray-800 text-gray-600 border-gray-700'
                )}
              >
                {level}
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">ATR (24h)</span>
            <span className="text-white font-semibold">{atr}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
