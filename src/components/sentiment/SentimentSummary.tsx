import { TrendingUp, TrendingDown, MessageSquare, AlertTriangle, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SentimentSummaryProps {
  overallScore: number;
  scoreDelta: number;
  bullishPercent: number;
  bearishPercent: number;
  topAsset: {
    symbol: string;
    mentions: number;
    positivePercent: number;
  };
  newsVsSocial: {
    news: 'Bullish' | 'Bearish' | 'Neutral';
    social: 'Bullish' | 'Bearish' | 'Neutral';
  };
  alertCount: number;
}

export function SentimentSummary({
  overallScore,
  scoreDelta,
  bullishPercent,
  bearishPercent,
  topAsset,
  newsVsSocial,
  alertCount,
}: SentimentSummaryProps) {
  const getSentimentLabel = (score: number) => {
    if (score >= 80) return 'Very Bullish';
    if (score >= 60) return 'Bullish';
    if (score >= 40) return 'Neutral';
    if (score >= 20) return 'Bearish';
    return 'Very Bearish';
  };

  const getSentimentColor = (score: number) => {
    if (score >= 60) return '#00FF88';
    if (score >= 40) return '#FFA500';
    return '#FF4444';
  };

  const getGaugeRotation = (score: number) => {
    // -90 to 90 degrees based on 0-100 score
    return (score / 100) * 180 - 90;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Overall Sentiment Gauge */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="text-center">
          {/* Circular Gauge */}
          <div className="relative w-40 h-40 mx-auto mb-4">
            {/* Background Arc */}
            <svg className="w-full h-full" viewBox="0 0 160 160">
              {/* Gradient zones */}
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF4444" />
                  <stop offset="50%" stopColor="#FFA500" />
                  <stop offset="100%" stopColor="#00FF88" />
                </linearGradient>
              </defs>
              {/* Arc background */}
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="#2A2E39"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Colored arc */}
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Pointer */}
              <line
                x1="80"
                y1="80"
                x2="80"
                y2="30"
                stroke={getSentimentColor(overallScore)}
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${getGaugeRotation(overallScore)} 80 80)`}
              />
              {/* Center dot */}
              <circle cx="80" cy="80" r="6" fill={getSentimentColor(overallScore)} />
            </svg>

            {/* Score in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-white">{overallScore}</div>
              <div className="text-xs text-gray-500 mt-1">{getSentimentLabel(overallScore)}</div>
            </div>
          </div>

          <div className="text-sm font-semibold text-gray-400 mb-2">
            Overall Market Sentiment
          </div>
          <div className="text-xs text-gray-500">Last 24h</div>
          <div
            className={cn(
              'inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-semibold',
              scoreDelta >= 0
                ? 'bg-[#00FF88]/10 text-[#00FF88]'
                : 'bg-red-500/10 text-red-400'
            )}
          >
            {scoreDelta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {scoreDelta >= 0 ? '+' : ''}{scoreDelta} vs. previous day
          </div>
        </div>
      </div>

      {/* Bullish vs Bearish Mentions */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-sm font-semibold text-white">Bullish vs Bearish</h3>
        </div>

        <div className="text-2xl font-bold text-white mb-2">
          {bullishPercent}% / {bearishPercent}%
        </div>

        {/* Bar */}
        <div className="flex h-3 rounded-full overflow-hidden mb-4">
          <div
            className="bg-[#00FF88]"
            style={{ width: `${bullishPercent}%` }}
          />
          <div
            className="bg-red-500"
            style={{ width: `${bearishPercent}%` }}
          />
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Bullish mentions</span>
            <span className="text-[#00FF88] font-semibold">{bullishPercent}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Bearish mentions</span>
            <span className="text-red-400 font-semibold">{bearishPercent}%</span>
          </div>
        </div>
      </div>

      {/* Most Mentioned Asset */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-sm font-semibold text-white">Most Mentioned</h3>
        </div>

        <div className="text-2xl font-bold text-white mb-2">{topAsset.symbol}</div>

        <div className="space-y-1 text-xs">
          <div className="text-gray-400">
            {topAsset.mentions.toLocaleString()} mentions
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00FF88] font-semibold">
              {topAsset.positivePercent}% positive
            </span>
          </div>
        </div>

        <button className="w-full mt-4 px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
          View Details
        </button>
      </div>

      {/* High Alert Count */}
      <div className="p-6 bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-sm font-semibold text-white">Risk Alerts</h3>
        </div>

        <div className="text-2xl font-bold text-red-400 mb-2">{alertCount}</div>

        <div className="text-xs text-gray-400 mb-4">
          High volatility & negative news on 3 assets
        </div>

        <button className="w-full px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-500/20 transition-colors">
          View Alerts
        </button>
      </div>
    </div>
  );
}
