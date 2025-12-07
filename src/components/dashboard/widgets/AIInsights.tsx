import { TrendingUp, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

const insights = [
  {
    id: '1',
    type: 'signal',
    icon: TrendingUp,
    title: 'BTC showing bullish momentum',
    priority: 'high',
  },
  {
    id: '2',
    type: 'warning',
    icon: AlertTriangle,
    title: 'High correlation risk detected',
    priority: 'medium',
  },
  {
    id: '3',
    type: 'suggestion',
    icon: Lightbulb,
    title: 'Rebalance portfolio?',
    priority: 'low',
  },
];

export function AIInsights() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">AI Insights</h3>
          <p className="text-sm text-gray-500 mt-1">Smart analysis & recommendations</p>
        </div>
        <button
          onClick={() => {
            if ((window as any).openRightPanel) {
              (window as any).openRightPanel('ai-insights');
            }
          }}
          className="text-sm text-[#00FF88] hover:text-[#00FF88]/80 font-medium flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="group relative p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  insight.type === 'signal' && 'bg-[#00FF88]/10 text-[#00FF88]',
                  insight.type === 'warning' && 'bg-yellow-500/10 text-yellow-500',
                  insight.type === 'suggestion' && 'bg-[#00C8FF]/10 text-[#00C8FF]'
                )}
              >
                <insight.icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-white font-medium">{insight.title}</p>
                  <span
                    className={cn(
                      'px-2 py-0.5 text-xs rounded-full font-medium flex-shrink-0',
                      insight.priority === 'high' && 'bg-red-500/10 text-red-400',
                      insight.priority === 'medium' && 'bg-yellow-500/10 text-yellow-400',
                      insight.priority === 'low' && 'bg-blue-500/10 text-blue-400'
                    )}
                  >
                    {insight.priority}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
        View Details
      </button>
    </div>
  );
}
