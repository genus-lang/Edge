import { useState } from 'react';
import { TrendingUp, TrendingDown, Calculator } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ForexTradingPanelProps {
  pair: string;
  currentPrice: string;
  onPlaceOrder?: (order: any) => void;
}

export function ForexTradingPanel({ pair, currentPrice, onPlaceOrder }: ForexTradingPanelProps) {
  const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'Stop'>('Market');
  const [side, setSide] = useState<'Buy' | 'Sell'>('Buy');
  const [lots, setLots] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [leverage, setLeverage] = useState('50');

  const currentPriceNum = parseFloat(currentPrice);
  const lotsNum = parseFloat(lots) || 0;
  const tpNum = parseFloat(takeProfit) || 0;
  const slNum = parseFloat(stopLoss) || 0;

  // Simple P&L calculation
  const tpPips = tpNum ? Math.abs((tpNum - currentPriceNum) * 10000) : 0;
  const slPips = slNum ? Math.abs((currentPriceNum - slNum) * 10000) : 0;
  const tpAmount = tpPips * lotsNum * 10;
  const slAmount = slPips * lotsNum * 10;
  const marginRequired = (lotsNum * 100000 * currentPriceNum) / parseFloat(leverage);

  const handlePlaceOrder = () => {
    const order = {
      pair,
      side,
      orderType,
      lots: lotsNum,
      entryPrice: orderType !== 'Market' ? entryPrice : currentPrice,
      takeProfit: tpNum,
      stopLoss: slNum,
      leverage,
    };
    onPlaceOrder?.(order);
    alert(`${side} order placed for ${lots} lots of ${pair}`);
  };

  const canPlaceOrder = lotsNum > 0;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">Order Ticket</h3>

      {/* Order Type Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-gray-800 rounded-lg mb-4">
        {(['Market', 'Limit', 'Stop'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-all',
              orderType === type
                ? 'bg-[#00FF88] text-black'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Buy/Sell Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setSide('Buy')}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all',
            side === 'Buy'
              ? 'bg-[#00FF88] text-black'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          )}
        >
          <TrendingUp className="w-5 h-5" />
          Buy
        </button>
        <button
          onClick={() => setSide('Sell')}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all',
            side === 'Sell'
              ? 'bg-red-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          )}
        >
          <TrendingDown className="w-5 h-5" />
          Sell
        </button>
      </div>

      {/* Order Fields */}
      <div className="space-y-3 mb-4">
        {/* Lots */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Lots (1 lot = 100,000 units)
          </label>
          <input
            type="number"
            value={lots}
            onChange={(e) => setLots(e.target.value)}
            placeholder="0.01"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
            step="0.01"
            min="0.01"
          />
        </div>

        {/* Entry Price (for Limit/Stop) */}
        {orderType !== 'Market' && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Entry Price
            </label>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              placeholder={currentPrice}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
              step="0.00001"
            />
          </div>
        )}

        {/* Take Profit */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Take Profit (TP)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              placeholder="Price"
              className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
              step="0.00001"
            />
            {tpPips > 0 && (
              <div className="px-3 py-2.5 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg text-xs text-[#00FF88] font-semibold">
                {tpPips.toFixed(1)} pips
              </div>
            )}
          </div>
        </div>

        {/* Stop Loss */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Stop Loss (SL)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="Price"
              className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
              step="0.00001"
            />
            {slPips > 0 && (
              <div className="px-3 py-2.5 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 font-semibold">
                {slPips.toFixed(1)} pips
              </div>
            )}
          </div>
        </div>

        {/* Leverage */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Leverage
          </label>
          <select
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00FF88]/50"
          >
            <option value="10">1:10</option>
            <option value="20">1:20</option>
            <option value="50">1:50</option>
            <option value="100">1:100</option>
            <option value="200">1:200</option>
          </select>
        </div>
      </div>

      {/* P&L Summary */}
      {lotsNum > 0 && (
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg mb-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Calculator className="w-4 h-4" />
            <span>Risk/Reward Calculation</span>
          </div>
          
          {tpAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Potential Profit (TP)</span>
              <span className="text-[#00FF88] font-semibold">+${tpAmount.toFixed(2)}</span>
            </div>
          )}
          
          {slAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Potential Loss (SL)</span>
              <span className="text-red-400 font-semibold">-${slAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-700">
            <span className="text-gray-400">Margin Required</span>
            <span className="text-white font-semibold">${marginRequired.toFixed(2)}</span>
          </div>

          {tpAmount > 0 && slAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Risk/Reward Ratio</span>
              <span className="text-white font-semibold">
                1:{(tpAmount / slAmount).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={!canPlaceOrder}
        className={cn(
          'w-full py-3 rounded-lg font-semibold transition-all',
          side === 'Buy'
            ? 'bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90'
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-90',
          !canPlaceOrder && 'opacity-50 cursor-not-allowed'
        )}
      >
        {side === 'Buy' ? '🔼' : '🔽'} Place {side} Order
      </button>
    </div>
  );
}
