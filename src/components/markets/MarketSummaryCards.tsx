import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MarketCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changePercent: string;
  positive: boolean;
  status?: 'Open' | 'Closed';
  sparkline: number[];
  subtitle?: string;
}

const marketCards: MarketCard[] = [
  {
    id: '1',
    title: 'Global Equities',
    value: '$95.2T',
    change: '+$1.2T',
    changePercent: '+1.28%',
    positive: true,
    sparkline: [94, 94.5, 94.2, 94.8, 95, 95.2],
    subtitle: 'Advancers: 62% | Decliners: 38%',
  },
  {
    id: '2',
    title: 'Nifty 50',
    value: '23,220.35',
    change: '+150.20',
    changePercent: '+0.65%',
    positive: true,
    status: 'Closed',
    sparkline: [23050, 23100, 23080, 23150, 23200, 23220],
  },
  {
    id: '3',
    title: 'S&P 500',
    value: '4,783.45',
    change: '+45.20',
    changePercent: '+0.95%',
    positive: true,
    status: 'Open',
    sparkline: [4720, 4740, 4730, 4760, 4775, 4783],
  },
  {
    id: '4',
    title: 'NASDAQ',
    value: '15,095.14',
    change: '+128.67',
    changePercent: '+0.86%',
    positive: true,
    status: 'Open',
    sparkline: [14950, 14980, 14960, 15020, 15070, 15095],
  },
  {
    id: '5',
    title: 'Crypto Market',
    value: '$1.68T',
    change: '+$42B',
    changePercent: '+2.56%',
    positive: true,
    sparkline: [1.62, 1.64, 1.63, 1.66, 1.67, 1.68],
    subtitle: 'BTC.D: 54.2% | 24h Vol: $87B',
  },
  {
    id: '6',
    title: 'Forex',
    value: 'EUR/USD 1.0892',
    change: '+0.0023',
    changePercent: '+0.21%',
    positive: true,
    sparkline: [1.086, 1.087, 1.0865, 1.088, 1.089, 1.0892],
    subtitle: 'USD/INR: 83.24 | GBP/USD: 1.2645',
  },
];

// Mini sparkline component
function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 80;
      const y = 30 - ((value - min) / range) * 30;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width="80" height="30" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#00FF88' : '#EF4444'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MarketSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {marketCards.map((card) => (
        <div
          key={card.id}
          className="group relative p-5 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl hover:border-[#00FF88]/30 transition-all cursor-pointer overflow-hidden"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-[#00C8FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Content */}
          <div className="relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">{card.title}</h3>
                <div className="text-2xl font-bold text-white">{card.value}</div>
              </div>
              {card.status && (
                <span
                  className={cn(
                    'px-2 py-0.5 text-xs rounded-full font-medium',
                    card.status === 'Open'
                      ? 'bg-[#00FF88]/10 text-[#00FF88]'
                      : 'bg-gray-700 text-gray-400'
                  )}
                >
                  {card.status}
                </span>
              )}
            </div>

            {/* Change */}
            <div className="flex items-center justify-between mb-3">
              <div
                className={cn(
                  'flex items-center gap-1.5 text-sm font-semibold',
                  card.positive ? 'text-[#00FF88]' : 'text-red-400'
                )}
              >
                {card.positive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{card.change}</span>
                <span>({card.changePercent})</span>
              </div>
            </div>

            {/* Sparkline */}
            <div className="mb-3">
              <MiniSparkline data={card.sparkline} positive={card.positive} />
            </div>

            {/* Subtitle */}
            {card.subtitle && (
              <div className="text-xs text-gray-500 border-t border-gray-800 pt-2">
                {card.subtitle}
              </div>
            )}
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      ))}
    </div>
  );
}
