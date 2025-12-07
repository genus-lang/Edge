import { Play, Edit, Copy, Trash2, Share2, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SavedSetup {
  id: string;
  name: string;
  market: string;
  timeframe: string;
  tags: string[];
  lastUsed: string;
  isFavorite: boolean;
}

interface SavedSetupsProps {
  setups: SavedSetup[];
  onApply: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function SavedSetups({
  setups,
  onApply,
  onEdit,
  onDuplicate,
  onDelete,
  onShare,
  onToggleFavorite,
}: SavedSetupsProps) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-t border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">Saved Indicator Setups</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {setups.map((setup) => (
          <div
            key={setup.id}
            className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/50 transition-colors group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white mb-1">{setup.name}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{setup.market}</span>
                  <span>·</span>
                  <span>{setup.timeframe}</span>
                </div>
              </div>

              <button
                onClick={() => onToggleFavorite(setup.id)}
                className="flex-shrink-0 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                <Star className={cn('w-4 h-4', setup.isFavorite && 'fill-yellow-500 text-yellow-500')} />
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {setup.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded text-xs font-semibold text-[#00C8FF]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Last Used */}
            <div className="text-xs text-gray-500 mb-3">Last used: {setup.lastUsed}</div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onApply(setup.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#00FF88] text-black rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Play className="w-3 h-3" />
                Apply
              </button>
              <button
                onClick={() => onEdit(setup.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDuplicate(setup.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => onShare(setup.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(setup.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
