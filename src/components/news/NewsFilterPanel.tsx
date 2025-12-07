import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewsFilterPanelProps {
  onFiltersChange?: (filters: any) => void;
}

export function NewsFilterPanel({ onFiltersChange }: NewsFilterPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState({
    assetType: true,
    impact: true,
    sentiment: false,
    timeRange: false,
    region: false,
    source: false,
    category: false,
  });

  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([]);
  const [selectedImpact, setSelectedImpact] = useState<string[]>([]);
  const [selectedSentiment, setSelectedSentiment] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState('today');

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const assetTypes = ['Stocks', 'Crypto', 'Forex', 'Indices', 'Commodities'];
  const impactLevels = [
    { label: 'High impact', color: 'text-red-400' },
    { label: 'Medium impact', color: 'text-yellow-500' },
    { label: 'Low impact', color: 'text-gray-400' },
    { label: 'Unknown', color: 'text-gray-600' },
  ];
  const sentiments = ['Bullish', 'Bearish', 'Neutral'];
  const categories = ['Earnings', 'M&A', 'Regulation', 'Macro', 'Company Events', 'Upgrades/Downgrades', 'Dividends'];
  const sources = ['Reuters', 'Bloomberg', 'Coindesk', 'Company Filings', 'Official Exchange'];

  return (
    <div className="w-80 h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-r border-gray-800 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news by keyword, symbol..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF88]/50"
            />
          </div>
        </div>

        {/* Asset Type */}
        <div className="border border-gray-800 rounded-lg">
          <button
            onClick={() => toggleSection('assetType')}
            className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-sm font-semibold text-white">Asset Type</span>
            {openSections.assetType ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          {openSections.assetType && (
            <div className="p-3 space-y-1 border-t border-gray-800">
              {assetTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedAssetTypes.includes(type)}
                    onChange={() => {
                      setSelectedAssetTypes((prev) =>
                        prev.includes(type)
                          ? prev.filter((t) => t !== type)
                          : [...prev, type]
                      );
                    }}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                  />
                  <span className="text-xs text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Impact Level */}
        <div className="border border-gray-800 rounded-lg">
          <button
            onClick={() => toggleSection('impact')}
            className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-sm font-semibold text-white">Impact Level</span>
            {openSections.impact ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          {openSections.impact && (
            <div className="p-3 space-y-1 border-t border-gray-800">
              {impactLevels.map((level) => (
                <label
                  key={level.label}
                  className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedImpact.includes(level.label)}
                    onChange={() => {
                      setSelectedImpact((prev) =>
                        prev.includes(level.label)
                          ? prev.filter((i) => i !== level.label)
                          : [...prev, level.label]
                      );
                    }}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#00FF88] focus:ring-[#00FF88]/50"
                  />
                  <span className={cn('text-xs font-medium', level.color)}>{level.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sentiment Filter */}
        <div className="border border-gray-800 rounded-lg">
          <button
            onClick={() => toggleSection('sentiment')}
            className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-sm font-semibold text-white">Sentiment</span>
            {openSections.sentiment ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          {openSections.sentiment && (
            <div className="p-3 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {sentiments.map((sentiment) => (
                  <button
                    key={sentiment}
                    onClick={() => {
                      setSelectedSentiment((prev) =>
                        prev.includes(sentiment)
                          ? prev.filter((s) => s !== sentiment)
                          : [...prev, sentiment]
                      );
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                      selectedSentiment.includes(sentiment)
                        ? sentiment === 'Bullish'
                          ? 'bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88]'
                          : sentiment === 'Bearish'
                          ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                          : 'bg-gray-700/50 border border-gray-600 text-gray-300'
                        : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white'
                    )}
                  >
                    {sentiment}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Time Range */}
        <div className="border border-gray-800 rounded-lg">
          <button
            onClick={() => toggleSection('timeRange')}
            className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-sm font-semibold text-white">Time Range</span>
            {openSections.timeRange ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          {openSections.timeRange && (
            <div className="p-3 border-t border-gray-800">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
              >
                <option value="1hour">Last 1 hour</option>
                <option value="today">Today</option>
                <option value="3days">Last 3 days</option>
                <option value="7days">Last 7 days</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          )}
        </div>

        {/* Category / Topic */}
        <div className="border border-gray-800 rounded-lg">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-sm font-semibold text-white">Category</span>
            {openSections.category ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          {openSections.category && (
            <div className="p-3 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-400 hover:text-white hover:border-[#00FF88]/50 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Suggested Filters */}
        <div className="p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#00C8FF]" />
            <h3 className="text-sm font-semibold text-white">AI Suggested</h3>
          </div>
          <div className="space-y-2">
            {['High impact on my holdings', 'Crypto FUD spikes', 'Central bank policy updates'].map((suggestion) => (
              <button
                key={suggestion}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-xs text-gray-300 text-left hover:bg-gray-800 hover:border-[#00C8FF]/50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Apply / Reset */}
        <div className="flex gap-2 pt-4 border-t border-gray-800">
          <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Apply Filters
          </button>
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
