import { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { HeatmapHeader } from '../components/heatmap/HeatmapHeader';
import { FilterPanel } from '../components/heatmap/FilterPanel';
import { HeatmapCanvas } from '../components/heatmap/HeatmapCanvas';
import { HeatmapLegend } from '../components/heatmap/HeatmapLegend';
import { AIInsightsPanel } from '../components/heatmap/AIInsightsPanel';

// Mock data
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.43', change: 4.32, changePercent: 2.52, volume: '82.5M', marketCap: '$2.75T', sector: 'Technology', hasAI: true },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$378.91', change: 8.12, changePercent: 2.19, volume: '21.3M', marketCap: '$2.81T', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$140.23', change: -2.45, changePercent: -1.72, volume: '18.7M', marketCap: '$1.76T', sector: 'Technology', hasAlert: true },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '$151.94', change: 3.21, changePercent: 2.16, volume: '45.2M', marketCap: '$1.57T', sector: 'Consumer' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '$238.72', change: -12.34, changePercent: -4.91, volume: '125.8M', marketCap: '$758B', sector: 'Consumer', hasAI: true, hasAlert: true },
  { symbol: 'META', name: 'Meta Platforms', price: '$326.50', change: 7.89, changePercent: 2.48, volume: '15.4M', marketCap: '$838B', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$495.22', change: 18.45, changePercent: 3.87, volume: '42.1M', marketCap: '$1.22T', sector: 'Technology', hasAI: true },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: '$147.82', change: 1.23, changePercent: 0.84, volume: '8.9M', marketCap: '$428B', sector: 'Finance' },
  { symbol: 'BAC', name: 'Bank of America', price: '$30.45', change: -0.67, changePercent: -2.15, volume: '42.3M', marketCap: '$238B', sector: 'Finance' },
  { symbol: 'WFC', name: 'Wells Fargo', price: '$42.18', change: 0.52, changePercent: 1.25, volume: '18.2M', marketCap: '$154B', sector: 'Finance' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: '$158.93', change: -1.23, changePercent: -0.77, volume: '6.5M', marketCap: '$382B', sector: 'Healthcare' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: '$524.67', change: 4.56, changePercent: 0.88, volume: '2.8M', marketCap: '$485B', sector: 'Healthcare' },
  { symbol: 'XOM', name: 'Exxon Mobil', price: '$102.34', change: -5.67, changePercent: -5.25, volume: '16.7M', marketCap: '$408B', sector: 'Energy' },
  { symbol: 'CVX', name: 'Chevron Corp.', price: '$142.89', change: -4.23, changePercent: -2.88, volume: '8.4M', marketCap: '$268B', sector: 'Energy' },
  { symbol: 'PG', name: 'Procter & Gamble', price: '$147.56', change: 0.89, changePercent: 0.61, volume: '5.2M', marketCap: '$348B', sector: 'Consumer' },
];

const mockCrypto = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$61,245', change: 1850, changePercent: 3.12, volume: '$32.5B', marketCap: '$1.21T', sector: 'Layer 1' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,245', change: -125, changePercent: -3.71, volume: '$15.8B', marketCap: '$390B', sector: 'Layer 1', hasAlert: true },
  { symbol: 'BNB', name: 'Binance Coin', price: '$312', change: 8, changePercent: 2.63, volume: '$1.2B', marketCap: '$48B', sector: 'Exchange' },
  { symbol: 'SOL', name: 'Solana', price: '$98', change: 12, changePercent: 13.95, volume: '$2.8B', marketCap: '$42B', sector: 'Layer 1', hasAI: true },
  { symbol: 'ADA', name: 'Cardano', price: '$0.48', change: -0.02, changePercent: -4.00, volume: '$450M', marketCap: '$17B', sector: 'Layer 1' },
  { symbol: 'DOGE', name: 'Dogecoin', price: '$0.082', change: 0.005, changePercent: 6.49, volume: '$850M', marketCap: '$12B', sector: 'Memes' },
];

