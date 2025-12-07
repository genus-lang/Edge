import { Check, X, AlertTriangle, Tag, Globe, Target, Shield, Zap, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StrategyDetailsPanelProps {
  strategyName: string;
  onStrategyNameChange: (name: string) => void;
  description: string;
  onDescriptionChange: (desc: string) => void;
  validations: Array<{ type: 'success' | 'warning' | 'error'; message: string }>;
  previewMetrics?: {
    winRate?: number;
    avgRR?: number;
    backtestDays?: number;
  };
}

export function StrategyDetailsPanel({
  strategyName,
  onStrategyNameChange,
  description,
  onDescriptionChange,
  validations,
  previewMetrics,
}: StrategyDetailsPanelProps) {
  return (
    <div className="w-96 h-full overflow-y-auto bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-l border-gray-800 p-4">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-1">Strategy Details</h3>
        <p className="text-xs text-gray-500">Configure settings & view validation</p>
      </div>

      <div className="space-y-6">
        {/* Strategy Identity */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#00FF88]" />
            Identity
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Strategy Name *</label>
              <input
                type="text"
                value={strategyName}
                onChange={(e) => onStrategyNameChange(e.target.value)}
                placeholder="e.g., RSI Mean Reversion"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Describe your strategy..."
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50 resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {['Mean Reversion', 'Crypto', 'Day Trading'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-xs font-medium text-purple-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="text-xs text-[#00C8FF] hover:text-[#00FF88]">+ Add tag</button>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Visibility</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                <option>Private</option>
                <option>Team</option>
                <option>Public</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trading Profile */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#00C8FF]" />
            Trading Profile
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Asset Type</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                <option>All Assets</option>
                <option>Stocks</option>
                <option>Crypto</option>
                <option>Forex</option>
                <option>Indices</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Time Horizon</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                <option>Scalping</option>
                <option>Intraday</option>
                <option>Swing</option>
                <option>Long-term</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Markets / Exchanges</label>
              <input
                type="text"
                placeholder="e.g., NSE, Binance, NASDAQ"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
          </div>
        </div>

        {/* Risk Settings */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-yellow-500" />
            Risk Settings
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Position Sizing</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  defaultValue={2}
                  step="0.1"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                />
                <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                  <option>% of Equity</option>
                  <option>Fixed Amount</option>
                  <option>Risk-based</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Max Daily Loss (%)</label>
              <input
                type="number"
                defaultValue={5}
                step="0.5"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Max Concurrent Positions</label>
              <input
                type="number"
                defaultValue={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Leverage</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                <option>1x (No Leverage)</option>
                <option>2x</option>
                <option>5x</option>
                <option>10x</option>
              </select>
            </div>
          </div>
        </div>

        {/* Validation & Warnings */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-500" />
            Validation
          </h4>
          <div className="space-y-2">
            {validations.length > 0 ? (
              validations.map((validation, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex items-start gap-2 p-3 rounded-lg text-xs border',
                    validation.type === 'success' && 'bg-[#00FF88]/5 border-[#00FF88]/30 text-[#00FF88]',
                    validation.type === 'warning' && 'bg-yellow-500/5 border-yellow-500/30 text-yellow-500',
                    validation.type === 'error' && 'bg-red-500/5 border-red-500/30 text-red-500'
                  )}
                >
                  {validation.type === 'success' && <Check className="w-4 h-4 shrink-0 mt-0.5" />}
                  {validation.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
                  {validation.type === 'error' && <X className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span className="flex-1">{validation.message}</span>
                </div>
              ))
            ) : (
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg text-xs text-gray-500 text-center">
                No validation results yet
              </div>
            )}
          </div>
        </div>

        {/* Preview Metrics */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#00C8FF]" />
            Preview Metrics
          </h4>
          {previewMetrics ? (
            <div className="space-y-3">
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Expected Win Rate</div>
                <div className="text-xl font-bold text-[#00FF88]">{previewMetrics.winRate}%</div>
              </div>
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Avg Risk:Reward</div>
                <div className="text-xl font-bold text-[#00C8FF]">1:{previewMetrics.avgRR}</div>
              </div>
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Recommended Backtest Period</div>
                <div className="text-xl font-bold text-white">{previewMetrics.backtestDays} days</div>
              </div>
              <button className="w-full px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm font-semibold">
                View Full Results in Backtesting Lab
              </button>
            </div>
          ) : (
            <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-700/30 flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-xs text-gray-500 mb-3">No preview data available</p>
              <p className="text-xs text-gray-600">Run a quick backtest to see metrics</p>
            </div>
          )}
        </div>

        {/* Execution Mode */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-orange-500" />
            Execution Mode
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div>
                <div className="text-sm text-white font-medium">Paper Trading</div>
                <div className="text-xs text-gray-500">Simulate with virtual money</div>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input type="radio" name="execution" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-700 peer-checked:bg-[#00C8FF] rounded-full peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform" />
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div>
                <div className="text-sm text-white font-medium">Live Trading</div>
                <div className="text-xs text-gray-500">Execute with real money</div>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input type="radio" name="execution" className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-700 peer-checked:bg-[#00FF88] rounded-full peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform" />
              </label>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#00FF88] focus:ring-[#00FF88] focus:ring-offset-0"
              />
              <span className="text-sm text-gray-300">
                Require manual confirmation for orders
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
