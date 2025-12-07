import { useState } from 'react';
import { Sparkles, TrendingUp, Calendar, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export function TradeSignalsPanel() {
  const [activeTab, setActiveTab] = useState<'ai' | 'technical' | 'macro'>('ai');

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">Trade Signals</h3>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-lg mb-4">
        <button
          onClick={() => setActiveTab('ai')}
          className={cn(
            'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'ai'
              ? 'bg-[#00FF88] text-black'
              : 'text-gray-400 hover:text-white'
          )}
        >
          AI Signals
        </button>
        <button
          onClick={() => setActiveTab('technical')}
          className={cn(
            'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'technical'
              ? 'bg-[#00FF88] text-black'
              : 'text-gray-400 hover:text-white'
          )}
        >
          Technical
        </button>
        <button
          onClick={() => setActiveTab('macro')}
          className={cn(
            'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'macro'
              ? 'bg-[#00FF88] text-black'
              : 'text-gray-400 hover:text-white'
          )}
        >
          Macro
        </button>
      </div>

      {/* AI Signals Tab */}
      {activeTab === 'ai' && (
        <div className="space-y-4">
          {/* Signal Badge */}
          <div className="flex items-center justify-between p-4 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#00FF88]" />
              <div>
                <div className="text-sm font-semibold text-white">AI Signal</div>
                <div className="text-xl font-bold text-[#00FF88]">Bullish Bias</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Confidence</div>
              <div className="text-2xl font-bold text-white">73%</div>
            </div>
          </div>

          {/* Time Horizon */}
          <div>
            <div className="text-xs text-gray-500 mb-2">Time Horizon</div>
            <div className="flex gap-2">
              {['Intraday', 'Swing', 'Positional'].map((horizon) => (
                <button
                  key={horizon}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    horizon === 'Swing'
                      ? 'bg-[#00C8FF] text-black'
                      : 'bg-gray-800 text-gray-400'
                  )}
                >
                  {horizon}
                </button>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div className="space-y-2">
            {[
              { text: 'Trend: Uptrend on 4H timeframe', icon: TrendingUp, color: 'text-[#00FF88]' },
              { text: 'Volatility: Above average in last 3 sessions', icon: Info, color: 'text-yellow-500' },
              { text: 'Support level holding at 1.0900', icon: Info, color: 'text-blue-400' },
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                <point.icon className={cn('w-4 h-4 mt-0.5 flex-shrink-0', point.color)} />
                <span className="text-sm text-gray-300">{point.text}</span>
              </div>
            ))}
          </div>

          <button className="w-full py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Open in Strategy Builder
          </button>
        </div>
      )}

      {/* Technical Tab */}
      {activeTab === 'technical' && (
        <div className="space-y-3">
          {[
            { label: 'RSI (14)', value: '62', status: 'Bullish', positive: true },
            { label: 'MACD', value: 'Bullish crossover', status: 'Buy Signal', positive: true },
            { label: 'Price vs 50 EMA', value: 'Above', status: 'Bullish', positive: true },
            { label: 'Price vs 200 EMA', value: 'Above', status: 'Bullish', positive: true },
            { label: 'Stochastic', value: '68', status: 'Neutral', positive: null },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="text-sm text-gray-400">{item.label}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white font-medium">{item.value}</span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded text-xs font-semibold',
                    item.positive === true && 'bg-[#00FF88]/10 text-[#00FF88]',
                    item.positive === false && 'bg-red-500/10 text-red-400',
                    item.positive === null && 'bg-gray-700 text-gray-400'
                  )}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Macro Tab */}
      {activeTab === 'macro' && (
        <div className="space-y-3">
          {[
            { event: 'ECB Rate Decision', days: 2, impact: 'High' },
            { event: 'US Non-Farm Payrolls', days: 3, impact: 'High' },
            { event: 'Eurozone CPI', days: 5, impact: 'Medium' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">{item.event}</span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded text-xs font-semibold',
                    item.impact === 'High' && 'bg-red-500/10 text-red-400',
                    item.impact === 'Medium' && 'bg-yellow-500/10 text-yellow-500'
                  )}
                >
                  {item.impact}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>In {item.days} days</span>
              </div>
            </div>
          ))}
          
          <button className="w-full py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            View Full Economic Calendar
          </button>
        </div>
      )}
    </div>
  );
}
