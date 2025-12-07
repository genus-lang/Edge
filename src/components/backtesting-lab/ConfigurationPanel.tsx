import { ChevronDown, ChevronUp, Upload, AlertCircle, Plus, X, Info, Shield, Zap, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface ConfigurationPanelProps {
  config: any;
  onConfigChange: (updates: any) => void;
  errors: Record<string, string>;
}

export function ConfigurationPanel({ config, onConfigChange, errors }: ConfigurationPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['strategy', 'assets', 'timeperiod', 'capital', 'risk'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const applyRiskProfile = (profile: 'conservative' | 'balanced' | 'aggressive') => {
    const profiles = {
      conservative: {
        leverage: 1,
        maxDrawdown: 10,
        positionSize: 1,
        maxPositions: 3,
      },
      balanced: {
        leverage: 2,
        maxDrawdown: 15,
        positionSize: 2,
        maxPositions: 5,
      },
      aggressive: {
        leverage: 5,
        maxDrawdown: 25,
        positionSize: 5,
        maxPositions: 10,
      },
    };
    
    onConfigChange(profiles[profile]);
  };

  return (
    <div className="space-y-4">
      {/* 1. Strategy & Dataset Block */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('strategy')}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center">
              <span className="text-[#00FF88] font-bold text-sm">1</span>
            </div>
            <span className="text-white font-semibold">Strategy & Dataset</span>
          </div>
          {expandedSections.has('strategy') ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('strategy') && (
          <div className="p-4 border-t border-gray-700 space-y-4">
            {/* Data Source Selector */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Data Source</label>
              <div className="grid grid-cols-3 gap-2">
                {['Historical Market Data', 'Custom Dataset', 'Paper Trading Logs'].map((source) => (
                  <button
                    key={source}
                    onClick={() => onConfigChange({ dataSource: source })}
                    className={cn(
                      'px-3 py-2 rounded-lg text-xs font-medium transition-all border',
                      config.dataSource === source
                        ? 'bg-[#00FF88]/10 border-[#00FF88]/30 text-[#00FF88]'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                    )}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            {config.dataSource === 'Custom Dataset' && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <button className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  Upload CSV Dataset
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  Accepts OHLCV format with Date, Open, High, Low, Close, Volume columns
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Asset / Universe Selection */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('assets')}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00C8FF]/10 border border-[#00C8FF]/30 flex items-center justify-center">
              <span className="text-[#00C8FF] font-bold text-sm">2</span>
            </div>
            <span className="text-white font-semibold">Asset / Universe Selection</span>
            {config.symbols.length > 0 && (
              <span className="px-2 py-0.5 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded text-xs text-[#00C8FF]">
                {config.symbols.length} selected
              </span>
            )}
          </div>
          {expandedSections.has('assets') ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('assets') && (
          <div className="p-4 border-t border-gray-700 space-y-4">
            {/* Asset Type Tabs */}
            <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
              {['Stocks', 'Crypto', 'Forex', 'Indices'].map((type) => (
                <button
                  key={type}
                  onClick={() => onConfigChange({ assetType: type })}
                  className={cn(
                    'flex-1 px-3 py-2 rounded text-xs font-semibold transition-all',
                    config.assetType === type
                      ? 'bg-[#00FF88] text-black'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Universe Selector */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Universe / Watchlist</label>
              <select
                value={config.universe}
                onChange={(e) => onConfigChange({ universe: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              >
                <option value="">Select a universe</option>
                <option value="nifty50">NIFTY 50</option>
                <option value="sp500">S&P 500</option>
                <option value="nasdaq100">NASDAQ 100</option>
                <option value="custom">Custom List</option>
              </select>
            </div>

            {/* Symbol Search */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Add Individual Symbols</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Search symbols (AAPL, BTCUSDT...)"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      const newSymbols = [...config.symbols, e.currentTarget.value.toUpperCase()];
                      onConfigChange({ symbols: newSymbols });
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button className="px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg hover:bg-[#00FF88]/20 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {config.symbols.map((symbol: string) => (
                  <span
                    key={symbol}
                    className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white flex items-center gap-1"
                  >
                    {symbol}
                    <button
                      onClick={() => {
                        const newSymbols = config.symbols.filter((s: string) => s !== symbol);
                        onConfigChange({ symbols: newSymbols });
                      }}
                      className="text-gray-500 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              {errors.symbols && (
                <div className="flex items-center gap-1 text-xs text-red-400 mt-2">
                  <AlertCircle className="w-3 h-3" />
                  {errors.symbols}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Time Period & Granularity */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('timeperiod')}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <span className="text-purple-400 font-bold text-sm">3</span>
            </div>
            <span className="text-white font-semibold">Time Period & Granularity</span>
          </div>
          {expandedSections.has('timeperiod') ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('timeperiod') && (
          <div className="p-4 border-t border-gray-700 space-y-4">
            {/* Presets */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Quick Presets</label>
              <div className="grid grid-cols-5 gap-2">
                {['1M', '3M', '6M', '1Y', '5Y'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => onConfigChange({ datePreset: preset })}
                    className={cn(
                      'px-3 py-2 rounded-lg text-xs font-semibold transition-all border',
                      config.datePreset === preset
                        ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                    )}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white mb-2 block">From</label>
                <input
                  type="date"
                  value={config.dateFrom}
                  onChange={(e) => onConfigChange({ dateFrom: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">To</label>
                <input
                  type="date"
                  value={config.dateTo}
                  onChange={(e) => onConfigChange({ dateTo: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                />
              </div>
            </div>

            {/* Timeframe */}
            <div>
              <label className="text-sm font-medium text-white mb-2 flex items-center gap-1">
                Timeframe
                <div className="group relative">
                  <Info className="w-3 h-3 text-gray-500 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 border border-gray-700 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Lower timeframes require more computation time
                  </div>
                </div>
              </label>
              <select
                value={config.timeframe}
                onChange={(e) => onConfigChange({ timeframe: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              >
                <option value="1m">1 Minute</option>
                <option value="5m">5 Minutes</option>
                <option value="15m">15 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1d">1 Day</option>
                <option value="1w">1 Week</option>
              </select>
            </div>

            {/* Data Quality Indicator */}
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400 font-medium">Data Coverage: 98% (Good)</span>
                <button className="text-xs text-green-400 hover:text-green-300">View Details</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Capital & Order Settings */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('capital')}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-sm">4</span>
            </div>
            <span className="text-white font-semibold">Capital & Order Settings</span>
          </div>
          {expandedSections.has('capital') ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('capital') && (
          <div className="p-4 border-t border-gray-700 space-y-4">
            {/* Initial Capital */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Initial Capital</label>
              <div className="flex gap-2">
                <select
                  value={config.currency}
                  onChange={(e) => onConfigChange({ currency: e.target.value })}
                  className="w-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
                <input
                  type="number"
                  value={config.initialCapital}
                  onChange={(e) => onConfigChange({ initialCapital: parseFloat(e.target.value) })}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                  placeholder="500000"
                />
              </div>
            </div>

            {/* Position Sizing Mode */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Position Sizing Mode</label>
              <select
                value={config.positionSizingMode}
                onChange={(e) => onConfigChange({ positionSizingMode: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
              >
                <option value="fixed-amount">Fixed Amount per Trade</option>
                <option value="fixed-percent">Fixed % of Capital</option>
                <option value="risk-based">Risk-based (% per stop-loss)</option>
              </select>
            </div>

            {config.positionSizingMode === 'fixed-percent' && (
              <div>
                <label className="text-sm font-medium text-white mb-2 block">% per Trade</label>
                <input
                  type="number"
                  value={config.positionSize}
                  onChange={(e) => onConfigChange({ positionSize: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                  placeholder="2"
                />
              </div>
            )}

            {/* Leverage */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Leverage: {config.leverage}x
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={config.leverage}
                onChange={(e) => onConfigChange({ leverage: parseFloat(e.target.value) })}
                className="w-full"
              />
              {config.leverage > 2 && (
                <div className="flex items-center gap-1 text-xs text-yellow-400 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  Higher leverage increases risk significantly
                </div>
              )}
            </div>

            {/* Fees & Slippage */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Commission (%)</label>
                <input
                  type="number"
                  value={config.commission}
                  onChange={(e) => onConfigChange({ commission: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                  placeholder="0.1"
                  step="0.01"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Slippage (%)</label>
                <input
                  type="number"
                  value={config.slippage}
                  onChange={(e) => onConfigChange({ slippage: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                  placeholder="0.05"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Risk Management */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('risk')}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <span className="text-red-400 font-bold text-sm">5</span>
            </div>
            <span className="text-white font-semibold">Risk Management</span>
          </div>
          {expandedSections.has('risk') ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('risk') && (
          <div className="p-4 border-t border-gray-700 space-y-4">
            {/* Risk Profiles */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Quick Risk Profiles</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => applyRiskProfile('conservative')}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-colors"
                >
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-xs font-semibold text-white">Conservative</span>
                </button>
                <button
                  onClick={() => applyRiskProfile('balanced')}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-colors"
                >
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-semibold text-white">Balanced</span>
                </button>
                <button
                  onClick={() => applyRiskProfile('aggressive')}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-red-400" />
                  <span className="text-xs font-semibold text-white">Aggressive</span>
                </button>
              </div>
            </div>

            {/* Max Drawdown */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Max Drawdown Limit (%)</label>
              <input
                type="number"
                value={config.maxDrawdown}
                onChange={(e) => onConfigChange({ maxDrawdown: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                placeholder="15"
              />
            </div>

            {/* Max Concurrent Positions */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Max Concurrent Positions</label>
              <input
                type="number"
                value={config.maxPositions}
                onChange={(e) => onConfigChange({ maxPositions: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                placeholder="5"
              />
            </div>

            {/* Allow Short Selling */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.allowShorts}
                onChange={(e) => onConfigChange({ allowShorts: e.target.checked })}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#00FF88] focus:ring-[#00FF88] focus:ring-offset-0"
              />
              <span className="text-sm text-gray-300">Allow Short Positions</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
