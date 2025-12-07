import { TrendingUp, MessageCircle, Twitter, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SentimentPanel() {
  const sentimentScore = 72; // 0-100
  const bullishPercent = 62;
  const bearishPercent = 22;
  const neutralPercent = 16;

  const getSentimentLabel = (score: number) => {
    if (score >= 75) return 'Very Bullish';
    if (score >= 55) return 'Bullish';
    if (score >= 45) return 'Neutral';
    if (score >= 25) return 'Bearish';
    return 'Very Bearish';
  };

  const getSentimentColor = (score: number) => {
    if (score >= 55) return 'text-[#00FF88]';
    if (score >= 45) return 'text-yellow-500';
    return 'text-red-400';
  };

  const trendingKeywords = ['ETF', 'Halving', 'Regulation', 'Adoption', 'Mining'];

  return (
    <div className="space-y-4">
      {/* Sentiment Gauge */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-sm font-semibold text-white mb-4">Market Sentiment</h3>
        
        {/* Circular Gauge */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#374151"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#sentimentGradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(sentimentScore / 100) * 352} 352`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FF88" />
                  <stop offset="100%" stopColor="#00C8FF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-white">{sentimentScore}</div>
              <div className="text-xs text-gray-500">/ 100</div>
            </div>
          </div>
          
          <div className={cn('text-lg font-semibold', getSentimentColor(sentimentScore))}>
            {getSentimentLabel(sentimentScore)}
          </div>
        </div>

        {/* Sentiment Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Bullish</span>
            <span className="text-[#00FF88] font-semibold">{bullishPercent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00FF88]"
              style={{ width: `${bullishPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Bearish</span>
            <span className="text-red-400 font-semibold">{bearishPercent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-400"
              style={{ width: `${bearishPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Neutral</span>
            <span className="text-gray-500 font-semibold">{neutralPercent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-600"
              style={{ width: `${neutralPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Social Volume */}
      <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h4 className="text-sm font-semibold text-white mb-3">Social Volume (24h)</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Twitter className="w-4 h-4 text-[#00C8FF]" />
              <span className="text-xs text-gray-500">Twitter</span>
            </div>
            <div className="text-lg font-bold text-white">142.5K</div>
            <div className="text-xs text-[#00FF88]">+18.2%</div>
          </div>
          
          <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-500">Reddit</span>
            </div>
            <div className="text-lg font-bold text-white">28.3K</div>
            <div className="text-xs text-[#00FF88]">+12.4%</div>
          </div>
          
          <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-500">News</span>
            </div>
            <div className="text-lg font-bold text-white">3.2K</div>
            <div className="text-xs text-[#00FF88]">+8.5%</div>
          </div>
          
          <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-500">YouTube</span>
            </div>
            <div className="text-lg font-bold text-white">12.8K</div>
            <div className="text-xs text-[#00FF88]">+22.1%</div>
          </div>
        </div>
      </div>

      {/* Trending Keywords */}
      <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h4 className="text-sm font-semibold text-white mb-3">Trending Topics</h4>
        <div className="flex flex-wrap gap-2">
          {trendingKeywords.map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1.5 bg-[#00C8FF]/10 text-[#00C8FF] border border-[#00C8FF]/30 rounded-full text-xs font-medium hover:bg-[#00C8FF]/20 transition-colors cursor-pointer"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="w-full py-2.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
        View Full Sentiment Analysis
      </button>
    </div>
  );
}
