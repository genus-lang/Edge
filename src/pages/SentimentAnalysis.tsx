import { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { SentimentHeader } from '../components/sentiment/SentimentHeader';
import { SentimentSummary } from '../components/sentiment/SentimentSummary';
import { SentimentTrendChart } from '../components/sentiment/SentimentTrendChart';
import { SourceBreakdown } from '../components/sentiment/SourceBreakdown';
import { WordClouds } from '../components/sentiment/WordClouds';
import { AssetSentimentTable } from '../components/sentiment/AssetSentimentTable';
import { SentimentAIInsights } from '../components/sentiment/SentimentAIInsights';
import { AlertTriangle, Brain } from 'lucide-react';

// Mock data
const mockAssets = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    logo: '₿',
    sentimentScore: 78,
    sentimentChange: 12,
    mentions: 14230,
    newsPercent: 35,
    socialPercent: 65,
    priceChange: '+5.8%',
    alerts: [
      { type: 'High volatility', icon: AlertTriangle, color: 'yellow' },
    ],
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    logo: 'NV',
    sentimentScore: 85,
    sentimentChange: 8,
    mentions: 8940,
    newsPercent: 60,
    socialPercent: 40,
    priceChange: '+3.8%',
    alerts: [
      { type: 'AI anomaly', icon: Brain, color: 'purple' },
    ],
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logo: '',
    sentimentScore: 72,
    sentimentChange: 5,
    mentions: 12560,
    newsPercent: 55,
    socialPercent: 45,
    priceChange: '+1.2%',
    alerts: [],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    logo: 'T',
    sentimentScore: 42,
    sentimentChange: -25,
    mentions: 18320,
    newsPercent: 45,
    socialPercent: 55,
    priceChange: '-2.4%',
    alerts: [
      { type: 'High negative news', icon: AlertTriangle, color: 'red' },
      { type: 'AI anomaly', icon: Brain, color: 'purple' },
    ],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'Ξ',
    sentimentScore: 68,
    sentimentChange: 3,
    mentions: 9870,
    newsPercent: 30,
    socialPercent: 70,
    priceChange: '+2.1%',
    alerts: [],
  },
];

const mockSources = [
  { name: 'News', positive: 45, neutral: 35, negative: 20, totalMentions: 15420 },
  { name: 'Twitter/X', positive: 60, neutral: 25, negative: 15, totalMentions: 32180 },
  { name: 'Reddit', positive: 70, neutral: 20, negative: 10, totalMentions: 8940 },
  { name: 'Forums', positive: 55, neutral: 30, negative: 15, totalMentions: 4560 },
  { name: 'On-chain', positive: 65, neutral: 25, negative: 10, totalMentions: 2340 },
];

const bullishKeywords = [
  { word: 'breakout', count: 423, size: 28 },
  { word: 'uptrend', count: 385, size: 24 },
  { word: 'beat estimates', count: 312, size: 20 },
  { word: 'oversold', count: 298, size: 18 },
  { word: 'reversal', count: 267, size: 16 },
  { word: 'strong buy', count: 234, size: 22 },
  { word: 'momentum', count: 198, size: 14 },
  { word: 'bullish', count: 567, size: 32 },
  { word: 'rally', count: 445, size: 26 },
  { word: 'positive', count: 389, size: 24 },
];

const bearishKeywords = [
  { word: 'selloff', count: 398, size: 26 },
  { word: 'downgrade', count: 356, size: 24 },
  { word: 'lawsuit', count: 289, size: 18 },
  { word: 'crash', count: 267, size: 16 },
  { word: 'overbought', count: 245, size: 20 },
  { word: 'bearish', count: 512, size: 30 },
  { word: 'decline', count: 423, size: 26 },
  { word: 'risk', count: 378, size: 22 },
  { word: 'warning', count: 334, size: 20 },
  { word: 'correction', count: 298, size: 18 },
];

export function SentimentAnalysis() {
  const [marketType, setMarketType] = useState('All Markets');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('1W');
  const [sentimentSource, setSentimentSource] = useState('All Sources');
  const [viewMode, setViewMode] = useState<'overall' | 'by-source' | 'by-asset'>('overall');
  const [granularity, setGranularity] = useState<'hourly' | 'daily' | 'weekly'>('daily');
  const [normalizeScores, setNormalizeScores] = useState(false);

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full overflow-y-auto">
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
            <span className="text-white">Sentiment</span>
          </div>

          {/* Header & Filters */}
          <SentimentHeader
            marketType={marketType}
            onMarketTypeChange={setMarketType}
            selectedAssets={selectedAssets}
            onAssetsChange={setSelectedAssets}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            sentimentSource={sentimentSource}
            onSourceChange={setSentimentSource}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Content */}
            <div className="col-span-9 space-y-6">
              {/* Summary Gauges */}
              <SentimentSummary
                overallScore={67}
                scoreDelta={8}
                bullishPercent={62}
                bearishPercent={38}
                topAsset={{
                  symbol: 'BTC-USD',
                  mentions: 14230,
                  positivePercent: 58,
                }}
                newsVsSocial={{
                  news: 'Neutral',
                  social: 'Bullish',
                }}
                alertCount={7}
              />

              {/* Trend Chart */}
              <SentimentTrendChart
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                granularity={granularity}
                onGranularityChange={setGranularity}
                normalizeScores={normalizeScores}
                onNormalizeToggle={() => setNormalizeScores(!normalizeScores)}
              />

              {/* Source Breakdown */}
              <SourceBreakdown sources={mockSources} />

              {/* Word Clouds */}
              <WordClouds
                bullishKeywords={bullishKeywords}
                bearishKeywords={bearishKeywords}
                onWordClick={(word) => console.log('Clicked word:', word)}
              />

              {/* Asset Table */}
              <AssetSentimentTable
                assets={mockAssets}
                onAssetClick={(symbol) => console.log('Clicked asset:', symbol)}
              />
            </div>

            {/* Right Sidebar: AI Insights */}
            <div className="col-span-3">
              <SentimentAIInsights onRefresh={() => console.log('Refresh insights')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
