import { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ScreenerHeader } from '../components/screener/ScreenerHeader';
import { FilterPanel } from '../components/screener/FilterPanel';
import { ResultsTable } from '../components/screener/ResultsTable';
import { QuickStats } from '../components/screener/QuickStats';

// Mock data
const mockAssets = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.43', change: 4.32, changePercent: 2.52, volume: '82.5M', marketCap: '$2.75T', sector: 'Technology', rsi: 62, distance52w: '-8.5%' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$378.91', change: 8.12, changePercent: 2.19, volume: '21.3M', marketCap: '$2.81T', sector: 'Technology', rsi: 58, distance52w: '-5.2%' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$140.23', change: -2.45, changePercent: -1.72, volume: '18.7M', marketCap: '$1.76T', sector: 'Technology', rsi: 45, distance52w: '-12.3%' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$495.22', change: 18.45, changePercent: 3.87, volume: '42.1M', marketCap: '$1.22T', sector: 'Technology', rsi: 72, distance52w: '-2.1%' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: '$147.82', change: 1.23, changePercent: 0.84, volume: '8.9M', marketCap: '$428B', sector: 'Finance', rsi: 54, distance52w: '-6.8%' },
  { symbol: 'BAC', name: 'Bank of America', price: '$30.45', change: -0.67, changePercent: -2.15, volume: '42.3M', marketCap: '$238B', sector: 'Finance', rsi: 38, distance52w: '-15.4%' },
  { symbol: 'WFC', name: 'Wells Fargo', price: '$42.18', change: 0.52, changePercent: 1.25, volume: '18.2M', marketCap: '$154B', sector: 'Finance', rsi: 51, distance52w: '-9.2%' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: '$158.93', change: -1.23, changePercent: -0.77, volume: '6.5M', marketCap: '$382B', sector: 'Healthcare', rsi: 48, distance52w: '-7.6%' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: '$524.67', change: 4.56, changePercent: 0.88, volume: '2.8M', marketCap: '$485B', sector: 'Healthcare', rsi: 56, distance52w: '-4.3%' },
  { symbol: 'XOM', name: 'Exxon Mobil', price: '$102.34', change: -5.67, changePercent: -5.25, volume: '16.7M', marketCap: '$408B', sector: 'Energy', rsi: 28, distance52w: '-18.9%' },
];

const sectorDistribution = [
  { sector: 'Technology', count: 4, percentage: 40 },
  { sector: 'Finance', count: 3, percentage: 30 },
  { sector: 'Healthcare', count: 2, percentage: 20 },
  { sector: 'Energy', count: 1, percentage: 10 },
];

export function Screener() {
  const [screenerName, setScreenerName] = useState('New Screener');
  const [assetType, setAssetType] = useState<'stocks' | 'crypto' | 'forex'>('stocks');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  const handleSymbolClick = (symbol: string) => {
    handleNavigation('stock-details');
  };

  return (
    <div className="flex h-screen">
      {/* Filter Panel */}
      <FilterPanel assetType={assetType} />

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
            <span className="text-white">Screener</span>
          </div>

          {/* Header */}
          <ScreenerHeader
            screenerName={screenerName}
            onNameChange={setScreenerName}
            assetType={assetType}
            onAssetTypeChange={setAssetType}
            isFavorite={isFavorite}
            onFavoriteToggle={() => setIsFavorite(!isFavorite)}
            lastUpdated="2 mins ago"
            onReset={() => console.log('Reset filters')}
            onSave={() => console.log('Save screener')}
            onSaveAs={() => console.log('Save screener as')}
            onShare={() => console.log('Share screener')}
          />

          {/* Quick Stats */}
          <QuickStats
            totalResults={mockAssets.length}
            sectorDistribution={sectorDistribution}
            avgMetrics={{
              pe: '18.5',
              roe: '22.3%',
              changePercent: '+0.78%',
            }}
            aiInsight="Most symbols are currently above their 50 DMA and showing strong momentum. Technology sector is leading with 4 stocks, indicating sector rotation into tech."
          />

          {/* Results Table */}
          <ResultsTable assets={mockAssets} onSymbolClick={handleSymbolClick} />
        </div>
      </div>
    </div>
  );
}
