import { Home, ChevronRight, Tag, Calendar, Code, Edit3, RefreshCw } from 'lucide-react';

interface BacktestingLabHeaderProps {
  selectedStrategy?: {
    name: string;
    tags: string[];
    lastModified: string;
  };
  onChangeStrategy: () => void;
  onEditStrategy: () => void;
}

export function BacktestingLabHeader({
  selectedStrategy,
  onChangeStrategy,
  onEditStrategy,
}: BacktestingLabHeaderProps) {
  const handleNavigation = (page: string) => {
    if ((window as any).onPageChange) {
      (window as any).onPageChange(page);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-b border-gray-800 px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
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
        <span className="text-white">Backtesting Lab</span>
      </div>

      {/* Title & Subtitle */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white mb-2">Backtesting Lab</h1>
        <p className="text-gray-400 text-sm">
          Configure and simulate your strategy on historical data before going live.
        </p>
      </div>

      {/* Selected Strategy Summary */}
      {selectedStrategy && (
        <div className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 border border-[#00FF88]/30 flex items-center justify-center">
              <Code className="w-6 h-6 text-[#00FF88]" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">{selectedStrategy.name}</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {selectedStrategy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded text-xs font-medium text-[#00C8FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Last modified: {selectedStrategy.lastModified}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onChangeStrategy}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Change Strategy
            </button>
            <button
              onClick={onEditStrategy}
              className="flex items-center gap-2 px-3 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg hover:bg-[#00FF88]/20 transition-colors text-sm"
            >
              <Edit3 className="w-4 h-4" />
              Edit Strategy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}