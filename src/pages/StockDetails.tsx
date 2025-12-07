import { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { SymbolHeader } from '../components/stocks/SymbolHeader';
import { PriceStatsStrip } from '../components/stocks/PriceStatsStrip';
import { AdvancedChart } from '../components/stocks/AdvancedChart';
import { TradingPanel } from '../components/stocks/TradingPanel';
import { FundamentalsTab } from '../components/stocks/FundamentalsTab';
import { NewsTab } from '../components/stocks/NewsTab';
import { AnalystRatingsTab } from '../components/stocks/AnalystRatingsTab';
import { AIPredictionsTab } from '../components/stocks/AIPredictionsTab';
import { cn } from '../lib/utils';

export function StockDetails() {
  const [activeTab, setActiveTab] = useState('fundamentals');

  // Mock data
  const symbol = 'AAPL';
  const name = 'Apple Inc.';
  const exchange = 'NASDAQ';
  const sector = 'Technology';
  const industry = 'Consumer Electronics';
  const marketStatus: 'Open' | 'Closed' = 'Open';

  const priceStats = {
    currentPrice: '$185.21',
    change: '+2.35',
    changePercent: '+1.28%',
    positive: true,
    dayHigh: '$187.45',
    dayLow: '$183.10',
    open: '$184.50',
    previousClose: '$182.86',
    volume: '52.3M',
    avgVolume: '58.2M',
    marketCap: '$2.85T',
    weekHigh52: '$198.23',
    weekLow52: '$124.17',
    beta: '1.24',
    lastUpdated: '2s ago',
  };

  const fundamentalsData = {
    description:
      'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and Wearables, Home and Accessories. It also provides AppleCare support services; cloud services; and operates various platforms, including the App Store, Apple Music, Apple TV+, and more.',
    website: 'https://www.apple.com',
    employees: '161,000',
    founded: '1976',
    headquarters: 'Cupertino, California',
    peRatio: '29.5',
    pegRatio: '2.1',
    eps: '$6.13',
    dividendYield: '0.52%',
    roe: '147.4%',
    roa: '27.8%',
    debtToEquity: '1.97',
    bookValue: '$4.21',
    profitMargin: '25.3%',
    operatingMargin: '30.1%',
  };

  const tabs = [
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'news', label: 'News' },
    { id: 'ratings', label: 'Analyst Ratings' },
    { id: 'ai', label: 'AI Predictions' },
  ];

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          onClick={() => handleNavigation('dashboard')}
          className="hover:text-[#00FF88] transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
        <ChevronRight className="w-4 h-4" />
        <button
          onClick={() => handleNavigation('market-overview')}
          className="hover:text-[#00FF88] transition-colors"
        >
          Markets
        </button>
        <ChevronRight className="w-4 h-4" />
        <span>Stocks</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{symbol}</span>
      </div>

      {/* Symbol Header */}
      <SymbolHeader
        symbol={symbol}
        name={name}
        exchange={exchange}
        country="US"
        sector={sector}
        industry={industry}
        marketStatus={marketStatus}
        isInWatchlist={false}
        onWatchlistToggle={() => console.log('Watchlist toggled')}
        onSectorClick={() => console.log('Sector clicked:', sector)}
        onIndustryClick={() => console.log('Industry clicked:', industry)}
      />

      {/* Price & Stats Strip */}
      <PriceStatsStrip stats={priceStats} isLive={true} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chart (2/3) */}
        <div className="lg:col-span-2">
          <AdvancedChart symbol={symbol} />
        </div>

        {/* Right: Trading Panel (1/3) */}
        <div className="lg:col-span-1">
          <TradingPanel
            symbol={symbol}
            currentPrice={priceStats.currentPrice}
            marketStatus={marketStatus}
            onPlaceOrder={(order) => console.log('Order placed:', order)}
          />
        </div>
      </div>

      {/* Tabbed Content */}
      <div>
        {/* Tab Navigation */}
        <div className="border-b border-gray-800 mb-6">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-6 py-3 border-b-2 font-medium transition-all',
                  activeTab === tab.id
                    ? 'border-[#00FF88] text-[#00FF88]'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'fundamentals' && (
            <FundamentalsTab symbol={symbol} name={name} data={fundamentalsData} />
          )}
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'ratings' && <AnalystRatingsTab />}
          {activeTab === 'ai' && <AIPredictionsTab />}
        </div>
      </div>
    </div>
  );
}
