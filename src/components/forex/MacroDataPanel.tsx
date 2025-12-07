import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CountryData {
  name: string;
  flag: string;
  interestRate: string;
  inflation: string;
  gdpGrowth: string;
  rateChange?: string;
  ratePositive?: boolean;
}

const countries: CountryData[] = [
  {
    name: 'Eurozone',
    flag: '🇪🇺',
    interestRate: '4.50%',
    inflation: '2.4%',
    gdpGrowth: '0.8%',
    rateChange: '+0.25%',
    ratePositive: true,
  },
  {
    name: 'United States',
    flag: '🇺🇸',
    interestRate: '5.25%',
    inflation: '3.2%',
    gdpGrowth: '2.1%',
    rateChange: 'Unchanged',
    ratePositive: null,
  },
];

const upcomingEvents = [
  { date: 'Thu, Dec 12', event: 'ECB Rate Decision', impact: 'High', expected: '4.50%', previous: '4.50%' },
  { date: 'Fri, Dec 13', event: 'US Non-Farm Payrolls', impact: 'High', expected: '200K', previous: '199K' },
  { date: 'Mon, Dec 16', event: 'Eurozone CPI', impact: 'Medium', expected: '2.4%', previous: '2.4%' },
  { date: 'Wed, Dec 18', event: 'FOMC Meeting', impact: 'High', expected: '5.25%', previous: '5.25%' },
];

export function MacroDataPanel() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">Macro Overview</h3>

      {/* Country Cards */}
      <div className="space-y-3 mb-6">
        {countries.map((country) => (
          <div key={country.name} className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{country.flag}</span>
              <div>
                <div className="text-sm font-semibold text-white">{country.name}</div>
                {country.rateChange && (
                  <div
                    className={cn(
                      'text-xs font-medium',
                      country.ratePositive === true && 'text-[#00FF88]',
                      country.ratePositive === false && 'text-red-400',
                      country.ratePositive === null && 'text-gray-500'
                    )}
                  >
                    {country.rateChange}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Interest Rate</div>
                <div className="text-sm font-bold text-white">{country.interestRate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Inflation YoY</div>
                <div className="text-sm font-bold text-white">{country.inflation}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">GDP Growth</div>
                <div className="text-sm font-bold text-white">{country.gdpGrowth}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white">Upcoming Events</h4>
          <div className="flex gap-1">
            {['All', 'High', 'Medium'].map((filter) => (
              <button
                key={filter}
                className={cn(
                  'px-2 py-1 rounded text-xs font-medium transition-all',
                  filter === 'All'
                    ? 'bg-[#00FF88] text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {upcomingEvents.map((event, idx) => (
            <button
              key={idx}
              className="w-full p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-500">{event.date}</span>
                  </div>
                  <div className="text-sm font-medium text-white">{event.event}</div>
                </div>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded text-xs font-semibold',
                    event.impact === 'High' && 'bg-red-500/10 text-red-400 border border-red-500/30',
                    event.impact === 'Medium' && 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'
                  )}
                >
                  {event.impact}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Expected: <span className="text-white font-medium">{event.expected}</span></span>
                <span>Previous: <span className="text-gray-400">{event.previous}</span></span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button className="w-full mt-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
        View Full Economic Calendar
      </button>
    </div>
  );
}
