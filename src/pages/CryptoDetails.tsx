import { useState } from 'react';
import { ChevronRight, Home, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { CryptoHeader } from '../components/crypto/CryptoHeader';
import { CryptoStatsCards } from '../components/crypto/CryptoStatsCards';
import { AdvancedChart } from '../components/stocks/AdvancedChart';
import { OrderBookPanel } from '../components/crypto/OrderBookPanel';
import { RecentTradesPanel } from '../components/crypto/RecentTradesPanel';
import { OnChainMetrics } from '../components/crypto/OnChainMetrics';
import { SentimentPanel } from '../components/crypto/SentimentPanel';
import { ExchangesList } from '../components/crypto/ExchangesList';
import { TokenomicsTab } from '../components/crypto/TokenomicsTab';
import { NewsTab } from '../components/stocks/NewsTab';
import { TradingPanel } from '../components/stocks/TradingPanel';

export function CryptoDetails() {
  const [activeTab, setActiveTab] = useState('on-chain');

  // Mock data
  const symbol = 'BTC';
  const name = 'Bitcoin';
  const pair = 'USDT';
  const rank = 1;
  const categories = ['Store of Value', 'Layer 1', 'PoW'];

  const cryptoData = {
    currentPrice: '$61,245.50',
    change24h: '+1,850.30',
    changePercent: '+3.12%',
    positive: true,
    marketCap: '$1.21T',
    volume24h: '$32.5B',
    circulatingSupply: '19.5M BTC',
    localPrice: '₹51,02,345',
  };

  const tabs = [
    { id: 'on-chain', label: 'On-Chain Metrics' },
    { id: 'news', label: 'News' },
    { id: 'tokenomics', label: 'Tokenomics' },
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
        <span>Crypto</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{symbol}</span>
      </div>

      {/* Header */}
      <CryptoHeader
        symbol={symbol}
        name={name}
        pair={pair}
        rank={rank}
        categories={categories}
        {...cryptoData}
        isInWatchlist={false}
        onWatchlistToggle={() => console.log('Watchlist toggled')}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chart (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <AdvancedChart symbol={`${symbol}${pair}`} />

          {/* Order Book & Recent Trades */}
          <div className="grid grid-cols-2 gap-6">
            <OrderBookPanel />
            <RecentTradesPanel />
          </div>
        </div>

        {/* Right Column: Stats & Trading (1/3) */}
        <div className="space-y-6">
          {/* Key Stats */}
          <CryptoStatsCards />

          {/* Trading Panel */}
          <TradingPanel
            symbol={symbol}
            currentPrice={cryptoData.currentPrice}
            marketStatus="Open"
            onPlaceOrder={(order) => console.log('Order placed:', order)}
          />

          {/* Risk Warning */}
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-red-400 mb-1">High Volatility</div>
                <div className="text-gray-400 text-xs">
                  Cryptocurrency markets are highly volatile. Only invest what you can afford to lose.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment & Social */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Exchange Availability</h3>
            <ExchangesList />
          </div>
        </div>
        <div>
          <SentimentPanel />
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
          {activeTab === 'on-chain' && <OnChainMetrics />}
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'tokenomics' && <TokenomicsTab />}
        </div>
      </div>

      {/* Additional Warnings */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <div className="text-sm font-semibold text-yellow-500">No Audit Found</div>
          </div>
          <div className="text-xs text-gray-400">
            No third-party security audit available for this protocol
          </div>
        </div>

        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <div className="text-sm font-semibold text-orange-500">High Concentration</div>
          </div>
          <div className="text-xs text-gray-400">
            Top 10 wallets hold 5.2% of total supply
          </div>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-700 rounded-xl">
          <button className="text-sm font-medium text-[#00C8FF] hover:text-[#00C8FF]/80 transition-colors">
            View Full Risk Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}
