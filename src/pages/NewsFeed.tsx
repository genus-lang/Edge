import { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { NewsHeader } from '../components/news/NewsHeader';
import { NewsFilterPanel } from '../components/news/NewsFilterPanel';
import { NewsList } from '../components/news/NewsList';
import { NewsAIInsights } from '../components/news/NewsAIInsights';

// Mock data
const mockNews = [
  {
    id: '1',
    headline: 'NVIDIA Announces Next-Generation AI Chip with 50% Performance Boost',
    source: 'Reuters',
    sourceIcon: 'R',
    time: '5 min ago',
    readingTime: '3 min read',
    sentiment: 'Bullish' as const,
    impact: 'High' as const,
    symbols: ['NVDA', 'NASDAQ', 'Tech'],
    priceChange: '+3.8%',
    summary: 'NVIDIA Corporation unveiled its next-generation AI processor, promising a 50% performance improvement over current models. The announcement came during the company\'s annual technology summit, where CEO Jensen Huang detailed the new architecture\'s capabilities for large language models and autonomous systems.',
    aiSummary: [
      'New chip offers 50% performance boost for AI workloads',
      'Expected to launch in Q2 2026 with competitive pricing',
      'Major cloud providers already committed to deployment',
      'Stock rallied 3.8% in after-hours trading on the announcement',
    ],
    isRead: false,
  },
  {
    id: '2',
    headline: 'Federal Reserve Signals Potential Rate Cut in Next Quarter Amid Inflation Slowdown',
    source: 'Bloomberg',
    sourceIcon: 'B',
    time: '1 hour ago',
    readingTime: '4 min read',
    sentiment: 'Neutral' as const,
    impact: 'High' as const,
    symbols: ['SPY', 'QQQ', 'Indices'],
    priceChange: '+1.2%',
    summary: 'Federal Reserve officials indicated a potential shift in monetary policy, suggesting interest rates may be cut in the coming quarter as inflation continues to moderate. The statement followed the latest FOMC meeting and prompted a positive response across equity markets.',
    aiSummary: [
      'Fed suggests rate cuts possible in Q2 if inflation continues to decline',
      'Current inflation at 3.1%, down from 3.4% previous month',
      'Market pricing in 70% chance of 25bp cut by June',
      'Tech and growth stocks rallied on dovish commentary',
    ],
    isRead: false,
  },
  {
    id: '3',
    headline: 'Bitcoin Surges Past $68,000 as Institutional Adoption Accelerates',
    source: 'Coindesk',
    sourceIcon: 'C',
    time: '2 hours ago',
    readingTime: '2 min read',
    sentiment: 'Bullish' as const,
    impact: 'High' as const,
    symbols: ['BTC', 'ETH', 'Crypto'],
    priceChange: '+8.5%',
    summary: 'Bitcoin broke through the $68,000 resistance level following announcements from three major financial institutions launching bitcoin custody and trading services. The move higher was accompanied by record ETF inflows.',
    aiSummary: [
      'BTC reached $68,400, highest level since November 2021',
      'Bitcoin ETFs saw $2.1B in net inflows this week',
      'Three major banks announced institutional crypto services',
      'On-chain metrics show strong accumulation by long-term holders',
    ],
    isRead: true,
  },
  {
    id: '4',
    headline: 'Tesla Reports Strong Q4 Deliveries Despite Production Challenges',
    source: 'Reuters',
    sourceIcon: 'R',
    time: '3 hours ago',
    readingTime: '3 min read',
    sentiment: 'Bullish' as const,
    impact: 'Medium' as const,
    symbols: ['TSLA', 'EV'],
    priceChange: '+2.4%',
    summary: 'Tesla Inc. reported fourth-quarter vehicle deliveries that exceeded analyst expectations, delivering 495,000 vehicles despite ongoing supply chain constraints and factory upgrades.',
    aiSummary: [
      'Q4 deliveries reached 495,000 units, beating estimates of 485,000',
      'Model Y remains best-selling EV globally',
      'New Gigafactory in Mexico on track for 2026 production',
      'Full-year deliveries grew 38% year-over-year',
    ],
    isRead: true,
  },
  {
    id: '5',
    headline: 'Oil Prices Fall 4% as OPEC+ Considers Production Increase',
    source: 'Bloomberg',
    sourceIcon: 'B',
    time: '4 hours ago',
    readingTime: '2 min read',
    sentiment: 'Bearish' as const,
    impact: 'Medium' as const,
    symbols: ['XOM', 'CVX', 'Energy'],
    priceChange: '-4.2%',
    summary: 'Crude oil prices dropped sharply after reports emerged that OPEC+ is considering increasing production quotas at its upcoming meeting. WTI crude fell to $76.50 per barrel.',
    aiSummary: [
      'WTI crude down 4.2% to $76.50/barrel, Brent at $81.20',
      'OPEC+ meeting scheduled for next week may adjust quotas',
      'Demand concerns from China economic slowdown weighing on prices',
      'Energy sector stocks underperforming broader market',
    ],
    isRead: true,
  },
];

export function NewsFeed() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'list' | 'compact' | 'card'>('list');

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Filter Panel */}
      <NewsFilterPanel />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button
              onClick={() => handleNavigation('dashboard')}
              className="hover:text-[#00FF88] transition-colors"
            >
              <Home className="w-4 h-4" />
            </button>
            <ChevronRight className="w-4 h-4" />
            <span>Markets</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">News Feed</span>
          </div>

          {/* Header */}
          <NewsHeader activeTab={activeTab} onTabChange={setActiveTab} />

          {/* News List */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <NewsList
                news={mockNews}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onRefresh={() => console.log('Refresh news')}
                onSymbolClick={(symbol) => console.log('Symbol clicked:', symbol)}
                onOpenDetail={(id) => console.log('Open detail:', id)}
              />
            </div>

            {/* AI Insights Sidebar */}
            <div className="col-span-4">
              <NewsAIInsights onFilterPreset={(preset) => console.log('Preset:', preset)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
