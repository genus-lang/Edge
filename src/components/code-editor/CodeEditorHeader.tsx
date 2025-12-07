import { Home, ChevronRight, Save, PlayCircle, TestTube, Rocket, Code2, Undo2, Redo2, Download, MoreVertical, Clock } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface CodeEditorHeaderProps {
  strategyName: string;
  strategyId: string;
  strategyStatus: 'draft' | 'active' | 'archived';
  lastSaved?: Date;
  isSaving: boolean;
  isModified: boolean;
  selectedLanguage: 'python' | 'javascript';
  onLanguageChange: (lang: 'python' | 'javascript') => void;
  environment: 'paper' | 'live' | 'sandbox';
  onEnvironmentChange: (env: 'paper' | 'live' | 'sandbox') => void;
  onSave: () => void;
  onRunTest: () => void;
  onBacktest: () => void;
  onDeploy: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onFormatCode: () => void;
  onDownload: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onStrategyNameChange: (name: string) => void;
}

export function CodeEditorHeader({
  strategyName,
  strategyId,
  strategyStatus,
  lastSaved,
  isSaving,
  isModified,
  selectedLanguage,
  onLanguageChange,
  environment,
  onEnvironmentChange,
  onSave,
  onRunTest,
  onBacktest,
  onDeploy,
  onUndo,
  onRedo,
  onFormatCode,
  onDownload,
  canUndo,
  canRedo,
  onStrategyNameChange,
}: CodeEditorHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  const getStatusConfig = () => {
    const configs = {
      draft: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', label: 'Draft' },
      active: { bg: 'bg-[#00FF88]/10', border: 'border-[#00FF88]/30', text: 'text-[#00FF88]', label: 'Active' },
      archived: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', label: 'Archived' },
    };
    return configs[strategyStatus];
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-b border-gray-800">
      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-gray-800/50">
        <div className="flex items-center gap-2 text-sm text-gray-500">
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
          <span className="text-white">Code Editor</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Left: Strategy Name & Status */}
          <div className="flex items-center gap-3 flex-1">
            {isEditingName ? (
              <input
                type="text"
                value={strategyName}
                onChange={(e) => onStrategyNameChange(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                autoFocus
                className="text-2xl font-bold text-white bg-gray-800 border border-[#00FF88] rounded px-2 py-1 focus:outline-none"
              />
            ) : (
              <h1
                onClick={() => setIsEditingName(true)}
                className="text-2xl font-bold text-white cursor-pointer hover:text-[#00FF88] transition-colors"
              >
                {strategyName}
              </h1>
            )}
            <span className={cn('px-2 py-1 border rounded text-xs font-semibold', statusConfig.bg, statusConfig.border, statusConfig.text)}>
              {statusConfig.label}
            </span>
            {isModified && (
              <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs font-semibold text-yellow-400 animate-pulse">
                Unsaved Changes
              </span>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
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
            <button
              onClick={onFormatCode}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title="Format Code"
            >
              <Code2 className="w-5 h-5" />
            </button>
            <button
              onClick={onDownload}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title="Download Script"
            >
              <Download className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-gray-700" />

            <button
              onClick={onRunTest}
              className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm font-semibold"
            >
              <PlayCircle className="w-4 h-4" />
              Run Test
            </button>
            <button
              onClick={onBacktest}
              className="flex items-center gap-2 px-3 py-2 bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#00C8FF] rounded-lg hover:bg-[#00C8FF]/20 transition-colors text-sm font-semibold"
            >
              <TestTube className="w-4 h-4" />
              Backtest
            </button>
            <button
              onClick={onSave}
              disabled={!isModified}
              className="flex items-center gap-2 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg hover:bg-[#00FF88]/20 transition-colors text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={onDeploy}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
            >
              <Rocket className="w-4 h-4" />
              Deploy
            </button>

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
                    View Change History
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-gray-800">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Meta + Language + Environment */}
        <div className="flex items-center justify-between">
          {/* Left: Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>ID: {strategyId}</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {isSaving ? (
                <span className="text-[#00C8FF]">Saving...</span>
              ) : lastSaved ? (
                <span>Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
              ) : (
                <span>Never saved</span>
              )}
            </div>
          </div>

          {/* Right: Language Tabs + Environment */}
          <div className="flex items-center gap-3">
            {/* Language Tabs */}
            <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
              <button
                onClick={() => onLanguageChange('python')}
                className={cn(
                  'px-3 py-1.5 rounded text-xs font-semibold transition-all',
                  selectedLanguage === 'python'
                    ? 'bg-[#00FF88] text-black'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                Python
              </button>
              <button
                onClick={() => onLanguageChange('javascript')}
                className={cn(
                  'px-3 py-1.5 rounded text-xs font-semibold transition-all',
                  selectedLanguage === 'javascript'
                    ? 'bg-[#00FF88] text-black'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                JavaScript
              </button>
            </div>

            {/* Environment Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Environment:</span>
              <select
                value={environment}
                onChange={(e) => onEnvironmentChange(e.target.value as any)}
                className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs font-medium focus:outline-none focus:border-[#00FF88]/50"
              >
                <option value="sandbox">Sandbox</option>
                <option value="paper">Paper Trading</option>
                <option value="live">Live Trading</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
