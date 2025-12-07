import { useState } from 'react';
import { RotateCcw, Copy, TrendingUp, Target, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

interface IndicatorInspectorProps {
  indicatorId: string | null;
  onParamChange: (param: string, value: any) => void;
  onReset: () => void;
  onClone: () => void;
}

export function IndicatorInspector({
  indicatorId,
  onParamChange,
  onReset,
  onClone,
}: IndicatorInspectorProps) {
  const [activeTab, setActiveTab] = useState('parameters');
  const [liveUpdate, setLiveUpdate] = useState(true);

  // Mock indicator data
  const indicator = {
    name: 'RSI',
    fullName: 'Relative Strength Index',
    description: 'Momentum oscillator measuring overbought/oversold conditions on a scale of 0-100',
  };

  if (!indicatorId) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center">
        <div>
          <Activity className="w-12 h-12 text-gray-700 mb-3 mx-auto" />
          <div className="text-sm text-white font-semibold mb-2">No Indicator Selected</div>
          <div className="text-xs text-gray-500">
            Select an indicator from the active stack to configure parameters
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-l border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white">{indicator.name}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title="Reset to defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClone}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title="Clone configuration"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-sm text-white font-semibold mb-2">{indicator.fullName}</div>
        <div className="text-xs text-gray-400 leading-relaxed">{indicator.description}</div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 px-4 pt-4 border-b border-gray-800 pb-0">
        {['parameters', 'performance', 'signals', 'correlation'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-3 py-2 rounded-t-lg text-sm font-medium transition-all capitalize',
              activeTab === tab
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'parameters' && (
          <div className="space-y-6">
            {/* Period */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Period</label>
              <input
                type="range"
                min="2"
                max="50"
                defaultValue="14"
                onChange={(e) => onParamChange('period', e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00FF88]"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">2</span>
                <input
                  type="number"
                  defaultValue="14"
                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-center text-sm text-white"
                />
                <span className="text-xs text-gray-500">50</span>
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Source</label>
              <select
                onChange={(e) => onParamChange('source', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              >
                <option>Close</option>
                <option>Open</option>
                <option>High</option>
                <option>Low</option>
                <option value="HL2">HL2 (High+Low) / 2</option>
                <option value="HLC3">HLC3 (High+Low+Close) / 3</option>
                <option value="OHLC4">OHLC4 (Open+High+Low+Close) / 4</option>
              </select>
            </div>

            {/* Overbought Level */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Overbought Level</label>
              <input
                type="range"
                min="60"
                max="90"
                defaultValue="70"
                onChange={(e) => onParamChange('overbought', e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">60</span>
                <input
                  type="number"
                  defaultValue="70"
                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-center text-sm text-white"
                />
                <span className="text-xs text-gray-500">90</span>
              </div>
            </div>

            {/* Oversold Level */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Oversold Level</label>
              <input
                type="range"
                min="10"
                max="40"
                defaultValue="30"
                onChange={(e) => onParamChange('oversold', e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00FF88]"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">10</span>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-center text-sm text-white"
                />
                <span className="text-xs text-gray-500">40</span>
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Line Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  defaultValue="#9333EA"
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#9333EA"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono"
                />
              </div>
            </div>

            {/* Line Style */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Line Style</label>
              <div className="flex items-center gap-2">
                {['solid', 'dashed', 'dotted'].map((style) => (
                  <button
                    key={style}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white hover:bg-gray-700 transition-colors capitalize"
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Thickness */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Line Thickness</label>
              <input
                type="range"
                min="1"
                max="5"
                defaultValue="2"
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C8FF]"
              />
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Thin</span>
                <span>Thick</span>
              </div>
            </div>

            {/* Placement */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Placement</label>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white hover:bg-gray-700 transition-colors">
                  Main Chart
                </button>
                <button className="flex-1 px-3 py-2 bg-[#00C8FF] border border-[#00C8FF] rounded-lg text-sm text-black font-semibold">
                  Separate Panel
                </button>
              </div>
            </div>

            {/* Live Update Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <span className="text-sm text-white">Live Update</span>
              <button
                onClick={() => setLiveUpdate(!liveUpdate)}
                className={cn(
                  'relative w-12 h-6 rounded-full transition-colors',
                  liveUpdate ? 'bg-[#00FF88]' : 'bg-gray-700'
                )}
              >
                <div
                  className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                    liveUpdate ? 'right-1' : 'left-1'
                  )}
                />
              </button>
            </div>

            {/* Apply Button */}
            {!liveUpdate && (
              <button className="w-full px-4 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Apply Changes
              </button>
            )}
          </div>
        )}

        {activeTab === 'performance' && <PerformanceTab />}
        {activeTab === 'signals' && <SignalsTab />}
        {activeTab === 'correlation' && <CorrelationTab />}
      </div>
    </div>
  );
}

function PerformanceTab() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Signal Strategy: RSI &lt; 30 (Buy) / &gt; 70 (Sell)</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Win Rate</div>
            <div className="text-2xl font-bold text-[#00FF88]">64.2%</div>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Avg Return</div>
            <div className="text-2xl font-bold text-[#00C8FF]">+2.8%</div>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Max Drawdown</div>
            <div className="text-2xl font-bold text-red-400">-8.4%</div>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Signals</div>
            <div className="text-2xl font-bold text-white">47</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
        <div className="text-xs text-gray-500 mb-3">P&L Curve (if followed signals)</div>
        <div className="h-32 flex items-end gap-1">
          {[5, 8, 6, 12, 15, 13, 18, 22, 20, 25, 28, 26, 30].map((value, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-[#00FF88] to-[#00C8FF] rounded-t"
              style={{ height: `${value * 3}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalsTab() {
  const signals = [
    { date: 'Dec 1, 2025', type: 'Buy', price: 174.20, outcome: '+3.2%', color: 'green' },
    { date: 'Dec 3, 2025', type: 'Sell', price: 179.80, outcome: '+1.8%', color: 'green' },
    { date: 'Dec 5, 2025', type: 'Buy', price: 176.50, outcome: '-1.2%', color: 'red' },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-white">Recent Signals</h4>
      {signals.map((signal, idx) => (
        <div key={idx} className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">{signal.date}</span>
            <span
              className={cn(
                'px-2 py-0.5 rounded text-xs font-semibold',
                signal.type === 'Buy'
                  ? 'bg-[#00FF88]/10 text-[#00FF88]'
                  : 'bg-red-500/10 text-red-400'
              )}
            >
              {signal.type}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">${signal.price}</span>
            <span
              className={cn(
                'text-sm font-semibold',
                signal.color === 'green' ? 'text-[#00FF88]' : 'text-red-400'
              )}
            >
              {signal.outcome}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CorrelationTab() {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-white mb-3">Correlation Analysis</h4>
      
      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">RSI vs Price</span>
          <span className="text-sm font-bold text-[#00C8FF]">-0.62</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full w-[62%] bg-[#00C8FF]" />
        </div>
      </div>

      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">RSI vs Volume</span>
          <span className="text-sm font-bold text-purple-400">0.34</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full w-[34%] bg-purple-500" />
        </div>
      </div>

      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">RSI vs MACD</span>
          <span className="text-sm font-bold text-[#00FF88]">0.78</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-[#00FF88]" />
        </div>
      </div>
    </div>
  );
}