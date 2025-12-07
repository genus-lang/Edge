import { Activity, Grid, TrendingUp, Maximize2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LabChartViewProps {
  chartType: string;
  onChartTypeChange: (type: string) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  logScale: boolean;
  onToggleLogScale: () => void;
  layoutMode: number;
  onLayoutModeChange: (mode: number) => void;
}

export function LabChartView({
  chartType,
  onChartTypeChange,
  showGrid,
  onToggleGrid,
  logScale,
  onToggleLogScale,
  layoutMode,
  onLayoutModeChange,
}: LabChartViewProps) {
  const chartTypes = ['Candles', 'OHLC', 'Line', 'Heikin Ashi'];
  const layoutModes = [1, 2, 4];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900/50 to-gray-800/30">
      {/* Chart Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-4">
          {/* Chart Type */}
          <select
            value={chartType}
            onChange={(e) => onChartTypeChange(e.target.value)}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
          >
            {chartTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Grid Toggle */}
          <button
            onClick={onToggleGrid}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
              showGrid
                ? 'bg-[#00C8FF]/10 text-[#00C8FF] border border-[#00C8FF]/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            )}
          >
            <Grid className="w-4 h-4" />
            Grid
          </button>

          {/* Log Scale */}
          <button
            onClick={onToggleLogScale}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              logScale
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            )}
          >
            Log Scale
          </button>
        </div>

        {/* Layout Mode */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">LAYOUT:</span>
          <div className="flex items-center gap-1">
            {layoutModes.map((mode) => (
              <button
                key={mode}
                onClick={() => onLayoutModeChange(mode)}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all',
                  layoutMode === mode
                    ? 'bg-[#00FF88] text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 relative bg-[#0A0E13]">
        {layoutMode === 1 ? (
          <SingleChartView />
        ) : layoutMode === 2 ? (
          <DoubleChartView />
        ) : (
          <QuadChartView />
        )}
      </div>
    </div>
  );
}

function SingleChartView() {
  return (
    <div className="h-full p-4">
      {/* Price Chart */}
      <div className="h-2/3 bg-gray-900/30 border border-gray-800 rounded-lg mb-2 relative">
        <div className="absolute top-4 left-4 z-10">
          <div className="text-xl font-bold text-white mb-1">AAPL · 1D</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white">$178.45</span>
            <span className="text-[#00FF88] font-semibold">+$2.34 (+1.33%)</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
            <span>O: 176.20</span>
            <span>H: 179.85</span>
            <span>L: 175.40</span>
            <span>C: 178.45</span>
            <span>Vol: 45.2M</span>
          </div>
        </div>

        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-12 h-12 text-gray-700 mb-2 mx-auto" />
            <div className="text-sm text-gray-600">Main Price Chart with Overlays</div>
          </div>
        </div>
      </div>

      {/* Indicator Panels */}
      <div className="h-1/3 grid grid-cols-2 gap-2">
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-semibold text-purple-400 mb-2">RSI (14)</div>
          <div className="h-full flex items-center justify-center">
            <div className="text-xs text-gray-600">RSI Panel: 58.4</div>
          </div>
        </div>
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-semibold text-blue-400 mb-2">MACD (12, 26, 9)</div>
          <div className="h-full flex items-center justify-center">
            <div className="text-xs text-gray-600">MACD Panel</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DoubleChartView() {
  return (
    <div className="h-full grid grid-rows-2 gap-px bg-gray-800">
      <div className="bg-[#0A0E13] p-4">
        <div className="h-full bg-gray-900/30 border border-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm text-white font-semibold mb-2">Baseline Settings</div>
            <div className="text-xs text-gray-600">RSI(14) with current parameters</div>
          </div>
        </div>
      </div>
      <div className="bg-[#0A0E13] p-4">
        <div className="h-full bg-gray-900/30 border border-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm text-white font-semibold mb-2">Alternate Settings</div>
            <div className="text-xs text-gray-600">RSI(21) for comparison</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuadChartView() {
  return (
    <div className="h-full grid grid-cols-2 grid-rows-2 gap-px bg-gray-800">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-[#0A0E13] p-4">
          <div className="h-full bg-gray-900/30 border border-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-white font-semibold mb-2">Chart {i}</div>
              <div className="text-xs text-gray-600">Different timeframe or setting</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
