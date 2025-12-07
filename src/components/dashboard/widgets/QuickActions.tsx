import { Code2, BarChart3, Activity, Zap } from 'lucide-react';

const actions = [
  {
    id: '1',
    label: 'Create Strategy',
    description: 'Build new trading algorithm',
    icon: Code2,
    gradient: 'from-[#00FF88] to-[#00C8FF]',
    shortcut: '⌘N',
  },
  {
    id: '2',
    label: 'Run Backtest',
    description: 'Test strategy performance',
    icon: BarChart3,
    gradient: 'from-[#00C8FF] to-[#A855F7]',
    shortcut: '⌘B',
  },
  {
    id: '3',
    label: 'Trading Panel',
    description: 'Execute live trades',
    icon: Activity,
    gradient: 'from-[#A855F7] to-[#EC4899]',
    shortcut: '⌘T',
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <button
          key={action.id}
          className="group relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl hover:border-[#00FF88]/30 transition-all duration-300 text-left overflow-hidden"
        >
          {/* Gradient Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-[#00C8FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Content */}
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 text-xs font-mono text-gray-500 bg-gray-800/50 rounded border border-gray-700">
                {action.shortcut}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1">{action.label}</h3>
            <p className="text-sm text-gray-400">{action.description}</p>

            {/* Arrow indicator */}
            <div className="flex items-center gap-2 mt-4 text-sm font-medium text-[#00FF88] opacity-0 group-hover:opacity-100 transition-opacity">
              <Zap className="w-4 h-4" />
              Quick access
            </div>
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </button>
      ))}
    </div>
  );
}
