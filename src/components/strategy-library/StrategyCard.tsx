import { Eye, Copy, TestTube, Star, Users, Flame, Lock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface Strategy {
  id: string;
  name: string;
  subtitle: string;
  assetType: string;
  timeframe: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  rating: number;
  stats: {
    winRate: number;
    cagr: number;
    maxDrawdown: number;
    sharpe: number;
  };
  description: string;
  indicators: string[];
  popularity: number;
  isTrending: boolean;
  backtestCount: number;
  isPremium: boolean;
  isVerified: boolean;
  chartData: number[];
}

interface StrategyCardProps {
  strategy: Strategy;
  isSelected: boolean;
  isSaved: boolean;
  onView: () => void;
  onClone: () => void;
  onBacktest: () => void;
  onToggleSave: () => void;
  onToggleCompare: () => void;
}

export function StrategyCard({
  strategy,
  isSelected,
  isSaved,
  onView,
  onClone,
  onBacktest,
  onToggleSave,
  onToggleCompare,
}: StrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' };
      case 'Medium': return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' };
      case 'High': return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' };
      default: return { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400' };
    }
  };

  const getStatColor = (value: number, type: string) => {
    if (type === 'winRate' || type === 'cagr') return value >= 60 ? 'text-[#00FF88]' : value >= 40 ? 'text-yellow-400' : 'text-red-400';
    if (type === 'maxDrawdown') return value >= -15 ? 'text-[#00FF88]' : value >= -25 ? 'text-yellow-400' : 'text-red-400';
    if (type === 'sharpe') return value >= 1.5 ? 'text-[#00FF88]' : value >= 1 ? 'text-yellow-400' : 'text-red-400';
    return 'text-white';
  };

  const riskColors = getRiskColor(strategy.riskLevel);

  return (
    <div
      className={cn(
        'relative p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border rounded-lg transition-all group',
        isSelected ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-700 hover:border-[#00FF88]/50'
      )}
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      {/* Premium/Verified Badge */}
      {(strategy.isPremium || strategy.isVerified) && (
        <div className="absolute top-2 right-2 z-10">
          {strategy.isPremium && (
            <div className="p-1.5 bg-purple-500/20 border border-purple-500/50 rounded-lg backdrop-blur-sm">
              <Lock className="w-4 h-4 text-purple-400" />
            </div>
          )}
          {strategy.isVerified && (
            <div className="p-1.5 bg-[#00FF88]/20 border border-[#00FF88]/50 rounded-lg backdrop-blur-sm">
              <CheckCircle className="w-4 h-4 text-[#00FF88]" />
            </div>
          )}
        </div>
      )}

      {/* Compare Checkbox */}
      <div className="absolute top-4 left-4 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleCompare}
          className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
        />
      </div>

      {/* Card Header */}
      <div className="mb-4 mt-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-8">
            <h3 className="text-lg font-bold text-white mb-1">{strategy.name}</h3>
            <p className="text-xs text-gray-400">{strategy.subtitle}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-1 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded text-xs font-semibold text-[#00C8FF]">
            {strategy.assetType}
          </span>
          <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs font-semibold text-blue-400">
            {strategy.timeframe}
          </span>
          <span className={cn('px-2 py-1 border rounded text-xs font-semibold', riskColors.bg, riskColors.border, riskColors.text)}>
            {strategy.riskLevel} Risk
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold text-yellow-500">{strategy.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Mini Performance Chart */}
      <div className="mb-4 p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
        <div className="text-xs text-gray-500 mb-2">Performance Curve</div>
        <div className="h-16 flex items-end gap-0.5">
          {strategy.chartData.map((value, idx) => (
            <div
              key={idx}
              className={cn(
                'flex-1 rounded-t transition-all',
                value >= 0 ? 'bg-gradient-to-t from-[#00FF88] to-[#00C8FF]' : 'bg-red-500'
              )}
              style={{ height: `${Math.abs(value)}%` }}
            />
          ))}
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Win Rate</div>
          <div className={cn('text-xl font-bold', getStatColor(strategy.stats.winRate, 'winRate'))}>
            {strategy.stats.winRate}%
          </div>
        </div>
        <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">CAGR</div>
          <div className={cn('text-xl font-bold', getStatColor(strategy.stats.cagr, 'cagr'))}>
            {strategy.stats.cagr}%
          </div>
        </div>
        <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Max DD</div>
          <div className={cn('text-xl font-bold', getStatColor(strategy.stats.maxDrawdown, 'maxDrawdown'))}>
            {strategy.stats.maxDrawdown}%
          </div>
        </div>
        <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Sharpe</div>
          <div className={cn('text-xl font-bold', getStatColor(strategy.stats.sharpe, 'sharpe'))}>
            {strategy.stats.sharpe.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className={cn('text-sm text-gray-400 leading-relaxed', !isExpanded && 'line-clamp-2')}>
          {strategy.description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-[#00C8FF] hover:text-[#00FF88] mt-1 flex items-center gap-1"
        >
          {isExpanded ? (
            <>Show less <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Read more <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      </div>

      {/* Indicators */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Indicators Used</div>
        <div className="flex flex-wrap gap-2">
          {strategy.indicators.map((indicator) => (
            <span
              key={indicator}
              className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-xs font-medium text-purple-400"
            >
              {indicator}
            </span>
          ))}
        </div>
      </div>

      {/* Popularity & Social Proof */}
      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{strategy.popularity.toLocaleString()} traders</span>
        </div>
        {strategy.isTrending && (
          <div className="flex items-center gap-1 text-orange-500">
            <Flame className="w-4 h-4" />
            <span>Trending</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <TestTube className="w-4 h-4" />
          <span>{strategy.backtestCount}+ backtests</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onView}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={onClone}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Clone
        </button>
        <button
          onClick={onToggleSave}
          className={cn(
            'p-2 rounded-lg transition-colors',
            isSaved
              ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-yellow-500'
          )}
          title={isSaved ? 'Saved' : 'Save'}
        >
          <Star className={cn('w-5 h-5', isSaved && 'fill-yellow-500')} />
        </button>
      </div>

      {/* Quick Actions (Hover) */}
      {showQuickActions && (
        <div className="absolute inset-x-4 bottom-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onBacktest}
            className="px-3 py-2 bg-purple-500 text-white rounded-lg text-xs font-semibold hover:bg-purple-600 transition-colors shadow-lg"
          >
            <TestTube className="w-4 h-4 inline mr-1" />
            Quick Backtest
          </button>
        </div>
      )}
    </div>
  );
}
