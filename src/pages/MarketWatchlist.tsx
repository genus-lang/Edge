import { useState } from 'react';
import { ChevronRight, Home, Plus, RefreshCw, Settings, Search, Filter } from 'lucide-react';
import { WatchlistTabs } from '../components/watchlist/WatchlistTabs';
import { WatchlistTable, WatchlistSymbol } from '../components/watchlist/WatchlistTable';
import { AddSymbolModal } from '../components/watchlist/AddSymbolModal';
import { CreateWatchlistModal } from '../components/watchlist/CreateWatchlistModal';
import { SymbolDetailPanel } from '../components/watchlist/SymbolDetailPanel';

const mockWatchlists = [
  { id: '1', name: 'Default', symbolCount: 12, type: 'manual' as const },
  { id: '2', name: 'Intraday', symbolCount: 8, type: 'manual' as const },
  { id: '3', name: 'Long-term', symbolCount: 15, type: 'manual' as const },
  { id: '4', name: 'Crypto Only', symbolCount: 6, type: 'smart' as const },
];

const mockSymbols: WatchlistSymbol[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    assetType: 'Stock',
    price: '$185.21',
    change: '+2.35',
    changePercent: '+1.28%',
    positive: true,
    volume: '52.3M',
    dayHigh: '$187.45',
    dayLow: '$183.10',
    currentPriceInRange: 65,
    sparkline: [182, 183, 181, 184, 185, 186, 185.5, 185.21],
    signal: 'Bullish',
    signalSource: 'AI',
    hasAlert: true,
    alertTriggered: false,
    holdings: { quantity: 50, value: '$9,260.50' },
  },
  {
    id: '2',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    exchange: 'NASDAQ',
    assetType: 'Stock',
    price: '$142.65',
    change: '-1.15',
    changePercent: '-0.80%',
    positive: false,
    volume: '28.7M',
    dayHigh: '$144.20',
    dayLow: '$142.10',
    currentPriceInRange: 40,
    sparkline: [144, 143.5, 143, 142.5, 142.8, 142.3, 142.65],
    signal: 'Bearish',
    signalSource: 'Manual',
    hasAlert: false,
    alertTriggered: false,
  },
  {
    id: '3',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    assetType: 'Stock',
    price: '$378.91',
    change: '+5.42',
    changePercent: '+1.45%',
    positive: true,
    volume: '31.2M',
    dayHigh: '$380.50',
    dayLow: '$375.20',
    currentPriceInRange: 70,
    sparkline: [375, 376, 377, 378, 379, 378.5, 378.91],
    hasAlert: true,
    alertTriggered: true,
    holdings: { quantity: 20, value: '$7,578.20' },
  },
  {
    id: '4',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    exchange: 'NASDAQ',
    assetType: 'Stock',
    price: '$248.50',
    change: '+8.20',
    changePercent: '+3.41%',
    positive: true,
    volume: '145.6M',
    dayHigh: '$251.80',
    dayLow: '$242.30',
    currentPriceInRange: 85,
    sparkline: [242, 244, 246, 248, 250, 249, 248.5],
    signal: 'Overbought',
    signalSource: 'AI',
    hasAlert: true,
    alertTriggered: false,
  },
  {
    id: '5',
    symbol: 'BTCUSDT',
    name: 'Bitcoin',
    exchange: 'Binance',
    assetType: 'Crypto',
    price: '$44,125.50',
    change: '+1,245.80',
    changePercent: '+2.90%',
    positive: true,
    volume: '$28.5B',
    dayHigh: '$44,580.00',
    dayLow: '$42,850.00',
    currentPriceInRange: 74,
    sparkline: [43000, 43200, 43500, 43800, 44000, 44100, 44125],
    signal: 'Bullish',
    signalSource: 'AI',
    hasAlert: true,
    alertTriggered: false,
  },
  {
    id: '6',
    symbol: 'ETHUSDT',
    name: 'Ethereum',
    exchange: 'Binance',
    assetType: 'Crypto',
    price: '$2,345.80',
    change: '+65.30',
    changePercent: '+2.86%',
    positive: true,
    volume: '$14.2B',
    dayHigh: '$2,378.50',
    dayLow: '$2,280.00',
    currentPriceInRange: 67,
    sparkline: [2280, 2300, 2320, 2330, 2340, 2345, 2345.8],
    hasAlert: false,
    alertTriggered: false,
  },
  {
    id: '7',
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    exchange: 'NSE',
    assetType: 'Stock',
    price: '₹2,456.30',
    change: '+18.50',
    changePercent: '+0.76%',
    positive: true,
    volume: '8.2M',
    dayHigh: '₹2,465.00',
    dayLow: '₹2,442.00',
    currentPriceInRange: 62,
    sparkline: [2445, 2450, 2452, 2455, 2458, 2457, 2456],
    signal: 'Bullish',
    signalSource: 'Manual',
    hasAlert: true,
    alertTriggered: false,
    holdings: { quantity: 100, value: '₹2,45,630' },
  },
  {
    id: '8',
    symbol: 'NIFTY50',
    name: 'Nifty 50',
    exchange: 'NSE',
    assetType: 'Index',
    price: '23,220.35',
    change: '+150.20',
    changePercent: '+0.65%',
    positive: true,
    volume: '—',
    dayHigh: '23,285.50',
    dayLow: '23,150.00',
    currentPriceInRange: 52,
    sparkline: [23150, 23180, 23200, 23210, 23220, 23220],
    hasAlert: false,
    alertTriggered: false,
  },
];

