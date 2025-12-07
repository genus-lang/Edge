import { useState } from 'react';

export function InterestRatesPanel() {
  const [view, setView] = useState<'policy' | 'yields'>('policy');

  // Mock data for visualization
  const policyRates = [
    { date: '2023-01', ecb: 2.5, fed: 4.5 },
    { date: '2023-04', ecb: 3.0, fed: 4.75 },
    { date: '2023-07', ecb: 3.5, fed: 5.0 },
    { date: '2023-10', ecb: 4.0, fed: 5.25 },
    { date: '2024-01', ecb: 4.5, fed: 5.25 },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Interest Rates & Yield</h3>
        <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg">
          <button
            onClick={() => setView('policy')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              view === 'policy'
                ? 'bg-[#00FF88] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Policy Rate
          </button>
          <button
            onClick={() => setView('yields')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              view === 'yields'
                ? 'bg-[#00FF88] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Bond Yields
          </button>
        </div>
      </div>

      {/* Current Rates */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-4 bg-[#00C8FF]/5 border border-[#00C8FF]/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🇪🇺</span>
            <span className="text-xs text-gray-500">ECB Rate</span>
          </div>
          <div className="text-3xl font-bold text-white">4.50%</div>
          <div className="text-xs text-[#00FF88] mt-1">+0.25% last meeting</div>
        </div>

        <div className="p-4 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🇺🇸</span>
            <span className="text-xs text-gray-500">Fed Rate</span>
          </div>
          <div className="text-3xl font-bold text-white">5.25%</div>
          <div className="text-xs text-gray-500 mt-1">Unchanged</div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <div className="h-40 flex items-end gap-2">
          {policyRates.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col gap-2">
              {/* Fed bar */}
              <div className="flex flex-col items-center">
                <div
                  className="w-full bg-[#00FF88] rounded-t"
                  style={{ height: `${(data.fed / 6) * 100}%` }}
                />
                <div className="text-xs text-gray-600 mt-1">{data.date.split('-')[0]}</div>
              </div>
              {/* ECB bar */}
              <div
                className="w-full bg-[#00C8FF] rounded-t"
                style={{ height: `${(data.ecb / 6) * 80}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00FF88] rounded" />
            <span className="text-gray-400">Fed (5.25%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00C8FF] rounded" />
            <span className="text-gray-400">ECB (4.50%)</span>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
        <div className="text-xs text-gray-400">
          <strong className="text-white">Rate Differential:</strong> Fed rate is 0.75% higher than ECB. This differential typically strengthens USD vs EUR, creating downward pressure on EUR/USD.
        </div>
      </div>
    </div>
  );
}
