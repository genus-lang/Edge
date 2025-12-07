import { useState } from 'react';
import { LabHeader } from '../components/indicators-lab/LabHeader';
import { SymbolDatasetBar } from '../components/indicators-lab/SymbolDatasetBar';
import { IndicatorLibrary } from '../components/indicators-lab/IndicatorLibrary';
import { ActiveIndicatorsStack } from '../components/indicators-lab/ActiveIndicatorsStack';
import { LabChartView } from '../components/indicators-lab/LabChartView';
import { IndicatorInspector } from '../components/indicators-lab/IndicatorInspector';
import { ScenarioTester } from '../components/indicators-lab/ScenarioTester';
import { SavedSetups } from '../components/indicators-lab/SavedSetups';

export function IndicatorsLab() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [symbol, setSymbol] = useState('AAPL');
  const [marketType, setMarketType] = useState('Stocks');
  const [timeframes, setTimeframes] = useState(['1D']);
  const [dateRange, setDateRange] = useState('3M');
  const [dataSource, setDataSource] = useState('NASDAQ');
  
  const [activeIndicators, setActiveIndicators] = useState([
    {
      id: 'rsi-1',
      name: 'RSI (Relative Strength Index)',
      shortName: 'RSI (14)',
      color: '#9333EA',
      visible: true,
      panel: 'Separate Panel' as const,
      params: { period: 14, source: 'Close', overbought: 70, oversold: 30 },
    },
    {
      id: 'ema-1',
      name: 'EMA (Exponential Moving Average)',
      shortName: 'EMA (20)',
      color: '#3B82F6',
      visible: true,
      panel: 'Main Chart' as const,
      params: { period: 20, source: 'Close' },
    },
  ]);
  
  const [selectedIndicatorId, setSelectedIndicatorId] = useState<string | null>('rsi-1');
  const [chartType, setChartType] = useState('Candles');
  const [showGrid, setShowGrid] = useState(true);
  const [logScale, setLogScale] = useState(false);
  const [layoutMode, setLayoutMode] = useState(1);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const savedSetups = [
    {
      id: '1',
      name: 'Mean Reversion RSI 5m',
      market: 'Stocks',
      timeframe: '5m',
      tags: ['Scalping', 'Momentum'],
      lastUsed: '2 hours ago',
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Trend Following MACD',
      market: 'Crypto',
      timeframe: '1H',
      tags: ['Swing', 'Trend'],
      lastUsed: '1 day ago',
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Volatility Breakout BB',
      market: 'Forex',
      timeframe: '15m',
      tags: ['Breakout', 'Volatility'],
      lastUsed: '3 days ago',
      isFavorite: false,
    },
  ];

  const handleAddIndicator = (indicator: any) => {
    const newIndicator = {
      id: `${indicator.id}-${Date.now()}`,
      name: indicator.name,
      shortName: indicator.shortName,
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      visible: true,
      panel: indicator.type === 'Overlay' ? 'Main Chart' as const : 'Separate Panel' as const,
      params: {},
    };
    setActiveIndicators([...activeIndicators, newIndicator]);
    setSelectedIndicatorId(newIndicator.id);
  };

  const handleToggleVisibility = (id: string) => {
    setActiveIndicators(activeIndicators.map(ind => 
      ind.id === id ? { ...ind, visible: !ind.visible } : ind
    ));
  };

  const handleDeleteIndicator = (id: string) => {
    setActiveIndicators(activeIndicators.filter(ind => ind.id !== id));
    if (selectedIndicatorId === id) {
      setSelectedIndicatorId(activeIndicators[0]?.id || null);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Page Header */}
      <LabHeader
        onSave={() => console.log('Save setup')}
        onApplyToCharting={() => console.log('Apply to charting')}
        onOpenDocs={() => console.log('Open docs')}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
      />

      {/* Symbol & Dataset Bar */}
      <SymbolDatasetBar
        symbol={symbol}
        onSymbolChange={setSymbol}
        marketType={marketType}
        onMarketTypeChange={setMarketType}
        timeframes={timeframes}
        onTimeframesChange={setTimeframes}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        dataSource={dataSource}
        onDataSourceChange={setDataSource}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Indicator Library + Active Stack */}
        <div className="w-80 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <IndicatorLibrary
              onAddIndicator={handleAddIndicator}
              onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
            />
          </div>
          <div className="h-64 overflow-y-auto border-t border-gray-800">
            <ActiveIndicatorsStack
              indicators={activeIndicators}
              onToggleVisibility={handleToggleVisibility}
              onSettings={(id) => setSelectedIndicatorId(id)}
              onDelete={handleDeleteIndicator}
              onReorder={(from, to) => console.log('Reorder', from, to)}
              selectedIndicatorId={selectedIndicatorId}
            />
          </div>
        </div>

        {/* Center Panel: Chart View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <LabChartView
            chartType={chartType}
            onChartTypeChange={setChartType}
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid(!showGrid)}
            logScale={logScale}
            onToggleLogScale={() => setLogScale(!logScale)}
            layoutMode={layoutMode}
            onLayoutModeChange={setLayoutMode}
          />

          {/* Scenario Tester */}
          <ScenarioTester
            activeScenario={activeScenario}
            onScenarioChange={setActiveScenario}
          />
        </div>

        {/* Right Panel: Indicator Inspector */}
        <div className="w-96 overflow-y-auto">
          <IndicatorInspector
            indicatorId={selectedIndicatorId}
            onParamChange={(param, value) => console.log('Param change:', param, value)}
            onReset={() => console.log('Reset')}
            onClone={() => console.log('Clone')}
          />
        </div>
      </div>

      {/* Saved Setups Section */}
      <div className="border-t border-gray-800 max-h-80 overflow-y-auto">
        <SavedSetups
          setups={savedSetups}
          onApply={(id) => console.log('Apply setup:', id)}
          onEdit={(id) => console.log('Edit setup:', id)}
          onDuplicate={(id) => console.log('Duplicate setup:', id)}
          onDelete={(id) => console.log('Delete setup:', id)}
          onShare={(id) => console.log('Share setup:', id)}
          onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
        />
      </div>

      {/* Notes Footer (Optional) */}
      <div className="px-6 py-3 bg-gray-900/50 border-t border-gray-800">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Session Notes:</span>
          <input
            type="text"
            placeholder="What did you learn? What worked, what didn't?"
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF88]/50"
          />
          <span>·</span>
          <span>Last change: 12:14 - Added MACD</span>
        </div>
      </div>
    </div>
  );
}
