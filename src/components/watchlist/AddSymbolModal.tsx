import { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchResult {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  assetType: 'Stock' | 'Crypto' | 'Forex' | 'Index';
  price: string;
  selected: boolean;
}

const mockSearchResults: SearchResult[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', assetType: 'Stock', price: '$185.21', selected: false },
  { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', assetType: 'Stock', price: '$142.65', selected: false },
  { id: '3', symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', assetType: 'Stock', price: '$378.91', selected: false },
  { id: '4', symbol: 'BTCUSDT', name: 'Bitcoin', exchange: 'Binance', assetType: 'Crypto', price: '$44,125.50', selected: false },
  { id: '5', symbol: 'ETHUSDT', name: 'Ethereum', exchange: 'Binance', assetType: 'Crypto', price: '$2,345.80', selected: false },
  { id: '6', symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', assetType: 'Stock', price: '$248.50', selected: false },
];

interface AddSymbolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSymbols: (symbols: SearchResult[]) => void;
}

export function AddSymbolModal({ isOpen, onClose, onAddSymbols }: AddSymbolModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('All');
  const [selectedAssetClass, setSelectedAssetClass] = useState('All');
  const [results, setResults] = useState<SearchResult[]>(mockSearchResults);

  if (!isOpen) return null;

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMarket = selectedMarket === 'All' || result.exchange === selectedMarket;
    const matchesAsset = selectedAssetClass === 'All' || result.assetType === selectedAssetClass;
    return matchesSearch && matchesMarket && matchesAsset;
  });

  const toggleSelection = (id: string) => {
    setResults(results.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r)));
  };

  const handleAddSelected = () => {
    const selected = results.filter((r) => r.selected);
    if (selected.length > 0) {
      onAddSymbols(selected);
      onClose();
      setResults(mockSearchResults); // Reset
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-gray-900 border-l border-gray-800 shadow-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Add Symbols</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search symbols (e.g., AAPL, Apple Inc.)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
              autoFocus
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
            >
              <option value="All">All Markets</option>
              <option value="NASDAQ">NASDAQ</option>
              <option value="NYSE">NYSE</option>
              <option value="NSE">NSE</option>
              <option value="Binance">Binance</option>
            </select>

            <select
              value={selectedAssetClass}
              onChange={(e) => setSelectedAssetClass(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
            >
              <option value="All">All Assets</option>
              <option value="Stock">Stocks</option>
              <option value="Crypto">Crypto</option>
              <option value="Forex">Forex</option>
              <option value="Index">Indices</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No symbols found matching your search</p>
              </div>
            ) : (
              filteredResults.map((result) => (
                <div
                  key={result.id}
                  className={cn(
                    'p-4 bg-gray-800/30 border rounded-lg transition-all cursor-pointer',
                    result.selected
                      ? 'border-[#00FF88] bg-[#00FF88]/5'
                      : 'border-gray-700 hover:border-gray-600'
                  )}
                  onClick={() => toggleSelection(result.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={result.selected}
                        onChange={() => toggleSelection(result.id)}
                        className="rounded border-gray-700 bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-sm font-bold text-gray-300">
                        {result.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{result.symbol}</span>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-400">
                            {result.assetType}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {result.name} · {result.exchange}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">{result.price}</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelection(result.id);
                        }}
                        className={cn(
                          'mt-1 p-1 rounded-lg transition-colors',
                          result.selected
                            ? 'bg-[#00FF88] text-black'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        )}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {results.filter((r) => r.selected).length} symbols selected
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSelected}
                disabled={results.filter((r) => r.selected).length === 0}
                className="px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
