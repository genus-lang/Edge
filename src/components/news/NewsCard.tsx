import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Star, Bell, Share2, EyeOff, ChevronDown, ChevronUp, LineChart, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewsCardProps {
  news: {
    id: string;
    headline: string;
    source: string;
    sourceIcon: string;
    time: string;
    readingTime: string;
    sentiment: 'Bullish' | 'Bearish' | 'Neutral';
    impact: 'High' | 'Medium' | 'Low';
    symbols: string[];
    priceChange?: string;
    summary: string;
    aiSummary: string[];
    isRead: boolean;
  };
  onSymbolClick?: (symbol: string) => void;
  onOpenDetail?: (id: string) => void;
}

export function NewsCard({ news, onSymbolClick, onOpenDetail }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getSentimentIcon = () => {
    switch (news.sentiment) {
      case 'Bullish':
        return <TrendingUp className="w-3.5 h-3.5" />;
      case 'Bearish':
        return <TrendingDown className="w-3.5 h-3.5" />;
      default:
        return <Minus className="w-3.5 h-3.5" />;
    }
  };

  const getSentimentColor = () => {
    switch (news.sentiment) {
      case 'Bullish':
        return 'bg-[#00FF88]/10 border-[#00FF88]/30 text-[#00FF88]';
      case 'Bearish':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      default:
        return 'bg-gray-700/50 border-gray-600 text-gray-400';
    }
  };

  const getImpactColor = () => {
    switch (news.impact) {
      case 'High':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'Medium':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500';
      default:
        return 'bg-gray-700/50 border-gray-600 text-gray-400';
    }
  };

  return (
    <div
      className={cn(
        'p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl hover:border-gray-700 transition-all',
        !news.isRead && 'border-l-4 border-l-[#00C8FF]'
      )}
    >
      <div className="flex gap-4">
        {/* Source Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-400">{news.sourceIcon}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Headline */}
          <button
            onClick={() => onOpenDetail?.(news.id)}
            className="text-left w-full"
          >
            <h3
              className={cn(
                'text-base text-white hover:text-[#00FF88] transition-colors mb-2',
                !news.isRead && 'font-bold'
              )}
            >
              {news.headline}
              {!news.isRead && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-[#00C8FF]" />}
            </h3>
          </button>

          {/* Meta Row */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <span>{news.time}</span>
            <span>•</span>
            <span>{news.source}</span>
            <span>•</span>
            <span>{news.readingTime}</span>
          </div>

          {/* Tags & Badges */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {/* Sentiment Badge */}
            <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-xs font-semibold', getSentimentColor())}>
              {getSentimentIcon()}
              {news.sentiment}
            </div>

            {/* Impact Badge */}
            <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-xs font-semibold', getImpactColor())}>
              {news.impact} impact
            </div>

            {/* Symbol Tags */}
            {news.symbols.map((symbol) => (
              <button
                key={symbol}
                onClick={() => onSymbolClick?.(symbol)}
                className="px-2.5 py-1 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 hover:border-[#00FF88]/50 hover:text-[#00FF88] transition-colors"
              >
                {symbol}
              </button>
            ))}

            {/* Price Change */}
            {news.priceChange && (
              <div
                className={cn(
                  'px-2.5 py-1 bg-gray-800 border border-gray-700 rounded-lg text-xs font-semibold',
                  news.priceChange.startsWith('+') ? 'text-[#00FF88]' : 'text-red-400'
                )}
              >
                {news.priceChange}
              </div>
            )}
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
              {/* Summary */}
              <p className="text-sm text-gray-400 leading-relaxed">{news.summary}</p>

              {/* AI Summary */}
              <div className="p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
                <h4 className="text-xs font-semibold text-white mb-3">AI Summary</h4>
                <ul className="space-y-2">
                  {news.aiSummary.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onOpenDetail?.(news.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#00FF88] text-black rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Full Article
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                  <LineChart className="w-4 h-4" />
                  View Chart Reaction
                </button>
                <button className="px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                  More like this
                </button>
              </div>
            </div>
          )}

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 flex items-center gap-2 text-xs text-gray-500 hover:text-[#00C8FF] transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show more
              </>
            )}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={cn(
              'p-2 rounded-lg transition-colors',
              isSaved
                ? 'bg-yellow-500/10 text-yellow-500'
                : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50'
            )}
            title="Save"
          >
            <Star className={cn('w-4 h-4', isSaved && 'fill-current')} />
          </button>
          <button
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-[#00C8FF] hover:border-[#00C8FF]/50 transition-colors"
            title="Alert on similar news"
          >
            <Bell className="w-4 h-4" />
          </button>
          <button
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/50 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-red-400 hover:border-red-400/50 transition-colors"
            title="Mute source"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