export function MarketWatchlist() {
  const [activeWatchlistId, setActiveWatchlistId] = useState('1');
  const [watchlists, setWatchlists] = useState(mockWatchlists);
  const [symbols, setSymbols] = useState(mockSymbols);
  const [selectedSymbol, setSelectedSymbol] = useState<WatchlistSymbol | null>(null);
  const [showAddSymbolModal, setShowAddSymbolModal] = useState(false);
  const [showCreateWatchlistModal, setShowCreateWatchlistModal] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('None');

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId);

  const filteredSymbols = symbols.filter((symbol) =>
    symbol.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    symbol.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group symbols if needed
  const groupedSymbols = groupBy === 'None'
    ? { All: filteredSymbols }
    : filteredSymbols.reduce((acc, symbol) => {
        const key = groupBy === 'Asset Type' ? symbol.assetType : symbol.exchange;
        if (!acc[key]) acc[key] = [];
        acc[key].push(symbol);
        return acc;
      }, {} as Record<string, WatchlistSymbol[]>);

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
          <span className="text-white">Market Watchlist</span>
        </div>

        {/* Title & Actions */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Market Watchlist</h1>
            <p className="text-gray-400">
              Track your favorite symbols across stocks, crypto and forex. Manage multiple
              watchlists and set alerts.
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateWatchlistModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Watchlist
            </button>
            <button
              onClick={() => setShowAddSymbolModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add Symbol
            </button>
            <button className="p-2.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                autoRefresh
                  ? 'bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88]'
                  : 'bg-gray-800 border border-gray-700 text-gray-400'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${autoRefresh && 'bg-[#00FF88] animate-pulse'}`}
              />
              Auto-refresh
            </button>
          </div>
        </div>
      </div>

      {/* Watchlist Tabs */}
      <WatchlistTabs
        watchlists={watchlists}
        activeWatchlistId={activeWatchlistId}
        onWatchlistChange={setActiveWatchlistId}
        onCreateWatchlist={() => setShowCreateWatchlistModal(true)}
        onDeleteWatchlist={(id) => {
          setWatchlists(watchlists.filter((w) => w.id !== id));
          if (id === activeWatchlistId) {
            setActiveWatchlistId(watchlists[0]?.id || '');
          }
        }}
      />

      {/* Watchlist Metadata */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-500">
          {activeWatchlist?.symbolCount} symbols · Auto-refresh:{' '}
          <span className={autoRefresh ? 'text-[#00FF88]' : 'text-gray-600'}>
            {autoRefresh ? 'On' : 'Off'}
          </span>{' '}
          · Grouped by: {groupBy}
        </div>
        <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
          Watchlist Settings
        </button>
      </div>

      {/* Filters & Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search in this watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
          />
        </div>

        {/* Asset Type Filter */}
        <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50">
          <option>All Assets</option>
          <option>Stocks</option>
          <option>Crypto</option>
          <option>Forex</option>
          <option>Indices</option>
        </select>

        {/* Signal Filter */}
        <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50">
          <option>All Signals</option>
          <option>Bullish</option>
          <option>Bearish</option>
          <option>AI Signals Only</option>
        </select>

        {/* Group By */}
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
        >
          <option>None</option>
          <option>Asset Type</option>
          <option>Exchange</option>
        </select>
      </div>

      {/* Watchlist Table */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl overflow-hidden">
        {Object.entries(groupedSymbols).map(([groupName, groupSymbols]) => (
          <div key={groupName}>
            {groupBy !== 'None' && (
              <div className="px-6 py-3 bg-gray-800/50 border-b border-gray-800">
                <h3 className="text-sm font-semibold text-white">
                  {groupName} ({groupSymbols.length})
                </h3>
              </div>
            )}
            <WatchlistTable
              symbols={groupSymbols}
              onSymbolClick={setSelectedSymbol}
              onRemoveSymbol={(id) => setSymbols(symbols.filter((s) => s.id !== id))}
              onManageAlerts={(id) => console.log('Manage alerts for', id)}
              onOpenChart={(symbol) => console.log('Open chart for', symbol)}
              onOpenTrade={(symbol) => console.log('Open trade for', symbol)}
            />
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddSymbolModal
        isOpen={showAddSymbolModal}
        onClose={() => setShowAddSymbolModal(false)}
        onAddSymbols={(newSymbols) => {
          console.log('Adding symbols:', newSymbols);
          // In real app, add these to the watchlist
        }}
      />

      <CreateWatchlistModal
        isOpen={showCreateWatchlistModal}
        onClose={() => setShowCreateWatchlistModal(false)}
        onCreate={(data) => {
          const newWatchlist = {
            id: String(watchlists.length + 1),
            name: data.name,
            symbolCount: 0,
            type: data.type,
          };
          setWatchlists([...watchlists, newWatchlist]);
        }}
      />

      {/* Symbol Detail Panel */}
      <SymbolDetailPanel symbol={selectedSymbol} onClose={() => setSelectedSymbol(null)} />
    </div>
  );
}
