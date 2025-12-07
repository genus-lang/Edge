import { PieChart, TrendingUp, AlertCircle } from 'lucide-react';

interface QuickStatsProps {
  totalResults: number;
  sectorDistribution: { sector: string; count: number; percentage: number }[];
  avgMetrics: {
    pe?: string;
    roe?: string;
    changePercent: string;
  };
  aiInsight: string;
}

export function QuickStats({ totalResults, sectorDistribution, avgMetrics, aiInsight }: QuickStatsProps) {
  const colors = ['#00FF88', '#00C8FF', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sector Distribution */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-sm font-semibold text-white">Sector Distribution</h3>
        </div>

        <div className="space-y-3">
          {sectorDistribution.map((item, idx) => (
            <div key={item.sector}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-400">{item.sector}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white font-semibold">{item.count}</span>
                  <span className="text-xs text-gray-500">({item.percentage}%)</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: colors[idx % colors.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Average Metrics */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-sm font-semibold text-white">Average Metrics</h3>
        </div>

        <div className="space-y-4">
          {avgMetrics.pe && (
            <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <span className="text-sm text-gray-400">Avg P/E Ratio</span>
              <span className="text-lg font-bold text-white">{avgMetrics.pe}</span>
            </div>
          )}
          {avgMetrics.roe && (
            <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <span className="text-sm text-gray-400">Avg ROE</span>
              <span className="text-lg font-bold text-white">{avgMetrics.roe}</span>
            </div>
          )}
          <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
            <span className="text-sm text-gray-400">Avg Change (1D)</span>
            <span className={`text-lg font-bold ${avgMetrics.changePercent.startsWith('+') ? 'text-[#00FF88]' : 'text-red-400'}`}>
              {avgMetrics.changePercent}
            </span>
          </div>

          <div className="pt-3 border-t border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
              <span className="text-xs text-gray-500">Min Change</span>
              <span className="text-xs text-white font-semibold ml-auto">-5.25%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-xs text-gray-500">Max Change</span>
              <span className="text-xs text-white font-semibold ml-auto">+8.42%</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-sm font-semibold text-white">AI Insight</h3>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          {aiInsight}
        </p>

        <div className="space-y-2">
          <button className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Open in Strategy Builder
          </button>
          <button className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Backtest This Universe
          </button>
        </div>
      </div>
    </div>
  );
}
