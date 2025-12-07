import { Home, ChevronRight, Save, PlayCircle, Rocket, Undo2, Redo2, CheckCircle, MoreVertical, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface BuilderHeaderProps {
  strategyName: string;
  strategyState: 'draft' | 'active' | 'archived' | 'backtest-only';
  isModified: boolean;
  lastSaved?: Date;
  onSave: () => void;
  onQuickBacktest: () => void;
  onDeploy: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onValidate: () => void;
  canUndo: boolean;
  canRedo: boolean;
  canSave: boolean;
}

export function BuilderHeader({
  strategyName,
  strategyState,
  isModified,
  lastSaved,
  onSave,
  onQuickBacktest,
  onDeploy,
  onUndo,
  onRedo,
  onValidate,
  canUndo,
  canRedo,
  canSave,
}: BuilderHeaderProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  const getStateBadge = () => {
    const configs = {
      draft: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', label: 'Draft' },
      active: { bg: 'bg-[#00FF88]/10', border: 'border-[#00FF88]/30', text: 'text-[#00FF88]', label: 'Active' },
      archived: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', label: 'Archived' },
      'backtest-only': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', label: 'Backtest Only' },
    };
    return configs[strategyState];
  };

  const badge = getStateBadge();

  return (
    <div className="px-6 py-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-b border-gray-800">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <button
          onClick={() => handleNavigation('dashboard')}
          className="hover:text-[#00FF88] transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
        <ChevronRight className="w-4 h-4" />
        <button
          onClick={() => handleNavigation('strategy-library')}
          className="hover:text-[#00FF88] transition-colors"
        >
          Strategies
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Strategy Builder</span>
      </div>

      {/* Title Row */}
      <div className="flex items-center justify-between">
        {/* Left: Title & Badges */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">{strategyName}</h1>
          <span className={cn('px-2 py-1 border rounded text-xs font-semibold', badge.bg, badge.border, badge.text)}>
            {badge.label}
          </span>
          <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs font-semibold text-blue-400">
            No-Code Mode
          </span>
          {isModified && (
            <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs font-semibold text-yellow-400 animate-pulse">
              Unsaved Changes
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* History Controls */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo2 className="w-5 h-5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo2 className="w-5 h-5" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-700" />

          {/* Validate */}
          <button
            onClick={onValidate}
            className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm font-semibold"
          >
            <CheckCircle className="w-4 h-4" />
            Validate
          </button>

          {/* Quick Backtest */}
          <button
            onClick={onQuickBacktest}
            className="flex items-center gap-2 px-3 py-2 bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#00C8FF] rounded-lg hover:bg-[#00C8FF]/20 transition-colors text-sm font-semibold"
          >
            <PlayCircle className="w-4 h-4" />
            Quick Backtest
          </button>

          {/* Save */}
          <button
            onClick={onSave}
            disabled={!canSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg hover:bg-[#00FF88]/20 transition-colors text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save Strategy
          </button>

          {/* Deploy */}
          <button
            onClick={onDeploy}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
          >
            <Rocket className="w-4 h-4" />
            Deploy to Live
          </button>

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                  Duplicate
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                  Export JSON
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-gray-800">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          {lastSaved ? (
            <span>Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
          ) : (
            <span>Never saved</span>
          )}
        </div>
      </div>
    </div>
  );
}
