import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const allocationData = [
  { name: 'Stocks', value: 45, color: '#00FF88' },
  { name: 'Crypto', value: 25, color: '#00C8FF' },
  { name: 'Forex', value: 15, color: '#A855F7' },
  { name: 'Cash', value: 15, color: '#6B7280' },
];

export function AssetAllocation() {
  const dominantAsset = allocationData.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Asset Allocation</h3>
        <p className="text-sm text-gray-500 mt-1">Portfolio diversification</p>
      </div>

      {/* Chart */}
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`${value}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{dominantAsset.value}%</div>
            <div className="text-xs text-gray-500 mt-1">{dominantAsset.name}</div>
          </div>
        </div>
      </div>

      {/* Legend with Details */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {allocationData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-300">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
