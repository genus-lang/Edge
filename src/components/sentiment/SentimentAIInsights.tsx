import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from 'lucide-react';

interface SentimentAIInsightsProps {
  onRefresh?: () => void;
}

export function SentimentAIInsights({ onRefresh }: SentimentAIInsightsProps) {
  return (
    <div className="w-80 space-y-6">
      {/* Market Summary Insight */}
      <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00C8FF]" />
            <h3 className="text-sm font-semibold text-white">Market Summary</h3>
          </div>
          <button
            onClick={onRefresh}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            title="Regenerate insights"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Market sentiment is <strong className="text-[#00FF88]">Bullish overall</strong>, driven mainly by crypto assets and large-cap tech stocks. However, energy sector shows rising bearish sentiment.
        </p>

        <div className="space-y-3">
          <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-[#00FF88]" />
              <span className="text-xs font-semibold text-white">Top Bullish</span>
            </div>
            <div className="text-xs text-gray-400">BTC, NVDA, AAPL, MSFT</div>
          </div>

          <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-xs font-semibold text-white">Top Bearish</span>
            </div>
            <div className="text-xs text-gray-400">XOM, CVX, Energy Sector</div>
          </div>

          <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-semibold text-white">Risk Events</span>
            </div>
            <div className="text-xs text-gray-400">Fed meeting tomorrow, 3 earnings reports</div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Last updated: 3 minutes ago
        </div>
      </div>

      {/* Unusual Sentiment Shift */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h3 className="text-sm font-semibold text-white">Unusual Shifts</h3>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">TSLA</span>
              <span className="text-sm font-bold text-red-400">-25</span>
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Sentiment dropped in last 6h
            </div>
            <button className="text-xs text-[#00C8FF] hover:underline">
              View Details →
            </button>
          </div>

          <div className="p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">BTC-USD</span>
              <span className="text-sm font-bold text-[#00FF88]">+30</span>
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Jump after ETF news
            </div>
            <button className="text-xs text-[#00C8FF] hover:underline">
              View Details →
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Set Alert for Large Moves
          </button>
        </div>
      </div>

      {/* Sector/Theme Insight */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-sm font-semibold text-white">Sector Insight</h3>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          AI-related stocks show <strong className="text-[#00FF88]">consistent positive sentiment</strong> for last 2 weeks, but price momentum is flattening.
        </p>

        <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg mb-4">
          <div className="text-xs text-gray-500 mb-2">AI Sector Sentiment Trend</div>
          <div className="flex items-end gap-1 h-16">
            {[65, 68, 72, 75, 78, 80, 82, 81, 83, 84, 84, 83].map((value, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-[#00FF88] to-[#00C8FF] rounded-t"
                style={{ height: `${value}%` }}
                title={`Day ${idx + 1}: ${value}`}
              />
            ))}
          </div>
        </div>

        <button className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
          View AI Sector Details
        </button>
      </div>

      {/* Risk & Disclaimer */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-xs text-gray-300">
              <strong className="text-white">Disclaimer:</strong> Sentiment is not investment advice. Always combine with fundamentals and risk analysis.
            </p>
            <button className="text-xs text-[#00C8FF] hover:underline">
              Go to Risk Analysis →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
