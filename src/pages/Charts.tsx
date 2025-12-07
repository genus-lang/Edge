import { useState, useEffect } from 'react';
import { ChartToolbar } from '../components/charts/ChartToolbar';
import { DrawingToolsPanel } from '../components/charts/DrawingToolsPanel';
import { ChartCanvas } from '../components/charts/ChartCanvas';
import { ChartBottomPanel } from '../components/charts/ChartBottomPanel';
import { ChartFooter } from '../components/charts/ChartFooter';

export function Charts() {
  const [symbol, setSymbol] = useState('AAPL');
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');
  const [layout, setLayout] = useState(1);
  const [activeTool, setActiveTool] = useState('cursor');
  const [drawingsVisible, setDrawingsVisible] = useState(true);
  const [drawingsLocked, setDrawingsLocked] = useState(false);
  const [bottomPanelExpanded, setBottomPanelExpanded] = useState(true);
  const [indicatorsModalOpen, setIndicatorsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Check for URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const symbolParam = params.get('symbol');
    const intervalParam = params.get('interval');

    if (symbolParam) setSymbol(symbolParam);
    if (intervalParam) setTimeframe(intervalParam);
  }, []);

  const renderChartGrid = () => {
    const charts = Array(layout).fill(null);
    
    if (layout === 1) {
      return (
        <div className="flex-1">
          <ChartCanvas symbol={symbol} timeframe={timeframe} chartType={chartType} />
        </div>
      );
    }

    if (layout === 2) {
      return (
        <div className="flex-1 grid grid-cols-2 gap-px bg-gray-800">
          {charts.map((_, idx) => (
            <div key={idx} className="bg-[#0A0E13]">
              <ChartCanvas
                symbol={idx === 0 ? symbol : 'BTCUSDT'}
                timeframe={timeframe}
                chartType={chartType}
              />
            </div>
          ))}
        </div>
      );
    }

    if (layout === 4) {
      return (
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-px bg-gray-800">
          {charts.map((_, idx) => (
            <div key={idx} className="bg-[#0A0E13]">
              <ChartCanvas
                symbol={
                  idx === 0 ? symbol :
                  idx === 1 ? 'BTCUSDT' :
                  idx === 2 ? 'ETHUSDT' :
                  'TSLA'
                }
                timeframe={timeframe}
                chartType={chartType}
              />
            </div>
          ))}
        </div>
      );
    }

    if (layout === 6) {
      return (
        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-px bg-gray-800">
          {charts.map((_, idx) => (
            <div key={idx} className="bg-[#0A0E13]">
              <ChartCanvas
                symbol={
                  idx === 0 ? symbol :
                  idx === 1 ? 'BTCUSDT' :
                  idx === 2 ? 'ETHUSDT' :
                  idx === 3 ? 'TSLA' :
                  idx === 4 ? 'GOOGL' :
                  'MSFT'
                }
                timeframe={timeframe}
                chartType={chartType}
              />
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-screen flex flex-col bg-[#0A0E13]">
      {/* Top Toolbar */}
      <ChartToolbar
        symbol={symbol}
        onSymbolChange={setSymbol}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        chartType={chartType}
        onChartTypeChange={setChartType}
        layout={layout}
        onLayoutChange={setLayout}
        onOpenIndicators={() => setIndicatorsModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />

      {/* Main Chart Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Drawing Tools Panel - Hidden on mobile */}
        <div className="hidden md:block">
          <DrawingToolsPanel
            activeTool={activeTool}
            onToolChange={setActiveTool}
            drawingsVisible={drawingsVisible}
            onToggleDrawings={() => setDrawingsVisible(!drawingsVisible)}
            drawingsLocked={drawingsLocked}
            onToggleLock={() => setDrawingsLocked(!drawingsLocked)}
          />
        </div>

        {/* Chart Grid */}
        <div className="flex-1 flex flex-col">
          {renderChartGrid()}

          {/* Bottom Panel */}
          <ChartBottomPanel
            isExpanded={bottomPanelExpanded}
            onToggleExpanded={() => setBottomPanelExpanded(!bottomPanelExpanded)}
          />
        </div>
      </div>

      {/* Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <ChartFooter />
      </div>

      {/* Indicators Modal */}
      {indicatorsModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl max-h-[80vh] bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Add Indicators</h2>
              <button
                onClick={() => setIndicatorsModalOpen(false)}
                className="px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Trend Indicators */}
              <div className="col-span-full">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">TREND INDICATORS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['Moving Average (MA)', 'Exponential MA (EMA)', 'Bollinger Bands', 'Ichimoku Cloud', 'VWAP', 'Parabolic SAR'].map((indicator) => (
                    <button
                      key={indicator}
                      className="p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-left hover:border-[#00FF88]/50 hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-sm font-semibold text-white mb-1">{indicator}</div>
                      <div className="text-xs text-gray-500">Click to add</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Momentum Indicators */}
              <div className="col-span-full mt-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">MOMENTUM INDICATORS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['RSI', 'MACD', 'Stochastic', 'CCI', 'Williams %R', 'Momentum'].map((indicator) => (
                    <button
                      key={indicator}
                      className="p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-left hover:border-[#00C8FF]/50 hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-sm font-semibold text-white mb-1">{indicator}</div>
                      <div className="text-xs text-gray-500">Click to add</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volatility Indicators */}
              <div className="col-span-full mt-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">VOLATILITY INDICATORS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['ATR', 'Bollinger Bands Width', 'Keltner Channels', 'Donchian Channels'].map((indicator) => (
                    <button
                      key={indicator}
                      className="p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-left hover:border-purple-500/50 hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-sm font-semibold text-white mb-1">{indicator}</div>
                      <div className="text-xs text-gray-500">Click to add</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Indicators */}
              <div className="col-span-full mt-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">VOLUME INDICATORS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['Volume', 'OBV', 'Money Flow Index', 'Accumulation/Distribution'].map((indicator) => (
                    <button
                      key={indicator}
                      className="p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-left hover:border-yellow-500/50 hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-sm font-semibold text-white mb-1">{indicator}</div>
                      <div className="text-xs text-gray-500">Click to add</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Chart Settings</h2>
              <button
                onClick={() => setSettingsModalOpen(false)}
                className="px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Show Grid Lines</label>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Auto Scale</label>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Show Volume</label>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Candle Color Theme</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                  <option>Green / Red (Default)</option>
                  <option>Blue / Orange</option>
                  <option>Custom</option>
                </select>
              </div>

              <button className="w-full px-4 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity mt-4">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}