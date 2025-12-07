import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { cn } from '../../../lib/utils';

const timeframes = ['1D', '1W', '1M', '1Y', 'All'];

// Mock data for different timeframes
const chartData = {
  '1D': [
    { time: '09:00', value: 120000, benchmark: 119500 },
    { time: '10:00', value: 121500, benchmark: 120000 },
    { time: '11:00', value: 120800, benchmark: 119800 },
    { time: '12:00', value: 122300, benchmark: 121000 },
    { time: '13:00', value: 123100, benchmark: 121500 },
    { time: '14:00', value: 124500, benchmark: 122000 },
    { time: '15:00', value: 124567, benchmark: 122500 },
  ],
  '1W': [
    { time: 'Mon', value: 115000, benchmark: 114500 },
    { time: 'Tue', value: 117000, benchmark: 116000 },
    { time: 'Wed', value: 119000, benchmark: 117500 },
    { time: 'Thu', value: 121000, benchmark: 119000 },
    { time: 'Fri', value: 124567, benchmark: 122500 },
  ],
  '1M': [
    { time: 'Week 1', value: 100000, benchmark: 100000 },
    { time: 'Week 2', value: 105000, benchmark: 103000 },
    { time: 'Week 3', value: 110000, benchmark: 107000 },
    { time: 'Week 4', value: 124567, benchmark: 122500 },
  ],
  '1Y': [
    { time: 'Jan', value: 80000, benchmark: 80000 },
    { time: 'Feb', value: 85000, benchmark: 83000 },
    { time: 'Mar', value: 90000, benchmark: 87000 },
    { time: 'Apr', value: 95000, benchmark: 91000 },
    { time: 'May', value: 100000, benchmark: 95000 },
    { time: 'Jun', value: 105000, benchmark: 99000 },
    { time: 'Jul', value: 110000, benchmark: 104000 },
    { time: 'Aug', value: 115000, benchmark: 109000 },
    { time: 'Sep', value: 118000, benchmark: 113000 },
    { time: 'Oct', value: 121000, benchmark: 117000 },
    { time: 'Nov', value: 123000, benchmark: 120000 },
    { time: 'Dec', value: 124567, benchmark: 122500 },
  ],
  All: [
    { time: '2022', value: 50000, benchmark: 50000 },
    { time: '2023', value: 80000, benchmark: 75000 },
    { time: '2024', value: 124567, benchmark: 122500 },
  ],
};

export function PerformanceChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const data = chartData[selectedTimeframe as keyof typeof chartData];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Performance</h3>
          <p className="text-sm text-gray-500 mt-1">Portfolio vs Benchmark</p>
        </div>

        {/* Timeframe Toggles */}
        <div className="flex items-center gap-1 p-1 bg-gray-800/50 rounded-lg">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                selectedTimeframe === timeframe
                  ? 'bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              )}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#9ca3af' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00FF88"
              strokeWidth={2}
              fill="url(#colorValue)"
              name="Portfolio"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#00C8FF"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Benchmark"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
          <span className="text-sm text-gray-400">Your Portfolio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#00C8FF]" />
          <span className="text-sm text-gray-400">S&P 500</span>
        </div>
      </div>
    </div>
  );
}
