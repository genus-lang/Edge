import { AlertTriangle, TrendingUp, Calendar, X } from 'lucide-react';
import { useState } from 'react';

interface Warning {
  id: string;
  type: 'volatility' | 'event' | 'leverage';
  message: string;
  severity: 'high' | 'medium' | 'low';
  dismissible: boolean;
}

const warnings: Warning[] = [
  {
    id: '1',
    type: 'volatility',
    message: 'High volatility detected in last 4 hours. Consider widening stop loss or reducing position size.',
    severity: 'high',
    dismissible: true,
  },
  {
    id: '2',
    type: 'event',
    message: 'Major ECB rate decision in 1 day. Spreads may widen significantly.',
    severity: 'high',
    dismissible: false,
  },
  {
    id: '3',
    type: 'leverage',
    message: 'Using high leverage (1:100+) increases risk. Ensure proper risk management.',
    severity: 'medium',
    dismissible: true,
  },
];

export function RiskWarningsPanel() {
  const [dismissedWarnings, setDismissedWarnings] = useState<string[]>([]);

  const handleDismiss = (id: string) => {
    setDismissedWarnings([...dismissedWarnings, id]);
  };

  const activeWarnings = warnings.filter((w) => !dismissedWarnings.includes(w.id));

  const getIcon = (type: string) => {
    switch (type) {
      case 'volatility':
        return TrendingUp;
      case 'event':
        return Calendar;
      case 'leverage':
        return AlertTriangle;
      default:
        return AlertTriangle;
    }
  };

  const getSeverityColors = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500';
      case 'low':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-gray-800 border-gray-700 text-gray-400';
    }
  };

  if (activeWarnings.length === 0) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-3 text-[#00FF88]">
          <div className="w-10 h-10 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center">
            ✓
          </div>
          <div>
            <div className="text-sm font-semibold">No Active Warnings</div>
            <div className="text-xs text-gray-400">Trading conditions are normal</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">Risk Warnings</h3>
      
      <div className="space-y-3">
        {activeWarnings.map((warning) => {
          const Icon = getIcon(warning.type);
          return (
            <div
              key={warning.id}
              className={`p-4 border rounded-lg ${getSeverityColors(warning.severity)}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm">{warning.message}</div>
                  <button className="text-xs underline mt-2 opacity-70 hover:opacity-100">
                    Learn more
                  </button>
                </div>
                {warning.dismissible && (
                  <button
                    onClick={() => handleDismiss(warning.id)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
