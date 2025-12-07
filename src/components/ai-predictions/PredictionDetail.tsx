import React from 'react';
import { TrendingUp, Target, AlertCircle, Zap, ShoppingCart, Bell, Send, Star, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PredictionDetailProps {
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  currentPrice: string;
  todayChange: string;
  volatility: string;
  avgVolume: string;
  prediction: {
    direction: 'Bullish' | 'Bearish' | 'Range-bound';
    expectedReturn: string;
    probabilityOfGain: number;
    targetPriceRange: {
      min: string;
      base: string;
      max: string;
    };
    maxDrawdown: string;
    signal: string;
    horizon: string;
  };
  explanation: {
    bullets: string[];
    featureImportance: { feature: string; percentage: number }[];
    notes: string;
  };
  scenarios: {
    base: { return: string; probability: number; explanation: string };
    bull: { return: string; probability: number; explanation: string };
    bear: { return: string; probability: number; explanation: string };
  };
}

export function PredictionDetail({ symbol, name, type, exchange, currentPrice, todayChange, volatility, avgVolume, prediction, explanation, scenarios }: PredictionDetailProps) {
  const [activeScenario, setActiveScenario] = React.useState<'base' | 'bull' | 'bear'>('base');

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="pb-6 border-b border-gray-800">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{symbol}</h2>
                <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400">
                  {type}
                </span>
                <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400">
                  {exchange}
                </span>
              </div>
              <div className="text-sm text-gray-400">{name}</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Current Price</div>
              <div className="text-lg font-bold text-white">{currentPrice}</div>
            </div>
            <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Today</div>
              <div className={cn('text-lg font-bold', todayChange.startsWith('+') ? 'text-[#00FF88]' : 'text-red-400')}>
                {todayChange}
              </div>
            </div>
            <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Volatility (30D)</div>
              <div className="text-lg font-bold text-white">{volatility}</div>
            </div>
            <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Avg Volume</div>
              <div className="text-lg font-bold text-white">{avgVolume}</div>
            </div>
          </div>
        </div>

        {/* Prediction Chart Placeholder */}
        <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl">
          <h3 className="text-sm font-semibold text-white mb-4">Price Prediction with Confidence Bands</h3>
          <div className="h-64 flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-600 mb-2 mx-auto" />
              <p className="text-sm text-gray-500">Interactive prediction chart with historical data</p>
              <p className="text-xs text-gray-600 mt-1">50% / 75% / 95% confidence bands</p>
            </div>
          </div>
        </div>

        {/* Key Prediction Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-[#00FF88]/10 to-transparent border border-[#00FF88]/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#00FF88]" />
              <h4 className="text-xs font-semibold text-gray-400">Expected Return</h4>
            </div>
            <div className="text-2xl font-bold text-[#00FF88] mb-1">{prediction.expectedReturn}</div>
            <div className="text-xs text-gray-500">Median scenario · {prediction.horizon}</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-[#00C8FF]/10 to-transparent border border-[#00C8FF]/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#00C8FF]" />
              <h4 className="text-xs font-semibold text-gray-400">Probability of Gain</h4>
            </div>
            <div className="text-2xl font-bold text-[#00C8FF] mb-1">{prediction.probabilityOfGain}%</div>
            <div className="text-xs text-gray-500">Chance price &gt; current</div>
          </div>

          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <h4 className="text-xs font-semibold text-gray-400">Target Price Range</h4>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Min</span>
                <span className="text-white font-semibold">{prediction.targetPriceRange.min}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Base</span>
                <span className="text-white font-semibold">{prediction.targetPriceRange.base}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Max</span>
                <span className="text-white font-semibold">{prediction.targetPriceRange.max}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <h4 className="text-xs font-semibold text-gray-400">Risk / Drawdown</h4>
            </div>
            <div className="text-lg font-bold text-white mb-1">{prediction.maxDrawdown}</div>
            <div className="text-xs text-gray-500">Max expected drawdown</div>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <div className="text-sm font-semibold text-white">AI View: {prediction.signal}</div>
              <div className="text-xs text-gray-500 mt-1">Suitable for medium-risk profile</div>
            </div>
          </div>
        </div>

        {/* AI Explanation */}
        <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl">
          <h3 className="text-sm font-semibold text-white mb-4">Why This Prediction?</h3>
          
          {/* Bullets */}
          <div className="space-y-2 mb-6">
            {explanation.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-300">{bullet}</p>
              </div>
            ))}
          </div>

          {/* Feature Importance */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-400 mb-3">Feature Contribution</h4>
            <div className="space-y-2">
              {explanation.featureImportance.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{item.feature}</span>
                    <span className="text-xs text-white font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00FF88] to-[#00C8FF]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Notes */}
          <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-400">{explanation.notes}</p>
            </div>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl">
          <h3 className="text-sm font-semibold text-white mb-4">Scenario Analysis</h3>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {(['base', 'bull', 'bear'] as const).map((scenario) => (
              <button
                key={scenario}
                onClick={() => setActiveScenario(scenario)}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize',
                  activeScenario === scenario
                    ? 'bg-[#00C8FF] text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                )}
              >
                {scenario} Case
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Expected Return</div>
                <div className="text-xl font-bold text-white">{scenarios[activeScenario].return}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Probability</div>
                <div className="text-xl font-bold text-white">{scenarios[activeScenario].probability}%</div>
              </div>
            </div>
            <p className="text-sm text-gray-300">{scenarios[activeScenario].explanation}</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
            <ShoppingCart className="w-4 h-4" />
            Open Trading Panel
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors">
            <Bell className="w-4 h-4" />
            Create Alert
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors">
            <Send className="w-4 h-4" />
            Send to Strategy Builder
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors">
            <Star className="w-4 h-4" />
            Save to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}