import { useState, useEffect } from 'react';
import { BacktestingLabHeader } from '../components/backtesting-lab/BacktestingLabHeader';
import { ConfigurationPanel } from '../components/backtesting-lab/ConfigurationPanel';
import { PreviewPanel } from '../components/backtesting-lab/PreviewPanel';
import { BottomRunControls } from '../components/backtesting-lab/BottomRunControls';

const defaultConfig = {
  dataSource: 'Historical Market Data',
  assetType: 'Stocks',
  universe: '',
  symbols: [],
  datePreset: '1Y',
  dateFrom: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0],
  dateTo: new Date().toISOString().split('T')[0],
  timeframe: '1d',
  currency: 'USD',
  initialCapital: 100000,
  positionSizingMode: 'fixed-percent',
  positionSize: 2,
  leverage: 1,
  commission: 0.1,
  slippage: 0.05,
  maxDrawdown: 15,
  maxPositions: 5,
  allowShorts: false,
};

export function BacktestingLab() {
  const [selectedStrategy, setSelectedStrategy] = useState({
    name: 'MA Crossover Strategy',
    tags: ['Algo', 'Trend-Following', 'Equity'],
    lastModified: '2 days ago',
  });

  const [config, setConfig] = useState(defaultConfig);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleConfigChange = (updates: any) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    // Clear errors when config changes
    setErrors({});
  };

  const validateConfig = () => {
    const newErrors: Record<string, string> = {};
    
    if (config.symbols.length === 0 && !config.universe) {
      newErrors.symbols = 'Select at least one symbol or universe';
    }
    
    if (!config.dateFrom || !config.dateTo) {
      newErrors.dates = 'Date range is required';
    }
    
    if (config.initialCapital <= 0) {
      newErrors.capital = 'Initial capital must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getValidationMessage = () => {
    if (Object.keys(errors).length > 0) {
      return Object.values(errors)[0];
    }
    return 'Ready to run: All required fields filled';
  };

  const getEstimatedRuntime = () => {
    const symbolCount = config.symbols.length || 50;
    const timeframeMultiplier = {
      '1m': 10,
      '5m': 5,
      '15m': 3,
      '1h': 2,
      '4h': 1,
      '1d': 0.5,
      '1w': 0.2,
    }[config.timeframe] || 1;

    const estimatedSeconds = symbolCount * timeframeMultiplier * 2;
    
    if (estimatedSeconds < 60) {
      return `~${Math.round(estimatedSeconds)}s`;
    }
    return `~${Math.round(estimatedSeconds / 60)}m`;
  };

  const getAITips = () => {
    const tips: string[] = [];
    
    if (config.timeframe === '1m' || config.timeframe === '5m') {
      tips.push('For intraday strategies, avoid backtesting longer than 1 year with 1-min data.');
    }
    
    if (config.positionSize > 2) {
      tips.push(`Your risk per trade is ${config.positionSize}% — this is considered aggressive.`);
    }
    
    if (config.leverage > 2) {
      tips.push('High leverage detected. Consider reducing to 2x or lower for safer results.');
    }
    
    if (config.symbols.length > 100) {
      tips.push('Large universe detected. Consider using a smaller sample for faster iteration.');
    }
    
    if (tips.length === 0) {
      tips.push('Your configuration looks good! Ready to run the backtest.');
    }
    
    return tips;
  };

  const handleRunBacktest = () => {
    if (!validateConfig()) {
      return;
    }

    setIsRunning(true);
    setProgress(0);

    // Simulate backtest progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRunning(false);
            alert('Backtest completed! Redirecting to results page...');
            // In real app: navigate to results page
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleSaveTemplate = () => {
    console.log('Saving template...', config);
    alert('Template saved successfully!');
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setErrors({});
  };

  const handleChangeStrategy = () => {
    alert('This would open a strategy selector modal');
  };

  const handleEditStrategy = () => {
    alert('This would navigate to the strategy editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <BacktestingLabHeader
        selectedStrategy={selectedStrategy}
        onChangeStrategy={handleChangeStrategy}
        onEditStrategy={handleEditStrategy}
      />

      {/* Main Content */}
      <div className="px-6 py-6 pb-24">
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Configuration Panel (65%) */}
          <div className="col-span-8">
            <ConfigurationPanel
              config={config}
              onConfigChange={handleConfigChange}
              errors={errors}
            />
          </div>

          {/* Right: Preview Panel (35%) */}
          <div className="col-span-4">
            <PreviewPanel
              config={config}
              estimatedRuntime={getEstimatedRuntime()}
              aiTips={getAITips()}
            />
          </div>
        </div>
      </div>

      {/* Bottom Run Controls */}
      <BottomRunControls
        isValid={Object.keys(errors).length === 0}
        validationMessage={getValidationMessage()}
        onRunBacktest={handleRunBacktest}
        onSaveTemplate={handleSaveTemplate}
        onReset={handleReset}
        isRunning={isRunning}
        progress={progress}
      />
    </div>
  );
}
