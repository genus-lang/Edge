import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { cn } from '../../../lib/utils';

const metrics = [
  {
    label: 'Total Portfolio Value',
    value: '$124,567.89',
    change: '+$4,234.56',
    changePercent: '+3.52%',
    positive: true,
    icon: DollarSign,
  },
  {
    label: "Today's P&L",
    value: '+$1,234.56',
    changePercent: '+1.02%',
    positive: true,
    icon: TrendingUp,
  },
  {
    label: 'Net Returns',
    value: '+$24,567.89',
    changePercent: '+24.56%',
    positive: true,
    subtitle: 'Since inception',
    icon: TrendingUp,
  },
  {
    label: 'Cash Balance',
    value: '$18,432.12',
    changePercent: '14.8% of portfolio',
    icon: Wallet,
  },
];

export function PortfolioSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="group relative p-5 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl hover:border-[#00FF88]/30 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-[#00C8FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Content */}
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {metric.label}
              </span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 flex items-center justify-center">
                <metric.icon className="w-4 h-4 text-[#00FF88]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{metric.value}</div>

              {metric.change && (
                <div className="text-sm text-gray-400">{metric.change}</div>
              )}

              <div
                className={cn(
                  'inline-flex items-center gap-1 text-sm font-medium',
                  metric.positive === true && 'text-[#00FF88]',
                  metric.positive === false && 'text-red-400',
                  metric.positive === undefined && 'text-gray-400'
                )}
              >
                {metric.positive === true && <TrendingUp className="w-3 h-3" />}
                {metric.positive === false && <TrendingDown className="w-3 h-3" />}
                <span>{metric.changePercent}</span>
              </div>

              {metric.subtitle && (
                <div className="text-xs text-gray-600">{metric.subtitle}</div>
              )}
            </div>
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      ))}
    </div>
  );
}
