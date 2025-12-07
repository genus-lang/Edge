import { ExternalLink, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewsItem {
  id: string;
  source: string;
  headline: string;
  timeAgo: string;
  tag: 'Earnings' | 'Upgrade' | 'Macro' | 'Regulatory' | 'Breaking';
  category: 'Equities' | 'Crypto' | 'Forex' | 'Macro';
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    source: 'Reuters',
    headline: 'Fed signals potential rate hold as inflation remains sticky',
    timeAgo: '12 min ago',
    tag: 'Macro',
    category: 'Macro',
  },
  {
    id: '2',
    source: 'Bloomberg',
    headline: 'Reliance Industries beats Q3 earnings estimates, stock surges',
    timeAgo: '25 min ago',
    tag: 'Earnings',
    category: 'Equities',
  },
  {
    id: '3',
    source: 'Economic Times',
    headline: 'SEBI proposes new regulations for algo trading platforms',
    timeAgo: '45 min ago',
    tag: 'Regulatory',
    category: 'Equities',
  },
  {
    id: '4',
    source: 'CoinDesk',
    headline: 'Bitcoin breaks $45K resistance as institutional buying increases',
    timeAgo: '1 hour ago',
    tag: 'Breaking',
    category: 'Crypto',
  },
  {
    id: '5',
    source: 'CNBC',
    headline: 'Morgan Stanley upgrades Indian IT stocks to overweight',
    timeAgo: '2 hours ago',
    tag: 'Upgrade',
    category: 'Equities',
  },
  {
    id: '6',
    source: 'Forex Live',
    headline: 'EUR/USD reaches 3-month high on weak dollar sentiment',
    timeAgo: '2 hours ago',
    tag: 'Macro',
    category: 'Forex',
  },
];

const tagColors = {
  Earnings: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Upgrade: 'bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30',
  Macro: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  Regulatory: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  Breaking: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export function MarketNewsPanel() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Market News</h3>
          <p className="text-sm text-gray-500 mt-1">Latest updates</p>
        </div>
        <button className="text-sm text-[#00FF88] hover:text-[#00FF88]/80 font-medium">
          View All
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto">
        {['All', 'Equities', 'Crypto', 'Forex', 'Macro'].map((filter) => (
          <button
            key={filter}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
              filter === 'All'
                ? 'bg-[#00FF88] text-black'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* News Items */}
      <div className="space-y-3">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="group p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-all cursor-pointer"
          >
            {/* Source and Tag */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">{item.source}</span>
              <span
                className={cn(
                  'px-2 py-0.5 text-xs rounded-full font-medium border',
                  tagColors[item.tag]
                )}
              >
                {item.tag}
              </span>
            </div>

            {/* Headline */}
            <h4 className="text-sm font-medium text-white mb-2 group-hover:text-[#00FF88] transition-colors line-clamp-2">
              {item.headline}
            </h4>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>{item.timeAgo}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#00FF88] transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-4 py-2.5 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 hover:border-[#00FF88]/30 transition-all">
        View all market news →
      </button>
    </div>
  );
}