const mockForex = [
  { symbol: 'EURUSD', name: 'Euro vs US Dollar', price: '1.09245', change: 0.00123, changePercent: 0.11, volume: '$250B', marketCap: '-', sector: 'Majors' },
  { symbol: 'GBPUSD', name: 'British Pound vs US Dollar', price: '1.27832', change: -0.00245, changePercent: -0.19, volume: '$180B', marketCap: '-', sector: 'Majors' },
  { symbol: 'USDJPY', name: 'US Dollar vs Japanese Yen', price: '149.234', change: 0.456, changePercent: 0.31, volume: '$220B', marketCap: '-', sector: 'Majors' },
  { symbol: 'AUDUSD', name: 'Australian Dollar vs US Dollar', price: '0.65432', change: 0.00234, changePercent: 0.36, volume: '$95B', marketCap: '-', sector: 'Majors' },
];

export function Heatmap() {
  const [marketType, setMarketType] = useState<'stocks' | 'crypto' | 'forex'>('stocks');
  const [timeframe, setTimeframe] = useState('1D');
  const [metric, setMetric] = useState('changePct');
  const [tileSizeBy, setTileSizeBy] = useState('marketCap');
  const [groupBy, setGroupBy] = useState('sector');
  const [viewMode, setViewMode] = useState<'treemap' | 'grid'>('grid');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Select data based on market type
  const assets = marketType === 'stocks' ? mockStocks : marketType === 'crypto' ? mockCrypto : mockForex;

  // Calculate summary stats
  const advancers = assets.filter((a) => a.changePercent > 0).length;
  const decliners = assets.filter((a) => a.changePercent < 0).length;
  const unchanged = assets.filter((a) => a.changePercent === 0).length;
  const avgChange = (assets.reduce((sum, a) => sum + a.changePercent, 0) / assets.length).toFixed(2);

  // Top movers
  const topGainers = [...assets].sort((a, b) => b.changePercent - a.changePercent).slice(0, 5);
  const topLosers = [...assets].sort((a, b) => a.changePercent - b.changePercent).slice(0, 5);
  const unusualVolume = [...assets].slice(0, 3);

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  const handleTileClick = (symbol: string) => {
    // Navigate to appropriate details page based on market type
    if (marketType === 'stocks') {
      handleNavigation('stock-details');
    } else if (marketType === 'crypto') {
      handleNavigation('crypto-details');
    } else {
      handleNavigation('forex-details');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Filter Panel */}
      <FilterPanel marketType={marketType} />

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
            <span className="text-white">Heatmap</span>
          </div>

          {/* Header */}
          <HeatmapHeader
            marketType={marketType}
            onMarketTypeChange={setMarketType}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            metric={metric}
            onMetricChange={setMetric}
            tileSizeBy={tileSizeBy}
            onTileSizeByChange={setTileSizeBy}
            groupBy={groupBy}
            onGroupByChange={setGroupBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Legend */}
          <HeatmapLegend
            metric={metric}
            timeframe={timeframe}
            advancers={advancers}
            decliners={decliners}
            unchanged={unchanged}
            avgChange={avgChange > 0 ? `+${avgChange}%` : `${avgChange}%`}
            totalMarketCap={marketType !== 'forex' ? '$8.5T' : undefined}
            totalVolume={marketType === 'stocks' ? '$425B' : '$85B'}
            marketStatus={
              marketType === 'stocks'
                ? 'US Markets: OPEN – 2 hrs left'
                : marketType === 'crypto'
                ? 'Crypto Market: 24/7 Live'
                : 'Forex: London Session · Open'
            }
            marketOpen={true}
            autoRefresh={autoRefresh}
            onRefreshToggle={() => setAutoRefresh(!autoRefresh)}
          />

          {/* Heatmap Canvas */}
          <HeatmapCanvas
            viewMode={viewMode}
            groupBy={groupBy}
            assets={assets}
            onTileClick={handleTileClick}
          />
        </div>
      </div>

      {/* AI Insights Panel */}
      <AIInsightsPanel
        topGainers={topGainers}
        topLosers={topLosers}
        unusualVolume={unusualVolume}
        onSymbolClick={handleTileClick}
      />
    </div>
  );
}
