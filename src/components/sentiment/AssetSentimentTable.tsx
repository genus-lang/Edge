import { Search, Download, TrendingUp, TrendingDown, AlertTriangle, Brain, LineChart, ShoppingCart, Newspaper, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AssetSentiment {
  symbol: string;
  name: string;
  logo: string;
  sentimentScore: number;
  sentimentChange: number;
  mentions: number;
  newsPercent: number;
  socialPercent: number;
  priceChange: string;
  alerts: { type: string; icon: any; color: string }[];
}

interface AssetSentimentTableProps {
  assets: AssetSentiment[];
  onAssetClick?: (symbol: string) => void;
}

export function AssetSentimentTable({ assets, onAssetClick }: AssetSentimentTableProps) {
  const getSentimentColor = (score: number) => {
    if (score >= 60) return 'text-[#00FF88]';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-400';
  };

  const getSentimentBg = (score: number) => {
    if (score >= 60) return 'bg-[#00FF88]/10 border-[#00FF88]/30';
    if (score >= 40) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Asset-wise Sentiment</h3>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search symbol or name..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg text-xs font-medium hover:text-white hover:border-gray-600 transition-colors">
              Only Watchlist
            </button>
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg text-xs font-medium hover:text-white hover:border-gray-600 transition-colors">
              High Alert
            </button>
          </div>

          {/* Export */}
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-800">
            <tr>
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Asset</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Sentiment Score</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Sentiment Δ</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Mentions</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Source Split</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Price Δ</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Alerts</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.symbol}
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
              >
                {/* Asset */}
                <td className="p-4">
                  <button
                    onClick={() => onAssetClick?.(asset.symbol)}
                    className="flex items-center gap-3 hover:text-[#00FF88] transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-400">{asset.logo}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{asset.symbol}</div>
                      <div className="text-xs text-gray-500">{asset.name}</div>
                    </div>
                  </button>
                </td>

                {/* Sentiment Score */}
                <td className="p-4">
                  <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg font-semibold', getSentimentBg(asset.sentimentScore))}>
                    <span className={cn('text-sm', getSentimentColor(asset.sentimentScore))}>
                      {asset.sentimentScore}
                    </span>
                    <span className="text-xs text-gray-500">/100</span>
                  </div>
                </td>

                {/* Sentiment Change */}
                <td className="p-4">
                  <div
                    className={cn(
                      'inline-flex items-center gap-1 text-sm font-semibold',
                      asset.sentimentChange >= 0 ? 'text-[#00FF88]' : 'text-red-400'
                    )}
                  >
                    {asset.sentimentChange >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {asset.sentimentChange >= 0 ? '+' : ''}{asset.sentimentChange}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">24h</div>
                </td>

                {/* Mentions */}
                <td className="p-4">
                  <div className="text-sm font-semibold text-white">
                    {asset.mentions.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">mentions</div>
                </td>

                {/* Source Split */}
                <td className="p-4">
                  <div className="w-32">
                    <div className="flex h-2 rounded-full overflow-hidden mb-1">
                      <div
                        className="bg-[#00C8FF]"
                        style={{ width: `${asset.newsPercent}%` }}
                        title={`${asset.newsPercent}% News`}
                      />
                      <div
                        className="bg-purple-500"
                        style={{ width: `${asset.socialPercent}%` }}
                        title={`${asset.socialPercent}% Social`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#00C8FF]">{asset.newsPercent}% News</span>
                      <span className="text-purple-400">{asset.socialPercent}% Social</span>
                    </div>
                  </div>
                </td>

                {/* Price Change */}
                <td className="p-4">
                  <div
                    className={cn(
                      'text-sm font-semibold',
                      asset.priceChange.startsWith('+') ? 'text-[#00FF88]' : 'text-red-400'
                    )}
                  >
                    {asset.priceChange}
                  </div>
                  <div className="text-xs text-gray-500">24h</div>
                </td>

                {/* Alerts */}
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    {asset.alerts.map((alert, idx) => (
                      <div
                        key={idx}
                        className={`p-1.5 rounded-lg bg-${alert.color}-500/10 border border-${alert.color}-500/30`}
                        title={alert.type}
                      >
                        <alert.icon className={`w-3.5 h-3.5 text-${alert.color}-400`} />
                      </div>
                    ))}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-[#00C8FF] hover:border-[#00C8FF]/50 transition-colors"
                      title="View Chart"
                    >
                      <LineChart className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/50 transition-colors"
                      title="Trade"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-400/50 transition-colors"
                      title="View News"
                    >
                      <Newspaper className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors"
                      title="Add to Watchlist"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing 1-{assets.length} of 245 assets
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            Previous
          </button>
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            1
          </button>
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            2
          </button>
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            3
          </button>
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
