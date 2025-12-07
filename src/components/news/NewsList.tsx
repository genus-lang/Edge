import { RefreshCw, Grid, List, Newspaper } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { cn } from '../../lib/utils';

interface NewsListProps {
  news: any[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'list' | 'compact' | 'card';
  onViewModeChange: (mode: 'list' | 'compact' | 'card') => void;
  onRefresh: () => void;
  onSymbolClick?: (symbol: string) => void;
  onOpenDetail?: (id: string) => void;
}

export function NewsList({
  news,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onRefresh,
  onSymbolClick,
  onOpenDetail,
}: NewsListProps) {
  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00FF88]/50"
            >
              <option value="recent">Most recent</option>
              <option value="impact">Highest impact</option>
              <option value="relevance">Relevance</option>
              <option value="price-move">Biggest price move</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewModeChange('list')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                viewMode === 'list'
                  ? 'bg-[#00FF88] text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              )}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('compact')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                viewMode === 'compact'
                  ? 'bg-[#00FF88] text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              )}
              title="Compact View"
            >
              <Newspaper className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('card')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                viewMode === 'card'
                  ? 'bg-[#00FF88] text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              )}
              title="Card View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-white font-semibold">Showing {news.length} results</div>
            <span className="text-xs text-gray-500">• Updated 12s ago</span>
          </div>
          <button
            onClick={onRefresh}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* News Items */}
      <div className="space-y-4">
        {news.length > 0 ? (
          news.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              onSymbolClick={onSymbolClick}
              onOpenDetail={onOpenDetail}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
            <Newspaper className="w-16 h-16 text-gray-700 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No News Found</h3>
            <p className="text-sm text-gray-500 max-w-md text-center mb-4">
              No news found for this combination of filters. Try broadening your search or
              removing some filters.
            </p>
            <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Load More */}
      {news.length > 0 && (
        <div className="flex justify-center pt-4">
          <button className="px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
