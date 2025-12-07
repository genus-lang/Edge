import { TrendingUp, Target, Users } from 'lucide-react';

interface Analyst {
  firm: string;
  analyst: string;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  targetPrice: string;
  date: string;
}

const analysts: Analyst[] = [
  { firm: 'Morgan Stanley', analyst: 'Katy Huberty', rating: 'Strong Buy', targetPrice: '$200', date: '2 days ago' },
  { firm: 'Goldman Sachs', analyst: 'Rod Hall', rating: 'Buy', targetPrice: '$195', date: '1 week ago' },
  { firm: 'JPMorgan', analyst: 'Samik Chatterjee', rating: 'Buy', targetPrice: '$210', date: '1 week ago' },
  { firm: 'Bank of America', analyst: 'Wamsi Mohan', rating: 'Buy', targetPrice: '$205', date: '2 weeks ago' },
  { firm: 'Wedbush', analyst: 'Dan Ives', rating: 'Strong Buy', targetPrice: '$220', date: '2 weeks ago' },
  { firm: 'Barclays', analyst: 'Tim Long', rating: 'Hold', targetPrice: '$175', date: '3 weeks ago' },
  { firm: 'UBS', analyst: 'David Vogt', rating: 'Buy', targetPrice: '$190', date: '1 month ago' },
  { firm: 'Citi', analyst: 'Jim Suva', rating: 'Hold', targetPrice: '$180', date: '1 month ago' },
];

const ratingCounts = {
  'Strong Buy': 3,
  'Buy': 9,
  'Hold': 3,
  'Sell': 1,
  'Strong Sell': 0,
};

const ratingColors = {
  'Strong Buy': 'bg-[#00FF88]',
  'Buy': 'bg-green-500',
  'Hold': 'bg-yellow-500',
  'Sell': 'bg-orange-500',
  'Strong Sell': 'bg-red-500',
};

export function AnalystRatingsTab() {
  const totalAnalysts = Object.values(ratingCounts).reduce((a, b) => a + b, 0);
  const consensusRating = 'Strong Buy';
  const targetPrice = '$198';
  const currentPrice = '$185.21';
  const upside = '+6.9%';

  return (
    <div className="space-y-6">
      {/* Consensus Summary */}
      <div className="grid grid-cols-3 gap-4">
        {/* Consensus Rating */}
        <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Users className="w-4 h-4" />
            Analyst Consensus
          </div>
          <div className="text-3xl font-bold text-[#00FF88] mb-2">{consensusRating}</div>
          <div className="text-sm text-gray-400">{totalAnalysts} analysts</div>
        </div>

        {/* Target Price */}
        <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Target className="w-4 h-4" />
            12-Month Target
          </div>
          <div className="text-3xl font-bold text-white mb-2">{targetPrice}</div>
          <div className="text-sm text-gray-400">Current: {currentPrice}</div>
        </div>

        {/* Upside */}
        <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <TrendingUp className="w-4 h-4" />
            Potential Upside
          </div>
          <div className="text-3xl font-bold text-[#00FF88] mb-2">{upside}</div>
          <div className="text-sm text-gray-400">From current price</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Rating Distribution</h3>
        
        {/* Bar Chart */}
        <div className="space-y-3 mb-6">
          {Object.entries(ratingCounts).map(([rating, count]) => {
            const percentage = (count / totalAnalysts) * 100;
            return (
              <div key={rating}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">{rating}</span>
                  <span className="text-white font-semibold">{count}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${ratingColors[rating as keyof typeof ratingColors]} transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
          <div>
            <div className="text-xs text-gray-500 mb-1">Buy Ratings</div>
            <div className="text-lg font-bold text-[#00FF88]">
              {ratingCounts['Strong Buy'] + ratingCounts['Buy']} ({Math.round(((ratingCounts['Strong Buy'] + ratingCounts['Buy']) / totalAnalysts) * 100)}%)
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Hold Ratings</div>
            <div className="text-lg font-bold text-yellow-500">
              {ratingCounts['Hold']} ({Math.round((ratingCounts['Hold'] / totalAnalysts) * 100)}%)
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Sell Ratings</div>
            <div className="text-lg font-bold text-red-400">
              {ratingCounts['Sell'] + ratingCounts['Strong Sell']} ({Math.round(((ratingCounts['Sell'] + ratingCounts['Strong Sell']) / totalAnalysts) * 100)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Individual Analysts */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Individual Analyst Ratings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Firm
                </th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Analyst
                </th>
                <th className="pb-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Price
                </th>
                <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {analysts.map((analyst, idx) => (
                <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 text-sm font-medium text-white">{analyst.firm}</td>
                  <td className="py-3 text-sm text-gray-400">{analyst.analyst}</td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        analyst.rating === 'Strong Buy' || analyst.rating === 'Buy'
                          ? 'bg-[#00FF88]/10 text-[#00FF88]'
                          : analyst.rating === 'Hold'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {analyst.rating}
                    </span>
                  </td>
                  <td className="py-3 text-right text-sm font-semibold text-white">
                    {analyst.targetPrice}
                  </td>
                  <td className="py-3 text-right text-sm text-gray-500">{analyst.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
