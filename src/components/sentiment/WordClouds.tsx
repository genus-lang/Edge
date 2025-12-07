import { Cloud, TrendingUp, TrendingDown } from 'lucide-react';

interface WordCloudsProps {
  bullishKeywords: { word: string; count: number; size: number }[];
  bearishKeywords: { word: string; count: number; size: number }[];
  onWordClick?: (word: string) => void;
}

export function WordClouds({ bullishKeywords, bearishKeywords, onWordClick }: WordCloudsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bullish Word Cloud */}
      <div className="p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-sm font-semibold text-white">Bullish Keywords</h3>
        </div>

        <div className="h-48 flex flex-wrap items-center justify-center gap-3 p-4 bg-gray-900/30 rounded-lg">
          {bullishKeywords.map((keyword, idx) => (
            <button
              key={idx}
              onClick={() => onWordClick?.(keyword.word)}
              className="transition-all hover:scale-110 hover:text-white"
              style={{
                fontSize: `${keyword.size}px`,
                color: `rgba(0, 255, 136, ${0.5 + (keyword.size / 50)})`,
                fontWeight: 600,
              }}
              title={`${keyword.count} mentions`}
            >
              {keyword.word}
            </button>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Click any word to see related posts and news
        </div>
      </div>

      {/* Bearish Word Cloud */}
      <div className="p-6 bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl">
        <div className="flex items-center gap-2 mb-6">
          <TrendingDown className="w-5 h-5 text-red-400" />
          <h3 className="text-sm font-semibold text-white">Bearish Keywords</h3>
        </div>

        <div className="h-48 flex flex-wrap items-center justify-center gap-3 p-4 bg-gray-900/30 rounded-lg">
          {bearishKeywords.map((keyword, idx) => (
            <button
              key={idx}
              onClick={() => onWordClick?.(keyword.word)}
              className="transition-all hover:scale-110 hover:text-white"
              style={{
                fontSize: `${keyword.size}px`,
                color: `rgba(255, 68, 68, ${0.5 + (keyword.size / 50)})`,
                fontWeight: 600,
              }}
              title={`${keyword.count} mentions`}
            >
              {keyword.word}
            </button>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Click any word to see related posts and news
        </div>
      </div>
    </div>
  );
}
