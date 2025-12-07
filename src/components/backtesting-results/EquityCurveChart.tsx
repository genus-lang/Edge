import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '../../lib/utils';

interface EquityCurveChartProps {
  data: Array<{
    date: string;
    strategyEquity: number;
    benchmark: number;
  }>;
}

export function EquityCurveChart({ data }: EquityCurveChartProps) {
  const [timeRange, setTimeRange] = useState('full');
  const [showStrategy, setShowStrategy] = useState(true);
  const [showBenchmark, setShowBenchmark] = useState(true);

  const getFilteredData = () => {
    if (timeRange === 'full') return data;
    
    const ranges: Record<string, number> = {
      '1m': 30,
      '3m': 90,
      '6m': 180,
      '1y': 365,
    };
    
    const days = ranges[timeRange] || 0;
    return data.slice(-days);
  };

  const filteredData = getFilteredData();

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Equity Curve vs Benchmark</h3>
        
        <div className="flex items-center gap-4">
          {/* Time Range Buttons */}
          <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
            {['1m', '3m', '6m', '1y', 'full'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  'px-3 py-1.5 rounded text-xs font-semibold transition-all',
                  timeRange === range
                    ? 'bg-[#00FF88] text-black'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          
          {/* Toggle Visibility */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showStrategy}
                onChange={(e) => setShowStrategy(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#00FF88] focus:ring-[#00FF88] focus:ring-offset-0"
              />
              <span className="text-sm text-gray-300">Strategy</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBenchmark}
                onChange={(e) => setShowBenchmark(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#00C8FF] focus:ring-[#00C8FF] focus:ring-offset-0"
              />
              <span className="text-sm text-gray-300">Benchmark</span>
            </label>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            {showStrategy && (
              <Line
                type="monotone"
                dataKey="strategyEquity"
                stroke="#00FF88"
                strokeWidth={2}
                dot={false}
                name="Strategy Equity"
              />
            )}
            {showBenchmark && (
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#00C8FF"
                strokeWidth={2}
                dot={false}
                name="Benchmark"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
