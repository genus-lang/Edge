import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { ProtectedRoute } from '../components/dashboard/ProtectedRoute';
import { PortfolioSummary } from '../components/dashboard/widgets/PortfolioSummary';
import { PerformanceChart } from '../components/dashboard/widgets/PerformanceChart';
import { AssetAllocation } from '../components/dashboard/widgets/AssetAllocation';
import { ActiveStrategies } from '../components/dashboard/widgets/ActiveStrategies';
import { AIInsights } from '../components/dashboard/widgets/AIInsights';
import { WatchlistPreview } from '../components/dashboard/widgets/WatchlistPreview';
import { RecentTrades } from '../components/dashboard/widgets/RecentTrades';
import { QuickActions } from '../components/dashboard/widgets/QuickActions';
import { MarketOverview } from './MarketOverview';
import { MarketWatchlist } from './MarketWatchlist';
import { StockDetails } from './StockDetails';
import { CryptoDetails } from './CryptoDetails';
import { ForexDetails } from './ForexDetails';
import { Heatmap } from './Heatmap';
import { Screener } from './Screener';
import { AIPredictions } from './AIPredictions';
import { NewsFeed } from './NewsFeed';
import { SentimentAnalysis } from './SentimentAnalysis';
import { Charts } from './Charts';
import { IndicatorsLab } from './IndicatorsLab';
import { StrategyLibrary } from './StrategyLibrary';
import { StrategyBuilder } from './StrategyBuilder';
import { CodeEditor } from './CodeEditor';
import { BacktestingLab } from './BacktestingLab';
import { BacktestingResults } from './BacktestingResults';
import { Sparkles } from 'lucide-react';

export function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <ProtectedRoute>
      <DashboardLayout activePage={activePage} onPageChange={setActivePage}>
        {/* Dashboard Content */}
        {activePage === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-gray-400">
                  Here's what's happening with your portfolio today
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                <Sparkles className="w-4 h-4" />
                AI Analysis
              </button>
            </div>

            {/* Portfolio Summary Cards */}
            <PortfolioSummary />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Performance Chart - Takes 2 columns */}
              <div className="lg:col-span-2">
                <PerformanceChart />
              </div>

              {/* Asset Allocation */}
              <div className="lg:col-span-1">
                <AssetAllocation />
              </div>
            </div>

            {/* Second Row Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Strategies */}
              <div className="lg:col-span-1">
                <ActiveStrategies />
              </div>

              {/* AI Insights */}
              <div className="lg:col-span-1">
                <AIInsights />
              </div>

              {/* Watchlist Preview */}
              <div className="lg:col-span-1">
                <WatchlistPreview />
              </div>
            </div>

            {/* Recent Trades */}
            <RecentTrades />

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <QuickActions />
            </div>
          </div>
        )}

        {/* Market Overview Page */}
        {activePage === 'market-overview' && <MarketOverview />}

        {/* Market Watchlist Page */}
        {activePage === 'market-watchlist' && <MarketWatchlist />}

        {/* Stock Details Page */}
        {activePage === 'stock-details' && <StockDetails />}

        {/* Crypto Details Page */}
        {activePage === 'crypto-details' && <CryptoDetails />}

        {/* Forex Details Page */}
        {activePage === 'forex-details' && <ForexDetails />}

        {/* Heatmap Page */}
        {activePage === 'heatmap' && <Heatmap />}

        {/* Screener Page */}
        {activePage === 'screener' && <Screener />}

        {/* AIPredictions Page */}
        {activePage === 'ai-predictions' && <AIPredictions />}

        {/* NewsFeed Page */}
        {activePage === 'news-feed' && <NewsFeed />}

        {/* SentimentAnalysis Page */}
        {activePage === 'sentiment-analysis' && <SentimentAnalysis />}

        {/* Charts Page */}
        {activePage === 'charts' && <Charts />}

        {/* IndicatorsLab Page */}
        {activePage === 'indicators-lab' && <IndicatorsLab />}

        {/* StrategyLibrary Page */}
        {activePage === 'strategy-library' && <StrategyLibrary />}

        {/* StrategyBuilder Page */}
        {activePage === 'strategy-builder' && <StrategyBuilder />}

        {/* CodeEditor Page */}
        {activePage === 'code-editor' && <CodeEditor />}

        {/* BacktestingLab Page */}
        {activePage === 'backtesting-lab' && <BacktestingLab />}

        {/* BacktestingResults Page */}
        {activePage === 'backtesting-results' && <BacktestingResults />}

        {/* Placeholder for other pages */}
        {activePage !== 'dashboard' && activePage !== 'market-overview' && activePage !== 'market-watchlist' && activePage !== 'stock-details' && activePage !== 'crypto-details' && activePage !== 'forex-details' && activePage !== 'heatmap' && activePage !== 'screener' && activePage !== 'ai-predictions' && activePage !== 'news-feed' && activePage !== 'sentiment-analysis' && activePage !== 'charts' && activePage !== 'indicators-lab' && activePage !== 'strategy-library' && activePage !== 'strategy-builder' && activePage !== 'code-editor' && activePage !== 'backtesting-lab' && activePage !== 'backtesting-results' && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00FF88] to-[#00C8FF] mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {activePage.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </h2>
              <p className="text-gray-400 mb-6">
                This page is under construction. Coming soon!
              </p>
              <button
                onClick={() => setActivePage('dashboard')}
                className="px-6 py-2.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}