import { useState } from 'react';
import { BacktestResultsHeader } from '../components/backtesting-results/BacktestResultsHeader';
import { KPISummaryStrip } from '../components/backtesting-results/KPISummaryStrip';
import { EquityCurveChart } from '../components/backtesting-results/EquityCurveChart';
import { DrawdownChart } from '../components/backtesting-results/DrawdownChart';
import { TradeListTable } from '../components/backtesting-results/TradeListTable';
import { AIInsightsPanel } from '../components/backtesting-results/AIInsightsPanel';

// Mock data generation
const generateEquityCurveData = () => {
  const data = [];
  let strategyEquity = 100000;
  let benchmark = 100000;
  const startDate = new Date('2021-01-01');
  
  for (let i = 0; i < 730; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    strategyEquity += (Math.random() - 0.45) * 500 + 50; // Slight upward bias
    benchmark += (Math.random() - 0.48) * 300 + 30;
    
    data.push({
      date: date.toISOString().split('T')[0],
      strategyEquity: Math.round(strategyEquity),
      benchmark: Math.round(benchmark),
    });
  }
  
  return data;
};

const generateDrawdownData = () => {
  const data = [];
  const startDate = new Date('2021-01-01');
  let currentDrawdown = 0;
  
  for (let i = 0; i < 730; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Random walk for drawdown
    const change = (Math.random() - 0.5) * 2;
    currentDrawdown = Math.max(Math.min(currentDrawdown + change, 0), -20);
    
    data.push({
      date: date.toISOString().split('T')[0],
      drawdown: parseFloat(currentDrawdown.toFixed(2)),
    });
  }
  
  return data;
};

const generateTradeData = () => {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META', 'AMZN', 'NFLX'];
  const trades = [];
  const startDate = new Date('2021-01-01');
  
  for (let i = 0; i < 50; i++) {
    const entryDate = new Date(startDate);
    entryDate.setDate(entryDate.getDate() + i * 14 + Math.random() * 7);
    
    const exitDate = new Date(entryDate);
    exitDate.setDate(exitDate.getDate() + Math.random() * 10 + 1);
    
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const side = Math.random() > 0.5 ? 'Long' : 'Short';
    const entryPrice = 100 + Math.random() * 200;
    const pnlPercent = (Math.random() - 0.43) * 10; // Slight profit bias
    const exitPrice = entryPrice * (1 + pnlPercent / 100);
    const positionSize = Math.floor(Math.random() * 100) + 10;
    const pnl = (exitPrice - entryPrice) * positionSize * (side === 'Long' ? 1 : -1);
    const fees = positionSize * 0.1;
    
    const holdingDays = Math.floor((exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    trades.push({
      id: String(1000 + i),
      dateIn: entryDate.toISOString().split('T')[0],
      timeIn: '09:30:00',
      dateOut: exitDate.toISOString().split('T')[0],
      timeOut: '16:00:00',
      symbol,
      side: side as 'Long' | 'Short',
      entryPrice,
      exitPrice,
      positionSize,
      pnl,
      pnlPercent,
      fees,
      holdingPeriod: `${holdingDays}d ${Math.floor(Math.random() * 24)}h`,
      tags: ['momentum', 'breakout'],
    });
  }
  
  return trades;
};

export function BacktestingResults() {
  const [equityCurveData] = useState(generateEquityCurveData());
  const [drawdownData] = useState(generateDrawdownData());
  const [tradeData] = useState(generateTradeData());

  const finalEquity = equityCurveData[equityCurveData.length - 1].strategyEquity;
  const initialEquity = equityCurveData[0].strategyEquity;
  const totalReturn = ((finalEquity - initialEquity) / initialEquity) * 100;
  
  const benchmarkFinal = equityCurveData[equityCurveData.length - 1].benchmark;
  const benchmarkReturn = ((benchmarkFinal - equityCurveData[0].benchmark) / equityCurveData[0].benchmark) * 100;

  const winningTrades = tradeData.filter(t => t.pnl > 0).length;
  const totalTrades = tradeData.length;
  const winRate = (winningTrades / totalTrades) * 100;

  const kpis = [
    {
      id: 'total-return',
      label: 'Total Return',
      value: `+${totalReturn.toFixed(1)}%`,
      subtext: `vs Benchmark: +${benchmarkReturn.toFixed(1)}%`,
      trend: 'up' as const,
      tooltip: 'Total percentage return over the entire backtest period',
    },
    {
      id: 'cagr',
      label: 'CAGR',
      value: '14.6%',
      subtext: 'Annualized',
      trend: 'up' as const,
      tooltip: 'Compound Annual Growth Rate - annualized return over the period',
    },
    {
      id: 'max-drawdown',
      label: 'Max Drawdown',
      value: '-18.2%',
      subtext: 'Peak-to-trough',
      trend: 'down' as const,
      tooltip: 'Maximum observed loss from a peak to a trough during the backtest',
    },
    {
      id: 'win-rate',
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      subtext: `${winningTrades} / ${totalTrades} trades`,
      trend: 'up' as const,
      tooltip: 'Percentage of profitable trades out of total trades',
    },
    {
      id: 'sharpe',
      label: 'Sharpe Ratio',
      value: '1.32',
      subtext: 'Sortino: 1.78',
      trend: 'neutral' as const,
      tooltip: 'Risk-adjusted return metric. Higher is better. >1 is good, >2 is excellent',
    },
    {
      id: 'trades',
      label: 'Number of Trades',
      value: String(totalTrades),
      subtext: 'Avg holding: 2.3 days',
      trend: 'neutral' as const,
      tooltip: 'Total number of completed trades during the backtest period',
    },
  ];

  const handleCardClick = (id: string) => {
    console.log('Scrolling to:', id);
    // In production, scroll to the detailed section
  };

  const handleRerun = () => {
    alert('Navigating to Backtesting Lab with pre-filled parameters...');
    if ((window as any).navigateTo) {
      (window as any).navigateTo('backtesting-lab');
    }
  };

  const handleClone = () => {
    alert('Cloning strategy as new draft...');
  };

  const handleExport = (type: 'pdf' | 'csv' | 'json') => {
    alert(`Exporting ${type.toUpperCase()} report...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <BacktestResultsHeader
        strategyName="Mean Reversion v2"
        runId={23}
        universe="NIFTY 50"
        runType="Daily"
        status="completed"
        testPeriod={{
          from: '2021-01-01',
          to: '2023-12-31',
        }}
        granularity="5-min candles"
        capital={100000}
        leverage={2}
        onRerun={handleRerun}
        onClone={handleClone}
        onExport={handleExport}
      />

      {/* KPI Summary Strip */}
      <KPISummaryStrip kpis={kpis} onCardClick={handleCardClick} />

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column (Charts & Tables) */}
          <div className="col-span-8 space-y-6">
            {/* Equity Curve */}
            <EquityCurveChart data={equityCurveData} />

            {/* Drawdown Chart */}
            <DrawdownChart data={drawdownData} />

            {/* Trade List Table */}
            <TradeListTable trades={tradeData} />
          </div>

          {/* Right Column (Insights & Actions) */}
          <div className="col-span-4">
            <AIInsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
