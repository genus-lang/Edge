import { Sparkles, Clock, DollarSign, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PreviewPanelProps {
  config: any;
  estimatedRuntime: string;
  aiTips: string[];
}

export function PreviewPanel({ config, estimatedRuntime, aiTips }: PreviewPanelProps) {
  const getTotalSymbols = () => {
    if (config.universe === 'nifty50') return 50;
    if (config.universe === 'sp500') return 500;
    if (config.universe === 'nasdaq100') return 100;
    return config.symbols.length;
  };

  return (
    <div className="space-y-4">
      {/* Run Summary Card */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#00FF88]" />
          Run Summary
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Strategy</span>
            <span className="text-white font-medium">MA Crossover</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Symbols</span>
            <span className="text-white font-medium">
              {getTotalSymbols()} {config.assetType || 'assets'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Date Range</span>
            <span className="text-white font-medium">
              {config.dateFrom && config.dateTo
                ? `${new Date(config.dateFrom).toLocaleDateString()} - ${new Date(config.dateTo).toLocaleDateString()}`
                : 'Not set'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Timeframe</span>
            <span className="text-white font-medium">{config.timeframe || 'Not set'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Initial Capital</span>
            <span className="text-white font-medium">
              {config.currency} {config.initialCapital?.toLocaleString() || '0'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Leverage</span>
            <span className={cn(
              'font-medium',
              config.leverage > 2 ? 'text-yellow-400' : 'text-white'
            )}>
              {config.leverage}x
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Max Drawdown</span>
            <span className="text-white font-medium">{config.maxDrawdown}%</span>
          </div>
          <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-700">
            <span className="text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Est. Runtime
            </span>
            <span className="text-[#00C8FF] font-medium">{estimatedRuntime}</span>
          </div>
        </div>
      </div>

      {/* Expected Timeline Preview */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#00C8FF]" />
          Equity Curve Preview
        </h3>
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="text-gray-600">
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <path
                d="M 0 80 Q 25 60, 50 70 T 100 40"
                stroke="#00FF88"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
            </svg>
          </div>
          <div className="relative text-center">
            <p className="text-sm text-gray-400 mb-2">Your equity curve will appear here</p>
            <p className="text-xs text-gray-600">after running the backtest</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700 text-xs text-gray-500">
          <span>Start</span>
          <span>Mid</span>
          <span>End</span>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          AI Backtest Coach
        </h3>
        <div className="space-y-2 mb-4">
          {aiTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
              <AlertCircle className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/20 transition-colors">
            Optimize for speed
          </button>
          <button className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/20 transition-colors">
            Safer risk settings
          </button>
          <button className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/20 transition-colors">
            Explain parameters
          </button>
        </div>
      </div>

      {/* Sample Trades Preview */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#00FF88]" />
          Sample Trades Preview
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Preview a few hypothetical trades based on your rules
        </p>
        <button className="w-full px-4 py-2 bg-[#00C8FF]/10 border border-[#00C8FF]/30 text-[#00C8FF] rounded-lg hover:bg-[#00C8FF]/20 transition-colors text-sm font-medium">
          Generate Preview
        </button>
      </div>
    </div>
  );
}
