import { Star, RotateCcw, Save, Share2, Edit2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface ScreenerHeaderProps {
  screenerName: string;
  onNameChange: (name: string) => void;
  assetType: 'stocks' | 'crypto' | 'forex';
  onAssetTypeChange: (type: 'stocks' | 'crypto' | 'forex') => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  lastUpdated: string;
  onReset: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onShare: () => void;
}

export function ScreenerHeader({
  screenerName,
  onNameChange,
  assetType,
  onAssetTypeChange,
  isFavorite,
  onFavoriteToggle,
  lastUpdated,
  onReset,
  onSave,
  onSaveAs,
  onShare,
}: ScreenerHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(screenerName);

  const handleSaveName = () => {
    onNameChange(editValue);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      {/* Title Row */}
      <div className="flex items-center justify-between">
        {/* Left: Name & Badges */}
        <div className="flex items-center gap-3">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              className="px-3 py-1.5 bg-gray-800 border border-[#00FF88]/50 rounded-lg text-2xl font-bold text-white focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-white">{screenerName}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={onFavoriteToggle}
            className={cn(
              'p-2 rounded-lg transition-colors',
              isFavorite
                ? 'text-yellow-500 bg-yellow-500/10'
                : 'text-gray-500 hover:text-yellow-500 hover:bg-gray-800'
            )}
          >
            <Star className={cn('w-5 h-5', isFavorite && 'fill-current')} />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full text-xs font-semibold text-[#00FF88] capitalize">
              {assetType}
            </span>
            <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-semibold text-gray-400">
              Private
            </span>
          </div>

          <span className="text-xs text-gray-500">Last updated: {lastUpdated}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-[#00FF88]/50">
            <option>My Screeners</option>
            <option disabled>──────────</option>
            <option>Top Gainers Template</option>
            <option>Oversold RSI Template</option>
            <option>High Volume Template</option>
            <option>Quality Stocks Template</option>
          </select>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-medium hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#00FF88] text-black rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={onSaveAs}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-medium hover:bg-gray-700 transition-colors"
          >
            Save As
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-medium hover:bg-gray-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Asset Type Tabs */}
      <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg w-fit">
        {(['stocks', 'crypto', 'forex'] as const).map((type) => (
          <button
            key={type}
            onClick={() => onAssetTypeChange(type)}
            className={cn(
              'px-6 py-2 rounded-md text-sm font-medium transition-all capitalize',
              assetType === type
                ? 'bg-[#00FF88] text-black'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
