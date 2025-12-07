import { Play, Save, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BottomRunControlsProps {
  isValid: boolean;
  validationMessage: string;
  onRunBacktest: () => void;
  onSaveTemplate: () => void;
  onReset: () => void;
  isRunning?: boolean;
  progress?: number;
}

export function BottomRunControls({
  isValid,
  validationMessage,
  onRunBacktest,
  onSaveTemplate,
  onReset,
  isRunning = false,
  progress = 0,
}: BottomRunControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-700 px-6 py-4 z-30">
      {isRunning && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white font-medium">Running backtest...</span>
            <span className="text-sm text-[#00C8FF]">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FF88] to-[#00C8FF] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Left: Validation Status */}
        <div className="flex items-center gap-2">
          {isValid ? (
            <>
              <CheckCircle className="w-5 h-5 text-[#00FF88]" />
              <span className="text-sm text-[#00FF88] font-medium">{validationMessage}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-yellow-400 font-medium">{validationMessage}</span>
            </>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <button
            onClick={onSaveTemplate}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            Save as Template
          </button>
          <button
            onClick={onRunBacktest}
            disabled={!isValid || isRunning}
            className={cn(
              'flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all',
              isValid && !isRunning
                ? 'bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run Backtest'}
          </button>
        </div>
      </div>
    </div>
  );
}
