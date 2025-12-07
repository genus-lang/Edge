import { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { AIHeader } from '../components/ai-predictions/AIHeader';
import { PredictionsSummary } from '../components/ai-predictions/PredictionsSummary';
import { PredictionsTable } from '../components/ai-predictions/PredictionsTable';
import { PredictionDetail } from '../components/ai-predictions/PredictionDetail';
import { ModelPerformance } from '../components/ai-predictions/ModelPerformance';

// Mock data
const mockPredictions = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    type: 'Stock' as const,
    exchange: 'NASDAQ',
    direction: 'Bullish' as const,
    expectedMove: '+8.4% in 1W',
    targetPrice: '$525',
    confidence: 92,
    risk: 'Medium' as const,
    signal: 'Strong Buy' as const,
    horizon: '1W',
    lastUpdated: '5 min ago',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'Stock' as const,
    exchange: 'NASDAQ',
    direction: 'Bullish' as const,
    expectedMove: '+5.2% in 1W',
    targetPrice: '$184',
    confidence: 78,
    risk: 'Low' as const,
    signal: 'Buy' as const,
    horizon: '1W',
    lastUpdated: '5 min ago',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'Stock' as const,
    exchange: 'NASDAQ',
    direction: 'Bearish' as const,
    expectedMove: '-4.8% in 1W',
    targetPrice: '$225',
    confidence: 65,
    risk: 'High' as const,
    signal: 'Sell' as const,
    horizon: '1W',
    lastUpdated: '5 min ago',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'Crypto' as const,
    exchange: 'Binance',
    direction: 'Bullish' as const,
    expectedMove: '+12.5% in 1W',
    targetPrice: '$68,500',
    confidence: 71,
    risk: 'High' as const,
    signal: 'Buy' as const,
    horizon: '1W',
    lastUpdated: '5 min ago',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'Crypto' as const,
    exchange: 'Binance',
    direction: 'Range-bound' as const,
    expectedMove: '+2.1% in 1W',
    targetPrice: '$3,310',
    confidence: 54,
    risk: 'Medium' as const,
    signal: 'Hold' as const,
    horizon: '1W',
    lastUpdated: '5 min ago',
  },
];

const detailData = {
  symbol: 'NVDA',
  name: 'NVIDIA Corp.',
  type: 'Stock',
  exchange: 'NASDAQ',
  currentPrice: '$495.22',
  todayChange: '+3.87%',
  volatility: '24.5%',
  avgVolume: '42.1M',
  prediction: {
    direction: 'Bullish' as const,
    expectedReturn: '+8.4%',
    probabilityOfGain: 78,
    targetPriceRange: {
      min: '$505',
      base: '$525',
      max: '$545',
    },
    maxDrawdown: '-4.2%',
    signal: 'Strong Buy',
    horizon: '1W',
  },
  explanation: {
    bullets: [
      'Price has broken above 50-day moving average with strong volume',
      'Earnings growth trend is strong vs semiconductor sector',
      'Options flow shows significant bullish call activity',
      'Retail sentiment is moderately positive, not euphoric (healthy)',
      'AI chip demand remains robust according to supply chain data',
    ],
    featureImportance: [
      { feature: 'Momentum (3M)', percentage: 32 },
      { feature: 'Earnings Surprises', percentage: 24 },
      { feature: 'Macro Index', percentage: 18 },
      { feature: 'Sentiment Score', percentage: 14 },
      { feature: 'Volatility Regime', percentage: 12 },
    ],
    notes: 'This model performs best in trending markets, less effective in sideways consolidation. Lower reliability near major earnings events.',
  },
  scenarios: {
    base: {
      return: '+8.4%',
      probability: 55,
      explanation: 'If market conditions remain stable and tech sector maintains current momentum, expect gradual upward movement to $525.',
    },
    bull: {
      return: '+15.2%',
      probability: 20,
      explanation: 'If market volatility drops and earnings beat expectations, accelerated rally to $545. Requires strong catalyst like data center orders.',
    },
    bear: {
      return: '-3.5%',
      probability: 25,
      explanation: 'If broader market sells off or chip sector rotation occurs, potential pullback to $480 support level.',
    },
  },
};

export function AIPredictions() {
  const [selectedModel, setSelectedModel] = useState('quantnet-v3');
  const [horizon, setHorizon] = useState('1W');
  const [selectedUniverse, setSelectedUniverse] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>('NVDA');

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button
              onClick={() => handleNavigation('dashboard')}
              className="hover:text-[#00FF88] transition-colors"
            >
              <Home className="w-4 h-4" />
            </button>
            <ChevronRight className="w-4 h-4" />
            <span>Markets</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">AI Predictions</span>
          </div>

          {/* Header */}
          <AIHeader
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            horizon={horizon}
            onHorizonChange={setHorizon}
            selectedUniverse={selectedUniverse}
            onUniverseChange={setSelectedUniverse}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            autoRefresh={autoRefresh}
            onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
            lastUpdated="5 mins ago"
            onRefresh={() => console.log('Refresh predictions')}
          />

          {/* Summary */}
          <PredictionsSummary
            totalPredictions={245}
            bullishCount={130}
            bearishCount={90}
            neutralCount={25}
            topOpportunity={{
              symbol: 'NVDA',
              confidence: 92,
              direction: 'bullish',
              horizon: '1W',
            }}
            riskLevel="Elevated"
            onViewTopOpportunity={() => setSelectedSymbol('NVDA')}
          />

          {/* Main Content: Table + Detail */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left: Predictions Table */}
            <div className="col-span-5 h-[600px]">
              <PredictionsTable
                predictions={mockPredictions}
                selectedSymbol={selectedSymbol}
                onRowClick={setSelectedSymbol}
              />
            </div>

            {/* Right: Prediction Detail */}
            <div className="col-span-7 h-[600px]">
              {selectedSymbol ? (
                <PredictionDetail {...detailData} />
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Select a Prediction
                    </h3>
                    <p className="text-sm text-gray-500">
                      Click on any row in the table to view detailed analysis
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Model Performance */}
          <ModelPerformance
            hitRate30D="67.3%"
            cumulativeReturn90D="+18.4%"
            maxDrawdown="-8.2%"
            modelVersion="v3.4"
            lastUpdated="12 Oct 2025"
          />
        </div>
      </div>
    </div>
  );
}
