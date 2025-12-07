import { BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SentimentTrendChartProps {
  viewMode: 'overall' | 'by-source' | 'by-asset';
  onViewModeChange: (mode: 'overall' | 'by-source' | 'by-asset') => void;
  granularity: 'hourly' | 'daily' | 'weekly';
  onGranularityChange: (granularity: 'hourly' | 'daily' | 'weekly') => void;
  normalizeScores: boolean;
  onNormalizeToggle: () => void;
}

export function SentimentTrendChart({
  viewMode,
  onViewModeChange,
  granularity,
  onGranularityChange,
  normalizeScores,
  onNormalizeToggle,
}: SentimentTrendChartProps) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Sentiment Over Time</h3>

        <div className="flex items-center gap-4">
          {/* View Mode */}
          <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
            {(['overall', 'by-source', 'by-asset'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize',
                  viewMode === mode
                    ? 'bg-[#00C8FF] text-black'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {mode.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Granularity */}
          <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
            {(['hourly', 'daily', 'weekly'] as const).map((gran) => (
              <button
                key={gran}
                onClick={() => onGranularityChange(gran)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize',
                  granularity === gran
                    ? 'bg-[#00FF88] text-black'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {gran}
              </button>
            ))}
          </div>

          {/* Normalize Toggle */}
          <button
            onClick={onNormalizeToggle}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              normalizeScores
                ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
                : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white'
            )}
          >
            Normalize
          </button>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-80 flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-600 mb-3 mx-auto" />
          <div className="text-sm text-white font-semibold mb-1">
            Sentiment Trend Line Chart
          </div>
          <div className="text-xs text-gray-500 mb-4">
            Multiple assets with annotations for key events
          </div>
          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
              <span className="text-gray-400">Bullish Zone (60-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-400">Neutral Zone (40-60)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-400">Bearish Zone (0-40)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#00C8FF]" />
          <span className="text-gray-400">Overall Sentiment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#00FF88]" />
          <span className="text-gray-400">AAPL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-purple-400" />
          <span className="text-gray-400">TSLA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-4 border-l-2 border-dashed border-gray-600" />
          <span className="text-gray-400">Key Events</span>
        </div>
      </div>
    </div>
  );
}
