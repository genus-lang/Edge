import { TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

const volatilityData = [
  {
    name: 'India VIX',
    value: '14.7',
    change: '+2.3%',
    positive: false,
    level: 'Moderate',
    sparkline: [12, 13, 12.5, 14, 13.8, 14.7],
  },
  {
    name: 'VIX (US)',
    value: '18.2',
    change: '-1.5%',
    positive: true,
    level: 'Moderate',
    sparkline: [19, 18.5, 18.8, 18.3, 18.5, 18.2],
  },
];

const sentimentData = {
  overall: 'Moderately Bullish',
  bullish: 57,
  bearish: 32,
  neutral: 11,
};

function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width="60" height="20" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke="#00C8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VolatilitySentimentPanel() {
  // Calculate gauge angle (0-180 degrees)
  const sentimentAngle = ((sentimentData.bullish / 100) * 180);

  return (
    <div className="space-y-4">
      {/* Volatility Indicators Card */}
      <div className="p-5 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Volatility</h3>
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        </div>

        <div className="space-y-4">
          {volatilityData.map((item) => (
            <div
              key={item.name}
              className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00C8FF]/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm text-gray-400">{item.name}</div>
                  <div className="text-xl font-bold text-white mt-1">{item.value}</div>
                </div>
                <span
                  className={cn(
                    'px-2 py-0.5 text-xs rounded-full font-medium',
                    item.level === 'Low' && 'bg-[#00FF88]/10 text-[#00FF88]',
                    item.level === 'Moderate' && 'bg-yellow-500/10 text-yellow-500',
                    item.level === 'High' && 'bg-red-500/10 text-red-400'
                  )}
                >
                  {item.level}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-sm font-medium',
                    item.positive ? 'text-[#00FF88]' : 'text-red-400'
                  )}
                >
                  {item.change}
                </span>
                <MiniSparkline data={item.sparkline} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Meter Card */}
      <div className="p-5 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Sentiment</h3>
          <button className="p-1 hover:bg-gray-800 rounded transition-colors">
            <Info className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Gauge Visualization */}
        <div className="relative h-32 mb-4">
          {/* Semi-circle gauge */}
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="#374151"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Gradient arc */}
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#00FF88" />
              </linearGradient>
            </defs>
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(sentimentData.bullish / 100) * 251} 251`}
            />
            {/* Needle */}
            <line
              x1="100"
              y1="90"
              x2={100 + 60 * Math.cos((sentimentAngle - 180) * (Math.PI / 180))}
              y2={90 + 60 * Math.sin((sentimentAngle - 180) * (Math.PI / 180))}
              stroke="#00FF88"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="90" r="5" fill="#00FF88" />
          </svg>

          {/* Label */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <div className="text-sm font-semibold text-[#00FF88]">
              {sentimentData.overall}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Bullish signals</span>
            <span className="font-semibold text-[#00FF88]">{sentimentData.bullish}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Bearish signals</span>
            <span className="font-semibold text-red-400">{sentimentData.bearish}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Neutral</span>
            <span className="font-semibold text-gray-500">{sentimentData.neutral}%</span>
          </div>
        </div>

        {/* Source */}
        <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-600">
          Based on news, social media & price action
        </div>
      </div>
    </div>
  );
}
