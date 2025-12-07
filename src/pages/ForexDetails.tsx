import { ChevronRight, Home } from 'lucide-react';
import { ForexHeader } from '../components/forex/ForexHeader';
import { AdvancedChart } from '../components/stocks/AdvancedChart';
import { CurrencyStrength } from '../components/forex/CurrencyStrength';
import { TradeSignalsPanel } from '../components/forex/TradeSignalsPanel';
import { MacroDataPanel } from '../components/forex/MacroDataPanel';
import { InterestRatesPanel } from '../components/forex/InterestRatesPanel';
import { SessionSpreadsPanel } from '../components/forex/SessionSpreadsPanel';
import { ForexTradingPanel } from '../components/forex/ForexTradingPanel';
import { RiskWarningsPanel } from '../components/forex/RiskWarningsPanel';
import { AlertsActivityPanel } from '../components/forex/AlertsActivityPanel';

export function ForexDetails() {
  // Mock data
  const baseCurrency = 'EUR';
  const quoteCurrency = 'USD';
  const pair = `${baseCurrency}${quoteCurrency}`;

  const forexData = {
    baseFullName: 'Euro',
    quoteFullName: 'US Dollar',
    pairType: 'Major' as const,
    currentPrice: '1.09245',
    change: '+0.00123',
    changePercent: '+0.11%',
    positive: true,
    spread: '0.8',
    sessionStatus: 'London Session · Open',
    sessionOpen: true,
  };

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          onClick={() => handleNavigation('dashboard')}
          className="hover:text-[#00FF88] transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
        <ChevronRight className="w-4 h-4" />
        <button
          onClick={() => handleNavigation('market-overview')}
          className="hover:text-[#00FF88] transition-colors"
        >
          Markets
        </button>
        <ChevronRight className="w-4 h-4" />
        <span>Forex</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{pair}</span>
      </div>

      {/* Header */}
      <ForexHeader
        baseCurrency={baseCurrency}
        quoteCurrency={quoteCurrency}
        {...forexData}
        isInWatchlist={false}
        onWatchlistToggle={() => console.log('Watchlist toggled')}
        onCreateAlert={() => console.log('Create alert')}
        onTrade={() => console.log('Open trading panel')}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chart (2/3) */}
        <div className="lg:col-span-2">
          <AdvancedChart symbol={pair} />
        </div>

        {/* Right: Currency Strength & Signals (1/3) */}
        <div className="space-y-6">
          <CurrencyStrength />
          <TradeSignalsPanel />
        </div>
      </div>

      {/* Middle Grid: Macro, Rates, Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MacroDataPanel />
        <InterestRatesPanel />
        <SessionSpreadsPanel />
      </div>

      {/* Trading & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Trading Panel */}
        <div>
          <ForexTradingPanel
            pair={pair}
            currentPrice={forexData.currentPrice}
            onPlaceOrder={(order) => console.log('Order placed:', order)}
          />
        </div>

        {/* Middle: Risk Warnings */}
        <div>
          <RiskWarningsPanel />
        </div>

        {/* Right: Alerts & Activity */}
        <div>
          <AlertsActivityPanel />
        </div>
      </div>

      {/* Related Strategies */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Related Strategies</h3>
          <div className="flex gap-2">
            {['My Strategies', 'Community', 'Recommended'].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'EUR/USD Scalper', type: 'Scalping', winRate: '68%', avgReturn: '+2.4%', dd: '-3.2%' },
            { name: 'Trend Following FX', type: 'Swing', winRate: '62%', avgReturn: '+5.1%', dd: '-8.5%' },
            { name: 'Mean Reversion EUR', type: 'Day Trading', winRate: '71%', avgReturn: '+3.2%', dd: '-4.1%' },
          ].map((strategy, idx) => (
            <button
              key={idx}
              className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-[#00FF88]/30 transition-all text-left"
            >
              <div className="mb-3">
                <div className="text-sm font-semibold text-white mb-1">{strategy.name}</div>
                <div className="text-xs text-gray-500">{strategy.type}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-gray-600">Win Rate</div>
                  <div className="text-[#00FF88] font-semibold">{strategy.winRate}</div>
                </div>
                <div>
                  <div className="text-gray-600">Avg Return</div>
                  <div className="text-white font-semibold">{strategy.avgReturn}</div>
                </div>
                <div>
                  <div className="text-gray-600">Max DD</div>
                  <div className="text-red-400 font-semibold">{strategy.dd}</div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-700">
                <span className="text-xs text-[#00C8FF] hover:text-[#00C8FF]/80">
                  Open in Strategy Details →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
