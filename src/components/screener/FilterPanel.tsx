import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FilterPanelProps {
  assetType: 'stocks' | 'crypto' | 'forex';
  onFiltersChange?: (filters: any) => void;
}

export function FilterPanel({ assetType, onFiltersChange }: FilterPanelProps) {
  const [filterCount, setFilterCount] = useState(5);
  const [autoApply, setAutoApply] = useState(true);
  const [openSections, setOpenSections] = useState({
    universe: true,
    technical: true,
    fundamental: false,
    performance: false,
    custom: false,
    ai: false,
  });

  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [volumeRange, setVolumeRange] = useState({ min: '', max: '' });
  const [rsiValue, setRsiValue] = useState(50);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sectors = ['Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer', 'Industrials'];
  const cryptoSectors = ['DeFi', 'Layer 1', 'Layer 2', 'Memes', 'NFT', 'Stablecoins'];

  return (
    <div className="w-80 h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-r border-gray-800 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#00FF88]" />
            <h3 className="text-lg font-semibold text-white">Filters</h3>
            <span className="px-2 py-0.5 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full text-xs font-semibold text-[#00FF88]">
              {filterCount}
            </span>
          </div>
          <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            Clear All
          </button>
        </div>

        {/* Applied Filters Chips */}
        <div className="flex flex-wrap gap-2">
          {['Price > 100', 'Volume > 1M', 'RSI < 30', 'Sector: Tech', 'Market Cap > 10B'].map((filter, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300"
            >
              <span>{filter}</span>
              <button className="text-gray-500 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Auto-Apply Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <span className="text-sm text-white">Auto-apply filters</span>
          <button
            onClick={() => setAutoApply(!autoApply)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors',
              autoApply ? 'bg-[#00FF88]/10 text-[#00FF88]' : 'bg-gray-700 text-gray-400'
            )}
          >
            {autoApply ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
            <span className="text-xs font-semibold">{autoApply ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* (i) Universe / Basics */}
        <div className="border border-gray-800 rounded-lg">
          <button
            onClick={() => toggleSection('universe')}
            className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Universe & Basics</span>
              <span className="px-2 py-0.5 bg-[#00FF88]/10 rounded-full text-xs text-[#00FF88]">3</span>
            </div>
            {openSections.universe ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>

          {openSections.universe && (
            <div className="p-3 space-y-3 border-t border-gray-800">
              {/* Exchange */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Exchange</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50">
                  <option>All Exchanges</option>
                  {assetType === 'stocks' && (
                    <>
                      <option>NSE</option>
                      <option>BSE</option>
                      <option>NYSE</option>
                      <option>NASDAQ</option>
                    </>
                  )}
                  {assetType === 'crypto' && (
                    <>
                      <option>Binance</option>
                      <option>Coinbase</option>
                      <option>Kraken</option>
                    </>
                  )}
                </select>
              </div>

              {/* Sector */}
              {assetType !== 'forex' && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    {assetType === 'stocks' ? 'Sector' : 'Category'}
                  </label>
                  <div className="space-y-1">
                    {(assetType === 'stocks' ? sectors : cryptoSectors).map((sector) => (
                      <label
                        key={sector}
                        className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSectors.includes(sector)}
                          onChange={() => {
                            setSelectedSectors((prev) =>
                              prev.includes(sector)
                                ? prev.filter((s) => s !== sector)
                                : [...prev, sector]
                            );
                          }}
                          className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                        />
                        <span className="text-xs text-gray-300">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    placeholder="Min"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
                  />
                  <span className="text-gray-600">-</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    placeholder="Max"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
                  />
                </div>
              </div>

              {/* Volume Range */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Volume Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={volumeRange.min}
                    onChange={(e) => setVolumeRange({ ...volumeRange, min: e.target.value })}
                    placeholder="Min (e.g. 1M)"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* (ii) Technical Filters */}
        <div className="border border-gray-800 rounded-lg">
          <button
            onClick={() => toggleSection('technical')}
            className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Technical Filters</span>
              <span className="px-2 py-0.5 bg-[#00FF88]/10 rounded-full text-xs text-[#00FF88]">2</span>
            </div>
            {openSections.technical ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>

          {openSections.technical && (
            <div className="p-3 space-y-3 border-t border-gray-800">
              {/* RSI */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  RSI (14): {rsiValue}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rsiValue}
                  onChange={(e) => setRsiValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00FF88]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Oversold (&lt;30)</span>
                  <span>Overbought (&gt;70)</span>
                </div>
              </div>

              {/* MACD */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">MACD Signal</label>
                <div className="flex gap-2">
                  {['Bullish', 'Bearish', 'Neutral'].map((signal) => (
                    <button
                      key={signal}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 hover:border-[#00FF88]/50 transition-colors"
                    >
                      {signal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Moving Averages */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Moving Averages</label>
                <div className="space-y-1">
                  {['Price above 50 DMA', 'Price above 200 DMA', '50 DMA above 200 DMA'].map((ma) => (
                    <label
                      key={ma}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                      />
                      <span className="text-xs text-gray-300">{ma}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* (vi) AI Suggested Filters */}
        <div className="border border-gray-800 rounded-lg">
          <button
            onClick={() => toggleSection('ai')}
            className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 hover:from-purple-900/30 hover:to-blue-900/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00C8FF]" />
              <span className="text-sm font-semibold text-white">AI Filter Suggestions</span>
            </div>
            {openSections.ai ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>

          {openSections.ai && (
            <div className="p-3 space-y-3 border-t border-gray-800">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe what you want to find... e.g., 'Show me undervalued large caps with high ROE and low debt'"
                className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00C8FF]/50 resize-none"
              />
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                <Sparkles className="w-4 h-4" />
                Generate Filters
              </button>
            </div>
          )}
        </div>

        {/* Apply Button (if auto-apply is off) */}
        {!autoApply && (
          <button className="w-full py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Apply Filters
          </button>
        )}
      </div>
    </div>
  );
}