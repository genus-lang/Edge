import { useState } from 'react';
import { cn } from '../../lib/utils';

const heatmapModes = ['Sector', 'Index', 'Watchlist'];
const heatmapMetrics = ['% Change', 'Volume', 'Market Cap'];

interface HeatmapTile {
  symbol: string;
  name: string;
  sector: string;
  price: string;
  change: number;
  volume: string;
  marketCap: number;
}

const heatmapData: HeatmapTile[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', price: '₹2,456', change: 2.3, volume: '45L', marketCap: 16500 },
  { symbol: 'TCS', name: 'Tata Consultancy', sector: 'IT', price: '₹3,678', change: 1.8, volume: '32L', marketCap: 13400 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', price: '₹1,567', change: -0.5, volume: '28L', marketCap: 11200 },
  { symbol: 'INFY', name: 'Infosys', sector: 'IT', price: '₹1,489', change: 1.2, volume: '25L', marketCap: 6200 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG', price: '₹2,234', change: 0.8, volume: '18L', marketCap: 5300 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', price: '₹978', change: -1.2, volume: '35L', marketCap: 6800 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', price: '₹1,123', change: 3.5, volume: '22L', marketCap: 6500 },
  { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG', price: '₹445', change: -0.3, volume: '40L', marketCap: 5500 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra', sector: 'Banking', price: '₹1,756', change: 0.6, volume: '15L', marketCap: 3500 },
  { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Infrastructure', price: '₹3,234', change: 2.1, volume: '12L', marketCap: 4500 },
  { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', price: '₹1,034', change: -0.8, volume: '30L', marketCap: 3200 },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', price: '₹678', change: 1.5, volume: '50L', marketCap: 6000 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', sector: 'Auto', price: '₹856', change: 4.2, volume: '38L', marketCap: 3100 },
  { symbol: 'WIPRO', name: 'Wipro Ltd', sector: 'IT', price: '₹456', change: 0.9, volume: '20L', marketCap: 2500 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', sector: 'Auto', price: '₹10,234', change: 1.7, volume: '8L', marketCap: 3100 },
  { symbol: 'ADANIPORTS', name: 'Adani Ports', sector: 'Infrastructure', price: '₹1,234', change: -2.1, volume: '25L', marketCap: 2800 },
];

function getChangeColor(change: number): string {
  if (change > 2) return 'bg-[#00FF88] text-black';
  if (change > 1) return 'bg-[#00FF88]/70 text-black';
  if (change > 0) return 'bg-[#00FF88]/40 text-white';
  if (change > -1) return 'bg-red-500/40 text-white';
  if (change > -2) return 'bg-red-500/70 text-white';
  return 'bg-red-500 text-white';
}

function getTileSize(marketCap: number): string {
  if (marketCap > 10000) return 'col-span-2 row-span-2';
  if (marketCap > 5000) return 'col-span-2';
  return '';
}

export function MarketHeatmap() {
  const [selectedMode, setSelectedMode] = useState('Sector');
  const [selectedMetric, setSelectedMetric] = useState('% Change');

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Market Heatmap</h3>
          <p className="text-sm text-gray-500 mt-1">Visual snapshot of market performance</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Selector */}
          <div className="flex items-center gap-1 p-1 bg-gray-800/50 rounded-lg">
            {heatmapModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  selectedMode === mode
                    ? 'bg-[#00FF88] text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Metric Selector */}
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
          >
            {heatmapMetrics.map((metric) => (
              <option key={metric} value={metric}>
                {metric}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
        {heatmapData.map((tile) => (
          <div
            key={tile.symbol}
            className={cn(
              'group relative p-3 rounded-lg transition-all cursor-pointer overflow-hidden',
              getTileSize(tile.marketCap),
              getChangeColor(tile.change),
              'hover:ring-2 hover:ring-[#00FF88] hover:scale-105'
            )}
          >
            {/* Tile Content */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold truncate">{tile.symbol}</div>
                <div className="text-[10px] opacity-70 truncate">{tile.sector}</div>
              </div>
              <div className="text-sm font-bold mt-2">{tile.change > 0 ? '+' : ''}{tile.change}%</div>
            </div>

            {/* Tooltip on Hover */}
            <div className="absolute inset-0 bg-gray-900/95 opacity-0 group-hover:opacity-100 transition-opacity z-20 p-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-white mb-1">{tile.symbol}</div>
                <div className="text-[10px] text-gray-400 mb-2">{tile.name}</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white font-medium">{tile.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Change:</span>
                    <span className={cn(
                      'font-medium',
                      tile.change > 0 ? 'text-[#00FF88]' : 'text-red-400'
                    )}>
                      {tile.change > 0 ? '+' : ''}{tile.change}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume:</span>
                    <span className="text-white font-medium">{tile.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sector:</span>
                    <span className="text-white font-medium">{tile.sector}</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[#00FF88] font-medium">Click for details →</div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-gray-400">&lt; -2%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500/40" />
          <span className="text-gray-400">-1% to 0%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#00FF88]/40" />
          <span className="text-gray-400">0% to +1%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#00FF88]" />
          <span className="text-gray-400">&gt; +2%</span>
        </div>
      </div>
    </div>
  );
}