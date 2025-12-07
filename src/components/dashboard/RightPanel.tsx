import { X, TrendingUp, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'ai-insights' | 'help' | null;
}

const aiInsights = [
  {
    id: '1',
    type: 'signal',
    icon: TrendingUp,
    title: 'Bullish Signal Detected',
    message: 'BTC showing strong momentum with volume confirmation',
    confidence: 85,
  },
  {
    id: '2',
    type: 'warning',
    icon: AlertTriangle,
    title: 'High Correlation Risk',
    message: 'Your portfolio shows 78% correlation to tech sector',
    confidence: 92,
  },
  {
    id: '3',
    type: 'suggestion',
    icon: Lightbulb,
    title: 'Rebalance Opportunity',
    message: 'Consider reducing exposure to overweighted assets',
    confidence: 71,
  },
];

export function RightPanel({ isOpen, onClose, type }: RightPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-96 bg-[#0E1117] border-l border-gray-800 z-50 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">
            {type === 'ai-insights' && 'AI Insights'}
            {type === 'help' && 'Context Help'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto p-6">
          {type === 'ai-insights' && (
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-all"
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
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{insight.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{insight.message}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              insight.type === 'signal' && 'bg-[#00FF88]',
                              insight.type === 'warning' && 'bg-yellow-500',
                              insight.type === 'suggestion' && 'bg-[#00C8FF]'
                            )}
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {insight.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full py-2.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                View All Insights
              </button>
            </div>
          )}

          {type === 'help' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-3">Dashboard Overview</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Your dashboard provides a comprehensive view of your trading performance, active
                  strategies, and portfolio health. Use the widgets to monitor your positions and
                  make informed decisions.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white">Quick Tips</h3>
                <div className="space-y-2">
                  {[
                    'Click any chart to view detailed analytics',
                    'Hover over metrics for historical data',
                    'Use keyboard shortcuts for faster navigation',
                    'Customize your dashboard layout in Settings',
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-gray-400">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors">
                <BookOpen className="w-4 h-4" />
                View Documentation
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
