import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

export function AIInsightsPanel() {
  const insights = [
    'The strategy performs best on Wednesdays and poorly on Mondays.',
    'Most losses occur in high-volatility regimes.',
    'Tightening stop-loss by 0.5% may reduce drawdown by 3.2%.',
    'Win rate drops significantly after 3 consecutive wins.',
  ];

  const recommendations = [
    { label: 'Optimize Parameters', action: 'optimization' },
    { label: 'Clone & Modify Entry Rules', action: 'clone' },
    { label: 'Test Different Universe', action: 'universe' },
  ];

  return (
    <div className="space-y-4">
      {/* Key Takeaways */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          AI Insights
        </h3>
        <div className="space-y-2">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
              <Lightbulb className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" />
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Steps */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#00FF88]" />
          Recommended Next Steps
        </h3>
        <div className="space-y-2">
          {recommendations.map((rec, idx) => (
            <button
              key={idx}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:border-[#00FF88]/30 hover:text-white transition-all text-sm text-left"
            >
              {rec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Warning */}
      <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-4">
        <h3 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Risk Warning
        </h3>
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-1.5" />
            <span>Max drawdown of -18.2% exceeds recommended threshold of -15%</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-1.5" />
            <span>Low sample size (432 trades) may not be statistically significant</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-1.5" />
            <span>Strategy shows signs of overfitting - consider testing on different periods</span>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Best Trade</span>
            <span className="text-[#00FF88] font-semibold">+$1,240.50</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Worst Trade</span>
            <span className="text-red-400 font-semibold">-$680.25</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Avg Win</span>
            <span className="text-white font-medium">+$342.10</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Avg Loss</span>
            <span className="text-white font-medium">-$215.80</span>
          </div>
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-700">
            <span className="text-gray-400">Profit Factor</span>
            <span className="text-[#00C8FF] font-semibold">1.58</span>
          </div>
        </div>
      </div>
    </div>
  );
}
