import { ExternalLink, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewsItem {
  id: string;
  source: string;
  sourceLogo?: string;
  headline: string;
  summary: string;
  time: string;
  tags: ('Earnings' | 'Regulation' | 'Upgrade' | 'Downgrade' | 'Macro' | 'Press Release')[];
  impact?: 'High' | 'Medium' | 'Low';
  url: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    source: 'Bloomberg',
    headline: 'Apple Announces Record Q4 Earnings, Beats Analyst Expectations',
    summary: 'Apple Inc. reported quarterly earnings of $1.46 per share, surpassing analyst estimates of $1.39. Revenue grew 8% year-over-year to $89.5 billion.',
    time: '2 hours ago',
    tags: ['Earnings'],
    impact: 'High',
    url: '#',
  },
  {
    id: '2',
    source: 'Reuters',
    headline: 'Morgan Stanley Upgrades Apple to Overweight, Raises Price Target to $200',
    summary: 'Analyst Katy Huberty cited strong iPhone 15 demand and growth in Services segment as key drivers for the upgrade.',
    time: '5 hours ago',
    tags: ['Upgrade'],
    impact: 'High',
    url: '#',
  },
  {
    id: '3',
    source: 'CNBC',
    headline: 'Apple Vision Pro Pre-Orders Exceed Expectations in First Week',
    summary: 'Early demand for Apple\'s mixed reality headset suggests strong consumer interest, with pre-orders reaching 180,000 units.',
    time: '8 hours ago',
    tags: ['Press Release'],
    impact: 'Medium',
    url: '#',
  },
  {
    id: '4',
    source: 'Wall Street Journal',
    headline: 'EU Investigating Apple\'s App Store Practices Under Digital Markets Act',
    summary: 'European regulators are examining whether Apple\'s app distribution policies violate new competition rules.',
    time: '1 day ago',
    tags: ['Regulation'],
    impact: 'Medium',
    url: '#',
  },
  {
    id: '5',
    source: 'Financial Times',
    headline: 'Apple Expands Manufacturing Operations in India, Aims for 25% of Production',
    summary: 'The tech giant is diversifying supply chain away from China, with new partnerships with Tata Group and Foxconn.',
    time: '2 days ago',
    tags: ['Macro', 'Press Release'],
    impact: 'Low',
    url: '#',
  },
];

const tagColors = {
  Earnings: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Regulation: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  Upgrade: 'bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30',
  Downgrade: 'bg-red-500/10 text-red-400 border-red-500/30',
  Macro: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  'Press Release': 'bg-gray-700 text-gray-400 border-gray-600',
};

const impactColors = {
  High: 'text-[#00FF88] border-[#00FF88]',
  Medium: 'text-yellow-500 border-yellow-500',
  Low: 'text-gray-500 border-gray-600',
};

export function NewsTab() {
  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-500">Filter:</span>
        {['All', 'Company', 'Analyst', 'Macro', 'Press Releases'].map((filter) => (
          <button
            key={filter}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
              filter === 'All'
                ? 'bg-[#00FF88] text-black'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-3">
        {mockNews.map((news) => (
          <a
            key={news.id}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl hover:border-[#00FF88]/30 transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                  {news.source.substring(0, 2)}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">{news.source}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{news.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {news.impact && (
                  <span
                    className={cn(
                      'px-2 py-0.5 text-xs font-medium rounded border',
                      impactColors[news.impact]
                    )}
                  >
                    {news.impact} Impact
                  </span>
                )}
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-[#00FF88] transition-colors" />
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#00FF88] transition-colors">
              {news.headline}
            </h3>

            {/* Summary */}
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{news.summary}</p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'px-2 py-0.5 text-xs font-medium rounded border',
                    tagColors[tag]
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full py-3 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors">
        Load More News
      </button>
    </div>
  );
}
