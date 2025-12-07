import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AIInsight {
  id: string;
  type: 'strength' | 'warning' | 'opportunity';
  title: string;
  description: string;
  tickers: string[];
  confidence: 'low' | 'medium' | 'high';
  action?: string;
}

const insights: AIInsight[] = [
  {
    id: '1',
    type: 'strength',
    title: 'Sectors showing unusual strength',
    description: 'IT and Pharma sectors outperforming market with strong volume',
    tickers: ['TCS', 'INFY', 'DRREDDY', 'SUNPHARMA'],
    confidence: 'high',
    action: 'View in Screener',
  },
  {
    id: '2',
    type: 'warning',
    title: 'High volatility in Banking stocks',
    description: 'Consider tightening stop losses on bank holdings',
    tickers: ['HDFCBANK', 'ICICIBANK', 'AXISBANK'],
    confidence: 'medium',
    action: 'Adjust Strategy',
  },
  {
    id: '3',
    type: 'opportunity',
    title: 'Crypto leading recovery',
    description: 'BTC breaking key resistance, altcoins showing strength',
    tickers: ['BTC', 'ETH', 'SOL'],
    confidence: 'high',
    action: 'View Crypto Markets',
  },
];

const confidenceLevels = {
  low: 'bg-gray-700 text-gray-400',
  medium: 'bg-yellow-500/20 text-yellow-500',
  high: 'bg-[#00FF88]/20 text-[#00FF88]',
};

const typeIcons = {
  strength: TrendingUp,
  warning: AlertTriangle,
  opportunity: Lightbulb,
};

const typeColors = {
  strength: 'from-[#00FF88]/10 to-[#00C8FF]/10 border-[#00FF88]/30',
  warning: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/30',
  opportunity: 'from-[#00C8FF]/10 to-purple-500/10 border-[#00C8FF]/30',
};

export function AIInsightsPanel() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00FF88]" />
          <div>
            <h3 className="text-lg font-semibold text-white">AI Market Insights</h3>
            <p className="text-sm text-gray-500 mt-0.5">Powered by machine learning</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = typeIcons[insight.type];
          return (
            <div
              key={insight.id}
              className={cn(
                'p-4 bg-gradient-to-br border rounded-xl hover:shadow-lg transition-all cursor-pointer',
                typeColors[insight.type]
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      insight.type === 'strength' && 'bg-[#00FF88]/20 text-[#00FF88]',
                      insight.type === 'warning' && 'bg-yellow-500/20 text-yellow-500',
                      insight.type === 'opportunity' && 'bg-[#00C8FF]/20 text-[#00C8FF]'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-1">{insight.title}</h4>
                    <p className="text-xs text-gray-400">{insight.description}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'px-2 py-0.5 text-xs rounded-full font-medium',
                    confidenceLevels[insight.confidence]
                  )}
                >
                  {insight.confidence}
                </span>
              </div>

              {/* Tickers */}
              <div className="flex items-center flex-wrap gap-2 mb-3">
                {insight.tickers.map((ticker) => (
                  <span
                    key={ticker}
                    className="px-2 py-1 text-xs font-mono font-semibold bg-gray-900/50 text-white rounded border border-gray-700"
                  >
                    {ticker}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              {insight.action && (
                <button className="flex items-center gap-2 text-xs font-medium text-[#00FF88] hover:text-[#00FF88]/80 transition-colors">
                  {insight.action}
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-600 text-center">
        Insights updated every 15 minutes
      </div>
    </div>
  );
}
