import { TrendingUp, Activity, AlertCircle } from 'lucide-react';

interface ModelPerformanceProps {
  hitRate30D: string;
  cumulativeReturn90D: string;
  maxDrawdown: string;
  modelVersion: string;
  lastUpdated: string;
}

export function ModelPerformance({
  hitRate30D,
  cumulativeReturn90D,
  maxDrawdown,
  modelVersion,
  lastUpdated,
}: ModelPerformanceProps) {
  return (
    <div className="space-y-6">
      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#00FF88]" />
            <h3 className="text-sm font-semibold text-white">30D Hit Rate</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{hitRate30D}</div>
          <p className="text-xs text-gray-500">Prediction accuracy over last 30 days</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#00C8FF]" />
            <h3 className="text-sm font-semibold text-white">90D Cumulative Return</h3>
          </div>
          <div className="text-3xl font-bold text-[#00FF88] mb-2">{cumulativeReturn90D}</div>
          <p className="text-xs text-gray-500">AI signals vs benchmark</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-sm font-semibold text-white">Max Drawdown</h3>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-2">{maxDrawdown}</div>
          <p className="text-xs text-gray-500">Worst decline in AI-based strategy</p>
        </div>
      </div>

      {/* Model Info */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Model Information</h3>
          <span className="px-3 py-1 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded-full text-xs font-semibold text-[#00C8FF]">
            {modelVersion}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Last Updated</span>
            <span className="text-white font-semibold">{lastUpdated}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Architecture</span>
            <span className="text-white font-semibold">LSTM + Gradient Boosting</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Refresh Interval</span>
            <span className="text-white font-semibold">2 hours</span>
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
          View Release Notes & Changelog
        </button>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Disclaimer:</strong> AI predictions are probabilistic and not guarantees of future results. Always do your own research. Past performance is not indicative of future returns.
            </p>
            <a href="#" className="text-sm text-[#00C8FF] hover:underline">
              Learn how AI predictions work →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
