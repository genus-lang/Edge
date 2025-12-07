import { PieChart, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SourceBreakdownProps {
  sources: {
    name: string;
    positive: number;
    neutral: number;
    negative: number;
    totalMentions: number;
  }[];
}

export function SourceBreakdown({ sources }: SourceBreakdownProps) {
  const mostPositive = sources.reduce((max, s) =>
    s.positive > max.positive ? s : max
  );
  const mostNegative = sources.reduce((max, s) =>
    s.negative > max.negative ? s : max
  );
  const mostActive = sources.reduce((max, s) =>
    s.totalMentions > max.totalMentions ? s : max
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Source Breakdown Chart */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-sm font-semibold text-white">Sentiment by Source</h3>
        </div>

        <div className="space-y-4">
          {sources.map((source) => (
            <div key={source.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white font-medium">{source.name}</span>
                <span className="text-xs text-gray-500">
                  {source.totalMentions.toLocaleString()} mentions
                </span>
              </div>

              {/* Stacked Bar */}
              <div className="flex h-6 rounded-lg overflow-hidden">
                <div
                  className="bg-[#00FF88] flex items-center justify-center text-xs text-black font-semibold"
                  style={{ width: `${source.positive}%` }}
                  title={`${source.positive}% Positive`}
                >
                  {source.positive > 10 && `${source.positive}%`}
                </div>
                <div
                  className="bg-gray-600 flex items-center justify-center text-xs text-white font-semibold"
                  style={{ width: `${source.neutral}%` }}
                  title={`${source.neutral}% Neutral`}
                >
                  {source.neutral > 10 && `${source.neutral}%`}
                </div>
                <div
                  className="bg-red-500 flex items-center justify-center text-xs text-white font-semibold"
                  style={{ width: `${source.negative}%` }}
                  title={`${source.negative}% Negative`}
                >
                  {source.negative > 10 && `${source.negative}%`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Most Positive Source</span>
            <span className="text-[#00FF88] font-semibold">{mostPositive.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Most Negative Source</span>
            <span className="text-red-400 font-semibold">{mostNegative.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Most Active Source</span>
            <span className="text-[#00C8FF] font-semibold">{mostActive.name}</span>
          </div>
        </div>
      </div>

      {/* Sentiment by Trading Session */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-6">
          <PieChart className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-sm font-semibold text-white">Sentiment by Trading Session</h3>
        </div>

        <div className="space-y-4">
          {[
            { session: 'Asia', score: 72, mentions: 2450 },
            { session: 'Europe', score: 58, mentions: 3120 },
            { session: 'US', score: 65, mentions: 5840 },
            { session: 'Weekend', score: 48, mentions: 890 },
          ].map((item) => (
            <div key={item.session}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white font-medium">{item.session}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-xs font-semibold',
                      item.score >= 60 ? 'text-[#00FF88]' :
                      item.score >= 40 ? 'text-yellow-500' :
                      'text-red-400'
                    )}
                  >
                    {item.score}/100
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.mentions.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all',
                    item.score >= 60 ? 'bg-[#00FF88]' :
                    item.score >= 40 ? 'bg-yellow-500' :
                    'bg-red-500'
                  )}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
          <div className="text-xs text-gray-400">
            <strong className="text-white">Insight:</strong> US session shows most balanced sentiment with highest activity. Asia session most bullish.
          </div>
        </div>
      </div>
    </div>
  );
}
