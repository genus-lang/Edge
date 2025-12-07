import { Save, ExternalLink, BookOpen, Star, ChevronRight, Home } from 'lucide-react';

interface LabHeaderProps {
  onSave: () => void;
  onApplyToCharting: () => void;
  onOpenDocs: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function LabHeader({
  onSave,
  onApplyToCharting,
  onOpenDocs,
  isFavorite,
  onToggleFavorite,
}: LabHeaderProps) {
  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-b border-gray-800">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button
          onClick={() => handleNavigation('dashboard')}
          className="hover:text-[#00FF88] transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
        <ChevronRight className="w-4 h-4" />
        <span>Markets</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Technical Indicators Lab</span>
      </div>

      {/* Title & Actions */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Technical Indicators Lab</h1>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded text-xs font-semibold text-[#00FF88]">
                LIVE DATA
              </span>
              <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-xs font-semibold text-purple-400">
                BETA
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Experiment with indicators, tune parameters, and see instant chart feedback.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleFavorite}
            className="p-2 rounded-lg text-gray-400 hover:text-yellow-500 hover:bg-gray-800 transition-colors"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={isFavorite ? 'w-5 h-5 fill-yellow-500 text-yellow-500' : 'w-5 h-5'} />
          </button>

          <button
            onClick={onOpenDocs}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            title="Documentation"
          >
            <BookOpen className="w-5 h-5" />
          </button>

          <button
            onClick={onApplyToCharting}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Apply to Charting
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" />
            Save Setup
          </button>
        </div>
      </div>
    </div>
  );
}
