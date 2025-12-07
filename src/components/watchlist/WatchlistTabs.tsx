import { useState } from 'react';
import { Plus, MoreVertical, Edit2, Copy, Share2, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Watchlist {
  id: string;
  name: string;
  symbolCount: number;
  type: 'manual' | 'smart';
}

interface WatchlistTabsProps {
  watchlists: Watchlist[];
  activeWatchlistId: string;
  onWatchlistChange: (id: string) => void;
  onCreateWatchlist: () => void;
  onRenameWatchlist?: (id: string) => void;
  onDeleteWatchlist?: (id: string) => void;
}

export function WatchlistTabs({
  watchlists,
  activeWatchlistId,
  onWatchlistChange,
  onCreateWatchlist,
  onRenameWatchlist,
  onDeleteWatchlist,
}: WatchlistTabsProps) {
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  return (
    <div className="border-b border-gray-800">
      <div className="flex items-center gap-2 overflow-x-auto">
        {watchlists.map((watchlist) => (
          <div key={watchlist.id} className="relative group">
            <button
              onClick={() => onWatchlistChange(watchlist.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap',
                activeWatchlistId === watchlist.id
                  ? 'border-[#00FF88] text-white font-semibold'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
              )}
            >
              <span>{watchlist.name}</span>
              <span
                className={cn(
                  'px-1.5 py-0.5 text-xs rounded-full',
                  activeWatchlistId === watchlist.id
                    ? 'bg-[#00FF88]/20 text-[#00FF88]'
                    : 'bg-gray-800 text-gray-500'
                )}
              >
                {watchlist.symbolCount}
              </span>
            </button>

            {/* Context Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpenId(menuOpenId === watchlist.id ? null : watchlist.id);
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-800 text-gray-600 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {/* Context Menu Dropdown */}
            {menuOpenId === watchlist.id && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                <button
                  onClick={() => {
                    onRenameWatchlist?.(watchlist.id);
                    setMenuOpenId(null);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Rename
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <div className="border-t border-gray-800 my-1" />
                <button
                  onClick={() => {
                    if (confirm(`Delete watchlist "${watchlist.name}"?`)) {
                      onDeleteWatchlist?.(watchlist.id);
                    }
                    setMenuOpenId(null);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Create New Watchlist Tab */}
        <button
          onClick={onCreateWatchlist}
          className="flex items-center gap-1 px-4 py-3 text-gray-500 hover:text-[#00FF88] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New</span>
        </button>
      </div>

      {/* Click outside to close menu */}
      {menuOpenId && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpenId(null)}
        />
      )}
    </div>
  );
}
