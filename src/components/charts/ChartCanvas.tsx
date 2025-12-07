import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { useState, useMemo } from 'react';

interface ChartCanvasProps {
  symbol: string;
  timeframe: string;
  chartType: string;
}

// Generate realistic candlestick data
const generateCandlestickData = (symbol: string, count: number = 100) => {
  const data = [];
  let basePrice = 178;
  
  // Different base prices for different symbols
  if (symbol.includes('BTC')) basePrice = 42000;
  else if (symbol.includes('ETH')) basePrice = 2200;
  else if (symbol === 'TSLA') basePrice = 245;
  else if (symbol === 'GOOGL') basePrice = 140;
  else if (symbol === 'MSFT') basePrice = 370;
  
  for (let i = 0; i < count; i++) {
    const time = new Date();
    time.setMinutes(time.getMinutes() - (count - i) * 5);
    
    const volatility = basePrice * 0.02;
    const trend = Math.sin(i / 10) * volatility;
    const open = basePrice + trend + (Math.random() - 0.5) * volatility;
    const close = open + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    const volume = Math.random() * 1000000 + 500000;
    
    data.push({
      time: time.getHours() + ':' + String(time.getMinutes()).padStart(2, '0'),
      timestamp: time.getTime(),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Math.floor(volume),
      price: Number(close.toFixed(2)),
    });
    
    basePrice = close;
  }
  
  return data;
};

// Custom Candlestick Shape
const CandlestickShape = (props: any) => {
  const { x, y, width, payload } = props;
  if (!payload) return null;
  
  const { open, high, low, close } = payload;
  const isGreen = close > open;
  const color = isGreen ? '#00FF88' : '#FF4444';
  
  const yHigh = y - ((high - close) / (payload.priceRange || 1)) * 100;
  const yLow = y + ((close - low) / (payload.priceRange || 1)) * 100;
  const yOpen = y - ((open - close) / (payload.priceRange || 1)) * 100;
  const bodyHeight = Math.abs(yOpen - y);
  
  return (
    <g>
      {/* Wick */}
      <line
        x1={x + width / 2}
        y1={yHigh}
        x2={x + width / 2}
        y2={yLow}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={x}
        y={Math.min(y, yOpen)}
        width={width}
        height={bodyHeight || 1}
        fill={color}
        opacity={0.8}
      />
    </g>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900/95 border border-gray-700 rounded-lg p-3 backdrop-blur-sm">
        <div className="text-xs space-y-1">
          <div className="text-gray-400 font-semibold mb-2">{data.time}</div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">O</span>
            <span className="text-white font-semibold">{data.open}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">H</span>
            <span className="text-white font-semibold">{data.high}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">L</span>
            <span className="text-white font-semibold">{data.low}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">C</span>
            <span className="text-white font-semibold">{data.close}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">Vol</span>
            <span className="text-white font-semibold">{(data.volume / 1000000).toFixed(2)}M</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function ChartCanvas({ symbol, timeframe, chartType }: ChartCanvasProps) {
  const chartData = useMemo(() => generateCandlestickData(symbol, 100), [symbol]);
  
  const lastCandle = chartData[chartData.length - 1];
  const previousCandle = chartData[chartData.length - 2];
  const currentPrice = lastCandle.close;
  const priceChange = currentPrice - previousCandle.close;
  const priceChangePercent = (priceChange / previousCandle.close) * 100;
  const isPositive = priceChange > 0;

  // Calculate OHLC for display
  const ohlc = {
    open: chartData[chartData.length - 24]?.open || currentPrice,
    high: Math.max(...chartData.slice(-24).map(d => d.high)),
    low: Math.min(...chartData.slice(-24).map(d => d.low)),
    close: currentPrice,
    volume: chartData.slice(-24).reduce((sum, d) => sum + d.volume, 0),
  };

  return (
    <div className="flex-1 bg-[#0A0E13] relative flex flex-col">
      {/* Chart Info Overlay */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 space-y-1 sm:space-y-2">
        {/* Symbol & Price */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-2xl font-bold text-white">{symbol}</span>
              <span className="px-1.5 sm:px-2 py-0.5 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded text-[10px] sm:text-xs font-semibold text-[#00FF88]">
                {timeframe}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
              <span className="text-base sm:text-xl font-bold text-white">${currentPrice.toFixed(2)}</span>
              <div className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${isPositive ? 'text-[#00FF88]' : 'text-red-500'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        {/* OHLC Info */}
        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
          <div>
            <span className="text-gray-500">O</span>
            <span className="text-white ml-1">{ohlc.open.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-500">H</span>
            <span className="text-white ml-1">{ohlc.high.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-500">L</span>
            <span className="text-white ml-1">{ohlc.low.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-500">C</span>
            <span className="text-white ml-1">{ohlc.close.toFixed(2)}</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-gray-500">Vol</span>
            <span className="text-white ml-1">{(ohlc.volume / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        {/* Active Indicators */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-xs font-medium text-purple-400">
            EMA(20): {(currentPrice * 0.99).toFixed(2)}
          </div>
          <div className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs font-medium text-blue-400">
            RSI: {(45 + Math.random() * 30).toFixed(1)}
          </div>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="flex-1 pt-24 sm:pt-28 pb-2 px-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'candlestick' ? (
            <ComposedChart data={chartData} margin={{ top: 10, right: 60, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00C8FF" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00C8FF" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280" 
                style={{ fontSize: '10px' }}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis 
                stroke="#6b7280" 
                domain={['auto', 'auto']}
                style={{ fontSize: '10px' }}
                width={60}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="volume" fill="url(#volumeGradient)" yAxisId="volume" opacity={0.3} />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#00FF88" 
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          ) : chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 10, right: 60, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280" 
                style={{ fontSize: '10px' }}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis 
                stroke="#6b7280" 
                domain={['auto', 'auto']}
                style={{ fontSize: '10px' }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#00C8FF" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : chartType === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 60, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280" 
                style={{ fontSize: '10px' }}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis 
                stroke="#6b7280" 
                domain={['auto', 'auto']}
                style={{ fontSize: '10px' }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="close" 
                stroke="#00FF88" 
                strokeWidth={2}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 60, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280" 
                style={{ fontSize: '10px' }}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis 
                stroke="#6b7280" 
                domain={['auto', 'auto']}
                style={{ fontSize: '10px' }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="close" fill="#00C8FF" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Event Markers Overlay - Hidden on mobile */}
      <div className="hidden md:block absolute bottom-24 left-1/4 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded-lg backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-[#00C8FF] animate-pulse" />
          <span className="text-xs font-medium text-[#00C8FF]">Earnings Report</span>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-48 right-1/3 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
          <span className="text-xs font-medium text-yellow-500">AI Signal: Buy</span>
        </div>
      </div>
    </div>
  );
}