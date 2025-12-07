import { Grid3x3, LayoutGrid, Download, Save } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HeatmapHeaderProps {
  marketType: 'stocks' | 'crypto' | 'forex';
  onMarketTypeChange: (type: 'stocks' | 'crypto' | 'forex') => void;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  metric: string;
  onMetricChange: (metric: string) => void;
  tileSizeBy: string;
  onTileSizeByChange: (size: string) => void;
  groupBy: string;
  onGroupByChange: (group: string) => void;
  viewMode: 'treemap' | 'grid';
  onViewModeChange: (mode: 'treemap' | 'grid') => void;
}

export function HeatmapHeader({
  marketType,
  onMarketTypeChange,
  timeframe,
  onTimeframeChange,
  metric,
  onMetricChange,
  tileSizeBy,
  onTileSizeByChange,
  groupBy,
  onGroupByChange,
  viewMode,
  onViewModeChange,
}: HeatmapHeaderProps) {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'YTD'];

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Market Heatmap</h1>
        <p className="text-sm text-gray-400">
          Visual overview of markets by performance, volume and volatility
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Market Type Tabs */}
        <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
          {(['stocks', 'crypto', 'forex'] as const).map((type) => (
            <button
              key={type}
              onClick={() => onMarketTypeChange(type)}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all capitalize',
                marketType === type
                  ? 'bg-[#00FF88] text-black'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-all',
                timeframe === tf
                  ? 'bg-[#00C8FF] text-black'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Metric Selector */}
        <select
          value={metric}
          onChange={(e) => onMetricChange(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-[#00FF88]/50"
        >
          <option value="changePct">% Price Change</option>
          <option value="changeAbs">Absolute Price Change</option>
          <option value="volume">Volume vs Average</option>
          <option value="volatility">Volatility (σ)</option>
          <option value="range">Intraday Range</option>
          <option value="sentiment">Sentiment Score</option>
        </select>

        {/* Tile Size By */}
        <select
          value={tileSizeBy}
          onChange={(e) => onTileSizeByChange(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-[#00FF88]/50"
        >
          <option value="marketCap">Size: Market Cap</option>
          <option value="volume">Size: Volume</option>
          <option value="equal">Size: Equal Weight</option>
        </select>

        {/* Group By */}
        <select
          value={groupBy}
          onChange={(e) => onGroupByChange(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-[#00FF88]/50"
        >
          <option value="sector">Group: Sector</option>
          <option value="industry">Group: Industry</option>
          <option value="country">Group: Country</option>
          <option value="exchange">Group: Exchange</option>
          <option value="watchlist">Group: Watchlist</option>
        </select>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
          <button
            onClick={() => onViewModeChange('treemap')}
            className={cn(
              'p-2 rounded-md transition-all',
              viewMode === 'treemap'
                ? 'bg-[#00FF88] text-black'
                : 'text-gray-400 hover:text-white'
            )}
            title="Treemap View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'p-2 rounded-md transition-all',
              viewMode === 'grid'
                ? 'bg-[#00FF88] text-black'
                : 'text-gray-400 hover:text-white'
            )}
            title="Grid View"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-medium hover:bg-gray-700 transition-colors">
          <Save className="w-4 h-4" />
          Save View
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-medium hover:bg-gray-700 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  );
}
