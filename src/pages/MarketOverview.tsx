import { ChevronRight, Home } from 'lucide-react';
import { GlobalFilterBar } from '../components/markets/GlobalFilterBar';
import { MarketStatusBanner } from '../components/markets/MarketStatusBanner';
import { MarketSummaryCards } from '../components/markets/MarketSummaryCards';
import { VolatilitySentimentPanel } from '../components/markets/VolatilitySentimentPanel';
import { MarketHeatmap } from '../components/markets/MarketHeatmap';
import { GainersLosersTables } from '../components/markets/GainersLosersTables';
import { MarketNewsPanel } from '../components/markets/MarketNewsPanel';
import { AIInsightsPanel } from '../components/markets/AIInsightsPanel';

export function MarketOverview() {
  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <button
            onClick={() => handleNavigation('dashboard')}
            className="hover:text-[#00FF88] transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>
          <ChevronRight className="w-4 h-4" />
          <span>Markets</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Market Overview</span>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Market Overview</h1>
            <p className="text-gray-400">
              Live snapshot of global markets across indices, equities, crypto, and forex
            </p>
          </div>
        </div>
      </div>

      {/* Global Filter Bar */}
      <GlobalFilterBar
        onSegmentChange={(segment) => console.log('Segment:', segment)}
        onRegionChange={(region) => console.log('Region:', region)}
        onTimeRangeChange={(timeRange) => console.log('Time Range:', timeRange)}
        onCurrencyChange={(currency) => console.log('Currency:', currency)}
        onRefresh={() => console.log('Refreshing data...')}
      />

      {/* Market Status Banner */}
      <MarketStatusBanner />

      {/* Market Summary Cards */}
      <MarketSummaryCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Heatmap */}
          <MarketHeatmap />

          {/* Gainers/Losers/Most Active Tables */}
          <GainersLosersTables />
        </div>

        {/* Right Column - Takes 1/3 width */}
        <div className="lg:col-span-1 space-y-6">
          {/* Volatility & Sentiment */}
          <VolatilitySentimentPanel />

          {/* Market News */}
          <MarketNewsPanel />

          {/* AI Insights */}
          <AIInsightsPanel />
        </div>
      </div>
    </div>
  );
}
