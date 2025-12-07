import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Currency {
  code: string;
  strength: number;
  change: string;
  positive: boolean;
}

const currencies: Currency[] = [
  { code: 'EUR', strength: 72, change: '+0.9%', positive: true },
  { code: 'USD', strength: 54, change: '-0.3%', positive: false },
  { code: 'GBP', strength: 68, change: '+0.5%', positive: true },
  { code: 'JPY', strength: 45, change: '-1.2%', positive: false },
  { code: 'AUD', strength: 61, change: '+0.8%', positive: true },
  { code: 'CAD', strength: 58, change: '+0.2%', positive: true },
  { code: 'CHF', strength: 65, change: '+0.4%', positive: true },
  { code: 'NZD', strength: 52, change: '-0.6%', positive: false },
];

export function CurrencyStrength() {
  const getStrengthLabel = (strength: number) => {
    if (strength >= 70) return 'Strong';
    if (strength >= 55) return 'Moderate';
    if (strength >= 40) return 'Neutral';
    return 'Weak';
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 70) return 'text-[#00FF88]';
    if (strength >= 55) return 'text-blue-400';
    if (strength >= 40) return 'text-yellow-500';
    return 'text-red-400';
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Currency Strength</h3>
        <select className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50">
          <option>vs Basket</option>
          <option>EUR vs USD</option>
          <option>Global View</option>
        </select>
      </div>

      {/* Strength Bars */}
      <div className="space-y-3 mb-6">
        {currencies.map((currency) => (
          <div key={currency.code}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-10 font-bold text-white">{currency.code}</span>
                <span className={cn('text-xs font-medium', getStrengthColor(currency.strength))}>
                  {getStrengthLabel(currency.strength)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{currency.strength}</span>
                <span
                  className={cn(
                    'flex items-center gap-1 text-xs',
                    currency.positive ? 'text-[#00FF88]' : 'text-red-400'
                  )}
                >
                  {currency.positive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {currency.change}
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all',
                  currency.strength >= 70
                    ? 'bg-[#00FF88]'
                    : currency.strength >= 55
                    ? 'bg-blue-400'
                    : currency.strength >= 40
                    ? 'bg-yellow-500'
                    : 'bg-red-400'
                )}
                style={{ width: `${currency.strength}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
        <div className="text-sm text-gray-400">
          EUR currently stronger than USD vs major basket in last 24h. This suggests potential upward pressure on EUR/USD.
        </div>
      </div>
    </div>
  );
}
