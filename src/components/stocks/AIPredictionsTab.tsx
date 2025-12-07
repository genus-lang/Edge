import { Sparkles, TrendingUp, AlertTriangle, BarChart3, Brain } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AIPredictionsTab() {
  const signal = 'Bullish';
  const confidence = 78;
  const timeHorizon = 'Short-term (1-5 days)';
  const predictedMove = '+3% to +5%';

  const drivers = [
    { text: 'Strong upward momentum detected', impact: 'positive' },
    { text: 'Positive earnings surprise (+12% vs estimate)', impact: 'positive' },
    { text: 'Improving sentiment vs sector peers', impact: 'positive' },
    { text: 'RSI approaching overbought territory', impact: 'negative' },
  ];

  const features = [
    { name: 'Volume', importance: 92 },
    { name: 'RSI', importance: 85 },
    { name: 'News Sentiment', importance: 78 },
    { name: 'Moving Averages', importance: 71 },
    { name: 'Sector Performance', importance: 65 },
    { name: 'Market Breadth', importance: 58 },
  ];

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-yellow-500">
          <strong>Important:</strong> AI predictions are not investment advice. Always conduct your own research and consider your risk tolerance before making investment decisions.
        </div>
      </div>

      {/* Current Signal */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Sparkles className="w-4 h-4" />
              AI Signal
            </div>
            <div className="text-4xl font-bold text-[#00FF88] mb-2">{signal}</div>
            <div className="text-sm text-gray-400">{timeHorizon}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-2">Confidence</div>
            <div className="text-3xl font-bold text-white mb-2">{confidence}%</div>
            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00FF88] to-[#00C8FF]"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* Predicted Move */}
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Predicted Price Movement</span>
            <span className="text-xl font-bold text-[#00FF88]">{predictedMove}</span>
          </div>
        </div>
      </div>

      {/* Signal History */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">Signal History</h3>
        </div>
        <div className="h-40 flex items-end gap-2">
          {[65, 72, 68, 75, 82, 78, 85, 90, 88, 92, 89, 78].map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-800 rounded-t overflow-hidden" style={{ height: `${value}%` }}>
                <div
                  className={cn(
                    'w-full h-full',
                    value > 70 ? 'bg-[#00FF88]' : value > 50 ? 'bg-yellow-500' : 'bg-gray-600'
                  )}
                />
              </div>
              <div className="text-xs text-gray-600">{idx + 1}d</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Historical accuracy: Signal predictions vs actual price movements
        </div>
      </div>

      {/* Key Drivers */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-lg font-semibold text-white">Key Drivers</h3>
        </div>
        <div className="space-y-3">
          {drivers.map((driver, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg"
            >
              <div
                className={cn(
                  'w-2 h-2 rounded-full mt-1.5',
                  driver.impact === 'positive' ? 'bg-[#00FF88]' : 'bg-yellow-500'
                )}
              />
              <div className="flex-1 text-sm text-gray-300">{driver.text}</div>
              {driver.impact === 'positive' ? (
                <TrendingUp className="w-4 h-4 text-[#00FF88] flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Importance */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Model Explainability</h3>
        <p className="text-sm text-gray-400 mb-4">
          These factors had the most influence on the AI prediction:
        </p>
        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature.name}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-300">{feature.name}</span>
                <span className="text-white font-semibold">{feature.importance}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00C8FF] to-[#00FF88]"
                  style={{ width: `${feature.importance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Level */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-2">Volatility Risk</div>
            <div className="text-lg font-bold text-yellow-500">Medium</div>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-2">Market Risk</div>
            <div className="text-lg font-bold text-[#00FF88]">Low</div>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-2">Model Confidence</div>
            <div className="text-lg font-bold text-[#00FF88]">High</div>
          </div>
        </div>
      </div>

      {/* Scenario Analysis */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Scenario Analysis</h3>
        <div className="space-y-3">
          <div className="p-4 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#00FF88]">Bull Case (30% probability)</span>
              <span className="text-lg font-bold text-[#00FF88]">+8% to +12%</span>
            </div>
            <p className="text-xs text-gray-400">
              Strong earnings, positive sector momentum, breakthrough in new product line
            </p>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">Base Case (50% probability)</span>
              <span className="text-lg font-bold text-white">+3% to +5%</span>
            </div>
            <p className="text-xs text-gray-400">
              Meets expectations, normal market conditions, steady institutional buying
            </p>
          </div>
          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-red-400">Bear Case (20% probability)</span>
              <span className="text-lg font-bold text-red-400">-2% to 0%</span>
            </div>
            <p className="text-xs text-gray-400">
              Market correction, regulatory headwinds, profit-taking after recent gains
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
