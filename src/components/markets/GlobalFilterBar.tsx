import { useState } from 'react';
import { Settings2, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

const marketSegments = ['All', 'Equities', 'Crypto', 'Forex', 'Indices'];
const regions = ['Global', 'US', 'Europe', 'Asia', 'India', 'Custom'];
const timeRanges = ['1D', '5D', '1M', '3M', '6M', '1Y', 'YTD'];
const currencies = ['USD', 'INR', 'EUR', 'GBP', 'JPY'];

interface GlobalFilterBarProps {
  onSegmentChange?: (segment: string) => void;
  onRegionChange?: (region: string) => void;
  onTimeRangeChange?: (timeRange: string) => void;
  onCurrencyChange?: (currency: string) => void;
  onRefresh?: () => void;
}

export function GlobalFilterBar({
  onSegmentChange,
  onRegionChange,
  onTimeRangeChange,
  onCurrencyChange,
  onRefresh,
}: GlobalFilterBarProps) {
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1D');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const handleSegmentChange = (segment: string) => {
    setSelectedSegment(segment);
    onSegmentChange?.(segment);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    onRegionChange?.(region);
  };

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
    onTimeRangeChange?.(timeRange);
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    onCurrencyChange?.(currency);
  };

  return (
    <div className="space-y-4">
      {/* Primary Segment Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-1 bg-gray-800/50 rounded-lg">
          {marketSegments.map((segment) => (
            <button
              key={segment}
              onClick={() => handleSegmentChange(segment)}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all',
                selectedSegment === segment
                  ? 'bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              )}
            >
              {segment}
            </button>
          ))}
        </div>

        {/* Auto Refresh Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              autoRefresh
                ? 'bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88]'
                : 'bg-gray-800 border border-gray-700 text-gray-400'
            )}
          >
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                autoRefresh && 'bg-[#00FF88] animate-pulse'
              )}
            />
            Auto-refresh: {autoRefresh ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {/* Secondary Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Region:</span>
          <select
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Pills */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Time:</span>
          <div className="flex items-center gap-1">
            {timeRanges.map((timeRange) => (
              <button
                key={timeRange}
                onClick={() => handleTimeRangeChange(timeRange)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-all',
                  selectedTimeRange === timeRange
                    ? 'bg-[#00FF88] text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                {timeRange}
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Currency:</span>
          <select
            value={selectedCurrency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Settings */}
        <button className="ml-auto p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
