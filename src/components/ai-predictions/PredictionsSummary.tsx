import { TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';

interface PredictionsSummaryProps {
  totalPredictions: number;
  bullishCount: number;
  bearishCount: number;
  neutralCount: number;
  topOpportunity: {
    symbol: string;
    confidence: number;
    direction: string;
    horizon: string;
  };
  riskLevel: 'Low' | 'Moderate' | 'Elevated' | 'High';
  onViewTopOpportunity: () => void;
}

export function PredictionsSummary({
  totalPredictions,
  bullishCount,
  bearishCount,
  neutralCount,
  topOpportunity,
  riskLevel,
  onViewTopOpportunity,
}: PredictionsSummaryProps) {
  const total = bullishCount + bearishCount + neutralCount;
  const bullishPercent = (bullishCount / total) * 100;
  const bearishPercent = (bearishCount / total) * 100;
  const neutralPercent = (neutralCount / total) * 100;

  const riskColors = {
    Low: 'bg-[#00FF88]/10 border-[#00FF88]/30 text-[#00FF88]',
    Moderate: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    Elevated: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
    High: 'bg-red-500/10 border-red-500/30 text-red-400',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Predictions */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-sm font-semibold text-gray-400">Total Predictions</h3>
        </div>
        <div className="text-3xl font-bold text-white mb-1">{totalPredictions}</div>
        <p className="text-xs text-gray-500">assets analyzed</p>
      </div>

      {/* Bullish vs Bearish */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-sm font-semibold text-gray-400">Market Sentiment</h3>
        </div>
        
        {/* Bar */}
        <div className="flex h-6 rounded-lg overflow-hidden mb-3">
          <div
            className="bg-[#00FF88] flex items-center justify-center text-xs text-black font-bold"
            style={{ width: `${bullishPercent}%` }}
          >
            {bullishPercent > 15 && bullishCount}
          </div>
          <div
            className="bg-red-500 flex items-center justify-center text-xs text-white font-bold"
            style={{ width: `${bearishPercent}%` }}
          >
            {bearishPercent > 15 && bearishCount}
          </div>
          <div
            className="bg-gray-600 flex items-center justify-center text-xs text-white font-bold"
            style={{ width: `${neutralPercent}%` }}
          >
            {neutralPercent > 15 && neutralCount}
          </div>
        </div>

        {/* Labels */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Bullish</span>
            <span className="text-[#00FF88] font-semibold">{bullishCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Bearish</span>
            <span className="text-red-400 font-semibold">{bearishCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Neutral</span>
            <span className="text-gray-400 font-semibold">{neutralCount}</span>
          </div>
        </div>
      </div>

      {/* Top Opportunity */}
      <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-sm font-semibold text-gray-400">Top Opportunity</h3>
        </div>
        
        <div className="mb-3">
          <div className="text-xl font-bold text-white mb-1">{topOpportunity.symbol}</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#00FF88] font-semibold">{topOpportunity.confidence}% confidence</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 capitalize">{topOpportunity.direction}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Horizon: {topOpportunity.horizon}
          </div>
        </div>

        <button
          onClick={onViewTopOpportunity}
          className="w-full px-3 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg text-sm font-semibold text-[#00FF88] hover:bg-[#00FF88]/20 transition-colors"
        >
          View Details
        </button>
      </div>

      {/* Risk Level */}
      <div className={`p-6 border rounded-xl ${riskColors[riskLevel]}`}>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-sm font-semibold">Risk Regime</h3>
        </div>
        
        <div className="text-2xl font-bold mb-1">{riskLevel}</div>
        <p className="text-xs opacity-80">
          Based on implied volatility, macro risk index, and market conditions
        </p>
      </div>
    </div>
  );
}
